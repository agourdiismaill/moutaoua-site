"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Icon } from "@/components/shared/icon";
import { getLocalizedIndustries } from "@/lib/i18n-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function IndustriesGrid() {
  const ti = useTranslations("industries");
  const industries = getLocalizedIndustries(ti);

  return (
    <section className="section-pad pt-0">
      <div className="container-max">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((industry) => (
            <motion.article key={industry.slug} variants={fadeUp}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon name={industry.icon} className="size-7" />
                </span>
                <h2 className="text-xl font-semibold tracking-tight">{industry.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
