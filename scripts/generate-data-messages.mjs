#!/usr/bin/env node
/**
 * Generates messages/{locale}/*.json for data-driven content (services, FAQ, etc.).
 * Run: node scripts/generate-data-messages.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const locales = ["fr", "en", "ar"];

/** @param {string} filePath @param {string} exportName */
function extractExportedArray(filePath, exportName) {
  const src = readFileSync(filePath, "utf8");
  const marker = `export const ${exportName}`;
  const start = src.indexOf(marker);
  if (start === -1) {
    throw new Error(`Could not find ${exportName} in ${filePath}`);
  }
  const bracketStart = src.indexOf("[", start);
  if (bracketStart === -1) {
    throw new Error(`Could not find array for ${exportName} in ${filePath}`);
  }
  let depth = 0;
  let bracketEnd = bracketStart;
  for (let i = bracketStart; i < src.length; i++) {
    const ch = src[i];
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) {
        bracketEnd = i;
        break;
      }
    }
  }
  const arrayLiteral = src.slice(bracketStart, bracketEnd + 1);
  const shotHelper =
    "const shot = (seed, alt, caption) => ({ src: \`https://images.unsplash.com/\${seed}?auto=format&fit=crop&w=1200&q=80\`, alt, caption });";
  // eslint-disable-next-line no-new-func
  return Function(`${shotHelper} return ${arrayLiteral}`)();
}

const caseStudiesSource = JSON.parse(
  readFileSync(join(root, "data/case-studies.json"), "utf8")
);

const shot = (seed, alt, caption) => ({
  src: `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`,
  alt,
  caption,
});

/** Embedded French source (data/*.ts are meta-only). */
const adResultsFr = [
  {
    id: "meta-ads",
    platform: "Meta Ads",
    title: "Meta Ads — Facebook & Instagram",
    description:
      "Campagnes d'acquisition à grande échelle avec un coût par lead maîtrisé pour les centres de formation.",
    metrics: [
      { label: "Leads / mois", value: "1 240" },
      { label: "CPL moyen", value: "53 DH" },
      { label: "ROAS", value: "5,2x" },
    ],
    screenshots: [
      shot("photo-1551288049-bebda4e38f71", "Tableau de bord Meta Ads Manager", "Ads Manager — performance 30 jours"),
      shot("photo-1460925895917-afdab827c52f", "Graphique de performance des campagnes", "Évolution du CPL"),
      shot("photo-1504868584819-f8e8b4b6d7e3", "Rapport de conversions Meta", "Conversions par campagne"),
    ],
  },
  {
    id: "tiktok-ads",
    platform: "TikTok Ads",
    title: "TikTok Ads — Acquisition Vidéo",
    description:
      "Créatives vidéo natives et ciblage précis pour toucher une audience jeune au coût par lead le plus bas.",
    metrics: [
      { label: "Leads / mois", value: "1 580" },
      { label: "CPL moyen", value: "41 DH" },
      { label: "ROAS", value: "4,6x" },
    ],
    screenshots: [
      shot("photo-1611605698335-8b1569810432", "Tableau de bord TikTok Ads Manager", "TikTok Ads Manager — 30 jours"),
      shot("photo-1535303311164-664fc9ec6532", "Performance des créatives vidéo TikTok", "Top créatives vidéo"),
    ],
  },
  {
    id: "google-ads",
    platform: "Google Ads",
    title: "Google Ads — Search & PMax",
    description:
      "Capture de la demande à forte intention avec un quality score optimisé et des extensions performantes.",
    metrics: [
      { label: "Conversions", value: "+312%" },
      { label: "CPC moyen", value: "6,80 DH" },
      { label: "Taux conv.", value: "9,4%" },
    ],
    screenshots: [
      shot("photo-1551288049-bebda4e38f71", "Tableau de bord Google Ads", "Vue d'ensemble campagnes Search"),
      shot("photo-1543286386-713bdd548da4", "Performance Performance Max", "Performance Max — assets"),
    ],
  },
  {
    id: "lead-forms",
    platform: "Lead Forms",
    title: "Formulaires Lead — Instantanés",
    description:
      "Formulaires natifs pré-remplis qui maximisent le taux de complétion sur mobile.",
    metrics: [
      { label: "Taux complétion", value: "68%" },
      { label: "Leads qualifiés", value: "84%" },
      { label: "Coût / formulaire", value: "34 DH" },
    ],
    screenshots: [
      shot("photo-1454165804606-c3d57bc86b40", "Formulaire de génération de leads", "Lead form mobile"),
      shot("photo-1556761175-5973dc0f32e7", "Analyse de complétion des formulaires", "Funnel de complétion"),
    ],
  },
  {
    id: "crm",
    platform: "CRM",
    title: "CRM — Suivi & Conversion",
    description:
      "Pipeline structuré, scoring automatique et relances pour transformer les leads en inscriptions.",
    metrics: [
      { label: "Taux d'inscription", value: "+47%" },
      { label: "Temps de réponse", value: "< 5 min" },
      { label: "Pipeline suivi", value: "100%" },
    ],
    screenshots: [
      shot("photo-1551434678-e076c223a692", "Pipeline CRM des leads", "Pipeline Kanban"),
      shot("photo-1460925895917-afdab827c52f", "Tableau de bord CRM", "Taux de conversion par étape"),
    ],
  },
  {
    id: "whatsapp",
    platform: "WhatsApp",
    title: "WhatsApp — Conversation & Closing",
    description:
      "Conversations automatisées et humaines pour engager les prospects là où ils répondent le plus.",
    metrics: [
      { label: "Taux d'ouverture", value: "98%" },
      { label: "Taux de réponse", value: "62%" },
      { label: "Leads closés", value: "+38%" },
    ],
    screenshots: [
      shot("photo-1611606063065-ee7946f0787a", "Conversation WhatsApp Business", "WhatsApp Business API"),
      shot("photo-1556656793-08538906a9f8", "Automatisation WhatsApp", "Scénarios automatisés"),
    ],
  },
];

const videosFr = [
  { id: "v1", title: "Comment nous avons généré 1 200 leads/mois pour Skola", client: "Skola Formation", description: "Étude de cas vidéo détaillant notre stratégie Meta Ads et le tunnel de conversion mis en place.", category: "Étude de cas" },
  { id: "v2", title: "Témoignage client — Directeur de CampusUp", client: "CampusUp", description: "Le directeur de CampusUp partage les résultats obtenus après 6 mois de collaboration.", category: "Témoignage" },
  { id: "v3", title: "Stratégie Google Ads pour centres de formation", client: "Mohtaoua", description: "Masterclass : structurer ses campagnes Search pour capter une demande à forte intention.", category: "Masterclass" },
  { id: "v4", title: "Avant / Après : refonte d'une landing page", client: "FormaPro", description: "Comment nous avons doublé le taux de conversion d'une landing page de formation.", category: "CRO" },
  { id: "v5", title: "Marketing automation : le scénario de nurturing parfait", client: "EduNext", description: "Décryptage d'une séquence de nurturing email + WhatsApp qui convertit les leads dormants.", category: "Automation" },
  { id: "v6", title: "Témoignage — Responsable acquisition LearnLab", client: "LearnLab", description: "Retour d'expérience sur la mise en place d'un pilotage data et d'un CRM performant.", category: "Témoignage" },
];

