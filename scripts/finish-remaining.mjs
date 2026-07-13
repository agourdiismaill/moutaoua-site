import fs from "fs";

function walkBlog(obj) {
  if (typeof obj === "string") {
    let s = obj.replace(/transformation digitale/gi, "@@TD@@");
    s = s
      .replace(/la demande formation explose/gi, "la demande sur le marché explose")
      .replace(/centres d'intérêt formation/gi, "centres d'intérêt business")
      .replace(/téléphone, formation\)/gi, "téléphone, offre)")
      .replace(/page formation générique/gi, "page générique")
      .replace(/remplir leurs sessions/gi, "atteindre leurs objectifs commerciaux")
      .replace(/remplir vos sessions/gi, "atteindre vos objectifs commerciaux")
      .replace(/campagne d'conversions/gi, "campagne d'acquisition")
      .replace(/au Maroc au Maroc/gi, "au Maroc")
      .replace(/la lancement saisonnier/gi, "le lancement saisonnier")
      .replace(/La lancement saisonnier/gi, "Le lancement saisonnier")
      .replace(/une lancement saisonnier/gi, "un lancement saisonnier")
      .replace(/campagne lancement saisonnier/gi, "campagne saisonnière")
      .replace(/préparent la lancement/gi, "préparent le lancement")
      .replace(/pré-lancement saisonnier/gi, "pré-lancement")
      .replace(/les mêmes centres appellent/gi, "les mêmes entreprises appellent")
      .replace(/places remplies/gi, "objectifs atteints")
      .replace(/elle vend une session/gi, "elle vend une offre limitée dans le temps")
      .replace(/frais d'conversion offerts/gi, "frais de dossier offerts")
      .replace(/places limitées par session/gi, "stock ou places limitées")
      .replace(/liste d'attente session suivante/gi, "liste d'attente prochaine vague")
      .replace(/inscrits N-1/gi, "clients N-1")
      .replace(/date session/gi, "date de l'offre")
      .replace(/Votre place lancement saisonnier/gi, "Votre offre limitée")
      .replace(/Réserver ma place lancement saisonnier/gi, "Profiter de l'offre")
      .replace(/offre lancement saisonnier/gi, "offre saisonnière")
      .replace(/landing page lancement saisonnier/gi, "landing page dédiée")
      .replace(/campagnes lancement saisonnier/gi, "campagnes saisonnières")
      .replace(/campagne lancement saisonnier/gi, "campagne saisonnière")
      .replace(/lancement saisonnier septembre/gi, "lancement de septembre")
      .replace(/campagne lancement saisonnier/gi, "campagne saisonnière");
    return s.replace(/@@TD@@/gi, "transformation digitale");
  }
  if (Array.isArray(obj)) return obj.map(walkBlog);
  if (obj && typeof obj === "object") {
    const o = {};
    for (const [k, v] of Object.entries(obj)) o[k] = walkBlog(v);
    return o;
  }
  return obj;
}

const campagneOverviewFr = {
  what: "Plan opérationnel pour lancer et piloter une campagne d'acquisition digitale saisonnière au Maroc (lancement produit, promo, pic de demande).",
  who: "Directeurs et responsables marketing qui préparent un pic commercial (septembre, janvier, Ramadan, soldes) et doivent atteindre leurs objectifs à temps.",
  benefits: [
    "Calendrier semaine par semaine",
    "Structure Meta Ads et Google Ads adaptée à la saisonnalité",
    "Scripts d'offre, landing page et relances WhatsApp prêts à déployer",
  ],
  topics: ["Lancement saisonnier", "Meta Ads", "Google Ads", "Landing page", "WhatsApp", "CRO"],
  takeaways: [
    "Anticipez 6 à 8 semaines avant le pic",
    "Testez créatives et offres en amont",
    "Mesurez le CAC, pas seulement le volume de leads",
  ],
};

for (const locale of ["fr", "en", "ar"]) {
  const path = `messages/${locale}/blog.json`;
  let blog = walkBlog(JSON.parse(fs.readFileSync(path, "utf8")));
  const slug = "campagne-inscriptions-rentree-formation-maroc";
  if (blog.posts[slug] && locale === "fr") {
    blog.posts[slug].overview = { ...blog.posts[slug].overview, ...campagneOverviewFr };
    blog.posts[slug].sections[0].heading =
      "Introduction : un lancement saisonnier se prépare 6 à 8 semaines avant le pic";
    blog.posts[slug].sections[0].paragraphs = [
      "Chaque année, des entreprises nous contactent trop tard : objectifs commerciaux loin d'être atteints, budget à brûler en urgence. Un lancement saisonnier réussi se prépare dès juillet pour un pic de septembre — ou plus tôt selon votre secteur (soldes, Ramadan, rentrée).",
      "Au Maroc, la demande digitale explose sur des fenêtres prévisibles. Celles qui structurent leurs campagnes Meta, Google et WhatsApp convertissent avec un CAC maîtrisé. Les autres paient 2× plus cher par lead.",
    ];
    blog.posts[slug].sections[2].paragraphs = [
      "Une campagne saisonnière ne vend pas une offre générique : elle vend une opportunité limitée dans le temps avec un bénéfice clair (promo, places, certification, livraison avant date).",
      "Les messages qui performent combinent urgence douce, preuve sociale et réduction de friction (paiement échelonné, garantie, bonus).",
    ];
    blog.posts[slug].sections[5].paragraphs = [
      "Le trafic saisonnier est cher. Chaque visiteur non converti doit entrer dans un funnel de relance.",
      "Votre landing page doit afficher la date limite, le stock ou les places restantes, l'offre en 5 points et un formulaire court (nom, téléphone, offre).",
    ];
    blog.posts[slug].sections[7].paragraphs = [
      "Un pic saisonnier est prévisible. Planifiez en amont, testez en période calme, intensifiez au bon moment.",
      "Besoin d'un plan clé en main ? Notre équipe structure vos campagnes Meta/Google, optimise votre landing et configure vos relances WhatsApp.",
    ];
    const faqPage = blog.posts[slug].faqs.find((f) => f.question.includes("page dédiée"));
    if (faqPage) {
      faqPage.answer =
        "Oui. Une page spécifique avec date, stock/places, early-bird et témoignages convertit 2 à 3× mieux qu'une page générique.";
    }
  }
  const budget = blog.posts["budget-marketing-centre-formation-maroc"];
  if (budget?.sections?.[0] && locale === "fr") {
    budget.sections[0].paragraphs = [
      "« Combien dois-je dépenser en publicité ? » est la première question lors d'un audit. La bonne question est : combien coûte une conversion, et combien en faut-il pour atteindre vos objectifs commerciaux ?",
    ];
  }
  fs.writeFileSync(path, JSON.stringify(blog, null, 2) + "\n");
}

const capabilities = {
  fr: {
    capabilitiesHeading: "Nous couvrons aussi :",
    capabilities: ["Sites web", "Logiciels", "Applications mobile", "Design & branding", "Photo & vidéo", "Événements"],
    adPlatformsHeading: "Campagnes publicitaires :",
  },
  en: {
    capabilitiesHeading: "We also cover:",
    capabilities: ["Websites", "Software", "Mobile apps", "Design & branding", "Photo & video", "Events"],
    adPlatformsHeading: "Ad campaigns:",
  },
  ar: {
    capabilitiesHeading: "نغطي أيضاً:",
    capabilities: ["مواقع الويب", "البرمجيات", "تطبيقات الجوال", "التصميم والهوية", "الصورة والفيديو", "الفعاليات"],
    adPlatformsHeading: "الحملات الإعلانية:",
  },
};

for (const locale of ["fr", "en", "ar"]) {
  const p = `messages/${locale}/sections.json`;
  const s = JSON.parse(fs.readFileSync(p, "utf8"));
  Object.assign(s.pricing, capabilities[locale]);
  fs.writeFileSync(p, JSON.stringify(s, null, 2) + "\n");
}

console.log("Finish remaining done.");
