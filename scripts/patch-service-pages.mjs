/**
 * Patches servicePages.json — multi-sector positioning for detail pages.
 * Run: node scripts/patch-service-pages.mjs
 */
import fs from "fs";

const patchFr = {
  "meta-ads": {
    metaTitle: "Meta Ads — Agence Publicité Facebook & Instagram Maroc",
    metaDescription: "Campagnes Meta Ads pour générer des leads qualifiés : e-commerce, santé, immobilier, éducation et plus. Ciblage, créatives, tracking CAPI et optimisation.",
    overview: {
      what: "Service d'acquisition payante sur Meta (Facebook & Instagram) pour générer des leads et des ventes.",
      who: "Entreprises qui veulent scaler leur acquisition avec un budget média maîtrisé.",
      benefits: ["Leads qualifiés en 7-14 jours", "Ciblage précis par intention et profil", "Créatives testées A/B en continu"],
      topics: ["Audiences lookalike", "Retargeting", "CAPI & tracking", "Tunnel conversion"],
      takeaways: ["Meta reste un canal #1 au Maroc", "La qualité créative détermine 60 % des performances", "L'optimisation hebdomadaire est indispensable"],
    },
    problem: "Vous investissez en publicité Meta mais obtenez des leads peu qualifiés, un CPL instable ou des campagnes qui ne convertissent pas.",
    solution: "Nous construisons des campagnes Meta structurées avec audiences sur mesure, créatives adaptées à votre secteur et suivi des conversions fiable.",
    howItWorks: ["Audit de votre offre et tunnel", "Stratégie média et tests créatifs", "Lancement et optimisation quotidienne", "Reporting leads, CPL et ROAS"],
    industries: ["E-commerce", "Santé & bien-être", "Immobilier", "Éducation", "Restauration", "Startups"],
  },
  "google-ads": {
    metaTitle: "Google Ads — Search & Performance Max Maroc",
    metaDescription: "Google Ads Search, Performance Max et YouTube pour capter une demande à forte intention. E-commerce, services, B2B et retail au Maroc.",
    overview: {
      what: "Service Google Ads pour capter une demande à forte intention sur Search, PMax et YouTube.",
      who: "Entreprises avec des offres recherchées souhaitant un ROAS élevé.",
      benefits: ["Trafic qualifié à forte intention", "Search + PMax complémentaires", "Suivi conversions appels et formulaires"],
      topics: ["Mots-clés intentionnels", "Performance Max", "Extensions", "Landing pages"],
      takeaways: ["Google excelle sur la demande existante", "La structure de compte impacte le CPL", "Les landing pages dédiées sont indispensables"],
    },
    problem: "Vos concurrents apparaissent en premier sur Google et votre budget est gaspillé sur des mots-clés trop larges.",
    solution: "Campagnes Search et PMax orientées conversion avec ciblage sémantique précis et pages d'atterrissage dédiées.",
    howItWorks: ["Recherche mots-clés", "Architecture de compte", "Annonces et extensions", "Optimisation CPL/ROAS"],
    industries: ["E-commerce", "Services B2B", "Immobilier", "Santé", "Éducation", "Retail"],
  },
  "marketing-automation": {
    metaTitle: "Marketing Automation — Nurturing & CRM Maroc",
    metaDescription: "Scénarios e-mail, SMS et WhatsApp pour convertir vos leads en clients. Nurturing, scoring et intégration CRM pour tous secteurs.",
    overview: {
      what: "Automatisation du nurturing multicanal pour transformer les leads en clients.",
      who: "Entreprises avec un volume de leads mais un faible taux de conversion post-demande.",
      benefits: ["Relances automatiques", "Scoring et segmentation", "Intégration CRM native"],
      topics: ["Séquences e-mail", "WhatsApp Business", "Lead scoring", "CRM"],
      takeaways: ["70 % des leads nécessitent un nurturing", "L'automation réduit le temps de réponse", "Le CRM connecté est un prérequis"],
    },
    problem: "Vos leads refroidissent faute de relance structurée et votre équipe perd du temps sur des tâches répétitives.",
    solution: "Scénarios automation connectés à votre CRM pour qualifier, relancer et convertir selon le comportement du prospect.",
    howItWorks: ["Cartographie du parcours client", "Scénarios multicanal", "Intégration CRM", "Optimisation des taux de conversion"],
    industries: ["E-commerce", "Santé", "Immobilier", "Éducation", "Services B2B", "Hôtellerie"],
  },
  "landing-pages": {
    metaTitle: "Landing Pages & CRO — Pages de Conversion Maroc",
    metaDescription: "Landing pages rapides et optimisées pour convertir le trafic publicitaire en leads et ventes. Design mobile-first, CRO et tests A/B.",
    overview: {
      what: "Conception et optimisation de landing pages orientées conversion.",
      who: "Entreprises qui envoient du trafic payant vers des pages génériques peu performantes.",
      benefits: ["Taux de conversion amélioré", "Mobile-first et rapide", "Tests A/B continus"],
      topics: ["Copywriting", "CRO", "Core Web Vitals", "Formulaires"],
      takeaways: ["Une bonne landing peut diviser le CPL par 2", "La vitesse impacte SEO et ads", "Un message = une offre = une page"],
    },
    problem: "Votre trafic publicitaire arrive sur une page lente ou générique qui ne convertit pas.",
    solution: "Landing pages dédiées par offre avec copywriting conversion, design mobile-first et tests A/B.",
    howItWorks: ["Analyse du tunnel", "Wireframe et copy", "Développement Next.js", "Tests A/B et CRO"],
    industries: ["E-commerce", "SaaS", "Immobilier", "Santé", "Éducation", "Événements"],
  },
  "social-media": {
    metaTitle: "Réseaux Sociaux & Community Management Maroc",
    metaDescription: "Stratégie éditoriale, Reels et community management pour renforcer votre marque et alimenter l'acquisition.",
    overview: {
      what: "Gestion stratégique des réseaux sociaux pour bâtir une marque forte et alimenter l'acquisition.",
      who: "Entreprises qui veulent une présence cohérente et du contenu qui génère engagement et leads.",
      benefits: ["Image de marque professionnelle", "Contenu vidéo performant", "Engagement communautaire"],
      topics: ["Reels & carrousels", "Calendrier éditorial", "Community management", "Reporting"],
      takeaways: ["Le social nourrit le retargeting ads", "La régularité prime sur la viralité", "Le contenu doit convertir sans vendre"],
    },
    problem: "Votre présence sociale est irrégulière, peu engageante et ne soutient pas vos campagnes.",
    solution: "Ligne éditoriale, production Reels et carrousels, animation communautaire et reporting mensuel.",
    howItWorks: ["Audit et benchmark", "Stratégie éditoriale", "Production et publication", "Analyse et ajustements"],
    industries: ["Retail", "Restauration", "Hôtellerie", "Beauté", "Éducation", "E-commerce"],
  },
  "crm-data": {
    metaTitle: "CRM & Pilotage Data — Tableaux de Bord Maroc",
    metaDescription: "Implémentation CRM, dashboards et attribution pour piloter votre acquisition et vos ventes avec des données fiables.",
    overview: {
      what: "Mise en place CRM avec tableaux de bord pour piloter l'acquisition et les ventes.",
      who: "Entreprises qui perdent des leads faute d'outil centralisé ou ne savent pas quel canal performe.",
      benefits: ["Vision temps réel", "Attribution multi-touch", "Décisions data-driven"],
      topics: ["HubSpot / Pipedrive", "Dashboards", "Attribution", "Intégrations ads"],
      takeaways: ["Sans CRM, impossible d'optimiser le CPL réel", "L'attribution révèle les vrais canaux", "Les dashboards alignent marketing et commercial"],
    },
    problem: "Vos leads sont dispersés et vous ne savez pas quel canal génère réellement des ventes.",
    solution: "CRM adapté, connexion des sources de leads et dashboards temps réel.",
    howItWorks: ["Audit des flux", "Setup CRM", "Intégrations ads", "Dashboards et formation"],
    industries: ["E-commerce", "Services B2B", "Immobilier", "Santé", "Éducation", "Industrie"],
  },
};

