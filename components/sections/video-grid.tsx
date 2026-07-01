"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { VideoCard } from "./video-card";
import { VideoModal } from "@/components/shared/video-modal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLocalizedVideoCategories, getLocalizedVideos } from "@/lib/i18n-content";
import { staggerFast, viewportOnce } from "@/lib/motion";
import type { VideoItem } from "@/data/types";

export function VideoGrid({
  videos: videosProp,
  withFilter = false,
}: {
  videos?: VideoItem[];
  categories?: string[];
  withFilter?: boolean;
}) {
  const t = useTranslations("videos");
  const localizedVideos = getLocalizedVideos(t);
  const videos = videosProp ?? localizedVideos;
  const categoryKeys = t.raw("categoryKeys") as string[];
  const categories = getLocalizedVideoCategories(t);

  const [active, setActive] = React.useState("all");
  const [selected, setSelected] = React.useState<VideoItem | null>(null);
  const [open, setOpen] = React.useState(false);

  const filtered =
    active === "all" ? videos : videos.filter((v) => v.categoryKey === active);

  const handlePlay = (video: VideoItem) => {
    setSelected(video);
    setOpen(true);
  };

  return (
    <div className="space-y-10">
      {withFilter && categoryKeys.length > 1 && (
        <div className="flex justify-center overflow-x-auto hide-scrollbar">
          <Tabs value={active} onValueChange={setActive}>
            <TabsList>
              {categoryKeys.map((key, i) => (
                <TabsTrigger key={key} value={key}>
                  {categories[i]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}

      <motion.div
        key={active}
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((video) => (
          <VideoCard key={video.id} video={video} onPlay={handlePlay} />
        ))}
      </motion.div>

      <VideoModal video={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
