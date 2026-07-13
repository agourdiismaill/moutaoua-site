import type { ServiceSlug } from "./meta";
import type { TargetCity } from "./city-sectors";

/** Paires service × ville à exclure de la génération (optionnel) */
export const SERVICE_CITY_EXCLUSIONS: { service: ServiceSlug; ville: TargetCity }[] = [];
