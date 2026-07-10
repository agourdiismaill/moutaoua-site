/**
 * Central content registry for internal linking.
 * Structural metadata only — translatable strings live in messages/{locale}/*.json
 */

import {
  BLOG_CATEGORIES,
  BLOG_POST_SLUGS,
  BLOG_PUBLISHED,
  COMPARISON_SLUGS,
  GUIDE_SLUGS,
  type BlogPostSlug,
} from "@/data/blog";
import { CASE_STUDY_PUBLISHED, CASE_STUDY_SLUGS, SERVICE_SLUGS } from "@/data/meta";

export type ContentType =
  | "service"
  | "blog"
  | "guide"
  | "comparison"
  | "case-study"
  | "resource";

export type ContentNode = {
  id: string;
  type: ContentType;
  slug: string;
  path: string;
  topics: string[];
  services?: string[];
  category?: (typeof BLOG_CATEGORIES)[number];
  tags?: string[];
  priority?: number;
  published?: string;
};

/** Normalize free-text tags to canonical topic keys */
export const TAG_ALIASES: Record<string, string> = {
  "meta ads": "meta-ads",
  "meta-ads": "meta-ads",
  "facebook ads": "meta-ads",
  "instagram ads": "meta-ads",
  "google ads": "google-ads",
  "google-ads": "google-ads",
  "performance max": "google-ads",
  search: "google-ads",
  automation: "marketing-automation",
  "marketing-automation": "marketing-automation",
  whatsapp: "marketing-automation",
  nurturing: "marketing-automation",
  crm: "crm-data",
  "crm-data": "crm-data",
  hubspot: "crm-data",
  pipedrive: "crm-data",
  cro: "landing-pages",
  "landing page": "landing-pages",
  "landing-pages": "landing-pages",
  conversion: "landing-pages",
  "social media": "social-media",
  "social-media": "social-media",
  branding: "social-media",
  acquisition: "acquisition",
  publicite: "publicite",
  leads: "acquisition",
};

export function normalizeTopic(raw: string): string {
  const key = raw.toLowerCase().trim();
  return TAG_ALIASES[key] ?? key.replace(/\s+/g, "-");
}

export function normalizeTopics(raw: string[]): string[] {
  return [...new Set(raw.map(normalizeTopic))];
}

const blogMeta: Record<
  BlogPostSlug,
  { category: (typeof BLOG_CATEGORIES)[number]; services: string[]; topics: string[]; priority?: number }
> = {
  "generer-leads-centre-formation-maroc": {
    category: "acquisition",
    services: ["meta-ads", "google-ads", "landing-pages"],
    topics: ["acquisition", "leads", "meta-ads", "google-ads"],
    priority: 90,
  },
  "meta-ads-vs-google-ads-formation": {
    category: "publicite",
    services: ["meta-ads", "google-ads"],
    topics: ["meta-ads", "google-ads", "publicite"],
    priority: 85,
  },
  "checklist-landing-page-formation": {
    category: "conversion",
    services: ["landing-pages", "marketing-automation"],
    topics: ["landing-pages", "conversion", "cro"],
    priority: 80,
  },
  "whatsapp-convertir-leads-formation-maroc": {
    category: "conversion",
    services: ["marketing-automation", "crm-data"],
    topics: ["whatsapp", "conversion", "crm-data", "marketing-automation"],
    priority: 95,
  },
  "budget-marketing-centre-formation-maroc": {
    category: "acquisition",
    services: ["meta-ads", "google-ads", "landing-pages"],
    topics: ["acquisition", "budget", "cpl", "meta-ads", "google-ads"],
    priority: 88,
  },
};

const guideMeta: Record<string, { services: string[]; topics: string[]; priority?: number }> = {
  "meta-ads-centre-formation": {
    services: ["meta-ads"],
    topics: ["meta-ads", "publicite", "acquisition"],
    priority: 90,
  },
  "google-ads-centre-formation": {
    services: ["google-ads"],
    topics: ["google-ads", "publicite", "acquisition"],
    priority: 88,
  },
};

const caseStudyMeta: Record<string, { tags: string[]; services: string[]; priority?: number }> = {
  "skola-formation": {
    tags: ["Meta Ads", "CRO", "Automation"],
    services: ["meta-ads", "landing-pages", "marketing-automation"],
    priority: 92,
  },
  "campusup-search": {
    tags: ["Google Ads", "Performance Max"],
    services: ["google-ads", "landing-pages"],
    priority: 88,
  },
  "edunext-automation": {
    tags: ["Automation", "CRM", "WhatsApp"],
    services: ["marketing-automation", "crm-data"],
    priority: 85,
  },
  "millennia-group-prive": {
    tags: ["Social Media", "Branding"],
    services: ["social-media", "meta-ads"],
    priority: 80,
  },
};

/** Explicit high-confidence relations (boosted in resolver) */
export const EXPLICIT_RELATIONS: Record<
  string,
  Partial<Record<ContentType, string[]>>
