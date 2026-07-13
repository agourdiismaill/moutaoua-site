import type { Testimonial } from "./types";

/** Structural metadata — text lives in messages/{locale}/testimonials.json */
export const testimonialMeta: (Pick<Testimonial, "id" | "rating"> & {
  city: string;
})[] = [
  { id: "t1", rating: 5, city: "Casablanca" },
  { id: "t2", rating: 5, city: "Rabat" },
  { id: "t3", rating: 5, city: "Marrakech" },
  { id: "t4", rating: 5, city: "Tanger" },
  { id: "t5", rating: 5, city: "Casablanca" },
  { id: "t6", rating: 5, city: "Agadir" },
  { id: "t7", rating: 5, city: "Fès" },
  { id: "t8", rating: 5, city: "Meknès" },
  { id: "t9", rating: 5, city: "Oujda" },
  { id: "t10", rating: 5, city: "Kenitra" },
];
