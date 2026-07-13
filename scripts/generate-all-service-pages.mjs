/**
 * Generates servicePages.json entries for all services from services.json + pillar context.
 */
import fs from "fs";

const SERVICE_PILLARS = {
  marketing: "Marketing",
  web: "Web & Digital",
  software: "Logiciels & Tech",
  mobile: "Mobile",
  creative: "Créatif & Design",
  "photo-video": "Photo & Vidéo",
  events: "Événements",
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

// slug -> pillar from services.ts order
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
    { question: `Pourquoi choisir Mohtaoua pour ${title} ?`, answer: "Agence digitale premium 360° au Maroc : stratégie, exécution et résultats mesurables pour tous secteurs." },
    { question: "Quel est le délai de réalisation ?", answer: "De 2 semaines à 3 mois selon le périmètre. Planning défini après audit gratuit." },
    { question: "Travaillez-vous avec mon secteur ?", answer: "Oui, nous accompagnons des entreprises de 15+ secteurs au Maroc et à l'international." },
    { question: "Comment démarrer ?", answer: "Demandez un audit gratuit — réponse sous 24h avec plan d'action concret." },
  ];
}

function buildPage(slug, svc, pillar) {
  const title = svc.title;
  const desc = svc.description;
  const long = svc.longDescription;
  return {
    metaTitle: `${title} — Agence Digitale Maroc`,
    metaDescription: `${desc} Mohtaoua accompagne les entreprises de tous secteurs au Maroc.`,
    overview: {
      what: long,
      who: `Entreprises et dirigeants qui recherchent un partenaire expert en ${title.toLowerCase()}.`,
      benefits: svc.features.slice(0, 3),
      topics: svc.features,
      takeaways: [
        `Expertise ${SERVICE_PILLARS[pillar] ?? pillar} au Maroc`,
        "Approche data-driven et orientée résultats",
        "Audit gratuit sous 24h",
      ],
    },
    problem: `Votre entreprise a besoin de ${title.toLowerCase()} professionnel pour accélérer sa croissance digitale.`,
    solution: `Mohtaoua conçoit et déploie des solutions ${title.toLowerCase()} sur mesure, adaptées à votre secteur et vos objectifs.`,
    howItWorks: [
      "Audit et cadrage stratégique",
      "Conception et plan d'action",
      "Production et déploiement",
      "Optimisation et suivi continu",
    ],
    industries: pillarIndustries[pillar] ?? pillarIndustries.marketing,
    faqs: defaultFaqs(title),
  };
}

for (const locale of ["fr", "en", "ar"]) {
  const services = JSON.parse(fs.readFileSync(`messages/${locale}/services.json`, "utf8"));
  const spPath = `messages/${locale}/servicePages.json`;
  const sp = JSON.parse(fs.readFileSync(spPath, "utf8"));

  for (const [slug, svc] of Object.entries(services.items)) {
    if (sp.items[slug]?.overview && sp.items[slug]?.problem && !sp.items[slug]?.isGeneric) {
      // keep hand-crafted pages (check if metaTitle doesn't end with generic pattern from old batch)
      const existing = sp.items[slug];
      if (existing.faqs?.length >= 4 && existing.howItWorks?.length >= 4) continue;
    }
    const pillar = slugPillar[slug] ?? "marketing";
    if (locale === "fr") {
      sp.items[slug] = buildPage(slug, svc, pillar);
    } else if (!sp.items[slug]?.overview) {
      const frSvc = JSON.parse(fs.readFileSync("messages/fr/services.json", "utf8")).items[slug];
      sp.items[slug] = buildPage(slug, svc, pillar);
      // use localized title from current locale services
      sp.items[slug].overview.what = svc.longDescription;
      sp.items[slug].metaTitle = `${svc.title} — Mohtaoua`;
      sp.items[slug].metaDescription = svc.description;
    }
  }
  fs.writeFileSync(spPath, JSON.stringify(sp, null, 2) + "\n");
}

// Update meta.ts - all SERVICE_SLUGS as detail slugs
const meta = fs.readFileSync("data/meta.ts", "utf8");
const slugs = Object.keys(JSON.parse(fs.readFileSync("messages/fr/services.json", "utf8")).items);
const detailBlock = `export const SERVICE_DETAIL_SLUGS = [\n${slugs.map((s) => `  "${s}",`).join("\n")}\n] as const;`;
const updated = meta.replace(
  /export const SERVICE_DETAIL_SLUGS = \[[\s\S]*?\] as const;/,
  detailBlock
);
fs.writeFileSync("data/meta.ts", updated);
console.log("Generated detail pages for", slugs.length, "services");
