import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { hreflangByLocale, routing, type Locale } from "@/i18n/routing";

/** Path without locale prefix, e.g. `/services` or `` for home */
function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildPageUrl(locale: string, path: string): string {
  const suffix = normalizePath(path);
  return `${siteConfig.url}/${locale}${suffix}`;
}

export function buildLocalizedAlternates(
  locale: string,
  path: string
): NonNullable<Metadata["alternates"]> {
  const suffix = normalizePath(path);
  const languages: Record<string, string> = {
    "x-default": `/fr${suffix}`,
  };

  for (const l of routing.locales) {
    languages[hreflangByLocale[l as Locale]] = `/${l}${suffix}`;
  }

  return {
    canonical: `/${locale}${suffix}`,
    languages,
  };
}

export function buildPageOpenGraph(
  locale: string,
  path: string,
  title: string,
  description: string,
  extra?: Partial<NonNullable<Metadata["openGraph"]>>
): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    url: buildPageUrl(locale, path),
    ...extra,
  };
}
