import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PricingSeoDetail } from "@/components/seo/pricing-seo-detail";
import { InternalLinkingSections } from "@/components/seo/internal-linking/internal-linking-sections";
import {
  getPricingPage,
  isPricingPageSlug,
  PRICING_PAGE_SLUGS,
} from "@/data/pricing-pages";
import { getLocalizedPricingPage } from "@/lib/i18n-content";
import { buildPageUrl } from "@/lib/i18n-metadata";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { routing } from "@/i18n/routing";

function formatPrice(locale: string, min: number, max: number): string {
  const intlLocale =
    locale === "ar" ? "ar-MA" : locale === "en" ? "en-US" : "fr-MA";
  const formatter = new Intl.NumberFormat(intlLocale);
  return `${formatter.format(min)} – ${formatter.format(max)} MAD`;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRICING_PAGE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isPricingPageSlug(slug)) return {};

  const t = await getTranslations({ locale, namespace: "pricingPages" });
  const page = getLocalizedPricingPage(t, slug);

  return buildSeoMetadata({
    locale,
    path: `/prix/${slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function PricingSeoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isPricingPageSlug(slug)) notFound();
  const structural = getPricingPage(slug);
  if (!structural) notFound();

  const t = await getTranslations("pricingPages");
  const content = getLocalizedPricingPage(t, slug);
  const pageUrl = buildPageUrl(locale, `/prix/${slug}`);

  const breadcrumb = [
    { label: t("labels.home"), href: "/" },
    { label: t("labels.pricing"), href: "/pricing" },
    { label: content.h1 },
  ];

  const labels = {
    aiOverview: t("labels.aiOverview"),
    what: t("labels.what"),
    who: t("labels.who"),
    benefits: t("labels.benefits"),
    topics: t("labels.topics"),
    takeaways: t("labels.takeaways"),
    readingTime: t("labels.readingTime"),
    indicativePrice: t("labels.indicativePrice"),
    perMonth: t("labels.perMonth"),
    perProject: t("labels.perProject"),
    mediaBudgetPerMonth: t("labels.mediaBudgetPerMonth"),
    included: t("labels.included"),
    faq: t("labels.faq"),
  };

  return (
    <>
      <PricingSeoDetail
        locale={locale}
        page={structural}
        content={content}
        labels={labels}
        breadcrumb={breadcrumb}
        pageUrl={pageUrl}
        formatPrice={(min, max) => formatPrice(locale, min, max)}
      />
      <Suspense fallback={null}>
        <InternalLinkingSections type="pricing-page" slug={slug} locale={locale} />
      </Suspense>
    </>
  );
}
