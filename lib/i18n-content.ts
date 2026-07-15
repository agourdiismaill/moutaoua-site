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
  SERVICE_DETAIL_SLUGS,
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
import { industryMeta } from "@/data/industries";
import { portfolioMeta, millenniaCreativeMeta } from "@/data/portfolio";
import { pricingMeta } from "@/data/pricing";
import { statMeta } from "@/data/site";
import { resultMeta } from "@/data/results";
import { videoMeta } from "@/data/videos";
import { testimonialMeta } from "@/data/testimonials";
import { reelMeta } from "@/data/showcase-videos";
import { solutionMeta, SOLUTION_SLUGS, type SolutionSlug } from "@/data/solutions";
import type { PricingPageSlug } from "@/data/pricing-pages";
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
    pillar: meta.pillar,
  }));
}

export function getLocalizedIndustries(t: TFunction) {
  return industryMeta.map((meta) => ({
    slug: meta.slug,
    icon: meta.icon,
    featured: meta.featured,
    title: t(`items.${meta.slug}.title`),
    description: t(`items.${meta.slug}.description`),
  }));
}

export function getLocalizedIndustryPage(t: TFunction, slug: string) {
  const overviewRaw = t.raw(`items.${slug}.overview`) as Omit<AIOverviewContent, "readingTimeMinutes">;
  const textParts = [
    overviewRaw.what,
    overviewRaw.who,
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
    challenges: t.raw(`items.${slug}.challenges`) as string[],
    solutions: t.raw(`items.${slug}.solutions`) as string[],
    faqs: t.raw(`items.${slug}.faqs`) as { question: string; answer: string }[],
  };
}

