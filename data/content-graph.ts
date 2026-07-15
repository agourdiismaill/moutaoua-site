/**
 * Central content registry for internal linking.
 * Structural metadata only — translatable strings live in messages/{locale}/*.json
 */

import {
  BLOG_CATEGORIES,
  BLOG_POST_SLUGS,
  BLOG_PUBLISHED,
  COMPARISON_SLUGS,
  GUIDE_SLUGS,
  type BlogPostSlug,
} from "@/data/blog";
import { CASE_STUDY_PUBLISHED, CASE_STUDY_SLUGS, SERVICE_SLUGS } from "@/data/meta";
import { INDUSTRY_SLUGS } from "@/data/industries";
import { SOLUTION_SLUGS, solutionMeta, SOLUTION_PUBLISHED } from "@/data/solutions";
import { SERVICE_CITY_COMBOS } from "@/data/service-city-combos";
import { AGENCY_HUBS } from "@/data/agency-hubs";
import { PRICING_PAGES } from "@/data/pricing-pages";

export type ContentType =
  | "service"
  | "service-city"
  | "agency-hub"
  | "pricing-page"
  | "solution"
  | "blog"
  | "guide"
  | "comparison"
  | "case-study"
  | "industry"
  | "resource";

export type ContentNode = {
  id: string;
  type: ContentType;
  slug: string;
  path: string;
  topics: string[];
  services?: string[];
  solutions?: string[];
  category?: (typeof BLOG_CATEGORIES)[number];
  tags?: string[];
  priority?: number;
  published?: string;
};

/** Normalize free-text tags to canonical topic keys */
export const TAG_ALIASES: Record<string, string> = {
  "meta ads": "meta-ads",
  "meta-ads": "meta-ads",
  "facebook ads": "meta-ads",
  "instagram ads": "meta-ads",
  "google ads": "google-ads",
  "google-ads": "google-ads",
  "performance max": "google-ads",
  search: "google-ads",
  automation: "marketing-automation",
  "marketing-automation": "marketing-automation",
  whatsapp: "marketing-automation",
  nurturing: "marketing-automation",
  crm: "crm-data",
  "crm-data": "crm-data",
  hubspot: "crm-data",
  pipedrive: "crm-data",
  cro: "landing-pages",
  "landing page": "landing-pages",
  "landing-pages": "landing-pages",
  conversion: "landing-pages",
  "social media": "social-media",
  "social-media": "social-media",
  branding: "social-media",
  design: "graphic-design",
  development: "custom-software",
  ai: "ai-agents",
  seo: "seo",
  geo: "geo",
  acquisition: "acquisition",
  publicite: "publicite",
  leads: "acquisition",
  communication: "agence-communication-maroc",
  "agence communication": "agence-communication-maroc",
  "marketing digital": "marketing-digital-maroc",
  "agence marketing digital": "agence-marketing-digital-maroc",
  "agence creative": "agence-creative-maroc",
};

export function normalizeTopic(raw: string): string {
  const key = raw.toLowerCase().trim();
  return TAG_ALIASES[key] ?? key.replace(/\s+/g, "-");
}

export function normalizeTopics(raw: string[]): string[] {
  return [...new Set(raw.map(normalizeTopic))];
}

const blogMeta: Record<
  BlogPostSlug,
  { category: (typeof BLOG_CATEGORIES)[number]; services: string[]; topics: string[]; priority?: number }
