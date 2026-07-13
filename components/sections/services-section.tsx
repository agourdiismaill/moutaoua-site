"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { SectionHeading } from "@/components/shared/section-heading";
import { getLocalizedServices } from "@/lib/i18n-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ServicesSection({
  withFeatures = false,
  heading = true,
  highlightedOnly = false,
  limit,
  className,
}: {
  withFeatures?: boolean;
  heading?: boolean;
  highlightedOnly?: boolean;
  limit?: number;
  className?: string;
}) {
  const ts = useTranslations("sections.services");
  const t = useTranslations("services");
  const items = getLocalizedServices(t)
    .filter((s) => !highlightedOnly || s.highlighted)
    .slice(0, limit);

  return (
    <section id="services" className={cn("section-pad", className)}>
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
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((service) => (
            <motion.article
              key={service.slug}
              variants={fadeUp}
              className={cn(
                "group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg",
                service.highlighted && "ring-1 ring-primary/20"
              )}
            >
              <Link href={`/services/${service.slug}`} className="flex flex-col gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon name={service.icon} className="size-7" />
              </span>
              <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              </Link>

              {withFeatures && (
                <ul className="mt-2 space-y-2.5 border-t border-border pt-4">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
