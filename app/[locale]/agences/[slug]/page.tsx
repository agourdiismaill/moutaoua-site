import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AgencyHubDetail } from "@/components/seo/agency-hub-detail";
import {
  AGENCY_HUBS,
  filterHubCityServices,
  getAgencyHub,
  isAgencyHubSlug,
} from "@/data/agency-hubs";
import { SERVICE_CITY_COMBOS } from "@/data/service-city-combos";
import { getLocalizedServices } from "@/lib/i18n-content";
import { buildPageUrl } from "@/lib/i18n-metadata";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import type { AIOverviewContent } from "@/lib/seo/types";
import { routing } from "@/i18n/routing";

type AgencyHubPageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  overview: AIOverviewContent;
  paragraphs: string[];
  challenges: string[];
  approach: string[];
  faqs: { question: string; answer: string }[];
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    AGENCY_HUBS.map(({ slug }) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const hub = getAgencyHub(slug);
  if (!hub) return {};

  const t = await getTranslations({ locale, namespace: "agencyHubPages" });
  const content = t.raw(
    `items.${hub.type}.${hub.villeSlug}`
  ) as AgencyHubPageContent;

  return buildSeoMetadata({
    locale,
    path: `/agences/${slug}`,
    title: content.metaTitle,
    description: content.metaDescription,
  });
}

export default async function AgencyHubPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isAgencyHubSlug(slug)) notFound();
  const hub = getAgencyHub(slug);
  if (!hub) notFound();

  const t = await getTranslations("agencyHubPages");
  const ts = await getTranslations("services");
  const tp = await getTranslations("pillars");
  const content = t.raw(
    `items.${hub.type}.${hub.villeSlug}`
  ) as AgencyHubPageContent;
  const services = getLocalizedServices(ts);
  const cityServices = filterHubCityServices(SERVICE_CITY_COMBOS, hub);
  const isCommunication = hub.type === "communication";
  const pageUrl = buildPageUrl(locale, `/agences/${slug}`);

  return (
    <AgencyHubDetail
      locale={locale}
      hub={hub}
      content={content}
      labels={{
        share: t("labels.share"),
        aiOverview: t("labels.aiOverview"),
        what: t("labels.what"),
        who: t("labels.who"),
        benefits: t("labels.benefits"),
        topics: t("labels.topics"),
        takeaways: t("labels.takeaways"),
        readingTime: t("labels.readingTime", { minutes: 6 }),
        challenges: isCommunication
          ? t("labels.challengesCommunication", { ville: hub.ville })
          : t("labels.challenges", { ville: hub.ville }),
        approach: t("labels.approach"),
        servicesInCity: isCommunication
          ? t("labels.servicesInCityCommunication", { ville: hub.ville })
          : t("labels.servicesInCity", { ville: hub.ville }),
        servicesInCityDescription: isCommunication
          ? t("labels.servicesInCityDescriptionCommunication", {
              ville: hub.ville,
            })
          : t("labels.servicesInCityDescription", { ville: hub.ville }),
      }}
      breadcrumb={[
        { label: t("labels.home"), href: "/" },
        { label: content.h1 },
      ]}
      pageUrl={pageUrl}
      services={services}
      cityServices={cityServices}
      getPillarTitle={(pillar) => tp(`items.${pillar}.title`)}
    />
  );
}
