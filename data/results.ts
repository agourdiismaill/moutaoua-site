import type { AdResult } from "./types";

const shot = (seed: string) => ({
  src: `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`,
  alt: "",
  caption: "",
});

export const resultMeta = [
  {
    id: "meta-ads",
    icon: "Facebook",
    accent: "blue" as const,
    metrics: [
      { value: "1 240" },
      { value: "53 DH" },
      { value: "5,2x" },
    ],
    screenshots: [
      shot("photo-1551288049-bebda4e38f71"),
      shot("photo-1460925895917-afdab827c52f"),
      shot("photo-1504868584819-f8e8b4b6d7e3"),
    ],
  },
  {
    id: "tiktok-ads",
    icon: "Music2",
    accent: "orange" as const,
    metrics: [
      { value: "1 580" },
      { value: "41 DH" },
      { value: "4,6x" },
    ],
    screenshots: [
      shot("photo-1611605698335-8b1569810432"),
      shot("photo-1535303311164-664fc9ec6532"),
    ],
  },
  {
    id: "google-ads",
    icon: "Search",
    accent: "green" as const,
    metrics: [
      { value: "+312%" },
      { value: "6,80 DH" },
      { value: "9,4%" },
    ],
    screenshots: [
      shot("photo-1551288049-bebda4e38f71"),
      shot("photo-1543286386-713bdd548da4"),
    ],
  },
  {
    id: "lead-forms",
    icon: "ClipboardList",
    accent: "cyan" as const,
    metrics: [
      { value: "68%" },
      { value: "84%" },
      { value: "34 DH" },
    ],
    screenshots: [
      shot("photo-1454165804606-c3d57bc86b40"),
      shot("photo-1556761175-5973dc0f32e7"),
    ],
  },
  {
    id: "crm",
    icon: "Database",
    accent: "violet" as const,
    metrics: [
      { value: "+47%" },
      { value: "< 5 min" },
      { value: "100%" },
    ],
    screenshots: [
      shot("photo-1551434678-e076c223a692"),
      shot("photo-1460925895917-afdab827c52f"),
    ],
  },
  {
    id: "whatsapp",
    icon: "MessageCircle",
    accent: "green" as const,
    metrics: [
      { value: "98%" },
      { value: "62%" },
      { value: "+38%" },
    ],
    screenshots: [
      shot("photo-1611606063065-ee7946f0787a"),
      shot("photo-1556656793-08538906a9f8"),
    ],
  },
];
