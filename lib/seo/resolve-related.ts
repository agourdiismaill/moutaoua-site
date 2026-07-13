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
      type === "industry"
        ? `/industries/${slug}`
        : type === "solution"
          ? `/solutions/${slug}`
          : type === "case-study"
            ? `/case-studies/${slug}`
            : type === "service"
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
