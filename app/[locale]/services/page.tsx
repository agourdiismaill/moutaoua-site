import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LocalizedPageHeader, getPageMetadata } from "@/components/shared/localized-page-header";
import { ServicesSection } from "@/components/sections/services-section";
import { Stats } from "@/components/sections/stats";
import { CtaSection } from "@/components/sections/cta-section";

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

  return (
    <>
      <LocalizedPageHeader page="services" />
      <ServicesSection withFeatures heading={false} className="pt-0" />
      <Stats heading={false} className="bg-surface-bright" />
      <CtaSection />
    </>
  );
}
