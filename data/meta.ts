/** Structural identifiers — translatable strings live in messages/{locale}/*.json */

export const SERVICE_SLUGS = [
  // Marketing
  "meta-ads",
  "google-ads",
  "tiktok-ads",
  "seo",
  "geo",
  "content-marketing",
  "email-marketing",
  "marketing-automation",
  "crm-data",
  "lead-generation",
  "community-management",
  // Web
  "corporate-websites",
  "landing-pages",
  "e-commerce",
  "booking-platforms",
  "marketplaces",
  "portals",
  // Software
  "erp",
  "custom-software",
  "saas",
  "business-platforms",
  "automation",
  "ai-agents",
  "chatbots",
  "workflow-automation",
  "api-integration",
  // Mobile
  "android",
  "ios",
  "flutter",
  "react-native",
  // Creative
  "brand-identity",
  "logo",
  "graphic-design",
  "brochure",
  "catalogue",
  "flyers",
  "packaging",
  "infographics",
  "presentation-design",
  // Photo & Video
  "commercial-photography",
  "corporate-photography",
  "product-photography",
  "video-production",
  "drone",
  "reels",
  "motion-graphics",
  // Events
  "corporate-events",
  "conferences",
  "training-events",
  "booth-design",
  "brand-activation",
  "event-communication",
  // Legacy alias kept for backward compat
  "social-media",
] as const;

/** Services with full dedicated page content in servicePages.json */
export const SERVICE_DETAIL_SLUGS = [
  "meta-ads",
  "google-ads",
  "tiktok-ads",
  "seo",
  "geo",
  "content-marketing",
  "email-marketing",
  "marketing-automation",
  "crm-data",
  "lead-generation",
  "community-management",
  "corporate-websites",
  "landing-pages",
  "e-commerce",
  "booking-platforms",
  "marketplaces",
  "portals",
  "erp",
  "custom-software",
  "saas",
  "business-platforms",
  "automation",
  "ai-agents",
  "chatbots",
  "workflow-automation",
  "api-integration",
  "android",
  "ios",
  "flutter",
  "react-native",
  "brand-identity",
  "logo",
  "graphic-design",
  "brochure",
  "catalogue",
  "flyers",
  "packaging",
  "infographics",
  "presentation-design",
  "commercial-photography",
  "corporate-photography",
  "product-photography",
  "video-production",
  "drone",
  "reels",
  "motion-graphics",
  "corporate-events",
  "conferences",
  "training-events",
  "booth-design",
  "brand-activation",
  "event-communication",
  "social-media",
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

export const TESTIMONIAL_IDS = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10"] as const;

export const CASE_STUDY_SLUGS = [
  "skola-formation",
  "campusup-search",
  "edunext-automation",
  "millennia-group-prive",
  "nova-industrie-web",
  "atlas-ecommerce-growth",
  "medina-clinic-digital",
  "riad-hotel-digital",
] as const;

export const CASE_STUDY_PUBLISHED: Record<
  (typeof CASE_STUDY_SLUGS)[number],
  string
> = {
  "skola-formation": "2024-06-01",
  "campusup-search": "2024-09-01",
  "edunext-automation": "2025-01-15",
  "millennia-group-prive": "2025-03-01",
  "nova-industrie-web": "2025-09-01",
  "atlas-ecommerce-growth": "2026-01-15",
  "medina-clinic-digital": "2026-04-01",
  "riad-hotel-digital": "2026-06-01",
};

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type ServiceDetailSlug = (typeof SERVICE_DETAIL_SLUGS)[number];
export type FaqId = (typeof FAQ_IDS)[number];
export type PricingId = (typeof PRICING_IDS)[number];
export type StatId = (typeof STAT_IDS)[number];
export type ResultId = (typeof RESULT_IDS)[number];
export type VideoId = (typeof VIDEO_IDS)[number];
export type TestimonialId = (typeof TESTIMONIAL_IDS)[number];
export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];
