import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export function getOgImage(locale: string) {
  return {
    url: `/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: siteConfig.name,
  } as const;
}

export function withOgImage<T extends Metadata>(metadata: T, locale: string): T {
  const ogImage = getOgImage(locale);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: metadata.openGraph?.images ?? [ogImage],
    },
    twitter: {
      ...metadata.twitter,
      images: metadata.twitter?.images ?? [ogImage.url],
    },
  };
}
