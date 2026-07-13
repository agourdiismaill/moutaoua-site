import fs from "fs";

const NEW_SLUG = "transformation-digitale-pme-maroc";
const NEW_GUIDES = ["seo-entreprise-maroc", "agence-digitale-maroc-guide"];

const postPatchesFr = {
  "generer-leads-centre-formation-maroc": {
    title: "Comment générer des leads qualifiés pour votre entreprise au Maroc",
    excerpt: "Stratégie complète d'acquisition : Meta Ads, Google Ads, landing pages et CRM pour PME, startups et grands comptes.",
    category: "acquisition",
    overview: {
      what: "Guide complet pour générer des leads qualifiés via le digital au Maroc, quel que soit votre secteur.",
      who: "Dirigeants, directeurs marketing et fondateurs de PME, startups et entreprises en croissance.",
      benefits: ["Pipeline de prospects prévisible", "Multi-canal Meta + Google + SEO", "KPIs business clairs"],
      topics: ["Meta Ads", "Google Ads", "Landing pages", "CRM"],
      takeaways: ["La génération de leads est le moteur n°1 de croissance", "Commencez par 1-2 canaux maîtrisés", "Mesurez le CAC, pas seulement le CPL"],
    },
  },
  "meta-ads-vs-google-ads-formation": {
    title: "Meta Ads vs Google Ads : quel canal pour votre entreprise au Maroc ?",
    excerpt: "Comparaison objective pour e-commerce, services, santé, immobilier et B2B.",
    category: "marketing",
  },
  "checklist-landing-page-formation": {
    title: "Checklist : landing page qui convertit (2026)",
    excerpt: "10 éléments indispensables pour transformer le trafic publicitaire en leads et ventes.",
    category: "conversion",
  },
  "whatsapp-convertir-leads-formation-maroc": {
    title: "WhatsApp : convertir vos leads en clients au Maroc",
    excerpt: "Scripts, automation et CRM pour transformer vos prospects WhatsApp en ventes.",
    category: "automation",
    overview: {
      what: "Méthode complète pour convertir les leads WhatsApp en clients, tous secteurs confondus.",
      who: "Commerciaux, directeurs marketing et dirigeants qui reçoivent des leads via WhatsApp.",
      benefits: ["Réponse sous 5 minutes", "Tunnel structuré", "Automation + CRM"],
      topics: ["WhatsApp Business", "Scripts", "CRM", "Automation"],
      takeaways: ["WhatsApp est le canal n°1 au Maroc", "La vitesse de réponse détermine la conversion", "Le CRM est indispensable"],
    },
  },
  "budget-marketing-centre-formation-maroc": {
    title: "Budget marketing digital : combien investir au Maroc ?",
    excerpt: "Fourchettes réalistes pour PME et entreprises : ads, contenu, web et outils.",
    category: "business",
  },
  "campagne-inscriptions-rentree-formation-maroc": {
    title: "Lancer une campagne d'acquisition digitale qui performe",
    excerpt: "Calendrier, créatives, budget et optimisation pour vos lancements produits ou saisonniers.",
    category: "marketing",
  },
};

