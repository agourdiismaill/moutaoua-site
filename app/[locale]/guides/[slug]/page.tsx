import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { GUIDE_SLUGS } from "@/data/blog";
import { getLocalizedGuide } from "@/lib/i18n-content";
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
    GUIDE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "guides" });
  const guide = getLocalizedGuide(t, slug);
  if (!guide) return {};
  return buildSeoMetadata({
    locale,
    path: `/guides/${slug}`,
    title: guide.title,
    description: guide.description,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides");
  const tServicePages = await getTranslations("servicePages");
  const ti = await getTranslations("internalLinking");
  const guide = getLocalizedGuide(t, slug);
  if (!guide) notFound();

  const pageUrl = buildPageUrl(locale, `/guides/${slug}`);
  const breadcrumb = buildContentBreadcrumb("guide", {
    home: tServicePages("labels.home"),
    services: "",
    blog: t("eyebrow"),
    guides: ti("breadcrumb.guides"),
    caseStudies: "",
    compare: ti("breadcrumb.compare"),
    current: guide.title,
  });

  return (
    <article>
      <JsonLdScript
        data={buildWebPageSchema({
          name: guide.title,
          description: guide.description,
          url: pageUrl,
          locale: hreflangByLocale[locale as Locale],
        })}
      />

      <header className="section-pad pt-32 md:pt-40">
        <div className="container-max space-y-6">
          <Breadcrumb items={breadcrumb} />
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {guide.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{guide.description}</p>
        </div>
      </header>

      <section className="section-pad pt-0">
        <div className="container-max grid gap-10 lg:grid-cols-2">
          <section className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Étapes</h2>
            <ol className="space-y-4">
              {guide.steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </section>
          <section className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Erreurs courantes</h2>
            <ul className="space-y-3">
              {guide.mistakes.map((m) => (
                <li key={m} className="flex gap-2 text-muted-foreground">
                  <span className="text-destructive">✕</span>
                  {m}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="text-sm font-medium text-primary hover:underline">
                Demander un audit →
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-primary hover:underline">
                Voir les tarifs →
              </Link>
            </div>
          </section>
        </div>
      </section>

      <SeoFaqSection title="FAQ" faqs={guide.faqs} />

      <Suspense fallback={null}>
        <InternalLinkingSections type="guide" slug={slug} locale={locale} />
      </Suspense>

      <CtaSection />
    </article>
  );
}
