import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LocalizedPageHeader, getPageMetadata } from "@/components/shared/localized-page-header";
import { ResultsSection } from "@/components/sections/results-section";
import { Stats } from "@/components/sections/stats";
import { CtaSection } from "@/components/sections/cta-section";
import { PageSeoShell } from "@/components/seo/page-seo-shell";
import { getPageOverview } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata("results", locale);
}

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tServicePages = await getTranslations("servicePages");
  const tPageSeo = await getTranslations("pageSeo");
  const tNav = await getTranslations("nav");

  return (
    <>
      <LocalizedPageHeader page="results" />
      <PageSeoShell
        breadcrumb={[
          { label: tServicePages("labels.home"), href: "/" },
          { label: tNav("results") },
        ]}
        overview={getPageOverview(tPageSeo, "results")}
        overviewLabels={{
          title: tServicePages("labels.aiOverview"),
          what: tServicePages("labels.what"),
          who: tServicePages("labels.who"),
          benefits: tServicePages("labels.benefits"),
          topics: tServicePages("labels.topics"),
          takeaways: tServicePages("labels.takeaways"),
          readingTime: tServicePages("labels.readingTime"),
        }}
      />
      <Stats heading={false} className="pt-0" />
      <ResultsSection className="pt-0" />
      <CtaSection />
    </>
  );
}
