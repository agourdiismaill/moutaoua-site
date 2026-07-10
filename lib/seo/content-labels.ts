import type { ContentNode, ContentType } from "@/data/content-graph";
import { pickAnchorText, getAnchorVariants } from "@/lib/seo/anchor-text";
import type { RelatedLink } from "@/lib/seo/types";

type TranslationFn = (key: string, values?: Record<string, string>) => string;

export type ContentLabelSources = {
  locale: string;
  services: TranslationFn;
  blog: TranslationFn;
  guides: TranslationFn;
  caseStudies: TranslationFn;
  compare: TranslationFn;
  internalLinking: TranslationFn;
  seo: TranslationFn;
  anchors: Record<string, string[]>;
};

function getRawTitle(node: ContentNode, src: ContentLabelSources): string {
  switch (node.type) {
    case "service":
      return src.services(`items.${node.slug}.title`);
    case "blog":
      return src.blog(`posts.${node.slug}.title`);
    case "guide":
      return src.guides(`items.${node.slug}.title`);
    case "case-study":
      return src.caseStudies(`items.${node.slug}.title`);
    case "comparison":
      return src.compare(`items.${node.slug}.title`);
    case "resource":
      return src.internalLinking(`resources.${node.slug}.title`);
    default:
      return node.slug;
  }
}

function getRawDescription(node: ContentNode, src: ContentLabelSources): string {
  switch (node.type) {
    case "service":
      return src.services(`items.${node.slug}.description`);
    case "blog":
      return src.blog(`posts.${node.slug}.excerpt`);
    case "guide":
      return src.guides(`items.${node.slug}.description`);
    case "case-study":
      return src.caseStudies(`items.${node.slug}.description`);
    case "comparison":
      return src.compare(`items.${node.slug}.description`);
    case "resource":
      return src.internalLinking(`resources.${node.slug}.description`);
    default:
      return "";
  }
}

export function nodeToRelatedLink(node: ContentNode, src: ContentLabelSources): RelatedLink {
  const rawTitle = getRawTitle(node, src);
  const anchorKey = node.type === "comparison" ? "comparison" : node.type;
  const variants = getAnchorVariants(anchorKey, src.anchors);
  const title = pickAnchorText(node.path, src.locale, variants, rawTitle);

  return {
    title,
    description: getRawDescription(node, src),
    href: node.path,
  };
}

export function nodeToBlogPost(node: ContentNode, src: ContentLabelSources) {
  return {
    slug: node.slug,
    title: getRawTitle(node, src),
    excerpt: getRawDescription(node, src),
    category: node.category ? src.blog(`categories.${node.category}`) : "",
  };
}

export function nodesToLinks(nodes: ContentNode[], src: ContentLabelSources): RelatedLink[] {
  return nodes.map((n) => nodeToRelatedLink(n, src));
}

export function sectionTitle(type: ContentType, src: ContentLabelSources): string {
  const keyMap: Record<ContentType, string> = {
    service: "relatedServices",
    blog: "relatedArticles",
    guide: "relatedGuides",
    "case-study": "relatedCaseStudies",
    comparison: "relatedComparisons",
    resource: "relatedResources",
  };
  return src.internalLinking(`sections.${keyMap[type]}`);
}
