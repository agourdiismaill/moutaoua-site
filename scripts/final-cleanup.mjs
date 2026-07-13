import fs from "fs";

const PATCHED = new Set([
  "meta-ads", "google-ads", "marketing-automation", "landing-pages", "social-media", "crm-data",
  "tiktok-ads", "seo", "geo", "e-commerce", "brand-identity", "custom-software", "ai-agents",
  "video-production", "corporate-websites",
]);

const pillarContent = {
  marketing: {
    problem: (t) => `Votre acquisition digitale manque de structure : budget gaspillé, leads peu qualifiés ou canaux mal exploités pour ${t}.`,
    solution: (t) => `Nous déployons une stratégie ${t} data-driven avec ciblage, créatives et optimisation continue pour tous secteurs au Maroc.`,
    howItWorks: ["Audit offre et tunnel", "Stratégie média et contenu", "Lancement multi-canal", "Reporting KPIs business"],
  },
  web: {
    problem: (t) => `Votre présence web (${t}) ne convertit pas ou ne reflète pas le niveau de votre entreprise.`,
    solution: (t) => `Conception et développement ${t} premium : UX, performance, SEO et intégrations métier.`,
    howItWorks: ["Cadrage UX et arborescence", "Design et prototypage", "Développement et tests", "Lancement et optimisation"],
  },
  software: {
    problem: (t) => `Vos processus métier sont freinés par des outils inadaptés — vous avez besoin de ${t}.`,
    solution: (t) => `Solutions ${t} sur mesure : architecture scalable, intégrations API et accompagnement au déploiement.`,
    howItWorks: ["Analyse fonctionnelle", "Architecture technique", "Développement agile", "Déploiement et support"],
  },
  mobile: {
    problem: (t) => `Vos clients et équipes attendent une expérience mobile fluide — ${t} est un levier de croissance.`,
    solution: (t) => `Applications ${t} natives ou cross-platform, performantes et alignées sur votre marque.`,
    howItWorks: ["Spécifications et UX mobile", "Design UI", "Développement et QA", "Publication stores et maintenance"],
  },
  creative: {
    problem: (t) => `Votre image visuelle (${t}) manque de cohérence et ne différencie pas votre marque.`,
    solution: (t) => `Création ${t} premium : direction artistique, déclinaisons multicanal et guidelines.`,
    howItWorks: ["Brief et positionnement", "Exploration créative", "Production et déclinaisons", "Livraison fichiers sources"],
  },
  "photo-video": {
    problem: (t) => `Votre contenu visuel (${t}) est insuffisant pour convaincre et performer en publicité.`,
    solution: (t) => `Production ${t} professionnelle : tournage, post-production et formats adaptés à chaque canal.`,
    howItWorks: ["Brief créatif", "Préparation et tournage", "Montage et retouches", "Livraison multi-formats"],
  },
  events: {
    problem: (t) => `Vos événements (${t}) manquent d'impact digital et de cohérence de marque.`,
    solution: (t) => `Conception et exécution ${t} : scénographie, communication et activation de marque.`,
    howItWorks: ["Concept et planning", "Design et production", "Coordination jour J", "Bilan et contenus post-événement"],
  },
};

const pillarIndustries = {
  marketing: ["E-commerce", "Santé", "Immobilier", "Éducation", "Retail", "Startups"],
  web: ["E-commerce", "Services B2B", "Immobilier", "Santé", "Hôtellerie", "Industrie"],
  software: ["Industrie", "Logistique", "Santé", "Services B2B", "Éducation", "Retail"],
  mobile: ["Startups", "E-commerce", "Santé", "Services", "Hôtellerie", "Retail"],
  creative: ["Retail", "Hôtellerie", "Restauration", "Immobilier", "Startups", "Événements"],
  "photo-video": ["Immobilier", "Hôtellerie", "Retail", "Événements", "Industrie", "Éducation"],
  events: ["Corporate", "Industrie", "Éducation", "Retail", "Hôtellerie", "Tech"],
};

const slugPillar = {};
const servicesTs = fs.readFileSync("data/services.ts", "utf8");
let currentPillar = "marketing";
for (const line of servicesTs.split("\n")) {
  const pm = line.match(/pillar: "([^"]+)"/);
  if (pm) currentPillar = pm[1];
  const sm = line.match(/slug: "([^"]+)"/);
  if (sm) slugPillar[sm[1]] = currentPillar;
}

function defaultFaqs(title) {
  return [
    { question: `Pourquoi Mohtaoua pour ${title} ?`, answer: "Agence digitale premium 360° au Maroc : stratégie, exécution et résultats mesurables pour tous secteurs." },
    { question: "Quel délai de réalisation ?", answer: "De 2 semaines à 3 mois selon le périmètre. Planning défini après audit gratuit." },
    { question: "Travaillez-vous avec mon secteur ?", answer: "Oui. Nous accompagnons des entreprises de 15+ secteurs au Maroc." },
    { question: "Comment démarrer ?", answer: "Demandez un audit gratuit — réponse sous 24h avec plan d'action concret." },
  ];
}