> = {
  "meta-ads": {
    service: ["google-ads", "landing-pages", "marketing-automation", "crm-data"],
    guide: ["meta-ads-centre-formation"],
    "case-study": ["skola-formation"],
    blog: ["meta-ads-vs-google-ads-formation", "generer-leads-centre-formation-maroc"],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "google-ads": {
    service: ["meta-ads", "landing-pages", "crm-data"],
    guide: ["google-ads-centre-formation"],
    "case-study": ["campusup-search"],
    blog: ["meta-ads-vs-google-ads-formation", "generer-leads-centre-formation-maroc"],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "marketing-automation": {
    service: ["crm-data", "landing-pages", "meta-ads"],
    "case-study": ["edunext-automation"],
    blog: ["whatsapp-convertir-leads-formation-maroc", "checklist-landing-page-formation"],
  },
  "landing-pages": {
    service: ["meta-ads", "google-ads", "marketing-automation"],
    blog: ["checklist-landing-page-formation", "generer-leads-centre-formation-maroc"],
    "case-study": ["skola-formation"],
  },
  "social-media": {
    service: ["meta-ads", "landing-pages"],
    "case-study": ["millennia-group-prive"],
  },
  "crm-data": {
    service: ["marketing-automation", "meta-ads", "google-ads"],
    "case-study": ["edunext-automation"],
    blog: ["whatsapp-convertir-leads-formation-maroc"],
  },
  "generer-leads-centre-formation-maroc": {
    service: ["meta-ads", "google-ads", "landing-pages"],
    blog: ["meta-ads-vs-google-ads-formation", "whatsapp-convertir-leads-formation-maroc"],
    guide: ["meta-ads-centre-formation", "google-ads-centre-formation"],
    "case-study": ["skola-formation", "campusup-search"],
  },
  "meta-ads-vs-google-ads-formation": {
    service: ["meta-ads", "google-ads"],
    comparison: ["meta-ads-vs-google-ads"],
    guide: ["meta-ads-centre-formation", "google-ads-centre-formation"],
    blog: ["generer-leads-centre-formation-maroc", "checklist-landing-page-formation"],
  },
  "checklist-landing-page-formation": {
    service: ["landing-pages", "marketing-automation", "meta-ads"],
    blog: ["whatsapp-convertir-leads-formation-maroc", "generer-leads-centre-formation-maroc"],
    "case-study": ["skola-formation"],
  },
  "whatsapp-convertir-leads-formation-maroc": {
    service: ["marketing-automation", "crm-data"],
    blog: ["checklist-landing-page-formation", "generer-leads-centre-formation-maroc"],
    "case-study": ["edunext-automation"],
  },
  "budget-marketing-centre-formation-maroc": {
    service: ["meta-ads", "google-ads", "landing-pages"],
    blog: ["generer-leads-centre-formation-maroc", "meta-ads-vs-google-ads-formation"],
    guide: ["meta-ads-centre-formation", "google-ads-centre-formation"],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "meta-ads-centre-formation": {
    service: ["meta-ads", "landing-pages", "google-ads"],
    blog: ["meta-ads-vs-google-ads-formation", "generer-leads-centre-formation-maroc"],
    guide: ["google-ads-centre-formation"],
    "case-study": ["skola-formation"],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "google-ads-centre-formation": {
    service: ["google-ads", "landing-pages", "meta-ads"],
    blog: ["meta-ads-vs-google-ads-formation"],
    guide: ["meta-ads-centre-formation"],
    "case-study": ["campusup-search"],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "meta-ads-vs-google-ads": {
    service: ["meta-ads", "google-ads"],
    blog: ["meta-ads-vs-google-ads-formation"],
    guide: ["meta-ads-centre-formation", "google-ads-centre-formation"],
  },
  "skola-formation": {
    service: ["meta-ads", "landing-pages", "marketing-automation"],
    blog: ["generer-leads-centre-formation-maroc", "meta-ads-vs-google-ads-formation"],
    guide: ["meta-ads-centre-formation"],
  },
  "campusup-search": {
    service: ["google-ads", "landing-pages"],
    blog: ["meta-ads-vs-google-ads-formation"],
    guide: ["google-ads-centre-formation"],
  },
  "edunext-automation": {
    service: ["marketing-automation", "crm-data"],
    blog: ["whatsapp-convertir-leads-formation-maroc", "checklist-landing-page-formation"],
  },
  "millennia-group-prive": {
    service: ["social-media", "meta-ads"],
  },
};

const serviceRelations: Record<string, string[]> = {
  "meta-ads": ["google-ads", "landing-pages", "marketing-automation", "crm-data"],
  "google-ads": ["meta-ads", "landing-pages", "crm-data"],
  "marketing-automation": ["crm-data", "landing-pages", "meta-ads"],
  "landing-pages": ["meta-ads", "google-ads", "marketing-automation"],
  "social-media": ["meta-ads", "landing-pages", "marketing-automation"],
  "crm-data": ["marketing-automation", "meta-ads", "google-ads"],
};

function buildServiceNodes(): ContentNode[] {
  return SERVICE_SLUGS.map((slug) => ({
    id: `service:${slug}`,
    type: "service" as const,
    slug,
    path: `/services/${slug}`,
    topics: normalizeTopics([slug, ...(serviceRelations[slug] ?? [])]),
    services: [slug],
    priority: 70,
  }));
}

function buildBlogNodes(): ContentNode[] {
  return BLOG_POST_SLUGS.map((slug) => {
    const meta = blogMeta[slug];
    return {
      id: `blog:${slug}`,
      type: "blog" as const,
      slug,
      path: `/blog/${slug}`,
      topics: meta.topics,
      services: meta.services,
      category: meta.category,
      priority: meta.priority,
      published: BLOG_PUBLISHED[slug],
    };
  });
}

function buildGuideNodes(): ContentNode[] {
  return GUIDE_SLUGS.map((slug) => {
    const meta = guideMeta[slug];
    return {
      id: `guide:${slug}`,
      type: "guide" as const,
      slug,
      path: `/guides/${slug}`,
      topics: meta.topics,
      services: meta.services,
      priority: meta.priority,
    };
  });
}

function buildComparisonNodes(): ContentNode[] {
  return COMPARISON_SLUGS.map((slug) => ({
    id: `comparison:${slug}`,
    type: "comparison" as const,
    slug,
    path: `/compare/${slug}`,
    topics: normalizeTopics(["meta-ads", "google-ads", "publicite"]),
    services: ["meta-ads", "google-ads"],
    priority: 75,
  }));
}

function buildCaseStudyNodes(): ContentNode[] {
  return CASE_STUDY_SLUGS.map((slug) => {
    const meta = caseStudyMeta[slug];
    return {
      id: `case-study:${slug}`,
      type: "case-study" as const,
      slug,
      path: `/case-studies/${slug}`,
      topics: normalizeTopics(meta.tags),
      services: meta.services,
      tags: normalizeTopics(meta.tags),
      priority: meta.priority,
      published: CASE_STUDY_PUBLISHED[slug],
    };
  });
}

const RESOURCE_NODES: ContentNode[] = [
  {
    id: "resource:case-studies",
    type: "resource",
    slug: "case-studies",
    path: "/case-studies",
    topics: ["case-studies", "results"],
    priority: 60,
  },
  {
    id: "resource:pricing",
    type: "resource",
    slug: "pricing",
    path: "/pricing",
    topics: ["pricing", "acquisition"],
    priority: 55,
  },
  {
    id: "resource:results",
    type: "resource",
    slug: "results",
    path: "/results",
    topics: ["results", "roas", "meta-ads", "google-ads"],
    priority: 58,
  },
  {
    id: "resource:videos",
    type: "resource",
    slug: "videos",
    path: "/videos",
    topics: ["videos", "case-studies"],
    priority: 50,
  },
  {
    id: "resource:contact",
    type: "resource",
    slug: "contact",
    path: "/contact",
    topics: ["contact", "audit", "acquisition"],
    priority: 65,
  },
  {
    id: "resource:blog",
    type: "resource",
    slug: "blog",
    path: "/blog",
    topics: ["blog", "acquisition", "conversion"],
    priority: 52,
  },
];

export const CONTENT_NODES: ContentNode[] = [
  ...buildServiceNodes(),
  ...buildBlogNodes(),
  ...buildGuideNodes(),
  ...buildComparisonNodes(),
  ...buildCaseStudyNodes(),
  ...RESOURCE_NODES,
];

export const CONTENT_NODE_MAP = new Map(CONTENT_NODES.map((n) => [n.id, n]));

export function getRelatedServiceSlugs(slug: string): string[] {
  return serviceRelations[slug] ?? SERVICE_SLUGS.filter((s) => s !== slug).slice(0, 3);
}

export function getContentNode(type: ContentType, slug: string): ContentNode | undefined {
  return CONTENT_NODE_MAP.get(`${type}:${slug}`);
}

export function getCurrentNodeId(type: ContentType, slug: string): string {
  return `${type}:${slug}`;
}

/** Default section order and limits per page type */
export const PAGE_LINKING_CONFIG: Record<
  ContentType,
  { sections: ContentType[]; limits: Partial<Record<ContentType, number>> }
> = {
  service: {
    sections: ["service", "blog", "guide", "case-study", "resource"],
    limits: { service: 3, blog: 3, guide: 2, "case-study": 2, resource: 4 },
  },
  blog: {
    sections: ["blog", "service", "guide", "comparison", "resource"],
    limits: { blog: 3, service: 3, guide: 2, comparison: 1, resource: 4 },
  },
  guide: {
    sections: ["guide", "blog", "service", "resource"],
    limits: { guide: 2, blog: 3, service: 3, resource: 3 },
  },
  "case-study": {
    sections: ["service", "blog", "guide", "resource"],
    limits: { service: 3, blog: 2, guide: 2, resource: 3 },
  },
  comparison: {
    sections: ["service", "blog", "guide", "resource"],
    limits: { service: 2, blog: 2, guide: 2, resource: 3 },
  },
  resource: {
    sections: ["blog", "guide", "service", "resource"],
    limits: { blog: 3, guide: 2, service: 2, resource: 3 },
  },
};
