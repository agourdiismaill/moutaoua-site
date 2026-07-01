import type { VideoItem } from "./types";

export type VideoMeta = Pick<
  VideoItem,
  "id" | "date" | "thumbnail" | "youtubeId"
> & { categoryKey: string };

export const videoMeta: VideoMeta[] = [
  {
    id: "v1",
    date: "2025-11-12",
    categoryKey: "caseStudy",
    thumbnail:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "ysz5S6PUM-U",
  },
  {
    id: "v2",
    date: "2025-10-03",
    categoryKey: "testimonial",
    thumbnail:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "aqz-KE-bpKQ",
  },
  {
    id: "v3",
    date: "2025-09-21",
    categoryKey: "masterclass",
    thumbnail:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "ScMzIvxBSi4",
  },
  {
    id: "v4",
    date: "2025-08-15",
    categoryKey: "cro",
    thumbnail:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "ysz5S6PUM-U",
  },
  {
    id: "v5",
    date: "2025-07-08",
    categoryKey: "automation",
    thumbnail:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "aqz-KE-bpKQ",
  },
  {
    id: "v6",
    date: "2025-06-19",
    categoryKey: "testimonial",
    thumbnail:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "ScMzIvxBSi4",
  },
];
