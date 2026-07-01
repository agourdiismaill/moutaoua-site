import type { CaseStudy } from "./types";
import { CASE_STUDY_SLUGS } from "./meta";

export function getCaseStudySlugs(): string[] {
  return [...CASE_STUDY_SLUGS];
}

export function getFeaturedCaseStudies(studies: CaseStudy[]): CaseStudy[] {
  return studies.filter((c) => c.featured);
}
