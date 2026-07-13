import type { ServicePillar } from "./pillars";
import type { Service } from "./types";

type ServiceMetaEntry = Pick<Service, "slug" | "icon" | "highlighted"> & {
  pillar: ServicePillar;
};

/** Structural metadata — text lives in messages/{locale}/services.json */
export const serviceMeta: ServiceMetaEntry[] = [
  // Marketing
  { slug: "meta-ads", icon: "Target", highlighted: true, pillar: "marketing" },
  { slug: "google-ads", icon: "Search", pillar: "marketing" },
  { slug: "tiktok-ads", icon: "Music2", pillar: "marketing" },
  { slug: "seo", icon: "LineChart", pillar: "marketing" },
  { slug: "geo", icon: "Bot", pillar: "marketing" },
  { slug: "content-marketing", icon: "FileText", pillar: "marketing" },
  { slug: "email-marketing", icon: "Mail", pillar: "marketing" },
  { slug: "marketing-automation", icon: "Workflow", pillar: "marketing" },
  { slug: "crm-data", icon: "Database", pillar: "marketing" },
  { slug: "lead-generation", icon: "UserPlus", pillar: "marketing" },
  { slug: "community-management", icon: "Share2", pillar: "marketing" },
  // Web
  { slug: "corporate-websites", icon: "Globe", pillar: "web" },
  { slug: "landing-pages", icon: "LayoutTemplate", pillar: "web" },
  { slug: "e-commerce", icon: "ShoppingCart", pillar: "web" },
  { slug: "booking-platforms", icon: "CalendarCheck", pillar: "web" },
  { slug: "marketplaces", icon: "Store", pillar: "web" },
  { slug: "portals", icon: "LayoutGrid", pillar: "web" },
  // Software
  { slug: "erp", icon: "Boxes", pillar: "software" },
  { slug: "custom-software", icon: "Code2", pillar: "software" },
  { slug: "saas", icon: "Cloud", pillar: "software" },
  { slug: "business-platforms", icon: "Layers", pillar: "software" },
  { slug: "automation", icon: "Zap", pillar: "software" },
  { slug: "ai-agents", icon: "Brain", pillar: "software" },
  { slug: "chatbots", icon: "MessageSquare", pillar: "software" },
  { slug: "workflow-automation", icon: "GitBranch", pillar: "software" },
  { slug: "api-integration", icon: "Plug", pillar: "software" },
  // Mobile
  { slug: "android", icon: "Smartphone", pillar: "mobile" },
  { slug: "ios", icon: "TabletSmartphone", pillar: "mobile" },
  { slug: "flutter", icon: "Feather", pillar: "mobile" },
  { slug: "react-native", icon: "Atom", pillar: "mobile" },
  // Creative
  { slug: "brand-identity", icon: "Fingerprint", pillar: "creative" },
  { slug: "logo", icon: "CircleDot", pillar: "creative" },
  { slug: "graphic-design", icon: "Palette", pillar: "creative" },
  { slug: "brochure", icon: "BookOpen", pillar: "creative" },
  { slug: "catalogue", icon: "BookCopy", pillar: "creative" },
  { slug: "flyers", icon: "Newspaper", pillar: "creative" },
  { slug: "packaging", icon: "Package", pillar: "creative" },
  { slug: "infographics", icon: "BarChart3", pillar: "creative" },
  { slug: "presentation-design", icon: "Presentation", pillar: "creative" },
  // Photo & Video
  { slug: "commercial-photography", icon: "Camera", pillar: "photo-video" },
  { slug: "corporate-photography", icon: "Camera", pillar: "photo-video" },
  { slug: "product-photography", icon: "Image", pillar: "photo-video" },
  { slug: "video-production", icon: "Video", pillar: "photo-video" },
  { slug: "drone", icon: "Plane", pillar: "photo-video" },
  { slug: "reels", icon: "Clapperboard", pillar: "photo-video" },
  { slug: "motion-graphics", icon: "Film", pillar: "photo-video" },
  // Events
  { slug: "corporate-events", icon: "CalendarDays", pillar: "events" },
  { slug: "conferences", icon: "Mic2", pillar: "events" },
  { slug: "training-events", icon: "GraduationCap", pillar: "events" },
  { slug: "booth-design", icon: "LayoutDashboard", pillar: "events" },
  { slug: "brand-activation", icon: "Sparkles", pillar: "events" },
  { slug: "event-communication", icon: "Megaphone", pillar: "events" },
  // Legacy
  { slug: "social-media", icon: "Share2", pillar: "marketing" },
];

export function getServicesByPillar(pillar: ServicePillar) {
  return serviceMeta.filter((s) => s.pillar === pillar);
}
