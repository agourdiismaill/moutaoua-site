import fs from "fs";

const NEW_SLUG = "transformation-digitale-pme-maroc";
const NEW_GUIDES = ["seo-entreprise-maroc", "agence-digitale-maroc-guide"];

const guidesEn = {
  "seo-entreprise-maroc": {
    title: "SEO guide for businesses in Morocco",
    description: "Technical audit, content, link building and local SEO to rank on Google.",
    steps: [
      "Audit technical site health (speed, indexing, mobile)",
      "Identify commercial-intent keywords",
      "Create optimized pages per service and city",
      "Publish expert content regularly",
      "Earn quality local backlinks",
      "Track rankings and organic conversions",
    ],
    mistakes: [
      "Duplicating low-value content",
      "Neglecting local SEO (Google Business)",
      "Ignoring mobile speed",
    ],
    faqs: [
      { question: "How long for SEO results?", answer: "3 to 6 months for significant gains depending on competition." },
      { question: "SEO or Google Ads?", answer: "Both: Ads for immediacy, SEO for long term." },
    ],
  },
  "agence-digitale-maroc-guide": {
    title: "How to choose a digital agency in Morocco",
    description: "Criteria, questions to ask and red flags when selecting a 360° partner.",
    steps: [
      "Define business goals (leads, sales, awareness)",
      "Verify multi-channel expertise (marketing + web + tech)",
      "Request case studies in your industry",
      "Clarify pricing model and KPIs",
      "Start with an audit or pilot project",
      "Evaluate responsiveness and reporting transparency",
    ],
    mistakes: [
      "Choosing only on price",
      "Single-skill agency for 360° needs",
      "No reporting or defined KPIs",
    ],
    faqs: [
      { question: "Agency or freelancer?", answer: "A 360° agency covers more skills with a coordinated team." },
      { question: "Minimum budget?", answer: "From 8,000 MAD/month for active marketing, excluding media." },
    ],
  },
};

const guidesAr = {
  "seo-entreprise-maroc": {
    title: "دليل SEO للمؤسسات في المغرب",
    description: "تدقيق تقني ومحتوى وروابط وSEO محلي للظهور على Google.",
    steps: [
      "تدقيق الصحة التقنية للموقع (السرعة، الفهرسة، الجوال)",
      "تحديد الكلمات المفتاحية ذات النية التجارية",
      "إنشاء صفحات محسّنة لكل خدمة ومدينة",
      "نشر محتوى خبير بانتظام",
      "الحصول على روابط خلفية محلية جيدة",
      "متابعة الترتيب والتحويلات العضوية",
    ],
    mistakes: [
      "تكرار محتوى بلا قيمة",
      "إهمال SEO المحلي (Google Business)",
      "تجاهل سرعة الجوال",
    ],
    faqs: [
      { question: "كم من الوقت لنتائج SEO؟", answer: "3 إلى 6 أشهر حسب المنافسة." },
      { question: "SEO أم Google Ads؟", answer: "كلاهما: Ads للفوري، SEO للمدى الطويل." },
    ],
  },
  "agence-digitale-maroc-guide": {
    title: "كيفية اختيار وكالة رقمية في المغرب",
    description: "معايير وأسئلة وإشارات تحذيرية لاختيار شريك 360°.",
    steps: [
      "تحديد أهداف العمل (عملاء محتملون، مبيعات، وعي)",
      "التحقق من الخبرة متعددة القنوات (تسويق + ويب + تقنية)",
      "طلب دراسات حالة في قطاعكم",
      "توضيح نموذج التسعير ومؤشرات الأداء",
      "البدء بتدقيق أو مشروع تجريبي",
      "تقييم الاستجابة وشفافية التقارير",
    ],
    mistakes: [
      "الاختيار على السعر فقط",
      "وكالة أحادية المهارة لحاجة 360°",
      "غياب التقارير ومؤشرات الأداء",
    ],
    faqs: [
      { question: "وكالة أم مستقل؟", answer: "وكالة 360° تغطي مهارات أكثر بفريق منسق." },
      { question: "الحد الأدنى للميزانية؟", answer: "من 8 000 درهم/شهر للتسويق النشط، دون الإعلانات." },
    ],
  },
};

