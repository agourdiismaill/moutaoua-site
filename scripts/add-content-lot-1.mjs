#!/usr/bin/env node
/**
 * Lot 1 — pilier Communication, quatre services et hub Casablanca.
 * Maintient la parité des clés i18n FR / EN / AR.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const localized = {
  fr: {
    pillar: {
      title: "Communication",
      description: "Stratégie de marque, communication intégrée et marketing digital",
    },
    services: {
      "agence-communication-maroc": {
        title: "Agence de Communication Maroc",
        description:
          "Stratégie, contenus et campagnes intégrées pour construire une marque cohérente et visible.",
        longDescription:
          "Mohtaoua orchestre votre communication de la plateforme de marque à la diffusion multicanale, avec une équipe locale et des résultats mesurables.",
        features: [
          "Stratégie de communication",
          "Plateforme de marque",
          "Campagnes multicanales",
          "Pilotage et reporting",
        ],
      },
      "agence-marketing-digital-maroc": {
        title: "Agence Marketing Digital Maroc",
        description:
          "Acquisition, SEO, contenus, CRM et automatisation réunis dans une stratégie orientée croissance.",
        longDescription:
          "Un partenaire unique pour concevoir, exécuter et optimiser votre marketing digital au Maroc, de la génération de demande à la conversion commerciale.",
        features: [
          "Stratégie d'acquisition",
          "SEO et publicité digitale",
          "CRM et automatisation",
          "Attribution et reporting",
        ],
      },
      "marketing-digital-maroc": {
        title: "Marketing Digital Maroc",
        description:
          "Une stratégie digitale structurée pour attirer, convertir et fidéliser vos clients au Maroc.",
        longDescription:
          "Audit, plan d'action, choix des canaux, contenus, campagnes et mesure : nous transformons le marketing digital en système de croissance pilotable.",
        features: [
          "Audit marketing digital",
          "Plan d'action multicanal",
          "Optimisation des conversions",
          "Tableaux de bord business",
        ],
      },
      "agence-creative-maroc": {
        title: "Agence Créative Maroc",
        description:
          "Concepts, identité visuelle et contenus créatifs conçus pour rendre votre marque mémorable.",
        longDescription:
          "Direction artistique, campagnes, design et production de contenus : Mohtaoua donne une expression distinctive à votre marque sur tous les points de contact.",
        features: [
          "Direction artistique",
          "Concepts de campagne",
          "Identité et design",
          "Production de contenus",
        ],
      },
    },
    pages: {
      "agence-communication-maroc": {
        metaTitle: "Agence de Communication au Maroc | Mohtaoua",
        metaDescription:
          "Agence de communication 360° au Maroc : stratégie, branding, contenus et campagnes multicanales. Audit gratuit avec Mohtaoua.",
        overview: {
          what: "Une offre de communication intégrée qui aligne positionnement, identité, contenus et diffusion.",
          who: "Dirigeants et responsables marketing qui veulent une marque cohérente et un partenaire capable de piloter tous les canaux.",
          benefits: [
            "Un message de marque clair et différenciant",
            "Une exécution cohérente sur chaque point de contact",
            "Des campagnes mesurées par des indicateurs business",
          ],
          topics: ["Stratégie de communication", "Branding", "Contenus", "Média", "Reporting"],
          takeaways: [
            "Un interlocuteur pour la stratégie et la production",
            "Une équipe multidisciplinaire basée au Maroc",
            "Un audit initial gratuit et actionnable",
          ],
        },
        problem:
          "Votre communication est dispersée entre plusieurs prestataires, sans message central, calendrier commun ni mesure fiable de son impact.",
        solution:
          "Nous construisons une plateforme de communication unique, puis orchestrons branding, contenus, campagnes et supports autour d'objectifs mesurables.",
        howItWorks: [
          "Audit de marque, audiences et canaux",
          "Positionnement, messages et plan de communication",
          "Création des campagnes et des contenus",
          "Diffusion, mesure et optimisation continue",
        ],
        industries: ["Éducation", "Santé", "Immobilier", "Hôtellerie", "Retail", "B2B"],
        faqs: [
          {
            question: "Quels services couvre votre agence de communication ?",
            answer:
              "Stratégie, branding, identité visuelle, création de contenu, réseaux sociaux, publicité, vidéo, supports imprimés et communication événementielle.",
          },
          {
            question: "Travaillez-vous avec des entreprises hors Casablanca ?",
            answer:
              "Oui. Nous accompagnons des organisations partout au Maroc avec des ateliers à distance ou sur site selon le projet.",
          },
          {
            question: "Comment mesurez-vous les résultats ?",
            answer:
              "Nous définissons des KPI liés à la notoriété, l'engagement, la génération de demande et les conversions, puis partageons un reporting régulier.",
          },
          {
            question: "Peut-on commencer par un audit ?",
            answer:
              "Oui. L'audit gratuit identifie les incohérences, les opportunités prioritaires et les actions à lancer sur 90 jours.",
          },
        ],
      },
      "agence-marketing-digital-maroc": {
        metaTitle: "Agence Marketing Digital Maroc | Acquisition & ROI",
        metaDescription:
          "Agence marketing digital au Maroc : SEO, Meta Ads, Google Ads, TikTok, CRM et automation. Stratégie orientée ROI et audit gratuit.",
        overview: {
          what: "Un accompagnement d'agence pour piloter l'ensemble de votre acquisition et de votre conversion digitale.",
          who: "Entreprises qui cherchent une équipe experte et un interlocuteur unique plutôt qu'une accumulation de prestataires.",
          benefits: [
            "Canaux d'acquisition coordonnés",
            "Leads suivis jusqu'à la vente dans le CRM",
            "Budgets arbitrés selon la rentabilité réelle",
          ],
          topics: ["SEO", "Google Ads", "Meta Ads", "TikTok Ads", "CRM", "Automation"],
          takeaways: [
            "Stratégie et exécution réunies",
            "Reporting orienté chiffre d'affaires",
            "Optimisation continue par la donnée",
          ],
        },
        problem:
          "Vos canaux digitaux fonctionnent en silos : les campagnes génèrent des leads, mais l'attribution, le suivi commercial et la rentabilité restent flous.",
        solution:
          "Mohtaoua relie acquisition, landing pages, tracking, CRM et relances dans un dispositif unique piloté par le coût d'acquisition client.",
        howItWorks: [
          "Audit des performances et du parcours de conversion",
          "Priorisation des canaux selon vos objectifs",
          "Déploiement des campagnes, contenus et outils",
          "Optimisation hebdomadaire et reporting business",
        ],
        industries: ["E-commerce", "Services", "Santé", "Immobilier", "Éducation", "Industrie"],
        faqs: [
          {
            question: "Quels canaux gérez-vous ?",
            answer:
              "SEO, GEO, Google Ads, Meta Ads, TikTok Ads, social media, email, landing pages, CRM et marketing automation.",
          },
          {
            question: "Quel budget faut-il prévoir ?",
            answer:
              "Le budget dépend du marché et des objectifs. Après audit, nous recommandons un scénario progressif sans engagement sur un résultat irréaliste.",
          },
          {
            question: "Le budget média est-il inclus ?",
            answer:
              "Non. Les honoraires couvrent la stratégie, la production et le pilotage ; les dépenses publicitaires sont payées directement aux plateformes.",
          },
          {
            question: "Comment choisissez-vous les canaux ?",
            answer:
              "Nous croisons intention de recherche, maturité de l'audience, économie unitaire et capacité commerciale avant de répartir le budget.",
          },
        ],
      },
      "marketing-digital-maroc": {
        metaTitle: "Marketing Digital au Maroc : Stratégie 360° | Mohtaoua",
        metaDescription:
          "Structurez votre marketing digital au Maroc : audit, acquisition, contenus, conversion, CRM et mesure. Plan d'action adapté à votre entreprise.",
        overview: {
          what: "Une méthodologie complète pour structurer le marketing digital comme un système de croissance.",
          who: "PME, startups et grands comptes qui veulent prioriser leurs actions et mieux rentabiliser leurs investissements digitaux.",
          benefits: [
            "Une feuille de route claire et priorisée",
            "Un parcours prospect cohérent de l'audience à la vente",
            "Des décisions fondées sur des données fiables",
          ],
          topics: ["Stratégie digitale", "Acquisition", "Contenus", "Conversion", "CRM", "Analytics"],
          takeaways: [
            "Commencer par les objectifs business",
            "Mesurer la qualité des leads, pas seulement leur volume",
            "Relier marketing et processus commercial",
          ],
        },
        problem:
          "Vous multipliez les publications, campagnes et outils sans feuille de route commune, ce qui disperse les ressources et empêche d'identifier les leviers rentables.",
        solution:
          "Nous auditons le parcours actuel, choisissons les canaux prioritaires et construisons un plan combinant acquisition, contenu, conversion et fidélisation.",
        howItWorks: [
          "Diagnostic des audiences, offres et données",
          "Définition des objectifs et indicateurs",
          "Plan d'action trimestriel priorisé",
          "Exécution, apprentissage et amélioration continue",
        ],
        industries: ["PME", "Startups", "E-commerce", "B2B", "Services", "Retail"],
        faqs: [
          {
            question: "Par où commencer en marketing digital ?",
            answer:
              "Commencez par clarifier votre cible, votre offre, votre objectif commercial et votre capacité de suivi avant de sélectionner les canaux.",
          },
          {
            question: "Faut-il être présent sur tous les réseaux ?",
            answer:
              "Non. Il vaut mieux maîtriser les canaux où votre audience recherche ou découvre votre offre que disperser les efforts.",
          },
          {
            question: "Quand peut-on mesurer les résultats ?",
            answer:
              "Les premières données arrivent rapidement, mais une lecture fiable exige généralement plusieurs semaines et un volume suffisant de conversions.",
          },
          {
            question: "Mohtaoua peut-elle exécuter le plan ?",
            answer:
              "Oui. Notre équipe couvre stratégie, publicité, SEO, contenus, web, CRM, automatisation et analyse.",
          },
        ],
      },
      "agence-creative-maroc": {
        metaTitle: "Agence Créative au Maroc | Branding, Design & Contenu",
        metaDescription:
          "Agence créative au Maroc : concepts de campagne, identité, design, photo et vidéo. Donnez à votre marque une expression distinctive.",
        overview: {
          what: "Une direction créative complète pour transformer votre stratégie de marque en identité et campagnes mémorables.",
          who: "Marques en lancement, repositionnement ou croissance qui veulent se différencier sur des marchés encombrés.",
          benefits: [
            "Une idée créative cohérente avec le positionnement",
            "Des assets adaptés à chaque canal",
            "Une production centralisée et plus rapide",
          ],
          topics: ["Direction artistique", "Branding", "Design", "Campagnes", "Photo", "Vidéo"],
          takeaways: [
            "La création sert un objectif de marque",
            "Chaque format respecte une direction commune",
            "Les concepts sont déclinables et mesurables",
          ],
        },
        problem:
          "Votre marque produit des visuels isolés sans territoire créatif reconnaissable, ce qui réduit la mémorisation et la cohérence des campagnes.",
        solution:
          "Nous définissons le concept, la direction artistique et le système visuel, puis produisons les déclinaisons digitales, imprimées et audiovisuelles.",
        howItWorks: [
          "Immersion dans la marque et son marché",
          "Concepts créatifs et pistes artistiques",
          "Production et déclinaison multiformat",
          "Contrôle qualité et optimisation des assets",
        ],
        industries: ["Retail", "Hôtellerie", "Immobilier", "E-commerce", "Beauté", "Corporate"],
        faqs: [
          {
            question: "Quelle différence entre agence créative et agence de communication ?",
            answer:
              "L'agence créative se concentre sur les concepts, l'identité et la production ; l'agence de communication orchestre aussi la stratégie et la diffusion.",
          },
          {
            question: "Produisez-vous aussi photo et vidéo ?",
            answer:
              "Oui. Direction artistique, photographie, vidéo, motion design, Reels et adaptations publicitaires peuvent être réunis dans le projet.",
          },
          {
            question: "Pouvez-vous travailler avec notre identité existante ?",
            answer:
              "Oui. Nous pouvons l'enrichir, créer une campagne dans ses codes ou recommander une évolution si elle limite la marque.",
          },
          {
            question: "Combien de pistes créatives présentez-vous ?",
            answer:
              "Le nombre dépend du périmètre. Nous privilégions quelques pistes argumentées plutôt qu'un grand volume de propositions superficielles.",
          },
        ],
      },
    },
    cityContext: {
      title: "Votre agence digitale locale",
      prefix: "Pour compléter {service} à {ville}, découvrez",
      agencyLink: "tous les services de notre agence digitale à {ville}",
    },
    agencyHub: {
      labels: {
        home: "Accueil",
        share: "Partager",
        aiOverview: "Résumé de la page",
        what: "De quoi parle cette page ?",
        who: "À qui s'adresse-t-elle ?",
        benefits: "Bénéfices clés",
        topics: "Sujets couverts",
        takeaways: "Points à retenir",
        readingTime: "{minutes} min de lecture",
        challenges: "Enjeux digitaux à {ville}",
        approach: "Notre approche locale",
        servicesInCity: "Nos services à {ville}",
        servicesInCityDescription:
          "Explorez toutes les expertises Mohtaoua disponibles à {ville}. Chaque lien mène vers une page locale dédiée au service.",
      },
      items: {
        casablanca: {
          metaTitle: "Agence Digitale Casablanca | Mohtaoua 360°",
          metaDescription:
            "Agence digitale à Casablanca : marketing, web, logiciels, mobile, design et automatisation. 53 expertises locales et audit gratuit.",
          h1: "Agence digitale à Casablanca",
          intro:
            "Mohtaoua accompagne les entreprises de Casablanca avec une équipe 360° capable de relier marketing, technologie, création et automatisation.",
          overview: {
            what: "Le hub local qui rassemble toutes les expertises digitales proposées par Mohtaoua aux entreprises de Casablanca.",
            who: "Dirigeants, directions marketing et équipes digitales de PME, startups, institutions et grands comptes casablancais.",
            benefits: [
              "Un partenaire unique pour le marketing et la technologie",
              "Des expertises locales reliées à vos objectifs business",
              "Un pilotage transparent de la stratégie à l'optimisation",
            ],
            topics: [
              "Acquisition digitale",
              "Sites web et e-commerce",
              "Logiciels, CRM et automatisation",
              "Branding, photo et vidéo",
            ],
            takeaways: [
              "53 services disponibles à Casablanca",
              "Équipe multidisciplinaire basée au Maroc",
              "Audit gratuit avec plan d'action priorisé",
            ],
          },
          paragraphs: [
            "Casablanca concentre les sièges sociaux, groupes industriels, banques, startups et entreprises de services les plus compétitifs du Maroc. Dans cet environnement, une présence digitale fragmentée ne suffit plus : la marque, l'acquisition, le site, les données et le processus commercial doivent fonctionner ensemble.",
            "Notre rôle d'agence digitale à Casablanca consiste à construire ce système complet. Nous partons des objectifs commerciaux, identifions les points de friction, puis réunissons les expertises nécessaires : SEO, publicité, contenus, web, logiciels, CRM, automatisation, design et production audiovisuelle.",
            "Chaque mission est pilotée avec des indicateurs adaptés au résultat attendu : coût par lead qualifié, conversion, chiffre d'affaires attribué, visibilité organique, adoption d'un outil ou gains de productivité. Vous disposez ainsi d'une lecture claire des actions et des arbitrages.",
            "La section ci-dessous relie directement toutes nos pages service à Casablanca. Elle permet de comparer les expertises, d'approfondir votre besoin et d'accéder au contenu local spécifique de chaque prestation.",
          ],
          challenges: [
            "Se différencier dans un marché local très concurrentiel",
            "Relier campagnes marketing et suivi commercial",
            "Moderniser les outils sans interrompre les opérations",
            "Produire des contenus cohérents à grande échelle",
          ],
          approach: [
            "Audit de la marque, des canaux, du site et des données",
            "Feuille de route priorisée selon impact et faisabilité",
            "Équipe dédiée réunissant stratégie, création et technologie",
            "Reporting régulier et optimisation continue",
          ],
          faqs: [
            {
              question: "Quels services propose votre agence digitale à Casablanca ?",
              answer:
                "Nous couvrons 53 expertises : marketing digital, SEO, publicité, web, e-commerce, logiciels, applications mobiles, CRM, automatisation, IA, branding, photo, vidéo et événements.",
            },
            {
              question: "Travaillez-vous avec les PME et les grands comptes ?",
              answer:
                "Oui. Le périmètre et l'équipe sont adaptés à la maturité, aux objectifs et aux contraintes de chaque organisation.",
            },
            {
              question: "Pouvez-vous intervenir dans nos locaux à Casablanca ?",
              answer:
                "Oui. Les ateliers de cadrage, tournages et réunions stratégiques peuvent être réalisés sur site ou à distance.",
            },
            {
              question: "Comment démarrer avec Mohtaoua ?",
              answer:
                "Demandez un audit gratuit. Nous analysons votre situation et proposons un plan d'action priorisé, sans devis ferme avant d'avoir cadré le besoin.",
            },
          ],
        },
      },
    },
  },
  en: {
    pillar: {
      title: "Communication",
      description: "Brand strategy, integrated communication and digital marketing",
    },
    services: {
      "agence-communication-maroc": {
        title: "Communication Agency Morocco",
        description: "Integrated strategy, content and campaigns for a consistent, visible brand.",
        longDescription:
          "Mohtaoua coordinates your communication from brand platform to multichannel distribution, with a local team and measurable outcomes.",
        features: ["Communication strategy", "Brand platform", "Multichannel campaigns", "Reporting"],
      },
      "agence-marketing-digital-maroc": {
        title: "Digital Marketing Agency Morocco",
        description: "Acquisition, SEO, content, CRM and automation in one growth strategy.",
        longDescription:
          "One partner to design, execute and optimize your digital marketing in Morocco, from demand generation to sales conversion.",
        features: ["Acquisition strategy", "SEO and paid media", "CRM and automation", "Attribution"],
      },
      "marketing-digital-maroc": {
        title: "Digital Marketing Morocco",
        description: "A structured strategy to attract, convert and retain customers in Morocco.",
        longDescription:
          "Audit, roadmap, channel selection, content, campaigns and measurement: we turn digital marketing into a manageable growth system.",
        features: ["Digital audit", "Multichannel roadmap", "Conversion optimization", "Business dashboards"],
      },
      "agence-creative-maroc": {
        title: "Creative Agency Morocco",
        description: "Concepts, visual identity and creative content that make your brand memorable.",
        longDescription:
          "Art direction, campaigns, design and content production: Mohtaoua gives your brand a distinctive expression across every touchpoint.",
        features: ["Art direction", "Campaign concepts", "Identity and design", "Content production"],
      },
    },
    pages: {
      "agence-communication-maroc": {
        metaTitle: "Communication Agency Morocco | Mohtaoua",
        metaDescription:
          "360° communication agency in Morocco: strategy, branding, content and multichannel campaigns. Request a free audit.",
        overview: {
          what: "Integrated communication aligning positioning, identity, content and distribution.",
          who: "Leaders and marketing teams seeking a consistent brand and one partner across channels.",
          benefits: ["Clear positioning", "Consistent execution", "Business-oriented measurement"],
          topics: ["Communication strategy", "Branding", "Content", "Media", "Reporting"],
          takeaways: ["One strategic and production partner", "Morocco-based team", "Free initial audit"],
        },
        problem:
          "Your communication is split across suppliers without a central message, shared calendar or reliable impact measurement.",
        solution:
          "We create one communication platform and coordinate branding, content, campaigns and collateral around measurable goals.",
        howItWorks: ["Brand and channel audit", "Positioning and plan", "Campaign production", "Measurement and optimization"],
        industries: ["Education", "Healthcare", "Real estate", "Hospitality", "Retail", "B2B"],
        faqs: [
          { question: "What services do you cover?", answer: "Strategy, branding, identity, content, social media, advertising, video, print and events." },
          { question: "Do you work outside Casablanca?", answer: "Yes. We support organizations across Morocco through remote and on-site workshops." },
          { question: "How do you measure results?", answer: "We track awareness, engagement, demand and conversion indicators through regular reporting." },
          { question: "Can we start with an audit?", answer: "Yes. The free audit identifies gaps and priority actions for the next 90 days." },
        ],
      },
      "agence-marketing-digital-maroc": {
        metaTitle: "Digital Marketing Agency Morocco | Acquisition & ROI",
        metaDescription:
          "Digital marketing agency in Morocco: SEO, Meta Ads, Google Ads, TikTok, CRM and automation. ROI-focused strategy and free audit.",
        overview: {
          what: "Agency support covering your complete digital acquisition and conversion system.",
          who: "Companies seeking one accountable expert team instead of disconnected suppliers.",
          benefits: ["Coordinated acquisition channels", "CRM-linked leads", "Budget allocated by profitability"],
          topics: ["SEO", "Google Ads", "Meta Ads", "TikTok Ads", "CRM", "Automation"],
          takeaways: ["Strategy and delivery together", "Revenue-focused reporting", "Continuous optimization"],
        },
        problem:
          "Your channels operate in silos: campaigns generate leads, but attribution, sales follow-up and profitability remain unclear.",
        solution:
          "Mohtaoua connects acquisition, landing pages, tracking, CRM and follow-up in one customer-acquisition system.",
        howItWorks: ["Performance audit", "Channel prioritization", "Campaign and tool deployment", "Weekly optimization"],
        industries: ["E-commerce", "Services", "Healthcare", "Real estate", "Education", "Industry"],
        faqs: [
          { question: "Which channels do you manage?", answer: "SEO, GEO, Google, Meta, TikTok, social, email, landing pages, CRM and automation." },
          { question: "What budget is required?", answer: "It depends on the market and goals. We recommend a progressive scenario after the audit." },
          { question: "Is media spend included?", answer: "No. Platform spend is paid directly; our fees cover strategy, production and management." },
          { question: "How do you select channels?", answer: "We assess intent, audience maturity, unit economics and sales capacity." },
        ],
      },
      "marketing-digital-maroc": {
        metaTitle: "Digital Marketing in Morocco: 360° Strategy | Mohtaoua",
        metaDescription:
          "Structure digital marketing in Morocco: audit, acquisition, content, conversion, CRM and measurement. Get a tailored roadmap.",
        overview: {
          what: "A complete methodology for building digital marketing as a growth system.",
          who: "SMEs, startups and enterprises seeking clearer priorities and stronger returns.",
          benefits: ["Prioritized roadmap", "Consistent customer journey", "Data-driven decisions"],
          topics: ["Digital strategy", "Acquisition", "Content", "Conversion", "CRM", "Analytics"],
          takeaways: ["Start from business goals", "Measure lead quality", "Connect marketing and sales"],
        },
        problem:
          "You multiply posts, campaigns and tools without a shared roadmap, spreading resources and hiding profitable levers.",
        solution:
          "We audit the journey, select priority channels and build a plan covering acquisition, content, conversion and retention.",
        howItWorks: ["Audience and data diagnosis", "Goals and KPIs", "Quarterly roadmap", "Execution and improvement"],
        industries: ["SMEs", "Startups", "E-commerce", "B2B", "Services", "Retail"],
        faqs: [
          { question: "Where should digital marketing start?", answer: "Clarify your audience, offer, sales goal and follow-up capacity before selecting channels." },
          { question: "Should we use every social network?", answer: "No. Focus on channels where your audience searches for or discovers your offer." },
          { question: "When can results be measured?", answer: "Early data arrives quickly, but reliable conclusions need several weeks and enough conversions." },
          { question: "Can Mohtaoua execute the plan?", answer: "Yes. We cover strategy, media, SEO, content, web, CRM, automation and analytics." },
        ],
      },
      "agence-creative-maroc": {
        metaTitle: "Creative Agency Morocco | Branding, Design & Content",
        metaDescription:
          "Creative agency in Morocco: campaign concepts, identity, design, photography and video. Give your brand a distinctive expression.",
        overview: {
          what: "Complete creative direction turning brand strategy into memorable identity and campaigns.",
          who: "Brands launching, repositioning or growing in crowded markets.",
          benefits: ["Positioning-led ideas", "Channel-ready assets", "Centralized production"],
          topics: ["Art direction", "Branding", "Design", "Campaigns", "Photography", "Video"],
          takeaways: ["Creativity serves the brand", "One direction across formats", "Scalable concepts"],
        },
        problem:
          "Your brand produces isolated visuals without a recognizable creative territory, weakening recall and campaign consistency.",
        solution:
          "We define the concept, art direction and visual system, then produce digital, print and audiovisual adaptations.",
        howItWorks: ["Brand immersion", "Creative concepts", "Multiformat production", "Quality control"],
        industries: ["Retail", "Hospitality", "Real estate", "E-commerce", "Beauty", "Corporate"],
        faqs: [
          { question: "Creative or communication agency?", answer: "A creative agency focuses on concepts and production; communication also coordinates strategy and distribution." },
          { question: "Do you produce photo and video?", answer: "Yes. Photography, video, motion and Reels can be included." },
          { question: "Can you use our existing identity?", answer: "Yes. We can extend it or recommend an evolution when needed." },
          { question: "How many concepts do you present?", answer: "It depends on scope; we prioritize a few well-reasoned directions." },
        ],
      },
    },
    cityContext: {
      title: "Your local digital agency",
      prefix: "To complement {service} in {ville}, explore",
      agencyLink: "all services from our digital agency in {ville}",
    },
    agencyHub: {
      labels: {
        home: "Home",
        share: "Share",
        aiOverview: "Page summary",
        what: "What is this page about?",
        who: "Who is it for?",
        benefits: "Key benefits",
        topics: "Topics covered",
        takeaways: "Key takeaways",
        readingTime: "{minutes} min read",
        challenges: "Digital challenges in {ville}",
        approach: "Our local approach",
        servicesInCity: "Our services in {ville}",
        servicesInCityDescription:
          "Explore every Mohtaoua expertise available in {ville}. Each link opens the dedicated local service page.",
      },
      items: {
        casablanca: {
          metaTitle: "Digital Agency Casablanca | Mohtaoua 360°",
          metaDescription:
            "Digital agency in Casablanca: marketing, web, software, mobile, design and automation. 53 local services and a free audit.",
          h1: "Digital agency in Casablanca",
          intro:
            "Mohtaoua supports Casablanca businesses with a 360° team connecting marketing, technology, creative and automation.",
          overview: {
            what: "The local hub gathering every Mohtaoua digital expertise available to Casablanca businesses.",
            who: "Leaders and digital teams in Casablanca SMEs, startups, institutions and enterprises.",
            benefits: ["One marketing and technology partner", "Local expertise tied to business goals", "Transparent management"],
            topics: ["Digital acquisition", "Web and e-commerce", "Software, CRM and automation", "Branding, photo and video"],
            takeaways: ["53 services in Casablanca", "Morocco-based multidisciplinary team", "Free prioritized audit"],
          },
          paragraphs: [
            "Casablanca concentrates Morocco's corporate headquarters, industrial groups, banks, startups and most competitive service companies. In this environment, fragmented digital activity is no longer enough: brand, acquisition, website, data and sales must work together.",
            "Our role as a digital agency in Casablanca is to build that complete system. We start from business goals, identify friction points and bring together the right expertise: SEO, media, content, web, software, CRM, automation, design and audiovisual production.",
            "Every engagement is managed with indicators tied to the expected outcome: qualified-lead cost, conversion, attributed revenue, organic visibility, tool adoption or productivity gains.",
            "The section below links every local service page in Casablanca, helping you explore each expertise and its local context.",
          ],
          challenges: ["Differentiate in a competitive market", "Connect marketing and sales", "Modernize tools safely", "Scale consistent content"],
          approach: ["Brand and channel audit", "Prioritized roadmap", "Dedicated multidisciplinary team", "Regular reporting"],
          faqs: [
            { question: "Which services do you offer in Casablanca?", answer: "We cover 53 areas across marketing, web, software, mobile, CRM, automation, AI, branding, photo, video and events." },
            { question: "Do you work with SMEs and enterprises?", answer: "Yes. Scope and team adapt to each organization's maturity and constraints." },
            { question: "Can you work at our Casablanca office?", answer: "Yes. Workshops, shoots and strategic meetings can be held on-site or remotely." },
            { question: "How do we start?", answer: "Request a free audit for a prioritized action plan before any firm quote." },
          ],
        },
      },
    },
  },
  ar: {
    pillar: {
      title: "التواصل",
      description: "استراتيجية العلامة والتواصل المتكامل والتسويق الرقمي",
    },
    services: {
      "agence-communication-maroc": {
        title: "وكالة تواصل في المغرب",
        description: "استراتيجية ومحتوى وحملات متكاملة لبناء علامة متناسقة ومرئية.",
        longDescription: "تنسق Mohtaoua تواصلك من منصة العلامة إلى النشر متعدد القنوات مع فريق محلي ونتائج قابلة للقياس.",
        features: ["استراتيجية التواصل", "منصة العلامة", "حملات متعددة القنوات", "القياس والتقارير"],
      },
      "agence-marketing-digital-maroc": {
        title: "وكالة تسويق رقمي في المغرب",
        description: "الاستقطاب وSEO والمحتوى وCRM والأتمتة ضمن استراتيجية نمو واحدة.",
        longDescription: "شريك واحد لتصميم وتنفيذ وتحسين التسويق الرقمي في المغرب من توليد الطلب إلى التحويل التجاري.",
        features: ["استراتيجية الاستقطاب", "SEO والإعلانات", "CRM والأتمتة", "الإسناد والتقارير"],
      },
      "marketing-digital-maroc": {
        title: "التسويق الرقمي في المغرب",
        description: "استراتيجية منظمة لجذب العملاء وتحويلهم والاحتفاظ بهم في المغرب.",
        longDescription: "تدقيق وخطة وقنوات ومحتوى وحملات وقياس: نحول التسويق الرقمي إلى نظام نمو قابل للإدارة.",
        features: ["تدقيق رقمي", "خطة متعددة القنوات", "تحسين التحويل", "لوحات قيادة الأعمال"],
      },
      "agence-creative-maroc": {
        title: "وكالة إبداعية في المغرب",
        description: "مفاهيم وهوية بصرية ومحتوى إبداعي يجعل علامتك راسخة في الذاكرة.",
        longDescription: "إدارة فنية وحملات وتصميم وإنتاج محتوى يمنح علامتك تعبيرًا مميزًا في كل نقاط الاتصال.",
        features: ["الإدارة الفنية", "مفاهيم الحملات", "الهوية والتصميم", "إنتاج المحتوى"],
      },
    },
    pages: {
      "agence-communication-maroc": {
        metaTitle: "وكالة تواصل في المغرب | Mohtaoua",
        metaDescription: "وكالة تواصل 360° في المغرب: استراتيجية وهوية ومحتوى وحملات متعددة القنوات. اطلب تدقيقًا مجانيًا.",
        overview: {
          what: "خدمة تواصل متكاملة توحد التموضع والهوية والمحتوى والنشر.",
          who: "المديرون وفرق التسويق الباحثون عن علامة متناسقة وشريك واحد لكل القنوات.",
          benefits: ["تموضع واضح", "تنفيذ متناسق", "قياس مرتبط بالأعمال"],
          topics: ["استراتيجية التواصل", "الهوية", "المحتوى", "الإعلام", "التقارير"],
          takeaways: ["شريك للاستراتيجية والإنتاج", "فريق في المغرب", "تدقيق أولي مجاني"],
        },
        problem: "تواصلك موزع بين مزودين دون رسالة مركزية أو تقويم موحد أو قياس موثوق للأثر.",
        solution: "نبني منصة تواصل واحدة وننسق الهوية والمحتوى والحملات حول أهداف قابلة للقياس.",
        howItWorks: ["تدقيق العلامة والقنوات", "التموضع وخطة التواصل", "إنتاج الحملات", "القياس والتحسين"],
        industries: ["التعليم", "الصحة", "العقار", "الفندقة", "التجزئة", "B2B"],
        faqs: [
          { question: "ما الخدمات التي تغطيها الوكالة؟", answer: "الاستراتيجية والهوية والمحتوى والشبكات والإعلانات والفيديو والمطبوعات والفعاليات." },
          { question: "هل تعملون خارج الدار البيضاء؟", answer: "نعم، نرافق المؤسسات في أنحاء المغرب عن بعد أو في الموقع." },
          { question: "كيف تقيسون النتائج؟", answer: "نتابع الوعي والتفاعل والطلب والتحويل عبر تقارير منتظمة." },
          { question: "هل يمكن البدء بتدقيق؟", answer: "نعم، يحدد التدقيق المجاني الفجوات وأولويات التسعين يومًا." },
        ],
      },
      "agence-marketing-digital-maroc": {
        metaTitle: "وكالة تسويق رقمي في المغرب | الاستقطاب والعائد",
        metaDescription: "وكالة تسويق رقمي بالمغرب: SEO وMeta وGoogle وTikTok وCRM والأتمتة. استراتيجية موجهة للعائد وتدقيق مجاني.",
        overview: {
          what: "مرافقة وكالة تغطي منظومة الاستقطاب والتحويل الرقمي كاملة.",
          who: "شركات تريد فريق خبراء مسؤولًا بدل مزودين منفصلين.",
          benefits: ["قنوات منسقة", "عملاء مربوطون بـCRM", "ميزانية حسب الربحية"],
          topics: ["SEO", "Google Ads", "Meta Ads", "TikTok Ads", "CRM", "الأتمتة"],
          takeaways: ["استراتيجية وتنفيذ", "تقارير مرتبطة بالإيراد", "تحسين مستمر"],
        },
        problem: "تعمل قنواتك في جزر منفصلة، فتولد الحملات عملاء دون رؤية واضحة للإسناد والمتابعة والربحية.",
        solution: "نربط الاستقطاب وصفحات الهبوط والتتبع وCRM والمتابعة ضمن نظام واحد.",
        howItWorks: ["تدقيق الأداء", "ترتيب القنوات", "نشر الحملات والأدوات", "تحسين أسبوعي"],
        industries: ["التجارة الإلكترونية", "الخدمات", "الصحة", "العقار", "التعليم", "الصناعة"],
        faqs: [
          { question: "ما القنوات التي تديرونها؟", answer: "SEO وGEO وGoogle وMeta وTikTok والشبكات والبريد وCRM والأتمتة." },
          { question: "ما الميزانية المطلوبة؟", answer: "تعتمد على السوق والأهداف ونوصي بسيناريو تدريجي بعد التدقيق." },
          { question: "هل الإنفاق الإعلاني مشمول؟", answer: "لا، يُدفع للمنصات مباشرة بينما تغطي أتعابنا الاستراتيجية والإنتاج والإدارة." },
          { question: "كيف تختارون القنوات؟", answer: "نحلل النية ونضج الجمهور واقتصاد العرض وقدرة المبيعات." },
        ],
      },
      "marketing-digital-maroc": {
        metaTitle: "التسويق الرقمي في المغرب: استراتيجية 360° | Mohtaoua",
        metaDescription: "نظم تسويقك الرقمي بالمغرب: تدقيق واستقطاب ومحتوى وتحويل وCRM وقياس. احصل على خطة مناسبة.",
        overview: {
          what: "منهجية كاملة لبناء التسويق الرقمي كنظام نمو.",
          who: "مقاولات وشركات ناشئة وكبرى تريد أولويات أوضح وعائدًا أقوى.",
          benefits: ["خطة مرتبة", "مسار عميل متناسق", "قرارات بالبيانات"],
          topics: ["الاستراتيجية الرقمية", "الاستقطاب", "المحتوى", "التحويل", "CRM", "التحليلات"],
          takeaways: ["ابدأ بأهداف الأعمال", "قس جودة العملاء", "اربط التسويق بالمبيعات"],
        },
        problem: "تكثر المنشورات والحملات والأدوات دون خطة موحدة، فتتشتت الموارد وتختفي القنوات المربحة.",
        solution: "ندقق المسار ونختار القنوات ذات الأولوية ونبني خطة للاستقطاب والمحتوى والتحويل والاحتفاظ.",
        howItWorks: ["تشخيص الجمهور والبيانات", "الأهداف والمؤشرات", "خطة فصلية", "التنفيذ والتحسين"],
        industries: ["المقاولات", "الشركات الناشئة", "التجارة الإلكترونية", "B2B", "الخدمات", "التجزئة"],
        faqs: [
          { question: "من أين نبدأ؟", answer: "حدد الجمهور والعرض والهدف التجاري وقدرة المتابعة قبل اختيار القنوات." },
          { question: "هل يجب الحضور في كل الشبكات؟", answer: "لا، ركز على القنوات التي يبحث أو يكتشف فيها جمهورك عرضك." },
          { question: "متى نقيس النتائج؟", answer: "تصل البيانات مبكرًا لكن القراءة الموثوقة تحتاج أسابيع وحجم تحويل كافيًا." },
          { question: "هل تنفذ Mohtaoua الخطة؟", answer: "نعم، نغطي الاستراتيجية والإعلانات وSEO والمحتوى والويب وCRM والأتمتة." },
        ],
      },
      "agence-creative-maroc": {
        metaTitle: "وكالة إبداعية في المغرب | هوية وتصميم ومحتوى",
        metaDescription: "وكالة إبداعية بالمغرب: مفاهيم حملات وهوية وتصميم وصورة وفيديو تمنح علامتك تعبيرًا مميزًا.",
        overview: {
          what: "إدارة إبداعية تحول استراتيجية العلامة إلى هوية وحملات راسخة.",
          who: "علامات في الإطلاق أو إعادة التموضع أو النمو.",
          benefits: ["أفكار مرتبطة بالتموضع", "مواد لكل قناة", "إنتاج مركزي"],
          topics: ["الإدارة الفنية", "الهوية", "التصميم", "الحملات", "الصورة", "الفيديو"],
          takeaways: ["الإبداع يخدم العلامة", "اتجاه واحد للصيغ", "مفاهيم قابلة للتوسع"],
        },
        problem: "تنتج علامتك صورًا منفصلة دون مجال إبداعي معروف، فتضعف الذاكرة وتناسق الحملات.",
        solution: "نحدد المفهوم والإدارة الفنية والنظام البصري ثم ننتج النسخ الرقمية والمطبوعة والسمعية البصرية.",
        howItWorks: ["الانغماس في العلامة", "المفاهيم الإبداعية", "الإنتاج متعدد الصيغ", "مراقبة الجودة"],
        industries: ["التجزئة", "الفندقة", "العقار", "التجارة الإلكترونية", "الجمال", "الشركات"],
        faqs: [
          { question: "وكالة إبداعية أم تواصل؟", answer: "تركز الإبداعية على المفاهيم والإنتاج، بينما تنسق وكالة التواصل الاستراتيجية والنشر أيضًا." },
          { question: "هل تنتجون الصورة والفيديو؟", answer: "نعم، يمكن جمع الصورة والفيديو والموشن وReels." },
          { question: "هل تعملون بهويتنا الحالية؟", answer: "نعم، نوسعها أو نوصي بتطويرها عند الحاجة." },
          { question: "كم مفهومًا تقدمون؟", answer: "يعتمد على النطاق ونفضل اتجاهات قليلة ومدروسة." },
        ],
      },
    },
    cityContext: {
      title: "وكالتك الرقمية المحلية",
      prefix: "لاستكمال {service} في {ville}، اكتشف",
      agencyLink: "كل خدمات وكالتنا الرقمية في {ville}",
    },
    agencyHub: {
      labels: {
        home: "الرئيسية",
        share: "مشاركة",
        aiOverview: "ملخص الصفحة",
        what: "عن ماذا تتحدث الصفحة؟",
        who: "لمن هي؟",
        benefits: "الفوائد الرئيسية",
        topics: "المواضيع",
        takeaways: "أهم الخلاصات",
        readingTime: "{minutes} دقائق قراءة",
        challenges: "التحديات الرقمية في {ville}",
        approach: "مقاربتنا المحلية",
        servicesInCity: "خدماتنا في {ville}",
        servicesInCityDescription: "استكشف كل خبرات Mohtaoua المتاحة في {ville}. كل رابط يفتح صفحة الخدمة المحلية.",
      },
      items: {
        casablanca: {
          metaTitle: "وكالة رقمية في الدار البيضاء | Mohtaoua 360°",
          metaDescription: "وكالة رقمية بالدار البيضاء: تسويق وويب وبرمجيات وجوال وتصميم وأتمتة. 53 خدمة محلية وتدقيق مجاني.",
          h1: "وكالة رقمية في الدار البيضاء",
          intro: "ترافق Mohtaoua شركات الدار البيضاء بفريق 360° يربط التسويق والتكنولوجيا والإبداع والأتمتة.",
          overview: {
            what: "المركز المحلي الذي يجمع كل خبرات Mohtaoua الرقمية المتاحة لشركات الدار البيضاء.",
            who: "المديرون والفرق الرقمية في مقاولات وشركات ناشئة ومؤسسات الدار البيضاء.",
            benefits: ["شريك للتسويق والتكنولوجيا", "خبرات محلية مرتبطة بالأعمال", "إدارة شفافة"],
            topics: ["الاستقطاب الرقمي", "الويب والتجارة", "البرمجيات وCRM", "الهوية والصورة والفيديو"],
            takeaways: ["53 خدمة في الدار البيضاء", "فريق متعدد التخصصات", "تدقيق مجاني مرتب"],
          },
          paragraphs: [
            "تجمع الدار البيضاء مقرات الشركات والمجموعات الصناعية والبنوك والشركات الناشئة الأكثر تنافسية في المغرب. وفي هذا المحيط لا تكفي أنشطة رقمية مشتتة؛ بل يجب أن تعمل العلامة والاستقطاب والموقع والبيانات والمبيعات معًا.",
            "دورنا كوكالة رقمية في الدار البيضاء هو بناء هذا النظام المتكامل. ننطلق من أهداف الأعمال ونحدد نقاط الاحتكاك ثم نجمع خبرات SEO والإعلانات والمحتوى والويب والبرمجيات وCRM والأتمتة والتصميم والإنتاج.",
            "تُدار كل مهمة بمؤشرات مرتبطة بالنتيجة: تكلفة العميل المؤهل والتحويل والإيراد المنسوب والظهور العضوي واعتماد الأدوات أو مكاسب الإنتاجية.",
            "يربط القسم أدناه كل صفحات الخدمات المحلية في الدار البيضاء لمساعدتك على استكشاف كل خبرة وسياقها المحلي.",
          ],
          challenges: ["التميّز في سوق تنافسية", "ربط التسويق بالمبيعات", "تحديث الأدوات بأمان", "توسيع المحتوى المتناسق"],
          approach: ["تدقيق العلامة والقنوات", "خطة أولويات", "فريق متعدد التخصصات", "تقارير منتظمة"],
          faqs: [
            { question: "ما الخدمات التي تقدمونها في الدار البيضاء؟", answer: "نغطي 53 خبرة في التسويق والويب والبرمجيات والجوال وCRM والأتمتة والذكاء والهوية والصورة والفيديو والفعاليات." },
            { question: "هل تعملون مع المقاولات والشركات الكبرى؟", answer: "نعم، يتكيف النطاق والفريق مع نضج كل مؤسسة وقيودها." },
            { question: "هل يمكن العمل في مقرنا؟", answer: "نعم، يمكن تنفيذ الورش والتصوير والاجتماعات في الموقع أو عن بعد." },
            { question: "كيف نبدأ؟", answer: "اطلب تدقيقًا مجانيًا للحصول على خطة مرتبة قبل أي عرض سعر نهائي." },
          ],
        },
      },
    },
  },
};

for (const [locale, content] of Object.entries(localized)) {
  const load = (name) => {
    const path = join(root, `messages/${locale}/${name}.json`);
    return { path, json: JSON.parse(readFileSync(path, "utf8")) };
  };
  const save = ({ path, json }) =>
    writeFileSync(path, `${JSON.stringify(json, null, 2)}\n`);

  const pillars = load("pillars");
  pillars.json.items.communication = content.pillar;
  save(pillars);

  const services = load("services");
  Object.assign(services.json.items, content.services);
  save(services);

  const servicePages = load("servicePages");
  Object.assign(servicePages.json.items, content.pages);
  save(servicePages);

  const serviceCityPages = load("serviceCityPages");
  serviceCityPages.json.localContext = content.cityContext;
  save(serviceCityPages);

  const agencyHubPath = join(root, `messages/${locale}/agencyHubPages.json`);
  writeFileSync(
    agencyHubPath,
    `${JSON.stringify(content.agencyHub, null, 2)}\n`
  );

  console.log(`Lot 1 i18n ajouté pour ${locale}`);
}