const newPostFr = {
  title: "Transformation digitale des PME au Maroc : par où commencer en 2026",
  excerpt: "Roadmap pragmatique : site web, marketing, CRM, automation et IA pour accélérer la croissance de votre PME.",
  category: "business",
  cover: "/logo-full.svg",
  relatedServices: ["corporate-websites", "meta-ads", "crm-data", "ai-agents"],
  overview: {
    what: "Guide stratégique pour lancer la transformation digitale d'une PME au Maroc sans se disperser.",
    who: "Dirigeants de PME, startups et ETI qui veulent structurer leur croissance digitale.",
    benefits: [
      "Prioriser les bons investissements",
      "Éviter les erreurs coûteuses",
      "Croissance mesurable en 90 jours",
    ],
    topics: ["Site web", "Marketing digital", "CRM", "Automation", "IA"],
    takeaways: [
      "Commencez par les fondations : site + tracking",
      "Le marketing sans CRM est du gaspillage",
      "L'IA amplifie, elle ne remplace pas la stratégie",
    ],
  },
  sections: [
    {
      id: "contexte",
      heading: "Pourquoi la transformation digitale n'est plus optionnelle",
      paragraphs: [
        "Au Maroc, les PME qui structurent leur présence digitale croissent 2 à 3 fois plus vite que celles qui dépendent uniquement du bouche-à-oreille. Vos clients comparent en ligne, contactent via WhatsApp et attendent une réponse immédiate.",
        "La transformation digitale n'est pas « refaire un site » : c'est aligner marketing, technologie, données et expérience client pour générer plus de revenus avec moins de friction.",
      ],
    },
    {
      id: "fondations",
      heading: "Étape 1 — Les fondations (semaines 1-4)",
      paragraphs: ["Avant d'investir en publicité, assurez-vous que les bases sont solides."],
      bullets: [
        "Site web professionnel, rapide et mobile-first",
        "Tracking conversions (Meta Pixel, GA4, événements)",
        "WhatsApp Business ou numéro pro dédié",
        "Google Business Profile à jour",
      ],
    },
    {
      id: "acquisition",
      heading: "Étape 2 — Acquisition (mois 2-3)",
      paragraphs: [
        "Une fois les fondations posées, activez les canaux d'acquisition adaptés à votre secteur : Meta pour la demande créée, Google pour l'intention de recherche, SEO pour le long terme.",
      ],
      bullets: [
        "Landing page par offre principale",
        "Campagnes Meta ou Google avec budget test 8-15K MAD/mois",
        "Créatives adaptées à votre audience marocaine",
      ],
    },
    {
      id: "conversion",
      heading: "Étape 3 — Conversion et CRM (mois 3-4)",
      paragraphs: [
        "Les leads sans suivi structuré se perdent. Implémentez un CRM léger (HubSpot, Pipedrive) et connectez-le à vos formulaires et WhatsApp.",
      ],
    },
    {
      id: "automation-ia",
      heading: "Étape 4 — Automation et IA (mois 4-6)",
      paragraphs: [
        "Automatisez les relances, les rappels RDV et les tâches répétitives. Explorez l'IA pour le support client et la qualification de leads — toujours avec supervision humaine.",
      ],
    },
    {
      id: "budget",
      heading: "Budget réaliste pour une PME",
      paragraphs: [
        "Comptez 15 000 à 50 000 MAD/mois selon l'ambition : honoraires agence + budget média + outils (CRM, automation). Un audit gratuit permet de calibrer précisément.",
      ],
    },
  ],
  faqs: [
    {
      question: "Par quoi commencer si le budget est limité ?",
      answer: "Site web professionnel + Google Business Profile + WhatsApp Business structuré. Puis une campagne Meta ou Google test.",
    },
    {
      question: "Faut-il tout internaliser ?",
      answer: "Non. Une agence 360° comme Mohtaoua couvre marketing, web et tech — vous gardez le focus métier.",
    },
    {
      question: "Quel délai pour voir des résultats ?",
      answer: "Premiers leads en 2-4 semaines avec la pub. ROI stabilisé sur 60-90 jours avec optimisation continue.",
    },
  ],
};

const guidesFr = {
  "seo-entreprise-maroc": {
    title: "Guide SEO pour entreprises au Maroc",
    description: "Audit technique, contenu, netlinking et local SEO pour apparaître sur Google.",
    steps: [
      "Auditer la santé technique du site (vitesse, indexation, mobile)",
      "Identifier les mots-clés à intention commerciale",
      "Créer des pages optimisées par service et ville",
      "Publier du contenu expert régulièrement",
      "Obtenir des backlinks locaux de qualité",
      "Suivre positions et conversions organiques",
    ],
    mistakes: [
      "Dupliquer du contenu sans valeur",
      "Négliger le SEO local (Google Business)",
      "Ignorer la vitesse mobile",
    ],
    faqs: [
      { question: "Combien de temps pour des résultats SEO ?", answer: "3 à 6 mois pour des gains significatifs selon la concurrence." },
      { question: "SEO ou Google Ads ?", answer: "Les deux : Ads pour l'immédiat, SEO pour le long terme." },
    ],
  },
  "agence-digitale-maroc-guide": {
    title: "Comment choisir une agence digitale au Maroc",
    description: "Critères, questions à poser et red flags pour sélectionner le bon partenaire 360°.",
    steps: [
      "Définir vos objectifs business (leads, ventes, notoriété)",
      "Vérifier l'expertise multi-canal (marketing + web + tech)",
      "Demander des études de cas dans votre secteur",
      "Clarifier le modèle de pricing et les KPIs",
      "Tester avec un audit ou un projet pilote",
      "Évaluer la réactivité et la transparence reporting",
    ],
    mistakes: [
      "Choisir uniquement sur le prix",
      "Agence mono-compétence pour un besoin 360°",
      "Absence de reporting et de KPIs définis",
    ],
    faqs: [
      { question: "Agence ou freelance ?", answer: "Une agence 360° couvre plus de compétences avec une équipe coordonnée." },
      { question: "Quel budget minimum ?", answer: "À partir de 8 000 MAD/mois pour du marketing actif, hors média." },
    ],
  },
};

// --- Apply FR blog patches ---
const frBlog = JSON.parse(fs.readFileSync("messages/fr/blog.json", "utf8"));
for (const [slug, patch] of Object.entries(postPatchesFr)) {
  if (!frBlog.posts[slug]) continue;
  Object.assign(frBlog.posts[slug], patch);
  if (patch.overview) frBlog.posts[slug].overview = patch.overview;
}
frBlog.posts[NEW_SLUG] = newPostFr;
fs.writeFileSync("messages/fr/blog.json", JSON.stringify(frBlog, null, 2) + "\n");

