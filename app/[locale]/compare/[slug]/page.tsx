import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { COMPARISON_SLUGS } from "@/data/blog";
import { getLocalizedComparison } from "@/lib/i18n-content";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { SeoFaqSection } from "@/components/seo/faq-section";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { InternalLinkingSections } from "@/components/seo/internal-linking/internal-linking-sections";
import { CtaSection } from "@/components/sections/cta-section";
import { buildWebPageSchema } from "@/lib/seo/schema";
import { buildContentBreadcrumb } from "@/lib/seo/breadcrumbs";
import { buildPageUrl } from "@/lib/i18n-metadata";
import { hreflangByLocale, routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    COMPARISON_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "compare" });
  const comparison = getLocalizedComparison(t, slug);
  if (!comparison) return {};
  return buildSeoMetadata({
    locale,
    path: `/compare/${slug}`,
    title: comparison.title,
    description: comparison.description,
  });
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("compare");
  const tServicePages = await getTranslations("servicePages");
  const ti = await getTranslations("internalLinking");
  const comparison = getLocalizedComparison(t, slug);
  if (!comparison) notFound();

  const pageUrl = buildPageUrl(locale, `/compare/${slug}`);
  const breadcrumb = buildContentBreadcrumb("comparison", {
    home: tServicePages("labels.home"),
    services: "",
    blog: "",
    guides: ti("breadcrumb.guides"),
    caseStudies: "",
    compare: ti("breadcrumb.compare"),
    current: comparison.title,
  });

  return (
    <article>
      <JsonLdScript
        data={buildWebPageSchema({
          name: comparison.title,
          description: comparison.description,
          url: pageUrl,
          locale: hreflangByLocale[locale as Locale],
        })}
      />

      <header className="section-pad pt-32 md:pt-40">
        <div className="container-max space-y-6">
          <Breadcrumb items={breadcrumb} />
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {comparison.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{comparison.description}</p>
        </div>
      </header>

      <section className="section-pad pt-0">
        <div className="container-max overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-bright">
                <th className="p-4 font-semibold">Critère</th>
                <th className="p-4 font-semibold">Meta Ads</th>
                <th className="p-4 font-semibold">Google Ads</th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.criteria} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium">{row.criteria}</td>
                  <td className="p-4 text-muted-foreground">{row.meta}</td>
                  <td className="p-4 text-muted-foreground">{row.google}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="container-max mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-foreground">
          <strong>Verdict :</strong> {comparison.verdict}
        </p>
      </section>

      <SeoFaqSection title="FAQ" faqs={comparison.faqs} />

      <Suspense fallback={null}>
        <InternalLinkingSections type="comparison" slug={slug} locale={locale} />
      </Suspense>

      <CtaSection />
    </article>
  );
}
