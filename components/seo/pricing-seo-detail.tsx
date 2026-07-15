import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { AIOverview } from "@/components/seo/ai-overview";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { SeoFaqSection } from "@/components/seo/faq-section";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { CtaSection } from "@/components/sections/cta-section";
import {
  buildFaqSchema,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import type { PricingPage, PricingTierId } from "@/data/pricing-pages";
import type { AIOverviewContent, BreadcrumbItem } from "@/lib/seo/types";

type TierContent = {
  name: string;
  description: string;
  includes: string[];
};

type PricingPageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  overview: AIOverviewContent;
  factorsTitle: string;
  factors: string[];
  tiers: Record<PricingTierId, TierContent>;
  budgetNotes?: {
    mediaBudget?: string;
    agencyFees?: string;
  };
  disclaimer: string;
  contextLinks: {
    service: string;
    packs: string;
  };
  faqs: { question: string; answer: string }[];
};

type Labels = {
  aiOverview: string;
  what: string;
  who: string;
  benefits: string;
  topics: string;
  takeaways: string;
  readingTime: string;
  indicativePrice: string;
  perMonth: string;
  perProject: string;
  mediaBudgetPerMonth: string;
  included: string;
  faq: string;
};

type Props = {
  locale: string;
  page: PricingPage;
  content: PricingPageContent;
  labels: Labels;
  breadcrumb: BreadcrumbItem[];
  pageUrl: string;
  formatPrice: (min: number, max: number) => string;
};

export function PricingSeoDetail({
  locale,
  page,
  content,
  labels,
  breadcrumb,
  pageUrl,
  formatPrice,
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
            features: content.factors,
          }),
          buildFaqSchema(content.faqs),
        ]}
      />

      <header className="section-pad pt-32 md:pt-40">
        <div className="container-max space-y-6">
          <Breadcrumb items={breadcrumb} />
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {content.h1}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {content.intro}
          </p>
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
          <h2 className="text-2xl font-semibold tracking-tight">
            {content.factorsTitle}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {content.factors.map((factor) => (
              <li
                key={factor}
                className="flex gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm text-muted-foreground"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {factor}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad pt-0">
        {content.budgetNotes?.mediaBudget ? (
          <div className="container-max mb-6 max-w-4xl space-y-4">
            <p className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-foreground">
              {content.budgetNotes.mediaBudget}
            </p>
            {content.budgetNotes.agencyFees ? (
              <p className="rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
                {content.budgetNotes.agencyFees}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="container-max grid gap-6 lg:grid-cols-3">
          {page.tiers.map((tier) => {
            const tierContent = content.tiers[tier.id];
            const periodLabel =
              page.budgetScope === "media-monthly"
                ? labels.mediaBudgetPerMonth
                : tier.period === "month"
                  ? labels.perMonth
                  : labels.perProject;
            return (
              <section
                key={tier.id}
                className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft"
              >
                <h2 className="text-xl font-semibold tracking-tight">
                  {tierContent.name}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tierContent.description}
                </p>
                <p className="mt-6 text-2xl font-bold tracking-tight text-primary">
                  {formatPrice(tier.minMad, tier.maxMad)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {labels.indicativePrice} · {periodLabel}
                </p>
                <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {labels.included}
                </h3>
                <ul className="mt-4 space-y-3">
                  {tierContent.includes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
        <p className="container-max mt-8 max-w-4xl text-sm leading-relaxed text-muted-foreground">
          {content.disclaimer}
        </p>
      </section>

      <section className="section-pad pt-0">
        <div className="container-max max-w-4xl">
          <p className="rounded-3xl border border-border bg-surface-bright p-8 leading-relaxed text-muted-foreground">
            <Link
              href={`/services/${page.primaryService}`}
              className="font-medium text-primary hover:underline"
            >
              {content.contextLinks.service}
            </Link>
            {" · "}
            <Link href="/pricing" className="font-medium text-primary hover:underline">
              {content.contextLinks.packs}
            </Link>
          </p>
        </div>
      </section>

      <SeoFaqSection title={labels.faq} faqs={content.faqs} className="pt-0" />

      <CtaSection />
    </article>
  );
}