const testimonialsFr = [
  { id: "t1", quote: "J'ai découvert l'école sur Instagram. Les contenus sont professionnels et rassurants, j'ai inscrit ma fille directement après avoir vu leurs publications.", author: "@Sara_ElAmal", role: "Parent", company: "Français" },
  { id: "t2", quote: "لقيت المدرسة فـ الإنستغرام، وكان التواصل ديالهم سريع بزاف، وهذا اللي خلاني نختارها لولدي.", author: "@Youssef_Mom", role: "Parent", company: "العربية" },
  { id: "t3", quote: "Ich habe die Schule über Facebook gefunden. Die Videos haben mir wirklich geholfen, die Entscheidung zu treffen.", author: "@Nadia.Learn", role: "Étudiante", company: "Allemand" },
  { id: "t4", quote: "Franchement je suis tombé sur leur page TikTok, j'ai aimé la qualité du contenu et j'ai fait mon inscription directement.", author: "@Omar_Study22", role: "Étudiant", company: "Français" },
  { id: "t5", quote: "التجربة ديالي مع المدرسة بدات من السوشيال ميديا، ومن أول تواصل حسّيت بالاحترافية ديالهم.", author: "@Imane_Benali", role: "Parent", company: "العربية" },
  { id: "t6", quote: "Sehr gute Erfahrung! Ich habe die Schule über Instagram entdeckt und alles lief schnell und einfach.", author: "@Lucas_Wissen", role: "Étudiant", company: "Allemand" },
];

/** French services (from data/services.ts historical content; file is meta-only today). */
const servicesFr = {
  "meta-ads": {
    title: "Facebook & Meta Ads",
    description:
      "Ciblage ultra-précis pour atteindre les prospects les plus qualifiés pour vos formations.",
    longDescription:
      "Nous construisons des audiences sur mesure, des créatives qui convertissent et des tunnels d'acquisition optimisés en continu sur Meta (Facebook et Instagram).",
    features: [
      "Audiences lookalike et retargeting",
      "Créatives vidéo et statiques A/B testées",
      "Optimisation quotidienne du budget",
      "Tracking conversions avancé (CAPI)",
    ],
  },
  "google-ads": {
    title: "Google Ads",
    description:
      "Capturez l'intention de recherche au moment exact où vos futurs élèves cherchent une formation.",
    longDescription:
      "Search, Performance Max et YouTube Ads pilotés par la data pour capter une demande chaude et maximiser votre retour sur investissement publicitaire.",
    features: [
      "Campagnes Search et Performance Max",
      "Recherche de mots-clés à forte intention",
      "Extensions et landing pages optimisées",
      "Suivi des appels et formulaires",
    ],
  },
  "marketing-automation": {
    title: "Marketing Automation",
    description:
      "Séquences d'e-mails automatisées pour nourrir vos leads jusqu'à l'inscription finale.",
    longDescription:
      "Scénarios de nurturing multicanal (e-mail, SMS, WhatsApp) connectés à votre CRM pour transformer un lead froid en inscription.",
    features: [
      "Scénarios de nurturing multicanal",
      "Scoring et segmentation des leads",
      "Intégration CRM native",
      "Relances automatiques intelligentes",
    ],
  },
  "landing-pages": {
    title: "Landing Pages & CRO",
    description:
      "Des pages d'atterrissage rapides et optimisées pour convertir le trafic en demandes d'information.",
    longDescription:
      "Conception, copywriting et optimisation du taux de conversion (CRO) avec tests A/B continus pour maximiser chaque dirham investi.",
    features: [
      "Design haute conversion mobile-first",
      "Tests A/B et heatmaps",
      "Vitesse et SEO technique",
      "Formulaires et prise de rendez-vous intégrés",
    ],
  },
  "social-media": {
    title: "Gestion des réseaux sociaux",
    description:
      "Une présence sociale cohérente qui renforce votre marque et alimente votre pipeline.",
    longDescription:
      "Ligne éditoriale, production de contenu et community management pour bâtir une marque éducative forte et désirable.",
    features: [
      "Stratégie et calendrier éditorial",
      "Production de Reels et carrousels",
      "Community management",
      "Reporting d'engagement mensuel",
    ],
  },
  "crm-data": {
    title: "CRM & Pilotage Data",
    description:
      "Centralisez vos leads et pilotez votre acquisition avec des tableaux de bord clairs.",
    longDescription:
      "Mise en place et optimisation de votre CRM, dashboards temps réel et attribution pour des décisions guidées par la donnée.",
    features: [
      "Implémentation et intégration CRM",
      "Dashboards temps réel",
      "Attribution multi-touch",
      "Rapports automatisés",
    ],
  },
};

const faqFr = {
  f1: {
    question: "Sous combien de temps puis-je espérer des résultats ?",
    answer:
      "Les premières demandes de renseignements arrivent généralement dès les 7 à 14 premiers jours après le lancement des campagnes. Les performances se stabilisent et s'optimisent sur 30 à 90 jours, à mesure que l'algorithme apprend et que nous affinons le ciblage.",
    category: "Résultats",
  },
  f2: {
    question: "Travaillez-vous uniquement avec des centres de formation ?",
    answer:
      "Notre spécialité est le secteur de l'éducation et de la formation (organismes de formation, écoles, e-learning, formations professionnelles). Cette spécialisation nous permet de maîtriser les enjeux de conformité, de saisonnalité et de tunnel d'inscription propres à votre métier.",
    category: "Général",
  },
  f3: {
    question: "Le budget publicitaire est-il inclus dans vos honoraires ?",
    answer:
      "Non. Nos honoraires couvrent la stratégie, la gestion et l'optimisation. Le budget média (dépensé directement sur Meta ou Google) est facturé séparément par les plateformes et reste votre propriété. Nous vous conseillons sur le budget optimal selon vos objectifs.",
    category: "Tarifs",
  },
  f4: {
    question: "Y a-t-il un engagement de durée ?",
    answer:
      "Nous recommandons un engagement initial de 3 mois, le temps nécessaire pour collecter suffisamment de données et atteindre un régime optimal. Au-delà, nos contrats sont sans engagement et résiliables avec un préavis de 30 jours.",
    category: "Tarifs",
  },
  f5: {
    question: "Comment suivez-vous les performances ?",
    answer:
      "Vous disposez d'un dashboard en temps réel (leads, coût par lead, ROAS, taux de conversion) accessible 24 h/24. Nous organisons également des points réguliers et un reporting mensuel détaillé orienté résultats business.",
    category: "Résultats",
  },
  f6: {
    question: "Gérez-vous aussi la création des publicités et landing pages ?",
    answer:
      "Oui. Notre équipe créative produit les visuels, vidéos et copies publicitaires, ainsi que des landing pages optimisées pour la conversion. Tout est inclus dans nos offres Performance et Premium.",
    category: "Services",
  },
  f7: {
    question: "Pouvez-vous vous connecter à mon CRM existant ?",
    answer:
      "Absolument. Nous nous intégrons aux principaux CRM (HubSpot, Pipedrive, Salesforce, etc.) ainsi qu'aux outils de réservation et de marketing automation pour centraliser et qualifier automatiquement vos leads.",
    category: "Services",
  },
  f8: {
    question: "Que se passe-t-il lors de l'audit gratuit ?",
    answer:
      "Nous analysons votre présence digitale actuelle, vos campagnes existantes et votre tunnel de conversion. Vous repartez avec un diagnostic clair et un plan d'action concret, que vous décidiez ou non de travailler avec nous.",
    category: "Général",
  },
};

