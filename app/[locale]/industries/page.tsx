import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { AIOverview } from "@/components/seo/ai-overview";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { getPageOverview } from "@/lib/i18n-content";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { buildPageOpenGraph } from "@/lib/i18n-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });
  const title = t("hub.metaTitle");
  const description = t("hub.metaDescription");
  return buildSeoMetadata({
    locale,
    path: "/industries",
    title,
    description,
    openGraph: buildPageOpenGraph(locale, "/industries", title, description),
  });
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tIndustryPages = await getTranslations("industryPages");
  const tIndustries = await getTranslations("industries");
  const overviewLabels = {
    title: tIndustryPages("labels.aiOverview"),
    what: tIndustryPages("labels.what"),
    who: tIndustryPages("labels.who"),
    benefits: tIndustryPages("labels.benefits"),
    topics: tIndustryPages("labels.topics"),
    takeaways: tIndustryPages("labels.takeaways"),
    readingTime: tIndustryPages("labels.readingTime"),
  };

  return (
    <>
      <PageHeader
        eyebrow={tIndustries("hub.eyebrow")}
        title={tIndustries.rich("hub.title", {
          highlight: (chunks) => <span className="text-gradient">{chunks}</span>,
        })}
        description={tIndustries("hub.description")}
      />
      <section className="section-pad pt-0">
        <div className="container-max space-y-8">
          <Breadcrumb
            items={[
              { label: tIndustryPages("labels.home"), href: "/" },
              { label: tIndustryPages("labels.industries") },
            ]}
          />
          <AIOverview
            content={getPageOverview(tIndustryPages, "hubOverview")}
            labels={overviewLabels}
          />
        </div>
      </section>
      <IndustriesGrid />
      <CtaSection />
    </>
  );
}