// EN/AR blog - patch titles and add new post (simplified EN)
for (const locale of ["en", "ar"]) {
  const path = `messages/${locale}/blog.json`;
  const blog = JSON.parse(fs.readFileSync(path, "utf8"));
  const titles = {
    en: {
      "generer-leads-centre-formation-maroc": "How to generate qualified leads for your business in Morocco",
      "meta-ads-vs-google-ads-formation": "Meta Ads vs Google Ads: which channel for your business in Morocco?",
      "checklist-landing-page-formation": "Checklist: high-converting landing page (2026)",
      "whatsapp-convertir-leads-formation-maroc": "WhatsApp: convert leads into customers in Morocco",
      "budget-marketing-centre-formation-maroc": "Digital marketing budget: how much to invest in Morocco?",
      "campagne-inscriptions-rentree-formation-maroc": "Launch a high-performing digital acquisition campaign",
      [NEW_SLUG]: "Digital transformation for SMEs in Morocco: where to start in 2026",
    },
    ar: {
      "generer-leads-centre-formation-maroc": "كيفية توليد عملاء محتملين مؤهلين لشركتكم في المغرب",
      "meta-ads-vs-google-ads-formation": "Meta Ads مقابل Google Ads: أي قناة لشركتكم؟",
      "checklist-landing-page-formation": "قائمة تحقق: صفحة هبوط عالية التحويل (2026)",
      "whatsapp-convertir-leads-formation-maroc": "WhatsApp: تحويل العملاء المحتملين إلى عملاء",
      "budget-marketing-centre-formation-maroc": "ميزانية التسويق الرقمي في المغرب",
      "campagne-inscriptions-rentree-formation-maroc": "إطلاق حملة اكتساب رقمية فعّالة",
      [NEW_SLUG]: "التحول الرقمي للمؤسسات الصغيرة في المغرب: من أين تبدأون في 2026",
    },
  };
  for (const [slug, title] of Object.entries(titles[locale])) {
    if (blog.posts[slug]) blog.posts[slug].title = title;
  }
  if (!blog.posts[NEW_SLUG]) {
    blog.posts[NEW_SLUG] = JSON.parse(JSON.stringify(newPostFr));
    blog.posts[NEW_SLUG].title = titles[locale][NEW_SLUG];
    blog.posts[NEW_SLUG].excerpt =
      locale === "en"
        ? "Pragmatic roadmap: website, marketing, CRM, automation and AI for SME growth."
        : "خارطة طريق: موقع وتسويق وCRM وأتمتة وذكاء اصطناعي لنمو المؤسسة.";
  }
  fs.writeFileSync(path, JSON.stringify(blog, null, 2) + "\n");
}

// Guides fr/en/ar
for (const locale of ["fr", "en", "ar"]) {
  const path = `messages/${locale}/guides.json`;
  const g = JSON.parse(fs.readFileSync(path, "utf8"));
  if (locale === "fr") {
    for (const [slug, data] of Object.entries(guidesFr)) {
      g.items[slug] = data;
    }
  } else {
    for (const slug of NEW_GUIDES) {
      g.items[slug] = g.items[slug] ?? {
        title: slug,
        description: "Guide",
        steps: guidesFr[slug].steps,
        mistakes: guidesFr[slug].mistakes,
        faqs: guidesFr[slug].faqs,
      };
    }
  }
  fs.writeFileSync(path, JSON.stringify(g, null, 2) + "\n");
}

// Update data/blog.ts
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
      '"google-ads-centre-formation",\n] as const;',
      `"google-ads-centre-formation",\n  "${slug}",\n] as const;`
    );
  }
}
fs.writeFileSync("data/blog.ts", blogTs);

// Pages results/videos/caseStudies
for (const locale of ["fr", "en", "ar"]) {
  const p = JSON.parse(fs.readFileSync(`messages/${locale}/pages.json`, "utf8"));
  if (locale === "fr") {
    p.results.metaTitle = "Résultats Marketing & Digital — Maroc";
    p.results.metaDescription = "Performances publicitaires et digitales pour entreprises de tous secteurs : Meta Ads, Google Ads, CRM et WhatsApp.";
    p.results.description = "Exemples de campagnes et tableaux de bord pour e-commerce, santé, immobilier, éducation et services B2B.";
    p.videos.metaDescription = "Études de cas filmées, témoignages et coulisses de nos missions marketing, web et design.";
    p.videos.description = "Vidéos corporate, témoignages clients et formats Reels produits pour nos partenaires.";
    p.caseStudies.metaTitle = "Études de cas — Agence Digitale Maroc";
  }
  fs.writeFileSync(`messages/${locale}/pages.json`, JSON.stringify(p, null, 2) + "\n");

  const r = JSON.parse(fs.readFileSync(`messages/${locale}/results.json`, "utf8"));
  if (locale === "fr" && r.items["meta-ads"]) {
    r.items["meta-ads"].description = "Campagnes d'acquisition à grande échelle avec un coût par lead maîtrisé pour entreprises de tous secteurs.";
  }
  fs.writeFileSync(`messages/${locale}/results.json`, JSON.stringify(r, null, 2) + "\n");
}

console.log("Insights repositioning done:", NEW_SLUG, NEW_GUIDES.join(", "));
