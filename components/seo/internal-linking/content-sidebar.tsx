import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import type { ContentNode } from "@/data/content-graph";
import { nodeToRelatedLink } from "@/lib/seo/content-labels";
import type { ContentLabelSources } from "@/lib/seo/content-labels";
import { cn } from "@/lib/utils";

type ContentSidebarProps = {
  related: ContentNode[];
  latest: ContentNode[];
  popularGuides: ContentNode[];
  labels: {
    relatedContent: string;
    latestArticles: string;
    popularGuides: string;
  };
  sources: ContentLabelSources;
  className?: string;
};

function CompactLinkList({
  title,
  nodes,
  sources,
}: {
  title: string;
  nodes: ContentNode[];
  sources: ContentLabelSources;
}) {
  if (nodes.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <ul className="space-y-3">
        {nodes.map((node) => {
          const link = nodeToRelatedLink(node, sources);
          return (
            <li key={node.id}>
              <Link
                href={link.href}
                className="group flex items-start justify-between gap-2 text-sm font-medium leading-snug hover:text-primary"
              >
                <span className="line-clamp-2">{link.title}</span>
                <ArrowUpRight className="size-3.5 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ContentSidebar({
  related,
  latest,
  popularGuides,
  labels,
  sources,
  className,
}: ContentSidebarProps) {
  const hasContent = related.length > 0 || latest.length > 0 || popularGuides.length > 0;
  if (!hasContent) return null;

  return (
    <aside className={cn("hidden space-y-4 lg:block", className)}>
      <CompactLinkList title={labels.relatedContent} nodes={related} sources={sources} />
      <CompactLinkList title={labels.latestArticles} nodes={latest} sources={sources} />
      <CompactLinkList title={labels.popularGuides} nodes={popularGuides} sources={sources} />
    </aside>
  );
}
