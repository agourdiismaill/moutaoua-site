#!/usr/bin/env node
/**
 * Translate servicePages (and related leftovers) FR → EN / AR via Google gtx.
 * Usage: node scripts/translate-service-pages-i18n.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const cache = { en: new Map(), ar: new Map() };

async function translateText(text, tl) {
  if (!text || typeof text !== "string") return text;
  // Keep placeholders / pure tech tokens
  if (/^\{[\w]+\}$/.test(text.trim())) return text;
  if (!/[À-ÿa-zA-Z]/.test(text)) return text;

  const map = cache[tl];
  if (map.has(text)) return map.get(text);

  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=" +
    tl +
    "&dt=t&q=" +
    encodeURIComponent(text);

  let lastErr;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      let out = (j[0] || []).map((x) => x[0]).join("");
      // Preserve Mohtaoua branding casing
      out = out.replace(/\bmohtaoua\b/gi, "Mohtaoua");
      map.set(text, out);
      await sleep(40);
      return out;
    } catch (e) {
      lastErr = e;
      await sleep(300 * (attempt + 1));
    }
  }
  console.warn("translate fail, keep FR:", text.slice(0, 60), lastErr?.message);
  map.set(text, text);
  return text;
}

async function translateDeep(value, tl) {
  if (typeof value === "string") return translateText(value, tl);
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) out.push(await translateDeep(item, tl));
    return out;
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = await translateDeep(v, tl);
    }
    return out;
  }
  return value;
}

/** Prefer existing good labels; translate everything under items from FR */
async function buildLocale(fr, existing, tl, labelOverrides = {}) {
  const labels =
    existing?.labels && Object.keys(existing.labels).length
      ? { ...existing.labels, ...labelOverrides }
      : await translateDeep(fr.labels, tl);

  console.log(`→ translating homeOverview (${tl})…`);
  const homeOverview = await translateDeep(fr.homeOverview, tl);
  console.log(`→ translating trust (${tl})…`);
  const trust = await translateDeep(fr.trust, tl);

  const items = {};
  const slugs = Object.keys(fr.items);
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    process.stdout.write(`\r→ ${tl} items ${i + 1}/${slugs.length} ${slug}          `);
    items[slug] = await translateDeep(fr.items[slug], tl);
  }
  console.log();

  return { labels, homeOverview, trust, items };
}

async function translateJsonFile(relPath, tl) {
  const frPath = join(root, relPath.replace("/ar/", "/fr/").replace("/en/", "/fr/"));
  // always read FR as source when path is en/ar
  const fr = JSON.parse(readFileSync(join(root, relPath.replace(/\/(en|ar)\//, "/fr/")), "utf8"));
  const outPath = join(root, relPath);
  console.log(`Translating ${relPath} → ${tl}`);
  const translated = await translateDeep(fr, tl);
  writeFileSync(outPath, JSON.stringify(translated, null, 2) + "\n");
  console.log(`Wrote ${relPath}`);
}

async function main() {
  const fr = JSON.parse(readFileSync(join(root, "messages/fr/servicePages.json"), "utf8"));
  const enExisting = JSON.parse(readFileSync(join(root, "messages/en/servicePages.json"), "utf8"));
  const arExisting = JSON.parse(readFileSync(join(root, "messages/ar/servicePages.json"), "utf8"));

  const enLabels = {
    aiOverview: "Page summary",
    what: "What is this page about?",
    who: "Who is it for?",
    benefits: "Key benefits",
    topics: "Topics covered",
    takeaways: "Key takeaways",
    readingTime: "{minutes} min read",
    problem: "The problem",
    solution: "Our solution",
    howItWorks: "How it works",
    industries: "Industries",
    relatedServices: "Related services",
    trustTitle: "Expertise & trust",
    trustCompany: "Company",
    trustExperience: "Experience",
    trustMethodology: "Methodology",
    trustUpdated: "Last updated",
    trustReferences: "Industry references",
    share: "Share",
    home: "Home",
    services: "Services",
    breadcrumbServices: "Services",
    caseStudies: "Case studies",
  };

  const arLabels = {
    aiOverview: "ملخص الصفحة",
    what: "عن ماذا تتحدث هذه الصفحة؟",
    who: "لمن هي موجهة؟",
    benefits: "الفوائد الرئيسية",
    topics: "المواضيع المغطاة",
    takeaways: "نقاط يجب تذكرها",
    readingTime: "{minutes} دقيقة قراءة",
    problem: "المشكلة",
    solution: "حلّنا",
    howItWorks: "كيف يعمل",
    industries: "القطاعات المعنية",
    relatedServices: "خدمات مرتبطة",
    trustTitle: "الخبرة والثقة",
    trustCompany: "الشركة",
    trustExperience: "الخبرة",
    trustMethodology: "المنهجية",
    trustUpdated: "آخر تحديث",
    trustReferences: "مراجع قطاعية",
    share: "مشاركة",
    home: "الرئيسية",
    services: "الخدمات",
    breadcrumbServices: "الخدمات",
    caseStudies: "دراسات الحالة",
  };

  const en = await buildLocale(fr, enExisting, "en", enLabels);
  writeFileSync(
    join(root, "messages/en/servicePages.json"),
    JSON.stringify(en, null, 2) + "\n"
  );
  console.log("Wrote messages/en/servicePages.json");

  const ar = await buildLocale(fr, arExisting, "ar", arLabels);
  writeFileSync(
    join(root, "messages/ar/servicePages.json"),
    JSON.stringify(ar, null, 2) + "\n"
  );
  console.log("Wrote messages/ar/servicePages.json");

  // Case studies + blog leftovers (full translate from FR)
  for (const name of ["caseStudies.json", "blog.json"]) {
    await translateJsonFile(`messages/en/${name}`, "en");
    await translateJsonFile(`messages/ar/${name}`, "ar");
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
