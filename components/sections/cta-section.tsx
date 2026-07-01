"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function CtaSection() {
  const t = useTranslations("sections.cta");

  return (
    <section className="section-pad">
      <div className="container-max">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-brand px-8 py-16 text-center shadow-glow md:px-16 md:py-24"
        >
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -left-10 -top-10 size-72 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 size-72 rounded-full bg-cyan-200/40 blur-3xl" />
          </div>

          <motion.span
            variants={fadeUp}
            className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur"
          >
            <Sparkles className="size-4" />
            {t("badge")}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="relative mx-auto mt-6 max-w-3xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="relative mx-auto mt-4 max-w-xl text-pretty text-lg text-white/90"
          >
            {t("description")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-primary shadow-soft-lg hover:bg-white hover:brightness-95"
            >
              <Link href="/contact">
                {t("ctaPrimary")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/15"
            >
              <Link href="/case-studies">{t("ctaSecondary")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
