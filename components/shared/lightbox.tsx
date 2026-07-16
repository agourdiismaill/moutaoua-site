"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryProps {
  images: LightboxImage[];
  className?: string;
  /** grid column count on desktop */
  columns?: 2 | 3 | 4;
  /** thumbnail aspect ratio */
  aspect?: "video" | "square" | "portrait";
  /** Cap visible thumbnails (full set still available in lightbox when opened from shown items). */
  limit?: number;
}

/** Responsive thumbnail grid that opens a full lightbox on click. */
export function Gallery({
  images,
  className,
  columns = 3,
  aspect = "video",
  limit,
}: GalleryProps) {
  const [index, setIndex] = React.useState<number | null>(null);
  const visible = typeof limit === "number" ? images.slice(0, limit) : images;

  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  const aspectClass =
    aspect === "portrait"
      ? "aspect-[4/5]"
      : aspect === "square"
        ? "aspect-square"
        : "aspect-[4/3]";

  return (
    <>
      <div className={cn("grid grid-cols-2 gap-3 sm:gap-4", cols, className)}>
        {visible.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border bg-muted shadow-soft transition-all duration-300 hover:shadow-soft-lg",
              aspectClass
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 240px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            {img.caption && (
              <span className="absolute bottom-3 left-3 right-3 translate-y-2 text-left text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {img.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      <LightboxOverlay images={images} index={index} setIndex={setIndex} />
    </>
  );
}

export function LightboxOverlay({
  images,
  index,
  setIndex,
}: {
  images: LightboxImage[];
  index: number | null;
  setIndex: (i: number | null) => void;
}) {
  const t = useTranslations("shared");
  const open = index !== null;

  const go = React.useCallback(
    (dir: number) => {
      setIndex(((index ?? 0) + dir + images.length) % images.length);
    },
    [index, images.length, setIndex]
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, setIndex]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setIndex(null)}
        >
          <button
            type="button"
            aria-label={t("lightboxClose")}
            onClick={() => setIndex(null)}
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="size-5" />
          </button>

          {images.length > 1 && (
            <>
              <NavButton
                side="left"
                label={t("lightboxPrev")}
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              />
              <NavButton
                side="right"
                label={t("lightboxNext")}
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              />
            </>
          )}

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            {images[index].caption && (
              <p className="mt-4 text-center text-sm text-white/80">
                {images[index].caption}
              </p>
            )}
            <p className="mt-1 text-center text-xs text-white/50">
              {index + 1} / {images.length}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20",
        side === "left" ? "left-4" : "right-4"
      )}
    >
      {side === "left" ? <ChevronLeft className="size-6" /> : <ChevronRight className="size-6" />}
    </button>
  );
}