> = {
  "generer-leads-centre-formation-maroc": {
    category: "acquisition",
    services: ["meta-ads", "google-ads", "landing-pages"],
    topics: ["acquisition", "leads", "meta-ads", "google-ads"],
    priority: 90,
  },
  "meta-ads-vs-google-ads-formation": {
    category: "publicite",
    services: ["meta-ads", "google-ads"],
    topics: ["meta-ads", "google-ads", "publicite"],
    priority: 85,
  },
  "checklist-landing-page-formation": {
    category: "conversion",
    services: ["landing-pages", "marketing-automation"],
    topics: ["landing-pages", "conversion", "cro"],
    priority: 80,
  },
  "whatsapp-convertir-leads-formation-maroc": {
    category: "conversion",
    services: ["marketing-automation", "crm-data"],
    topics: ["whatsapp", "conversion", "crm-data", "marketing-automation"],
    priority: 95,
  },
  "budget-marketing-centre-formation-maroc": {
    category: "acquisition",
    services: ["meta-ads", "google-ads", "landing-pages"],
    topics: ["acquisition", "budget", "cpl", "meta-ads", "google-ads"],
    priority: 88,
  },
  "campagne-inscriptions-rentree-formation-maroc": {
    category: "acquisition",
    services: ["meta-ads", "google-ads", "landing-pages", "marketing-automation"],
    topics: ["acquisition", "rentree", "saisonnalite", "meta-ads", "google-ads"],
    priority: 92,
  },
  "retargeting-leads-formation-maroc": {
    category: "publicite",
    services: ["meta-ads", "google-ads", "landing-pages"],
    topics: ["retargeting", "meta-ads", "google-ads", "publicite", "conversion"],
    priority: 87,
  },
  "transformation-digitale-pme-maroc": {
    category: "business",
    services: ["corporate-websites", "meta-ads", "crm-data", "ai-agents"],
    topics: ["transformation-digitale", "pme", "crm-data", "ai-agents"],
    priority: 94,
  },
  "tiktok-ads-maroc-guide": {
    category: "publicite",
    services: ["tiktok-ads", "meta-ads", "reels", "landing-pages"],
    topics: ["tiktok-ads", "publicite", "acquisition", "leads", "reels"],
    priority: 93,
  },
  "crm-entreprise-maroc-guide": {
    category: "automation",
    services: ["crm-data", "marketing-automation", "lead-generation", "whatsapp-automation"],
    topics: ["crm-data", "marketing-automation", "whatsapp", "leads", "hubspot", "pipedrive"],
    priority: 96,
  },
  "marketing-automation-maroc-guide": {
    category: "automation",
    services: ["marketing-automation", "crm-data", "workflow-automation", "lead-generation"],
    topics: ["marketing-automation", "whatsapp", "nurturing", "hubspot", "make", "zapier"],
    priority: 97,
  },
};

const guideMeta: Record<string, { services: string[]; topics: string[]; priority?: number }> = {
  "meta-ads-centre-formation": {
    services: ["meta-ads"],
    topics: ["meta-ads", "publicite", "acquisition"],
    priority: 90,
  },
  "google-ads-centre-formation": {
    services: ["google-ads"],
    topics: ["google-ads", "publicite", "acquisition"],
    priority: 88,
  },
  "seo-entreprise-maroc": {
    services: ["seo", "corporate-websites"],
    topics: ["seo", "geo", "acquisition"],
    priority: 86,
  },
  "agence-digitale-maroc-guide": {
    services: ["meta-ads", "corporate-websites", "crm-data"],
    topics: ["business", "acquisition"],
    priority: 84,
  },
  "comment-creer-site-web-professionnel": {
    services: ["corporate-websites", "landing-pages"],
    topics: ["web", "development", "conversion"],
    priority: 83,
  },
  "combien-coute-site-web-maroc": {
    services: ["corporate-websites"],
    topics: ["web", "pricing", "business"],
    priority: 82,
  },
  "guide-marketing-digital-maroc": {
    services: ["meta-ads", "google-ads", "seo", "lead-generation"],
    topics: ["marketing", "acquisition", "publicite"],
    priority: 85,
  },
};

const comparisonMeta: Record<string, { services: string[]; topics: string[]; priority?: number }> = {
  "meta-ads-vs-google-ads": {
    services: ["meta-ads", "google-ads"],
    topics: ["meta-ads", "google-ads", "publicite"],
    priority: 75,
  },
  "seo-vs-google-ads": {
    services: ["seo", "google-ads"],
    topics: ["seo", "google-ads", "publicite"],
    priority: 74,
  },
  "wordpress-vs-laravel": {
    services: ["corporate-websites", "custom-software"],
    topics: ["web", "development"],
    priority: 73,
  },
  "crm-vs-excel": {
    services: ["crm-data", "marketing-automation"],
    topics: ["crm", "automation"],
    priority: 72,
  },
  "erp-vs-crm": {
    services: ["erp", "crm-data"],
    topics: ["erp", "crm", "software"],
    priority: 71,
  },
  "flutter-vs-react-native": {
    services: ["flutter", "react-native"],
    topics: ["mobile", "development"],
    priority: 70,
  },
};

const caseStudyMeta: Record<string, { tags: string[]; services: string[]; priority?: number }> = {
  "skola-formation": {
    tags: ["Meta Ads", "CRO", "Automation"],
    services: ["meta-ads", "landing-pages", "marketing-automation"],
    priority: 92,
  },
  "campusup-search": {
    tags: ["Google Ads", "Performance Max"],
    services: ["google-ads", "landing-pages"],
    priority: 88,
  },
  "edunext-automation": {
    tags: ["Automation", "CRM", "WhatsApp"],
    services: ["marketing-automation", "crm-data"],
    priority: 85,
  },
  "millennia-group-prive": {
    tags: ["Social Media", "Branding"],
    services: ["social-media", "meta-ads"],
    priority: 80,
  },
  "nova-industrie-web": {
    tags: ["Web", "SEO", "Branding"],
    services: ["corporate-websites", "seo", "brand-identity"],
    priority: 87,
  },
  "atlas-ecommerce-growth": {
    tags: ["E-commerce", "Meta Ads", "CRO"],
    services: ["e-commerce", "meta-ads", "product-photography"],
    priority: 90,
  },
  "medina-clinic-digital": {
    tags: ["Branding", "Google Ads", "SEO"],
    services: ["brand-identity", "corporate-websites", "google-ads"],
    priority: 86,
  },
  "riad-hotel-digital": {
    tags: ["Web", "SEO", "Video"],
    services: ["corporate-websites", "video-production", "seo"],
    priority: 82,
  },
};

