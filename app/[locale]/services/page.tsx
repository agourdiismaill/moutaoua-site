import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LocalizedPageHeader, getPageMetadata } from "@/components/shared/localized-page-header";
import { ServicesByPillar } from "@/components/sections/services-by-pillar";
import { Stats } from "@/components/sections/stats";
import { CtaSection } from "@/components/sections/cta-section";
import { AIOverview } from "@/components/seo/ai-overview";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { SeoFaqSection } from "@/components/seo/faq-section";
import { getHomeOverview, getLocalizedFaqs } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata("services", locale);
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tServicePages = await getTranslations("servicePages");
  const tFaqSection = await getTranslations("sections.faq");
  const tFaqItems = await getTranslations("faq");
  const overviewLabels = {
    title: tServicePages("labels.aiOverview"),
    what: tServicePages("labels.what"),
    who: tServicePages("labels.who"),
    benefits: tServicePages("labels.benefits"),
    topics: tServicePages("labels.topics"),
    takeaways: tServicePages("labels.takeaways"),
    readingTime: tServicePages("labels.readingTime"),
  };

  return (
    <>
      <LocalizedPageHeader page="services" />
      <section className="section-pad pt-0">
        <div className="container-max space-y-8">
          <Breadcrumb
            items={[
              { label: tServicePages("labels.home"), href: "/" },
              { label: tServicePages("labels.breadcrumbServices") },
            ]}
          />
          <AIOverview
            content={getHomeOverview(tServicePages)}
            labels={overviewLabels}
          />
        </div>
      </section>
      <ServicesByPillar withFeatures heading={false} className="pt-0" />
      <Stats heading={false} className="bg-surface-bright" />
      <SeoFaqSection
        eyebrow="FAQ"
        title={tFaqSection("title")}
        description={tFaqSection("description")}
        faqs={getLocalizedFaqs(tFaqItems).slice(0, 6)}
        className="pt-0"
      />
      <CtaSection />
    </>
  );
}
