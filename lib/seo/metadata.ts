import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { buildLocalizedAlternates, buildPageOpenGraph } from "@/lib/i18n-metadata";
import { withOgImage } from "@/lib/metadata";

export type SeoMetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  category?: string;
  noIndex?: boolean;
  openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
};

export function buildSeoMetadata(input: SeoMetadataInput): Metadata {
  const {
    locale,
    path,
    title,
    description,
    keywords,
    category = "Business",
    noIndex = false,
    openGraph,
  } = input;

  return withOgImage(
    {
      title,
      description,
      keywords,
      category,
      metadataBase: new URL(siteConfig.url),
      authors: [{ name: siteConfig.name, url: siteConfig.url }],
      creator: siteConfig.name,
      publisher: siteConfig.name,
      alternates: buildLocalizedAlternates(locale, path),
      openGraph: buildPageOpenGraph(locale, path, title, description, openGraph),
      twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: `@${siteConfig.name.toLowerCase()}`,
      },
      robots: noIndex
        ? { index: false, follow: false }
        : {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              "max-image-preview": "large",
              "max-snippet": -1,
              "max-video-preview": -1,
            },
          },
      icons: {
        icon: "/icon.svg",
        apple: "/icon.svg",
      },
    },
    locale
  );
}