function buildEnrichedPage(slug, svc, pillar) {
  const title = svc.title;
  const pc = pillarContent[pillar] ?? pillarContent.marketing;
  return {
    metaTitle: `${title} — Agence Digitale 360° Maroc`,
    metaDescription: `${svc.description} Mohtaoua accompagne les entreprises de tous secteurs au Maroc.`,
    overview: {
      what: svc.longDescription,
      who: `Dirigeants et équipes marketing/tech qui veulent un partenaire expert en ${title.toLowerCase()}.`,
      benefits: svc.features.slice(0, 3),
      topics: svc.features,
      takeaways: [
        `Expertise ${title} au Maroc`,
        "Approche orientée résultats business",
        "Audit gratuit sous 24h",
      ],
    },
    problem: pc.problem(title.toLowerCase()),
    solution: pc.solution(title.toLowerCase()),
    howItWorks: pc.howItWorks,
    industries: pillarIndustries[pillar] ?? pillarIndustries.marketing,
    faqs: defaultFaqs(title),
  };
}

// Enrich non-patched service pages
for (const locale of ["fr", "en", "ar"]) {
  const services = JSON.parse(fs.readFileSync(`messages/${locale}/services.json`, "utf8"));
  const spPath = `messages/${locale}/servicePages.json`;
  const sp = JSON.parse(fs.readFileSync(spPath, "utf8"));

  for (const [slug, svc] of Object.entries(services.items)) {
    if (PATCHED.has(slug)) continue;
    const pillar = slugPillar[slug] ?? "marketing";
    sp.items[slug] = buildEnrichedPage(slug, svc, pillar);
    if (locale !== "fr") {
      sp.items[slug].metaTitle = `${svc.title} — Mohtaoua`;
      sp.items[slug].metaDescription = svc.description;
      sp.items[slug].overview.what = svc.longDescription;
    }
  }

  sp.generic = {
    problem: "Votre entreprise a besoin d'une expertise digitale de haut niveau pour se démarquer sur le marché marocain.",
    solution: "Mohtaoua conçoit et déploie des solutions sur mesure — marketing, web, logiciels et design — pilotées par la data.",
    howItWorks: ["Audit et cadrage stratégique", "Conception et production", "Déploiement et lancement", "Optimisation continue"],
    industries: ["PME & startups", "E-commerce", "Santé", "Immobilier", "Éducation", "Industrie"],
    faqs: [
      { question: "Comment démarrer avec Mohtaoua ?", answer: "Demandez un audit gratuit. Notre équipe vous recontacte sous 24h avec un plan d'action concret." },
      { question: "Travaillez-vous avec tous les secteurs ?", answer: "Oui. Mohtaoua est une agence digitale 360° pour entreprises de tous secteurs au Maroc." },
      { question: "Proposez-vous du marketing et du développement ?", answer: "Oui. Marketing, web, logiciels, mobile, design, photo/vidéo, événements et IA." },
    ],
  };

  fs.writeFileSync(spPath, JSON.stringify(sp, null, 2) + "\n");
}

// Copy fixes
const shared = {
  fr: "Bonjour, je souhaite un audit digital gratuit pour mon entreprise.",
  en: "Hello, I would like a free digital audit for my business.",
  ar: "مرحباً، أود الحصول على تدقيق رقمي مجاني لمؤسستنا.",
};
for (const [locale, msg] of Object.entries(shared)) {
  const p = `messages/${locale}/shared.json`;
  const s = JSON.parse(fs.readFileSync(p, "utf8"));
  s.whatsappMessage = msg;
  fs.writeFileSync(p, JSON.stringify(s, null, 2) + "\n");
}

const videoPatches = {
  v3: {
    fr: { title: "Stratégie Google Ads pour entreprises au Maroc", description: "Masterclass : structurer vos campagnes Search pour capter une demande à forte intention." },
    en: { title: "Google Ads strategy for businesses in Morocco", description: "Masterclass: structure Search campaigns for high-intent demand." },
    ar: { title: "استراتيجية Google Ads للمؤسسات في المغرب", description: "ماستركلاس: هيكلة حملات Search للطلب عالي النية." },
  },
  v4: {
    fr: { title: "Avant / Après : refonte d'une landing page", description: "Comment nous avons doublé le taux de conversion d'une landing page e-commerce." },
    en: { title: "Before / After: landing page redesign", description: "How we doubled conversion rate on an e-commerce landing page." },
    ar: { title: "قبل / بعد: إعادة تصميم صفحة هبوط", description: "كيف ضاعفنا معدل التحويل لصفحة هبوط تجارة إلكترونية." },
  },
};
for (const locale of ["fr", "en", "ar"]) {
  const v = JSON.parse(fs.readFileSync(`messages/${locale}/videos.json`, "utf8"));
  for (const [id, patches] of Object.entries(videoPatches)) {
    Object.assign(v.items[id], patches[locale]);
  }
  fs.writeFileSync(`messages/${locale}/videos.json`, JSON.stringify(v, null, 2) + "\n");
}

