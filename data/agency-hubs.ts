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
