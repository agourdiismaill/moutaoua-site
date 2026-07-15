/**
 * Audit du maillage interne — simule les liens contextuels générés
 * dans le corps des pages (hors navbar/footer/mega-menu globaux).
 *
 * Usage : npx tsx scripts/audit-internal-links.mts
 */

import { SERVICE_SLUGS, CASE_STUDY_SLUGS } from "../data/meta";
import {
  SERVICE_CITY_COMBOS,
  SERVICE_CITY_COMBO_SLUGS,
} from "../data/service-city-combos";
import { AGENCY_HUBS, getAgencyHubByCity } from "../data/agency-hubs";
import { BLOG_POST_SLUGS, GUIDE_SLUGS, COMPARISON_SLUGS } from "../data/blog";
import { INDUSTRY_SLUGS, FEATURED_INDUSTRY_SLUGS, industryServiceMap, industryCaseStudyMap } from "../data/industries";
import { SOLUTION_SLUGS } from "../data/solutions";
import { getServicesByPillar } from "../data/services";
import { SERVICE_PILLARS } from "../data/pillars";
import {
  resolveRelatedContent,
  resolvePreviousNext,
  resolveLatest,
  resolvePopular,
} from "../lib/seo/resolve-related";

type Route = { path: string; kind: string };

// ---------- 1. Inventaire des routes ----------
const routes: Route[] = [
  { path: "/", kind: "home" },
  { path: "/services", kind: "hub" },
  { path: "/industries", kind: "hub" },
  { path: "/solutions", kind: "hub" },
  { path: "/blog", kind: "hub" },
  { path: "/case-studies", kind: "hub" },
  { path: "/portfolio", kind: "hub" },
  { path: "/results", kind: "hub" },
  { path: "/videos", kind: "hub" },
  { path: "/pricing", kind: "page" },
  { path: "/contact", kind: "page" },
  { path: "/about", kind: "page" },
  ...SERVICE_SLUGS.map((s) => ({ path: `/services/${s}`, kind: "service" })),
  ...SERVICE_CITY_COMBOS.map((c) => ({ path: `/services/${c.slug}`, kind: "service-city" })),
  ...AGENCY_HUBS.map((hub) => ({ path: `/agences/${hub.slug}`, kind: "agency-hub" })),
  ...INDUSTRY_SLUGS.map((s) => ({ path: `/industries/${s}`, kind: "industry" })),
  ...SOLUTION_SLUGS.map((s) => ({ path: `/solutions/${s}`, kind: "solution" })),
  ...BLOG_POST_SLUGS.map((s) => ({ path: `/blog/${s}`, kind: "blog" })),
  ...GUIDE_SLUGS.map((s) => ({ path: `/guides/${s}`, kind: "guide" })),
  ...COMPARISON_SLUGS.map((s) => ({ path: `/compare/${s}`, kind: "comparison" })),
  ...CASE_STUDY_SLUGS.map((s) => ({ path: `/case-studies/${s}`, kind: "case-study" })),
];

// ---------- 2. Liens sortants contextuels par page source ----------
/** map target path -> Set of source paths */
const inbound = new Map<string, Set<string>>();
for (const r of routes) inbound.set(r.path, new Set());

function addLink(from: string, to: string) {
  if (from === to) return;
  const set = inbound.get(to);
  if (set) set.add(from);
}

function addResolved(from: string, type: any, slug: string) {
  const resolved = resolveRelatedContent({ type, slug });
  for (const nodes of Object.values(resolved)) {
    for (const n of nodes ?? []) addLink(from, n.path);
  }
}

// Homepage : CapabilitiesGrid (8 services), ServicesSection(limit 6),
// IndustriesTeaser (8 featured), SolutionsTeaser (8), CTA
const capabilitySlugs = [
  "brand-identity", "corporate-websites", "custom-software", "flutter",
  "lead-generation", "marketing-automation", "video-production", "corporate-events",
];
for (const s of capabilitySlugs) addLink("/", `/services/${s}`);
// ServicesSection : 6 premiers services highlighted/ordre meta
const first6 = SERVICE_SLUGS.slice(0, 6);
for (const s of first6) addLink("/", `/services/${s}`);
for (const s of FEATURED_INDUSTRY_SLUGS) addLink("/", `/industries/${s}`);
const featuredSolutions = ["e-nfc", "crm", "ai-agents", "whatsapp-automation", "erp-restaurant", "archidoc", "website-builder", "business-intelligence"];
for (const s of featuredSolutions) addLink("/", `/solutions/${s}`);
addLink("/", "/industries");
addLink("/", "/solutions");
addLink("/", "/case-studies"); // CtaSection
addLink("/", "/contact");

// Hubs
for (const s of SERVICE_SLUGS) addLink("/services", `/services/${s}`); // ServicesByPillar (tous)
for (const s of INDUSTRY_SLUGS) addLink("/industries", `/industries/${s}`);
for (const s of SOLUTION_SLUGS) addLink("/solutions", `/solutions/${s}`);
for (const s of BLOG_POST_SLUGS) addLink("/blog", `/blog/${s}`);
for (const s of CASE_STUDY_SLUGS) addLink("/case-studies", `/case-studies/${s}`);
// PopularContentHub sur /blog
for (const n of resolvePopular("blog", 3)) addLink("/blog", n.path);
for (const n of resolveLatest("blog", 3)) addLink("/blog", n.path);
for (const n of resolvePopular("guide", 2)) addLink("/blog", n.path);
for (const n of resolvePopular("resource", 4)) addLink("/blog", n.path);

