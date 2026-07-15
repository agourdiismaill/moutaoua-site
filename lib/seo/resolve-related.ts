import {
  BLOG_POST_SLUGS,
  BLOG_PUBLISHED,
  type BlogPostSlug,
} from "@/data/blog";
import {
  CONTENT_NODES,
  EXPLICIT_RELATIONS,
  PAGE_LINKING_CONFIG,
  getContentNode,
  getCurrentNodeId,
  normalizeTopics,
  type ContentNode,
  type ContentType,
} from "@/data/content-graph";
import { getServiceCityCombo, type CitySlug } from "@/data/service-city-combos";
import { getAgencyHub, getAgencyHubForServiceCity } from "@/data/agency-hubs";
import { INDUSTRY_SLUGS } from "@/data/industries";
import { SERVICE_SLUGS } from "@/data/meta";

/** Ordre canonique des villes pour la rotation du maillage */
const CITY_ORDER: CitySlug[] = [
  "casablanca",
  "rabat",
  "marrakech",
  "tanger",
  "agadir",
  "fes",
  "meknes",
  "oujda",
  "kenitra",
];

function cityIndexOf(serviceCitySlug: string): number {
  const combo = getServiceCityCombo(serviceCitySlug);
  return combo ? CITY_ORDER.indexOf(combo.villeSlug) : -1;
}

/** Distance cyclique (1..n-1) entre deux positions d'un anneau */
function ringDistance(from: number, to: number, size: number): number {
  return ((to - from) % size + size) % size;
}

function getNodeCity(node: ContentNode): CitySlug | undefined {
  if (node.type === "service-city") {
    return getServiceCityCombo(node.slug)?.villeSlug;
  }
  if (node.type === "agency-hub") {
    return getAgencyHub(node.slug)?.villeSlug;
  }
  return undefined;
}

export type ScoredNode = ContentNode & { score: number };

export type ResolveContext = {
  type: ContentType;
  slug: string;
  sections?: ContentType[];
  limits?: Partial<Record<ContentType, number>>;
};

export type ResolvedSections = Partial<Record<ContentType, ScoredNode[]>>;

function topicOverlap(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setB = new Set(b);
  const intersection = a.filter((t) => setB.has(t)).length;
  const union = new Set([...a, ...b]).size;
  return intersection / union;
}

function scoreCandidate(current: ContentNode, candidate: ContentNode): number {
  if (current.id === candidate.id) return -Infinity;

  let score = 0;

  const explicit = EXPLICIT_RELATIONS[current.slug]?.[candidate.type];
  if (explicit?.includes(candidate.slug)) score += 50;

  const currentServices = current.services ?? [];
  const candidateServices = candidate.services ?? [];
  if (currentServices.some((s) => candidateServices.includes(s))) score += 40;

  const currentSolutions = current.solutions ?? [];
  const candidateSolutions = candidate.solutions ?? [];
  if (currentSolutions.some((s) => candidateSolutions.includes(s))) score += 35;

  if (
    current.type === "service-city" &&
    candidate.type === "service-city" &&
    current.services?.[0] &&
    current.services[0] === candidate.services?.[0] &&
    current.slug !== candidate.slug
  ) {
    // Rotation en anneau : chaque page ville pointe vers les 4 villes
    // suivantes du cycle, pour qu'aucune ville ne reste orpheline.
    const curCity = cityIndexOf(current.slug);
    const candCity = cityIndexOf(candidate.slug);
    if (curCity >= 0 && candCity >= 0) {
      const d = ringDistance(curCity, candCity, CITY_ORDER.length);
      score += d >= 1 && d <= 4 ? 45 + (5 - d) : 10;
    } else {
      score += 45;
    }
  }

  if (
    (current.type === "agency-hub" && candidate.type === "service-city") ||
    (current.type === "service-city" && candidate.type === "agency-hub")
  ) {
    const currentCity = getNodeCity(current);
    const candidateCity = getNodeCity(candidate);
    if (!currentCity || !candidateCity || currentCity !== candidateCity) {
      return -Infinity;
    }
    // Un service-ville ne relie qu'un seul hub : celui choisi par le routage
    // réciproque (communication pour les services créatifs/contenus, digitale
    // sinon). On aligne la parenté sur getAgencyHubForServiceCity pour que la
    // section "contenus liés" et le lien contextuel désignent le même hub.
    const hubNode = current.type === "agency-hub" ? current : candidate;
    const cityNode = current.type === "service-city" ? current : candidate;
    const hub = getAgencyHub(hubNode.slug);
    const combo = getServiceCityCombo(cityNode.slug);
    if (hub && combo) {
      const allowedHub = getAgencyHubForServiceCity(
        combo.service,
        combo.villeSlug
      );
      if (allowedHub && allowedHub.slug !== hub.slug) {
        return -Infinity;
      }
    }
    score += 60;
  }

  if (
    current.type === "service" &&
    candidate.type === "service-city" &&
    current.services?.[0] === candidate.services?.[0]
  ) {
    // Décalage par service : les pages service ne pointent pas toutes
    // vers les mêmes villes, la couverture tourne sur les 9 villes.
    const serviceIdx = SERVICE_SLUGS.indexOf(
      current.slug as (typeof SERVICE_SLUGS)[number]
    );
    const candCity = cityIndexOf(candidate.slug);
    if (serviceIdx >= 0 && candCity >= 0) {
      const start = serviceIdx % CITY_ORDER.length;
      const d = ringDistance(start, candCity, CITY_ORDER.length);
      score += 35 + (CITY_ORDER.length - d);
    } else {
      score += 35;
    }
  }

  if (current.type === "industry" && candidate.type === "industry") {
    // Rotation en anneau entre industries : garantit >=3 liens entrants
    // à chaque page industrie, y compris les non "featured".
    const curIdx = INDUSTRY_SLUGS.indexOf(
      current.slug as (typeof INDUSTRY_SLUGS)[number]
    );
    const candIdx = INDUSTRY_SLUGS.indexOf(
      candidate.slug as (typeof INDUSTRY_SLUGS)[number]
    );
    if (curIdx >= 0 && candIdx >= 0) {
      const d = ringDistance(curIdx, candIdx, INDUSTRY_SLUGS.length);
      if (d >= 1 && d <= 3) score += 40 + (4 - d);
    }
  }

  if (
    current.type === "service-city" &&
    candidate.type === "service" &&
    current.services?.[0] === candidate.slug
  ) {
    score += 50;
  }

  score += topicOverlap(current.topics, candidate.topics) * 25;

  if (current.category && candidate.category === current.category) score += 20;

  const currentTags = current.tags ?? [];
  const candidateTags = candidate.tags ?? [];
  if (currentTags.length > 0 && candidateTags.length > 0) {
    score += topicOverlap(currentTags, candidateTags) * 15;
  }

  if (candidate.priority) score += candidate.priority * 0.05;

  if (candidate.published) {
    const age = Date.now() - new Date(candidate.published).getTime();
    const days = age / (1000 * 60 * 60 * 24);
    if (days < 90) score += 5;
  }

  return score;
}

