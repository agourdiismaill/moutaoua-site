import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { getLocalizedFaqs } from "@/lib/i18n-content";

export async function OrganizationJsonLd() {
  const t = await getTranslations("metadata");
  const ts = await getTranslations("shared");

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: t("description"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: ts("streetAddress"),
      addressLocality: ts("city"),
      postalCode: siteConfig.postalCode,
      addressCountry: "MA",
    },
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function FaqPageJsonLd() {
  const t = await getTranslations("faq");
  const faqs = getLocalizedFaqs(t);

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
