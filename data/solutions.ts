/** Mohtaoua proprietary digital products — structural metadata only */

import type { IndustrySlug } from "@/data/industries";

export const SOLUTION_SLUGS = [
  "e-nfc",
  "archidoc",
  "erp-restaurant",
  "crm",
  "ai-agents",
  "whatsapp-automation",
  "business-automation",
  "website-builder",
  "mobile-applications",
  "business-intelligence",
] as const;

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number];

export type SolutionCategory = "networking" | "documents" | "operations" | "automation" | "platform";

const solutionIcons: Record<SolutionSlug, string> = {
  "e-nfc": "Fingerprint",
  archidoc: "FileText",
  "erp-restaurant": "UtensilsCrossed",
  crm: "Database",
  "ai-agents": "Bot",
  "whatsapp-automation": "MessageCircle",
  "business-automation": "Workflow",
  "website-builder": "LayoutTemplate",
  "mobile-applications": "Smartphone",
  "business-intelligence": "BarChart3",
};

const solutionCategories: Record<SolutionSlug, SolutionCategory> = {
  "e-nfc": "networking",
  archidoc: "documents",
  "erp-restaurant": "operations",
  crm: "operations",
  "ai-agents": "automation",
  "whatsapp-automation": "automation",
  "business-automation": "automation",
  "website-builder": "platform",
  "mobile-applications": "platform",
  "business-intelligence": "platform",
};

export const SOLUTION_PUBLISHED: Record<SolutionSlug, string> = {
  "e-nfc": "2026-07-13",
  archidoc: "2026-07-13",
  "erp-restaurant": "2026-07-13",
  crm: "2026-07-13",
  "ai-agents": "2026-07-13",
  "whatsapp-automation": "2026-07-13",
  "business-automation": "2026-07-13",
  "website-builder": "2026-07-13",
  "mobile-applications": "2026-07-13",
  "business-intelligence": "2026-07-13",
};

export type SolutionMeta = {
  slug: SolutionSlug;
  icon: string;
  category: SolutionCategory;
  relatedServices: string[];
  relatedSolutions: SolutionSlug[];
  relatedCaseStudies: string[];
  relatedIndustries: IndustrySlug[];
  screenshots: { src: string; altKey: string }[];
};

