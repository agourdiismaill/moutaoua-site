import type { Testimonial } from "@/data/types";

export function filterTestimonialsByCity(
  testimonials: Testimonial[],
  ville: string
): Testimonial[] {
  const local = testimonials.filter((t) => t.city === ville);
  if (local.length > 0) return local;
  return testimonials.slice(0, 1);
}
