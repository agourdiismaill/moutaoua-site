"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SERVICE_PILLARS } from "@/data/pillars";
import { getServicesByPillar } from "@/data/services";
import { getLocalizedServices } from "@/lib/i18n-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ServicesByPillar({
  withFeatures = false,
  heading = true,
  className,
}: {
  withFeatures?: boolean;
  heading?: boolean;
  className?: string;
}) {
  const ts = useTranslations("sections.services");
  const tc = useTranslations("sections.capabilities");
  const tp = useTranslations("pillars");
  const t = useTranslations("services");
  const allServices = getLocalizedServices(t);

  return (
    <section id="services" className={cn("section-pad", className)}>
      <div className="container-max">
        {heading && (
          <SectionHeading
            eyebrow={ts("eyebrow")}
            title={ts("title")}
            description={ts("description")}
          className="mb-10"
          />
        )}

        <Tabs defaultValue={SERVICE_PILLARS[0]} className="space-y-8">
          <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
            {SERVICE_PILLARS.map((pillar) => (
              <TabsTrigger
                key={pillar}
                value={pillar}
                className="rounded-full border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                {tp(`items.${pillar}.title`)}
              </TabsTrigger>
            ))}
          </TabsList>

          {SERVICE_PILLARS.map((pillar) => {
            const slugs = getServicesByPillar(pillar).map((s) => s.slug);
            const items = allServices.filter((s) => slugs.includes(s.slug));

            return (
              <TabsContent key={pillar} value={pillar}>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
                >
                  {items.map((service) => (
                    <motion.article
                      key={service.slug}
                      variants={fadeUp}
                      className={cn(
                        "group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg md:p-7",
                        service.highlighted && "ring-1 ring-primary/20"
                      )}
                    >
                      <ServiceIllustration slug={service.slug} />
                      <Link href={`/services/${service.slug}`} className="relative z-10 flex flex-1 flex-col gap-4">
                        <div className="flex items-start justify-between gap-4">
                          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                            <Icon name={service.icon} className="size-7" />
                          </span>
                          <span className="mt-1 size-2 rounded-full bg-primary/20 transition-all duration-300 group-hover:mr-1 group-hover:bg-primary" />
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                      </Link>

                      {withFeatures && (
                        <ul className="relative z-10 space-y-2 border-t border-border pt-4">
                          {service.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link
                        href={`/services/${service.slug}`}
                        className="relative z-10 mt-auto inline-flex items-center gap-2 pt-1 text-sm font-semibold text-primary transition-[gap] duration-300 hover:gap-3"
                      >
                        {tc("viewDetailShort")}
                        <ArrowRight className="size-4" />
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}

function ServiceIllustration({ slug }: { slug: string }) {
  const illustration = getIllustrationSlug(slug);

  return (
    <Image
      src={`/illustrations/${illustration}.webp`}
      alt=""
      width={144}
      height={144}
      loading="lazy"
      sizes="144px"
      aria-hidden="true"
      className="pointer-events-none absolute -right-4 -top-5 z-0 size-36 object-contain opacity-80 transition-transform duration-500 group-hover:scale-105"
    />
  );
}

function getIllustrationSlug(slug: string) {
  if (["ai-agents", "geo"].includes(slug)) return "ai-agents";
  if (["chatbots"].includes(slug)) return "chatbots";
  if (["custom-software", "saas", "business-platforms", "api-integration"].includes(slug)) {
    return "website-development";
  }
  if (["automation", "workflow-automation", "marketing-automation"].includes(slug)) return "automation";
  if (["crm-data", "lead-generation"].includes(slug)) return "crm";
  if (["erp"].includes(slug)) return "erp";
  if (["android", "ios", "flutter", "react-native"].includes(slug)) return "mobile-apps";
  if (["google-ads"].includes(slug)) return "google-ads";
  if (["meta-ads"].includes(slug)) return "meta-ads";
  if (["tiktok-ads"].includes(slug)) return "tiktok-ads";
  if (["seo"].includes(slug)) return "seo";
  if (["brand-identity", "logo", "graphic-design", "agence-creative-maroc"].includes(slug)) return "branding";
  if (["brochure", "catalogue", "flyers", "packaging"].includes(slug)) return "brochure";
  if (["commercial-photography", "corporate-photography", "product-photography"].includes(slug)) {
    return "photography";
  }
  if (["video-production", "reels", "motion-graphics"].includes(slug)) return "video-production";
  if (["corporate-events", "conferences", "training-events", "booth-design", "brand-activation", "event-communication"].includes(slug)) {
    return "events";
  }
  return "website-development";
}
