"use client";

import { Link2, Linkedin } from "lucide-react";
import { siteConfig } from "@/data/site";

type ShareButtonsProps = {
  url: string;
  title: string;
  label: string;
};

export function ShareButtons({ url, title, label }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // noop
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/30 hover:text-primary"
      >
        <Link2 className="size-4" aria-hidden />
        Link
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/30 hover:text-primary"
      >
        <Linkedin className="size-4" aria-hidden />
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/30 hover:text-primary"
      >
        {siteConfig.name}
      </a>
    </div>
  );
}
