import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SERVICE_PILLARS } from "@/data/pillars";
import { serviceMeta } from "@/data/services";
import type { ServiceCityCombo } from "@/data/service-city-combos";
import type { Service } from "@/data/types";

type Props = {
  combos: ServiceCityCombo[];
  services: Service[];
  ville: string;
  title: string;
  description: string;
  getPillarTitle: (pillar: string) => string;
};

export function AgencyCityServicesGrid({
  combos,
  services,
  ville,
  title,
  description,
  getPillarTitle,
}: Props) {
  const serviceBySlug = new Map(services.map((service) => [service.slug, service]));
  const comboByService = new Map(combos.map((combo) => [combo.service, combo]));

  return (
    <section className="section-pad pt-0" aria-labelledby="city-services-heading">
      <div className="container-max">
        <div className="mb-10 max-w-3xl">
          <h2
            id="city-services-heading"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-10">
          {SERVICE_PILLARS.map((pillar) => {
            const items = serviceMeta
              .filter((meta) => meta.pillar === pillar)
              .map((meta) => {
                const combo = comboByService.get(meta.slug as ServiceCityCombo["service"]);
                const service = serviceBySlug.get(meta.slug);
                return combo && service ? { combo, service } : null;
              })
              .filter(
                (
                  item
                ): item is {
                  combo: ServiceCityCombo;
                  service: Service;
                } => Boolean(item)
              );

            if (items.length === 0) return null;

            return (
              <section key={pillar} aria-labelledby={`pillar-${pillar}`}>
                <h3
                  id={`pillar-${pillar}`}
                  className="mb-4 text-lg font-semibold tracking-tight"
                >
                  {getPillarTitle(pillar)}
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map(({ combo, service }) => (
                    <li key={combo.slug}>
                      <Link
                        href={`/services/${combo.slug}`}
                        className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium shadow-soft transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        <span>
                          {service.title} — {ville}
                        </span>
                        <ArrowRight
                          className="size-4 shrink-0 transition-transform group-hover:translate-x-1 rtl:rotate-180"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
