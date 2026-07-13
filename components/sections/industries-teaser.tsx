"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Icon } from "@/components/shared/icon";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { FEATURED_INDUSTRY_SLUGS } from "@/data/industries";
import { industryMeta } from "@/data/industries";
import { getLocalizedIndustries } from "@/lib/i18n-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function IndustriesTeaser({ className }: { className?: string }) {
  const t = useTranslations("sections.industriesTeaser");
  const ti = useTranslations("industries");
  const industries = getLocalizedIndustries(ti).filter((i) =>
    FEATURED_INDUSTRY_SLUGS.includes(i.slug as (typeof FEATURED_INDUSTRY_SLUGS)[number])
  );

  return (
    <section id="industries" className={cn("section-pad", className)}>
      <div className="container-max">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {industries.map((industry) => {
            const meta = industryMeta.find((m) => m.slug === industry.slug);
            return (
              <motion.div key={industry.slug} variants={fadeUp}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon name={meta?.icon ?? "Building"} className="size-6" />
                  </span>
                  <span className="text-sm font-semibold tracking-tight">{industry.title}</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/industries">
              {t("cta")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
