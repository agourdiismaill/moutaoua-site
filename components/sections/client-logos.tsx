"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";

export function ClientLogos() {
  const t = useTranslations("sections.clientLogos");
  const names = (t.raw("names") as string[] | undefined) ?? [];
  const reducedMotion = useReducedMotion();
  if (names.length === 0) return null;

  const logos = reducedMotion ? names : [...names, ...names];

  return (
    <section className="border-y border-border bg-surface-bright py-12">
      <div className="container-max">
        <p className="mb-2 text-center text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {t("heading")}
        </p>
        <p className="mb-8 text-center text-xs text-muted-foreground/80">
          {t("disclaimer")}
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          {reducedMotion ? (
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              {logos.map((name) => (
                <span
                  key={name}
                  className="select-none whitespace-nowrap text-xl font-bold tracking-tight text-muted-foreground/70"
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <motion.div
              className="flex w-max gap-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {logos.map((name, i) => (
                <span
                  key={name + i}
                  className="select-none whitespace-nowrap text-xl font-bold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  {name}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
