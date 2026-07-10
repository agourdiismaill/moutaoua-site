import type { ContentType } from "@/data/content-graph";
import { PAGE_LINKING_CONFIG } from "@/data/content-graph";
import { loadContentLabelSources } from "@/components/seo/internal-linking/load-labels";
import { PreviousNextNavigation } from "@/components/seo/internal-linking/previous-next-navigation";
import { RelatedSection } from "@/components/seo/internal-linking/related-sections";
import {
  resolvePreviousNext,
  resolveRelatedContent,
} from "@/lib/seo/resolve-related";

type InternalLinkingSectionsProps = {
  type: ContentType;
  slug: string;
  locale: string;
  showPrevNext?: boolean;
};

export async function InternalLinkingSections({
  type,
  slug,
  locale,
  showPrevNext = false,
}: InternalLinkingSectionsProps) {
  const sources = await loadContentLabelSources(locale);
  const resolved = resolveRelatedContent({ type, slug });
  const config = PAGE_LINKING_CONFIG[type];

  const { prev, next } = showPrevNext ? resolvePreviousNext(slug) : {};

  return (
    <>
      {config.sections.map((sectionType) => {
        const nodes = resolved[sectionType];
        if (!nodes?.length) return null;
        return (
          <RelatedSection
            key={sectionType}
            type={sectionType}
            nodes={nodes}
            sources={sources}
          />
        );
      })}

      {showPrevNext && (prev || next) ? (
        <PreviousNextNavigation
          prev={prev}
          next={next}
          labels={{
            previous: sources.internalLinking("navigation.previous"),
            next: sources.internalLinking("navigation.next"),
          }}
          sources={sources}
        />
      ) : null}
    </>
  );
}

export async function InternalLinkingSidebar({
  type,
  slug,
  locale,
}: {
  type: ContentType;
  slug: string;
  locale: string;
}) {
  const { ContentSidebar } = await import(
    "@/components/seo/internal-linking/content-sidebar"
  );
  const sources = await loadContentLabelSources(locale);
  const { resolveLatest, resolvePopular, resolveRelatedContent } = await import(
    "@/lib/seo/resolve-related"
  );

  const resolved = resolveRelatedContent({
    type,
    slug,
    limits: { blog: 2, guide: 1, service: 2 },
  });

  const related = [
    ...(resolved.service ?? []),
    ...(resolved.guide ?? []),
    ...(resolved.blog ?? []),
  ].slice(0, 3);

  const latest = resolveLatest("blog", 3).filter((n) => n.slug !== slug);
  const popularGuides = resolvePopular("guide", 2);

  return (
    <ContentSidebar
      related={related}
      latest={latest}
      popularGuides={popularGuides}
      labels={{
        relatedContent: sources.internalLinking("sidebar.relatedContent"),
        latestArticles: sources.internalLinking("sidebar.latestArticles"),
        popularGuides: sources.internalLinking("sidebar.popularGuides"),
      }}
      sources={sources}
    />
  );
}
