import type { Service } from "./types";

/** Structural metadata — text lives in messages/{locale}/services.json */
export const serviceMeta: Pick<
  Service,
  "slug" | "icon" | "highlighted"
>[] = [
  { slug: "meta-ads", icon: "Target", highlighted: true },
  { slug: "google-ads", icon: "Search" },
  { slug: "marketing-automation", icon: "Workflow" },
  { slug: "landing-pages", icon: "LayoutTemplate" },
  { slug: "social-media", icon: "Share2" },
  { slug: "crm-data", icon: "Database" },
];
