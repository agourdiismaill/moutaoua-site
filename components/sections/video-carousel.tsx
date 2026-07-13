"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { getLocalizedReelVideos } from "@/lib/i18n-content";
import type { ReelVideo } from "@/data/showcase-videos";
import { LazyVideo } from "@/components/shared/lazy-video";
import { cn } from "@/lib/utils";

export function VideoCarousel({ className }: { className?: string }) {
  const t = useTranslations("sections.videoCarousel");
  const ts = useTranslations("showcase");
  const reelVideos = getLocalizedReelVideos(ts);

  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState<number | null>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const updateArrows = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  React.useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCards = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? (card.offsetWidth + 20) * 2 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="videos" className={cn("section-pad bg-surface-bright", className)}>
      <div className="container-max">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-0"
          />
          <div className="flex gap-3">
            <CarouselButton
              direction="prev"
              disabled={!canPrev}
              label={t("prev")}
              onClick={() => scrollByCards(-1)}
            />
            <CarouselButton
              direction="next"
              disabled={!canNext}
              label={t("next")}
              onClick={() => scrollByCards(1)}
            />
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reelVideos.map((video, i) => (
            <ReelCard
              key={video.id}
              video={video}
              playLabel={t("playAria", { title: video.title })}
              onPlay={() => setActive(i)}
            />
          ))}
        </div>
      </div>

      <ReelPlayer
        videos={reelVideos}
        index={active}
        setIndex={setActive}
        closeLabel={t("close")}
        prevLabel={t("prev")}
        nextLabel={t("next")}
      />
    </section>
  );
}

function ReelCard({
  video,
  playLabel,
  onPlay,
}: {
  video: ReelVideo;
  playLabel: string;
  onPlay: () => void;
}) {
  return (
    <motion.button
      type="button"
      data-card
      onClick={onPlay}
      aria-label={playLabel}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[9/16] w-[60%] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-black shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg sm:w-[42%] md:w-[240px]"
    >
      <LazyVideo
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        aria-hidden
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
      <span className="absolute inset-0 grid place-items-center transition-opacity duration-300 group-hover:opacity-0">
        <span className="grid size-14 place-items-center rounded-full bg-white/90 text-primary shadow-glow">
          <Play className="size-6 translate-x-0.5 fill-current" />
        </span>
      </span>
      <span className="absolute bottom-3 start-3 end-3 text-start text-sm font-medium text-white">
        {video.title}
      </span>
    </motion.button>
  );
}

function ReelPlayer({
  videos,
  index,
  setIndex,
  closeLabel,
  prevLabel,
  nextLabel,
}: {
  videos: ReelVideo[];
  index: number | null;
  setIndex: (i: number | null) => void;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const open = index !== null;

  const go = React.useCallback(
    (dir: number) => {
      setIndex(((index ?? 0) + dir + videos.length) % videos.length);
    },
    [index, videos.length, setIndex]
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
            aria-label={closeLabel}
            onClick={() => setIndex(null)}
            className="absolute end-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="size-5" />
          </button>

          {videos.length > 1 && (
            <>
              <NavButton
                side="left"
                label={prevLabel}
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              />
              <NavButton
                side="right"
                label={nextLabel}
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
            className="relative aspect-[9/16] max-h-[88vh] overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <LazyVideo
              key={videos[index].src}
              src={videos[index].src}
              poster={videos[index].poster}
              controls
              autoPlay
              playsInline
              eager
              videoClassName="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CarouselButton({
  direction,
  disabled,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-12 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
    >
      {direction === "prev" ? (
        <ChevronLeft className="size-5" />
      ) : (
        <ChevronRight className="size-5" />
      )}
    </button>
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
        side === "left" ? "start-4" : "end-4"
      )}
    >
      {side === "left" ? <ChevronLeft className="size-6" /> : <ChevronRight className="size-6" />}
    </button>
  );
}
