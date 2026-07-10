import { getTranslations } from "next-intl/server";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/data/site";
import { testimonialMeta } from "@/data/testimonials";
import { hreflangByLocale, type Locale } from "@/i18n/routing";

function getTestimonialAggregateRating() {
  const reviewCount = testimonialMeta.length;
  const ratingValue =
    testimonialMeta.reduce((sum, item) => sum + (item.rating ?? 5), 0) / reviewCount;
  return { ratingValue, reviewCount };
}

export async function SiteSchemas({ locale }: { locale: string }) {
  const t = await getTranslations("metadata");
  const ts = await getTranslations("shared");
  const aggregateRating = getTestimonialAggregateRating();

  const orgInput = {
    name: siteConfig.name,
    description: t("description"),
    streetAddress: ts("streetAddress"),
    city: ts("city"),
    aggregateRating,
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