/** Explicit high-confidence relations (boosted in resolver) */
export const EXPLICIT_RELATIONS: Record<
  string,
  Partial<Record<ContentType, string[]>>
> = {
  "meta-ads": {
    service: ["google-ads", "landing-pages", "marketing-automation", "crm-data"],
    "service-city": [
      "meta-ads-casablanca",
      "meta-ads-rabat",
      "meta-ads-marrakech",
      "meta-ads-tanger",
      "meta-ads-agadir",
    ],
    guide: ["meta-ads-centre-formation"],
    "case-study": ["skola-formation", "atlas-ecommerce-growth"],
    blog: [
      "meta-ads-vs-google-ads-formation",
      "generer-leads-centre-formation-maroc",
      "campagne-inscriptions-rentree-formation-maroc",
      "retargeting-leads-formation-maroc",
    ],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "google-ads": {
    service: ["meta-ads", "landing-pages", "crm-data"],
    "service-city": [
      "google-ads-casablanca",
      "google-ads-rabat",
      "google-ads-marrakech",
    ],
    guide: ["google-ads-centre-formation"],
    "case-study": ["campusup-search", "medina-clinic-digital"],
    blog: [
      "meta-ads-vs-google-ads-formation",
      "generer-leads-centre-formation-maroc",
      "campagne-inscriptions-rentree-formation-maroc",
      "retargeting-leads-formation-maroc",
    ],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "marketing-automation": {
    service: ["crm-data", "landing-pages", "meta-ads"],
    "case-study": ["edunext-automation"],
    blog: [
      "marketing-automation-maroc-guide",
      "whatsapp-convertir-leads-formation-maroc",
      "crm-entreprise-maroc-guide",
      "checklist-landing-page-formation",
    ],
  },
  "landing-pages": {
    service: ["meta-ads", "google-ads", "marketing-automation"],
    blog: ["checklist-landing-page-formation", "generer-leads-centre-formation-maroc", "campagne-inscriptions-rentree-formation-maroc", "retargeting-leads-formation-maroc"],
    "case-study": ["skola-formation"],
  },
  "social-media": {
    service: ["meta-ads", "landing-pages"],
    "case-study": ["millennia-group-prive"],
  },
  "crm-data": {
    service: ["marketing-automation", "meta-ads", "google-ads", "lead-generation"],
    "case-study": ["edunext-automation"],
    blog: ["whatsapp-convertir-leads-formation-maroc", "crm-entreprise-maroc-guide"],
    solution: ["crm", "whatsapp-automation"],
    comparison: ["crm-vs-excel", "erp-vs-crm"],
  },
  "agence-communication-maroc": {
    service: ["brand-identity", "content-marketing", "community-management", "video-production"],
    guide: ["agence-digitale-maroc-guide"],
    "case-study": ["millennia-group-prive", "riad-hotel-digital"],
  },
  "agence-marketing-digital-maroc": {
    service: ["meta-ads", "google-ads", "seo", "marketing-automation"],
    blog: ["generer-leads-centre-formation-maroc", "budget-marketing-centre-formation-maroc"],
    guide: ["agence-digitale-maroc-guide", "guide-marketing-digital-maroc"],
  },
  "marketing-digital-maroc": {
    service: ["meta-ads", "google-ads", "seo", "lead-generation"],
    blog: ["budget-marketing-centre-formation-maroc", "transformation-digitale-pme-maroc"],
    guide: ["agence-digitale-maroc-guide", "guide-marketing-digital-maroc"],
  },
  "agence-creative-maroc": {
    service: ["brand-identity", "graphic-design", "video-production", "reels"],
    "case-study": ["millennia-group-prive", "atlas-ecommerce-growth"],
  },
  "generer-leads-centre-formation-maroc": {
    service: ["meta-ads", "google-ads", "landing-pages"],
    blog: ["meta-ads-vs-google-ads-formation", "whatsapp-convertir-leads-formation-maroc"],
    guide: ["meta-ads-centre-formation", "google-ads-centre-formation"],
    "case-study": ["skola-formation", "campusup-search"],
  },
  "meta-ads-vs-google-ads-formation": {
    service: ["meta-ads", "google-ads"],
    comparison: ["meta-ads-vs-google-ads"],
    guide: ["meta-ads-centre-formation", "google-ads-centre-formation"],
    blog: ["generer-leads-centre-formation-maroc", "checklist-landing-page-formation"],
  },
  "checklist-landing-page-formation": {
    service: ["landing-pages", "marketing-automation", "meta-ads"],
    blog: ["whatsapp-convertir-leads-formation-maroc", "generer-leads-centre-formation-maroc"],
    "case-study": ["skola-formation"],
  },
  "whatsapp-convertir-leads-formation-maroc": {
    service: ["marketing-automation", "crm-data"],
    blog: ["checklist-landing-page-formation", "generer-leads-centre-formation-maroc", "crm-entreprise-maroc-guide"],
    "case-study": ["edunext-automation"],
  },
  "budget-marketing-centre-formation-maroc": {
    service: ["meta-ads", "google-ads", "landing-pages"],
    blog: ["generer-leads-centre-formation-maroc", "meta-ads-vs-google-ads-formation", "campagne-inscriptions-rentree-formation-maroc"],
    guide: ["meta-ads-centre-formation", "google-ads-centre-formation"],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "campagne-inscriptions-rentree-formation-maroc": {
    service: ["meta-ads", "google-ads", "landing-pages", "marketing-automation"],
    blog: ["budget-marketing-centre-formation-maroc", "generer-leads-centre-formation-maroc", "whatsapp-convertir-leads-formation-maroc", "retargeting-leads-formation-maroc"],
    guide: ["meta-ads-centre-formation", "google-ads-centre-formation"],
    comparison: ["meta-ads-vs-google-ads"],
    "case-study": ["skola-formation", "campusup-search"],
  },
  "retargeting-leads-formation-maroc": {
    service: ["meta-ads", "google-ads", "landing-pages"],
    blog: ["campagne-inscriptions-rentree-formation-maroc", "meta-ads-vs-google-ads-formation", "checklist-landing-page-formation", "whatsapp-convertir-leads-formation-maroc"],
    guide: ["meta-ads-centre-formation", "google-ads-centre-formation"],
    comparison: ["meta-ads-vs-google-ads"],
    "case-study": ["skola-formation", "campusup-search"],
  },
  "tiktok-ads-maroc-guide": {
    service: ["tiktok-ads", "meta-ads", "reels", "landing-pages"],
    blog: [
      "meta-ads-vs-google-ads-formation",
      "retargeting-leads-formation-maroc",
      "budget-marketing-centre-formation-maroc",
      "generer-leads-centre-formation-maroc",
      "crm-entreprise-maroc-guide",
    ],
    "case-study": ["atlas-ecommerce-growth", "millennia-group-prive"],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "crm-entreprise-maroc-guide": {
    service: ["crm-data", "marketing-automation", "lead-generation", "whatsapp-automation"],
    blog: [
      "whatsapp-convertir-leads-formation-maroc",
      "tiktok-ads-maroc-guide",
      "generer-leads-centre-formation-maroc",
      "transformation-digitale-pme-maroc",
      "marketing-automation-maroc-guide",
    ],
    "case-study": ["edunext-automation", "skola-formation"],
    solution: ["crm", "whatsapp-automation"],
    comparison: ["crm-vs-excel", "erp-vs-crm"],
  },
  "marketing-automation-maroc-guide": {
    service: ["marketing-automation", "crm-data", "workflow-automation", "lead-generation"],
    blog: [
      "crm-entreprise-maroc-guide",
      "whatsapp-convertir-leads-formation-maroc",
      "checklist-landing-page-formation",
      "generer-leads-centre-formation-maroc",
    ],
    "case-study": ["edunext-automation", "skola-formation"],
    solution: ["crm", "whatsapp-automation"],
    guide: ["guide-marketing-digital-maroc"],
  },
  "tiktok-ads": {
    service: ["meta-ads", "reels", "social-media", "landing-pages"],
    blog: ["tiktok-ads-maroc-guide", "retargeting-leads-formation-maroc"],
    "case-study": ["millennia-group-prive"],
  },
  "meta-ads-centre-formation": {
    service: ["meta-ads", "landing-pages", "google-ads"],
    blog: ["meta-ads-vs-google-ads-formation", "generer-leads-centre-formation-maroc", "campagne-inscriptions-rentree-formation-maroc", "retargeting-leads-formation-maroc"],
    guide: ["google-ads-centre-formation"],
    "case-study": ["skola-formation"],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "google-ads-centre-formation": {
    service: ["google-ads", "landing-pages", "meta-ads"],
    blog: ["meta-ads-vs-google-ads-formation"],
    guide: ["meta-ads-centre-formation"],
    "case-study": ["campusup-search"],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "meta-ads-vs-google-ads": {
    service: ["meta-ads", "google-ads"],
    blog: ["meta-ads-vs-google-ads-formation"],
    guide: ["meta-ads-centre-formation", "google-ads-centre-formation"],
  },
  "seo-vs-google-ads": {
    service: ["seo", "google-ads"],
    guide: ["seo-entreprise-maroc", "google-ads-centre-formation"],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "wordpress-vs-laravel": {
    service: ["corporate-websites", "custom-software"],
    guide: ["agence-digitale-maroc-guide", "comment-creer-site-web-professionnel", "combien-coute-site-web-maroc"],
  },
  "crm-vs-excel": {
    service: ["crm-data", "marketing-automation"],
    solution: ["crm"],
    blog: ["crm-entreprise-maroc-guide"],
    comparison: ["erp-vs-crm"],
  },
  "erp-vs-crm": {
    service: ["erp", "crm-data"],
    solution: ["crm"],
    comparison: ["crm-vs-excel"],
    blog: ["crm-entreprise-maroc-guide"],
  },
  "flutter-vs-react-native": {
    service: ["flutter", "react-native", "android", "ios"],
    solution: ["mobile-applications"],
    "pricing-page": ["application-mobile-maroc"],
  },
  "comment-creer-site-web-professionnel": {
    service: ["corporate-websites", "landing-pages"],
    solution: ["website-builder"],
    comparison: ["wordpress-vs-laravel"],
    guide: ["seo-entreprise-maroc", "combien-coute-site-web-maroc"],
    "pricing-page": ["creation-site-web-maroc"],
  },
  "combien-coute-site-web-maroc": {
    service: ["corporate-websites"],
    "pricing-page": ["creation-site-web-maroc"],
    comparison: ["wordpress-vs-laravel"],
    guide: ["comment-creer-site-web-professionnel", "agence-digitale-maroc-guide"],
  },
  "guide-marketing-digital-maroc": {
    service: ["meta-ads", "google-ads", "seo", "lead-generation"],
    guide: ["meta-ads-centre-formation", "google-ads-centre-formation", "seo-entreprise-maroc"],
    comparison: ["meta-ads-vs-google-ads", "seo-vs-google-ads"],
    "agency-hub": ["marketing-digital-maroc", "agence-marketing-digital-maroc"],
  },
  "creation-site-web-maroc": {
    service: ["corporate-websites", "landing-pages"],
    guide: ["comment-creer-site-web-professionnel", "combien-coute-site-web-maroc"],
    comparison: ["wordpress-vs-laravel"],
    "pricing-page": ["seo-maroc", "logo-maroc"],
  },
  "application-mobile-maroc": {
    service: ["flutter", "react-native", "android", "ios"],
    solution: ["mobile-applications"],
    comparison: ["flutter-vs-react-native"],
    "pricing-page": ["creation-site-web-maroc"],
  },
  "google-ads-maroc": {
    service: ["google-ads", "landing-pages"],
    "pricing-page": ["meta-ads-maroc", "seo-maroc"],
    comparison: ["seo-vs-google-ads", "meta-ads-vs-google-ads"],
  },
  "meta-ads-maroc": {
    service: ["meta-ads", "landing-pages"],
    "pricing-page": ["google-ads-maroc", "seo-maroc"],
    comparison: ["meta-ads-vs-google-ads"],
  },
  "skola-formation": {
    service: ["meta-ads", "landing-pages", "marketing-automation"],
    blog: ["generer-leads-centre-formation-maroc", "meta-ads-vs-google-ads-formation"],
    guide: ["meta-ads-centre-formation"],
  },
  "campusup-search": {
    service: ["google-ads", "landing-pages"],
    blog: ["meta-ads-vs-google-ads-formation"],
    guide: ["google-ads-centre-formation"],
  },
  "edunext-automation": {
    service: ["marketing-automation", "crm-data"],
    blog: ["whatsapp-convertir-leads-formation-maroc", "checklist-landing-page-formation"],
  },
  "millennia-group-prive": {
    service: ["social-media", "meta-ads"],
  },
  "corporate-websites": {
    service: ["seo", "brand-identity", "landing-pages"],
    "case-study": ["nova-industrie-web", "riad-hotel-digital", "medina-clinic-digital"],
    blog: ["transformation-digitale-pme-maroc"],
    guide: ["seo-entreprise-maroc", "comment-creer-site-web-professionnel", "combien-coute-site-web-maroc"],
    comparison: ["wordpress-vs-laravel"],
    "pricing-page": ["creation-site-web-maroc"],
  },
  "e-commerce": {
    service: ["meta-ads", "product-photography", "marketing-automation"],
    "case-study": ["atlas-ecommerce-growth"],
  },
  "brand-identity": {
    service: ["corporate-websites", "social-media"],
    "case-study": ["medina-clinic-digital", "millennia-group-prive"],
  },
  seo: {
    service: ["corporate-websites", "landing-pages"],
    "case-study": ["nova-industrie-web", "medina-clinic-digital", "riad-hotel-digital"],
    guide: ["seo-entreprise-maroc", "guide-marketing-digital-maroc"],
    comparison: ["seo-vs-google-ads"],
  },
  "video-production": {
    service: ["social-media", "corporate-websites"],
    "case-study": ["riad-hotel-digital"],
  },
  "nova-industrie-web": {
    service: ["corporate-websites", "seo", "brand-identity"],
    industry: ["startups", "smes"],
  },
  "atlas-ecommerce-growth": {
    service: ["e-commerce", "meta-ads", "product-photography"],
    industry: ["e-commerce", "retail"],
  },
  "medina-clinic-digital": {
    service: ["brand-identity", "corporate-websites", "google-ads"],
    industry: ["healthcare", "clinics"],
  },
  "riad-hotel-digital": {
    service: ["corporate-websites", "video-production", "seo"],
    industry: ["hotels"],
  },
  "e-nfc": {
    service: ["brand-identity", "corporate-websites", "graphic-design"],
    solution: ["crm", "whatsapp-automation", "mobile-applications"],
    "case-study": ["nova-industrie-web"],
    industry: ["retail", "hotels", "restaurants"],
  },
  archidoc: {
    service: ["custom-software", "workflow-automation", "api-integration"],
    solution: ["business-automation", "crm"],
    "case-study": ["nova-industrie-web", "medina-clinic-digital"],
    industry: ["healthcare", "law-firms", "government"],
  },
  "erp-restaurant": {
    service: ["erp", "custom-software", "automation"],
    solution: ["crm", "business-intelligence"],
    "case-study": ["atlas-ecommerce-growth"],
    industry: ["restaurants", "hotels"],
  },
  crm: {
    service: ["crm-data", "marketing-automation", "lead-generation"],
    solution: ["whatsapp-automation", "ai-agents", "business-intelligence"],
    "case-study": ["edunext-automation", "skola-formation"],
    industry: ["education", "healthcare", "real-estate"],
    comparison: ["crm-vs-excel", "erp-vs-crm"],
  },
  "ai-agents": {
    service: ["ai-agents", "chatbots", "automation"],
    solution: ["whatsapp-automation", "business-automation", "crm"],
    "case-study": ["edunext-automation"],
    industry: ["healthcare", "education", "retail"],
  },
  "whatsapp-automation": {
    service: ["marketing-automation", "crm-data", "chatbots"],
    solution: ["crm", "ai-agents", "business-automation"],
    "case-study": ["skola-formation", "medina-clinic-digital"],
    industry: ["education", "healthcare", "clinics"],
  },
  "business-automation": {
    service: ["workflow-automation", "api-integration", "automation"],
    solution: ["ai-agents", "crm", "archidoc"],
    "case-study": ["edunext-automation", "nova-industrie-web"],
    industry: ["factories", "accounting-firms", "government"],
  },
  "website-builder": {
    service: ["corporate-websites", "landing-pages", "e-commerce"],
    solution: ["crm", "mobile-applications", "business-intelligence"],
    "case-study": ["nova-industrie-web", "atlas-ecommerce-growth"],
    industry: ["retail", "real-estate", "hotels"],
  },
  "mobile-applications": {
    service: ["android", "ios", "flutter", "react-native"],
    solution: ["crm", "business-intelligence"],
    "case-study": ["atlas-ecommerce-growth"],
    industry: ["retail", "healthcare", "startups"],
    comparison: ["flutter-vs-react-native"],
    "pricing-page": ["application-mobile-maroc"],
  },
  "business-intelligence": {
    service: ["erp", "custom-software", "crm-data"],
    solution: ["crm", "erp-restaurant", "business-automation"],
    "case-study": ["atlas-ecommerce-growth", "nova-industrie-web"],
    industry: ["retail", "factories", "hotels"],
  },
};

const serviceRelations: Record<string, string[]> = {
  "meta-ads": ["google-ads", "landing-pages", "marketing-automation", "crm-data"],
  "google-ads": ["meta-ads", "landing-pages", "crm-data"],
  "marketing-automation": ["crm-data", "landing-pages", "meta-ads"],
  "landing-pages": ["meta-ads", "google-ads", "marketing-automation"],
  "social-media": ["meta-ads", "landing-pages", "marketing-automation"],
  "crm-data": ["marketing-automation", "meta-ads", "google-ads"],
  "agence-communication-maroc": [
    "brand-identity",
    "content-marketing",
    "community-management",
    "video-production",
  ],
  "agence-marketing-digital-maroc": [
    "meta-ads",
    "google-ads",
    "seo",
    "marketing-automation",
  ],
  "marketing-digital-maroc": [
    "meta-ads",
    "google-ads",
    "seo",
    "lead-generation",
  ],
  "agence-creative-maroc": [
    "brand-identity",
    "graphic-design",
    "video-production",
    "reels",
  ],
};

function buildServiceCityNodes(): ContentNode[] {
  return SERVICE_CITY_COMBOS.map((combo) => ({
    id: `service-city:${combo.slug}`,
    type: "service-city" as const,
    slug: combo.slug,
    path: `/services/${combo.slug}`,
    topics: normalizeTopics([combo.service, combo.villeSlug, combo.secteurDominant]),
    services: [combo.service],
    priority: 60,
  }));
}

function buildAgencyHubNodes(): ContentNode[] {
  return AGENCY_HUBS.map((hub) => ({
    id: `agency-hub:${hub.slug}`,
    type: "agency-hub" as const,
    slug: hub.slug,
    path: `/agences/${hub.slug}`,
    topics: normalizeTopics([
      hub.type === "communication" ? "agence-communication" : "agence-digitale",
      hub.villeSlug,
      hub.secteurDominant,
    ]),
    priority: 68,
  }));
}

function buildPricingPageNodes(): ContentNode[] {
  return PRICING_PAGES.map((page) => ({
    id: `pricing-page:${page.slug}`,
    type: "pricing-page" as const,
    slug: page.slug,
    path: `/prix/${page.slug}`,
    topics: normalizeTopics([
      "pricing",
      page.primaryService,
      ...page.relatedServices,
    ]),
    services: [page.primaryService, ...page.relatedServices],
    priority: 66,
  }));
}

function buildServiceNodes(): ContentNode[] {
  return SERVICE_SLUGS.map((slug) => ({
    id: `service:${slug}`,
    type: "service" as const,
    slug,
    path: `/services/${slug}`,
    topics: normalizeTopics([slug, ...(serviceRelations[slug] ?? [])]),
    services: [slug],
    priority: 70,
  }));
}

function buildBlogNodes(): ContentNode[] {
  return BLOG_POST_SLUGS.map((slug) => {
    const meta = blogMeta[slug];
    return {
      id: `blog:${slug}`,
      type: "blog" as const,
      slug,
      path: `/blog/${slug}`,
      topics: meta.topics,
      services: meta.services,
      category: meta.category,
      priority: meta.priority,
      published: BLOG_PUBLISHED[slug],
    };
  });
}

function buildGuideNodes(): ContentNode[] {
  return GUIDE_SLUGS.map((slug) => {
    const meta = guideMeta[slug];
    return {
      id: `guide:${slug}`,
      type: "guide" as const,
      slug,
      path: `/guides/${slug}`,
      topics: meta.topics,
      services: meta.services,
      priority: meta.priority,
    };
  });
}

function buildComparisonNodes(): ContentNode[] {
  return COMPARISON_SLUGS.map((slug) => {
    const meta = comparisonMeta[slug] ?? {
      services: ["meta-ads", "google-ads"],
      topics: ["meta-ads", "google-ads", "publicite"],
      priority: 75,
    };
    return {
      id: `comparison:${slug}`,
      type: "comparison" as const,
      slug,
      path: `/compare/${slug}`,
      topics: normalizeTopics(meta.topics),
      services: meta.services,
      priority: meta.priority ?? 75,
    };
  });
}

function buildIndustryNodes(): ContentNode[] {
  return INDUSTRY_SLUGS.map((slug) => ({
    id: `industry:${slug}`,
    type: "industry" as const,
    slug,
    path: `/industries/${slug}`,
    topics: normalizeTopics([slug, "business"]),
    priority: 65,
  }));
}

function buildSolutionNodes(): ContentNode[] {
  return SOLUTION_SLUGS.map((slug) => {
    const meta = solutionMeta.find((s) => s.slug === slug)!;
    return {
      id: `solution:${slug}`,
      type: "solution" as const,
      slug,
      path: `/solutions/${slug}`,
      topics: normalizeTopics([slug, ...meta.relatedServices, ...meta.relatedSolutions]),
      services: meta.relatedServices,
      solutions: [slug, ...meta.relatedSolutions],
      priority: 72,
      published: SOLUTION_PUBLISHED[slug],
    };
  });
}

function buildCaseStudyNodes(): ContentNode[] {
  return CASE_STUDY_SLUGS.map((slug) => {
    const meta = caseStudyMeta[slug];
    return {
      id: `case-study:${slug}`,
      type: "case-study" as const,
      slug,
      path: `/case-studies/${slug}`,
      topics: normalizeTopics(meta.tags),
      services: meta.services,
      tags: normalizeTopics(meta.tags),
      priority: meta.priority,
      published: CASE_STUDY_PUBLISHED[slug],
    };
  });
}

const RESOURCE_NODES: ContentNode[] = [
  {
    id: "resource:industries",
    type: "resource",
    slug: "industries",
    path: "/industries",
    topics: ["industries", "business"],
    priority: 57,
  },
  {
    id: "resource:solutions",
    type: "resource",
    slug: "solutions",
    path: "/solutions",
    topics: ["solutions", "software", "saas"],
    priority: 58,
  },
  {
    id: "resource:portfolio",
    type: "resource",
    slug: "portfolio",
    path: "/portfolio",
    topics: ["portfolio", "design"],
    priority: 56,
  },
  {
    id: "resource:case-studies",
    type: "resource",
    slug: "case-studies",
    path: "/case-studies",
    topics: ["case-studies", "results"],
    priority: 60,
  },
  {
    id: "resource:pricing",
    type: "resource",
    slug: "pricing",
    path: "/pricing",
    topics: ["pricing", "acquisition"],
    priority: 55,
  },
  {
    id: "resource:results",
    type: "resource",
    slug: "results",
    path: "/results",
    topics: ["results", "roas", "meta-ads", "google-ads"],
    priority: 58,
  },
  {
    id: "resource:videos",
    type: "resource",
    slug: "videos",
    path: "/videos",
    topics: ["videos", "case-studies"],
    priority: 50,
  },
  {
    id: "resource:contact",
    type: "resource",
    slug: "contact",
    path: "/contact",
    topics: ["contact", "audit", "acquisition"],
    priority: 65,
  },
  {
    id: "resource:blog",
    type: "resource",
    slug: "blog",
    path: "/blog",
    topics: ["blog", "acquisition", "conversion"],
    priority: 52,
  },
];

export const CONTENT_NODES: ContentNode[] = [
  ...buildServiceNodes(),
  ...buildServiceCityNodes(),
  ...buildAgencyHubNodes(),
  ...buildPricingPageNodes(),
  ...buildSolutionNodes(),
  ...buildBlogNodes(),
  ...buildGuideNodes(),
  ...buildComparisonNodes(),
  ...buildIndustryNodes(),
  ...buildCaseStudyNodes(),
  ...RESOURCE_NODES,
];

export const CONTENT_NODE_MAP = new Map(CONTENT_NODES.map((n) => [n.id, n]));

export function getRelatedServiceSlugs(slug: string): string[] {
  return serviceRelations[slug] ?? SERVICE_SLUGS.filter((s) => s !== slug).slice(0, 3);
}

export function getContentNode(type: ContentType, slug: string): ContentNode | undefined {
  return CONTENT_NODE_MAP.get(`${type}:${slug}`);
}

export function getCurrentNodeId(type: ContentType, slug: string): string {
  return `${type}:${slug}`;
}

/** Default section order and limits per page type */
export const PAGE_LINKING_CONFIG: Record<
  ContentType,
  { sections: ContentType[]; limits: Partial<Record<ContentType, number>> }
> = {
  service: {
    sections: ["service", "service-city", "blog", "guide", "case-study", "resource"],
    limits: { service: 3, "service-city": 3, blog: 3, guide: 2, "case-study": 2, resource: 4 },
  },
  "service-city": {
    sections: ["agency-hub", "service-city", "service", "blog", "resource"],
    limits: { "agency-hub": 1, "service-city": 4, service: 2, blog: 2, resource: 3 },
  },
  "agency-hub": {
    sections: ["service-city", "service", "industry", "blog", "resource"],
    limits: { "service-city": 6, service: 3, industry: 2, blog: 2, resource: 3 },
  },
  "pricing-page": {
    sections: ["service", "pricing-page", "resource", "blog"],
    limits: { service: 3, "pricing-page": 3, resource: 3, blog: 2 },
  },
  blog: {
    sections: ["blog", "service", "guide", "comparison", "resource"],
    limits: { blog: 3, service: 3, guide: 2, comparison: 1, resource: 4 },
  },
  guide: {
    sections: ["guide", "blog", "service", "resource"],
    limits: { guide: 2, blog: 3, service: 3, resource: 3 },
  },
  "case-study": {
    sections: ["service", "blog", "guide", "resource"],
    limits: { service: 3, blog: 2, guide: 2, resource: 3 },
  },
  comparison: {
    sections: ["service", "blog", "guide", "resource"],
    limits: { service: 2, blog: 2, guide: 2, resource: 3 },
  },
  industry: {
    sections: ["service", "industry", "case-study", "blog", "resource"],
    limits: { service: 3, industry: 3, "case-study": 2, blog: 2, resource: 3 },
  },
  solution: {
    sections: ["solution", "service", "case-study", "blog", "resource"],
    limits: { solution: 3, service: 3, "case-study": 2, blog: 2, resource: 3 },
  },
  resource: {
    sections: ["blog", "guide", "service", "resource"],
    limits: { blog: 3, guide: 2, service: 2, resource: 3 },
  },
};
