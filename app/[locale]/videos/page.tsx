import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LocalizedPageHeader, getPageMetadata } from "@/components/shared/localized-page-header";
import { VideoGrid } from "@/components/sections/video-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { PageSeoShell } from "@/components/seo/page-seo-shell";
import { getPageOverview } from "@/lib/i18n-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata("videos", locale);
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tServicePages = await getTranslations("servicePages");
  const tPageSeo = await getTranslations("pageSeo");
  const tNav = await getTranslations("nav");

  return (
    <>
      <LocalizedPageHeader page="videos" />
      <PageSeoShell
        breadcrumb={[
          { label: tServicePages("labels.home"), href: "/" },
          { label: tNav("videos") },
        ]}
        overview={getPageOverview(tPageSeo, "videos")}
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
          <VideoGrid withFilter />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