function getCurrentNode(type: ContentType, slug: string): ContentNode {
  const node = getContentNode(type, slug);
  if (node) return node;

  return {
    id: getCurrentNodeId(type, slug),
    type,
    slug,
    path:
      type === "agency-hub"
        ? `/agences/${slug}`
        : type === "industry"
        ? `/industries/${slug}`
        : type === "solution"
          ? `/solutions/${slug}`
          : type === "case-study"
            ? `/case-studies/${slug}`
            : type === "service" || type === "service-city"
              ? `/services/${slug}`
              : `/${type}/${slug}`,
    topics: normalizeTopics([slug]),
  };
}

export function resolveRelatedContent(ctx: ResolveContext): ResolvedSections {
  const config = PAGE_LINKING_CONFIG[ctx.type];
  const sections = ctx.sections ?? config.sections;
  const limits = { ...config.limits, ...ctx.limits };
  const current = getCurrentNode(ctx.type, ctx.slug);
  const usedHrefs = new Set<string>([current.path]);
  const result: ResolvedSections = {};

  for (const sectionType of sections) {
    const limit = limits[sectionType] ?? 3;
    const candidates = CONTENT_NODES.filter((n) => n.type === sectionType);

    const scored = candidates
      .map((candidate) => ({
        ...candidate,
        score: scoreCandidate(current, candidate),
      }))
      .filter((c) => c.score > -Infinity)
      .sort((a, b) => b.score - a.score);

    const picked: ScoredNode[] = [];
    for (const item of scored) {
      if (picked.length >= limit) break;
      if (usedHrefs.has(item.path)) continue;
      usedHrefs.add(item.path);
      picked.push(item);
    }

    if (picked.length > 0) {
      result[sectionType] = picked;
    }
  }

  return result;
}

export function resolvePreviousNext(slug: string): {
  prev?: ContentNode;
  next?: ContentNode;
} {
  if (!BLOG_POST_SLUGS.includes(slug as BlogPostSlug)) return {};

  const sorted = [...BLOG_POST_SLUGS].sort(
    (a, b) =>
      new Date(BLOG_PUBLISHED[a]).getTime() - new Date(BLOG_PUBLISHED[b]).getTime()
  );

  const index = sorted.indexOf(slug as BlogPostSlug);
  if (index === -1) return {};

  const prevSlug = index > 0 ? sorted[index - 1] : undefined;
  const nextSlug = index < sorted.length - 1 ? sorted[index + 1] : undefined;

  return {
    prev: prevSlug ? getContentNode("blog", prevSlug) : undefined,
    next: nextSlug ? getContentNode("blog", nextSlug) : undefined,
  };
}

export function resolveLatest(type: "blog" | "guide", limit = 3): ContentNode[] {
  return CONTENT_NODES.filter((n) => n.type === type)
    .sort((a, b) => {
      const dateA = a.published ? new Date(a.published).getTime() : 0;
      const dateB = b.published ? new Date(b.published).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit);
}

export function resolvePopular(type: ContentType, limit = 3, excludeSlug?: string): ContentNode[] {
  return CONTENT_NODES.filter(
    (n) => n.type === type && n.slug !== excludeSlug
  )
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    .slice(0, limit);
}
