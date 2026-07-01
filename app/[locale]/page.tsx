import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { ClientLogos } from "@/components/sections/client-logos";
import { ServicesSection } from "@/components/sections/services-section";
import { OrganizationJsonLd, FaqPageJsonLd } from "@/components/shared/json-ld";
import { buildLocalizedAlternates, buildPageOpenGraph } from "@/lib/i18n-metadata";
import { withOgImage } from "@/lib/metadata";

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

  return withOgImage({
    alternates: buildLocalizedAlternates(locale, ""),
    openGraph: buildPageOpenGraph(locale, "", title, description),
  }, locale);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <OrganizationJsonLd />
      <FaqPageJsonLd />
      <Hero />
      <Stats />
      <ClientLogos />
      <ServicesSection />
      <ResultsSection />
      <VideoCarousel />
      <PortfolioShowcase />
      <Testimonials />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
