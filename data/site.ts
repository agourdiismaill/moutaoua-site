import type { Stat } from "./types";

export const siteConfig = {
  name: "Mohtaoua",
  shortName: "Mohtaoua",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohtaoua.ma",
  email: "contact@mohtaoua.ma",
  phone: "+212 642-830060",
  phone2: "+212 664-593758",
  whatsapp: "+212 642-830060",
  postalCode: "20270",
  /** Legal identifiers — complete before public launch if available */
  legalForm: "",
  ice: "",
  tradeRegister: "",
  tagline:
    "Agence marketing pour centres de formation au Maroc — Meta Ads, Google Ads, landing pages.",
  social: {
    linkedin: "https://www.linkedin.com/company/mohtaoua",
    instagram: "https://www.instagram.com/mohtaoua",
    youtube: "https://www.youtube.com/@mohtaoua",
    twitter: "https://twitter.com/mohtaoua",
  },
};

export const mainNav = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "results", href: "/results" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "videos", href: "/videos" },
  { key: "pricing", href: "/pricing" },
  { key: "contact", href: "/contact" },
] as const;

export type NavKey = (typeof mainNav)[number]["key"];

/** Structural metadata — labels live in messages/{locale}/stats.json */
export const statMeta: Pick<
  Stat,
  "id" | "value" | "suffix" | "prefix" | "icon" | "decimals"
>[] = [
  { id: "impressions", value: 12, suffix: "M+", icon: "Eye" },
  { id: "leads", value: 35, suffix: "K+", icon: "UserPlus" },
  { id: "roas", value: 400, suffix: "%", icon: "TrendingUp" },
  { id: "campaigns", value: 150, suffix: "+", icon: "Megaphone" },
];
