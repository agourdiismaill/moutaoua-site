/** Blog structural identifiers — content lives in messages/{locale}/blog.json */

export const BLOG_POST_SLUGS = [
  "generer-leads-centre-formation-maroc",
  "meta-ads-vs-google-ads-formation",
  "checklist-landing-page-formation",
  "whatsapp-convertir-leads-formation-maroc",
  "budget-marketing-centre-formation-maroc",
  "campagne-inscriptions-rentree-formation-maroc",
  "retargeting-leads-formation-maroc",
  "transformation-digitale-pme-maroc",
  "tiktok-ads-maroc-guide",
  "crm-entreprise-maroc-guide",
  "marketing-automation-maroc-guide",
] as const;

export const BLOG_CATEGORIES = [
  "marketing",
  "development",
  "ai",
  "automation",
  "business",
  "branding",
  "design",
  "seo",
  "geo",
  "case-studies",
  "acquisition",
  "publicite",
  "conversion",
] as const;

export const GUIDE_SLUGS = [
  "meta-ads-centre-formation",
  "google-ads-centre-formation",
  "seo-entreprise-maroc",
  "agence-digitale-maroc-guide",
  "comment-creer-site-web-professionnel",
  "combien-coute-site-web-maroc",
  "guide-marketing-digital-maroc",
] as const;

export const COMPARISON_SLUGS = [
  "meta-ads-vs-google-ads",
  "seo-vs-google-ads",
  "wordpress-vs-laravel",
  "crm-vs-excel",
  "erp-vs-crm",
  "flutter-vs-react-native",
] as const;

export type BlogPostSlug = (typeof BLOG_POST_SLUGS)[number];
export type GuideSlug = (typeof GUIDE_SLUGS)[number];
export type ComparisonSlug = (typeof COMPARISON_SLUGS)[number];

export const BLOG_COVERS: Record<BlogPostSlug, string> = Object.fromEntries(
  BLOG_POST_SLUGS.map((slug) => [slug, `/blog/${slug}.webp`])
) as Record<BlogPostSlug, string>;

export const BLOG_PUBLISHED: Record<BlogPostSlug, string> = {
  "generer-leads-centre-formation-maroc": "2026-03-15",
  "meta-ads-vs-google-ads-formation": "2026-04-02",
  "checklist-landing-page-formation": "2026-05-10",
  "whatsapp-convertir-leads-formation-maroc": "2026-07-10",
  "budget-marketing-centre-formation-maroc": "2026-07-11",
  "campagne-inscriptions-rentree-formation-maroc": "2026-07-12",
  "retargeting-leads-formation-maroc": "2026-07-13",
  "transformation-digitale-pme-maroc": "2026-07-14",
  "tiktok-ads-maroc-guide": "2026-07-15",
  "crm-entreprise-maroc-guide": "2026-07-16",
  "marketing-automation-maroc-guide": "2026-07-17",
};

export const AUTHOR = {
  name: "Équipe Mohtaoua",
  role: "Agence digitale premium",
  bio: "Experts en marketing, technologie, design et automatisation pour entreprises de tous secteurs au Maroc depuis 2019.",
} as const;
