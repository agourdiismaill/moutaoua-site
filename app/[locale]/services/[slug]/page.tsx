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
import { TrustSection } from "@/components/seo/trust-section";
import { ServiceCityDetail } from "@/components/seo/service-city-detail";
import { InternalLinkingSections } from "@/components/seo/internal-linking/internal-linking-sections";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { buildServiceSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { buildContentBreadcrumb } from "@/lib/seo/breadcrumbs";
import { buildPageUrl } from "@/lib/i18n-metadata";
import { buildServiceCityPageContent } from "@/lib/service-city/content";
import {
  getLocalizedServicePage,
  getLocalizedServices,
  getLocalizedTestimonials,
  getServicePageSlugs,
} from "@/lib/i18n-content";
import { serviceMeta } from "@/data/services";
import {
  getServiceCityCombo,
  isServiceCitySlug,
  SERVICE_CITY_COMBO_SLUGS,
} from "@/data/service-city-combos";
import { INDUSTRY_SLUGS, industryServiceMap } from "@/data/industries";
import { CITY_SLUGS, TARGET_CITIES } from "@/data/city-sectors";
import { hreflangByLocale, routing, type Locale } from "@/i18n/routing";
import { SERVICE_SLUGS } from "@/data/meta";

/**
 * Cibles des liens contextuels in-body : industrie pertinente
 * (inversée depuis industryServiceMap) et ville en rotation,
 * pour répartir le maillage sur toutes les pages locales.
 */
function getContextualTargets(slug: string) {
  const serviceIdx = Math.max(
    0,
    SERVICE_SLUGS.indexOf(slug as (typeof SERVICE_SLUGS)[number])
  );
  const industry =
    INDUSTRY_SLUGS.find((ind) => industryServiceMap[ind]?.includes(slug)) ??
    INDUSTRY_SLUGS[serviceIdx % INDUSTRY_SLUGS.length];
  const city = TARGET_CITIES[serviceIdx % TARGET_CITIES.length];
  const citySlug = `${slug}-${CITY_SLUGS[city]}`;
  return {
    industry,
    city,
    citySlug: isServiceCitySlug(citySlug) ? citySlug : null,
  };
}

export function generateStaticParams() {
  const serviceParams = routing.locales.flatMap((locale) =>
    getServicePageSlugs().map((slug) => ({ locale, slug }))
  );
  const cityParams = routing.locales.flatMap((locale) =>
    SERVICE_CITY_COMBO_SLUGS.map((slug) => ({ locale, slug }))
  );
  return [...serviceParams, ...cityParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (isServiceCitySlug(slug)) {
    const combo = getServiceCityCombo(slug)!;
    const tServices = await getTranslations({ locale, namespace: "services" });
    const t = await getTranslations({ locale, namespace: "serviceCityPages" });
    const service = getLocalizedServices(tServices).find((s) => s.slug === combo.service);
    if (!service) return {};
    const content = buildServiceCityPageContent(t, combo, service);
    return buildSeoMetadata({
      locale,
      path: `/services/${slug}`,
      title: content.metaTitle,
      description: content.metaDescription,
    });
  }

  if (!SERVICE_SLUGS.includes(slug as (typeof SERVICE_SLUGS)[number])) {
    return {};
  }
  const tServices = await getTranslations({ locale, namespace: "services" });
  const t = await getTranslations({ locale, namespace: "servicePages" });
  const service = getLocalizedServices(tServices).find((s) => s.slug === slug);
  if (!service) return {};
  const page = getLocalizedServicePage(t, slug, service);
  return buildSeoMetadata({
    locale,
    path: `/services/${slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (isServiceCitySlug(slug)) {
    const combo = getServiceCityCombo(slug);
    if (!combo || !serviceMeta.some((s) => s.slug === combo.service)) notFound();

    const t = await getTranslations("serviceCityPages");
    const tPages = await getTranslations("servicePages");
    const ts = await getTranslations("services");
    const tt = await getTranslations("testimonials");
    const service = getLocalizedServices(ts).find((s) => s.slug === combo.service)!;
    const path = `/services/${slug}`;
    const pageUrl = buildPageUrl(locale, path);
    const content = buildServiceCityPageContent(t, combo, service);

    const breadcrumb = buildContentBreadcrumb("service", {
      home: t("labels.home"),
      services: t("labels.services"),
      blog: "",
      guides: "",
      caseStudies: "",
      compare: "",
      current: content.h1,
    });

    return (
      <ServiceCityDetail
        locale={locale}
        combo={combo}
        service={service}
        testimonials={getLocalizedTestimonials(tt)}
        breadcrumb={breadcrumb}
        pageUrl={pageUrl}
        t={t}
        tPages={tPages}
      >
        <Suspense fallback={null}>
          <InternalLinkingSections type="service-city" slug={slug} locale={locale} />
        </Suspense>
      </ServiceCityDetail>
    );
  }

  if (!serviceMeta.some((s) => s.slug === slug)) notFound();

  const t = await getTranslations("servicePages");
  const ts = await getTranslations("services");
  const tSeo = await getTranslations("seo");
  const ti = await getTranslations("internalLinking");
  const tIndustries = await getTranslations("industries");
  const service = getLocalizedServices(ts).find((s) => s.slug === slug)!;
  const contextTargets = getContextualTargets(slug);
  const page = getLocalizedServicePage(t, slug, service);
  const path = `/services/${slug}`;
  const pageUrl = buildPageUrl(locale, path);

  const breadcrumb = buildContentBreadcrumb("service", {
    home: t("labels.home"),
    services: t("labels.breadcrumbServices"),
    blog: "",
    guides: ti("breadcrumb.guides"),
    caseStudies: tSeo("links.caseStudies"),
    compare: ti("breadcrumb.compare"),
    current: service.title,
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
        data={[
          buildWebPageSchema({
            name: page.metaTitle,
            description: page.metaDescription,
            url: pageUrl,
            locale: hreflangByLocale[locale as Locale],
          }),
          buildServiceSchema({
            name: service.title,
            description: service.longDescription ?? service.description,
            url: pageUrl,
            features: service.features,
          }),
        ]}
      />

      <header className="section-pad pt-32 md:pt-40">
        <div className="container-max space-y-6">
          <Breadcrumb items={breadcrumb} />
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary">
                <Icon name={service.icon} className="size-7" />
              </span>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                {service.title}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {service.longDescription ?? service.description}
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
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">{t("labels.problem")}</h2>
            <p className="leading-relaxed text-muted-foreground">{page.problem}</p>
          </section>
          <section className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">{t("labels.solution")}</h2>
            <p className="leading-relaxed text-muted-foreground">{page.solution}</p>
          </section>
        </div>
      </section>

      <section className="section-pad pt-0" aria-label={t("context.title")}>
        <div className="container-max">
          <div className="rounded-3xl border border-border bg-surface-bright p-8">
            <p className="leading-relaxed text-muted-foreground">
              {t.rich("context.body", {
                service: service.title,
                industryName: tIndustries(`items.${contextTargets.industry}.title`),
                cityName: contextTargets.city,
                pricing: (chunks) => (
                  <Link href="/pricing" className="font-medium text-primary hover:underline">
                    {chunks}
                  </Link>
                ),
                industry: (chunks) => (
                  <Link
                    href={`/industries/${contextTargets.industry}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {chunks}
                  </Link>
                ),
                city: (chunks) =>
                  contextTargets.citySlug ? (
                    <Link
                      href={`/services/${contextTargets.citySlug}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {chunks}
                    </Link>
                  ) : (
                    <span>{chunks}</span>
                  ),
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t("labels.howItWorks")}</h2>
            <ol className="space-y-4">
              {page.howItWorks.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t("labels.industries")}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.industries.map((industry) => (
                <li
                  key={industry}
                  className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-soft"
                >
                  {industry}
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-3 border-t border-border pt-8">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <SeoFaqSection
        eyebrow="FAQ"
        title={`FAQ — ${service.title}`}
        description={service.description}
        faqs={page.faqs}
      />

      <Suspense fallback={null}>
        <InternalLinkingSections type="service" slug={slug} locale={locale} />
      </Suspense>

      <TrustSection
        labels={{
          title: t("labels.trustTitle"),
          company: t("labels.trustCompany"),
          experience: t("labels.trustExperience"),
          methodology: t("labels.trustMethodology"),
          updated: t("labels.trustUpdated"),
          references: t("labels.trustReferences"),
        }}
        experience={t.raw("trust.experience") as string}
        methodology={t.raw("trust.methodology") as string}
        updatedAt={t.raw("trust.updatedAt") as string}
        references={t.raw("trust.references") as string[]}
      />

      <CtaSection />
    </article>
  );
}
