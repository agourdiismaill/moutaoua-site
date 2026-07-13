import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocalizedPageHeader, getPageMetadata } from "@/components/shared/localized-page-header";
import { Stats } from "@/components/sections/stats";
import { ClientLogos } from "@/components/sections/client-logos";
import { CtaSection } from "@/components/sections/cta-section";
import { Reveal } from "@/components/shared/reveal";
import { PageSeoShell } from "@/components/seo/page-seo-shell";
import { SolutionsGrid } from "@/components/sections/solutions-grid";
import { getPageOverview } from "@/lib/i18n-content";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata("about", locale);
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");
  const tServicePages = await getTranslations("servicePages");
  const tPageSeo = await getTranslations("pageSeo");
  const tNav = await getTranslations("nav");
  const values = t.raw("values") as string[];

  return (
    <>
      <LocalizedPageHeader page="about" />
      <PageSeoShell
        breadcrumb={[
          { label: tServicePages("labels.home"), href: "/" },
          { label: tNav("about") },
        ]}
        overview={getPageOverview(tPageSeo, "about")}
        overviewLabels={{
          title: tServicePages("labels.aiOverview"),
          what: tServicePages("labels.what"),
          who: tServicePages("labels.who"),
          benefits: tServicePages("labels.benefits"),
          topics: tServicePages("labels.topics"),
          takeaways: tServicePages("labels.takeaways"),
          readingTime: tServicePages("labels.readingTime"),
        }}
      />

      <section className="section-pad pt-0">
        <div className="container-max grid gap-10 lg:grid-cols-2">
          <Reveal className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl font-semibold tracking-tight">{t("missionTitle")}</h2>
            <p className="leading-relaxed text-muted-foreground">{t("missionText")}</p>
            <Button asChild variant="outline">
              <Link href="/contact">{tNav("freeAudit")}</Link>
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl font-semibold tracking-tight">{t("valuesTitle")}</h2>
            <ul className="space-y-3">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Stats />
      <ClientLogos />
      <SolutionsGrid />
      <CtaSection />
    </>
  );
}
