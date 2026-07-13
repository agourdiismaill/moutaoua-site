/** Industry slugs — structural metadata only */

export const INDUSTRY_SLUGS = [
  "education",
  "healthcare",
  "clinics",
  "doctors",
  "dental-clinics",
  "medical-centers",
  "spa",
  "beauty-centers",
  "restaurants",
  "hotels",
  "real-estate",
  "construction",
  "architecture",
  "retail",
  "automotive",
  "law-firms",
  "accounting-firms",
  "ngos",
  "government",
  "factories",
  "e-commerce",
  "startups",
  "smes",
] as const;

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

/** Industries with full dedicated page content */
export const FEATURED_INDUSTRY_SLUGS: IndustrySlug[] = [
  "education",
  "healthcare",
  "e-commerce",
  "real-estate",
  "restaurants",
  "hotels",
  "retail",
  "startups",
];

const industryIcons: Record<IndustrySlug, string> = {
  education: "GraduationCap",
  healthcare: "HeartPulse",
  clinics: "Stethoscope",
  doctors: "UserRound",
  "dental-clinics": "Smile",
  "medical-centers": "Building2",
  spa: "Sparkles",
  "beauty-centers": "Scissors",
  restaurants: "UtensilsCrossed",
  hotels: "Hotel",
  "real-estate": "Home",
  construction: "HardHat",
  architecture: "Ruler",
  retail: "ShoppingBag",
  automotive: "Car",
  "law-firms": "Scale",
  "accounting-firms": "Calculator",
  ngos: "HandHeart",
  government: "Landmark",
  factories: "Factory",
  "e-commerce": "ShoppingCart",
  startups: "Rocket",
  smes: "Building",
};

export const industryMeta: Pick<
  { slug: IndustrySlug; icon: string; featured?: boolean },
  "slug" | "icon" | "featured"
>[] = INDUSTRY_SLUGS.map((slug) => ({
  slug,
  icon: industryIcons[slug],
  featured: FEATURED_INDUSTRY_SLUGS.includes(slug),
}));

/** Map industries to related case study slugs */
export const industryCaseStudyMap: Partial<Record<IndustrySlug, string[]>> = {
  education: ["skola-formation", "campusup-search", "millennia-group-prive"],
  healthcare: ["medina-clinic-digital"],
  clinics: ["medina-clinic-digital"],
  "e-commerce": ["atlas-ecommerce-growth"],
  retail: ["atlas-ecommerce-growth", "millennia-group-prive"],
  startups: ["nova-industrie-web", "atlas-ecommerce-growth"],
  smes: ["nova-industrie-web"],
  hotels: ["riad-hotel-digital"],
  restaurants: ["millennia-group-prive"],
};

/** Map industries to recommended service slugs */
export const industryServiceMap: Partial<Record<IndustrySlug, string[]>> = {
  education: ["meta-ads", "google-ads", "landing-pages", "social-media", "marketing-automation"],
  healthcare: ["seo", "google-ads", "corporate-websites", "content-marketing"],
  "e-commerce": ["meta-ads", "google-ads", "e-commerce", "seo", "email-marketing"],
  "real-estate": ["meta-ads", "google-ads", "landing-pages", "video-production"],
  restaurants: ["meta-ads", "social-media", "reels", "google-ads"],
  hotels: ["seo", "meta-ads", "corporate-websites", "brand-identity"],
  retail: ["e-commerce", "meta-ads", "product-photography", "social-media"],
  startups: ["landing-pages", "brand-identity", "meta-ads", "custom-software"],
};
