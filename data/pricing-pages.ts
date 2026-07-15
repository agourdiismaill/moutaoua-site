import type { ServiceSlug } from "./meta";

export const PRICING_PAGE_SLUGS = [
  "creation-site-web-maroc",
  "seo-maroc",
  "application-mobile-maroc",
  "logo-maroc",
  "google-ads-maroc",
  "meta-ads-maroc",
] as const;

export type PricingPageSlug = (typeof PRICING_PAGE_SLUGS)[number];

export type PricingTierId = "basic" | "standard" | "premium";

export type PricingTier = {
  id: PricingTierId;
  minMad: number;
  maxMad: number;
  period: "project" | "month";
};

/** How tier amounts should be interpreted in page copy */
export type PricingBudgetScope = "project" | "service-monthly" | "media-monthly";

export interface PricingPage {
  slug: PricingPageSlug;
  primaryService: ServiceSlug;
  relatedServices: ServiceSlug[];
  tiers: PricingTier[];
  budgetScope: PricingBudgetScope;
}

export const PRICING_PAGES: PricingPage[] = [
  {
    slug: "creation-site-web-maroc",
    primaryService: "corporate-websites",
    relatedServices: ["landing-pages", "e-commerce"],
    budgetScope: "project",
    tiers: [
      { id: "basic", minMad: 6000, maxMad: 12000, period: "project" },
      { id: "standard", minMad: 15000, maxMad: 35000, period: "project" },
      { id: "premium", minMad: 40000, maxMad: 120000, period: "project" },
    ],
  },
  {
    slug: "seo-maroc",
    primaryService: "seo",
    relatedServices: ["content-marketing", "geo"],
    budgetScope: "service-monthly",
    tiers: [
      { id: "basic", minMad: 3000, maxMad: 6000, period: "month" },
      { id: "standard", minMad: 7000, maxMad: 15000, period: "month" },
      { id: "premium", minMad: 18000, maxMad: 40000, period: "month" },
    ],
  },
  {
    slug: "application-mobile-maroc",
    primaryService: "flutter",
    relatedServices: ["android", "ios", "react-native"],
    budgetScope: "project",
    tiers: [
      { id: "basic", minMad: 60000, maxMad: 120000, period: "project" },
      { id: "standard", minMad: 130000, maxMad: 300000, period: "project" },
      { id: "premium", minMad: 350000, maxMad: 800000, period: "project" },
    ],
  },
  {
    slug: "logo-maroc",
    primaryService: "logo",
    relatedServices: ["brand-identity", "graphic-design"],
    budgetScope: "project",
    tiers: [
      { id: "basic", minMad: 2500, maxMad: 5000, period: "project" },
      { id: "standard", minMad: 6000, maxMad: 15000, period: "project" },
      { id: "premium", minMad: 18000, maxMad: 40000, period: "project" },
    ],
  },
  {
    slug: "google-ads-maroc",
    primaryService: "google-ads",
    relatedServices: ["landing-pages", "seo"],
    budgetScope: "media-monthly",
    tiers: [
      { id: "basic", minMad: 4000, maxMad: 8000, period: "month" },
      { id: "standard", minMad: 9000, maxMad: 18000, period: "month" },
      { id: "premium", minMad: 20000, maxMad: 45000, period: "month" },
    ],
  },
  {
    slug: "meta-ads-maroc",
    primaryService: "meta-ads",
    relatedServices: ["landing-pages", "social-media"],
    budgetScope: "media-monthly",
    tiers: [
      { id: "basic", minMad: 5000, maxMad: 10000, period: "month" },
      { id: "standard", minMad: 11000, maxMad: 22000, period: "month" },
      { id: "premium", minMad: 25000, maxMad: 50000, period: "month" },
    ],
  },
];

export function isPricingPageSlug(slug: string): slug is PricingPageSlug {
  return PRICING_PAGE_SLUGS.includes(slug as PricingPageSlug);
}

export function getPricingPage(slug: string): PricingPage | undefined {
  return PRICING_PAGES.find((page) => page.slug === slug);
}
