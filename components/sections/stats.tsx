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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={fadeUp}
              className="glass flex flex-col items-center justify-center rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-2 md:p-8"
            >
              <span className="mb-4 grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary">
                <Icon name={stat.icon} className="size-6" />
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
        <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground">
          {ts("disclaimer")}
        </p>
      </div>
    </section>
  );
}
