import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { getLocalizedFaqs } from "@/lib/i18n-content";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  buildFaqSchema,
  buildLocalBusinessSchema,
} from "@/lib/seo/schema";
import { testimonialMeta } from "@/data/testimonials";

export async function LocalBusinessJsonLd() {
  const t = await getTranslations("metadata");
  const ts = await getTranslations("shared");
  const reviewCount = testimonialMeta.length;
  const ratingValue =
    testimonialMeta.reduce((sum, item) => sum + (item.rating ?? 5), 0) / reviewCount;

  return (
    <JsonLdScript
      data={buildLocalBusinessSchema({
        name: siteConfig.name,
        description: t("description"),
        streetAddress: ts("streetAddress"),
        city: ts("city"),
        aggregateRating: { ratingValue, reviewCount },
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
