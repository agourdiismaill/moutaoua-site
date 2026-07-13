"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
  Fingerprint,
  Globe,
  Code2,
  Smartphone,
  UserPlus,
  Zap,
  Palette,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const capabilityIcons = {
  brands: Fingerprint,
  websites: Globe,
  software: Code2,
  mobile: Smartphone,
  leads: UserPlus,
  automation: Zap,
  creative: Palette,
  events: CalendarDays,
} as const;

const capabilityServiceSlugs: Record<keyof typeof capabilityIcons, string> = {
  brands: "brand-identity",
  websites: "corporate-websites",
  software: "custom-software",
  mobile: "flutter",
  leads: "lead-generation",
  automation: "marketing-automation",
  creative: "video-production",
  events: "corporate-events",
};

const capabilityKeys = Object.keys(capabilityIcons) as (keyof typeof capabilityIcons)[];

export function CapabilitiesGrid({ className }: { className?: string }) {
  const t = useTranslations("sections.capabilities");

  return (
    <section id="capabilities" className={cn("section-pad bg-surface-bright", className)}>
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
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {capabilityKeys.map((key) => {
            const Icon = capabilityIcons[key];
            const title = t(`items.${key}.title`);
            return (
              <motion.div key={key} variants={fadeUp}>
                <Link
                  href={`/services/${capabilityServiceSlugs[key]}`}
                  aria-label={t("viewDetail", { title })}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`items.${key}.description`)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {t("viewDetailShort")}
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
