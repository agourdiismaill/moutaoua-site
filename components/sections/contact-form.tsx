"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Status = "idle" | "loading" | "success" | "error";

const PROJECT_TYPES = [
  "marketing",
  "web",
  "software",
  "mobile",
  "design",
  "photo-video",
  "events",
  "other",
] as const;

const PROJECT_TYPE_LABEL_KEYS: Record<(typeof PROJECT_TYPES)[number], string> = {
  marketing: "projectTypeMarketing",
  web: "projectTypeWeb",
  software: "projectTypeSoftware",
  mobile: "projectTypeMobile",
  design: "projectTypeDesign",
  "photo-video": "projectTypePhotoVideo",
  events: "projectTypeEvents",
  other: "projectTypeOther",
};

const selectClassName =
  "flex h-14 w-full rounded-xl border border-input bg-muted/60 px-4 text-base text-foreground transition-all focus-visible:border-primary focus-visible:bg-card focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15";

export function ContactForm({
  defaultProjectType,
}: {
  defaultProjectType?: string;
}) {
  const t = useTranslations("contactForm");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const initialProjectType =
    defaultProjectType && PROJECT_TYPES.includes(defaultProjectType as (typeof PROJECT_TYPES)[number])
      ? defaultProjectType
      : "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        if (payload?.error === "not_configured") {
          setErrorMessage(t("errorNotConfigured"));
        } else {
          setErrorMessage(t("errorGeneric"));
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage(t("errorGeneric"));
      setStatus("error");
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-16 text-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
              <CheckCircle2 className="size-8" />
            </span>
            <h3 className="text-2xl font-semibold tracking-tight">{t("successTitle")}</h3>
            <p className="max-w-sm text-muted-foreground">{t("successMessage")}</p>
            <Button variant="secondary" onClick={() => setStatus("idle")}>
              {t("sendAnother")}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label={t("name")} required>
                <Input id="name" name="name" required placeholder={t("namePlaceholder")} autoComplete="name" />
              </Field>
              <Field id="company" label={t("company")}>
                <Input id="company" name="company" placeholder={t("companyPlaceholder")} />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="email" label={t("email")} required>
                <Input id="email" name="email" type="email" required placeholder={t("emailPlaceholder")} autoComplete="email" />
              </Field>
              <Field id="phone" label={t("phone")}>
                <Input id="phone" name="phone" type="tel" placeholder={t("phonePlaceholder")} autoComplete="tel" />
              </Field>
            </div>

            <Field id="projectType" label={t("projectType")} required>
              <select
                id="projectType"
                name="projectType"
                required
                defaultValue={initialProjectType}
                className={selectClassName}
              >
                <option value="" disabled>
                  {t("projectTypePlaceholder")}
                </option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {t(PROJECT_TYPE_LABEL_KEYS[type])}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="budget" label={t("budget")}>
              <select id="budget" name="budget" defaultValue="" className={selectClassName}>
                <option value="" disabled>
                  {t("budgetPlaceholder")}
                </option>
                <option value="<10k">{t("budgetUnder10k")}</option>
                <option value="10-30k">{t("budget10to30k")}</option>
                <option value="30-100k">{t("budget30to100k")}</option>
                <option value=">100k">{t("budgetOver100k")}</option>
                <option value="undecided">{t("budgetUndecided")}</option>
              </select>
            </Field>

            <Field id="message" label={t("message")} required>
              <Textarea
                id="message"
                name="message"
                required
                placeholder={t("messagePlaceholder")}
              />
            </Field>

            {status === "error" && errorMessage && (
              <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {errorMessage}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  {t("submit")}
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              {t.rich("disclaimer", {
                privacyLink: (chunks) => (
                  <Link href="/legal/privacy" className="underline hover:text-primary">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="ms-0.5 text-primary">*</span>}
      </Label>
      {children}
    </div>
  );
}