const pricingFr = {
  start: {
    name: "Pack Start",
    packLabel: "Start",
    description:
      "L'essentiel pour lancer votre présence digitale et vos premières campagnes.",
    period: "/ mois",
    cta: "Choisir Start",
    features: [
      "2 Reels professionnels",
      "Gestion de vos réseaux sociaux",
      "Création graphique",
      "Calendrier de publication",
      "Lancement et gestion des campagnes Ads (Meta, Google, TikTok)",
      "Suivi mensuel",
    ],
  },
  performance: {
    name: "Pack Performance",
    packLabel: "Performance",
    description: "Tout le Pack Start, enrichi pour accélérer vos résultats.",
    period: "/ mois",
    cta: "Choisir Performance",
    badge: "Tout le Pack Start +",
    features: [
      "3 Reels professionnels",
      "Plus de contenus graphiques",
      "Plus de Stories",
      "Optimisation avancée des campagnes Ads (Meta, Google, TikTok)",
      "Analyse des performances",
      "Conseils marketing",
    ],
  },
  premium: {
    name: "Pack Premium",
    packLabel: "Premium",
    description:
      "Le pack le plus complet pour une croissance digitale sans limites.",
    period: "/ mois",
    cta: "Choisir Premium",
    badge: "Le pack le plus complet.",
    featuresIntro: "Comprend :",
    features: [
      "4 Reels professionnels",
      "Gestion complète des réseaux sociaux",
      "Création graphique illimitée selon le planning",
      "Stories régulières",
      "Campagnes Ads (Meta, Google, TikTok) optimisées",
      "Rapports mensuels détaillés",
      "Stratégie digitale personnalisée",
      "Priorité sur les demandes",
    ],
  },
};

const statsFr = {
  impressions: { label: "Impressions générées" },
  leads: { label: "Leads générés" },
  roas: { label: "ROAS moyen" },
  campaigns: { label: "Campagnes actives" },
};

const TAG_LABEL_TO_KEY = {
  "Meta Ads": "metaAds",
  CRO: "cro",
  Automation: "automation",
  "Google Ads": "googleAds",
  "Performance Max": "performanceMax",
  CRM: "crm",
  WhatsApp: "whatsApp",
  "Social Media": "socialMedia",
  Branding: "branding",
  "Création visuelle": "visualCreation",
  Multilingue: "multilingual",
};

const VIDEO_CATEGORY_TO_KEY = {
  "Étude de cas": "caseStudy",
  Témoignage: "testimonial",
  Masterclass: "masterclass",
  CRO: "cro",
  Automation: "automation",
};

const VIDEO_CATEGORY_KEYS = [
  "all",
  "caseStudy",
  "testimonial",
  "masterclass",
  "cro",
  "automation",
];

