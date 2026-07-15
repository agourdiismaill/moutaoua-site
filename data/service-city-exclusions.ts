import type { ServiceSlug } from "./meta";
import type { TargetCity } from "./city-sectors";

/** Paires service × ville à exclure de la génération (optionnel) */
export const SERVICE_CITY_EXCLUSIONS: { service: ServiceSlug; ville: TargetCity }[] = [];

/**
 * Services généralistes qui ne doivent pas produire de pages service × ville.
 * Leur déclinaison locale est portée par les hubs /agences/[slug].
 */
export const SERVICE_CITY_EXCLUDED_SERVICES: ServiceSlug[] = [
  "agence-communication-maroc",
  "agence-marketing-digital-maroc",
  "agence-creative-maroc",
  "marketing-digital-maroc",
];
