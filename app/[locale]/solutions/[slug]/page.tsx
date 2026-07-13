import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/sections/cta-section";
import { ContactForm } from "@/components/sections/contact-form";
import {
  SolutionGallery,
  buildSolutionGalleryImages,
} from "@/components/sections/solution-gallery";
import { AIOverview } from "@/components/seo/ai-overview";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { SeoFaqSection } from "@/components/seo/faq-section";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { ShareButtons } from "@/components/seo/share-buttons";
import { TrustSection } from "@/components/seo/trust-section";
import { InternalLinkingSections } from "@/components/seo/internal-linking/internal-linking-sections";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import {
  buildSoftwareApplicationSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { buildContentBreadcrumb } from "@/lib/seo/breadcrumbs";
import { buildPageUrl } from "@/lib/i18n-metadata";
import {
  getLocalizedSolutionPage,
  getLocalizedSolutions,
  getSolutionPageSlugs,
} from "@/lib/i18n-content";
import { getSolutionBySlug, SOLUTION_SLUGS } from "@/data/solutions";
import { hreflangByLocale, routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getSolutionPageSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SOLUTION_SLUGS.includes(slug as (typeof SOLUTION_SLUGS)[number])) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "solutionPages" });
  const page = getLocalizedSolutionPage(t, slug);
  return buildSeoMetadata({
    locale,
    path: `/solutions/${slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const structural = getSolutionBySlug(slug);
  if (!structural) notFound();

  const t = await getTranslations("solutionPages");
  const tsp = await getTranslations("servicePages");
  const ts = await getTranslations("solutions");
  const tSeo = await getTranslations("seo");
  const ti = await getTranslations("internalLinking");
  const solution = getLocalizedSolutions(ts).find((s) => s.slug === slug)!;
  const page = getLocalizedSolutionPage(t, slug);
  const path = `/solutions/${slug}`;
  const pageUrl = buildPageUrl(locale, path);

  const galleryImages = buildSolutionGalleryImages(
    structural.screenshots.map((shot, i) => ({
      src: shot.src,
      alt: page.screenshotAlts[i] ?? solution.title,
    }))
  );

  const breadcrumb = buildContentBreadcrumb("solution", {
    home: t("labels.home"),
    services: "",
    solutions: t("labels.solutions"),
    blog: "",
    guides: ti("breadcrumb.guides"),
    caseStudies: tSeo("links.caseStudies"),
    compare: ti("breadcrumb.compare"),
    current: solution.title,
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
          buildSoftwareApplicationSchema({
            name: solution.title,
            description: solution.description,
            url: pageUrl,
            features: page.features,
          }),
        ]}
      />

      <header className="section-pad pt-32 md:pt-40">
        <div className="container-max space-y-6">
          <Breadcrumb items={breadcrumb} />
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary">
                  <Icon name={structural.icon} className="size-7" />
                </span>
                <Badge variant="outline">{page.badge}</Badge>
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                {solution.title}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {solution.description}
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

      <section className="section-pad pt-0">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t("labels.features")}</h2>
            <ul className="space-y-3">
              {page.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground shadow-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t("labels.productBenefits")}</h2>
            <ul className="space-y-3">
              {page.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground shadow-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t("labels.targetAudience")}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.targetAudience.map((audience) => (
                <li
                  key={audience}
                  className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-soft"
                >
                  {audience}
                </li>
              ))}
            </ul>
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
          </section>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-max">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t("labels.howItWorks")}</h2>
          <ol className="grid gap-4 md:grid-cols-2">
            {page.howItWorks.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SolutionGallery title={t("labels.screenshots")} images={galleryImages} />

      <section className="section-pad pt-0">
        <div className="container-max">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">{t("labels.pricing")}</h2>
            <p className="mb-6 text-muted-foreground">{page.pricing.note}</p>
            <Button asChild>
              <Link href="/contact?type=software&devis=1">{page.pricing.cta}</Link>
            </Button>
          </div>
        </div>
      </section>

      <SeoFaqSection
        eyebrow="FAQ"
        title={`FAQ — ${solution.title}`}
        description={solution.description}
        faqs={page.faqs}
      />

      <Suspense fallback={null}>
        <InternalLinkingSections type="solution" slug={slug} locale={locale} />
      </Suspense>

      <TrustSection
        labels={{
          title: tsp("labels.trustTitle"),
          company: tsp("labels.trustCompany"),
          experience: tsp("labels.trustExperience"),
          methodology: tsp("labels.trustMethodology"),
          updated: tsp("labels.trustUpdated"),
          references: tsp("labels.trustReferences"),
        }}
        experience={t.raw("trust.experience") as string}
        methodology={t.raw("trust.methodology") as string}
        updatedAt={t.raw("trust.updatedAt") as string}
        references={t.raw("trust.references") as string[]}
      />

      <section className="section-pad pt-0">
        <div className="container-max space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">{t("labels.demoTitle")}</h2>
            <p className="text-muted-foreground">{t("labels.demoDescription")}</p>
          </div>
          <ContactForm defaultProjectType="software" />
        </div>
      </section>

      <CtaSection />
    </article>
  );
}
