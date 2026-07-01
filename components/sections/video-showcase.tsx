"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { VideoGrid } from "./video-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { getLocalizedVideos } from "@/lib/i18n-content";
import { cn } from "@/lib/utils";

export function VideoShowcase({ className }: { className?: string }) {
  const ts = useTranslations("sections.videoShowcase");
  const t = useTranslations("videos");
  const videos = getLocalizedVideos(t).slice(0, 3);

  return (
    <section className={cn("section-pad bg-surface-bright", className)}>
      <div className="container-max">
        <SectionHeading
          eyebrow={ts("eyebrow")}
          title={ts("title")}
          description={ts("description")}
          className="mb-16"
        />

        <VideoGrid videos={videos} />

        <div className="mt-12 flex justify-center">
          <Button asChild variant="secondary" size="lg">
            <Link href="/videos">
              {ts("cta")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
