"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/motion";
import { formatNumber } from "@/lib/utils";
import type { CaseStudy } from "@/data/types";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const t = useTranslations("sections.caseStudyCard");

  return (
    <motion.article variants={fadeUp}>
      <Link
        href={`/case-studies/${study.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={study.cover}
            alt={study.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute start-4 top-4 flex flex-wrap gap-2">
            <Badge variant="solid">{study.industry}</Badge>
          </div>
          <span className="absolute end-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="size-5" />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            {study.client}
          </p>
          <h3 className="text-xl font-semibold leading-snug tracking-tight">
            {study.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {study.description}
          </p>

          <div className="mt-auto grid grid-cols-3 gap-2 border-t border-border pt-4">
            <Metric icon={<Users className="size-4" />} value={formatNumber(study.leads)} label={t("leads")} />
            <Metric value={study.cpl} label={t("cpl")} />
            <Metric icon={<TrendingUp className="size-4" />} value={study.roas} label={t("roas")} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function Metric({
  icon,
  value,
  label,
}: {
  icon?: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1 text-base font-bold tracking-tight text-gradient">
        {icon}
        {value}
      </div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
