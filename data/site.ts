import type { Stat } from "./types";

export const siteConfig = {
  name: "Mohtaoua",
  shortName: "Mohtaoua",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohtaoua.ma",
  email: "contact@mohtaoua.ma",
  phone: "+212 694-615342",
  phone2: "+212 664-593758",
  whatsapp: "+212 694-615342",
  postalCode: "20270",
  /** Legal identifiers — complete before public launch if available */
  legalForm: "",
  ice: "",
  tradeRegister: "",
  tagline:
    "Agence digitale premium 360° au Maroc — marketing, technologie, design, IA et automatisation.",
  social: {
    linkedin: "https://www.linkedin.com/company/mohtaoua",
    instagram: "https://www.instagram.com/mohtaoua",
    youtube: "https://www.youtube.com/@mohtaoua",
    twitter: "https://twitter.com/mohtaoua",
  },
};

export const mainNav = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "solutions", href: "/solutions" },
  { key: "portfolio", href: "/portfolio" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "insights", href: "/blog" },
  { key: "pricing", href: "/pricing" },
] as const;

export type NavKey = (typeof mainNav)[number]["key"];

/** Structural metadata — labels live in messages/{locale}/stats.json */
export const statMeta: Pick<
  Stat,
  "id" | "value" | "suffix" | "prefix" | "icon" | "decimals"
>[] = [
  { id: "impressions", value: 200, suffix: "+", icon: "Eye" },
  { id: "leads", value: 150, suffix: "+", icon: "UserPlus" },
  { id: "roas", value: 15, suffix: "+", icon: "TrendingUp" },
  { id: "campaigns", value: 98, suffix: "%", icon: "Megaphone" },
];
