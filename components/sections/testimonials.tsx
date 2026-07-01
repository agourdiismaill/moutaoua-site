"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { AvatarInitials } from "@/components/shared/avatar-initials";
import { getLocalizedTestimonials } from "@/lib/i18n-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Testimonials({ className }: { className?: string }) {
  const ts = useTranslations("sections.testimonials");
  const t = useTranslations("testimonials");
  const testimonials = getLocalizedTestimonials(t);

  return (
    <section className={cn("section-pad", className)}>
      <div className="container-max">
        <SectionHeading
          eyebrow={ts("eyebrow")}
          title={ts("title")}
          description={ts("description")}
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6"
        >
          {testimonials.map((item) => (
            <motion.figure
              key={item.id}
              variants={fadeUp}
              className="break-inside-avoid rounded-2xl border border-border bg-card p-8 shadow-soft"
            >
              <Quote className="mb-4 size-8 text-primary/30" />
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-pretty leading-relaxed text-foreground">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <AvatarInitials name={item.author} size="lg" />
                <div>
                  <div className="font-semibold tracking-tight">{item.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.role} · {item.company}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
