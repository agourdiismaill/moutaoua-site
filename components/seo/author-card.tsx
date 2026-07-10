import { User } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthorCardProps = {
  name: string;
  role: string;
  bio: string;
  publishedAt?: string;
  updatedAt?: string;
  labels?: {
    published?: string;
    updated?: string;
  };
  className?: string;
};

export function AuthorCard({
  name,
  role,
  bio,
  publishedAt,
  updatedAt,
  labels,
  className,
}: AuthorCardProps) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-soft",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <User className="size-5" aria-hidden />
        </span>
        <div>
          <p className="font-semibold tracking-tight">{name}</p>
          <p className="text-sm text-primary">{role}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{bio}</p>
          {(publishedAt || updatedAt) && (
            <dl className="mt-4 space-y-1 text-xs text-muted-foreground">
              {publishedAt && labels?.published && (
                <div>
                  <dt className="inline font-medium">{labels.published}: </dt>
                  <dd className="inline">{publishedAt}</dd>
                </div>
              )}
              {updatedAt && labels?.updated && (
                <div>
                  <dt className="inline font-medium">{labels.updated}: </dt>
                  <dd className="inline">{updatedAt}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </div>
    </aside>
  );
}
