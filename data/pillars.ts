/** Service pillars — structural metadata only */

export const SERVICE_PILLARS = [
  "marketing",
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
  web: { icon: "Globe", order: 2 },
  software: { icon: "Code2", order: 3 },
  mobile: { icon: "Smartphone", order: 4 },
  creative: { icon: "Palette", order: 5 },
  "photo-video": { icon: "Video", order: 6 },
  events: { icon: "CalendarDays", order: 7 },
};
