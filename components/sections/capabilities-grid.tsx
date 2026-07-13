"use client";

import { useTranslations } from "next-intl";
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
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{t(`items.${key}.title`)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`items.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
