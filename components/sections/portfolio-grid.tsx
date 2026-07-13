"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLocalizedPortfolioItems } from "@/lib/i18n-content";
import { cn } from "@/lib/utils";

export function PortfolioGrid({ className }: { className?: string }) {
  const tp = useTranslations("portfolio");
  const t = useTranslations("portfolio.hub");
  const ti = useTranslations("industries");
  const items = getLocalizedPortfolioItems(tp);
  const [industryFilter, setIndustryFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("all");

  const industries = useMemo(
    () => [...new Set(items.map((i) => i.industry))],
    [items]
  );
  const services = useMemo(
    () => [...new Set(items.flatMap((i) => i.services))],
    [items]
  );
  const technologies = useMemo(
    () => [...new Set(items.flatMap((i) => i.technologies))],
    [items]
  );

  const filtered = items.filter((item) => {
    if (industryFilter !== "all" && item.industry !== industryFilter) return false;
    if (serviceFilter !== "all" && !item.services.includes(serviceFilter)) return false;
    if (techFilter !== "all" && !item.technologies.includes(techFilter)) return false;
    return true;
  });

  return (
    <section className={cn("section-pad pt-0", className)}>
      <div className="container-max space-y-10">
        <div className="flex flex-col gap-6">
          <FilterRow
            label={t("filterIndustry")}
            allLabel={t("filterAll")}
            value={industryFilter}
            options={industries}
            onChange={setIndustryFilter}
            getLabel={(slug) => {
              try {
                return ti(`items.${slug}.title`);
              } catch {
                return slug;
              }
            }}
          />
          <FilterRow
            label={t("filterService")}
            allLabel={t("filterAll")}
            value={serviceFilter}
            options={services}
            onChange={setServiceFilter}
          />
          <FilterRow
            label={t("filterTech")}
            allLabel={t("filterAll")}
            value={techFilter}
            options={technologies}
            onChange={setTechFilter}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.slug}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.cover}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-surface-container px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {item.caseStudySlug && (
                  <Button asChild variant="outline" size="sm" className="mt-2">
                    <Link href={`/case-studies/${item.caseStudySlug}`}>
                      {t("viewCaseStudy")}
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterRow({
  label,
  allLabel,
  value,
  options,
  onChange,
  getLabel,
}: {
  label: string;
  allLabel: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  getLabel?: (slug: string) => string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <Tabs value={value} onValueChange={onChange}>
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          <TabsTrigger
            value="all"
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/10"
          >
            {allLabel}
          </TabsTrigger>
          {options.map((opt) => (
            <TabsTrigger
              key={opt}
              value={opt}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/10"
            >
              {getLabel ? getLabel(opt) : opt}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
