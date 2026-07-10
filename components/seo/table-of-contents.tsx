"use client";

import { cn } from "@/lib/utils";

export type TocItem = {
  id: string;
  label: string;
};

type TableOfContentsProps = {
  items: TocItem[];
  title: string;
  className?: string;
};

export function TableOfContents({ items, title, className }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={title} className={cn("rounded-2xl border border-border bg-card p-5 shadow-soft", className)}>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      <ol className="space-y-2 text-sm">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {index + 1}. {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
