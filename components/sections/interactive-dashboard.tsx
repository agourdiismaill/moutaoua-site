"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowUpRight, BarChart3, LayoutDashboard, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const views = ["overview", "acquisition", "pipeline"] as const;

export function InteractiveDashboard() {
  const t = useTranslations("hero");
  const [activeView, setActiveView] = React.useState<(typeof views)[number]>("overview");
  const reducedMotion = useReducedMotion();
  const activeIndex = views.indexOf(activeView);

  const metrics = {
    overview: [
      { label: "Projets actifs", value: "24", delta: "+12%" },
      { label: "Leads qualifiés", value: "2 480", delta: "+28%" },
      { label: "ROAS moyen", value: "4,6x", delta: "+18%" },
    ],
    acquisition: [
      { label: "Impressions", value: "1,8M", delta: "+34%" },
      { label: "Clics engagés", value: "86,4K", delta: "+22%" },
      { label: "Coût / lead", value: "−28%", delta: "optimisé" },
    ],
    pipeline: [
      { label: "Nouveaux leads", value: "186", delta: "+16%" },
      { label: "En qualification", value: "72", delta: "+9%" },
      { label: "Opportunités", value: "34", delta: "+24%" },
    ],
  }[activeView];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-bright shadow-soft-lg">
      <div className="flex h-9 items-center gap-2 border-b border-border bg-muted/60 px-4">
        <span className="size-3 rounded-full bg-red-400" />
        <span className="size-3 rounded-full bg-amber-400" />
        <span className="size-3 rounded-full bg-emerald-400" />
        <span className="ml-auto hidden rounded-full border border-border bg-card px-2 py-1 text-[9px] font-medium text-muted-foreground sm:inline-flex">
          {t("dashboardLive")}
        </span>
      </div>

      <div className="grid min-h-[26rem] grid-cols-[3.5rem_1fr] sm:grid-cols-[7rem_1fr]">
        <aside className="border-e border-border bg-card/60 p-2 sm:p-3">
          <div className="mb-5 flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary sm:justify-start sm:gap-2">
            <LayoutDashboard className="size-4" />
            <span className="hidden text-[10px] font-semibold sm:inline">Mohtaoua</span>
          </div>
          <div className="space-y-2">
            <span className="mx-auto block h-2 w-6 rounded-full bg-primary/25 sm:mx-0 sm:w-16" />
            <span className="mx-auto block h-2 w-5 rounded-full bg-muted sm:mx-0 sm:w-12" />
            <span className="mx-auto block h-2 w-6 rounded-full bg-muted sm:mx-0 sm:w-14" />
            <span className="mx-auto block h-2 w-4 rounded-full bg-muted sm:mx-0 sm:w-10" />
          </div>
        </aside>

        <div className="min-w-0 p-3 sm:p-5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t("dashboardEyebrow")}</p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">{t("dashboardTitle")}</h3>
            </div>
            <div className="hidden items-center gap-1 rounded-lg border border-border bg-card px-2 py-1.5 text-[10px] text-muted-foreground sm:flex">
              <Activity className="size-3 text-emerald-500" />
              30 derniers jours
            </div>
          </div>

          <div className="mb-4 flex gap-1 rounded-xl bg-muted/70 p-1" role="tablist" aria-label={t("dashboardTabsLabel")}>
            {views.map((view) => (
              <button
                key={view}
                type="button"
                role="tab"
                aria-selected={activeView === view}
                onClick={() => setActiveView(view)}
                className={cn(
                  "flex-1 rounded-lg px-2 py-2 text-[10px] font-semibold transition-colors sm:text-xs",
                  activeView === view ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(`dashboardTabs.${view}`)}
              </button>
            ))}
          </div>

          <motion.div
            key={activeView}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            role="tabpanel"
          >
            <div className="grid grid-cols-3 gap-2">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-border bg-card p-2.5 transition-transform duration-300 hover:-translate-y-0.5 sm:p-3">
                  <p className="truncate text-[9px] text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-sm font-bold tracking-tight sm:text-base">{metric.value}</p>
                  <p className="mt-1 text-[9px] font-semibold text-emerald-600">{metric.delta}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-border bg-card p-3 sm:p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold">{t("dashboardChartTitle")}</span>
                <BarChart3 className="size-4 text-primary" />
              </div>
              <div className="flex h-28 items-end gap-1.5 sm:h-36">
                {[42, 54, 47, 68, 62, 78, 70, 88, 82, 96, 90, 100].map((height, index) => (
                  <motion.span
                    key={`${activeView}-${index}`}
                    initial={reducedMotion ? false : { scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: index * 0.025, duration: 0.35 }}
                    className="h-full flex-1 origin-bottom rounded-t bg-gradient-to-t from-primary/25 to-primary"
                    style={{ transform: `scaleY(${height / 100})` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[9px] text-muted-foreground">
                <span>01 Juin</span>
                <span>30 Juin</span>
              </div>
            </div>
          </motion.div>

          <div className="mt-3 flex items-center justify-between rounded-xl border border-primary/15 bg-primary/5 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
                <Users className="size-3.5" />
              </span>
              <span className="text-[10px] font-medium">{t("dashboardInsight")}</span>
            </div>
            <ArrowUpRight className="size-4 text-primary" />
          </div>
        </div>
      </div>

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 blur-2xl"
        animate={reducedMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <span className="sr-only">{t("dashboardViewCount", { count: activeIndex + 1 })}</span>
    </div>
  );
}
