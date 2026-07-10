import type { ContentType } from "@/data/content-graph";
import { RelatedLinks } from "@/components/seo/related-links";
import { RelatedPosts } from "@/components/seo/related-posts";
import {
  nodeToBlogPost,
  nodesToLinks,
  sectionTitle,
} from "@/lib/seo/content-labels";
import type { ScoredNode } from "@/lib/seo/resolve-related";
import type { ContentLabelSources } from "@/lib/seo/content-labels";

type RelatedSectionProps = {
  type: ContentType;
  nodes: ScoredNode[];
  sources: ContentLabelSources;
};

export function RelatedSection({ type, nodes, sources }: RelatedSectionProps) {
  if (nodes.length === 0) return null;

  const title = sectionTitle(type, sources);

  if (type === "blog") {
    return (
      <RelatedPosts
        title={title}
        posts={nodes.map((n) => nodeToBlogPost(n, sources))}
      />
    );
  }

  return <RelatedLinks title={title} links={nodesToLinks(nodes, sources)} />;
}

// Thin wrappers for explicit imports
export function RelatedServices(props: RelatedSectionProps) {
  return props.type === "service" ? <RelatedSection {...props} /> : null;
}

export function RelatedArticles(props: RelatedSectionProps) {
  return props.type === "blog" ? <RelatedSection {...props} /> : null;
}

export function RelatedGuides(props: RelatedSectionProps) {
  return props.type === "guide" ? <RelatedSection {...props} /> : null;
}

export function RelatedCaseStudies(props: RelatedSectionProps) {
  return props.type === "case-study" ? <RelatedSection {...props} /> : null;
}

export function RelatedResources(props: RelatedSectionProps) {
  return props.type === "resource" ? <RelatedSection {...props} /> : null;
}

export function RelatedComparisons(props: RelatedSectionProps) {
  return props.type === "comparison" ? <RelatedSection {...props} /> : null;
}
