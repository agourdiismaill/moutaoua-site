import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowLeft,
  Target,
  Lightbulb,
  Wallet,
  Users,
  Coins,
  TrendingUp,
  CalendarClock,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/components/shared/lightbox";
import { VideoGrid } from "@/components/sections/video-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { Reveal } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { InternalLinkingSections } from "@/components/seo/internal-linking/internal-linking-sections";
import { buildArticleSchema } from "@/lib/seo/schema";
import { buildContentBreadcrumb } from "@/lib/seo/breadcrumbs";
import { getCaseStudySlugs } from "@/data/case-studies";
import { CASE_STUDY_PUBLISHED } from "@/data/meta";
import { getLocalizedCaseStudy } from "@/lib/i18n-content";
import { buildLocalizedAlternates, buildPageOpenGraph, buildPageUrl } from "@/lib/i18n-metadata";
import { withOgImage } from "@/lib/metadata";
import { formatNumber } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { hreflangByLocale, routing, type Locale } from "@/i18n/routing";
import type { VideoItem } from "@/data/types";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getCaseStudySlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies" });
  const study = getLocalizedCaseStudy(t, slug);
  if (!study) return {};
  const path = `/case-studies/${slug}`;
  return withOgImage({
    title: study.title,
    description: study.description,
    openGraph: buildPageOpenGraph(locale, path, study.title, study.description, {
      images: [study.cover],
    }),
    alternates: buildLocalizedAlternates(locale, path),
  }, locale);
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("caseStudies");
  const tp = await getTranslations("pages.caseStudyDetail");
  const tServicePages = await getTranslations("servicePages");
  const tNav = await getTranslations("nav");
  const ti = await getTranslations("internalLinking");
  const study = getLocalizedCaseStudy(t, slug);
  if (!study) notFound();

  const breadcrumb = buildContentBreadcrumb("case-study", {
    home: tServicePages("labels.home"),
    services: "",
    blog: "",
    guides: ti("breadcrumb.guides"),
    caseStudies: tNav("caseStudies"),
    compare: ti("breadcrumb.compare"),
    current: study.title,
  });

  const galleryImages = study.images.map((src, i) => ({
    src,
    alt: tp("galleryAlt", { title: study.title, n: i + 1 }),
  }));

  const videoItems: VideoItem[] = study.videos.map((id, i) => ({
    id: `${study.slug}-video-${i}`,
    title: tp("videoTitle", { client: study.client, n: i + 1 }),
    client: study.client,
    description: study.description,
    date: new Date().toISOString(),
    category: tp("videoCategory"),
    thumbnail: study.cover,
    youtubeId: id,
  }));

  const metrics = [
    { icon: Wallet, label: tp("budget"), value: study.budget },
    { icon: Users, label: tp("leads"), value: formatNumber(study.leads) },
    { icon: Coins, label: tp("cpl"), value: study.cpl },
    { icon: TrendingUp, label: tp("roas"), value: study.roas },
    { icon: CalendarClock, label: tp("timeline"), value: study.timeline },
  ];

  const path = `/case-studies/${slug}`;
  const published = CASE_STUDY_PUBLISHED[slug as keyof typeof CASE_STUDY_PUBLISHED];

  return (
    <>
      <JsonLd
        data={buildArticleSchema({
          headline: study.title,
          description: study.description,
          url: buildPageUrl(locale, path),
          image: study.cover,
          datePublished: published,
          dateModified: published,
          locale: hreflangByLocale[locale as Locale],
          authorName: siteConfig.name,
        })}
      />

      <section className="relative pt-32 md:pt-40">
        <div className="container-max">
          <Breadcrumb className="mb-6" items={breadcrumb} />
          <Button asChild variant="ghost" size="sm" className="mb-6 -ms-2">
            <Link href="/case-studies">
              <ArrowLeft className="size-4" />
              {tp("backLink")}
            </Link>
          </Button>

          <Reveal className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="solid">{study.industry}</Badge>
              {study.tags?.map((tag) => (
                <Badge key={tag} variant="muted">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              {study.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {study.description}
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground/90">
              {tp("disclaimer")}
            </p>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              {tp("clientLabel")} {study.client}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border shadow-soft-lg">
              <Image
                src={study.cover}
                alt={study.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12">
        <div className="container-max">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft md:grid-cols-5 md:p-8">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col items-center gap-2 text-center">
                <m.icon className="size-5 text-primary" />
                <div className="text-2xl font-bold tracking-tight text-gradient">
                  {m.value}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Target className="size-5" />
              </span>
              <h2 className="text-2xl font-semibold tracking-tight">{tp("objectives")}</h2>
            </div>
            <ul className="space-y-4">
              {study.objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-secondary/10 text-secondary">
                <Lightbulb className="size-5" />
              </span>
              <h2 className="text-2xl font-semibold tracking-tight">{tp("strategy")}</h2>
            </div>
            <ul className="space-y-4">
              {study.strategy.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-brand" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="section-pad">
          <div className="container-max">
            <h2 className="mb-8 text-2xl font-semibold tracking-tight">{tp("gallery")}</h2>
            <Gallery images={galleryImages} />
          </div>
        </section>
      )}

      {videoItems.length > 0 && (
        <section className="pb-16">
          <div className="container-max">
            <h2 className="mb-8 text-2xl font-semibold tracking-tight">{tp("videos")}</h2>
            <VideoGrid videos={videoItems} />
          </div>
        </section>
      )}

      {study.testimonials.length > 0 && (
        <section className="pb-16">
          <div className="container-max grid gap-6 md:grid-cols-2">
            {study.testimonials.map((item, i) => (
              <Reveal
                key={i}
                delay={i * 0.1}
                className="rounded-3xl border border-border bg-gradient-to-br from-surface-container to-card p-8 shadow-soft"
              >
                <blockquote className="text-lg font-medium leading-relaxed">
                  “{item.quote}”
                </blockquote>
                <footer className="mt-6">
                  <div className="font-semibold tracking-tight">{item.author}</div>
                  <div className="text-sm text-muted-foreground">{item.role}</div>
                </footer>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Suspense fallback={null}>
        <InternalLinkingSections type="case-study" slug={slug} locale={locale} />
      </Suspense>

      <CtaSection />
    </>
  );
}
