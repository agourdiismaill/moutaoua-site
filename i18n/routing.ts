import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const hreflangByLocale: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
  ar: "ar-MA",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "fr",
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export function isRtlLocale(locale: string): boolean {
  return locale === "ar";
}
