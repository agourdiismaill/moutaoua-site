import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getCaseStudySlugs } from "@/data/case-studies";
import { SERVICE_SLUGS } from "@/data/meta";
import {
  BLOG_POST_SLUGS,
  GUIDE_SLUGS,
  COMPARISON_SLUGS,
} from "@/data/blog";
import { hreflangByLocale, routing, type Locale } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const paths = [
    "",
    "/services",
    "/results",
    "/case-studies",
    "/videos",
    "/blog",
    "/pricing",
    "/contact",
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

  const routes = routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
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
        priority: 0.7,
        alternates: {
          languages: buildLanguages(path),
        },
      };
    })
  );

  const serviceRoutes = routing.locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => {
      const path = `/services/${slug}`;
      return {
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.85,
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
        priority: 0.75,
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

  return [...routes, ...caseStudyRoutes, ...serviceRoutes, ...blogRoutes, ...guideRoutes, ...compareRoutes];
}
