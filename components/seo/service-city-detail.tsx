import type { ReactNode } from "react";
import { Star, Quote, Check, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Icon } from "@/components/shared/icon";
import { AvatarInitials } from "@/components/shared/avatar-initials";
import { CtaSection } from "@/components/sections/cta-section";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { SeoFaqSection } from "@/components/seo/faq-section";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { ShareButtons } from "@/components/seo/share-buttons";
import { buildServiceSchema, buildWebPageSchema, buildFaqSchema } from "@/lib/seo/schema";
import { buildServiceCityPageContent } from "@/lib/service-city/content";
import { filterTestimonialsByCity } from "@/lib/service-city/testimonials";
import {
  getAgencyHubForServiceCity,
  getAgencyHubTypeForService,
} from "@/data/agency-hubs";
import type { ServiceCityCombo } from "@/data/service-city-combos";
import type { Service, Testimonial } from "@/data/types";
import type { BreadcrumbItem } from "@/lib/seo/types";

type ServiceCityTranslator = {
  (key: string, values?: Record<string, string | number>): string;
  raw: (key: string) => unknown;
};

type Props = {
  locale: string;
  combo: ServiceCityCombo;
  service: Service;
  testimonials: Testimonial[];
  breadcrumb: BreadcrumbItem[];
  pageUrl: string;
  t: ServiceCityTranslator;
  tPages: ServiceCityTranslator;
  children?: ReactNode;
};

export function ServiceCityDetail({
  locale,
  combo,
  service,
  testimonials,
  breadcrumb,
  pageUrl,
  t,
  tPages,
  children,
}: Props) {
  const content = buildServiceCityPageContent(t, combo, service);
  const localTestimonials = filterTestimonialsByCity(testimonials, combo.ville);
  const hubType = getAgencyHubTypeForService(combo.service);
  const agencyHub = getAgencyHubForServiceCity(combo.service, combo.villeSlug);
  const hreflangLocale =
    locale === "ar" ? "ar-MA" : locale === "en" ? "en-US" : "fr-MA";

  return (
    <article>
      <JsonLdScript
        data={[
          buildWebPageSchema({
            name: content.metaTitle,
            description: content.metaDescription,
            url: pageUrl,
            locale: hreflangLocale,
          }),
          buildServiceSchema({
            name: `${service.title} — ${combo.ville}`,
            description: content.metaDescription,
            url: pageUrl,
            features: service.features,
            areaServedCity: combo.ville,
          }),
          buildFaqSchema(content.faqs),
        ]}
      />

      <header className="section-pad pt-32 md:pt-40">
        <div className="container-max space-y-6">
          <Breadcrumb items={breadcrumb} />
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary">
                <Icon name={service.icon} className="size-7" />
              </span>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                {content.h1}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {content.intro}
              </p>
            </div>
            <ShareButtons
              url={pageUrl}
              title={content.metaTitle}
              label={tPages("labels.share")}
            />
          </div>
        </div>
      </header>

      <section className="section-pad pt-0">
        <div className="container-max max-w-3xl space-y-6">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {agencyHub ? (
        <section
          className="section-pad pt-0"
          aria-label={t(`localContext.${hubType}.title`)}
        >
          <div className="container-max">
            <p className="rounded-3xl border border-border bg-surface-bright p-8 leading-relaxed text-muted-foreground">
              {t(`localContext.${hubType}.prefix`, {
                service: service.title,
                ville: combo.ville,
              })}{" "}
              <Link
                href={`/agences/${agencyHub.slug}`}
                className="font-medium text-primary hover:underline"
              >
                {t(`localContext.${hubType}.agencyLink`, { ville: combo.ville })}
              </Link>
              .
            </p>
          </div>
        </section>
      ) : null}

      <section className="section-pad pt-0">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">
              {content.processTitle}
            </h2>
            <ol className="space-y-4">
              {content.processSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-2xl border border-border bg-background p-5"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </section>
          <section className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">
              {content.featuresTitle}
            </h2>
            <ul className="space-y-3">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${combo.service}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              {content.linkToService}
              <ArrowRight className="size-4" />
            </Link>
          </section>
        </div>
      </section>

      <section className="section-pad pt-0" aria-label={content.localProofTitle}>
        <div className="container-max">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">
            {content.localProofTitle}
          </h2>
          {localTestimonials.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {localTestimonials.map((item) => (
                <figure
                  key={item.id}
                  className="rounded-2xl border border-border bg-card p-8 shadow-soft"
                >
                  <Quote className="mb-4 size-8 text-primary/30" />
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-pretty leading-relaxed text-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <AvatarInitials name={item.author} size="lg" />
                    <div>
                      <div className="font-semibold tracking-tight">{item.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.role} · {item.company}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">{content.localProofFallback}</p>
          )}
        </div>
      </section>

      <SeoFaqSection
        eyebrow="FAQ"
        title={`FAQ — ${content.h1}`}
        description={content.intro}
        faqs={content.faqs}
      />

      {children}

      <CtaSection />
    </article>
  );
}
