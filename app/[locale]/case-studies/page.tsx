import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LocalizedPageHeader, getPageMetadata } from "@/components/shared/localized-page-header";
import { CaseStudiesGrid } from "@/components/sections/case-studies-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { getLocalizedCaseStudies } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata("caseStudies", locale);
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("caseStudies");
  const studies = getLocalizedCaseStudies(t);

  return (
    <>
      <LocalizedPageHeader page="caseStudies" />
      <section className="section-pad pt-0">
        <div className="container-max">
          <CaseStudiesGrid studies={studies} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
