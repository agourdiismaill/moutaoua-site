/**
 * Fetch runtime des hubs agence + du maillage réciproque service→hub.
 *
 * Vérifie contre un serveur réel (BASE), par hub et par locale :
 *  1. HTTP 200, H1 attendu et ≥1 réponse FAQ dans le HTML SSR.
 *  2. Grille de services : ≥1 lien /services/*-{ville} présent (les hubs
 *     communication n'affichent qu'une sélection, mais jamais zéro).
 *  3. Routage réciproque en conditions réelles :
 *     - un service communication (brand-identity-{ville}) doit lier le hub
 *       COMMUNICATION de la ville, jamais le hub digitale ;
 *     - un service marketing (meta-ads-{ville}) doit lier le hub DIGITALE.
 *
 * Usage :
 *   BASE=http://localhost:3123 npx tsx scripts/fetch-check-hubs.mts
 *   BASE=https://mohtaoua.ma  npx tsx scripts/fetch-check-hubs.mts
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { AGENCY_HUBS } from "../data/agency-hubs";
import { SERVICE_CITY_COMBO_SLUGS } from "../data/service-city-combos";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = (process.env.BASE ?? "http://localhost:3123").replace(/\/$/, "");
const LOCALES = ["fr", "en", "ar"] as const;

function loadHubs(locale: string) {
  return JSON.parse(
    readFileSync(join(root, `messages/${locale}/agencyHubPages.json`), "utf8")
  );
}

async function get(url: string): Promise<{ status: number; html: string }> {
  const res = await fetch(url, { headers: { "Cache-Control": "no-cache" } });
  return { status: res.status, html: await res.text() };
}

let failures = 0;
let ok = 0;

// ---------- 1 & 2. Rendu des hubs + grille de services ----------
for (const locale of LOCALES) {
  const hubs = loadHubs(locale);
  for (const hub of AGENCY_HUBS) {
    const item = hubs.items?.[hub.type]?.[hub.villeSlug];
    const expectedH1: string = item?.h1 ?? "";
    const firstFaqAnswer: string = item?.faqs?.[0]?.answer ?? "";
    const url = `${BASE}/${locale}/agences/${hub.slug}`;
    const cityLinkRe = new RegExp(
      `/${locale}/services/[a-z0-9-]+-${hub.villeSlug}\\b`,
      "g"
    );

    try {
      const { status, html } = await get(url);
      const problems: string[] = [];

      if (status !== 200) problems.push(`HTTP ${status}`);
      if (!expectedH1 || !html.includes(expectedH1))
        problems.push("H1 absent du HTML");
      if (!firstFaqAnswer || !html.includes(firstFaqAnswer))
        problems.push("réponse FAQ absente du HTML SSR");
      if (/agencyHubPages\.|items\.(digitale|communication)\./.test(html))
        problems.push("clé i18n brute détectée (traduction manquante)");

      const cityLinks = new Set(html.match(cityLinkRe) ?? []);
      if (cityLinks.size === 0)
        problems.push(`0 lien /services/*-${hub.villeSlug} dans la grille`);

      if (problems.length) {
        console.log(`  [FAIL] ${locale} ${hub.slug} — ${problems.join(", ")}`);
        failures++;
      } else {
        console.log(
          `  [OK]   ${locale} ${hub.slug} (${hub.type}) — ${cityLinks.size} liens ville`
        );
        ok++;
      }
    } catch (err) {
      console.log(`  [FAIL] ${locale} ${hub.slug} — ${(err as Error).message}`);
      failures++;
    }
  }
}

// ---------- 3. Routage réciproque service→hub (conditions réelles) ----------
const communicationCities = [
  ...new Set(
    AGENCY_HUBS.filter((h) => h.type === "communication").map((h) => h.villeSlug)
  ),
];

type ReciprocalCase = {
  service: string;
  villeSlug: string;
  expectHubSlug: string;
  forbidHubSlug: string;
};

const reciprocalCases: ReciprocalCase[] = [];
for (const villeSlug of communicationCities) {
  // Service communication -> hub communication (jamais digitale)
  if (SERVICE_CITY_COMBO_SLUGS.includes(`brand-identity-${villeSlug}`)) {
    reciprocalCases.push({
      service: "brand-identity",
      villeSlug,
      expectHubSlug: `agence-communication-${villeSlug}`,
      forbidHubSlug: `agence-digitale-${villeSlug}`,
    });
  }
  // Service marketing -> hub digitale (contrôle inverse)
  if (SERVICE_CITY_COMBO_SLUGS.includes(`meta-ads-${villeSlug}`)) {
    reciprocalCases.push({
      service: "meta-ads",
      villeSlug,
      expectHubSlug: `agence-digitale-${villeSlug}`,
      forbidHubSlug: `agence-communication-${villeSlug}`,
    });
  }
}

console.log("\n--- Routage réciproque service → hub ---");
for (const locale of LOCALES) {
  for (const c of reciprocalCases) {
    const url = `${BASE}/${locale}/services/${c.service}-${c.villeSlug}`;
    const expectHref = `/${locale}/agences/${c.expectHubSlug}`;
    const forbidHref = `/${locale}/agences/${c.forbidHubSlug}`;
    try {
      const { status, html } = await get(url);
      const problems: string[] = [];
      if (status !== 200) problems.push(`HTTP ${status}`);
      if (!html.includes(expectHref))
        problems.push(`lien attendu absent (${c.expectHubSlug})`);
      if (html.includes(forbidHref))
        problems.push(`lien interdit présent (${c.forbidHubSlug})`);

      if (problems.length) {
        console.log(
          `  [FAIL] ${locale} ${c.service}-${c.villeSlug} — ${problems.join(", ")}`
        );
        failures++;
      } else {
        console.log(
          `  [OK]   ${locale} ${c.service}-${c.villeSlug} → ${c.expectHubSlug}`
        );
        ok++;
      }
    } catch (err) {
      console.log(
        `  [FAIL] ${locale} ${c.service}-${c.villeSlug} — ${(err as Error).message}`
      );
      failures++;
    }
  }
}

console.log(`\nFetch runtime : ${ok} OK, ${failures} échec(s). BASE=${BASE}`);
process.exit(failures > 0 ? 1 : 0);
