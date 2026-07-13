/** Mapping manuel ville → secteur économique dominant (SEO local) */

export const TARGET_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Tanger",
  "Agadir",
  "Fès",
  "Meknès",
  "Oujda",
  "Kenitra",
] as const;

export type TargetCity = (typeof TARGET_CITIES)[number];

export const CITY_SLUGS: Record<TargetCity, string> = {
  Casablanca: "casablanca",
  Rabat: "rabat",
  Marrakech: "marrakech",
  Tanger: "tanger",
  Agadir: "agadir",
  Fès: "fes",
  Meknès: "meknes",
  Oujda: "oujda",
  Kenitra: "kenitra",
};

export const CITY_SECTORS = {
  Casablanca: "finance-industrie",
  Rabat: "administration-services",
  Marrakech: "tourisme-immobilier",
  Tanger: "logistique-industrie",
  Agadir: "tourisme-agro",
  Fès: "artisanat-commerce",
  Meknès: "industrie-agro",
  Oujda: "commerce-transfrontalier",
  Kenitra: "industrie-logistique",
} as const satisfies Record<TargetCity, string>;

export type CitySector = (typeof CITY_SECTORS)[TargetCity];