const newServicesFr = {
  "tiktok-ads": {
    metaTitle: "TikTok Ads — Publicité TikTok Maroc",
    metaDescription: "Campagnes TikTok Ads pour toucher les audiences jeunes et engagées. Formats natifs, Spark Ads et optimisation conversion.",
    overview: { what: "Publicité sur TikTok pour notoriété et conversion.", who: "Marques B2C, retail, restauration, beauté et startups.", benefits: ["Audiences jeunes", "Formats natifs", "Coûts compétitifs"], topics: ["Spark Ads", "In-Feed", "Retargeting", "Créatives UGC"], takeaways: ["TikTok domine chez les 18-34 ans", "L'authenticité bat la production studio", "Tester vite, scaler ce qui marche"] },
    problem: "Votre marque est absente de TikTok alors que votre cible y passe des heures chaque jour.",
    solution: "Campagnes TikTok structurées avec créatives natives et optimisation continue.",
    howItWorks: ["Audit audience", "Stratégie créative", "Lancement campagnes", "Optimisation ROAS"],
    industries: ["Retail", "Restauration", "Beauté", "E-commerce", "Événements", "Startups"],
  },
  seo: {
    metaTitle: "SEO — Référencement Naturel Maroc",
    metaDescription: "SEO technique, contenu et netlinking pour positionner votre marque en tête de Google au Maroc.",
    overview: { what: "Référencement naturel pour une visibilité durable sur Google.", who: "Entreprises qui veulent réduire leur dépendance à la publicité payante.", benefits: ["Trafic organique qualifié", "Autorité de domaine", "ROI long terme"], topics: ["Audit technique", "Contenu SEO", "Netlinking", "Core Web Vitals"], takeaways: ["Le SEO est un investissement, pas une dépense", "Le contenu expert gagne en 2026", "La technique reste le socle"] },
    problem: "Votre site n'apparaît pas sur les requêtes stratégiques de votre marché.",
    solution: "Stratégie SEO complète : technique, contenu et autorité thématique.",
    howItWorks: ["Audit SEO", "Plan de contenu", "Optimisations techniques", "Suivi positions"],
    industries: ["E-commerce", "Santé", "Immobilier", "Services B2B", "Hôtellerie", "Éducation"],
  },
  geo: {
    metaTitle: "GEO — Optimisation Moteurs IA (ChatGPT, Gemini)",
    metaDescription: "Generative Engine Optimization : soyez cité par ChatGPT, Gemini, Perplexity et Claude. Autorité thématique et contenu structuré.",
    overview: { what: "Optimisation pour les moteurs de réponse IA (ChatGPT, Gemini, Perplexity).", who: "Marques qui veulent être recommandées par l'IA générative.", benefits: ["Citations IA", "Autorité thématique", "Contenu structuré"], topics: ["Schema.org", "FAQ optimisées", "E-E-A-T", "Topical authority"], takeaways: ["Le GEO complète le SEO en 2026", "La structure compte autant que le contenu", "Les FAQ sont des aimants IA"] },
    problem: "Vos concurrents sont cités par ChatGPT et Gemini, pas vous.",
    solution: "Stratégie GEO : contenu expert, données structurées et autorité thématique.",
    howItWorks: ["Audit de visibilité IA", "Architecture contenu", "Schema & FAQ", "Monitoring citations"],
    industries: ["Services B2B", "Santé", "Éducation", "Immobilier", "Tech", "Conseil"],
  },
  "e-commerce": {
    metaTitle: "E-commerce — Boutiques en Ligne Maroc",
    metaDescription: "Création de boutiques e-commerce performantes : Shopify, WooCommerce ou sur mesure. Conversion, paiement et logistique.",
    overview: { what: "Conception et développement de boutiques en ligne performantes.", who: "Commerçants et marques qui veulent vendre en ligne au Maroc.", benefits: ["Boutique scalable", "Paiement local", "Conversion optimisée"], topics: ["Shopify", "WooCommerce", "Next.js", "Paiement CMI/PayPal"], takeaways: ["La vitesse de chargement impacte les ventes", "Le mobile représente 70 %+ du trafic", "Le checkout doit être fluide"] },
    problem: "Votre boutique en ligne est lente, peu convertissante ou difficile à gérer.",
    solution: "E-commerce sur mesure ou Shopify avec UX optimisée et intégrations paiement.",
    howItWorks: ["Cadrage catalogue", "Design UX", "Développement", "Lancement et formation"],
    industries: ["Retail", "Mode", "Alimentaire", "Beauté", "Artisanat", "B2B"],
  },
  "brand-identity": {
    metaTitle: "Identité de Marque — Branding Maroc",
    metaDescription: "Création d'identité de marque premium : logo, charte graphique, naming et guidelines pour entreprises au Maroc.",
    overview: { what: "Création d'identité de marque complète et cohérente.", who: "Entreprises en création ou en repositionnement.", benefits: ["Image mémorable", "Cohérence multicanal", "Différenciation"], topics: ["Logo", "Charte graphique", "Naming", "Guidelines"], takeaways: ["La marque précède le marketing", "La cohérence inspire confiance", "Un bon branding réduit le CPL"] },
    problem: "Votre image de marque est incohérente et ne reflète pas la qualité de votre offre.",
    solution: "Identité de marque premium : positionnement, logo, charte et guidelines.",
    howItWorks: ["Workshop marque", "Exploration créative", "Déclinaisons", "Livraison guidelines"],
    industries: ["Startups", "Hôtellerie", "Santé", "Retail", "Restauration", "Immobilier"],
  },
  "custom-software": {
    metaTitle: "Logiciels Sur Mesure — Développement Maroc",
    metaDescription: "Développement de logiciels métier sur mesure : ERP, CRM, plateformes et outils internes pour entreprises au Maroc.",
    overview: { what: "Développement de logiciels adaptés à vos processus métier.", who: "Entreprises avec des besoins que les solutions standard ne couvrent pas.", benefits: ["Processus optimisés", "Scalabilité", "Propriété du code"], topics: ["Analyse métier", "Architecture", "Développement", "Déploiement"], takeaways: ["Le sur mesure ROI quand le standard échoue", "L'agilité prime sur le big bang", "La maintenance est clé"] },
    problem: "Vos outils actuels (Excel, logiciels génériques) limitent votre croissance.",
    solution: "Logiciel sur mesure conçu autour de vos workflows et intégré à votre stack.",
    howItWorks: ["Cadrage fonctionnel", "Maquettes et architecture", "Développement agile", "Déploiement et support"],
    industries: ["Industrie", "Logistique", "Santé", "Immobilier", "Services B2B", "Éducation"],
  },
  "ai-agents": {
    metaTitle: "Agents IA — Automatisation Intelligente Maroc",
    metaDescription: "Agents IA conversationnels et autonomes pour automatiser le support, la qualification et les workflows métier.",
    overview: { what: "Agents IA pour automatiser tâches, support et qualification.", who: "Entreprises qui veulent gagner en productivité avec l'IA.", benefits: ["Disponibilité 24/7", "Réduction coûts", "Scalabilité"], topics: ["LLM", "RAG", "Chatbots IA", "Workflows"], takeaways: ["L'IA agentique transforme le support", "Le RAG fiabilise les réponses", "Commencer par un use case précis"] },
    problem: "Vos équipes passent trop de temps sur des tâches répétitives que l'IA pourrait automatiser.",
    solution: "Agents IA sur mesure intégrés à vos outils et données métier.",
    howItWorks: ["Identification use cases", "Prototype agent", "Intégration données", "Déploiement et monitoring"],
    industries: ["E-commerce", "Santé", "Services B2B", "Immobilier", "Éducation", "Industrie"],
  },
  "video-production": {
    metaTitle: "Production Vidéo — Corporate & Publicitaire Maroc",
    metaDescription: "Production vidéo professionnelle : corporate, publicitaire, Reels et motion graphics pour entreprises au Maroc.",
    overview: { what: "Production vidéo professionnelle pour marque et acquisition.", who: "Entreprises qui ont besoin de contenu vidéo premium.", benefits: ["Image professionnelle", "Contenu multi-plateforme", "Engagement élevé"], topics: ["Corporate", "Publicitaire", "Reels", "Motion graphics"], takeaways: ["La vidéo domine l'engagement social", "Le format court performe en ads", "La qualité de production compte"] },
    problem: "Votre contenu vidéo est amateur et ne convertit pas sur les réseaux ni en publicité.",
    solution: "Production vidéo clé en main : script, tournage, montage et déclinaisons.",
    howItWorks: ["Brief créatif", "Script et storyboard", "Tournage", "Montage et livraison"],
    industries: ["Hôtellerie", "Immobilier", "Retail", "Événements", "Santé", "Éducation"],
  },
  "corporate-websites": {
    metaTitle: "Sites Web Corporate — Vitrine Premium Maroc",
    metaDescription: "Sites vitrines corporate premium : design sur mesure, performance, SEO et multilingue pour entreprises au Maroc.",
    overview: { what: "Sites web corporate qui inspirent confiance et génèrent des leads.", who: "PME, startups et grands comptes en refonte ou création.", benefits: ["Image premium", "Performance & SEO", "Multilingue fr/en/ar"], topics: ["Next.js", "Design UX", "SEO", "CMS"], takeaways: ["Le site est votre vitrine 24/7", "La vitesse impacte conversion et SEO", "Le mobile-first est non négociable"] },
    problem: "Votre site actuel est daté, lent ou ne reflète pas le niveau de votre entreprise.",
    solution: "Site corporate sur mesure avec Next.js, design premium et SEO intégré.",
    howItWorks: ["Cadrage et arborescence", "Design UI/UX", "Développement Next.js", "Lancement et formation"],
    industries: ["Services B2B", "Santé", "Immobilier", "Industrie", "Hôtellerie", "Conseil"],
  },
};

