#!/usr/bin/env node
/**
 * Génère data/service-city-combos.ts à partir des services et villes cibles.
 * Usage: node scripts/generate-service-city-combos.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const TARGET_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Tanger",
  "Agadir",
  "Fès",
  "Meknès",
  "Oujda",
  "Kenitra",
];

const CITY_SLUGS = {
  Casablanca: "casablanca",
  Rabat: "rabat",
  Marrakech: "marrakech",
  Tanger: "tanger",
  Agadir: "agadir",
  Fès: "fes",
  Meknès: "meknes",
  Oujda: "oujda",
  Kenitra: "kenitra",
};

const CITY_SECTORS = {
  Casablanca: "finance-industrie",
  Rabat: "administration-services",
  Marrakech: "tourisme-immobilier",
  Tanger: "logistique-industrie",
  Agadir: "tourisme-agro",
  Fès: "artisanat-commerce",
  Meknès: "industrie-agro",
  Oujda: "commerce-transfrontalier",
  Kenitra: "industrie-logistique",
};

const SECTOR_LABELS = {
  "finance-industrie": "finance, industrie et grandes PME",
  "administration-services": "administration, services publics et B2B",
  "tourisme-immobilier": "tourisme, immobilier et hôtellerie",
  "logistique-industrie": "logistique, industrie et export",
  "tourisme-agro": "tourisme, agroalimentaire et pêche",
  "artisanat-commerce": "artisanat, commerce et éducation",
  "industrie-agro": "industrie et agroalimentaire",
  "commerce-transfrontalier": "commerce et échanges transfrontaliers",
  "industrie-logistique": "industrie et logistique portuaire",
};

function extractServiceSlugs() {
  const metaPath = join(root, "data/meta.ts");
  const content = readFileSync(metaPath, "utf8");
  const match = content.match(/export const SERVICE_SLUGS = \[([\s\S]*?)\] as const/);
  if (!match) throw new Error("SERVICE_SLUGS not found in data/meta.ts");
  return [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

function extractExclusions() {
  const path = join(root, "data/service-city-exclusions.ts");
  const content = readFileSync(path, "utf8");
  const pairs = [...content.matchAll(/^\s*\{\s*service:\s*"([^"]+)",\s*ville:\s*"([^"]+)"\s*\},?\s*$/gm)];
  return new Set(pairs.map((m) => `${m[1]}::${m[2]}`));
}

function extractExcludedServices() {
  const path = join(root, "data/service-city-exclusions.ts");
  const content = readFileSync(path, "utf8");
  const match = content.match(
    /export const SERVICE_CITY_EXCLUDED_SERVICES[^=]*=\s*\[([\s\S]*?)\];/
  );
  if (!match) return new Set();
  return new Set([...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]));
}

function loadServiceTitles() {
  const servicesJson = JSON.parse(
    readFileSync(join(root, "messages/fr/services.json"), "utf8")
  );
  return servicesJson.items;
}

function buildDescription(serviceTitle, ville, secteurDominant) {
  const sectorLabel = SECTOR_LABELS[secteurDominant] ?? secteurDominant;
  return `${serviceTitle} à ${ville} : accompagnement expert pour les entreprises de ${sectorLabel}. Stratégie, exécution et reporting transparent. Audit gratuit avec Mohtaoua.`;
}

function main() {
  const services = extractServiceSlugs();
  const exclusions = extractExclusions();
  const excludedServices = extractExcludedServices();
  const titles = loadServiceTitles();
  const combos = [];

  for (const service of services) {
    if (excludedServices.has(service)) continue;
    for (const ville of TARGET_CITIES) {
      if (exclusions.has(`${service}::${ville}`)) continue;
      const villeSlug = CITY_SLUGS[ville];
      const secteurDominant = CITY_SECTORS[ville];
      const serviceTitle = titles[service]?.title ?? service;
      const slug = `${service}-${villeSlug}`;
      combos.push({
        slug,
        service,
        ville,
        villeSlug,
        secteurDominant,
        title: `${serviceTitle} à ${ville} | Mohtaoua`,
        description: buildDescription(serviceTitle, ville, secteurDominant),
      });
    }
  }

  combos.sort((a, b) => a.slug.localeCompare(b.slug));

  const citySlugUnion = [...new Set(combos.map((c) => c.villeSlug))]
    .map((s) => `  | "${s}"`)
    .join("\n");

  const lines = combos.map((c) => {
    return `  {
    slug: "${c.slug}",
    service: "${c.service}",
    ville: "${c.ville}",
    villeSlug: "${c.villeSlug}",
    secteurDominant: "${c.secteurDominant}",
  }`;
  });

  const output = `// @generated — do not edit. Run: npm run generate:service-city-combos

import type { ServiceSlug } from "./meta";

export type CitySlug =
${citySlugUnion};

export interface ServiceCityCombo {
  slug: string;
  service: ServiceSlug;
  ville: string;
  villeSlug: CitySlug;
  secteurDominant: string;
}

export const SERVICE_CITY_COMBOS: ServiceCityCombo[] = [
${lines.join(",\n")},
];

export const SERVICE_CITY_COMBO_SLUGS: string[] = SERVICE_CITY_COMBOS.map((c) => c.slug);

export function getServiceCityCombo(slug: string): ServiceCityCombo | undefined {
  return SERVICE_CITY_COMBOS.find((c) => c.slug === slug);
}

export function isServiceCitySlug(slug: string): boolean {
  return SERVICE_CITY_COMBO_SLUGS.includes(slug);
}
`;

  const outPath = join(root, "data/service-city-combos.ts");
  writeFileSync(outPath, output, "utf8");
  console.log(`Generated ${combos.length} combos → data/service-city-combos.ts`);
}

main();
