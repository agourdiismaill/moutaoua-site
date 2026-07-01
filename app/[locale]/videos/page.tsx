import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LocalizedPageHeader, getPageMetadata } from "@/components/shared/localized-page-header";
import { VideoGrid } from "@/components/sections/video-grid";
import { CtaSection } from "@/components/sections/cta-section";

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

  return (
    <>
      <LocalizedPageHeader page="videos" />
      <section className="section-pad pt-0">
        <div className="container-max">
          <VideoGrid withFilter />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
