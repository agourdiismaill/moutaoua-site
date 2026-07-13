"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { buildFaqSchema } from "@/lib/seo/schema";
import { getLocalizedFaqs } from "@/lib/i18n-content";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function FaqSection({ className }: { className?: string }) {
  const ts = useTranslations("sections.faq");
  const t = useTranslations("faq");
  const faqs = getLocalizedFaqs(t);

  return (
    <section id="faq" className={cn("section-pad", className)}>
      <JsonLdScript data={buildFaqSchema(faqs)} />
      <div className="container-max">
        <SectionHeading
          eyebrow={ts("eyebrow")}
          title={ts("title")}
          description={ts("description")}
          className="mb-16"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl rounded-3xl border border-border bg-card px-6 shadow-soft md:px-10"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="last:border-0">
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
