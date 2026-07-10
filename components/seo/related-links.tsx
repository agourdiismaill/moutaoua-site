import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import type { RelatedLink } from "@/lib/seo/types";
import { cn } from "@/lib/utils";

type RelatedLinksProps = {
  title: string;
  links: RelatedLink[];
  className?: string;
};

export function RelatedLinks({ title, links, className }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <section aria-labelledby="related-links-heading" className={cn("section-pad pt-0", className)}>
      <div className="container-max">
        <h2 id="related-links-heading" className="mb-6 text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold tracking-tight">{link.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {link.description}
                  </p>
                </div>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
