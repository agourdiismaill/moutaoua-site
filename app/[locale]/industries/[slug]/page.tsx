import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Icon } from "@/components/shared/icon";
import { CtaSection } from "@/components/sections/cta-section";
import { AIOverview } from "@/components/seo/ai-overview";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { SeoFaqSection } from "@/components/seo/faq-section";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { ShareButtons } from "@/components/seo/share-buttons";
import { InternalLinkingSections } from "@/components/seo/internal-linking/internal-linking-sections";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { buildWebPageSchema } from "@/lib/seo/schema";
import { buildContentBreadcrumb } from "@/lib/seo/breadcrumbs";
import { buildPageUrl } from "@/lib/i18n-metadata";
import { getLocalizedIndustryPage, getLocalizedIndustries } from "@/lib/i18n-content";
import { INDUSTRY_SLUGS } from "@/data/industries";
import { industryServiceMap, industryCaseStudyMap } from "@/data/industries";
import { CASE_STUDY_SLUGS } from "@/data/meta";
import { getLocalizedCaseStudy } from "@/lib/i18n-content";
import { hreflangByLocale, routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    INDUSTRY_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "industryPages" });
  if (!INDUSTRY_SLUGS.includes(slug as (typeof INDUSTRY_SLUGS)[number])) {
    return {};
  }
  const page = getLocalizedIndustryPage(t, slug);
  return buildSeoMetadata({
    locale,
    path: `/industries/${slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!INDUSTRY_SLUGS.includes(slug as (typeof INDUSTRY_SLUGS)[number])) notFound();

  const t = await getTranslations("industryPages");
  const ti = await getTranslations("industries");
  const ts = await getTranslations("services");
  const tCase = await getTranslations("caseStudies");
  const industries = getLocalizedIndustries(ti);
  const industry = industries.find((i) => i.slug === slug)!;
  const page = getLocalizedIndustryPage(t, slug);
  const path = `/industries/${slug}`;
  const pageUrl = buildPageUrl(locale, path);
  const recommendedSlugs = industryServiceMap[slug as (typeof INDUSTRY_SLUGS)[number]] ?? [
    "meta-ads",
    "corporate-websites",
    "brand-identity",
  ];
  const recommendedServices = recommendedSlugs
    .map((s) => {
      try {
        return { slug: s, title: ts(`items.${s}.title`) };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as { slug: string; title: string }[];

  const caseStudySlugs = (industryCaseStudyMap[slug as (typeof INDUSTRY_SLUGS)[number]] ?? []).filter(
    (s) => CASE_STUDY_SLUGS.includes(s as (typeof CASE_STUDY_SLUGS)[number])
  );
  const relatedCaseStudies = caseStudySlugs
    .map((s) => getLocalizedCaseStudy(tCase, s))
    .filter(Boolean);

  const breadcrumb = buildContentBreadcrumb("industry", {
    home: t("labels.home"),
    services: "",
    blog: "",
    guides: "",
    caseStudies: "",
    compare: "",
    industries: t("labels.industries"),
    current: industry.title,
  });

  const labels = {
    title: t("labels.aiOverview"),
    what: t("labels.what"),
    who: t("labels.who"),
    benefits: t("labels.benefits"),
    topics: t("labels.topics"),
    takeaways: t("labels.takeaways"),
    readingTime: t("labels.readingTime"),
  };

  return (
    <article>
      <JsonLdScript
        data={buildWebPageSchema({
          name: page.metaTitle,
          description: page.metaDescription,
          url: pageUrl,
          locale: hreflangByLocale[locale as Locale],
        })}
      />

      <header className="section-pad pt-32 md:pt-40">
        <div className="container-max space-y-6">
          <Breadcrumb items={breadcrumb} />
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary">
                <Icon name={industry.icon} className="size-7" />
              </span>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                {industry.title}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {industry.description}
              </p>
            </div>
            <ShareButtons url={pageUrl} title={page.metaTitle} label={t("labels.share")} />
          </div>
        </div>
      </header>

      <section className="section-pad pt-0" aria-label={labels.title}>
        <div className="container-max">
          <AIOverview content={page.overview} labels={labels} />
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">{t("labels.challenges")}</h2>
            <ul className="space-y-3">
              {page.challenges.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">{t("labels.solutions")}</h2>
            <ul className="space-y-3">
              {page.solutions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-max">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            {t("labels.recommendedServices")}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium shadow-soft transition-colors hover:border-primary/30 hover:text-primary"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {relatedCaseStudies.length > 0 && (
        <section className="section-pad pt-0">
          <div className="container-max">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">
              {t("labels.caseStudies")}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {relatedCaseStudies.map((study) => (
                <li key={study!.slug}>
                  <Link
                    href={`/case-studies/${study!.slug}`}
                    className="block rounded-2xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-primary/30"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                      {study!.industry}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight">{study!.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {study!.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <SeoFaqSection
        eyebrow="FAQ"
        title={`FAQ — ${industry.title}`}
        description={industry.description}
        faqs={page.faqs}
      />

      <Suspense fallback={null}>
        <InternalLinkingSections type="industry" slug={slug} locale={locale} />
      </Suspense>

      <CtaSection />
    </article>
  );
}
