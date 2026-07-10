import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { getLocalizedFaqs } from "@/lib/i18n-content";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  buildFaqSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schema";

export async function OrganizationJsonLd() {
  const t = await getTranslations("metadata");
  const ts = await getTranslations("shared");

  return (
    <JsonLdScript
      data={buildOrganizationSchema({
        name: siteConfig.name,
        description: t("description"),
        streetAddress: ts("streetAddress"),
        city: ts("city"),
      })}
    />
  );
}

export async function FaqPageJsonLd() {
  const t = await getTranslations("faq");
  const faqs = getLocalizedFaqs(t);

  return <JsonLdScript data={buildFaqSchema(faqs)} />;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <JsonLdScript data={data} />;
}
