import { millenniaCreativeIds } from "./portfolio-legacy";

export const millenniaCreativeMeta = millenniaCreativeIds.map((id) => ({
  id,
  /** WebP posters (~480px) — avoid multi‑MB JPEG files mislabeled as .png */
  src: `/realisations/millennia/posters/${id}.webp`,
}));

export const PORTFOLIO_ITEM_SLUGS = [
  "millennia-branding",
  "skola-campaign",
  "campusup-ads",
  "edunext-automation",
  "corporate-website-b2b",
  "ecommerce-store",
  "clinic-branding",
  "hotel-digital",
] as const;

export type PortfolioItemSlug = (typeof PORTFOLIO_ITEM_SLUGS)[number];

export const portfolioMeta: {
  slug: PortfolioItemSlug;
  industry: string;
  services: string[];
  technologies: string[];
  cover: string;
  caseStudySlug?: string;
  featured?: boolean;
}[] = [
  {
    slug: "millennia-branding",
    industry: "education",
    services: ["social-media", "brand-identity", "reels", "meta-ads"],
    technologies: ["Meta Ads", "Canva", "After Effects"],
    cover: "/realisations/millennia/posters/millennia-01.webp",
    caseStudySlug: "millennia-group-prive",
    featured: true,
  },
  {
    slug: "skola-campaign",
    industry: "education",
    services: ["meta-ads", "landing-pages", "marketing-automation"],
    technologies: ["Meta Ads", "Next.js", "HubSpot"],
    cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    caseStudySlug: "skola-formation",
    featured: true,
  },
  {
    slug: "campusup-ads",
    industry: "education",
    services: ["google-ads", "landing-pages"],
    technologies: ["Google Ads", "Performance Max"],
    cover: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80",
    caseStudySlug: "campusup-search",
    featured: true,
  },
  {
    slug: "edunext-automation",
    industry: "education",
    services: ["marketing-automation", "crm-data", "chatbots"],
    technologies: ["WhatsApp API", "CRM", "Automation"],
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    caseStudySlug: "edunext-automation",
    featured: true,
  },
  {
    slug: "corporate-website-b2b",
    industry: "startups",
    services: ["corporate-websites", "seo", "brand-identity"],
    technologies: ["Next.js", "Tailwind", "SEO"],
    cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    caseStudySlug: "nova-industrie-web",
    featured: true,
  },
  {
    slug: "ecommerce-store",
    industry: "e-commerce",
    services: ["e-commerce", "meta-ads", "product-photography"],
    technologies: ["Shopify", "Meta Ads", "Stripe"],
    cover: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    caseStudySlug: "atlas-ecommerce-growth",
    featured: true,
  },
  {
    slug: "clinic-branding",
    industry: "healthcare",
    services: ["brand-identity", "corporate-websites", "seo"],
    technologies: ["Figma", "Next.js", "Google Ads"],
    cover: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    caseStudySlug: "medina-clinic-digital",
    featured: true,
  },
  {
    slug: "hotel-digital",
    industry: "hotels",
    services: ["corporate-websites", "video-production", "seo"],
    technologies: ["Next.js", "Booking API", "SEO"],
    cover: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    caseStudySlug: "riad-hotel-digital",
    featured: false,
  },
];

// Re-export legacy ids for backward compat
export { millenniaCreativeIds } from "./portfolio-legacy";