function walkReplace(obj) {
  if (typeof obj === "string") {
    return obj
      .replace(/centres de formation/gi, "entreprises au Maroc")
      .replace(/centre de formation/gi, "entreprise")
      .replace(/organisme de formation/gi, "entreprise")
      .replace(/organismes de formation/gi, "entreprises")
      .replace(/training centers?/gi, "businesses")
      .replace(/training center/gi, "business")
      .replace(/training sector/gi, "your industry")
      .replace(/secteur formation/gi, "tous secteurs")
      .replace(/formation X Casablanca/gi, "votre offre + ville")
      .replace(/apprenant/gi, "prospect")
      .replace(/learner persona/gi, "buyer persona")
      .replace(/cycles d'inscription/gi, "cycles de vente")
      .replace(/inscription/gi, "conversion")
      .replace(/inscriptions/gi, "conversions")
      .replace(/sessions démarrent sous-capacité/gi, "objectifs commerciaux sont manqués")
      .replace(/par formation/gi, "par offre")
      .replace(/by training program/gi, "by offer")
      .replace(/une formation/gi, "une offre")
      .replace(/votre formation/gi, "votre offre")
      .replace(/your training/gi, "your offer")
      .replace(/Formations recherchées/gi, "Offres recherchées")
      .replace(/CPL moyen formation/gi, "CPL moyen")
      .replace(/la plupart des centres/gi, "la plupart des entreprises")
      .replace(/most training centers/gi, "most businesses")
      .replace(/rentrée/gi, "lancement saisonnier")
      .replace(/back-to-school/gi, "seasonal launch")
      .replace(/prix de la formation/gi, "prix de l'offre")
      .replace(/training price/gi, "offer price");
  }
  if (Array.isArray(obj)) return obj.map(walkReplace);
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = walkReplace(v);
    return out;
  }
  return obj;
}

// Blog body broadening
for (const locale of ["fr", "en", "ar"]) {
  const path = `messages/${locale}/blog.json`;
  const blog = walkReplace(JSON.parse(fs.readFileSync(path, "utf8")));
  fs.writeFileSync(path, JSON.stringify(blog, null, 2) + "\n");
}

// Guides en/ar + broaden existing FR guides
const guidePatchesFr = {
  "meta-ads-centre-formation": {
    title: "Guide complet Meta Ads pour entreprises au Maroc",
    description: "De la stratégie au scaling : audiences, créatives, budget et optimisation pour tous secteurs.",
    steps: [
      "Définir l'offre et le persona acheteur",
      "Structurer le compte publicitaire par offre",
      "Créer des audiences froides et chaudes",
      "Produire des créatives vidéo et statiques",
      "Installer le tracking conversions (Pixel + CAPI)",
      "Lancer, analyser, optimiser chaque semaine",
    ],
  },
  "google-ads-centre-formation": {
    title: "Guide Google Ads pour entreprises au Maroc",
    description: "Search, Performance Max et landing pages pour capter les recherches à forte intention.",
    steps: [
      "Recherche de mots-clés à intention commerciale",
      "Créer une campagne Search par offre",
      "Rédiger des annonces avec extensions",
      "Déployer des landing pages dédiées",
      "Configurer le suivi conversions",
      "Optimiser enchères et mots-clés négatifs",
    ],
    mistakes: [
      "Mots-clés trop génériques",
      "Pas de page mobile optimisée",
      "Ignorer les termes de recherche réels",
    ],
  },
};

for (const locale of ["fr", "en", "ar"]) {
  const path = `messages/${locale}/guides.json`;
  const g = JSON.parse(fs.readFileSync(path, "utf8"));
  if (locale === "fr") {
    for (const [slug, patch] of Object.entries(guidePatchesFr)) {
      if (g.items[slug]) Object.assign(g.items[slug], patch);
    }
  } else if (locale === "en") {
    for (const [slug, data] of Object.entries(guidesEn)) {
      g.items[slug] = data;
    }
    if (g.items["meta-ads-centre-formation"]) {
      g.items["meta-ads-centre-formation"].title = "Complete Meta Ads guide for businesses in Morocco";
      g.items["meta-ads-centre-formation"].description =
        "From strategy to scaling: audiences, creatives, budget and optimization for all industries.";
    }
    if (g.items["google-ads-centre-formation"]) {
      g.items["google-ads-centre-formation"].title = "Google Ads guide for businesses in Morocco";
      g.items["google-ads-centre-formation"].description =
        "Search, Performance Max and landing pages for high-intent searches.";
    }
  } else {
    for (const [slug, data] of Object.entries(guidesAr)) {
      g.items[slug] = data;
    }
  }
  g.items = walkReplace(g.items);
  fs.writeFileSync(path, JSON.stringify(g, null, 2) + "\n");
}

// Compare broadening
for (const locale of ["fr", "en", "ar"]) {
  const path = `messages/${locale}/compare.json`;
  const c = walkReplace(JSON.parse(fs.readFileSync(path, "utf8")));
  const item = c.items["meta-ads-vs-google-ads"];
  if (item?.faqs?.[0]) {
    item.faqs[0].answer = item.faqs[0].answer.replace(/centres/gi, "entreprises");
  }
  if (item?.faqs?.[1]) {
    item.faqs[1].answer = item.faqs[1].answer.replace(/formation/gi, "offre");
  }
  if (item?.rows) {
    for (const row of item.rows) {
      if (row.criteria?.includes("formation")) row.criteria = row.criteria.replace(/formation/gi, "");
      if (row.google?.includes("Formation")) row.google = "Offres recherchées";
      if (row.google?.includes("training")) row.google = "Searched offers";
    }
  }
  fs.writeFileSync(path, JSON.stringify(c, null, 2) + "\n");
}

