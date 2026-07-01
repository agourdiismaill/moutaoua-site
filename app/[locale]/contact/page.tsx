import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocalizedPageHeader, getPageMetadata } from "@/components/shared/localized-page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/data/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata("contact", locale);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");
  const ts = await getTranslations("shared");

  const infos = [
    { icon: Mail, label: t("email"), value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: t("phone"), value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    { icon: Phone, label: t("phone"), value: siteConfig.phone2, href: `tel:${siteConfig.phone2.replace(/\s/g, "")}` },
    { icon: MapPin, label: t("address"), value: ts("fullAddress") },
    { icon: Clock, label: t("hours"), value: t("hoursValue") },
  ];

  return (
    <>
      <LocalizedPageHeader page="contact" />

      <section className="section-pad pt-0">
        <div className="container-max grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-6">
            <div className="space-y-4">
              {infos.map((info, idx) => {
                const content = (
                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/40">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary">
                      <info.icon className="size-5" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">
                        {info.label}
                      </div>
                      <div className="font-medium tracking-tight">{info.value}</div>
                    </div>
                  </div>
                );
                return info.href ? (
                  <a key={idx} href={info.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={idx}>{content}</div>
                );
              })}
            </div>

            <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                title={t("mapTitle", { name: siteConfig.name })}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-7.665%2C33.535%2C-7.625%2C33.560&layer=mapnik"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
