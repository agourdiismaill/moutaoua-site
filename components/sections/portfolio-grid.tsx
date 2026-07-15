"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, ChevronsUpDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocalizedPortfolioItems } from "@/lib/i18n-content";
import { cn } from "@/lib/utils";

/** Convert kebab-case / snake_case slugs into readable labels. */
function humanizeSlug(value: string) {
  if (!/[-_]/.test(value) && /[A-Z]/.test(value)) return value;
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function PortfolioGrid({ className }: { className?: string }) {
  const tp = useTranslations("portfolio");
  const t = useTranslations("portfolio.hub");
  const ti = useTranslations("industries");
  const ts = useTranslations("services");
  const items = getLocalizedPortfolioItems(tp);

  const [query, setQuery] = useState("");
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

  const industryLabel = (slug: string) => {
    const key = `items.${slug}.title`;
    return ti.has(key) ? ti(key) : humanizeSlug(slug);
  };
  const serviceLabel = (slug: string) => {
    const key = `items.${slug}.title`;
    return ts.has(key) ? ts(key) : humanizeSlug(slug);
  };
  const techLabel = (value: string) =>
    /[-_]/.test(value) ? humanizeSlug(value) : value;

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    if (industryFilter !== "all" && item.industry !== industryFilter) return false;
    if (serviceFilter !== "all" && !item.services.includes(serviceFilter)) return false;
    if (techFilter !== "all" && !item.technologies.includes(techFilter)) return false;
    if (normalizedQuery) {
      const haystack = [
        item.title,
        item.alt,
        ...item.services,
        ...item.technologies,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(normalizedQuery)) return false;
    }
    return true;
  });

  const hasActiveFilters =
    industryFilter !== "all" ||
    serviceFilter !== "all" ||
    techFilter !== "all" ||
    normalizedQuery !== "";

  const clearAll = () => {
    setQuery("");
    setIndustryFilter("all");
    setServiceFilter("all");
    setTechFilter("all");
  };

  return (
    <section className={cn("section-pad pt-0", className)}>
      <div className="container-max space-y-6">
        {/* Search bar */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-base text-foreground shadow-soft transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15"
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Industry pills */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterPill
              active={industryFilter === "all"}
              onClick={() => setIndustryFilter("all")}
            >
              {t("filterAll")}
            </FilterPill>
            {industries.map((slug) => (
              <FilterPill
                key={slug}
                active={industryFilter === slug}
                onClick={() => setIndustryFilter(slug)}
              >
                {industryLabel(slug)}
              </FilterPill>
            ))}
          </div>

          {/* Service + Tech dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterSelect
              label={t("filterService")}
              value={serviceFilter}
              anyLabel={t("filterAny")}
              options={services}
              getLabel={serviceLabel}
              onChange={setServiceFilter}
            />
            <FilterSelect
              label={t("filterTech")}
              value={techFilter}
              anyLabel={t("filterAny")}
              options={technologies}
              getLabel={techLabel}
              onChange={setTechFilter}
            />
          </div>
        </div>

        {/* Active filters summary */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface-bright px-4 py-3 text-sm">
            <span className="text-muted-foreground">
              {t("showingProjects", { count: filtered.length })}
            </span>
            <span className="text-border">|</span>
            {industryFilter !== "all" && (
              <ActiveChip onRemove={() => setIndustryFilter("all")}>
                {industryLabel(industryFilter)}
              </ActiveChip>
            )}
            {serviceFilter !== "all" && (
              <ActiveChip onRemove={() => setServiceFilter("all")}>
                {serviceLabel(serviceFilter)}
              </ActiveChip>
            )}
            {techFilter !== "all" && (
              <ActiveChip onRemove={() => setTechFilter("all")}>
                {techLabel(techFilter)}
              </ActiveChip>
            )}
            {normalizedQuery && (
              <ActiveChip onRemove={() => setQuery("")}>“{query.trim()}”</ActiveChip>
            )}
            <button
              type="button"
              onClick={clearAll}
              className="ml-auto font-medium text-primary transition-colors hover:text-primary/80"
            >
              {t("clearAll")}
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2 lg:grid-cols-3">
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
                    loading="lazy"
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
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-surface-bright px-6 py-16 text-center text-muted-foreground">
            {t("noResults")}
          </p>
        )}
      </div>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function FilterSelect({
  label,
  value,
  anyLabel,
  options,
  getLabel,
  onChange,
}: {
  label: string;
  value: string;
  anyLabel: string;
  options: string[];
  getLabel: (slug: string) => string;
  onChange: (v: string) => void;
}) {
  return (
    <label
      className={cn(
        "relative flex items-center gap-2 rounded-full border bg-card py-1.5 pl-4 pr-3 text-xs transition-colors",
        value !== "all"
          ? "border-primary/50 text-foreground"
          : "border-border text-muted-foreground"
      )}
    >
      <span className="font-medium">{label}:</span>
      <span className="max-w-[10rem] truncate font-semibold text-foreground">
        {value === "all" ? anyLabel : getLabel(value)}
      </span>
      <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label={label}
      >
        <option value="all">{anyLabel}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {getLabel(opt)}
          </option>
        ))}
      </select>
    </label>
  );
}

function ActiveChip({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
      {children}
      <button
        type="button"
        onClick={onRemove}
        className="text-muted-foreground transition-colors hover:text-primary"
        aria-label="remove filter"
      >
        <X className="size-3" />
      </button>
    </span>
  );
}
