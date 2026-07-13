import type { ServiceCityCombo } from "@/data/service-city-combos";
import type { Service } from "@/data/types";

type ServiceCityTranslator = {
  (key: string): string;
  raw: (key: string) => unknown;
};

type SectorBlock = {
  label: string;
  context: string;
  challenges: string;
  opportunity: string;
};

type CityBlock = {
  localInsight: string;
  marketNote: string;
};

type PillarBlock = {
  intro: string;
  value: string;
};

export type ServiceCityPageContent = {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  paragraphs: string[];
  processTitle: string;
  processSteps: string[];
  featuresTitle: string;
  localProofTitle: string;
  localProofFallback: string;
  faqs: { question: string; answer: string }[];
  linkToService: string;
};

function interpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

export function buildServiceCityPageContent(
  t: ServiceCityTranslator,
  combo: ServiceCityCombo,
  service: Service
): ServiceCityPageContent {
  const vars = {
    service: service.title,
    ville: combo.ville,
    sector: (t.raw(`sectors.${combo.secteurDominant}.label`) as string) ?? combo.secteurDominant,
    description: service.longDescription ?? service.description,
  };

  const sectorRaw = t.raw(`sectors.${combo.secteurDominant}`) as SectorBlock;
  const cityRaw = t.raw(`cities.${combo.villeSlug}`) as CityBlock;
  const pillarKey = service.pillar ?? "marketing";
  const pillarRaw = t.raw(`pillars.${pillarKey}`) as PillarBlock;

  const sector: SectorBlock = {
    label: interpolate(sectorRaw.label, vars),
    context: interpolate(sectorRaw.context, vars),
    challenges: interpolate(sectorRaw.challenges, vars),
    opportunity: interpolate(sectorRaw.opportunity, vars),
  };
  const city: CityBlock = {
    localInsight: interpolate(cityRaw.localInsight, vars),
    marketNote: interpolate(cityRaw.marketNote, vars),
  };
  const pillar: PillarBlock = {
    intro: interpolate(pillarRaw.intro, vars),
    value: interpolate(pillarRaw.value, vars),
  };

  const metaTitle = interpolate(t("meta.title"), vars);
  const metaDescription = interpolate(t("meta.description"), vars);

  const paragraphs = [
    interpolate(t("content.intro"), vars),
    sector.context,
    city.localInsight,
    sector.challenges,
    pillar.intro,
    pillar.value,
    sector.opportunity,
    city.marketNote,
    interpolate(t("content.closing"), vars),
  ];

  const faqTemplates = t.raw("faqTemplates") as {
    question: string;
    answer: string;
  }[];

  return {
    h1: interpolate(t("labels.h1"), vars),
    metaTitle,
    metaDescription,
    intro: interpolate(t("content.lead"), vars),
    paragraphs,
    processTitle: interpolate(t("labels.process"), vars),
    processSteps: (t.raw("processSteps") as string[]).map((step) =>
      interpolate(step, vars)
    ),
    featuresTitle: interpolate(t("labels.features"), vars),
    localProofTitle: interpolate(t("labels.localProof"), vars),
    localProofFallback: interpolate(t("labels.localProofFallback"), vars),
    faqs: faqTemplates.map((faq) => ({
      question: interpolate(faq.question, vars),
      answer: interpolate(faq.answer, vars),
    })),
    linkToService: interpolate(t("labels.linkToService"), vars),
  };
}