// Pages + results
for (const locale of ["fr", "en", "ar"]) {
  const pPath = `messages/${locale}/pages.json`;
  const p = JSON.parse(fs.readFileSync(pPath, "utf8"));
  if (locale === "fr") {
    p.results.metaTitle = "Résultats Marketing & Digital — Maroc";
    p.results.metaDescription =
      "Performances publicitaires et digitales pour entreprises de tous secteurs : Meta Ads, Google Ads, CRM et WhatsApp.";
    p.results.description =
      "Exemples de campagnes et tableaux de bord pour e-commerce, santé, immobilier, éducation et services B2B.";
    p.videos.metaDescription =
      "Études de cas filmées, témoignages et coulisses de nos missions marketing, web et design.";
    p.videos.description =
      "Vidéos corporate, témoignages clients et formats Reels produits pour nos partenaires.";
    p.caseStudies.metaTitle = "Études de cas — Agence Digitale Maroc";
    p.caseStudies.metaDescription =
      "Résultats concrets : marketing, web, logiciels et design pour entreprises marocaines.";
  } else if (locale === "en") {
    p.results.metaTitle = "Marketing & Digital Results — Morocco";
    p.results.metaDescription =
      "Ad performance and digital metrics for businesses across industries: Meta Ads, Google Ads, CRM and WhatsApp.";
    p.videos.metaDescription =
      "Filmed case studies, testimonials and behind-the-scenes of our marketing, web and design missions.";
    p.caseStudies.metaTitle = "Case Studies — Digital Agency Morocco";
  } else {
    p.results.metaTitle = "نتائج التسويق الرقمي — المغرب";
    p.caseStudies.metaTitle = "دراسات الحالة — وكالة رقمية المغرب";
  }
  fs.writeFileSync(pPath, JSON.stringify(p, null, 2) + "\n");

  const rPath = `messages/${locale}/results.json`;
  const r = walkReplace(JSON.parse(fs.readFileSync(rPath, "utf8")));
  if (r.items?.["meta-ads"]?.description) {
    r.items["meta-ads"].description = r.items["meta-ads"].description.replace(
      /centres de formation|training centers/gi,
      locale === "ar" ? "المؤسسات من جميع القطاعات" : locale === "en" ? "businesses across industries" : "entreprises de tous secteurs"
    );
  }
  fs.writeFileSync(rPath, JSON.stringify(r, null, 2) + "\n");
}

// data/blog.ts
let blogTs = fs.readFileSync("data/blog.ts", "utf8");
if (!blogTs.includes(NEW_SLUG)) {
  blogTs = blogTs.replace(
    '  "campagne-inscriptions-rentree-formation-maroc",\n] as const;',
    `  "campagne-inscriptions-rentree-formation-maroc",\n  "${NEW_SLUG}",\n] as const;`
  );
  blogTs = blogTs.replace(
    '"campagne-inscriptions-rentree-formation-maroc": "2026-07-12",\n};',
    `"campagne-inscriptions-rentree-formation-maroc": "2026-07-12",\n  "${NEW_SLUG}": "2026-07-13",\n};`
  );
}
for (const slug of NEW_GUIDES) {
  if (!blogTs.includes(`"${slug}"`)) {
    blogTs = blogTs.replace(
      '  "google-ads-centre-formation",\n] as const;',
      `  "google-ads-centre-formation",\n  "${slug}",\n] as const;`
    );
  }
}
fs.writeFileSync("data/blog.ts", blogTs);

// content-graph.ts
let cg = fs.readFileSync("data/content-graph.ts", "utf8");
if (!cg.includes(NEW_SLUG)) {
  cg = cg.replace(
    `"campagne-inscriptions-rentree-formation-maroc": {
    category: "acquisition",
    services: ["meta-ads", "google-ads", "landing-pages", "marketing-automation"],
    topics: ["acquisition", "rentree", "saisonnalite", "meta-ads", "google-ads"],
    priority: 92,
  },
};`,
    `"campagne-inscriptions-rentree-formation-maroc": {
    category: "acquisition",
    services: ["meta-ads", "google-ads", "landing-pages", "marketing-automation"],
    topics: ["acquisition", "rentree", "saisonnalite", "meta-ads", "google-ads"],
    priority: 92,
  },
  "${NEW_SLUG}": {
    category: "business",
    services: ["corporate-websites", "meta-ads", "crm-data", "ai-agents"],
    topics: ["transformation-digitale", "pme", "crm-data", "ai-agents"],
    priority: 94,
  },
};`
  );
}
if (!cg.includes("seo-entreprise-maroc")) {
  cg = cg.replace(
    `"google-ads-centre-formation": {
    services: ["google-ads"],
    topics: ["google-ads", "publicite", "acquisition"],
    priority: 88,
  },
};`,
    `"google-ads-centre-formation": {
    services: ["google-ads"],
    topics: ["google-ads", "publicite", "acquisition"],
    priority: 88,
  },
  "seo-entreprise-maroc": {
    services: ["seo", "corporate-websites"],
    topics: ["seo", "geo", "acquisition"],
    priority: 86,
  },
  "agence-digitale-maroc-guide": {
    services: ["meta-ads", "corporate-websites", "crm-data"],
    topics: ["business", "acquisition"],
    priority: 84,
  },
};`
  );
}
fs.writeFileSync("data/content-graph.ts", cg);

console.log("Continue reposition done.");
