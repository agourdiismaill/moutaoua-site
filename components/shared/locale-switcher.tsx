"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-border bg-card/60 p-0.5",
        className
      )}
      role="group"
      aria-label={t("label")}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          aria-current={locale === code ? "true" : undefined}
          className={cn(
            "min-w-9 rounded-full px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-colors",
            locale === code
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {t(code)}
        </button>
      ))}
    </div>
  );
}
