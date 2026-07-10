import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/shared/page-header";
import { PageSeoShell } from "@/components/seo/page-seo-shell";
import { PopularContentHub } from "@/components/seo/internal-linking/popular-content-hub";
import { getLocalizedBlogPosts, getPageOverview } from "@/lib/i18n-content";
import { buildSeoMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return buildSeoMetadata({
    locale,
    path: "/blog",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const tServicePages = await getTranslations("servicePages");
  const tPageSeo = await getTranslations("pageSeo");
  const posts = getLocalizedBlogPosts(t).sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );

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
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t.rich("title", {
          highlight: (chunks) => <span className="text-gradient">{chunks}</span>,
        })}
        description={t("description")}
      />
      <PageSeoShell
        breadcrumb={[
          { label: tServicePages("labels.home"), href: "/" },
          { label: t("eyebrow") },
        ]}
        overview={getPageOverview(tPageSeo, "blog")}
        overviewLabels={overviewLabels}
      />
      <Suspense fallback={null}>
        <PopularContentHub locale={locale} />
      </Suspense>
      <section className="section-pad pt-0">
        <div className="container-max">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  {post.categoryLabel}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="mt-4 text-sm font-medium text-primary">{t("readMore")} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
