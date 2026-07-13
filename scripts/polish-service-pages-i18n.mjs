#!/usr/bin/env node
/** Post-process EN/AR servicePages with marketing glossary fixes */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const enReplacements = [
  [/Restoration/g, "Restaurants"],
  [/restoration/g, "restaurants"],
  [/your offer and tunnel/g, "your offer and conversion funnel"],
  [/offer and tunnel/g, "offer and conversion funnel"],
  [/Health & well-being/g, "Health & wellness"],
  [/Meta ads Metadata/gi, "Meta Ads"],
  [/ads Metadata/gi, "Meta Ads"],
];

const arReplacements = [
  [/استعادة/g, "المطاعم والضيافة"],
  [/والنفق/g, "ومسار التحويل"],
  [/النفق/g, "مسار التحويل"],
  [/الإعلانات الوصفية/g, "إعلانات Meta"],
  [/الإعلان الوصفي/g, "إعلانات Meta"],
  [/إعلانات البيانات الوصفية/g, "إعلانات Meta"],
  [/ميتا إعلانات/g, "إعلانات Meta"],
  [/\bتعليم\b/g, "التعليم"],
  [/إعداد تقارير العملاء المحتملين وتكلفة العميل المحتمل \(CPL\) وعائد النفقات الإعلانية \(ROAS\)\./g, "تقارير العملاء المحتملين وCPL وROAS"],
  [/وكالة إعلانات فيسبوك وإنستجرام المغرب/g, "وكالة إعلانات فيسبوك وإنستغرام المغرب"],
];

function apply(file, pairs) {
  let text = readFileSync(file, "utf8");
  for (const [re, to] of pairs) text = text.replace(re, to);
  writeFileSync(file, text);
  console.log("Polished", file);
}

apply(join(root, "messages/en/servicePages.json"), enReplacements);
apply(join(root, "messages/ar/servicePages.json"), arReplacements);

// Also polish case studies / blog if needed
apply(join(root, "messages/en/caseStudies.json"), enReplacements);
apply(join(root, "messages/ar/caseStudies.json"), arReplacements);
apply(join(root, "messages/en/blog.json"), enReplacements);
apply(join(root, "messages/ar/blog.json"), arReplacements);

// Hand-fix key meta-ads SEO strings
const ar = JSON.parse(readFileSync(join(root, "messages/ar/servicePages.json"), "utf8"));
ar.items["meta-ads"].metaTitle = "إعلانات Meta Ads — وكالة فيسبوك وإنستغرام المغرب | Mohtaoua";
ar.items["meta-ads"].metaDescription =
  "حملات Meta Ads لتوليد عملاء محتملين مؤهلين في المغرب: تجارة إلكترونية، صحة، عقارات، تعليم. استهداف، إبداعات، تتبع CAPI وتحسين مستمر.";
ar.items["meta-ads"].howItWorks = [
  "تدقيق عرضكم ومسار التحويل",
  "استراتيجية إعلامية واختبارات إبداعية",
  "إطلاق وتحسين يومي للحملات",
  "تقارير العملاء المحتملين وCPL وROAS",
];
ar.items["meta-ads"].industries = [
  "التجارة الإلكترونية",
  "الصحة والعافية",
  "العقارات",
  "التعليم",
  "المطاعم والضيافة",
  "الشركات الناشئة",
];
writeFileSync(join(root, "messages/ar/servicePages.json"), JSON.stringify(ar, null, 2) + "\n");

const en = JSON.parse(readFileSync(join(root, "messages/en/servicePages.json"), "utf8"));
en.items["meta-ads"].metaTitle = "Meta Ads — Facebook & Instagram Advertising Agency Morocco | Mohtaoua";
en.items["meta-ads"].metaDescription =
  "Meta Ads campaigns to generate qualified leads in Morocco: e-commerce, healthcare, real estate, education and more. Targeting, creatives, CAPI tracking and ongoing optimization.";
en.items["meta-ads"].howItWorks = [
  "Audit of your offer and conversion funnel",
  "Media strategy and creative testing",
  "Launch and daily optimization",
  "Lead reporting, CPL and ROAS",
];
en.items["meta-ads"].industries = [
  "E-commerce",
  "Health & wellness",
  "Real estate",
  "Education",
  "Restaurants",
  "Startups",
];
writeFileSync(join(root, "messages/en/servicePages.json"), JSON.stringify(en, null, 2) + "\n");

console.log("SEO polish applied for meta-ads EN/AR");
