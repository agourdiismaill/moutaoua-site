import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LocalizedPageHeader, getPageMetadata } from "@/components/shared/localized-page-header";
import { ResultsSection } from "@/components/sections/results-section";
import { Stats } from "@/components/sections/stats";
import { CtaSection } from "@/components/sections/cta-section";

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

  return (
    <>
      <LocalizedPageHeader page="results" />
      <Stats heading={false} className="pt-0" />
      <ResultsSection className="pt-0" />
      <CtaSection />
    </>
  );
}
