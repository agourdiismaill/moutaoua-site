"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 md:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-full -translate-x-1/2 grid-backdrop opacity-50" />
        <div className="absolute left-1/2 top-0 size-[26rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      </div>
      <div className="container-max pb-12 md:pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
        >
          {eyebrow && (
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center rounded-full border border-border bg-surface-container px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-primary"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={fadeUp}
              className="text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
