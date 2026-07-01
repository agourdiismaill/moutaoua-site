"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { AvatarInitials } from "@/components/shared/avatar-initials";
import { fadeUp, slideInRight, staggerContainer } from "@/lib/motion";

export function Hero() {
  const t = useTranslations("hero");
  const avatarNames = (t.raw("avatarNames") as string[] | undefined) ?? [];

  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 grid-backdrop opacity-60" />
        <div className="absolute -end-20 top-10 size-[28rem] rounded-full bg-secondary/20 blur-[120px]" />
        <div className="absolute -start-20 top-40 size-[24rem] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="container-max grid items-center gap-12 pb-20 md:pb-28 lg:grid-cols-2 lg:gap-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-container/80 px-4 py-2 text-sm font-medium text-primary backdrop-blur"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            {t("badge")}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4rem]"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-gradient">{chunks}</span>
              ),
            })}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            {t("description")}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                <Sparkles className="size-4" />
                {t("ctaPrimary")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/results">
                {t("ctaSecondary")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 pt-4 text-sm text-muted-foreground"
          >
            <div className="flex -space-x-3 rtl:space-x-reverse">
              {avatarNames.map((name) => (
                <AvatarInitials key={name} name={name} size="sm" />
              ))}
            </div>
            <p>
              {t.rich("socialProof", {
                strong: (chunks) => (
                  <span className="font-semibold text-foreground">{chunks}</span>
                ),
              })}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass relative z-10 rounded-3xl p-2 shadow-soft-lg"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-surface-bright">
              <div className="flex h-9 items-center gap-2 border-b border-border bg-muted/60 px-4">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-amber-400" />
                <span className="size-3 rounded-full bg-emerald-400" />
              </div>
              <Image
                src="/dashboard/performance.png"
                alt={t("dashboardAlt")}
                width={1024}
                height={835}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -start-4 top-16 z-20 hidden rounded-2xl border border-border bg-card/90 p-4 shadow-soft-lg backdrop-blur sm:block"
          >
            <p className="text-xs text-muted-foreground">{t("costPerLead")}</p>
            <p className="text-2xl font-bold text-gradient">2 MAD</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -end-2 bottom-10 z-20 hidden rounded-2xl border border-border bg-card/90 p-4 shadow-soft-lg backdrop-blur sm:block"
          >
            <p className="text-xs text-muted-foreground">{t("avgRoas")}</p>
            <p className="text-2xl font-bold text-gradient">+400%</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
