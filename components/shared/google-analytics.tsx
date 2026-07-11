"use client";

import * as React from "react";
import Script from "next/script";
import {
  CONSENT_UPDATED_EVENT,
  getCookieConsent,
} from "@/lib/cookie-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-F58Z3G6GFF";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function updateGtagConsent() {
  if (typeof window.gtag !== "function") return;

  const accepted = getCookieConsent() === "accepted";
  const status = accepted ? "granted" : "denied";

  window.gtag("consent", "update", {
    analytics_storage: status,
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
  });
}

export function GoogleAnalytics() {
  React.useEffect(() => {
    updateGtagConsent();
    window.addEventListener(CONSENT_UPDATED_EVENT, updateGtagConsent);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, updateGtagConsent);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
