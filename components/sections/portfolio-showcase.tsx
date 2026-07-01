"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { Gallery } from "@/components/shared/lightbox";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { getLocalizedPortfolioImages } from "@/lib/i18n-content";
import { cn } from "@/lib/utils";

export function PortfolioShowcase({ className }: { className?: string }) {
  const t = useTranslations("sections.portfolio");
  const tp = useTranslations("portfolio");
  const images = getLocalizedPortfolioImages(tp);

  return (
    <section id="portfolio" className={cn("section-pad", className)}>
      <div className="container-max">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="mb-16"
        />

        <Gallery images={images} columns={4} aspect="portrait" />

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/case-studies/millennia-group-prive">
              {t("cta")}
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
