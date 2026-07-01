import { getTranslations } from "next-intl/server";
import { Linkedin, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/routing";
import { BrandLogo } from "@/components/shared/brand-logo";
import { mainNav, siteConfig } from "@/data/site";
import { getLocalizedServices } from "@/lib/i18n-content";

export async function Footer() {
  const t = await getTranslations("footer");
  const ts = await getTranslations("services");
  const tshared = await getTranslations("shared");
  const services = getLocalizedServices(ts);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-bright">
      <div className="container-max grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="inline-flex">
            <BrandLogo size="md" collapsed={false} />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
          <div className="flex gap-2 pt-2">
            <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
              <Linkedin className="size-4" />
            </SocialLink>
            <SocialLink href={siteConfig.social.instagram} label="Instagram">
              <Instagram className="size-4" />
            </SocialLink>
            <SocialLink href={siteConfig.social.youtube} label="YouTube">
              <Youtube className="size-4" />
            </SocialLink>
          </div>
        </div>

        <nav className="space-y-4" aria-label={t("navigation")}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {t("navigation")}
          </h3>
          <ul className="space-y-2.5">
            <FooterNavLinks />
          </ul>
        </nav>

        <nav className="space-y-4" aria-label={t("services")}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {t("services")}
          </h3>
          <ul className="space-y-2.5">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {t("contact")}
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              {tshared("fullAddress")}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-primary" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-primary" />
              <a href={`tel:${siteConfig.phone2.replace(/\s/g, "")}`} className="hover:text-primary">
                {siteConfig.phone2}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-primary" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-max flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {year} {siteConfig.name}. {t("rights")}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/legal/privacy" className="hover:text-primary">{t("privacy")}</Link>
            <Link href="/legal/terms" className="hover:text-primary">{t("terms")}</Link>
            <Link href="/legal/cookies" className="hover:text-primary">{t("cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

async function FooterNavLinks() {
  const t = await getTranslations("nav");

  return (
    <>
      {mainNav.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {t(item.key)}
          </Link>
        </li>
      ))}
    </>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </a>
  );
}
