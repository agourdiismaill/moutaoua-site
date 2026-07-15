"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Icon } from "@/components/shared/icon";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { solutionMeta } from "@/data/solutions";
import { getLocalizedSolutions } from "@/lib/i18n-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FEATURED_SOLUTION_SLUGS = [
  "e-nfc",
  "crm",
  "ai-agents",
  "whatsapp-automation",
  "erp-restaurant",
  "archidoc",
  "website-builder",
  "business-intelligence",
] as const;

export function SolutionsTeaser({ className }: { className?: string }) {
  const t = useTranslations("sections.solutionsTeaser");
  const ts = useTranslations("solutions");
  const solutions = getLocalizedSolutions(ts).filter((s) =>
    FEATURED_SOLUTION_SLUGS.includes(s.slug as (typeof FEATURED_SOLUTION_SLUGS)[number])
  );

  return (
    <section id="solutions" className={cn("section-pad bg-surface-bright", className)}>
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
          {solutions.map((solution) => {
            const meta = solutionMeta.find((m) => m.slug === solution.slug);
            return (
              <motion.div key={solution.slug} variants={fadeUp}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg"
                >
                  <Image
                    src={`/illustrations/${getSolutionIllustration(solution.slug)}.webp`}
                    alt=""
                    width={112}
                    height={112}
                    loading="lazy"
                    sizes="112px"
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-5 -top-5 size-28 object-contain opacity-70 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon name={meta?.icon ?? "Sparkles"} className="size-6" />
                  </span>
                  <span className="text-sm font-semibold tracking-tight">{solution.title}</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/solutions">
              {t("cta")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function getSolutionIllustration(slug: string) {
  const illustrations: Record<string, string> = {
    "e-nfc": "e-nfc",
    crm: "crm",
    "ai-agents": "ai-agents",
    "erp-restaurant": "erp",
    archidoc: "archidoc",
    "website-builder": "website-development",
    "business-intelligence": "cloud",
    "whatsapp-automation": "chatbots",
  };

  return illustrations[slug] ?? "website-development";
}
