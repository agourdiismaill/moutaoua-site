import type { RelatedLink } from "./types";
import { getRelatedServiceSlugs } from "@/data/content-graph";
import { SERVICE_SLUGS } from "@/data/meta";

export { getRelatedServiceSlugs } from "@/data/content-graph";

export function buildServiceRelatedLinks(
  slug: string,
  getTitle: (s: string) => string,
  getDescription: (s: string) => string
): RelatedLink[] {
  return getRelatedServiceSlugs(slug).map((relatedSlug) => ({
    title: getTitle(relatedSlug),
    description: getDescription(relatedSlug),
    href: `/services/${relatedSlug}`,
  }));
}

export const globalResourceLinks = [
  { href: "/case-studies", key: "caseStudies" },
  { href: "/pricing", key: "pricing" },
  { href: "/results", key: "results" },
  { href: "/contact", key: "contact" },
] as const;

/** @deprecated Use getRelatedServiceSlugs from content-graph */
export function getRelatedServiceSlugsLegacy(slug: string): string[] {
  return getRelatedServiceSlugs(slug) ?? SERVICE_SLUGS.filter((s) => s !== slug).slice(0, 3);
}
