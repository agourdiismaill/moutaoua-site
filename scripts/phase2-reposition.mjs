import fs from "fs";

const NEW_CASE_STUDIES = {
  "nova-industrie-web": {
    fr: {
      title: "Site corporate B2B + SEO : +340 % de trafic organique",
      client: "Groupe industriel (anonymisé)",
      industry: "Industrie & B2B",
      description:
        "Refonte digitale complète pour un groupe industriel marocain : site corporate Next.js, architecture SEO et contenus multilingues pour générer des demandes de devis qualifiées.",
      objectives: [
        "Moderniser l'image digitale du groupe",
        "Générer des leads B2B via le site",
        "Améliorer le référencement sur les requêtes métier",
      ],
      strategy: [
        "Audit UX et refonte site corporate mobile-first",
        "Architecture SEO par ligne de produits et villes",
        "Pages solutions + formulaires devis trackés",
        "Blog technique pour la notoriété long terme",
        "Connexion CRM pour le suivi commercial",
      ],
      budget: "Sur devis",
      cpl: "—",
      roas: "—",
      timeline: "5 mois",
      structural: {
        leads: 186,
        cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        images: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        featured: true,
        tags: ["webDev", "seo", "branding"],
      },
      testimonials: [
        {
          quote: "Notre site reflète enfin notre niveau d'expertise. Les demandes de devis ont triplé.",
          author: "Direction commerciale",
          role: "Groupe industriel, Casablanca",
        },
      ],
      execution: [
        "Atelier stratégie et arborescence",
        "Design UI/UX et développement Next.js",
        "Migration contenus multilingues (fr/ar)",
        "Déploiement SEO technique et contenu",
        "Formation équipe commerciale au CRM",
      ],
      technologies: ["Next.js", "Tailwind", "Google Analytics 4", "HubSpot", "Vercel"],
      relatedServices: ["corporate-websites", "seo", "brand-identity", "crm-data"],
    },
  },
  "atlas-ecommerce-growth": {
    fr: {
      title: "E-commerce mode : ROAS 4,8x et +2 M MAD de CA trimestriel",
      client: "Marque e-commerce (anonymisée)",
      industry: "E-commerce & Retail",
      description:
        "Lancement et scaling d'une boutique Shopify avec campagnes Meta Ads, shooting produit et automation panier abandonné pour une marque de mode marocaine.",
      objectives: [
        "Lancer la boutique en ligne rapidement",
        "Scaler les ventes via Meta Ads",
        "Réduire le taux d'abandon panier",
      ],
      strategy: [
        "Setup Shopify + paiements locaux",
        "Shooting produit et fiches optimisées",
        "Campagnes Meta catalogue + retargeting",
        "Séquences email/WhatsApp panier abandonné",
        "Optimisation CRO checkout mobile",
      ],
      budget: "72 000 DH / mois",
      cpl: "42 DH",
      roas: "4,8x",
      timeline: "4 mois",
      structural: {
        leads: 3200,
        cover: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
        images: [
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        featured: true,
        tags: ["ecommerce", "metaAds", "cro"],
      },
      testimonials: [
        {
          quote: "De zéro à des ventes quotidiennes en 6 semaines. L'équipe maîtrise tout le funnel.",
          author: "Fondatrice",
          role: "Marque mode, Casablanca",
        },
      ],
      execution: [
        "Développement boutique Shopify",
        "Production 40 visuels produits",
        "Lancement campagnes Meta catalogue",
        "Automation panier abandonné",
        "Reporting hebdomadaire ROAS",
      ],
      technologies: ["Shopify", "Meta Ads", "Klaviyo", "WhatsApp API", "Stripe"],
      relatedServices: ["e-commerce", "meta-ads", "product-photography", "marketing-automation"],
    },
  },
  "medina-clinic-digital": {
    fr: {
      title: "Clinique privée : +180 % de demandes de rendez-vous",
      client: "Clinique privée (anonymisée)",
      industry: "Santé & Cliniques",
      description:
        "Identité visuelle, site web et campagnes Google locales pour une clinique à Marrakech : visibilité, confiance et prise de RDV en ligne.",
      objectives: [
        "Renforcer la crédibilité de la clinique en ligne",
        "Générer des demandes de rendez-vous qualifiées",
        "Se positionner sur les recherches locales",
      ],
      strategy: [
        "Refonte identité visuelle premium",
        "Site vitrine avec prise de RDV WhatsApp",
        "Google Business Profile optimisé",
        "Campagnes Google Search locales",
        "Contenus éducatifs pour le SEO santé",
      ],
      budget: "38 000 DH / mois",
      cpl: "78 DH",
      roas: "—",
      timeline: "3 mois",
      structural: {
        leads: 420,
        cover: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
        images: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        featured: true,
        tags: ["branding", "googleAds", "seo"],
      },
      testimonials: [
        {
          quote: "Nos patients nous trouvent sur Google et prennent RDV directement. Un vrai changement.",
          author: "Dr. (anonymisé)",
          role: "Clinique privée, Marrakech",
        },
      ],
      execution: [
        "Création charte graphique",
        "Développement site Next.js",
        "Setup Google Ads local",
        "Optimisation fiche Google Business",
        "Formation accueil au suivi leads",
      ],
      technologies: ["Next.js", "Google Ads", "Google Business", "WhatsApp Business", "Figma"],
      relatedServices: ["brand-identity", "corporate-websites", "google-ads", "seo"],
    },
  },
  "riad-hotel-digital": {
    fr: {
      title: "Riad boutique : +45 % de réservations directes",
      client: "Hôtel boutique (anonymisé)",
      industry: "Hôtellerie & Tourisme",
      description:
        "Site web immersif, vidéo drone et SEO local pour un riad de luxe : réduire la dépendance aux OTA et augmenter les réservations directes.",
      objectives: [
        "Augmenter les réservations sans commission OTA",
        "Valoriser l'expérience client en ligne",
        "Améliorer le référencement local",
      ],
      strategy: [
        "Site web premium avec galerie et réservation directe",
        "Vidéo drone et photos professionnelles",
        "SEO local « riad + ville »",
        "Campagnes Meta pour la basse saison",
        "Intégration moteur de réservation",
      ],
      budget: "Sur devis",
      cpl: "—",
      roas: "3,2x",
      timeline: "4 mois",
      structural: {
        leads: 290,
        cover: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: ["ysz5S6PUM-U"],
        featured: false,
        tags: ["webDev", "seo", "visualCreation"],
      },
      testimonials: [
        {
          quote: "Le site et les vidéos transmettent l'ambiance du riad. Les réservations directes ont bondi.",
          author: "Gérant",
          role: "Riad boutique, Marrakech",
        },
      ],
      execution: [
        "Design UX site immersif",
        "Tournage photo et drone",
        "Développement site + moteur réservation",
        "SEO local et Google Business",
        "Campagnes Meta saisonnières",
      ],
      technologies: ["Next.js", "Booking engine", "After Effects", "Google Ads", "Meta Ads"],
      relatedServices: ["corporate-websites", "video-production", "seo", "meta-ads"],
    },
  },
};

const tagLabels = {
  fr: { webDev: "Développement web", ecommerce: "E-commerce", seo: "SEO" },
  en: { webDev: "Web development", ecommerce: "E-commerce", seo: "SEO" },
  ar: { webDev: "تطوير الويب", ecommerce: "تجارة إلكترونية", seo: "SEO" },
};

const enTitles = {
  "nova-industrie-web": "B2B corporate site + SEO: +340% organic traffic",
  "atlas-ecommerce-growth": "Fashion e-commerce: 4.8x ROAS and +2M MAD quarterly revenue",
  "medina-clinic-digital": "Private clinic: +180% appointment requests",
  "riad-hotel-digital": "Boutique riad: +45% direct bookings",
};

const arTitles = {
  "nova-industrie-web": "موقع مؤسسي B2B + SEO: +340% زيارات عضوية",
  "atlas-ecommerce-growth": "تجارة إلكترونية: ROAS 4.8x و+2 مليون درهم ربع سنوي",
  "medina-clinic-digital": "عيادة خاصة: +180% طلبات مواعيد",
  "riad-hotel-digital": "رياض بوتيك: +45% حجوزات مباشرة",
};

for (const locale of ["fr", "en", "ar"]) {
  const path = `messages/${locale}/caseStudies.json`;
  const cs = JSON.parse(fs.readFileSync(path, "utf8"));
  Object.assign(cs.tags, tagLabels[locale]);

  for (const [slug, data] of Object.entries(NEW_CASE_STUDIES)) {
    const item = JSON.parse(JSON.stringify(data.fr));
    if (locale === "en") item.title = enTitles[slug];
    if (locale === "ar") item.title = arTitles[slug];
    cs.items[slug] = item;
  }
  fs.writeFileSync(path, JSON.stringify(cs, null, 2) + "\n");
}

const pricingFr = {
  start: {
    description:
      "L'essentiel pour lancer votre présence digitale : social, création, campagnes et suivi mensuel.",
    features: [
      "2 Reels professionnels",
      "Gestion réseaux sociaux",
      "Création graphique",
      "Calendrier éditorial",
      "Campagnes Ads (Meta, Google, TikTok)",
      "Landing page ou page service (1/mois)",
      "Suivi mensuel et reporting",
    ],
  },
  performance: {
    description:
      "Accélérez vos résultats : plus de contenu, landing pages, CRO et optimisation multi-canal.",
    features: [
      "3 Reels professionnels",
      "Contenus graphiques renforcés",
      "Stories et formats courts",
      "Optimisation avancée Ads",
      "2 landing pages optimisées",
      "Analyse performances et CRO",
      "Conseils stratégie digitale",
    ],
  },
  premium: {
    description:
      "Accompagnement 360° : marketing, automation, CRM, stratégie et support prioritaire.",
    features: [
      "4 Reels + vidéos corporate",
      "Gestion complète réseaux sociaux",
      "Création graphique selon planning",
      "Campagnes Ads optimisées",
      "Automation CRM + WhatsApp",
      "Rapports mensuels détaillés",
      "Stratégie digitale personnalisée",
      "Priorité support et évolutions web",
    ],
  },
};

for (const locale of ["fr", "en", "ar"]) {
  const path = `messages/${locale}/pricing.json`;
  const p = JSON.parse(fs.readFileSync(path, "utf8"));
  if (locale === "fr") {
    for (const [id, patch] of Object.entries(pricingFr)) {
      Object.assign(p.items[id], patch);
    }
  } else {
    p.items.start.description =
      locale === "en"
        ? "Essentials to launch your digital presence: social, creative, campaigns and monthly reporting."
        : "الأساسيات لإطلاق حضوركم الرقمي: سوشيال وإبداع وحملات ومتابعة شهرية.";
    p.items.performance.description =
      locale === "en"
        ? "Accelerate results: more content, landing pages, CRO and multi-channel optimization."
        : "تسريع النتائج: محتوى أكثر وصفحات هبوط وCRO وتحسين متعدد القنوات.";
    p.items.premium.description =
      locale === "en"
        ? "360° support: marketing, automation, CRM, strategy and priority support."
        : "مرافقة 360°: تسويق وأتمتة وCRM واستراتيجية ودعم أولوية.";
  }
  fs.writeFileSync(path, JSON.stringify(p, null, 2) + "\n");
}

const pageSeoFr = {
  pricing: {
    what: "Offres tarifaires Mohtaoua : packs marketing mensuels et projets web, logiciels et design sur devis.",
    who: "Dirigeants et directeurs marketing qui comparent les niveaux d'accompagnement.",
    benefits: ["Tarifs transparents en dirhams", "Packs évolutifs", "Projets tech sur mesure"],
    topics: ["Pack Start", "Pack Performance", "Pack Premium", "Devis web & logiciels"],
    takeaways: ["Le budget média est facturé séparément", "Audit gratuit pour calibrer le bon pack"],
  },
  contact: {
    what: "Page de contact pour demander un audit digital gratuit pour votre entreprise.",
    who: "Décideurs prêts à discuter stratégie, budget et objectifs de croissance.",
    benefits: ["Réponse sous 24h", "Audit gratuit", "Équipe basée à Casablanca"],
    topics: ["Audit gratuit", "Formulaire", "WhatsApp", "Casablanca"],
    takeaways: ["Préparez vos objectifs business", "Nous couvrons tout le Maroc"],
  },
  results: {
    what: "Performances publicitaires et digitales pour entreprises de tous secteurs.",
    who: "Responsables marketing qui veulent des preuves avant de s'engager.",
    benefits: ["Captures Meta, Google, CRM", "Métriques CPL et ROAS", "Transparence"],
    topics: ["Meta Ads", "Google Ads", "CRM", "WhatsApp"],
    takeaways: ["Les performances varient selon le secteur", "Données détaillées sur demande"],
  },
  videos: {
    what: "Vidéothèque : témoignages, études de cas filmées et contenus corporate.",
    who: "Prospects qui préfèrent le format vidéo pour évaluer l'agence.",
    benefits: ["Témoignages clients", "Coulisses de projets", "Formats Reels"],
    topics: ["Études de cas vidéo", "Témoignages", "Corporate"],
    takeaways: ["Le vidéo renforce la confiance", "Contenu mis à jour régulièrement"],
  },
  caseStudies: {
    what: "Études de cas détaillées : marketing, web, e-commerce et santé au Maroc.",
    who: "Décideurs qui veulent un cas concret avant de collaborer.",
    benefits: ["Méthodologie transparente", "Chiffres clés", "Leçons applicables"],
    topics: ["Meta Ads", "Google Ads", "Web", "E-commerce"],
    takeaways: ["Cas anonymisés illustratifs", "Chaque entreprise a un contexte unique"],
  },
  blog: {
    what: "Centre de connaissances : marketing, tech, IA et transformation digitale.",
    who: "Dirigeants et marketeurs qui veulent se former aux bonnes pratiques.",
    benefits: ["Guides pratiques", "Comparaisons", "Checklists"],
    topics: ["Leads", "Meta vs Google", "Landing pages", "Transformation digitale"],
    takeaways: ["Contenu optimisé SEO et GEO", "Mis à jour régulièrement"],
  },
};

for (const locale of ["fr", "en", "ar"]) {
  const path = `messages/${locale}/pageSeo.json`;
  const ps = JSON.parse(fs.readFileSync(path, "utf8"));
  if (locale === "fr") {
    Object.assign(ps, pageSeoFr);
  }
  fs.writeFileSync(path, JSON.stringify(ps, null, 2) + "\n");

  const pagesPath = `messages/${locale}/pages.json`;
  const pages = JSON.parse(fs.readFileSync(pagesPath, "utf8"));
  if (locale === "fr") {
    pages.pricing.metaDescription =
      "Packs marketing Start, Performance et Premium. Développement, design, logiciels et événements sur devis.";
    pages.pricing.description =
      "Marketing mensuel ou projet 360° sur mesure : web, apps, design et campagnes.";
  }
  fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2) + "\n");
}

console.log("Phase 2 JSON updates done.");
