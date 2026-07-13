"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_PILLARS } from "@/data/pillars";
import { getServicesByPillar } from "@/data/services";
import { FEATURED_INDUSTRY_SLUGS } from "@/data/industries";
import { AnimatePresence, motion } from "framer-motion";

type MegaKey = "services" | "industries";

export function NavMegaMenu({
  menuKey,
  label,
  href,
  active,
}: {
  menuKey: MegaKey;
  label: string;
  href: string;
  active: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const tp = useTranslations("pillars");
  const ts = useTranslations("services");
  const ti = useTranslations("industries");
  const tnav = useTranslations("navMega");

  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <li
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <Link
        href={href}
        className={cn(
          "relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors",
          active || open ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {(active || open) && (
          <motion.span
            className="absolute inset-0 -z-10 rounded-full bg-surface-container"
          />
        )}
        {label}
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute start-0 top-full z-50 mt-2 w-[min(100vw-2rem,40rem)] rounded-2xl border border-border bg-card p-4 shadow-soft-lg"
          >
            {menuKey === "services" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {SERVICE_PILLARS.map((pillar) => {
                    const slugs = getServicesByPillar(pillar).slice(0, 2);
                    return (
                      <div key={pillar}>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {tp(`items.${pillar}.title`)}
                        </p>
                        <ul className="space-y-1">
                          {slugs.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                className="block rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted hover:text-primary"
                              >
                                {ts(`items.${s.slug}.title`)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href="/services"
                  className="block rounded-lg border border-border px-3 py-2 text-center text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                  {tnav("viewAllServices")}
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                {FEATURED_INDUSTRY_SLUGS.map((slug) => (
                  <Link
                    key={slug}
                    href={`/industries/${slug}`}
                    className="block rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted hover:text-primary"
                  >
                    {ti(`items.${slug}.title`)}
                  </Link>
                ))}
                <Link
                  href="/industries"
                  className="mt-2 block rounded-lg border border-border px-3 py-2 text-center text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                  {tnav("viewAllIndustries")}
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
