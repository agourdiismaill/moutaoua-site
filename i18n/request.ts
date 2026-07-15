import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

const modules = [
  "sections",
  "pages",
  "shared",
  "services",
  "faq",
  "pricing",
  "stats",
  "results",
  "videos",
  "testimonials",
  "caseStudies",
  "showcase",
  "portfolio",
  "legal",
  "servicePages",
  "seo",
  "blog",
  "pageSeo",
  "guides",
  "compare",
  "internalLinking",
  "pillars",
  "industries",
  "industryPages",
  "solutions",
  "solutionPages",
  "serviceCityPages",
  "agencyHubPages",
  "pricingPages",
] as const;

async function loadMessages(locale: string) {
  const core = (await import(`../messages/${locale}.json`)).default;
  const loaded = await Promise.all(
    modules.map(async (name) => {
      const mod = await import(`../messages/${locale}/${name}.json`);
      return [name, mod.default] as const;
    })
  );
  return { ...core, ...Object.fromEntries(loaded) };
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