const localeBundles = {
  en: {
    services: {
      "meta-ads": {
        title: "Facebook & Meta Ads",
        description:
          "Ultra-precise targeting to reach the most qualified prospects for your training programs.",
        longDescription:
          "We build custom audiences, high-converting creatives, and continuously optimized acquisition funnels on Meta (Facebook and Instagram).",
        features: [
          "Lookalike audiences and retargeting",
          "A/B-tested video and static creatives",
          "Daily budget optimization",
          "Advanced conversion tracking (CAPI)",
        ],
      },
      "google-ads": {
        title: "Google Ads",
        description:
          "Capture search intent the moment your future students look for a training program.",
        longDescription:
          "Search, Performance Max, and YouTube Ads driven by data to capture high-intent demand and maximize your advertising ROI.",
        features: [
          "Search and Performance Max campaigns",
          "High-intent keyword research",
          "Optimized extensions and landing pages",
          "Call and form conversion tracking",
        ],
      },
      "marketing-automation": {
        title: "Marketing Automation",
        description:
          "Automated email sequences to nurture your leads through to enrollment.",
        longDescription:
          "Multichannel nurturing scenarios (email, SMS, WhatsApp) connected to your CRM to turn cold leads into enrollments.",
        features: [
          "Multichannel nurturing workflows",
          "Lead scoring and segmentation",
          "Native CRM integration",
          "Smart automated follow-ups",
        ],
      },
      "landing-pages": {
        title: "Landing Pages & CRO",
        description:
          "Fast, conversion-focused landing pages that turn traffic into qualified inquiries.",
        longDescription:
          "Design, copywriting, and conversion rate optimization (CRO) with ongoing A/B testing to maximize every dirham you invest.",
        features: [
          "Mobile-first, high-converting design",
          "A/B tests and heatmaps",
          "Speed and technical SEO",
          "Integrated forms and appointment booking",
        ],
      },
      "social-media": {
        title: "Social Media Management",
        description:
          "A consistent social presence that strengthens your brand and feeds your pipeline.",
        longDescription:
          "Editorial strategy, content production, and community management to build a strong, desirable education brand.",
        features: [
          "Strategy and editorial calendar",
          "Reels and carousel production",
          "Community management",
          "Monthly engagement reporting",
        ],
      },
      "crm-data": {
        title: "CRM & Data Analytics",
        description:
          "Centralize your leads and steer acquisition with clear dashboards.",
        longDescription:
          "CRM setup and optimization, real-time dashboards, and attribution for data-driven decisions.",
        features: [
          "CRM implementation and integration",
          "Real-time dashboards",
          "Multi-touch attribution",
          "Automated reporting",
        ],
      },
    },
    faq: {
      f1: {
        question: "How soon can I expect results?",
        answer:
          "The first inquiries usually arrive within 7 to 14 days after campaigns go live. Performance stabilizes and improves over 30 to 90 days as the algorithm learns and we refine targeting.",
        category: "Results",
      },
      f2: {
        question: "Do you work exclusively with training centers?",
        answer:
          "We specialize in education and training (training providers, schools, e-learning, professional development). That focus helps us master compliance, seasonality, and enrollment funnel challenges specific to your industry.",
        category: "General",
      },
      f3: {
        question: "Is ad spend included in your fees?",
        answer:
          "No. Our fees cover strategy, management, and optimization. Media budget (spent directly on Meta or Google) is billed separately by the platforms and remains yours. We advise you on the optimal budget for your goals.",
        category: "Pricing",
      },
      f4: {
        question: "Is there a minimum commitment?",
        answer:
          "We recommend an initial 3-month commitment—the time needed to gather enough data and reach a steady performance level. After that, contracts are non-binding and can be cancelled with 30 days' notice.",
        category: "Pricing",
      },
      f5: {
        question: "How do you track performance?",
        answer:
          "You get a real-time dashboard (leads, cost per lead, ROAS, conversion rate) available 24/7. We also run regular check-ins and detailed monthly reporting focused on business outcomes.",
        category: "Results",
      },
      f6: {
        question: "Do you also create ads and landing pages?",
        answer:
          "Yes. Our creative team produces visuals, videos, and ad copy, plus conversion-optimized landing pages. This is included in our Performance and Premium plans.",
        category: "Services",
      },
      f7: {
        question: "Can you connect to my existing CRM?",
        answer:
          "Absolutely. We integrate with major CRMs (HubSpot, Pipedrive, Salesforce, etc.) as well as booking and marketing automation tools to centralize and qualify your leads automatically.",
        category: "Services",
      },
      f8: {
        question: "What happens during the free audit?",
        answer:
          "We review your current digital presence, existing campaigns, and conversion funnel. You leave with a clear diagnosis and a concrete action plan—whether or not you choose to work with us.",
        category: "General",
      },
    },
    pricing: {
      start: {
        name: "Start Pack",
        packLabel: "Start",
        description:
          "Everything you need to launch your digital presence and first campaigns.",
        period: "/ month",
        cta: "Choose Start",
        features: [
          "2 professional Reels",
          "Social media management",
          "Graphic design",
          "Publishing calendar",
          "Launch and management of ad campaigns (Meta, Google, TikTok)",
          "Monthly follow-up",
        ],
      },
      performance: {
        name: "Performance Pack",
        packLabel: "Performance",
        description: "Everything in Start, enhanced to accelerate your results.",
        period: "/ month",
        cta: "Choose Performance",
        badge: "Everything in Start +",
        features: [
          "3 professional Reels",
          "More graphic content",
          "More Stories",
          "Advanced ad campaign optimization (Meta, Google, TikTok)",
          "Performance analysis",
          "Marketing advisory",
        ],
      },
      premium: {
        name: "Premium Pack",
        packLabel: "Premium",
        description: "Our most complete pack for unlimited digital growth.",
        period: "/ month",
        cta: "Choose Premium",
        badge: "Our most complete pack.",
        featuresIntro: "Includes:",
        features: [
          "4 professional Reels",
          "Full social media management",
          "Unlimited graphic design within the schedule",
          "Regular Stories",
          "Optimized ad campaigns (Meta, Google, TikTok)",
          "Detailed monthly reports",
          "Personalized digital strategy",
          "Priority support",
        ],
      },
    },
    stats: {
      impressions: { label: "Impressions delivered" },
      leads: { label: "Leads generated" },
      roas: { label: "Average ROAS" },
      campaigns: { label: "Active campaigns" },
    },
    videoCategories: {
      all: "All",
      caseStudy: "Case study",
      testimonial: "Testimonial",
      masterclass: "Masterclass",
      cro: "CRO",
      automation: "Automation",
    },
    caseStudyTags: {
      metaAds: "Meta Ads",
      cro: "CRO",
      automation: "Automation",
      googleAds: "Google Ads",
      performanceMax: "Performance Max",
      crm: "CRM",
      whatsApp: "WhatsApp",
      socialMedia: "Social Media",
      branding: "Branding",
      visualCreation: "Visual design",
      multilingual: "Multilingual",
    },
    results: {
      "meta-ads": {
        platform: "Meta Ads",
        title: "Meta Ads — Facebook & Instagram",
        description:
          "Large-scale acquisition campaigns with controlled cost per lead for training centers.",
        metrics: [
          { label: "Leads / month" },
          { label: "Avg. CPL" },
          { label: "ROAS" },
        ],
        screenshots: [
          { alt: "Meta Ads Manager dashboard", caption: "Ads Manager — 30-day performance" },
          { alt: "Campaign performance chart", caption: "CPL trend" },
          { alt: "Meta conversions report", caption: "Conversions by campaign" },
        ],
      },
      "tiktok-ads": {
        platform: "TikTok Ads",
        title: "TikTok Ads — Video Acquisition",
        description:
          "Native video creatives and precise targeting to reach a young audience at the lowest cost per lead.",
        metrics: [
          { label: "Leads / month" },
          { label: "Avg. CPL" },
          { label: "ROAS" },
        ],
        screenshots: [
          { alt: "TikTok Ads Manager dashboard", caption: "TikTok Ads Manager — 30 days" },
          { alt: "TikTok video creative performance", caption: "Top video creatives" },
        ],
      },
      "google-ads": {
        platform: "Google Ads",
        title: "Google Ads — Search & PMax",
        description:
          "Capture high-intent demand with optimized Quality Score and high-performing extensions.",
        metrics: [
          { label: "Conversions" },
          { label: "Avg. CPC" },
          { label: "Conv. rate" },
        ],
        screenshots: [
          { alt: "Google Ads dashboard", caption: "Search campaigns overview" },
          { alt: "Performance Max results", caption: "Performance Max — assets" },
        ],
      },
      "lead-forms": {
        platform: "Lead Forms",
        title: "Lead Forms — Instant",
        description:
          "Native pre-filled forms that maximize completion rates on mobile.",
        metrics: [
          { label: "Completion rate" },
          { label: "Qualified leads" },
          { label: "Cost / form" },
        ],
        screenshots: [
          { alt: "Lead generation form", caption: "Mobile lead form" },
          { alt: "Form completion analytics", caption: "Completion funnel" },
        ],
      },
      crm: {
        platform: "CRM",
        title: "CRM — Tracking & Conversion",
        description:
          "Structured pipeline, automatic scoring, and follow-ups to turn leads into enrollments.",
        metrics: [
          { label: "Enrollment rate" },
          { label: "Response time" },
          { label: "Pipeline tracked" },
        ],
        screenshots: [
          { alt: "CRM lead pipeline", caption: "Kanban pipeline" },
          { alt: "CRM dashboard", caption: "Conversion rate by stage" },
        ],
      },
      whatsapp: {
        platform: "WhatsApp",
        title: "WhatsApp — Conversation & Closing",
        description:
          "Automated and human conversations to engage prospects where they respond most.",
        metrics: [
          { label: "Open rate" },
          { label: "Reply rate" },
          { label: "Closed leads" },
        ],
        screenshots: [
          { alt: "WhatsApp Business conversation", caption: "WhatsApp Business API" },
          { alt: "WhatsApp automation", caption: "Automated scenarios" },
        ],
      },
    },
    videos: {
      v1: {
        title: "How we generated 1,200 leads/month for Skola",
        client: "Skola Formation",
        description:
          "Video case study detailing our Meta Ads strategy and the conversion funnel we implemented.",
      },
      v2: {
        title: "Client testimonial — CampusUp Director",
        client: "CampusUp",
        description:
          "CampusUp's director shares results after 6 months of working together.",
      },
      v3: {
        title: "Google Ads strategy for training centers",
        client: "EduGrowth Digital",
        description:
          "Masterclass: structuring Search campaigns to capture high-intent demand.",
      },
      v4: {
        title: "Before / After: landing page redesign",
        client: "FormaPro",
        description:
          "How we doubled the conversion rate of a training landing page.",
      },
      v5: {
        title: "Marketing automation: the perfect nurturing workflow",
        client: "EduNext",
        description:
          "Breakdown of an email + WhatsApp nurturing sequence that converts dormant leads.",
      },
      v6: {
        title: "Testimonial — LearnLab acquisition lead",
        client: "LearnLab",
        description:
          "Feedback on implementing data-driven management and a high-performing CRM.",
      },
    },
    testimonials: {
      t1: {
        quote:
          "I discovered the school on Instagram. The content felt professional and reassuring—I enrolled my daughter right after seeing their posts.",
        author: "@Sara_ElAmal",
        role: "Parent",
        company: "French",
      },
      t2: {
        quote:
          "I found the school on Instagram. Their response was incredibly fast—that's why I chose it for my child.",
        author: "@Youssef_Mom",
        role: "Parent",
        company: "Arabic",
      },
      t3: {
        quote:
          "I found the school on Facebook. The videos really helped me make my decision.",
        author: "@Nadia.Learn",
        role: "Student",
        company: "German",
      },
      t4: {
        quote:
          "I came across their TikTok page, loved the quality of the content, and signed up right away.",
        author: "@Omar_Study22",
        role: "Student",
        company: "French",
      },
      t5: {
        quote:
          "My experience with the school started on social media—from the first contact I felt their professionalism.",
        author: "@Imane_Benali",
        role: "Parent",
        company: "Arabic",
      },
      t6: {
        quote:
          "Great experience! I discovered the school on Instagram and everything was quick and easy.",
        author: "@Lucas_Wissen",
        role: "Student",
        company: "German",
      },
    },
    caseStudies: {
      "skola-formation": {
        title: "1,200 leads/month for a training provider",
        client: "Skola Formation",
        industry: "Professional training",
        description:
          "Complete overhaul of Skola's paid acquisition—from irregular lead volume to a predictable engine generating 1,200+ qualified inquiries per month.",
        objectives: [
          "Generate predictable, scalable lead volume",
          "Reduce cost per lead below 55 DH",
          "Improve lead quality passed to advisors",
        ],
        strategy: [
          "Full Meta Ads account restructure into ABO campaigns",
          "Native benefit-driven video creatives",
          "Server-side conversion tracking (CAPI)",
          "Dedicated landing pages per program with ongoing A/B tests",
          "Email + WhatsApp nurturing for warm leads",
        ],
        budget: "88,000 DH / month",
        cpl: "53 DH",
        roas: "5.2x",
        timeline: "6 months",
        testimonials: [
          {
            quote:
              "In 6 months, EduGrowth multiplied our enrollments by 4. A data-driven, transparent team.",
            author: "Camille Robert",
            role: "Director, Skola Formation",
          },
        ],
      },
      "campusup-search": {
        title: "6.1x ROAS via Google Ads for CampusUp",
        client: "CampusUp",
        industry: "E-learning",
        description:
          "Capturing high-intent Google demand for CampusUp with a Search + Performance Max structure that dramatically increased return on ad spend.",
        objectives: [
          "Capture search demand for certified training programs",
          "Maximize ROAS on a constrained budget",
          "Lower CPA while increasing volume",
        ],
        strategy: [
          "Audit and high-intent keyword research",
          "Search architecture by training theme",
          "Performance Max campaigns fed with premium assets",
          "Ongoing bid and Quality Score optimization",
          "CRM connection for optimization on qualified leads",
        ],
        budget: "132,000 DH / month",
        cpl: "68 DH",
        roas: "6.1x",
        timeline: "5 months",
        testimonials: [
          {
            quote:
              "CPL cut in half and a pipeline we can finally read. Responsive, transparent team.",
            author: "Mehdi Lefort",
            role: "Head of Acquisition, CampusUp",
          },
        ],
      },
      "edunext-automation": {
        title: "Automated enrollment funnel for EduNext",
        client: "EduNext",
        industry: "Online training",
        description:
          "A multichannel nurturing engine that converts dormant leads into enrollments—with no human touch on the first steps.",
        objectives: [
          "Reactivate a cold lead database",
          "Automate qualification and follow-ups",
          "Increase lead-to-enrollment conversion rate",
        ],
        strategy: [
          "Lead scoring and segmentation in the CRM",
          "Behavior-triggered email + SMS + WhatsApp workflows",
          "Automated mid-funnel webinars",
          "Sequence optimization through A/B testing",
        ],
        budget: "55,000 DH / month",
        cpl: "65 DH",
        roas: "4.7x",
        timeline: "4 months",
        testimonials: [
          {
            quote:
              "The funnel they built runs on its own. We fill our sessions ahead of schedule.",
            author: "Sophie Nguyen",
            role: "Founder, EduNext",
          },
        ],
      },
      "millennia-group-prive": {
        title: "Social media identity & acquisition for Millennia (Marrakech)",
        client: "Millennia Group Privé",
        industry: "Language training center",
        description:
          "End-to-end digital communication for Millennia Group Privé in Marrakech (languages, IT, TELC/Goethe prep). Premium visual identity and multilingual social campaigns (Arabic, French) that boosted enrollment inquiries.",
        objectives: [
          "Build a consistent, recognizable visual identity on social",
          "Generate a steady flow of training enrollment requests",
          "Cover the full offer: German, English, French, Spanish, IT",
          "Engage the community around key moments (Ramadan, Eid, hiring, news)",
        ],
        strategy: [
          "Art direction and on-brand template rollouts",
          "Multilingual editorial calendar (Arabic / French) on Instagram & Facebook",
          "Promotional visuals (language packs + free IT add-on)",
          "Trainer recruitment campaigns and brand posts",
          "Seasonal and awareness content to maximize engagement",
        ],
        budget: "Custom quote",
        cpl: "—",
        roas: "—",
        timeline: "Ongoing engagement",
        testimonials: [
          {
            quote:
              "Our social presence is now professional and consistent. The visuals finally reflect our center's image.",
            author: "Management",
            role: "Millennia Group Privé, Marrakech",
          },
        ],
      },
    },
  },
  ar: {
    services: {
      "meta-ads": {
        title: "إعلانات Facebook وMeta",
        description:
          "استهداف دقيق للوصول إلى أفضل العملاء المحتملين لدوراتكم التكوينية.",
        longDescription:
          "نبني جماهير مخصصة وإبداعات تحقق التحويل ومسارات استقطاب محسّنة باستمرار على Meta (Facebook وInstagram).",
        features: [
          "جماهير lookalike وإعادة الاستهداف",
          "إبداعات فيديو وثابتة مع اختبارات A/B",
          "تحسين الميزانية يومياً",
          "تتبع تحويلات متقدم (CAPI)",
        ],
      },
      "google-ads": {
        title: "Google Ads",
        description:
          "التقطوا نية البحث في اللحظة التي يبحث فيها طلابكم المستقبليون عن تكوين.",
        longDescription:
          "حملات Search وPerformance Max وYouTube Ads مدفوعة بالبيانات لالتقاط الطلب عالي النية وتعظيم العائد على الاستثمار الإعلاني.",
        features: [
          "حملات Search وPerformance Max",
          "بحث كلمات مفتاحية عالية النية",
          "إضافات وصفحات هبوط محسّنة",
          "تتبع المكالمات والنماذج",
        ],
      },
      "marketing-automation": {
        title: "أتمتة التسويق",
        description:
          "سلاسل بريد إلكتروني آلية لرعاية العملاء المحتملين حتى التسجيل النهائي.",
        longDescription:
          "سيناريوهات رعاية متعددة القنوات (بريد، SMS، WhatsApp) متصلة بـ CRM لتحويل العميل البارد إلى تسجيل.",
        features: [
          "سيناريوهات رعاية متعددة القنوات",
          "تقييم وتقسيم العملاء المحتملين",
          "تكامل CRM أصلي",
          "متابعات آلية ذكية",
        ],
      },
      "landing-pages": {
        title: "صفحات الهبوط وCRO",
        description:
          "صفحات هبوط سريعة ومحسّنة لتحويل الزيارات إلى طلبات معلومات.",
        longDescription:
          "تصميم، copywriting وتحسين معدل التحويل (CRO) مع اختبارات A/B مستمرة لتعظيم كل درهم تستثمرونه.",
        features: [
          "تصميم mobile-first عالي التحويل",
          "اختبارات A/B وخرائط حرارية",
          "سرعة وSEO تقني",
          "نماذج وحجز مواعيد مدمجة",
        ],
      },
      "social-media": {
        title: "إدارة شبكات التواصل",
        description:
          "حضور اجتماعي متسق يعزز علامتكم ويغذي مسار المبيعات.",
        longDescription:
          "خط تحريري، إنتاج محتوى وإدارة مجتمع لبناء علامة تعليمية قوية وجذابة.",
        features: [
          "استراتيجية وتقويم تحريري",
          "إنتاج Reels وcarrousels",
          "إدارة المجتمع",
          "تقارير engagement شهرية",
        ],
      },
      "crm-data": {
        title: "CRM وقيادة البيانات",
        description:
          "مركزوا عملاءكم المحتملين وقودوا الاستقطاب بلوحات معلومات واضحة.",
        longDescription:
          "إعداد CRM وتحسينه، لوحات لحظية وإسناد لقرارات مبنية على البيانات.",
        features: [
          "تطبيق وتكامل CRM",
          "لوحات معلومات لحظية",
          "إسناد multi-touch",
          "تقارير آلية",
        ],
      },
    },
    faq: {
      f1: {
        question: "خلال كم من الوقت يمكنني توقع النتائج؟",
        answer:
          "تصل أول طلبات المعلومات عادةً خلال 7 إلى 14 يوماً بعد إطلاق الحملات. تستقر الأداءات وتتحسن على مدى 30 إلى 90 يوماً مع تعلم الخوارزمية وتحسين الاستهداف.",
        category: "النتائج",
      },
      f2: {
        question: "هل تعملون حصرياً مع مراكز التكوين؟",
        answer:
          "تخصصنا قطاع التعليم والتكوين (مؤسسات التكوين، المدارس، التعلم الإلكتروني، التكوين المهني). هذا يسمح لنا بإتقان الامتثال والموسمية ومسار التسجيل الخاص بمجالكم.",
        category: "عام",
      },
      f3: {
        question: "هل ميزانية الإعلانات مشمولة في أتعابكم؟",
        answer:
          "لا. أتعابنا تغطي الاستراتيجية والإدارة والتحسين. الميزانية الإعلانية (على Meta أو Google) تُدفع بشكل منفصل للمنصات وتبقى ملكاً لكم. ننصحكم بالميزانية المثلى حسب أهدافكم.",
        category: "الأسعار",
      },
      f4: {
        question: "هل هناك التزام بمدة معينة؟",
        answer:
          "نوصي بالتزام أولي 3 أشهر — الوقت اللازم لجمع بيانات كافية والوصول إلى أداء مستقر. بعد ذلك، العقود بدون التزام وقابلة للإنهاء بإشعار 30 يوماً.",
        category: "الأسعار",
      },
      f5: {
        question: "كيف تتابعون الأداء؟",
        answer:
          "لديكم لوحة معلومات لحظية (عملاء محتملون، تكلفة لكل lead، ROAS، معدل التحويل) متاحة 24/7. كما ننظم نقاط متابعة وتقارير شهرية مفصلة موجهة نحو نتائج الأعمال.",
        category: "النتائج",
      },
      f6: {
        question: "هل تديرون أيضاً إنشاء الإعلانات وصفحات الهبوط؟",
        answer:
          "نعم. فريقنا الإبداعي ينتج المرئيات والفيديوهات ونصوص الإعلانات، إضافة إلى صفحات هبوط محسّنة للتحويل. كل ذلك مشمول في باقات Performance وPremium.",
        category: "الخدمات",
      },
      f7: {
        question: "هل يمكنكم الاتصال بـ CRM الحالي لدي؟",
        answer:
          "بالتأكيد. نتكامل مع أهم أنظمة CRM (HubSpot وPipedrive وSalesforce وغيرها) وأدوات الحجز والأتمتة التسويقية لمركزة وتأهيل عملائكم المحتملين تلقائياً.",
        category: "الخدمات",
      },
      f8: {
        question: "ماذا يحدث خلال التدقيق المجاني؟",
        answer:
          "نحلل حضوركم الرقمي الحالي وحملاتكم ومسار التحويل. تغادرون بتشخيص واضح وخطة عمل عملية، سواء قررتم التعاون معنا أم لا.",
        category: "عام",
      },
    },
    pricing: {
      start: {
        name: "باقة Start",
        packLabel: "Start",
        description:
          "الأساسيات لإطلاق حضوركم الرقمي وحملاتكم الأولى.",
        period: "/ شهر",
        cta: "اختيار Start",
        features: [
          "2 Reels احترافية",
          "إدارة شبكات التواصل",
          "تصميم جرافيك",
          "تقويم نشر",
          "إطلاق وإدارة حملات Ads (Meta وGoogle وTikTok)",
          "متابعة شهرية",
        ],
      },
      performance: {
        name: "باقة Performance",
        packLabel: "Performance",
        description: "كل ما في Start، معزّز لتسريع نتائجكم.",
        period: "/ شهر",
        cta: "اختيار Performance",
        badge: "كل ما في Start +",
        features: [
          "3 Reels احترافية",
          "مزيد من المحتوى الجرافيكي",
          "مزيد من Stories",
          "تحسين متقدم للحملات (Meta وGoogle وTikTok)",
          "تحليل الأداء",
          "استشارات تسويقية",
        ],
      },
      premium: {
        name: "باقة Premium",
        packLabel: "Premium",
        description: "أكمل باقة لنمو رقمي بلا حدود.",
        period: "/ شهر",
        cta: "اختيار Premium",
        badge: "أكمل باقة لدينا.",
        featuresIntro: "تشمل:",
        features: [
          "4 Reels احترافية",
          "إدارة كاملة لشبكات التواصل",
          "تصميم جرافيك غير محدود حسب التخطيط",
          "Stories منتظمة",
          "حملات Ads محسّنة (Meta وGoogle وTikTok)",
          "تقارير شهرية مفصلة",
          "استراتيجية رقمية مخصصة",
          "أولوية في الطلبات",
        ],
      },
    },
    stats: {
      impressions: { label: "مرات الظهور المحققة" },
      leads: { label: "العملاء المحتملون المولّدون" },
      roas: { label: "متوسط ROAS" },
      campaigns: { label: "حملات نشطة" },
    },
    videoCategories: {
      all: "الكل",
      caseStudy: "دراسة حالة",
      testimonial: "شهادة",
      masterclass: "ماستركلاس",
      cro: "CRO",
      automation: "أتمتة",
    },
    caseStudyTags: {
      metaAds: "Meta Ads",
      cro: "CRO",
      automation: "أتمتة",
      googleAds: "Google Ads",
      performanceMax: "Performance Max",
      crm: "CRM",
      whatsApp: "WhatsApp",
      socialMedia: "السوشيال ميديا",
      branding: "الهوية البصرية",
      visualCreation: "إبداع بصري",
      multilingual: "متعدد اللغات",
    },
    results: {
      "meta-ads": {
        platform: "Meta Ads",
        title: "Meta Ads — Facebook وInstagram",
        description:
          "حملات استقطاب واسعة النطاق مع تكلفة lead مضبوطة لمراكز التكوين.",
        metrics: [
          { label: "Leads / شهر" },
          { label: "متوسط CPL" },
          { label: "ROAS" },
        ],
        screenshots: [
          { alt: "لوحة Meta Ads Manager", caption: "Ads Manager — أداء 30 يوماً" },
          { alt: "رسم أداء الحملات", caption: "تطور CPL" },
          { alt: "تقرير تحويلات Meta", caption: "تحويلات حسب الحملة" },
        ],
      },
      "tiktok-ads": {
        platform: "TikTok Ads",
        title: "TikTok Ads — استقطاب بالفيديو",
        description:
          "إبداعات فيديو أصلية واستهداف دقيق للوصول لجمهور شاب بأقل تكلفة lead.",
        metrics: [
          { label: "Leads / شهر" },
          { label: "متوسط CPL" },
          { label: "ROAS" },
        ],
        screenshots: [
          { alt: "لوحة TikTok Ads Manager", caption: "TikTok Ads Manager — 30 يوماً" },
          { alt: "أداء إبداعات TikTok", caption: "أفضل إبداعات الفيديو" },
        ],
      },
      "google-ads": {
        platform: "Google Ads",
        title: "Google Ads — Search وPMax",
        description:
          "التقاط الطلب عالي النية مع Quality Score محسّن وإضافات فعّالة.",
        metrics: [
          { label: "التحويلات" },
          { label: "متوسط CPC" },
          { label: "معدل التحويل" },
        ],
        screenshots: [
          { alt: "لوحة Google Ads", caption: "نظرة عامة على Search" },
          { alt: "أداء Performance Max", caption: "Performance Max — الأصول" },
        ],
      },
      "lead-forms": {
        platform: "Lead Forms",
        title: "نماذج Lead — فورية",
        description:
          "نماذج أصلية معبأة مسبقاً تعظم معدل الإكمال على الجوال.",
        metrics: [
          { label: "معدل الإكمال" },
          { label: "Leads مؤهلون" },
          { label: "تكلفة / نموذج" },
        ],
        screenshots: [
          { alt: "نموذج توليد leads", caption: "نموذج lead على الجوال" },
          { alt: "تحليل إكمال النماذج", caption: "مسار الإكمال" },
        ],
      },
      crm: {
        platform: "CRM",
        title: "CRM — متابعة وتحويل",
        description:
          "مسار منظم، scoring آلي ومتابعات لتحويل العملاء المحتملين إلى تسجيلات.",
        metrics: [
          { label: "معدل التسجيل" },
          { label: "زمن الاستجابة" },
          { label: "المسار المتابَع" },
        ],
        screenshots: [
          { alt: "مسار CRM للـ leads", caption: "Kanban pipeline" },
          { alt: "لوحة CRM", caption: "معدل التحويل حسب المرحلة" },
        ],
      },
      whatsapp: {
        platform: "WhatsApp",
        title: "WhatsApp — محادثة وإغلاق",
        description:
          "محادثات آلية وبشرية لإشراك العملاء حيث يردون بأكثر.",
        metrics: [
          { label: "معدل الفتح" },
          { label: "معدل الرد" },
          { label: "Leads مغلقة" },
        ],
        screenshots: [
          { alt: "محادثة WhatsApp Business", caption: "WhatsApp Business API" },
          { alt: "أتمتة WhatsApp", caption: "سيناريوهات آلية" },
        ],
      },
    },
    videos: {
      v1: {
        title: "كيف ولّدنا 1 200 lead/شهر لـ Skola",
        client: "Skola Formation",
        description:
          "دراسة حالة بالفيديو تفصّل استراتيجية Meta Ads ومسار التحويل الذي أنشأناه.",
      },
      v2: {
        title: "شهادة عميل — مدير CampusUp",
        client: "CampusUp",
        description:
          "مدير CampusUp يشارك النتائج بعد 6 أشهر من التعاون.",
      },
      v3: {
        title: "استراتيجية Google Ads لمراكز التكوين",
        client: "EduGrowth Digital",
        description:
          "ماستركلاس: هيكلة حملات Search لالتقاط الطلب عالي النية.",
      },
      v4: {
        title: "قبل / بعد: إعادة تصميم landing page",
        client: "FormaPro",
        description:
          "كيف ضاعفنا معدل تحويل صفحة هبوط تكوينية.",
      },
      v5: {
        title: "أتمتة تسويقية: سيناريو الرعاية المثالي",
        client: "EduNext",
        description:
          "تحليل لسلسلة رعاية بريد + WhatsApp تحوّل العملاء الخاملين.",
      },
      v6: {
        title: "شهادة — مسؤول الاستقطاب LearnLab",
        client: "LearnLab",
        description:
          "تجربة في إعداد قيادة بالبيانات وCRM عالي الأداء.",
      },
    },
    testimonials: {
      t1: {
        quote:
          "اكتشفت المدرسة على Instagram. المحتوى احترافي ومطمئن — سجّلت ابنتي مباشرة بعد منشوراتهم.",
        author: "@Sara_ElAmal",
        role: "ولي أمر",
        company: "فرنسية",
      },
      t2: {
        quote:
          "لقيت المدرسة على الإنستغرام، وكان التواصل سريعاً جداً — وهذا ما جعلني أختارها لابني.",
        author: "@Youssef_Mom",
        role: "ولي أمر",
        company: "عربية",
      },
      t3: {
        quote:
          "وجدت المدرسة عبر Facebook. الفيديوهات ساعدتني فعلاً على اتخاذ القرار.",
        author: "@Nadia.Learn",
        role: "طالبة",
        company: "ألمانية",
      },
      t4: {
        quote:
          "صادفت صفحتهم على TikTok، أعجبني جودة المحتوى وسجّلت مباشرة.",
        author: "@Omar_Study22",
        role: "طالب",
        company: "فرنسية",
      },
      t5: {
        quote:
          "تجربتي مع المدرسة بدأت من السوشيال ميديا — من أول تواصل حسّيت باحترافيتهم.",
        author: "@Imane_Benali",
        role: "ولي أمر",
        company: "عربية",
      },
      t6: {
        quote:
          "تجربة ممتازة! اكتشفت المدرسة على Instagram وكل شيء كان سريعاً وسهلاً.",
        author: "@Lucas_Wissen",
        role: "طالب",
        company: "ألمانية",
      },
    },
    caseStudies: {
      "skola-formation": {
        title: "1 200 lead/شهر لمؤسسة تكوين",
        client: "Skola Formation",
        industry: "تكوين مهني",
        description:
          "إعادة هيكلة كاملة للاستقطاب المدفوع لـ Skola — من حجم leads غير منتظم إلى آلة قابلة للتنبؤ تولّد أكثر من 1 200 طلب مؤهل شهرياً.",
        objectives: [
          "توليد حجم leads متوقع وقابل للتوسع",
          "خفض تكلفة الـ lead دون 55 درهم",
          "تحسين جودة الـ leads المُمرّرة للمستشارين",
        ],
        strategy: [
          "إعادة هيكلة كاملة لحساب Meta Ads بحملات ABO",
          "إبداعات فيديو أصلية موجهة بالفوائد",
          "تتبع تحويلات من جهة الخادم (CAPI)",
          "صفحات هبوط مخصصة لكل تكوين مع اختبارات A/B",
          "رعاية e-mail + WhatsApp للـ leads الدافئة",
        ],
        budget: "88 000 درهم / شهر",
        cpl: "53 درهم",
        roas: "5,2x",
        timeline: "6 أشهر",
        testimonials: [
          {
            quote:
              "في 6 أشهر، ضاعف EduGrowth تسجيلاتنا 4 مرات. فريق مدفوع بالبيانات وشفاف.",
            author: "Camille Robert",
            role: "مديرة، Skola Formation",
          },
        ],
      },
      "campusup-search": {
        title: "ROAS 6,1x عبر Google Ads لـ CampusUp",
        client: "CampusUp",
        industry: "تعلم إلكتروني",
        description:
          "التقاط الطلب عالي النية على Google لـ CampusUp بهيكلة Search + Performance Max التي رفعت العائد على الاستثمار.",
        objectives: [
          "التقاط طلب البحث على التكوينات المعتمدة",
          "تعظيم ROAS بميزانية محدودة",
          "خفض CPA مع زيادة الحجم",
        ],
        strategy: [
          "تدقيق وبحث كلمات مفتاحية عالية النية",
          "هيكلة Search حسب موضوع التكوين",
          "حملات Performance Max بأصول premium",
          "تحسين مستمر للمزايدات وQuality Score",
          "ربط CRM للتحسين على leads مؤهلين",
        ],
        budget: "132 000 درهم / شهر",
        cpl: "68 درهم",
        roas: "6,1x",
        timeline: "5 أشهر",
        testimonials: [
          {
            quote:
              "CPL انقسم إلى النصف ومسار أصبح واضحاً أخيراً. فريق سريع الاستجابة وشفاف.",
            author: "Mehdi Lefort",
            role: "مسؤول الاستقطاب، CampusUp",
          },
        ],
      },
      "edunext-automation": {
        title: "مسار تسجيل آلي لـ EduNext",
        client: "EduNext",
        industry: "تكوين عن بُعد",
        description:
          "محرك رعاية متعدد القنوات يحوّل leads خاملة إلى تسجيلات دون تدخل بشري في المراحل الأولى.",
        objectives: [
          "إعادة تنشيط قاعدة leads باردة",
          "أتمتة التأهيل والمتابعات",
          "رفع معدل تحويل lead → تسجيل",
        ],
        strategy: [
          "Scoring وتقسيم في CRM",
          "سيناريوهات e-mail + SMS + WhatsApp حسب السلوك",
          "webinars آلية في منتصف المسار",
          "تحسين السلاسل باختبارات A/B",
        ],
        budget: "55 000 درهم / شهر",
        cpl: "65 درهم",
        roas: "4,7x",
        timeline: "4 أشهر",
        testimonials: [
          {
            quote:
              "المسار الذي بنوه يعمل وحده. نملأ دوراتنا مسبقاً.",
            author: "Sophie Nguyen",
            role: "مؤسسة، EduNext",
          },
        ],
      },
      "millennia-group-prive": {
        title: "هوية سوشيال ميديا واستقطاب لـ Millennia (مراكش)",
        client: "Millennia Group Privé",
        industry: "مركز تكوين لغوي",
        description:
          "قيادة كاملة للتواصل الرقمي لـ Millennia Group Privé بمراكش (لغات، معلوميات، تحضير TELC/Goethe). هوية بصرية فاخرة وحملات سوشيال متعددة اللغات (عربي، فرنسي) رفعت طلبات التسجيل.",
        objectives: [
          "بناء هوية بصرية متسقة ومعروفة على الشبكات",
          "توليد تدفق منتظم لطلبات التسجيل",
          "تغطية العرض: ألماني، إنجليزي، فرنسي، إسباني، معلوميات",
          "تحريك المجتمع حول المناسبات (رمضان، العيد، التوظيف، الأخبار)",
        ],
        strategy: [
          "توجيه فني وقوالب بألوان العلامة",
          "تقويم تحريري متعدد اللغات (عربي / فرنسي) على Instagram وFacebook",
          "مرئيات عروض (حزم لغات + معلوميات مجاني)",
          "حملات توظيف مدربين ومنشورات العلامة",
          "محتوى موسمي ووعي لزيادة engagement",
        ],
        budget: "حسب العرض",
        cpl: "—",
        roas: "—",
        timeline: "مهمة مستمرة",
        testimonials: [
          {
            quote:
              "حضورنا على الشبكات أصبح احترافياً ومستمراً. المرئيات تعكس أخيراً صورة مركزنا.",
            author: "الإدارة",
            role: "Millennia Group Privé، مراكش",
          },
        ],
      },
    },
  },
};

