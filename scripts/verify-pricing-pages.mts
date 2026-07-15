/**
 * Vérification i18n + fetch runtime des pages pricing SEO (Lot 4).
 *
 * Usage :
 *   npx tsx scripts/verify-pricing-pages.mts
 *   BASE=http://localhost:3123 npx tsx scripts/verify-pricing-pages.mts
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PRICING_PAGE_SLUGS } from "../data/pricing-pages";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["fr", "en", "ar"] as const;
const BASE = process.env.BASE?.replace(/\/$/, "");

function load(locale: string) {
  return JSON.parse(
    readFileSync(join(root, `messages/${locale}/pricingPages.json`), "utf8")
  );
}

function isNonEmptyString(v: unknown): boolean {
  return typeof v === "string" && v.trim().length > 0;
}

function isNonEmptyArray(v: unknown): boolean {
  return Array.isArray(v) && v.length > 0;
}

async function fetchCheck(locale: string, slug: string, expectedH1: string, faqAnswer: string) {
  const url = `${BASE}/${locale}/prix/${slug}`;
  const res = await fetch(url, { headers: { "Cache-Control": "no-cache" } });
  const html = await res.text();
  const problems: string[] = [];
  if (res.status !== 200) problems.push(`HTTP ${res.status}`);
  if (!html.includes(expectedH1)) problems.push("H1 absent");
  if (!html.includes(faqAnswer)) problems.push("FAQ absente du SSR");
  if (/pricingPages\.|items\./.test(html)) problems.push("clé i18n brute");
  return problems;
}

let i18nErrors = 0;
let i18nOk = 0;

for (const locale of LOCALES) {
  const data = load(locale);
  const requiredLabels = [
    "home",
    "pricing",
    "aiOverview",
    "indicativePrice",
    "perMonth",
    "perProject",
    "included",
    "faq",
  ];
  for (const key of requiredLabels) {
    if (!isNonEmptyString(data.labels?.[key])) {
      console.log(`  [FAIL] ${locale} labels.${key} manquant`);
      i18nErrors++;
    }
  }

  for (const slug of PRICING_PAGE_SLUGS) {
    const item = data.items?.[slug];
    const prefix = `items.${slug}`;
    const errors: string[] = [];

    if (!item) {
      errors.push(`${prefix} introuvable`);
    } else {
      for (const field of ["metaTitle", "metaDescription", "h1", "intro", "disclaimer"]) {
        if (!isNonEmptyString(item[field])) errors.push(`${prefix}.${field} vide`);
      }
      if (!item.overview?.what) errors.push(`${prefix}.overview incomplet`);
      if (!isNonEmptyArray(item.factors)) errors.push(`${prefix}.factors vide`);
      for (const tier of ["basic", "standard", "premium"] as const) {
        const t = item.tiers?.[tier];
        if (!t?.name || !t?.description || !isNonEmptyArray(t?.includes)) {
          errors.push(`${prefix}.tiers.${tier} incomplet`);
        }
      }
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
    for (const slug of PRICING_PAGE_SLUGS) {
      const item = data.items[slug];
      try {
        const problems = await fetchCheck(
          locale,
          slug,
          item.h1,
          item.faqs[0].answer
        );
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

const totalExpected = LOCALES.length * PRICING_PAGE_SLUGS.length;
console.log(
  `\nRésultat i18n : ${i18nOk}/${totalExpected} OK, ${i18nErrors} erreur(s).`
);
if (BASE) {
  console.log(`Résultat fetch : ${fetchOk}/${totalExpected} OK, ${fetchFail} échec(s).`);
}

const failed = i18nErrors > 0 || fetchFail > 0;
process.exit(failed ? 1 : 0);
