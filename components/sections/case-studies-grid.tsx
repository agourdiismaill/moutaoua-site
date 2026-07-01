"use client";

import { motion } from "framer-motion";
import { CaseStudyCard } from "./case-study-card";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import type { CaseStudy } from "@/data/types";

export function CaseStudiesGrid({ studies }: { studies: CaseStudy[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {studies.map((study) => (
        <CaseStudyCard key={study.slug} study={study} />
      ))}
    </motion.div>
  );
}