/** Fix known typos in French case study strategy from JSON source. */
function normalizeFrenchCaseStudyText(text) {
  return text
    .replace(/\bcreatives\b/gi, "créatives")
    .replace(/social-media/g, "réseaux sociaux");
}

function buildServices(locale) {
  const items =
    locale === "fr"
      ? servicesFr
      : localeBundles[locale].services;
  return { items };
}

function buildFaq(locale) {
  const items = locale === "fr" ? faqFr : localeBundles[locale].faq;
  return { items };
}

function buildPricing(locale) {
  const items = locale === "fr" ? pricingFr : localeBundles[locale].pricing;
  return { items };
}

function buildStats(locale) {
  const items = locale === "fr" ? statsFr : localeBundles[locale].stats;
  return { items };
}

function buildResults(locale) {
  const items = {};
  for (const result of adResultsFr) {
    const id = result.id;
    if (locale === "fr") {
      items[id] = {
        platform: result.platform,
        title: result.title,
        description: result.description,
        metrics: result.metrics.map((m) => ({ label: m.label })),
        screenshots: result.screenshots.map((s) => ({
          alt: s.alt,
          caption: s.caption ?? "",
        })),
      };
    } else {
      const tr = localeBundles[locale].results[id];
      items[id] = {
        platform: tr.platform,
        title: tr.title,
        description: tr.description,
        metrics: tr.metrics,
        screenshots: tr.screenshots,
      };
    }
  }
  return { items };
}

