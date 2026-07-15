/**
 * Vérification i18n + fetch runtime des pages /compare/* (Lot 5).
 *
 * Usage :
 *   npx tsx scripts/verify-compare.mts
 *   BASE=http://localhost:3123 npx tsx scripts/verify-compare.mts
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { COMPARISON_SLUGS } from "../data/blog";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["fr", "en", "ar"] as const;
const BASE = process.env.BASE?.replace(/\/$/, "");

function load(locale: string) {
  return JSON.parse(
    readFileSync(join(root, `messages/${locale}/compare.json`), "utf8")
  );
}

function isNonEmptyString(v: unknown): boolean {
  return typeof v === "string" && v.trim().length > 0;
}

function isNonEmptyArray(v: unknown): boolean {
  return Array.isArray(v) && v.length > 0;
}

async function fetchCheck(
  locale: string,
  slug: string,
  item: {
    title: string;
    columns: { left: string; right: string };
    rows: { criteria: string; left: string; right: string }[];
    faqs: { answer: string }[];
  }
) {
  const url = `${BASE}/${locale}/compare/${slug}`;
  const res = await fetch(url, { headers: { "Cache-Control": "no-cache" } });
  const html = await res.text();
  const problems: string[] = [];
  if (res.status !== 200) problems.push(`HTTP ${res.status}`);
  if (!html.includes(item.title)) problems.push("H1/title absent");
  if (!html.includes(item.columns.left) || !html.includes(item.columns.right))
    problems.push("en-têtes colonnes absents");
  const firstRow = item.rows[0];
  if (!html.includes(firstRow.criteria) || !html.includes(firstRow.left))
    problems.push("tableau absent du SSR");
  if (!html.includes(item.faqs[0].answer)) problems.push("FAQ absente du SSR");
  if (/compare\.|items\.|columns\./.test(html)) problems.push("clé i18n brute");
  return problems;
}

let i18nErrors = 0;
let i18nOk = 0;

for (const locale of LOCALES) {
  const data = load(locale);
  for (const key of ["criteria", "verdict", "faq"]) {
    if (!isNonEmptyString(data.labels?.[key])) {
      console.log(`  [FAIL] ${locale} labels.${key} manquant`);
      i18nErrors++;
    }
  }

  for (const slug of COMPARISON_SLUGS) {
    const item = data.items?.[slug];
    const prefix = `items.${slug}`;
    const errors: string[] = [];

    if (!item) {
      errors.push(`${prefix} introuvable`);
    } else {
      if (!isNonEmptyString(item.title)) errors.push(`${prefix}.title vide`);
      if (!isNonEmptyString(item.description)) errors.push(`${prefix}.description vide`);
      if (!isNonEmptyString(item.columns?.left)) errors.push(`${prefix}.columns.left vide`);
      if (!isNonEmptyString(item.columns?.right)) errors.push(`${prefix}.columns.right vide`);
      if (!isNonEmptyArray(item.rows)) errors.push(`${prefix}.rows vide`);
      else {
        item.rows.forEach((row: Record<string, string>, i: number) => {
          if (!row.criteria || !row.left || !row.right)
            errors.push(`${prefix}.rows[${i}] incomplet`);
          if (row.meta || row.google)
            errors.push(`${prefix}.rows[${i}] utilise encore meta/google`);
        });
      }
      if (!isNonEmptyString(item.verdict)) errors.push(`${prefix}.verdict vide`);
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
    for (const slug of COMPARISON_SLUGS) {
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

const total = LOCALES.length * COMPARISON_SLUGS.length;
console.log(`\nRésultat i18n : ${i18nOk}/${total} OK, ${i18nErrors} erreur(s).`);
if (BASE) {
  console.log(`Résultat fetch : ${fetchOk}/${total} OK, ${fetchFail} échec(s).`);
}
process.exit(i18nErrors > 0 || fetchFail > 0 ? 1 : 0);
