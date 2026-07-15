/**
 * Vérification i18n + fetch runtime des pages /guides/* (Lot 6).
 *
 * Usage :
 *   npx tsx scripts/verify-guides.mts
 *   BASE=http://localhost:3123 npx tsx scripts/verify-guides.mts
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GUIDE_SLUGS } from "../data/blog";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["fr", "en", "ar"] as const;
const BASE = process.env.BASE?.replace(/\/$/, "");

function load(locale: string) {
  return JSON.parse(
    readFileSync(join(root, `messages/${locale}/guides.json`), "utf8")
  );
}

function isNonEmptyString(v: unknown): boolean {
  return typeof v === "string" && v.trim().length > 0;
}

function isNonEmptyArray(v: unknown): boolean {
  return Array.isArray(v) && v.length > 0;
}

function htmlIncludes(html: string, text: string): boolean {
  const normalizedHtml = html
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&");
  return normalizedHtml.includes(text);
}

async function fetchCheck(
  locale: string,
  slug: string,
  item: {
    title: string;
    steps: string[];
    mistakes: string[];
    faqs: { answer: string }[];
  }
) {
  const url = `${BASE}/${locale}/guides/${slug}`;
  const res = await fetch(url, { headers: { "Cache-Control": "no-cache" } });
  const html = await res.text();
  const problems: string[] = [];
  if (res.status !== 200) problems.push(`HTTP ${res.status}`);
  if (!htmlIncludes(html, item.title)) problems.push("H1/title absent");
  if (!htmlIncludes(html, item.steps[0])) problems.push("étapes absentes du SSR");
  if (!htmlIncludes(html, item.mistakes[0])) problems.push("erreurs courantes absentes du SSR");
  if (!htmlIncludes(html, item.faqs[0].answer)) problems.push("FAQ absente du SSR");
  if (/guides\.|items\./.test(html)) problems.push("clé i18n brute");
  return problems;
}

let i18nErrors = 0;
let i18nOk = 0;

for (const locale of LOCALES) {
  const data = load(locale);

  for (const slug of GUIDE_SLUGS) {
    const item = data.items?.[slug];
    const prefix = `items.${slug}`;
    const errors: string[] = [];

    if (!item) {
      errors.push(`${prefix} introuvable`);
    } else {
      if (!isNonEmptyString(item.title)) errors.push(`${prefix}.title vide`);
      if (!isNonEmptyString(item.description)) errors.push(`${prefix}.description vide`);
      if (!isNonEmptyArray(item.steps)) errors.push(`${prefix}.steps vide`);
      else if (!item.steps.every((step: unknown) => isNonEmptyString(step)))
        errors.push(`${prefix}.steps contient une entrée vide`);
      if (!isNonEmptyArray(item.mistakes)) errors.push(`${prefix}.mistakes vide`);
      else if (!item.mistakes.every((mistake: unknown) => isNonEmptyString(mistake)))
        errors.push(`${prefix}.mistakes contient une entrée vide`);
      if (!isNonEmptyArray(item.faqs)) errors.push(`${prefix}.faqs vide`);
    }

    if (errors.length) {
      console.log(`  [FAIL] ${locale} ${slug}`);
      errors.forEach((e) => console.log(`         - ${e}`));
      i18nErrors += errors.length;
    } else {
      console.log(`  [OK]   ${locale} ${slug} (i18n)`);
      i18nOk++;
    }
  }
}

let fetchOk = 0;
let fetchFail = 0;

if (BASE) {
  console.log(`\n--- Fetch runtime (BASE=${BASE}) ---`);
  for (const locale of LOCALES) {
    const data = load(locale);
    for (const slug of GUIDE_SLUGS) {
      const item = data.items[slug];
      try {
        const problems = await fetchCheck(locale, slug, item);
        if (problems.length) {
          console.log(`  [FAIL] ${locale} ${slug} — ${problems.join(", ")}`);
          fetchFail++;
        } else {
          console.log(`  [OK]   ${locale} ${slug} (fetch)`);
          fetchOk++;
        }
      } catch (err) {
        console.log(`  [FAIL] ${locale} ${slug} — ${(err as Error).message}`);
        fetchFail++;
      }
    }
  }
}

const total = LOCALES.length * GUIDE_SLUGS.length;
console.log(`\nRésultat i18n : ${i18nOk}/${total} OK, ${i18nErrors} erreur(s).`);
if (BASE) {
  console.log(`Résultat fetch : ${fetchOk}/${total} OK, ${fetchFail} échec(s).`);
}
process.exit(i18nErrors > 0 || fetchFail > 0 ? 1 : 0);
