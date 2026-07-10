import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ContentNode } from "@/data/content-graph";
import { nodeToRelatedLink } from "@/lib/seo/content-labels";
import type { ContentLabelSources } from "@/lib/seo/content-labels";
import { cn } from "@/lib/utils";

type PreviousNextNavigationProps = {
  prev?: ContentNode;
  next?: ContentNode;
  labels: { previous: string; next: string };
  sources: ContentLabelSources;
  className?: string;
};

export function PreviousNextNavigation({
  prev,
  next,
  labels,
  sources,
  className,
}: PreviousNextNavigationProps) {
  if (!prev && !next) return null;

  const prevLink = prev ? nodeToRelatedLink(prev, sources) : null;
  const nextLink = next ? nodeToRelatedLink(next, sources) : null;

  return (
    <nav
      aria-label="Article navigation"
      className={cn("section-pad pt-0", className)}
    >
      <div className="container-max grid gap-4 sm:grid-cols-2">
        {prevLink ? (
          <Link
            href={prevLink.href}
            className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:border-primary/30"
          >
            <ArrowLeft className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {labels.previous}
              </p>
              <p className="mt-1 font-semibold leading-snug">{prevLink.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextLink ? (
          <Link
            href={nextLink.href}
            className="group flex items-start justify-end gap-3 rounded-2xl border border-border bg-card p-5 text-end shadow-soft transition-all hover:border-primary/30 sm:col-start-2"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {labels.next}
              </p>
              <p className="mt-1 font-semibold leading-snug">{nextLink.title}</p>
            </div>
            <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
