import { Clock, Sparkles } from "lucide-react";
import type { AIOverviewContent } from "@/lib/seo/types";
import { cn } from "@/lib/utils";

type AIOverviewProps = {
  content: AIOverviewContent;
  labels: {
    title: string;
    what: string;
    who: string;
    benefits: string;
    topics: string;
    takeaways: string;
    readingTime: string;
  };
  className?: string;
};

export function AIOverview({ content, labels, className }: AIOverviewProps) {
  return (
    <aside
      aria-label={labels.title}
      className={cn(
        "rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 via-card to-card p-6 shadow-soft md:p-8",
        className
      )}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="size-5" aria-hidden />
          <h2 className="text-sm font-semibold uppercase tracking-wider">{labels.title}</h2>
        </div>
        {content.readingTimeMinutes ? (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" aria-hidden />
            {labels.readingTime.replace("{minutes}", String(content.readingTimeMinutes))}
          </p>
        ) : null}
      </div>

      <dl className="grid gap-6 md:grid-cols-2">
        <div>
          <dt className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {labels.what}
          </dt>
          <dd className="text-sm leading-relaxed text-foreground">{content.what}</dd>
        </div>
        <div>
          <dt className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {labels.who}
          </dt>
          <dd className="text-sm leading-relaxed text-foreground">{content.who}</dd>
        </div>
      </dl>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {labels.benefits}
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed text-foreground">
            {content.benefits.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {labels.topics}
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed text-foreground">
            {content.topics.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {labels.takeaways}
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed text-foreground">
            {content.takeaways.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-brand" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