export function getLocalizedPortfolioItems(t: TFunction) {
  return portfolioMeta.map((meta) => ({
    ...meta,
    title: t(`hub.items.${meta.slug}.title`),
    alt: t(`hub.items.${meta.slug}.alt`),
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
    city: meta.city,
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
  const execution = t.raw(`items.${slug}.execution`) as string[] | undefined;
  const technologies = t.raw(`items.${slug}.technologies`) as string[] | undefined;
  const relatedServices = t.raw(`items.${slug}.relatedServices`) as string[] | undefined;

  return {
    slug,
    title: t(`items.${slug}.title`),
    client: t(`items.${slug}.client`),
    industry: t(`items.${slug}.industry`),
    description: t(`items.${slug}.description`),
    objectives: t.raw(`items.${slug}.objectives`) as string[],
    strategy: t.raw(`items.${slug}.strategy`) as string[],
    execution,
    technologies,
    relatedServices,
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
    poster: meta.poster,
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

export function getLocalizedServicePage(t: TFunction, slug: string, service?: Service) {
  const hasDetail = (SERVICE_DETAIL_SLUGS as readonly string[]).includes(slug);

  if (hasDetail) {
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
      isGeneric: false,
    };
  }

  const generic = t.raw("generic") as {
    problem: string;
    solution: string;
    howItWorks: string[];
    industries: string[];
    faqs: { question: string; answer: string }[];
  };

  const serviceTitle = service?.title ?? slug;
  const serviceDesc = service?.description ?? "";

  const overview: Omit<AIOverviewContent, "readingTimeMinutes"> = {
    what: serviceDesc,
    who: generic.problem,
    benefits: generic.howItWorks.slice(0, 3),
    topics: [serviceTitle],
    takeaways: [generic.solution],
  };

  const textParts = [overview.what, overview.who, ...overview.benefits, ...overview.takeaways];

  return {
    slug,
    metaTitle: `${serviceTitle} — Mohtaoua`,
    metaDescription: serviceDesc,
    overview: {
      ...overview,
      readingTimeMinutes: estimateReadingTimeFromParts(textParts),
    } satisfies AIOverviewContent,
    problem: generic.problem,
    solution: generic.solution,
    howItWorks: generic.howItWorks,
    industries: generic.industries,
    faqs: generic.faqs,
    isGeneric: true,
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

export function getSolutionsHubOverview(t: TFunction): AIOverviewContent {
  const overview = t.raw("hub.hubOverview") as Omit<AIOverviewContent, "readingTimeMinutes">;
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

export function getLocalizedSolutions(t: TFunction) {
  return solutionMeta.map((meta) => ({
    slug: meta.slug,
    icon: meta.icon,
    category: meta.category,
    title: t(`items.${meta.slug}.title`),
    description: t(`items.${meta.slug}.description`),
  }));
}

export function getSolutionPageSlugs(): SolutionSlug[] {
  return [...SOLUTION_SLUGS];
}

export function getLocalizedSolutionPage(t: TFunction, slug: string) {
  const overviewRaw = t.raw(`items.${slug}.overview`) as Omit<AIOverviewContent, "readingTimeMinutes">;
  const textParts = [
    t(`items.${slug}.problem`),
    t(`items.${slug}.solution`),
    ...((t.raw(`items.${slug}.howItWorks`) as string[]) ?? []),
    ...overviewRaw.benefits,
    ...overviewRaw.takeaways,
  ];

  const pricingRaw = t.raw(`items.${slug}.pricing`) as { note: string; cta: string };

  return {
    slug,
    metaTitle: t(`items.${slug}.metaTitle`),
    metaDescription: t(`items.${slug}.metaDescription`),
    badge: t(`items.${slug}.badge`),
    overview: {
      ...overviewRaw,
      readingTimeMinutes: estimateReadingTimeFromParts(textParts),
    } satisfies AIOverviewContent,
    problem: t(`items.${slug}.problem`),
    solution: t(`items.${slug}.solution`),
    features: t.raw(`items.${slug}.features`) as string[],
    benefits: t.raw(`items.${slug}.benefits`) as string[],
    targetAudience: t.raw(`items.${slug}.targetAudience`) as string[],
    howItWorks: t.raw(`items.${slug}.howItWorks`) as string[],
    industries: t.raw(`items.${slug}.industries`) as string[],
    pricing: pricingRaw,
    faqs: t.raw(`items.${slug}.faqs`) as { question: string; answer: string }[],
    screenshotAlts: (t.raw(`items.${slug}.screenshots`) as { alt: string }[]).map((s) => s.alt),
  };
}

export function getLocalizedPricingPage(t: TFunction, slug: string) {
  const overviewRaw = t.raw(`items.${slug}.overview`) as Omit<
    AIOverviewContent,
    "readingTimeMinutes"
  >;
  const textParts = [
    t(`items.${slug}.intro`),
    ...overviewRaw.benefits,
    ...overviewRaw.takeaways,
    ...((t.raw(`items.${slug}.factors`) as string[]) ?? []),
  ];

  return {
    slug,
    metaTitle: t(`items.${slug}.metaTitle`),
    metaDescription: t(`items.${slug}.metaDescription`),
    h1: t(`items.${slug}.h1`),
    intro: t(`items.${slug}.intro`),
    overview: {
      ...overviewRaw,
      readingTimeMinutes: estimateReadingTimeFromParts(textParts),
    } satisfies AIOverviewContent,
    factorsTitle: t(`items.${slug}.factorsTitle`),
    factors: t.raw(`items.${slug}.factors`) as string[],
    tiers: t.raw(`items.${slug}.tiers`) as Record<
      "basic" | "standard" | "premium",
      { name: string; description: string; includes: string[] }
    >,
    disclaimer: t(`items.${slug}.disclaimer`),
    contextLinks: t.raw(`items.${slug}.contextLinks`) as {
      service: string;
      packs: string;
    },
    faqs: t.raw(`items.${slug}.faqs`) as { question: string; answer: string }[],
  };
}

export function getPricingPageSlugs(): PricingPageSlug[] {
  return [
    "creation-site-web-maroc",
    "seo-maroc",
    "application-mobile-maroc",
    "logo-maroc",
  ];
}
