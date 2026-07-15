import type { ServiceSlug } from "./meta";

export const PRICING_PAGE_SLUGS = [
  "creation-site-web-maroc",
  "seo-maroc",
  "application-mobile-maroc",
  "logo-maroc",
] as const;

export type PricingPageSlug = (typeof PRICING_PAGE_SLUGS)[number];

export type PricingTierId = "basic" | "standard" | "premium";

export type PricingTier = {
  id: PricingTierId;
  minMad: number;
  maxMad: number;
  period: "project" | "month";
};

export interface PricingPage {
  slug: PricingPageSlug;
  primaryService: ServiceSlug;
  relatedServices: ServiceSlug[];
  tiers: PricingTier[];
}

export const PRICING_PAGES: PricingPage[] = [
  {
    slug: "creation-site-web-maroc",
    primaryService: "corporate-websites",
    relatedServices: ["landing-pages", "e-commerce"],
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
    tiers: [
      { id: "basic", minMad: 2500, maxMad: 5000, period: "project" },
      { id: "standard", minMad: 6000, maxMad: 15000, period: "project" },
      { id: "premium", minMad: 18000, maxMad: 40000, period: "project" },
    ],
  },
];

export function isPricingPageSlug(slug: string): slug is PricingPageSlug {
  return PRICING_PAGE_SLUGS.includes(slug as PricingPageSlug);
}

export function getPricingPage(slug: string): PricingPage | undefined {
  return PRICING_PAGES.find((page) => page.slug === slug);
}
