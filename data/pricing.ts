import type { PricingTier } from "./types";

export type PricingMeta = Pick<
  PricingTier,
  "id" | "price" | "currency" | "icon" | "highlighted" | "adBudgetNote"
> & {
  badgeKey?: boolean;
  featuresIntroKey?: boolean;
};

/** Structural metadata — text lives in messages/{locale}/pricing.json */
export const pricingMeta: PricingMeta[] = [
  {
    id: "start",
    price: 2200,
    currency: "MAD",
    icon: "Rocket",
    adBudgetNote: true,
  },
  {
    id: "performance",
    price: 3700,
    currency: "MAD",
    icon: "BarChart3",
    highlighted: true,
    badgeKey: true,
  },
  {
    id: "premium",
    price: 5100,
    currency: "MAD",
    icon: "Gem",
    badgeKey: true,
    featuresIntroKey: true,
  },
];
