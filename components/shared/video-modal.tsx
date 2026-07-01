"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { VideoItem } from "@/data/types";

export function VideoModal({
  video,
  open,
  onOpenChange,
}: {
  video: VideoItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl overflow-hidden p-0">
        {video && (
          <>
            <div className="relative aspect-video w-full overflow-hidden rounded-t-[1.4rem] bg-black">
              {open && video.youtubeId ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : video.videoUrl ? (
                <video
                  className="absolute inset-0 h-full w-full"
                  src={video.videoUrl}
                  controls
                  autoPlay
                />
              ) : null}
            </div>
            <div className="space-y-2 p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
                <span>{video.category}</span>
                <span className="text-muted-foreground/50">•</span>
                <span className="text-muted-foreground">{video.client}</span>
              </div>
              <DialogTitle>{video.title}</DialogTitle>
              <DialogDescription>{video.description}</DialogDescription>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
