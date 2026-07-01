"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { LightboxOverlay } from "@/components/shared/lightbox";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { AdResult } from "@/data/types";

const accentMap: Record<AdResult["accent"], string> = {
  blue: "from-blue-500/15 to-blue-500/0 text-blue-600 dark:text-blue-400",
  cyan: "from-cyan-500/15 to-cyan-500/0 text-cyan-600 dark:text-cyan-400",
  violet: "from-violet-500/15 to-violet-500/0 text-violet-600 dark:text-violet-400",
  green: "from-emerald-500/15 to-emerald-500/0 text-emerald-600 dark:text-emerald-400",
  orange: "from-orange-500/15 to-orange-500/0 text-orange-600 dark:text-orange-400",
};

export function ResultCard({ result }: { result: AdResult }) {
  const t = useTranslations("sections.results");
  const [index, setIndex] = React.useState<number | null>(null);
  const images = result.screenshots;

  return (
    <motion.article
      variants={fadeUp}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div className="flex items-start justify-between gap-4 p-6 pb-0">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid size-12 place-items-center rounded-xl bg-gradient-to-br",
              accentMap[result.accent]
            )}
          >
            <Icon name={result.icon} className="size-6" />
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{result.platform}</h3>
            <p className="text-xs text-muted-foreground">
              {t("screenshotCount", { count: images.length })}
            </p>
          </div>
        </div>
      </div>

      <p className="px-6 py-4 text-sm leading-relaxed text-muted-foreground">
        {result.description}
      </p>

      <div className="grid grid-cols-3 gap-1.5 px-6">
        {images.slice(0, 3).map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
            aria-label={t("viewImageAria", { alt: img.alt })}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading="lazy"
              sizes="120px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {i === 2 && images.length > 3 && (
              <span className="absolute inset-0 grid place-items-center bg-black/55 text-sm font-semibold text-white">
                +{images.length - 3}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 p-6">
        {result.metrics.map((m) => (
          <div key={m.label} className="rounded-xl bg-muted/60 p-3 text-center">
            <div className="text-base font-bold tracking-tight text-gradient">
              {m.value}
            </div>
            <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIndex(0)}
        className="flex items-center justify-center gap-2 border-t border-border py-3.5 text-sm font-medium text-primary transition-colors hover:bg-muted"
      >
        <Images className="size-4" />
        {t("viewGallery")}
      </button>

      <LightboxOverlay images={images} index={index} setIndex={setIndex} />
    </motion.article>
  );
}
