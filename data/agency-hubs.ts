import {
  CITY_SECTORS,
  type CitySector,
  type TargetCity,
} from "./city-sectors";
import type { CitySlug } from "./service-city-combos";

export type AgencyHubType = "digitale" | "communication";

export interface AgencyHub {
  slug: string;
  type: AgencyHubType;
  ville: TargetCity;
  villeSlug: CitySlug;
  secteurDominant: CitySector;
}

export const AGENCY_HUBS: AgencyHub[] = [
  {
    slug: "agence-digitale-casablanca",
    type: "digitale",
    ville: "Casablanca",
    villeSlug: "casablanca",
    secteurDominant: CITY_SECTORS.Casablanca,
  },
];

export const AGENCY_HUB_SLUGS = AGENCY_HUBS.map((hub) => hub.slug);

export function getAgencyHub(slug: string): AgencyHub | undefined {
  return AGENCY_HUBS.find((hub) => hub.slug === slug);
}

export function getAgencyHubByCity(villeSlug: CitySlug): AgencyHub | undefined {
  return AGENCY_HUBS.find(
    (hub) => hub.type === "digitale" && hub.villeSlug === villeSlug
  );
}

export function isAgencyHubSlug(slug: string): boolean {
  return AGENCY_HUB_SLUGS.includes(slug);
}
