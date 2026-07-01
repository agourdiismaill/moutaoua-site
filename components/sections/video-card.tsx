"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Play, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";
import type { VideoItem } from "@/data/types";

export function VideoCard({
  video,
  onPlay,
}: {
  video: VideoItem;
  onPlay: (video: VideoItem) => void;
}) {
  const t = useTranslations("shared");

  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <button
        type="button"
        onClick={() => onPlay(video)}
        aria-label={t("videoPlayAria", { title: video.title })}
        className="relative aspect-video w-full overflow-hidden"
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4">
          <Badge variant="solid">{video.category}</Badge>
        </span>
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-16 place-items-center rounded-full bg-white/90 text-primary shadow-glow transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
            <Play className="size-6 translate-x-0.5 fill-current" />
          </span>
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-xs font-medium text-primary">
          {video.client}
        </div>
        <h3 className="text-lg font-semibold leading-snug tracking-tight">
          {video.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {video.description}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          <time dateTime={video.date}>{formatDate(video.date)}</time>
        </div>
      </div>
    </motion.article>
  );
}
