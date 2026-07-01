/** Shared domain types — every content entity is described here so that
 *  pages and components stay fully data-driven and "admin-ready". */

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  /** lucide-react icon name */
  icon: string;
  decimals?: number;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  icon: string;
  features: string[];
  highlighted?: boolean;
}

export interface ClientLogo {
  id: string;
  name: string;
  /** Optional remote/local logo url; falls back to wordmark when absent */
  src?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
  /** BCP-47 language code (e.g. "ar", "de"); enables RTL for Arabic */
  lang?: string;
}

export interface ResultScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface AdResult {
  id: string;
  platform: string;
  title: string;
  description: string;
  icon: string;
  /** key metrics shown on the card */
  metrics: { label: string; value: string }[];
  screenshots: ResultScreenshot[];
  accent: "blue" | "cyan" | "violet" | "green" | "orange";
}

export interface VideoItem {
  id: string;
  title: string;
  client: string;
  description: string;
  date: string;
  category: string;
  /** Raw category key for filtering — set by getLocalizedVideos */
  categoryKey?: string;
  thumbnail: string;
  /** YouTube id or full embed url */
  youtubeId?: string;
  videoUrl?: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  objectives: string[];
  strategy: string[];
  budget: string;
  leads: number;
  cpl: string;
  roas: string;
  timeline: string;
  cover: string;
  images: string[];
  videos: string[];
  testimonials: CaseStudyTestimonial[];
  featured?: boolean;
  tags?: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  /** Display label under "PACK" (e.g. "Start") */
  packLabel: string;
  description: string;
  price: number;
  period: string;
  currency?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
  /** lucide-react icon name */
  icon: string;
  /** Optional intro line before features (e.g. "Comprend :") */
  featuresIntro?: string;
  /** Show ad-budget disclaimer inside the card */
  adBudgetNote?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
