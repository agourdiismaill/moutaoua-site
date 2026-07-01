import type { Testimonial } from "./types";

/** Structural metadata — text lives in messages/{locale}/testimonials.json */
export const testimonialMeta: Pick<Testimonial, "id" | "rating">[] = [
  { id: "t1", rating: 5 },
  { id: "t2", rating: 5 },
  { id: "t3", rating: 5 },
  { id: "t4", rating: 5 },
  { id: "t5", rating: 5 },
  { id: "t6", rating: 5 },
];
