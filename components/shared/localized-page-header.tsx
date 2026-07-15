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
  | "caseStudies"
  | "industries"
  | "portfolio"
  | "about";

const pagePaths: Record<PageKey, string> = {
  services: "/services",
  results: "/results",
  pricing: "/pricing",
  contact: "/contact",
  videos: "/videos",
  caseStudies: "/case-studies",
  industries: "/industries",
  portfolio: "/portfolio",
  about: "/about",
};

type PageOverrides = {
  metaTitle?: string;
  metaDescription?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export async function LocalizedPageHeader({
  page,
  overrides,
  visual,
}: {
  page: PageKey;
  overrides?: PageOverrides;
  visual?: React.ReactNode;
}) {
  const t = await getTranslations(`pages.${page}`);

  return (
    <PageHeader
      eyebrow={overrides?.eyebrow ?? t("eyebrow")}
      title={(overrides?.title ? overrides.title : t("title")).includes("<highlight>")
        ? t.rich("title", {
            highlight: (chunks) => <span className="text-gradient">{chunks}</span>,
          })
        : overrides?.title ?? t.rich("title", {
            highlight: (chunks) => <span className="text-gradient">{chunks}</span>,
          })}
      description={overrides?.description ?? t("description")}
      visual={visual}
    />
  );
}

export async function getPageMetadata(
  page: PageKey,
  locale: string,
  overrides?: Pick<PageOverrides, "metaTitle" | "metaDescription">
): Promise<Metadata> {
  const t = await getTranslations(`pages.${page}`);
  const path = pagePaths[page];
  const title = overrides?.metaTitle ?? t("metaTitle");
  const description = overrides?.metaDescription ?? t("metaDescription");

  return buildSeoMetadata({
    locale,
    path,
    title,
    description,
    openGraph: buildPageOpenGraph(locale, path, title, description),
  });
}