function defaultFaqs(sector) {
  return [
    { question: `Combien coûte ${sector} chez Mohtaoua ?`, answer: "Chaque projet est chiffré après audit gratuit selon votre secteur, vos objectifs et la complexité. Demandez un devis personnalisé." },
    { question: "Quel est le délai de mise en place ?", answer: "De 2 semaines à 3 mois selon le périmètre. Nous définissons un planning clair dès l'audit." },
    { question: "Travaillez-vous avec mon secteur ?", answer: "Oui. Mohtaoua accompagne des entreprises de 15+ secteurs au Maroc : santé, e-commerce, immobilier, éducation, retail et plus." },
    { question: "Comment démarrer ?", answer: "Demandez un audit gratuit. Notre équipe vous recontacte sous 24h avec un plan d'action concret." },
  ];
}

const frPath = "messages/fr/servicePages.json";
const fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
for (const [slug, data] of Object.entries(patchFr)) {
  fr.items[slug] = { ...fr.items[slug], ...data, faqs: fr.items[slug]?.faqs?.slice(0, 4) ?? defaultFaqs(slug) };
}
for (const [slug, data] of Object.entries(newServicesFr)) {
  fr.items[slug] = { ...data, faqs: defaultFaqs(slug) };
}
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2) + "\n");

// EN/AR: patch titles and key fields for 6 + add 9 with translated structure
const enTitles = {
  "meta-ads": "Meta Ads — Facebook & Instagram Advertising Morocco",
  "google-ads": "Google Ads — Search & Performance Max Morocco",
  "marketing-automation": "Marketing Automation — Nurturing & CRM Morocco",
  "landing-pages": "Landing Pages & CRO — Conversion Pages Morocco",
  "social-media": "Social Media & Community Management Morocco",
  "crm-data": "CRM & Data Management — Dashboards Morocco",
  "tiktok-ads": "TikTok Ads — TikTok Advertising Morocco",
  seo: "SEO — Search Engine Optimization Morocco",
  geo: "GEO — AI Engine Optimization (ChatGPT, Gemini)",
  "e-commerce": "E-commerce — Online Stores Morocco",
  "brand-identity": "Brand Identity — Branding Morocco",
  "custom-software": "Custom Software Development Morocco",
  "ai-agents": "AI Agents — Intelligent Automation Morocco",
  "video-production": "Video Production — Corporate & Advertising Morocco",
  "corporate-websites": "Corporate Websites — Premium Showcase Morocco",
};

