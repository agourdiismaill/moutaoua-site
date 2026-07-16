"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Icon } from "@/components/shared/icon";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { SectionHeading } from "@/components/shared/section-heading";
import { getLocalizedStats } from "@/lib/i18n-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Stats({
  heading = true,
  className,
}: {
  heading?: boolean;
  className?: string;
}) {
  const ts = useTranslations("sections.stats");
  const t = useTranslations("stats");
  const stats = getLocalizedStats(t);

  return (
    <section className={cn("section-pad bg-surface-lowest", className)}>
      <div className="container-max">
        {heading && (
          <SectionHeading
            eyebrow={ts("eyebrow")}
            title={ts("title")}
            description={ts("description")}
            className="mb-16"
          />
        )}

        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-brand p-4 shadow-glow md:p-6">
          <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-20" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={fadeUp}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/90 p-5 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1 dark:bg-card/90 md:glass md:border-transparent md:p-7"
              >
                <span className="mb-3 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon name={stat.icon} className="size-5" />
                </span>
                <div className="text-3xl font-bold tracking-tight text-gradient md:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <p className="relative mt-6 text-center text-xs leading-relaxed text-white/75">
            {ts("disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}