function buildVideos(locale) {
  const categories =
    locale === "fr"
      ? {
          all: "Tous",
          caseStudy: "Étude de cas",
          testimonial: "Témoignage",
          masterclass: "Masterclass",
          cro: "CRO",
          automation: "Automation",
        }
      : localeBundles[locale].videoCategories;

  const items = {};
  for (const video of videosFr) {
    const categoryKey = VIDEO_CATEGORY_TO_KEY[video.category];
    if (!categoryKey) {
      throw new Error(`Unknown video category: ${video.category}`);
    }
    if (locale === "fr") {
      items[video.id] = {
        title: video.title,
        client: video.client,
        description: video.description,
        categoryKey,
      };
    } else {
      const tr = localeBundles[locale].videos[video.id];
      items[video.id] = { ...tr, categoryKey };
    }
  }

  return { categoryKeys: VIDEO_CATEGORY_KEYS, categories, items };
}

function buildTestimonials(locale) {
  const items = {};
  for (const t of testimonialsFr) {
    if (locale === "fr") {
      items[t.id] = {
        quote: t.quote,
        author: t.author,
        role: t.role,
        company: t.company,
      };
    } else {
      items[t.id] = localeBundles[locale].testimonials[t.id];
    }
  }
  return { items };
}

function buildCaseStudies(locale) {
  const tagLabels =
    locale === "fr"
      ? Object.fromEntries(
          Object.entries(TAG_LABEL_TO_KEY).map(([label, key]) => [key, label])
        )
      : localeBundles[locale].caseStudyTags;

  const items = {};
  for (const study of caseStudiesSource) {
    const slug = study.slug;
    const tagKeys = study.tags.map(
      (label) => TAG_LABEL_TO_KEY[label] ?? label.replace(/\s+/g, "")
    );

    const structural = {
      leads: study.leads,
      cover: study.cover,
      images: study.images,
      videos: study.videos,
      featured: study.featured ?? false,
      tags: tagKeys,
    };

    if (locale === "fr") {
      items[slug] = {
        title: study.title,
        client: study.client,
        industry: study.industry,
        description: study.description,
        objectives: study.objectives.map(normalizeFrenchCaseStudyText),
        strategy: study.strategy.map(normalizeFrenchCaseStudyText),
        budget: study.budget,
        cpl: study.cpl,
        roas: study.roas,
        timeline: study.timeline,
        structural,
        testimonials: study.testimonials,
      };
    } else {
      const tr = localeBundles[locale].caseStudies[slug];
      items[slug] = {
        ...tr,
        structural,
        testimonials: tr.testimonials,
      };
    }
  }

  return { tags: tagLabels, items };
}

const builders = {
  services: buildServices,
  faq: buildFaq,
  pricing: buildPricing,
  stats: buildStats,
  results: buildResults,
  videos: buildVideos,
  testimonials: buildTestimonials,
  caseStudies: buildCaseStudies,
};

const created = [];

for (const locale of locales) {
  const dir = join(root, "messages", locale);
  mkdirSync(dir, { recursive: true });
  for (const [name, build] of Object.entries(builders)) {
    const filePath = join(dir, `${name}.json`);
    writeFileSync(filePath, `${JSON.stringify(build(locale), null, 2)}\n`);
    created.push(filePath);
  }
}

console.log("Generated data message files:");
for (const f of created) {
  console.log(`  ${f.replace(root + "/", "")}`);
}
