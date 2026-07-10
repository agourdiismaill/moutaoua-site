import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LocalizedPageHeader, getPageMetadata } from "@/components/shared/localized-page-header";
import { CaseStudiesGrid } from "@/components/sections/case-studies-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { PageSeoShell } from "@/components/seo/page-seo-shell";
import { getLocalizedCaseStudies, getPageOverview } from "@/lib/i18n-content";

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
  const tServicePages = await getTranslations("servicePages");
  const tPageSeo = await getTranslations("pageSeo");
  const tNav = await getTranslations("nav");
  const studies = getLocalizedCaseStudies(t);

  return (
    <>
      <LocalizedPageHeader page="caseStudies" />
      <PageSeoShell
        breadcrumb={[
          { label: tServicePages("labels.home"), href: "/" },
          { label: tNav("caseStudies") },
        ]}
        overview={getPageOverview(tPageSeo, "caseStudies")}
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
      <section className="section-pad pt-0">
        <div className="container-max">
          <CaseStudiesGrid studies={studies} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
