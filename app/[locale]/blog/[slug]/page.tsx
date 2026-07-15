import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthorCard } from "@/components/seo/author-card";
import { AIOverview } from "@/components/seo/ai-overview";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { SeoFaqSection } from "@/components/seo/faq-section";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  InternalLinkingSections,
  InternalLinkingSidebar,
} from "@/components/seo/internal-linking/internal-linking-sections";
import { ShareButtons } from "@/components/seo/share-buttons";
import { TableOfContents } from "@/components/seo/table-of-contents";
import { ReadingTime } from "@/components/seo/reading-time";
import { CtaSection } from "@/components/sections/cta-section";
import { BLOG_POST_SLUGS } from "@/data/blog";
import { getLocalizedBlogPost } from "@/lib/i18n-content";
import { buildContentBreadcrumb } from "@/lib/seo/breadcrumbs";
import { buildPageUrl } from "@/lib/i18n-metadata";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { buildBlogPostingSchema, buildVideoObjectSchema } from "@/lib/seo/schema";
import { estimateReadingTimeFromParts } from "@/lib/seo/reading-time";
import { siteConfig } from "@/data/site";
import { hreflangByLocale, routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_POST_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = getLocalizedBlogPost(t, slug);
  if (!post) return {};
  return buildSeoMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [
        {
          url: post.cover,
          width: 1024,
          height: 576,
          alt: post.title,
        },
      ],
    },
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const tServicePages = await getTranslations("servicePages");
  const ti = await getTranslations("internalLinking");
  const post = getLocalizedBlogPost(t, slug);
  if (!post) notFound();

  const path = `/blog/${slug}`;
  const pageUrl = buildPageUrl(locale, path);

  const breadcrumb = buildContentBreadcrumb("blog", {
    home: tServicePages("labels.home"),
    services: "",
    blog: t("eyebrow"),
    guides: ti("breadcrumb.guides"),
    caseStudies: "",
    compare: ti("breadcrumb.compare"),
    current: post.title,
  });

  const textParts = post.sections.flatMap((s) => [
    s.heading,
    ...s.paragraphs,
    ...(s.bullets ?? []),
  ]);
  const readingMinutes = estimateReadingTimeFromParts(textParts);

  const toc = post.sections.map((s) => ({ id: s.id, label: s.heading }));
  const demoVideo = post.sections.find((s) => s.video)?.video;

  const overviewLabels = {
    title: tServicePages("labels.aiOverview"),
    what: tServicePages("labels.what"),
    who: tServicePages("labels.who"),
    benefits: tServicePages("labels.benefits"),
    topics: tServicePages("labels.topics"),
    takeaways: tServicePages("labels.takeaways"),
    readingTime: tServicePages("labels.readingTime"),
  };

  return (
    <article>
      <JsonLdScript
        data={buildBlogPostingSchema({
          headline: post.title,
          description: post.excerpt,
          url: pageUrl,
          image: `${siteConfig.url}${post.cover}`,
          datePublished: post.published,
          locale: hreflangByLocale[locale as Locale],
          authorName: t("author.name"),
        })}
      />
      {demoVideo && (
        <JsonLdScript
          data={buildVideoObjectSchema({
            name: post.title,
            description: post.excerpt,
            contentUrl: `${siteConfig.url}${demoVideo.src}`,
            thumbnailUrl: `${siteConfig.url}${post.cover}`,
            uploadDate: post.published,
          })}
        />
      )}

      <header className="section-pad pt-32 md:pt-40">
        <div className="container-max space-y-6">
          <Breadcrumb items={breadcrumb} />
          <Button asChild variant="ghost" size="sm" className="-ms-2">
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              {t("labels.backToBlog")}
            </Link>
          </Button>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            {post.categoryLabel}
          </p>
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4">
            <ReadingTime minutes={readingMinutes} label={tServicePages("labels.readingTime")} />
            <ShareButtons url={pageUrl} title={post.title} label={t("labels.share")} />
          </div>
        </div>
      </header>

      <section className="section-pad pt-0">
        <div className="container-max">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-card shadow-soft-lg">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {post.overview && (
        <section className="section-pad pt-0" aria-label={overviewLabels.title}>
          <div className="container-max">
            <AIOverview
              content={{
                ...post.overview,
                readingTimeMinutes: readingMinutes,
              }}
              labels={overviewLabels}
            />
          </div>
        </section>
      )}

      <div className="section-pad pt-0">
        <div className="container-max grid gap-10 lg:grid-cols-[240px_1fr_280px]">
          <aside className="hidden lg:block">
            <TableOfContents items={toc} title={t("labels.tableOfContents")} className="sticky top-28" />
          </aside>

          <div className="min-w-0 space-y-10">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight">{section.heading}</h2>
                <div className="space-y-4 text-muted-foreground">
                  {section.paragraphs.map((p) => (
                    <p key={p} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {section.video && (
                  <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={section.video.poster}
                      className="aspect-video w-full bg-black object-contain"
                    >
                      <source src={section.video.src} type="video/mp4" />
                    </video>
                    {section.video.caption && (
                      <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                        {section.video.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </section>
            ))}
          </div>

          <aside className="space-y-6">
            <Suspense fallback={null}>
              <InternalLinkingSidebar type="blog" slug={slug} locale={locale} />
            </Suspense>
            <AuthorCard
              name={t("author.name")}
              role={t("author.role")}
              bio={t("author.bio")}
              publishedAt={post.published}
              labels={{
                published: t("labels.published"),
                updated: t("labels.updated"),
              }}
            />
          </aside>
        </div>
      </div>

      {post.faqs.length > 0 && (
        <SeoFaqSection title="FAQ" faqs={post.faqs} className="pt-0" />
      )}

      <Suspense fallback={null}>
        <InternalLinkingSections
          type="blog"
          slug={slug}
          locale={locale}
          showPrevNext
        />
      </Suspense>

      <CtaSection />
    </article>
  );
}
