import { Home, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="grid min-h-[70vh] place-items-center px-5 pt-20">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-[7rem] font-bold leading-none tracking-tight text-gradient">
          404
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="max-w-md text-muted-foreground">{t("description")}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="size-4" />
              {t("home")}
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">
              <ArrowLeft className="size-4" />
              {t("contact")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