export const solutionMeta: SolutionMeta[] = [
  {
    slug: "e-nfc",
    icon: solutionIcons["e-nfc"],
    category: solutionCategories["e-nfc"],
    relatedServices: ["brand-identity", "corporate-websites", "graphic-design"],
    relatedSolutions: ["crm", "whatsapp-automation"],
    relatedCaseStudies: ["nova-industrie-web"],
    relatedIndustries: ["retail", "hotels", "restaurants", "real-estate", "smes"],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80", altKey: "0" },
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80", altKey: "1" },
      { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80", altKey: "2" },
    ],
  },
  {
    slug: "archidoc",
    icon: solutionIcons.archidoc,
    category: solutionCategories.archidoc,
    relatedServices: ["custom-software", "workflow-automation", "api-integration"],
    relatedSolutions: ["business-automation", "crm"],
    relatedCaseStudies: ["nova-industrie-web", "medina-clinic-digital"],
    relatedIndustries: ["healthcare", "law-firms", "accounting-firms", "government", "factories"],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80", altKey: "0" },
      { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80", altKey: "1" },
      { src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80", altKey: "2" },
    ],
  },
  {
    slug: "erp-restaurant",
    icon: solutionIcons["erp-restaurant"],
    category: solutionCategories["erp-restaurant"],
    relatedServices: ["erp", "custom-software", "automation"],
    relatedSolutions: ["crm", "business-intelligence"],
    relatedCaseStudies: ["atlas-ecommerce-growth"],
    relatedIndustries: ["restaurants", "hotels", "retail"],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", altKey: "0" },
      { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", altKey: "1" },
      { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80", altKey: "2" },
    ],
  },
  {
    slug: "crm",
    icon: solutionIcons.crm,
    category: solutionCategories.crm,
    relatedServices: ["crm-data", "marketing-automation", "lead-generation"],
    relatedSolutions: ["whatsapp-automation", "ai-agents", "business-intelligence"],
    relatedCaseStudies: ["edunext-automation", "skola-formation"],
    relatedIndustries: ["education", "healthcare", "real-estate", "retail", "smes"],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80", altKey: "0" },
      { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80", altKey: "1" },
      { src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80", altKey: "2" },
    ],
  },
  {
    slug: "ai-agents",
    icon: solutionIcons["ai-agents"],
    category: solutionCategories["ai-agents"],
    relatedServices: ["ai-agents", "chatbots", "automation"],
    relatedSolutions: ["whatsapp-automation", "business-automation", "crm"],
    relatedCaseStudies: ["edunext-automation"],
    relatedIndustries: ["healthcare", "education", "retail", "hotels", "smes"],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80", altKey: "0" },
      { src: "https://images.unsplash.com/photo-1535378620166-273708deb44e?w=1200&q=80", altKey: "1" },
      { src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80", altKey: "2" },
    ],
  },
  {
    slug: "whatsapp-automation",
    icon: solutionIcons["whatsapp-automation"],
    category: solutionCategories["whatsapp-automation"],
    relatedServices: ["marketing-automation", "crm-data", "chatbots"],
    relatedSolutions: ["crm", "ai-agents", "business-automation"],
    relatedCaseStudies: ["skola-formation", "medina-clinic-digital"],
    relatedIndustries: ["education", "healthcare", "clinics", "restaurants", "real-estate"],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&q=80", altKey: "0" },
      { src: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1200&q=80", altKey: "1" },
      { src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80", altKey: "2" },
    ],
  },
  {
    slug: "business-automation",
    icon: solutionIcons["business-automation"],
    category: solutionCategories["business-automation"],
    relatedServices: ["workflow-automation", "api-integration", "automation"],
    relatedSolutions: ["ai-agents", "crm", "archidoc"],
    relatedCaseStudies: ["edunext-automation", "nova-industrie-web"],
    relatedIndustries: ["factories", "accounting-firms", "government", "smes", "healthcare"],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80", altKey: "0" },
      { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80", altKey: "1" },
      { src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80", altKey: "2" },
    ],
  },
  {
    slug: "website-builder",
    icon: solutionIcons["website-builder"],
    category: solutionCategories["website-builder"],
    relatedServices: ["corporate-websites", "landing-pages", "e-commerce"],
    relatedSolutions: ["crm", "business-intelligence"],
    relatedCaseStudies: ["nova-industrie-web", "atlas-ecommerce-growth"],
    relatedIndustries: ["retail", "real-estate", "hotels", "education", "smes"],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80", altKey: "0" },
      { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80", altKey: "1" },
      { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80", altKey: "2" },
    ],
  },
  {
    slug: "mobile-applications",
    icon: solutionIcons["mobile-applications"],
    category: solutionCategories["mobile-applications"],
    relatedServices: ["android", "ios", "flutter", "react-native"],
    relatedSolutions: ["crm", "business-intelligence"],
    relatedCaseStudies: ["atlas-ecommerce-growth"],
    relatedIndustries: ["retail", "healthcare", "restaurants", "hotels", "startups"],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80", altKey: "0" },
      { src: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&q=80", altKey: "1" },
      { src: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=80", altKey: "2" },
    ],
  },
  {
    slug: "business-intelligence",
    icon: solutionIcons["business-intelligence"],
    category: solutionCategories["business-intelligence"],
    relatedServices: ["erp", "custom-software", "crm-data"],
    relatedSolutions: ["crm", "erp-restaurant", "business-automation"],
    relatedCaseStudies: ["atlas-ecommerce-growth", "nova-industrie-web"],
    relatedIndustries: ["retail", "factories", "hotels", "healthcare", "government"],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80", altKey: "0" },
      { src: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&q=80", altKey: "1" },
      { src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80", altKey: "2" },
    ],
  },
];

export function getSolutionBySlug(slug: string): SolutionMeta | undefined {
  return solutionMeta.find((s) => s.slug === slug);
}
