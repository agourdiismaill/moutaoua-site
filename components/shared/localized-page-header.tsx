import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { buildPageOpenGraph } from "@/lib/i18n-metadata";
import { buildSeoMetadata } from "@/lib/seo/metadata";

type PageKey =
  | "services"
  | "results"
  | "pricing"
  | "contact"
  | "videos"
  | "caseStudies";

const pagePaths: Record<PageKey, string> = {
  services: "/services",
  results: "/results",
  pricing: "/pricing",
  contact: "/contact",
  videos: "/videos",
  caseStudies: "/case-studies",
};

export async function LocalizedPageHeader({ page }: { page: PageKey }) {
  const t = await getTranslations(`pages.${page}`);

  return (
    <PageHeader
      eyebrow={t("eyebrow")}
      title={t.rich("title", {
        highlight: (chunks) => <span className="text-gradient">{chunks}</span>,
      })}
      description={t("description")}
    />
  );
}

export async function getPageMetadata(
  page: PageKey,
  locale: string
): Promise<Metadata> {
  const t = await getTranslations(`pages.${page}`);
  const path = pagePaths[page];
  const title = t("metaTitle");
  const description = t("metaDescription");

  return buildSeoMetadata({
    locale,
    path,
    title,
    description,
    openGraph: buildPageOpenGraph(locale, path, title, description),
  });
}
