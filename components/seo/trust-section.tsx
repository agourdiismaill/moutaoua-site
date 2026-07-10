import { ShieldCheck, BadgeCheck, CalendarDays, Building2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type TrustSectionProps = {
  labels: {
    title: string;
    company: string;
    experience: string;
    methodology: string;
    updated: string;
    references: string;
  };
  experience: string;
  methodology: string;
  updatedAt: string;
  references: string[];
  className?: string;
};

export function TrustSection({
  labels,
  experience,
  methodology,
  updatedAt,
  references,
  className,
}: TrustSectionProps) {
  return (
    <section
      aria-labelledby="trust-heading"
      className={cn("section-pad bg-surface-bright", className)}
    >
      <div className="container-max">
        <h2 id="trust-heading" className="mb-8 text-2xl font-semibold tracking-tight">
          {labels.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <TrustCard icon={Building2} title={labels.company} text={siteConfig.name} />
          <TrustCard icon={ShieldCheck} title={labels.experience} text={experience} />
          <TrustCard icon={BadgeCheck} title={labels.methodology} text={methodology} />
          <TrustCard icon={CalendarDays} title={labels.updated} text={updatedAt} />
        </div>
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {labels.references}
          </h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {references.map((ref) => (
              <li key={ref} className="text-sm leading-relaxed text-foreground">
                {ref}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TrustCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Building2;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <Icon className="mb-3 size-5 text-primary" aria-hidden />
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{text}</p>
    </article>
  );
}
