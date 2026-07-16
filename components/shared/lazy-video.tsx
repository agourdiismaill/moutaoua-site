"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LazyVideoProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  "src" | "preload" | "poster"
> & {
  src: string;
  /** Static WebP/JPEG shown until the user plays (never set as <video poster>). */
  poster?: string;
  /** When true, load and play immediately (modal player). */
  eager?: boolean;
  /** When false (default), video bytes load only after play() is requested. */
  loadOnPlay?: boolean;
  videoClassName?: string;
  /** Called when the user taps the play overlay (optional). */
  onPlayRequest?: () => void;
  /** Show a play affordance overlay when not yet loading. */
  showPlayOverlay?: boolean;
};

/**
 * Performance-first video:
 * - Poster is a next/image (lazy), never <video poster> (which loads eagerly).
 * - By default, <source> is attached only when play is requested (click), not on scroll.
 * - preload="none" always for non-eager mode.
 */
export function LazyVideo({
  src,
  poster,
  eager = false,
  loadOnPlay = true,
  className,
  videoClassName,
  onPlayRequest,
  showPlayOverlay = false,
  autoPlay,
  ...props
}: LazyVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = React.useState<string | undefined>(
    eager || !loadOnPlay ? src : undefined
  );
  const [playing, setPlaying] = React.useState(Boolean(eager && autoPlay));

  React.useEffect(() => {
    if (eager) {
      setActiveSrc(src);
      return;
    }
    if (!loadOnPlay) {
      setActiveSrc(src);
    }
  }, [src, eager, loadOnPlay]);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el || !activeSrc) return;
    if (autoPlay || playing) {
      void el.play().catch(() => undefined);
    }
  }, [activeSrc, autoPlay, playing]);

  const startPlayback = React.useCallback(() => {
    setActiveSrc(src);
    setPlaying(true);
    onPlayRequest?.();
  }, [src, onPlayRequest]);

  const showPoster = Boolean(poster) && !playing && !eager;

  return (
    <div className={cn("relative h-full w-full", className)}>
      {showPoster && (
        <Image
          src={poster!}
          alt=""
          fill
          loading="lazy"
          sizes="(max-width: 640px) 60vw, 240px"
          className="object-cover"
        />
      )}

      {(activeSrc || eager) && (
        <video
          ref={videoRef}
          {...props}
          autoPlay={autoPlay || playing}
          preload={eager ? "metadata" : "none"}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            showPoster && "opacity-0",
            playing && "opacity-100",
            videoClassName
          )}
        >
          {activeSrc ? <source src={activeSrc} type="video/mp4" /> : null}
        </video>
      )}

      {showPlayOverlay && !playing && !eager && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            startPlayback();
          }}
          className="absolute inset-0 z-10"
          aria-label="Play"
        />
      )}
    </div>
  );
}

export function usePlayOnClickVideo() {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  return {
    shouldLoad,
    requestPlay: () => setShouldLoad(true),
  };
}
