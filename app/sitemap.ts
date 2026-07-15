import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getCaseStudySlugs } from "@/data/case-studies";
import { SERVICE_SLUGS } from "@/data/meta";
import { SERVICE_CITY_COMBO_SLUGS } from "@/data/service-city-combos";
import {
  BLOG_POST_SLUGS,
  GUIDE_SLUGS,
  COMPARISON_SLUGS,
} from "@/data/blog";
import { INDUSTRY_SLUGS } from "@/data/industries";
import { SOLUTION_SLUGS } from "@/data/solutions";
import { AGENCY_HUB_SLUGS } from "@/data/agency-hubs";
import { PRICING_PAGE_SLUGS } from "@/data/pricing-pages";
import { hreflangByLocale, routing, type Locale } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const paths = [
    "",
    "/services",
    "/industries",
    "/portfolio",
    "/results",
    "/case-studies",
    "/videos",
    "/blog",
    "/pricing",
    "/contact",
    "/about",
    "/solutions",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
  ];

  const buildLanguages = (path: string) => ({
    "x-default": `${base}/fr${path}`,
    ...Object.fromEntries(
      routing.locales.map((l) => [
        hreflangByLocale[l as Locale],
        `${base}/${l}${path}`,
      ])
    ),
  });

  const basePathPriority = (path: string): number => {
    if (path === "") return 1.0;
    if (path === "/pricing" || path === "/services") return 0.9;
    if (path === "/industries" || path === "/solutions") return 0.7;
    if (path === "/blog" || path === "/case-studies") return 0.5;
    return 0.8;
  };

  const routes = routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: basePathPriority(path),
      alternates: {
        languages: buildLanguages(path),
      },
    }))
  );

  const caseStudyRoutes = routing.locales.flatMap((locale) =>
    getCaseStudySlugs().map((slug) => {
      const path = `/case-studies/${slug}`;
      return {
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.5,
        alternates: {
          languages: buildLanguages(path),
        },
      };
    })
  );

  const serviceRoutes = routing.locales.flatMap((locale) =>
    [...SERVICE_SLUGS, ...SERVICE_CITY_COMBO_SLUGS].map((slug) => {
      const path = `/services/${slug}`;
      return {
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: SERVICE_CITY_COMBO_SLUGS.includes(slug) ? 0.6 : 0.9,
        alternates: {
          languages: buildLanguages(path),
        },
      };
    })
  );

  const blogRoutes = routing.locales.flatMap((locale) =>
    BLOG_POST_SLUGS.map((slug) => {
      const path = `/blog/${slug}`;
      return {
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.5,
        alternates: { languages: buildLanguages(path) },
      };
    })
  );

  const guideRoutes = routing.locales.flatMap((locale) =>
    GUIDE_SLUGS.map((slug) => {
      const path = `/guides/${slug}`;
      return {
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: buildLanguages(path) },
      };
    })
  );

  const compareRoutes = routing.locales.flatMap((locale) =>
    COMPARISON_SLUGS.map((slug) => {
      const path = `/compare/${slug}`;
      return {
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: buildLanguages(path) },
      };
    })
  );

  const industryRoutes = routing.locales.flatMap((locale) =>
    INDUSTRY_SLUGS.map((slug) => {
      const path = `/industries/${slug}`;
      return {
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: buildLanguages(path) },
      };
    })
  );

  const solutionRoutes = routing.locales.flatMap((locale) =>
    SOLUTION_SLUGS.map((slug) => {
      const path = `/solutions/${slug}`;
      return {
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: buildLanguages(path) },
      };
    })
  );

  const agencyHubRoutes = routing.locales.flatMap((locale) =>
    AGENCY_HUB_SLUGS.map((slug) => {
      const path = `/agences/${slug}`;
      return {
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: buildLanguages(path) },
      };
    })
  );

  const pricingSeoRoutes = routing.locales.flatMap((locale) =>
    PRICING_PAGE_SLUGS.map((slug) => {
      const path = `/prix/${slug}`;
      return {
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: buildLanguages(path) },
      };
    })
  );

  return [
    ...routes,
    ...caseStudyRoutes,
    ...serviceRoutes,
    ...solutionRoutes,
    ...blogRoutes,
    ...guideRoutes,
    ...compareRoutes,
    ...industryRoutes,
    ...agencyHubRoutes,
    ...pricingSeoRoutes,
  ];
}
