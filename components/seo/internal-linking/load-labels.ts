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
  const tseo = await getTranslations("seo");

  return {
    locale,
    services: (key) => ts(key),
    solutions: (key) => tsol(key),
    blog: (key) => tb(key),
    guides: (key) => tg(key),
    caseStudies: (key) => tc(key),
    compare: (key) => tcomp(key),
    industries: (key) => tind(key),
    internalLinking: (key) => ti(key),
    seo: (key) => tseo(key),
    anchors: ti.raw("anchors") as Record<string, string[]>,
  };
}
