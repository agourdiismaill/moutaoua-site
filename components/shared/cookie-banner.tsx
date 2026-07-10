"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  COOKIE_CONSENT_KEY,
  notifyConsentUpdated,
} from "@/lib/cookie-consent";

export function CookieBanner() {
  const t = useTranslations("shared");
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    notifyConsentUpdated();
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    notifyConsentUpdated();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("cookieBannerTitle")}
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-border bg-card/95 p-4 shadow-soft-lg backdrop-blur-md md:p-5"
    >
      <div className="container-max flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {t.rich("cookieBannerMessage", {
            link: (chunks) => (
              <Link href="/legal/cookies" className="font-medium text-primary underline-offset-2 hover:underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
        <div className="flex shrink-0 gap-3">
          <Button size="sm" variant="outline" onClick={reject}>
            {t("cookieBannerReject")}
          </Button>
          <Button size="sm" onClick={accept}>
            {t("cookieBannerAccept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
