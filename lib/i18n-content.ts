import type { useTranslations } from "next-intl";
import type {
  AdResult,
  CaseStudy,
  FaqItem,
  PricingTier,
  Service,
  Stat,
  Testimonial,
  VideoItem,
} from "@/data/types";
import {
  CASE_STUDY_SLUGS,
  FAQ_IDS,
  SERVICE_SLUGS,
  type ServiceSlug,
} from "@/data/meta";
import {
  BLOG_POST_SLUGS,
  BLOG_PUBLISHED,
  GUIDE_SLUGS,
  COMPARISON_SLUGS,
  type BlogPostSlug,
} from "@/data/blog";
import type { AIOverviewContent } from "@/lib/seo/types";
import { estimateReadingTimeFromParts } from "@/lib/seo/reading-time";
import { serviceMeta } from "@/data/services";
import { pricingMeta } from "@/data/pricing";
import { statMeta } from "@/data/site";
import { resultMeta } from "@/data/results";
import { videoMeta } from "@/data/videos";
import { testimonialMeta } from "@/data/testimonials";
import { reelMeta } from "@/data/showcase-videos";
import { millenniaCreativeMeta } from "@/data/portfolio";
import type { LightboxImage } from "@/components/shared/lightbox";
import type { ReelVideo } from "@/data/showcase-videos";

type TFunction = ReturnType<typeof useTranslations>;

export function getLocalizedServices(t: TFunction): Service[] {
  return serviceMeta.map((meta) => ({
    ...meta,
    title: t(`items.${meta.slug}.title`),
    description: t(`items.${meta.slug}.description`),
    longDescription: t(`items.${meta.slug}.longDescription`),
    features: t.raw(`items.${meta.slug}.features`) as string[],
  }));
}

export function getLocalizedFaqs(t: TFunction): FaqItem[] {
  return FAQ_IDS.map((id) => ({
    id,
    question: t(`items.${id}.question`),
    answer: t(`items.${id}.answer`),
    category: t(`items.${id}.category`),
  }));
}

export function getLocalizedPricingTiers(t: TFunction): PricingTier[] {
  return pricingMeta.map((meta) => {
    const tier: PricingTier = {
      ...meta,
      name: t(`items.${meta.id}.name`),
      packLabel: t(`items.${meta.id}.packLabel`),
      description: t(`items.${meta.id}.description`),
      period: t(`items.${meta.id}.period`),
      cta: t(`items.${meta.id}.cta`),
      features: t.raw(`items.${meta.id}.features`) as string[],
    };
    if (meta.badgeKey) tier.badge = t(`items.${meta.id}.badge`);
    if (meta.featuresIntroKey) tier.featuresIntro = t(`items.${meta.id}.featuresIntro`);
    return tier;
  });
}

export function getLocalizedStats(t: TFunction): Stat[] {
  return statMeta.map((meta) => ({
    ...meta,
    label: t(`items.${meta.id}.label`),
  }));
}

export function getLocalizedResults(t: TFunction): AdResult[] {
  return resultMeta.map((meta) => ({
    ...meta,
    platform: t(`items.${meta.id}.platform`),
    title: t(`items.${meta.id}.title`),
    description: t(`items.${meta.id}.description`),
    metrics: meta.metrics.map((m, i) => ({
      label: (t.raw(`items.${meta.id}.metrics`) as { label: string }[])[i].label,
      value: m.value,
    })),
    screenshots: meta.screenshots.map((shot, i) => ({
      ...shot,
      alt: t(`items.${meta.id}.screenshots.${i}.alt`),
      caption: t(`items.${meta.id}.screenshots.${i}.caption`),
    })),
  }));
}

export function getLocalizedVideos(t: TFunction): VideoItem[] {
  return videoMeta.map((meta) => ({
    ...meta,
    title: t(`items.${meta.id}.title`),
    client: t(`items.${meta.id}.client`),
    description: t(`items.${meta.id}.description`),
    category: t(`categories.${meta.categoryKey}`),
    categoryKey: meta.categoryKey,
  }));
}

export function getLocalizedVideoCategories(t: TFunction): string[] {
  const keys = t.raw("categoryKeys") as string[];
  return keys.map((key) => t(`categories.${key}`));
}

export function getLocalizedTestimonials(t: TFunction): Testimonial[] {
  return testimonialMeta.map((meta) => ({
    ...meta,
    quote: t(`items.${meta.id}.quote`),
    author: t(`items.${meta.id}.author`),
    role: t(`items.${meta.id}.role`),
    company: t(`items.${meta.id}.company`),
  }));
}

export function getLocalizedCaseStudy(t: TFunction, slug: string): CaseStudy | undefined {
  if (!CASE_STUDY_SLUGS.includes(slug as (typeof CASE_STUDY_SLUGS)[number])) {
    return undefined;
  }

  const structural = t.raw(`items.${slug}.structural`) as {
    leads: number;
    cover: string;
    images: string[];
    videos: string[];
    featured?: boolean;
    tags: string[];
  };

  const testimonials = t.raw(`items.${slug}.testimonials`) as CaseStudy["testimonials"];

  return {
    slug,
    title: t(`items.${slug}.title`),
    client: t(`items.${slug}.client`),
    industry: t(`items.${slug}.industry`),
    description: t(`items.${slug}.description`),
    objectives: t.raw(`items.${slug}.objectives`) as string[],
    strategy: t.raw(`items.${slug}.strategy`) as string[],
    budget: t(`items.${slug}.budget`),
    leads: structural.leads,
    cpl: t(`items.${slug}.cpl`),
    roas: t(`items.${slug}.roas`),
    timeline: t(`items.${slug}.timeline`),
    cover: structural.cover,
    images: structural.images,
    videos: structural.videos,
    featured: structural.featured,
    tags: structural.tags.map((tagKey) => t(`tags.${tagKey}`)),
    testimonials,
  };
}

