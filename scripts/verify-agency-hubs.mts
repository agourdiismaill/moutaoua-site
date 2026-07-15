/**
 * Vérification i18n des hubs agence (Lot 3).
 *
 * 1. Confirme que les 6 hubs "digitale" migrés restent résolvables
 *    (items.digitale.{ville}) en FR/EN/AR sans clé manquante.
 * 2. Confirme que les 5 hubs "communication" ont un contenu non vide.
 * 3. Vérifie labels de grille + localContext par type.
 *
 * Usage : npx tsx scripts/verify-agency-hubs.mts
 * Sortie : succès/échec par hub et par locale, code de sortie 1 si échec.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { AGENCY_HUBS } from "../data/agency-hubs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["fr", "en", "ar"] as const;

type Json = Record<string, any>;

function load(locale: string, name: string): Json {
  return JSON.parse(
    readFileSync(join(root, `messages/${locale}/${name}.json`), "utf8")
  );
}

function isNonEmptyString(v: unknown): boolean {
  return typeof v === "string" && v.trim().length > 0;
}

function isNonEmptyArray(v: unknown): boolean {
  return Array.isArray(v) && v.length > 0 && v.every((x) => x != null && x !== "");
}

function checkOverview(o: Json | undefined, prefix: string, errors: string[]) {
  if (!o) {
    errors.push(`${prefix}.overview manquant`);
    return;
  }
  if (!isNonEmptyString(o.what)) errors.push(`${prefix}.overview.what vide`);
  if (!isNonEmptyString(o.who)) errors.push(`${prefix}.overview.who vide`);
  if (!isNonEmptyArray(o.benefits)) errors.push(`${prefix}.overview.benefits vide`);
  if (!isNonEmptyArray(o.topics)) errors.push(`${prefix}.overview.topics vide`);
  if (!isNonEmptyArray(o.takeaways)) errors.push(`${prefix}.overview.takeaways vide`);
}

function checkFaqs(faqs: unknown, prefix: string, errors: string[]) {
  if (!Array.isArray(faqs) || faqs.length === 0) {
    errors.push(`${prefix}.faqs vide`);
    return;
  }
  faqs.forEach((f: Json, i: number) => {
    if (!isNonEmptyString(f?.question))
      errors.push(`${prefix}.faqs[${i}].question vide`);
    if (!isNonEmptyString(f?.answer))
      errors.push(`${prefix}.faqs[${i}].answer vide`);
  });
}

let totalErrors = 0;
let passCount = 0;

for (const locale of LOCALES) {
  const hubs = load(locale, "agencyHubPages");
  const sc = load(locale, "serviceCityPages");

  // Labels requis (dont variantes communication)
  const requiredLabels = [
    "home",
    "share",
    "aiOverview",
    "what",
    "who",
    "benefits",
    "topics",
    "takeaways",
    "readingTime",
    "challenges",
    "challengesCommunication",
    "approach",
    "servicesInCity",
    "servicesInCityDescription",
    "servicesInCityCommunication",
    "servicesInCityDescriptionCommunication",
  ];
  for (const key of requiredLabels) {
    if (!isNonEmptyString(hubs.labels?.[key])) {
      console.log(`  [FAIL] ${locale} labels.${key} manquant`);
      totalErrors++;
    }
  }

  // localContext digitale + communication
  for (const type of ["digitale", "communication"] as const) {
    const lc = sc.localContext?.[type];
    for (const key of ["title", "prefix", "agencyLink"]) {
      if (!isNonEmptyString(lc?.[key])) {
        console.log(`  [FAIL] ${locale} serviceCityPages.localContext.${type}.${key} manquant`);
        totalErrors++;
      }
    }
  }

  // Chaque hub : contenu complet résolvable via items.{type}.{ville}
  for (const hub of AGENCY_HUBS) {
    const prefix = `items.${hub.type}.${hub.villeSlug}`;
    const item = hubs.items?.[hub.type]?.[hub.villeSlug];
    const errors: string[] = [];

    if (!item) {
      errors.push(`${prefix} introuvable`);
    } else {
      if (!isNonEmptyString(item.metaTitle)) errors.push(`${prefix}.metaTitle vide`);
      if (!isNonEmptyString(item.metaDescription))
        errors.push(`${prefix}.metaDescription vide`);
      if (!isNonEmptyString(item.h1)) errors.push(`${prefix}.h1 vide`);
      if (!isNonEmptyString(item.intro)) errors.push(`${prefix}.intro vide`);
      checkOverview(item.overview, prefix, errors);
      if (!isNonEmptyArray(item.paragraphs)) errors.push(`${prefix}.paragraphs vide`);
      if (!isNonEmptyArray(item.challenges)) errors.push(`${prefix}.challenges vide`);
      if (!isNonEmptyArray(item.approach)) errors.push(`${prefix}.approach vide`);
      checkFaqs(item.faqs, prefix, errors);
    }

    if (errors.length) {
      console.log(`  [FAIL] ${locale} ${hub.slug} (${hub.type})`);
      errors.forEach((e) => console.log(`         - ${e}`));
      totalErrors += errors.length;
    } else {
      console.log(`  [OK]   ${locale} ${hub.slug} (${hub.type})`);
      passCount++;
    }
  }
}

console.log(
  `\nRésultat : ${passCount}/${LOCALES.length * AGENCY_HUBS.length} hubs OK, ${totalErrors} erreur(s).`
);
process.exit(totalErrors > 0 ? 1 : 0);
