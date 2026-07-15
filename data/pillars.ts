/** Service pillars — structural metadata only */

export const SERVICE_PILLARS = [
  "marketing",
  "communication",
  "web",
  "software",
  "mobile",
  "creative",
  "photo-video",
  "events",
] as const;

export type ServicePillar = (typeof SERVICE_PILLARS)[number];

export const pillarMeta: Record<
  ServicePillar,
  { icon: string; order: number }
> = {
  marketing: { icon: "Megaphone", order: 1 },
  communication: { icon: "MessageCircle", order: 2 },
  web: { icon: "Globe", order: 3 },
  software: { icon: "Code2", order: 4 },
  mobile: { icon: "Smartphone", order: 5 },
  creative: { icon: "Palette", order: 6 },
  "photo-video": { icon: "Video", order: 7 },
  events: { icon: "CalendarDays", order: 8 },
};
