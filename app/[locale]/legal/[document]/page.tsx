import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/shared/reveal";
import { buildLocalizedAlternates, buildPageOpenGraph } from "@/lib/i18n-metadata";
import { withOgImage } from "@/lib/metadata";
import { legalDocuments, isLegalDocument, legalPaths, type LegalDocument } from "@/data/legal";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    legalDocuments.map((document) => ({ locale, document }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; document: string }>;
}): Promise<Metadata> {
  const { locale, document } = await params;
  if (!isLegalDocument(document)) return {};

  const t = await getTranslations({ locale, namespace: "legal" });
  const path = legalPaths[document];
  const title = t(`${document}.metaTitle`);
  const description = t(`${document}.metaDescription`);

  return withOgImage({
    title,
    description,
    alternates: buildLocalizedAlternates(locale, path),
    openGraph: buildPageOpenGraph(locale, path, title, description),
  }, locale);
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; document: string }>;
}) {
  const { locale, document } = await params;
  if (!isLegalDocument(document)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const sections = t.raw(`${document}.sections`) as Array<{
    title: string;
    paragraphs: string[];
  }>;

  const otherDocs = legalDocuments.filter((d) => d !== document);

  return (
    <article className="section-pad pt-32 md:pt-40">
      <div className="container-max mx-auto max-w-3xl">
        <Reveal className="mb-12 space-y-4">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            {t(`${document}.lastUpdated`)}
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {t(`${document}.title`)}
          </h1>
        </Reveal>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.05} className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16 flex flex-wrap gap-4 border-t border-border pt-8">
          {otherDocs.map((doc) => (
            <Link
              key={doc}
              href={legalPaths[doc as LegalDocument]}
              className="text-sm font-medium text-primary hover:underline"
            >
              {t(`${doc}.title`)}
            </Link>
          ))}
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
            {t("contactLink")}
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
