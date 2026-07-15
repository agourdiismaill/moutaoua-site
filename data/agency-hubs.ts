import {
  CITY_SECTORS,
  type CitySector,
  type TargetCity,
} from "./city-sectors";
import type { ServiceSlug } from "./meta";
import type { CitySlug, ServiceCityCombo } from "./service-city-combos";

export type AgencyHubType = "digitale" | "communication";

export interface AgencyHub {
  slug: string;
  type: AgencyHubType;
  ville: TargetCity;
  villeSlug: CitySlug;
  secteurDominant: CitySector;
}

/**
 * Services éligibles au hub communication : identité, contenus, production
 * et événementiel. Utilisé pour la grille filtrée et le lien réciproque.
 * Chaque slug est vérifié contre data/services.ts.
 */
export const COMMUNICATION_HUB_SERVICES: ServiceSlug[] = [
  // Identité & branding
  "brand-identity",
  "logo",
  "graphic-design",
  "brochure",
  "catalogue",
  "flyers",
  "packaging",
  "infographics",
  "presentation-design",
  // Contenus & social
  "content-marketing",
  "community-management",
  "social-media",
  // Production photo & vidéo
  "commercial-photography",
  "corporate-photography",
  "product-photography",
  "video-production",
  "drone",
  "reels",
  "motion-graphics",
  // Événements & activation
  "corporate-events",
  "conferences",
  "event-communication",
  "brand-activation",
  "booth-design",
  "training-events",
];

export const AGENCY_HUBS: AgencyHub[] = [
  {
    slug: "agence-digitale-casablanca",
    type: "digitale",
    ville: "Casablanca",
    villeSlug: "casablanca",
    secteurDominant: CITY_SECTORS.Casablanca,
  },
  {
    slug: "agence-digitale-rabat",
    type: "digitale",
    ville: "Rabat",
    villeSlug: "rabat",
    secteurDominant: CITY_SECTORS.Rabat,
  },
  {
    slug: "agence-digitale-marrakech",
    type: "digitale",
    ville: "Marrakech",
    villeSlug: "marrakech",
    secteurDominant: CITY_SECTORS.Marrakech,
  },
  {
    slug: "agence-digitale-tanger",
    type: "digitale",
    ville: "Tanger",
    villeSlug: "tanger",
    secteurDominant: CITY_SECTORS.Tanger,
  },
  {
    slug: "agence-digitale-agadir",
    type: "digitale",
    ville: "Agadir",
    villeSlug: "agadir",
    secteurDominant: CITY_SECTORS.Agadir,
  },
  {
    slug: "agence-digitale-fes",
    type: "digitale",
    ville: "Fès",
    villeSlug: "fes",
    secteurDominant: CITY_SECTORS.Fès,
  },
  {
    slug: "agence-communication-casablanca",
    type: "communication",
    ville: "Casablanca",
    villeSlug: "casablanca",
    secteurDominant: CITY_SECTORS.Casablanca,
  },
  {
    slug: "agence-communication-rabat",
    type: "communication",
    ville: "Rabat",
    villeSlug: "rabat",
    secteurDominant: CITY_SECTORS.Rabat,
  },
  {
    slug: "agence-communication-marrakech",
    type: "communication",
    ville: "Marrakech",
    villeSlug: "marrakech",
    secteurDominant: CITY_SECTORS.Marrakech,
  },
  {
    slug: "agence-communication-tanger",
    type: "communication",
    ville: "Tanger",
    villeSlug: "tanger",
    secteurDominant: CITY_SECTORS.Tanger,
  },
  {
    slug: "agence-communication-agadir",
    type: "communication",
    ville: "Agadir",
    villeSlug: "agadir",
    secteurDominant: CITY_SECTORS.Agadir,
  },
];

export const AGENCY_HUB_SLUGS = AGENCY_HUBS.map((hub) => hub.slug);

export function getAgencyHub(slug: string): AgencyHub | undefined {
  return AGENCY_HUBS.find((hub) => hub.slug === slug);
}

export function isCommunicationHubService(service: string): boolean {
  return COMMUNICATION_HUB_SERVICES.includes(service as ServiceSlug);
}

/**
 * Détermine le type de hub le plus pertinent pour un service donné.
 * Les services communication/créatifs pointent vers le hub communication.
 */
export function getAgencyHubTypeForService(service: string): AgencyHubType {
  if (
    service === "agence-communication-maroc" ||
    service === "agence-creative-maroc"
  ) {
    return "communication";
  }
  return isCommunicationHubService(service) ? "communication" : "digitale";
}

export function getAgencyHubByCity(
  villeSlug: CitySlug,
  type: AgencyHubType = "digitale"
): AgencyHub | undefined {
  return AGENCY_HUBS.find(
    (hub) => hub.type === type && hub.villeSlug === villeSlug
  );
}

/**
 * Hub réciproque pour une page service-ville : communication pour les
 * services créatifs/contenus, digitale sinon. Retombe sur le hub digitale
 * si aucun hub communication n'existe pour la ville.
 */
export function getAgencyHubForServiceCity(
  service: string,
  villeSlug: CitySlug
): AgencyHub | undefined {
  const type = getAgencyHubTypeForService(service);
  return (
    getAgencyHubByCity(villeSlug, type) ??
    getAgencyHubByCity(villeSlug, "digitale")
  );
}

/**
 * Grille de services d'un hub : tous les services de la ville pour un hub
 * digitale, uniquement les services communication pour un hub communication.
 */
export function filterHubCityServices(
  combos: ServiceCityCombo[],
  hub: AgencyHub
): ServiceCityCombo[] {
  const cityCombos = combos.filter((combo) => combo.villeSlug === hub.villeSlug);
  if (hub.type === "digitale") return cityCombos;
  return cityCombos.filter((combo) => isCommunicationHubService(combo.service));
}

export function isAgencyHubSlug(slug: string): boolean {
  return AGENCY_HUB_SLUGS.includes(slug);
}
