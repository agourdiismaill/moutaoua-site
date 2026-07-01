/** Structural identifiers — translatable strings live in messages/{locale}/*.json */

export const SERVICE_SLUGS = [
  "meta-ads",
  "google-ads",
  "marketing-automation",
  "landing-pages",
  "social-media",
  "crm-data",
] as const;

export const FAQ_IDS = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"] as const;

export const PRICING_IDS = ["start", "performance", "premium"] as const;

export const STAT_IDS = ["impressions", "leads", "roas", "campaigns"] as const;

export const RESULT_IDS = [
  "meta-ads",
  "tiktok-ads",
  "google-ads",
  "lead-forms",
  "crm",
  "whatsapp",
] as const;

export const VIDEO_IDS = ["v1", "v2", "v3", "v4", "v5", "v6"] as const;

export const TESTIMONIAL_IDS = ["t1", "t2", "t3", "t4", "t5", "t6"] as const;

export const CASE_STUDY_SLUGS = [
  "skola-formation",
  "campusup-search",
  "edunext-automation",
  "millennia-group-prive",
] as const;

export const CASE_STUDY_PUBLISHED: Record<
  (typeof CASE_STUDY_SLUGS)[number],
  string
> = {
  "skola-formation": "2024-06-01",
  "campusup-search": "2024-09-01",
  "edunext-automation": "2025-01-15",
  "millennia-group-prive": "2025-03-01",
};

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type FaqId = (typeof FAQ_IDS)[number];
export type PricingId = (typeof PRICING_IDS)[number];
export type StatId = (typeof STAT_IDS)[number];
export type ResultId = (typeof RESULT_IDS)[number];
export type VideoId = (typeof VIDEO_IDS)[number];
export type TestimonialId = (typeof TESTIMONIAL_IDS)[number];
export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];
