import { getTranslations } from "next-intl/server";
import type { ContentLabelSources } from "@/lib/seo/content-labels";

export async function loadContentLabelSources(locale: string): Promise<ContentLabelSources> {
  const ti = await getTranslations("internalLinking");
  const ts = await getTranslations("services");
  const tb = await getTranslations("blog");
  const tg = await getTranslations("guides");
  const tc = await getTranslations("caseStudies");
  const tcomp = await getTranslations("compare");
  const tind = await getTranslations("industries");
  const tsol = await getTranslations("solutions");
  const tsc = await getTranslations("serviceCityPages");
  const tah = await getTranslations("agencyHubPages");
  const tseo = await getTranslations("seo");

  return {
    locale,
    services: (key, values) => ts(key, values),
    solutions: (key) => tsol(key),
    blog: (key) => tb(key),
    guides: (key) => tg(key),
    caseStudies: (key) => tc(key),
    compare: (key) => tcomp(key),
    industries: (key) => tind(key),
    internalLinking: (key) => ti(key),
    seo: (key) => tseo(key),
    serviceCity: (key, values) => tsc(key, values),
    agencyHub: (key, values) => tah(key, values),
    anchors: ti.raw("anchors") as Record<string, string[]>,
  };
}
