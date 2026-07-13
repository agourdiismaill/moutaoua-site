import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { buildFaqSchema } from "@/lib/seo/schema";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

type SeoFaqSectionProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  faqs: { question: string; answer: string }[];
  className?: string;
};

export function SeoFaqSection({
  title,
  description,
  eyebrow,
  faqs,
  className,
}: SeoFaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className={cn("section-pad", className)} aria-labelledby="faq-heading">
      <JsonLdScript data={buildFaqSchema(faqs)} />
      <div className="container-max">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mb-12"
        />
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card px-6 shadow-soft md:px-10">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={`${faq.question}-${index}`} value={`faq-${index}`} className="last:border-0">
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent forceMount>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
