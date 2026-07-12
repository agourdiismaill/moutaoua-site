/** Blog structural identifiers — content lives in messages/{locale}/blog.json */

export const BLOG_POST_SLUGS = [
  "generer-leads-centre-formation-maroc",
  "meta-ads-vs-google-ads-formation",
  "checklist-landing-page-formation",
  "whatsapp-convertir-leads-formation-maroc",
  "budget-marketing-centre-formation-maroc",
  "campagne-inscriptions-rentree-formation-maroc",
  "retargeting-leads-formation-maroc",
] as const;

export const BLOG_CATEGORIES = [
  "acquisition",
  "publicite",
  "conversion",
] as const;

export const GUIDE_SLUGS = [
  "meta-ads-centre-formation",
  "google-ads-centre-formation",
] as const;

export const COMPARISON_SLUGS = [
  "meta-ads-vs-google-ads",
] as const;

export type BlogPostSlug = (typeof BLOG_POST_SLUGS)[number];
export type GuideSlug = (typeof GUIDE_SLUGS)[number];
export type ComparisonSlug = (typeof COMPARISON_SLUGS)[number];

export const BLOG_PUBLISHED: Record<BlogPostSlug, string> = {
  "generer-leads-centre-formation-maroc": "2026-03-15",
  "meta-ads-vs-google-ads-formation": "2026-04-02",
  "checklist-landing-page-formation": "2026-05-10",
  "whatsapp-convertir-leads-formation-maroc": "2026-07-10",
  "budget-marketing-centre-formation-maroc": "2026-07-11",
  "campagne-inscriptions-rentree-formation-maroc": "2026-07-12",
  "retargeting-leads-formation-maroc": "2026-07-13",
};

export const AUTHOR = {
  name: "Équipe Mohtaoua",
  role: "Agence marketing formation",
  bio: "Spécialistes de l'acquisition digitale pour centres de formation au Maroc depuis 2019.",
} as const;
