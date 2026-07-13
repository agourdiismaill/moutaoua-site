import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { SolutionsGrid } from "@/components/sections/solutions-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { AIOverview } from "@/components/seo/ai-overview";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { getSolutionsHubOverview } from "@/lib/i18n-content";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { buildPageOpenGraph } from "@/lib/i18n-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });
  const title = t("hub.metaTitle");
  const description = t("hub.metaDescription");
  return buildSeoMetadata({
    locale,
    path: "/solutions",
    title,
    description,
    openGraph: buildPageOpenGraph(locale, "/solutions", title, description),
  });
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tSolutionPages = await getTranslations("solutionPages");
  const tSolutions = await getTranslations("solutions");
  const overviewLabels = {
    title: tSolutionPages("labels.aiOverview"),
    what: tSolutionPages("labels.what"),
    who: tSolutionPages("labels.who"),
    benefits: tSolutionPages("labels.benefits"),
    topics: tSolutionPages("labels.topics"),
    takeaways: tSolutionPages("labels.takeaways"),
    readingTime: tSolutionPages("labels.readingTime"),
  };

  return (
    <>
      <PageHeader
        eyebrow={tSolutions("hub.eyebrow")}
        title={tSolutions.rich("hub.title", {
          highlight: (chunks) => <span className="text-gradient">{chunks}</span>,
        })}
        description={tSolutions("hub.description")}
      />
      <section className="section-pad pt-0">
        <div className="container-max space-y-8">
          <Breadcrumb
            items={[
              { label: tSolutionPages("labels.home"), href: "/" },
              { label: tSolutionPages("labels.solutions") },
            ]}
          />
          <AIOverview
            content={getSolutionsHubOverview(tSolutions)}
            labels={overviewLabels}
          />
        </div>
      </section>
      <SolutionsGrid />
      <CtaSection />
    </>
  );
}
