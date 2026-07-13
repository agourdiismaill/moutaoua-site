"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type LazyVideoProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  "src" | "preload"
> & {
  src: string;
  poster?: string;
  rootMargin?: string;
  eager?: boolean;
  videoClassName?: string;
};

export function LazyVideo({
  src,
  poster,
  rootMargin = "200px",
  eager = false,
  className,
  videoClassName,
  ...props
}: LazyVideoProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeSrc, setActiveSrc] = React.useState<string | undefined>(eager ? src : undefined);

  React.useEffect(() => {
    if (eager) {
      setActiveSrc(src);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src);
          io.disconnect();
        }
      },
      { rootMargin }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [src, rootMargin, eager]);

  return (
    <div ref={containerRef} className={cn("relative h-full w-full", className)}>
      <video
        {...props}
        poster={poster}
        preload={eager ? "auto" : "none"}
        src={activeSrc}
        className={cn("absolute inset-0 h-full w-full object-cover", videoClassName)}
      />
    </div>
  );
}
