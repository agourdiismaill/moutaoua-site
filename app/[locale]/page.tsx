import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { ClientLogos } from "@/components/sections/client-logos";
import { CapabilitiesGrid } from "@/components/sections/capabilities-grid";
import { ServicesSection } from "@/components/sections/services-section";
import { IndustriesTeaser } from "@/components/sections/industries-teaser";
import { OrganizationJsonLd, FaqPageJsonLd } from "@/components/shared/json-ld";
import { AIOverview } from "@/components/seo/ai-overview";
import { TrustSection } from "@/components/seo/trust-section";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getHomeOverview } from "@/lib/i18n-content";
import { buildPageOpenGraph } from "@/lib/i18n-metadata";

const ResultsSection = dynamic(() =>
  import("@/components/sections/results-section").then((m) => m.ResultsSection)
);
const VideoCarousel = dynamic(() =>
  import("@/components/sections/video-carousel").then((m) => m.VideoCarousel)
);
const PortfolioShowcase = dynamic(() =>
  import("@/components/sections/portfolio-showcase").then((m) => m.PortfolioShowcase)
);
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials)
);
const PricingSection = dynamic(() =>
  import("@/components/sections/pricing-section").then((m) => m.PricingSection)
);
const FaqSection = dynamic(() =>
  import("@/components/sections/faq-section").then((m) => m.FaqSection)
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");

  return buildSeoMetadata({
    locale,
    path: "",
    title,
    description,
    keywords: t.raw("keywords") as string[],
    openGraph: buildPageOpenGraph(locale, "", title, description),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tServicePages = await getTranslations("servicePages");

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
      <OrganizationJsonLd />
      <FaqPageJsonLd />
      <Hero />
      <section className="section-pad pt-0" aria-label={overviewLabels.title}>
        <div className="container-max">
          <AIOverview
            content={getHomeOverview(tServicePages)}
            labels={overviewLabels}
          />
        </div>
      </section>
      <Stats />
      <ClientLogos />
      <CapabilitiesGrid />
      <ServicesSection limit={6} />
      <IndustriesTeaser />
      <ResultsSection />
      <VideoCarousel />
      <PortfolioShowcase />
      <Testimonials />
      <PricingSection />
      <FaqSection />
      <TrustSection
        labels={{
          title: tServicePages("labels.trustTitle"),
          company: tServicePages("labels.trustCompany"),
          experience: tServicePages("labels.trustExperience"),
          methodology: tServicePages("labels.trustMethodology"),
          updated: tServicePages("labels.trustUpdated"),
          references: tServicePages("labels.trustReferences"),
        }}
        experience={tServicePages.raw("trust.experience") as string}
        methodology={tServicePages.raw("trust.methodology") as string}
        updatedAt={tServicePages.raw("trust.updatedAt") as string}
        references={tServicePages.raw("trust.references") as string[]}
      />
      <CtaSection />
    </>
  );
}
