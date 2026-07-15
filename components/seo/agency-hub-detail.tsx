import { Suspense } from "react";
import { Check, MapPin } from "lucide-react";
import { AIOverview } from "@/components/seo/ai-overview";
import { AgencyCityServicesGrid } from "@/components/seo/agency-city-services-grid";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { SeoFaqSection } from "@/components/seo/faq-section";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { InternalLinkingSections } from "@/components/seo/internal-linking/internal-linking-sections";
import { ShareButtons } from "@/components/seo/share-buttons";
import { CtaSection } from "@/components/sections/cta-section";
import { buildServiceSchema, buildWebPageSchema } from "@/lib/seo/schema";
import type { AgencyHub } from "@/data/agency-hubs";
import type { ServiceCityCombo } from "@/data/service-city-combos";
import type { Service } from "@/data/types";
import type { AIOverviewContent, BreadcrumbItem } from "@/lib/seo/types";

type AgencyHubContent = {
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

type Labels = {
  share: string;
  aiOverview: string;
  what: string;
  who: string;
  benefits: string;
  topics: string;
  takeaways: string;
  readingTime: string;
  challenges: string;
  approach: string;
  servicesInCity: string;
  servicesInCityDescription: string;
};

type Props = {
  locale: string;
  hub: AgencyHub;
  content: AgencyHubContent;
  labels: Labels;
  breadcrumb: BreadcrumbItem[];
  pageUrl: string;
  services: Service[];
  cityServices: ServiceCityCombo[];
  getPillarTitle: (pillar: string) => string;
};

export function AgencyHubDetail({
  locale,
  hub,
  content,
  labels,
  breadcrumb,
  pageUrl,
  services,
  cityServices,
  getPillarTitle,
}: Props) {
  const schemaLocale =
    locale === "ar" ? "ar-MA" : locale === "en" ? "en-US" : "fr-MA";

  return (
    <article>
      <JsonLdScript
        data={[
          buildWebPageSchema({
            name: content.metaTitle,
            description: content.metaDescription,
            url: pageUrl,
            locale: schemaLocale,
          }),
          buildServiceSchema({
            name: content.h1,
            description: content.metaDescription,
            url: pageUrl,
            features: content.overview.topics,
            areaServedCity: hub.ville,
          }),
        ]}
      />

      <header className="section-pad pt-32 md:pt-40">
        <div className="container-max space-y-6">
          <Breadcrumb items={breadcrumb} />
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                <MapPin className="size-4" aria-hidden />
                {hub.ville}
              </span>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                {content.h1}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {content.intro}
              </p>
            </div>
            <ShareButtons url={pageUrl} title={content.metaTitle} label={labels.share} />
          </div>
        </div>
      </header>

      <section className="section-pad pt-0" aria-label={labels.aiOverview}>
        <div className="container-max">
          <AIOverview
            content={content.overview}
            labels={{
              title: labels.aiOverview,
              what: labels.what,
              who: labels.who,
              benefits: labels.benefits,
              topics: labels.topics,
              takeaways: labels.takeaways,
              readingTime: labels.readingTime,
            }}
          />
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-max max-w-4xl space-y-6">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">
              {labels.challenges}
            </h2>
            <ul className="space-y-4">
              {content.challenges.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">
              {labels.approach}
            </h2>
            <ul className="space-y-4">
              {content.approach.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <AgencyCityServicesGrid
        combos={cityServices}
        services={services}
        ville={hub.ville}
        title={labels.servicesInCity}
        description={labels.servicesInCityDescription}
        getPillarTitle={getPillarTitle}
      />

      <SeoFaqSection
        eyebrow="FAQ"
        title={`FAQ — ${content.h1}`}
        description={content.intro}
        faqs={content.faqs}
        className="pt-0"
      />

      <Suspense fallback={null}>
        <InternalLinkingSections
          type="agency-hub"
          slug={hub.slug}
          locale={locale}
        />
      </Suspense>

      <CtaSection />
    </article>
  );
}
