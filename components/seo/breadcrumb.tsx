import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/data/site";
import type { BreadcrumbItem } from "@/lib/seo/types";
import { cn } from "@/lib/utils";

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <>
      <JsonLdScript data={buildBreadcrumbSchema(items, siteConfig.url)} />
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
                ) : null}
                {item.href && !isLast ? (
                  <Link href={item.href} className="transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "font-medium text-foreground" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
