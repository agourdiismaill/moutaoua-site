"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { BrandLogo } from "@/components/shared/brand-logo";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/data/site";
import { NavMegaMenu } from "@/components/layout/nav-mega-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-nav border-b border-border/70 shadow-soft"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-max flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex shrink-0 items-center transition-transform active:scale-95"
        >
          <BrandLogo size="md" collapsed={scrolled} />
        </Link>

        <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 px-2 xl:flex">
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            if (item.key === "services" || item.key === "solutions") {
              return (
                <NavMegaMenu
                  key={item.href}
                  menuKey={item.key}
                  label={t(item.key)}
                  href={item.href}
                  active={active}
                />
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium tracking-tight transition-colors",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-container"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {t(item.key)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <LocaleSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          <Button asChild size="sm" className="hidden whitespace-nowrap sm:inline-flex">
            <Link href="/contact">{t("freeAudit")}</Link>
          </Button>
          <button
            type="button"
            aria-label={t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-border bg-card/60 xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-nav overflow-hidden border-b border-border xl:hidden"
          >
            <ul className="container-max flex flex-col gap-1 py-4">
              {mainNav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        active
                          ? "bg-surface-container text-primary"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
              <li className="px-4 pt-2">
                <LocaleSwitcher className="w-full justify-center" />
              </li>
              <li className="pt-2">
                <Button asChild className="w-full">
                  <Link href="/contact">{t("requestAudit")}</Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