// Pages service
const CITY_ORDER = ["casablanca", "rabat", "marrakech", "tanger", "agadir", "fes", "meknes", "oujda", "kenitra"];
for (const s of SERVICE_SLUGS) {
  const from = `/services/${s}`;
  addResolved(from, "service", s);
  addLink(from, "/contact"); // CtaSection
  addLink(from, "/case-studies");
  // Bloc contextuel in-body : pricing + industrie + ville
  addLink(from, "/pricing");
  const serviceIdx = SERVICE_SLUGS.indexOf(s);
  const industry =
    INDUSTRY_SLUGS.find((ind) => industryServiceMap[ind]?.includes(s)) ??
    INDUSTRY_SLUGS[serviceIdx % INDUSTRY_SLUGS.length];
  addLink(from, `/industries/${industry}`);
  const citySlug = CITY_ORDER[serviceIdx % CITY_ORDER.length];
  const localServiceSlug = `${s}-${citySlug}`;
  if (SERVICE_CITY_COMBO_SLUGS.includes(localServiceSlug)) {
    addLink(from, `/services/${localServiceSlug}`);
  } else {
    const hub = getAgencyHubByCity(citySlug);
    if (hub) addLink(from, `/agences/${hub.slug}`);
  }
}

// Pages service-ville
for (const c of SERVICE_CITY_COMBOS) {
  const from = `/services/${c.slug}`;
  addResolved(from, "service-city", c.slug);
  addLink(from, `/services/${c.service}`); // lien explicite vers le service parent
  addLink(from, "/contact");
  addLink(from, "/case-studies");
  const agencyHub = getAgencyHubByCity(c.villeSlug);
  if (agencyHub) addLink(from, `/agences/${agencyHub.slug}`);
}

// Hubs agence : lien exhaustif vers chaque service-ville réellement généré
for (const hub of AGENCY_HUBS) {
  const from = `/agences/${hub.slug}`;
  for (const combo of SERVICE_CITY_COMBOS.filter(
    (item) => item.villeSlug === hub.villeSlug
  )) {
    addLink(from, `/services/${combo.slug}`);
  }
  addResolved(from, "agency-hub", hub.slug);
  addLink(from, "/contact");
}

// Pages industrie : services recommandés + case studies liés
for (const s of INDUSTRY_SLUGS) {
  const from = `/industries/${s}`;
  const rec = industryServiceMap[s] ?? ["meta-ads", "corporate-websites", "brand-identity"];
  for (const svc of rec) addLink(from, `/services/${svc}`);
  for (const cs of industryCaseStudyMap[s] ?? []) addLink(from, `/case-studies/${cs}`);
  addResolved(from, "industry", s);
  addLink(from, "/contact");
  addLink(from, "/case-studies");
}

// Pages solution
for (const s of SOLUTION_SLUGS) {
  addResolved(`/solutions/${s}`, "solution", s);
  addLink(`/solutions/${s}`, "/contact");
  addLink(`/solutions/${s}`, "/case-studies");
}

// Articles blog : sections + sidebar + prev/next + retour hub
for (const s of BLOG_POST_SLUGS) {
  const from = `/blog/${s}`;
  addResolved(from, "blog", s);
  const { prev, next } = resolvePreviousNext(s);
  if (prev) addLink(from, prev.path);
  if (next) addLink(from, next.path);
  addLink(from, "/blog");
  addLink(from, "/contact");
}

// Guides : sections + /contact + /pricing
for (const s of GUIDE_SLUGS) {
  const from = `/guides/${s}`;
  addResolved(from, "guide", s);
  addLink(from, "/contact");
  addLink(from, "/pricing");
}

// Comparateurs
for (const s of COMPARISON_SLUGS) {
  addResolved(`/compare/${s}`, "comparison", s);
  addLink(`/compare/${s}`, "/contact");
}

// Case studies
for (const s of CASE_STUDY_SLUGS) {
  addResolved(`/case-studies/${s}`, "case-study", s);
  addLink(`/case-studies/${s}`, "/contact");
}

// ---------- 3. Rapport ----------
const rows = routes.map((r) => ({
  path: r.path,
  kind: r.kind,
  inbound: inbound.get(r.path)?.size ?? 0,
}));

const byKind: Record<string, { total: number; orphans: number; min: number; max: number; sum: number }> = {};
for (const row of rows) {
  const k = (byKind[row.kind] ??= { total: 0, orphans: 0, min: Infinity, max: 0, sum: 0 });
  k.total++;
  k.sum += row.inbound;
  k.min = Math.min(k.min, row.inbound);
  k.max = Math.max(k.max, row.inbound);
  if (row.inbound <= 1) k.orphans++;
}

console.log("=== Synthèse par type de page (liens contextuels entrants, hors nav/footer) ===");
for (const [kind, k] of Object.entries(byKind)) {
  console.log(
    `${kind.padEnd(14)} pages:${String(k.total).padStart(4)}  orphelines(≤1):${String(k.orphans).padStart(4)}  min:${k.min}  max:${k.max}  moyenne:${(k.sum / k.total).toFixed(1)}`
  );
}

const orphans = rows.filter((r) => r.inbound <= 1).sort((a, b) => a.inbound - b.inbound || a.path.localeCompare(b.path));
console.log(`\n=== Pages orphelines (0 ou 1 lien entrant contextuel) : ${orphans.length} ===`);
for (const o of orphans) {
  console.log(`${String(o.inbound)}  ${o.kind.padEnd(13)} ${o.path}`);
}

// Distribution des service-city
const scRows = rows.filter((r) => r.kind === "service-city");
const dist: Record<number, number> = {};
for (const r of scRows) dist[r.inbound] = (dist[r.inbound] ?? 0) + 1;
console.log("\n=== Distribution liens entrants pages service-ville ===");
for (const [n, count] of Object.entries(dist).sort((a, b) => Number(a[0]) - Number(b[0]))) {
  console.log(`${n} lien(s) entrant(s) : ${count} pages`);
}
