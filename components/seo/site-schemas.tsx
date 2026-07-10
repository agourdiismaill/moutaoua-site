import { getTranslations } from "next-intl/server";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/data/site";
import { hreflangByLocale, type Locale } from "@/i18n/routing";

export async function SiteSchemas({ locale }: { locale: string }) {
  const t = await getTranslations("metadata");
  const ts = await getTranslations("shared");

  const orgInput = {
    name: siteConfig.name,
    description: t("description"),
    streetAddress: ts("streetAddress"),
    city: ts("city"),
  };

  const graph = [
    buildOrganizationSchema(orgInput),
    buildLocalBusinessSchema(orgInput),
    buildWebSiteSchema({
      name: siteConfig.name,
      description: t("description"),
      locale: hreflangByLocale[locale as Locale],
    }),
  ];

  return <JsonLdScript data={{ "@context": "https://schema.org", "@graph": graph }} />;
}
