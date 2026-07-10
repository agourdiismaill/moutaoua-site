export const COOKIE_CONSENT_KEY = "mohtaoua-cookie-consent";
export const CONSENT_UPDATED_EVENT = "mohtaoua:cookie-consent";

export type CookieConsent = "accepted" | "rejected";

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsent() === "accepted";
}

export function notifyConsentUpdated(): void {
  window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
}
