import { siteConfig } from "@/data/site";
import type { FaqItem } from "@/data/types";
import type { BreadcrumbItem as Crumb } from "./types";

type SchemaRecord = Record<string, unknown>;

export function schemaScript(data: SchemaRecord | SchemaRecord[]) {
  return JSON.stringify(data);
}

export function buildOrganizationSchema(input: {
  name: string;
  description: string;
  streetAddress: string;
  city: string;
  aggregateRating?: { ratingValue: number; reviewCount: number };
}): SchemaRecord {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: input.name,
    url: siteConfig.url,
    description: input.description,
    email: siteConfig.email,
    telephone: [siteConfig.phone, siteConfig.phone2],
    address: {
      "@type": "PostalAddress",
      streetAddress: input.streetAddress,
      addressLocality: input.city,
      postalCode: siteConfig.postalCode,
      addressCountry: "MA",
    },
    sameAs: Object.values(siteConfig.social),
    logo: `${siteConfig.url}/logo-full.svg`,
    ...(input.aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: input.aggregateRating.ratingValue,
            reviewCount: input.aggregateRating.reviewCount,
            bestRating: 5,
          },
        }
      : {}),
  };
}

export function buildLocalBusinessSchema(input: {
  name: string;
  description: string;
  streetAddress: string;
  city: string;
  aggregateRating?: { ratingValue: number; reviewCount: number };
}): SchemaRecord {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: input.name,
    description: input.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    image: `${siteConfig.url}/logo-full.svg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: input.streetAddress,
      addressLocality: input.city,
      postalCode: siteConfig.postalCode,
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.5475,
      longitude: -7.645,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.email,
      telephone: siteConfig.phone,
      availableLanguage: ["French", "Arabic", "English"],
    },
    sameAs: Object.values(siteConfig.social),
    ...(input.aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: input.aggregateRating.ratingValue,
            reviewCount: input.aggregateRating.reviewCount,
            bestRating: 5,
          },
        }
      : {}),
  };
}

export function buildWebSiteSchema(input: {
  name: string;
  description: string;
  locale: string;
}): SchemaRecord {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: input.name,
    url: siteConfig.url,
    description: input.description,
    inLanguage: input.locale,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/${input.locale.split("-")[0]}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildWebPageSchema(input: {
  name: string;
  description: string;
  url: string;
  locale: string;
  dateModified?: string;
}): SchemaRecord {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.locale,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    dateModified: input.dateModified,
  };
}

export function buildBreadcrumbSchema(
  items: Crumb[],
  baseUrl: string
): SchemaRecord {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };
}

export function buildFaqSchema(faqs: Pick<FaqItem, "question" | "answer">[]): SchemaRecord {
  return {
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
}

export function buildServiceSchema(input: {
  name: string;
  description: string;
  url: string;
  features: string[];
}): SchemaRecord {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
    serviceType: input.name,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/fr/pricing`,
      availability: "https://schema.org/InStock",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: input.name,
      itemListElement: input.features.map((feature) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature,
        },
      })),
    },
  };
}

export function buildArticleSchema(input: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  locale: string;
  authorName: string;
}): SchemaRecord {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    image: input.image,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: input.locale,
    author: { "@type": "Organization", name: input.authorName },
    publisher: {
      "@type": "Organization",
      name: input.authorName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo-full.svg`,
      },
    },
  };
}

export function buildBlogPostingSchema(input: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  locale: string;
  authorName: string;
}): SchemaRecord {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    image: input.image,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: input.locale,
    author: { "@type": "Person", name: input.authorName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo-full.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
  };
}

export function buildAggregateRatingSchema(input: {
  ratingValue: number;
  reviewCount: number;
  itemName: string;
}): SchemaRecord {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: input.ratingValue,
    reviewCount: input.reviewCount,
    bestRating: 5,
    itemReviewed: {
      "@type": "Organization",
      name: input.itemName,
    },
  };
}
