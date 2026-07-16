/**
 * Namespaces safe to hydrate into NextIntlClientProvider.
 * Heavy SEO/page JSON (blog, servicePages, city hubs, etc.) stays server-only
 * via getRequestConfig / getTranslations — ~450KB+ saved on every mobile load.
 */
const CLIENT_MESSAGE_KEYS = [
  // core (messages/{locale}.json)
  "nav",
  "navMega",
  "hero",
  "contactForm",
  "localeSwitcher",
  "notFound",
  // shared UI modules
  "sections",
  "shared",
  "services",
  "faq",
  "pricing",
  "stats",
  "results",
  "videos",
  "testimonials",
  "caseStudies",
  "showcase",
  "portfolio",
  "pillars",
  "industries",
  "solutions",
] as const;

export type ClientMessageKey = (typeof CLIENT_MESSAGE_KEYS)[number];

export function pickClientMessages(
  messages: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  for (const key of CLIENT_MESSAGE_KEYS) {
    if (key in messages) {
      picked[key] = messages[key];
    }
  }
  return picked;
}