// Legal fix
for (const locale of ["fr", "en", "ar"]) {
  const p = `messages/${locale}/legal.json`;
  const l = JSON.parse(fs.readFileSync(p, "utf8"));
  const terms = l.terms?.sections ?? l.items?.terms?.sections;
  const disclaimerSection = terms?.find?.((s) => s.title?.includes("Performance") || s.title?.includes("أداء") || s.id === "disclaimer");
  // walk all paragraphs
  const walk = (obj) => {
    if (typeof obj === "string") {
      return obj
        .replace(/qualité de l'offre de formation/g, "qualité de l'offre")
        .replace(/quality of the training offer/gi, "quality of the offer")
        .replace(/جودة عرض التدريب/g, "جودة العرض");
    }
    if (Array.isArray(obj)) return obj.map(walk);
    if (obj && typeof obj === "object") {
      const o = {};
      for (const [k, v] of Object.entries(obj)) o[k] = walk(v);
      return o;
    }
    return obj;
  };
  fs.writeFileSync(p, JSON.stringify(walk(l), null, 2) + "\n");
}

// ServicePages FAQ fix
for (const locale of ["fr", "en", "ar"]) {
  const spPath = `messages/${locale}/servicePages.json`;
  const sp = JSON.parse(fs.readFileSync(spPath, "utf8"));
  const walk = (obj) => {
    if (typeof obj === "string") {
      return obj
        .replace(/pour un centre de formation/gi, "pour mon entreprise")
        .replace(/for a training center/gi, "for my business");
    }
    if (Array.isArray(obj)) return obj.map(walk);
    if (obj && typeof obj === "object") {
      const o = {};
      for (const [k, v] of Object.entries(obj)) o[k] = walk(v);
      return o;
    }
    return obj;
  };
  fs.writeFileSync(spPath, JSON.stringify(walk(sp), null, 2) + "\n");
}

// Blog body broadening
function walkBlog(obj) {
  if (typeof obj === "string") {
    let s = obj.replace(/transformation digitale/gi, "@@TRANSFORMATION_DIGITALE@@");
    s = s
      .replace(/centres de formation/gi, "entreprises au Maroc")
      .replace(/centre de formation/gi, "entreprise")
      .replace(/organisme de formation/gi, "entreprise")
      .replace(/nos clients formation/gi, "nos clients")
      .replace(/clients formation/gi, "nos clients")
      .replace(/secteur formation/gi, "tous secteurs")
      .replace(/pour la formation/gi, "pour votre activité")
      .replace(/formations professionnelles/gi, "offres professionnelles")
      .replace(/formation visée/gi, "offre visée")
      .replace(/Budget média formation/gi, "Budget média")
      .replace(/lancement saisonnier formation/gi, "lancement saisonnier")
      .replace(/multi-formations/gi, "multi-offres")
      .replace(/chez les centres/gi, "chez les entreprises")
      .replace(/Les centres qui/gi, "Les entreprises qui")
      .replace(/Variable selon la formation/gi, "Variable selon l'offre")
      .replace(/\(prénom, formation\)/gi, "(prénom, offre)")
      .replace(/formation de vos conseillers/gi, "montée en compétence de vos conseillers")
      .replace(/demandes d'inscription/gi, "demandes de conversion")
      .replace(/inscription/gi, "conversion")
      .replace(/inscriptions/gi, "conversions")
      .replace(/apprenant/gi, "prospect")
      .replace(/1 à 3 formations actives/gi, "1 à 3 offres actives")
      .replace(/CPL formation/gi, "CPL")
      .replace(/budget marketing formation/gi, "budget marketing")
      .replace(/formation \[/gi, "offre [")
      .replace(/la demande formation explose/gi, "la demande sur le marché explose")
      .replace(/centres d'intérêt formation/gi, "centres d'intérêt business")
      .replace(/téléphone, formation\)/gi, "téléphone, offre)")
      .replace(/page formation générique/gi, "page générique")
      .replace(/remplissent leurs sessions/gi, "atteignent leurs objectifs commerciaux")
    return s.replace(/@@TRANSFORMATION_DIGITALE@@/gi, "transformation digitale");
  }
  if (Array.isArray(obj)) return obj.map(walkBlog);
  if (obj && typeof obj === "object") {
    const o = {};
    for (const [k, v] of Object.entries(obj)) o[k] = walkBlog(v);
    return o;
  }
  return obj;
}

for (const locale of ["fr", "en", "ar"]) {
  const p = `messages/${locale}/blog.json`;
  const blog = walkBlog(JSON.parse(fs.readFileSync(p, "utf8")));
  fs.writeFileSync(p, JSON.stringify(blog, null, 2) + "\n");
}

console.log("Final cleanup done: llms-ready, services enriched, copy fixed.");