export function getLocalizedCaseStudies(t: TFunction): CaseStudy[] {
  return CASE_STUDY_SLUGS.map((slug) => getLocalizedCaseStudy(t, slug)!);
}

export function getLocalizedReelVideos(t: TFunction): ReelVideo[] {
  return reelMeta.map((meta) => ({
    id: meta.id,
    src: meta.src,
    title: t("reelTitle", { n: meta.index }),
  }));
}

export function getLocalizedPortfolioImages(t: TFunction): LightboxImage[] {
  return millenniaCreativeMeta.map((meta) => ({
    src: meta.src,
    alt: t(`items.${meta.id}.alt`),
  }));
}

export function getPageMeta(t: TFunction, page: string) {
  return {
    metaTitle: t(`${page}.metaTitle`),
    metaDescription: t(`${page}.metaDescription`),
    eyebrow: t(`${page}.eyebrow`),
    title: t(`${page}.title`),
    titleHighlight: t(`${page}.titleHighlight`),
    description: t(`${page}.description`),
  };
}

export function getServicePageSlugs(): ServiceSlug[] {
  return [...SERVICE_SLUGS];
}

export function getLocalizedServicePage(t: TFunction, slug: string) {
  const overviewRaw = t.raw(`items.${slug}.overview`) as Omit<AIOverviewContent, "readingTimeMinutes">;
  const textParts = [
    t(`items.${slug}.problem`),
    t(`items.${slug}.solution`),
    ...((t.raw(`items.${slug}.howItWorks`) as string[]) ?? []),
    ...overviewRaw.benefits,
    ...overviewRaw.takeaways,
  ];

  return {
    slug,
    metaTitle: t(`items.${slug}.metaTitle`),
    metaDescription: t(`items.${slug}.metaDescription`),
    overview: {
      ...overviewRaw,
      readingTimeMinutes: estimateReadingTimeFromParts(textParts),
    } satisfies AIOverviewContent,
    problem: t(`items.${slug}.problem`),
    solution: t(`items.${slug}.solution`),
    howItWorks: t.raw(`items.${slug}.howItWorks`) as string[],
    industries: t.raw(`items.${slug}.industries`) as string[],
    faqs: t.raw(`items.${slug}.faqs`) as { question: string; answer: string }[],
  };
}

export function getHomeOverview(t: TFunction): AIOverviewContent {
  const overview = t.raw("homeOverview") as Omit<AIOverviewContent, "readingTimeMinutes">;
  const textParts = [
    overview.what,
    overview.who,
    ...overview.benefits,
    ...overview.topics,
    ...overview.takeaways,
  ];
  return {
    ...overview,
    readingTimeMinutes: estimateReadingTimeFromParts(textParts),
  };
}

export function getPageOverview(t: TFunction, pageKey: string): AIOverviewContent {
  const overview = t.raw(pageKey) as Omit<AIOverviewContent, "readingTimeMinutes">;
  const textParts = [
    overview.what,
    overview.who,
    ...overview.benefits,
    ...overview.topics,
    ...overview.takeaways,
  ];
  return {
    ...overview,
    readingTimeMinutes: estimateReadingTimeFromParts(textParts),
  };
}

export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export function getLocalizedBlogPosts(t: TFunction) {
  return BLOG_POST_SLUGS.map((slug) => {
    const post = t.raw(`posts.${slug}`) as {
      title: string;
      excerpt: string;
      category: string;
      cover: string;
      sections: BlogSection[];
      faqs: { question: string; answer: string }[];
      overview?: Omit<AIOverviewContent, "readingTimeMinutes">;
      relatedServices?: string[];
    };
    const categoryLabel = t(`categories.${post.category}`);
    return {
      slug,
      ...post,
      categoryLabel,
      published: BLOG_PUBLISHED[slug],
    };
  });
}

export function getLocalizedBlogPost(t: TFunction, slug: string) {
  if (!BLOG_POST_SLUGS.includes(slug as BlogPostSlug)) return null;
  return getLocalizedBlogPosts(t).find((p) => p.slug === slug) ?? null;
}

export function getLocalizedGuide(t: TFunction, slug: string) {
  if (!GUIDE_SLUGS.includes(slug as (typeof GUIDE_SLUGS)[number])) return null;
  return {
    slug,
    title: t(`items.${slug}.title`),
    description: t(`items.${slug}.description`),
    steps: t.raw(`items.${slug}.steps`) as string[],
    mistakes: t.raw(`items.${slug}.mistakes`) as string[],
    faqs: t.raw(`items.${slug}.faqs`) as { question: string; answer: string }[],
  };
}

export function getLocalizedComparison(t: TFunction, slug: string) {
  if (!COMPARISON_SLUGS.includes(slug as (typeof COMPARISON_SLUGS)[number])) return null;
  return {
    slug,
    title: t(`items.${slug}.title`),
    description: t(`items.${slug}.description`),
    rows: t.raw(`items.${slug}.rows`) as { criteria: string; meta: string; google: string }[],
    verdict: t(`items.${slug}.verdict`),
    faqs: t.raw(`items.${slug}.faqs`) as { question: string; answer: string }[],
  };
}