for (const locale of ["en", "ar"]) {
  const frItems = fr.items;
  const path = `messages/${locale}/servicePages.json`;
  const sp = JSON.parse(fs.readFileSync(path, "utf8"));
  for (const slug of Object.keys({ ...patchFr, ...newServicesFr })) {
    if (!sp.items[slug]) sp.items[slug] = {};
    const src = frItems[slug];
    if (locale === "en") {
      sp.items[slug].metaTitle = enTitles[slug] ?? src.metaTitle;
      sp.items[slug].metaDescription = src.metaDescription; // keep FR structure; EN file may need manual polish later
      sp.items[slug].overview = src.overview;
      sp.items[slug].problem = src.problem;
      sp.items[slug].solution = src.solution;
      sp.items[slug].howItWorks = src.howItWorks;
      sp.items[slug].industries = src.industries;
      sp.items[slug].faqs = defaultFaqs(slug).map((f, i) => ({
        question: ["How much does this cost?", "What is the timeline?", "Do you work with my industry?", "How do I get started?"][i],
        answer: ["Each project is quoted after a free audit based on your sector and goals.", "From 2 weeks to 3 months depending on scope.", "Yes. Mohtaoua serves 15+ industries in Morocco.", "Request a free audit. We respond within 24h."][i],
      }));
    } else {
      sp.items[slug].metaTitle = src.metaTitle;
      sp.items[slug].metaDescription = src.metaDescription;
      sp.items[slug].overview = src.overview;
      sp.items[slug].problem = src.problem;
      sp.items[slug].solution = src.solution;
      sp.items[slug].howItWorks = src.howItWorks;
      sp.items[slug].industries = src.industries;
      sp.items[slug].faqs = defaultFaqs(slug);
    }
  }
  fs.writeFileSync(path, JSON.stringify(sp, null, 2) + "\n");
}

console.log("Service pages patched:", Object.keys({ ...patchFr, ...newServicesFr }).length, "services");
