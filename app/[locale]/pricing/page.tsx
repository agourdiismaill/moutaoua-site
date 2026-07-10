import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LocalizedPageHeader, getPageMetadata } from "@/components/shared/localized-page-header";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { PageSeoShell } from "@/components/seo/page-seo-shell";
import { getPageOverview } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata("pricing", locale);
}

async function getSeoProps(locale: string) {
  const tServicePages = await getTranslations({ locale, namespace: "servicePages" });
  const tPageSeo = await getTranslations({ locale, namespace: "pageSeo" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return {
    breadcrumb: [
      { label: tServicePages("labels.home"), href: "/" },
      { label: tNav("pricing") },
    ],
    overview: getPageOverview(tPageSeo, "pricing"),
    overviewLabels: {
      title: tServicePages("labels.aiOverview"),
      what: tServicePages("labels.what"),
      who: tServicePages("labels.who"),
      benefits: tServicePages("labels.benefits"),
      topics: tServicePages("labels.topics"),
      takeaways: tServicePages("labels.takeaways"),
      readingTime: tServicePages("labels.readingTime"),
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const seo = await getSeoProps(locale);

  return (
    <>
      <LocalizedPageHeader page="pricing" />
      <PageSeoShell {...seo} />
      <PricingSection heading={false} className="pt-0" />
      <FaqSection />
      <CtaSection />
    </>
  );
}
