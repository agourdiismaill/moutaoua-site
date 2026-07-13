"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { BarChart3, Check, Gem, Globe, Megaphone, Palette, Rocket, Smartphone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { getLocalizedPricingTiers } from "@/lib/i18n-content";
import { formatNumber } from "@/lib/utils";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { PricingTier } from "@/data/types";
import type { LucideIcon } from "lucide-react";

const packIcons: Record<string, LucideIcon> = {
  Rocket,
  BarChart3,
  Gem,
};

const adPlatforms = [
  { id: "meta", label: "Meta Ads", icon: MetaIcon },
  { id: "google", label: "Google Ads", icon: GoogleIcon },
  { id: "tiktok", label: "TikTok Ads", icon: TikTokIcon },
];

export function PricingSection({
  heading = true,
  className,
}: {
  heading?: boolean;
  className?: string;
}) {
  const ts = useTranslations("sections.pricing");
  const t = useTranslations("pricing");
  const pricingTiers = getLocalizedPricingTiers(t);

  return (
    <section id="pricing" className={cn("section-pad", className)}>
      <div className="container-max">
        {heading && (
          <SectionHeading
            eyebrow={ts("eyebrow")}
            title={ts("title")}
            description={ts("description")}
            className="mb-16"
          />
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
        >
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </motion.div>

        <AdPlatformsBar />
        <CapabilitiesBar />

        <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-8 text-center">
          <p className="text-base font-semibold text-foreground">{ts("quoteTitle")}</p>
          {ts("customNote") ? (
            <p className="mt-2 text-sm text-muted-foreground">{ts("customNote")}</p>
          ) : null}
          <Button asChild className="mt-6 uppercase tracking-wide" variant="primary">
            <Link href="/contact?devis=1">{ts("quoteCta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier }: { tier: PricingTier }) {
  const ts = useTranslations("sections.pricing");
  const PackIcon = packIcons[tier.icon] ?? Rocket;

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "relative flex flex-col rounded-2xl bg-white p-6 shadow-soft-lg transition-all duration-300 hover:-translate-y-1 md:p-8",
        tier.highlighted && "ring-2 ring-primary"
      )}
    >
      {tier.badge && (
        <span
          className={cn(
            "absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white",
            tier.highlighted ? "bg-zinc-900" : "bg-primary"
          )}
        >
          {tier.badge}
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-white">
          <PackIcon className="size-6" />
        </span>
        <div className="leading-none">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
            {ts("packLabel")}
          </span>
          <h3 className="mt-1 text-2xl font-extrabold uppercase tracking-tight text-primary">
            {tier.packLabel}
          </h3>
        </div>
      </div>

      <div className="mt-6 flex items-baseline gap-1 border-b border-zinc-200 pb-6">
        <span className="text-4xl font-extrabold tracking-tight text-zinc-900">
          {formatNumber(tier.price)}
        </span>
        <span className="text-xl font-bold text-primary">DH</span>
        <span className="text-sm text-zinc-500">{tier.period}</span>
      </div>

      {tier.featuresIntro && (
        <p className="mt-6 text-sm font-semibold text-zinc-900">{tier.featuresIntro}</p>
      )}

      <ul className={cn("flex-1 space-y-3", tier.featuresIntro ? "mt-3" : "mt-6")}>
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-white">
              <Check className="size-3 stroke-[3]" />
            </span>
            <span className="leading-snug text-zinc-700">{feature}</span>
          </li>
        ))}
      </ul>

      {tier.adBudgetNote && (
        <div className="mt-6 flex items-start gap-3 border-t border-zinc-200 pt-5 text-sm text-zinc-500">
          <Megaphone className="mt-0.5 size-5 shrink-0 text-primary" />
          <p>{ts("adBudgetNote")}</p>
        </div>
      )}

      <Button
        asChild
        className={cn(
          "mt-6 w-full uppercase tracking-wide",
          !tier.highlighted &&
            "border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100"
        )}
        variant={tier.highlighted ? "primary" : "outline"}
      >
        <Link href="/contact">{tier.cta}</Link>
      </Button>
    </motion.article>
  );
}

function AdPlatformsBar() {
  const ts = useTranslations("sections.pricing");

  return (
    <div className="mt-14 border-t border-border pt-10 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {ts("adPlatformsHeading")}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {adPlatforms.map(({ id, label, icon: Icon }) => (
          <div key={id} className="flex items-center gap-2.5 text-foreground">
            <Icon className="size-7 text-primary" />
            <span className="text-sm font-semibold tracking-tight">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CapabilitiesBar() {
  const ts = useTranslations("sections.pricing");
  const items = ts.raw("capabilities") as string[];
  const icons = [Globe, Rocket, Smartphone, Palette, Video, Megaphone];

  return (
    <div className="mt-10 border-t border-border pt-10 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {ts("capabilitiesHeading")}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {items.map((label, i) => {
          const Icon = icons[i] ?? Globe;
          return (
            <div key={label} className="flex items-center gap-2 text-foreground">
              <Icon className="size-5 text-primary" />
              <span className="text-sm font-medium tracking-tight">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MetaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.17 14.83c-2.5 0-4.33-1.92-4.33-4.58 0-2.66 1.83-4.58 4.33-4.58 1.25 0 2.25.5 2.92 1.33l-.75 1.08c-.5-.67-1.17-1-1.92-1-1.58 0-2.67 1.25-2.67 3.17s1.09 3.17 2.67 3.17c.83 0 1.5-.33 2-.92l.75 1.08c-.67.75-1.67 1.25-2.92 1.25zm5.5 0c-2.5 0-4.33-1.92-4.33-4.58 0-2.66 1.83-4.58 4.33-4.58 1.25 0 2.25.5 2.92 1.33l-.75 1.08c-.5-.67-1.17-1-1.92-1-1.58 0-2.67 1.25-2.67 3.17s1.09 3.17 2.67 3.17c.83 0 1.5-.33 2-.92l.75 1.08c-.67.75-1.67 1.25-2.92 1.25z" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}
