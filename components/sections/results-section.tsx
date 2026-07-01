"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ResultCard } from "./result-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getLocalizedResults } from "@/lib/i18n-content";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ResultsSection({ className }: { className?: string }) {
  const ts = useTranslations("sections.results");
  const t = useTranslations("results");
  const adResults = getLocalizedResults(t);

  return (
    <section id="results" className={cn("section-pad bg-surface-bright", className)}>
      <div className="container-max">
        <SectionHeading
          eyebrow={ts("eyebrow")}
          title={ts("title")}
          description={ts("description")}
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {adResults.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </motion.div>
        <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground">
          {ts("disclaimer")}
        </p>
      </div>
    </section>
  );
}
