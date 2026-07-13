import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { buildPageOpenGraph } from "@/lib/i18n-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  const title = t("hub.metaTitle");
  const description = t("hub.metaDescription");
  return buildSeoMetadata({
    locale,
    path: "/portfolio",
    title,
    description,
    openGraph: buildPageOpenGraph(locale, "/portfolio", title, description),
  });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");
  const tIndustryPages = await getTranslations("industryPages");

  return (
    <>
      <PageHeader
        eyebrow={t("hub.eyebrow")}
        title={t.rich("hub.title", {
          highlight: (chunks) => <span className="text-gradient">{chunks}</span>,
        })}
        description={t("hub.description")}
      />
      <section className="section-pad pt-0">
        <div className="container-max">
          <Breadcrumb
            items={[
              { label: tIndustryPages("labels.home"), href: "/" },
              { label: t("hub.eyebrow") },
            ]}
          />
        </div>
      </section>
      <PortfolioGrid />
      <CtaSection />
    </>
  );
}
