#!/usr/bin/env node
/**
 * Lot 3 — hubs "Agence Communication" (Casablanca, Rabat, Marrakech, Tanger, Agadir).
 *
 * 1. Migre items.{ville} -> items.digitale.{ville} (idempotent).
 * 2. Ajoute items.communication.{ville} avec un angle éditorial différencié
 *    (marque / image / RP) pour éviter la cannibalisation avec le hub digitale.
 * 3. Ajoute les labels de grille communication.
 * 4. Restructure serviceCityPages.localContext en digitale/communication.
 *
 * Maintient la parité des clés i18n FR / EN / AR.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIGITALE_CITIES = [
  "casablanca",
  "rabat",
  "marrakech",
  "tanger",
  "agadir",
  "fes",
];

const communicationLabels = {
  fr: {
    servicesInCityCommunication: "Nos expertises communication à {ville}",
    servicesInCityDescriptionCommunication:
      "Identité, contenus, réseaux sociaux, production photo/vidéo et événementiel. Chaque lien ouvre la page locale dédiée à l'expertise.",
    challengesCommunication: "Enjeux de communication à {ville}",
  },
  en: {
    servicesInCityCommunication: "Our communication expertise in {ville}",
    servicesInCityDescriptionCommunication:
      "Identity, content, social media, photo/video production and events. Each link opens the dedicated local expertise page.",
    challengesCommunication: "Communication challenges in {ville}",
  },
  ar: {
    servicesInCityCommunication: "خبراتنا في التواصل في {ville}",
    servicesInCityDescriptionCommunication:
      "الهوية والمحتوى والشبكات الاجتماعية والإنتاج المصور والفعاليات. كل رابط يفتح صفحة الخبرة المحلية.",
    challengesCommunication: "تحديات التواصل في {ville}",
  },
};

const localContext = {
  fr: {
    digitale: {
      title: "Votre agence digitale locale",
      prefix: "Pour compléter {service} à {ville}, découvrez",
      agencyLink: "tous les services de notre agence digitale à {ville}",
    },
    communication: {
      title: "Votre agence de communication locale",
      prefix: "Pour compléter {service} à {ville}, explorez",
      agencyLink: "toutes nos expertises communication à {ville}",
    },
  },
  en: {
    digitale: {
      title: "Your local digital agency",
      prefix: "To complement {service} in {ville}, discover",
      agencyLink: "all services from our digital agency in {ville}",
    },
    communication: {
      title: "Your local communication agency",
      prefix: "To complement {service} in {ville}, explore",
      agencyLink: "all our communication expertise in {ville}",
    },
  },
  ar: {
    digitale: {
      title: "وكالتك الرقمية المحلية",
      prefix: "لإكمال {service} في {ville}، اكتشف",
      agencyLink: "كل خدمات وكالتنا الرقمية في {ville}",
    },
    communication: {
      title: "وكالة التواصل المحلية الخاصة بك",
      prefix: "لإكمال {service} في {ville}، استكشف",
      agencyLink: "كل خبراتنا في التواصل في {ville}",
    },
  },
};

const communication = {
  fr: {
    casablanca: {
      metaTitle:
        "Agence de Communication Casablanca | Stratégie & Image de Marque",
      metaDescription:
        "Agence de communication à Casablanca : stratégie de marque, identité visuelle, contenus, réseaux sociaux et production créative. 25 expertises locales et audit gratuit.",
      h1: "Agence de communication à Casablanca",
      intro:
        "À Casablanca, votre marque doit se démarquer dans un écosystème ultra-concurrentiel. Mohtaoua structure votre communication : positionnement, identité visuelle, contenus, réseaux sociaux et production créative, avec une cohérence sur chaque point de contact.",
      overview: {
        what: "Le hub communication qui regroupe nos expertises marque, contenus, création et événementiel pour les entreprises casablancaises.",
        who: "Directeurs communication, responsables image de marque et équipes marketing orientées contenus et notoriété.",
        benefits: [
          "Un message de marque clair et différenciant",
          "Une exécution créative cohérente sur chaque canal",
          "Une production centralisée : design, photo, vidéo et print",
        ],
        topics: [
          "Plateforme de marque",
          "Identité visuelle",
          "Contenus et réseaux sociaux",
          "Production photo et vidéo",
          "Communication événementielle",
        ],
        takeaways: [
          "25 expertises communication disponibles à Casablanca",
          "Équipe créative et stratégique basée au Maroc",
          "Audit gratuit avec recommandations éditoriales",
        ],
      },
      paragraphs: [
        "Casablanca concentre les marques les plus exposées du Maroc : groupes, franchises, institutions financières et entreprises de services y rivalisent pour l'attention. Dans ce contexte, une image dispersée entre plusieurs prestataires affaiblit la notoriété et brouille le message.",
        "Notre rôle d'agence de communication à Casablanca est de construire une plateforme de marque unique, puis de la décliner avec cohérence : identité visuelle, ligne éditoriale, contenus sociaux, relations presse et production audiovisuelle.",
        "Nous ne raisonnons pas seulement performance : la communication sert la réputation, la préférence de marque et la fierté interne. Chaque prise de parole renforce un territoire reconnaissable plutôt que des visuels isolés.",
        "La section ci-dessous relie nos expertises communication déclinées à Casablanca : branding, création, contenus, photo, vidéo et événementiel, chacune accessible via sa page locale dédiée.",
      ],
      challenges: [
        "Un message de marque dilué entre plusieurs agences et supports",
        "Une identité visuelle incohérente d'un canal à l'autre",
        "L'absence de calendrier éditorial et de ligne de contenu",
        "Une image de marque peu différenciante face aux concurrents",
      ],
      approach: [
        "Audit de la marque, du territoire éditorial et des supports",
        "Plateforme de marque : positionnement, messages et charte",
        "Production des contenus, créations et prises de parole",
        "Diffusion coordonnée, relations presse et mesure de notoriété",
      ],
      faqs: [
        {
          question:
            "Quelles expertises couvre votre agence de communication à Casablanca ?",
          answer:
            "Stratégie et plateforme de marque, identité visuelle, création graphique, contenus, réseaux sociaux, photo, vidéo, motion design et communication événementielle.",
        },
        {
          question:
            "Quelle différence avec votre agence digitale à Casablanca ?",
          answer:
            "L'agence de communication se concentre sur la marque, l'image et les contenus ; l'agence digitale pilote l'acquisition, le web, les logiciels et la performance. Les deux sont complémentaires.",
        },
        {
          question: "Gérez-vous aussi les relations presse et l'événementiel ?",
          answer:
            "Oui. Nous couvrons les relations presse, la communication corporate, l'activation de marque et l'organisation d'événements à Casablanca.",
        },
        {
          question: "Comment démarrer avec Mohtaoua ?",
          answer:
            "Demandez un audit gratuit. Nous analysons votre image actuelle et proposons des recommandations éditoriales priorisées, sans devis ferme avant d'avoir cadré le besoin.",
        },
      ],
    },
    rabat: {
      metaTitle:
        "Agence de Communication Rabat | Marque, Contenus & Relations Publiques",
      metaDescription:
        "Agence de communication à Rabat : stratégie de marque, identité, contenus institutionnels et relations publiques. 25 expertises locales et audit gratuit.",
      h1: "Agence de communication à Rabat",
      intro:
        "À Rabat, la crédibilité et la clarté priment. Mohtaoua construit une communication rigoureuse pour institutions, cabinets et entreprises de services : marque, contenus institutionnels, relations publiques et supports soignés.",
      overview: {
        what: "Le hub communication qui regroupe nos expertises marque, contenus institutionnels, création et événementiel pour les organisations rabaties.",
        who: "Directeurs communication d'institutions, cabinets, écoles et entreprises de services soucieux de leur image.",
        benefits: [
          "Une image institutionnelle crédible et cohérente",
          "Des contenus pédagogiques et de réassurance",
          "Une production éditoriale rigoureuse et validée",
        ],
        topics: [
          "Plateforme de marque",
          "Identité visuelle",
          "Contenus institutionnels",
          "Relations publiques",
          "Communication événementielle",
        ],
        takeaways: [
          "25 expertises communication disponibles à Rabat",
          "Équipe éditoriale et créative basée au Maroc",
          "Audit gratuit avec recommandations éditoriales",
        ],
      },
      paragraphs: [
        "Rabat abrite institutions, administrations, cabinets et entreprises de services dont la réputation repose sur la confiance. Une communication approximative ou incohérente y fragilise directement la crédibilité.",
        "Notre rôle d'agence de communication à Rabat est de poser une plateforme de marque claire, puis de produire des contenus institutionnels, des supports et des prises de parole conformes à des standards éditoriaux élevés.",
        "Nous privilégions la pédagogie, la preuve et la réassurance plutôt que l'agressivité commerciale : la communication doit installer l'autorité et la confiance sur le long terme.",
        "La section ci-dessous relie nos expertises communication déclinées à Rabat : branding, création, contenus, photo, vidéo et événementiel, chacune accessible via sa page locale dédiée.",
      ],
      challenges: [
        "Une image institutionnelle qui manque d'unité",
        "Des contenus trop techniques ou peu accessibles",
        "L'absence de ligne éditoriale de réassurance",
        "Une communication peu valorisée en interne",
      ],
      approach: [
        "Audit de la marque, du territoire éditorial et des supports",
        "Plateforme de marque et messages institutionnels",
        "Production de contenus, supports et prises de parole",
        "Relations publiques et mesure de la réputation",
      ],
      faqs: [
        {
          question:
            "Quelles expertises couvre votre agence de communication à Rabat ?",
          answer:
            "Stratégie et plateforme de marque, identité visuelle, contenus institutionnels, réseaux sociaux, photo, vidéo, relations publiques et communication événementielle.",
        },
        {
          question: "Quelle différence avec votre agence digitale à Rabat ?",
          answer:
            "L'agence de communication porte la marque, l'image et les contenus ; l'agence digitale pilote l'acquisition, le web et la performance. Les deux se complètent.",
        },
        {
          question: "Travaillez-vous avec les institutions publiques ?",
          answer:
            "Oui. Nous accompagnons institutions, administrations et organisations avec des processus de validation structurés et un ton adapté.",
        },
        {
          question: "Comment démarrer avec Mohtaoua ?",
          answer:
            "Demandez un audit gratuit. Nous analysons votre image et proposons des recommandations éditoriales priorisées, sans devis ferme avant d'avoir cadré le besoin.",
        },
      ],
    },
    marrakech: {
      metaTitle:
        "Agence de Communication Marrakech | Image de Marque & Contenus Premium",
      metaDescription:
        "Agence de communication à Marrakech : image de marque, direction artistique, contenus premium, photo et vidéo. 25 expertises locales et audit gratuit.",
      h1: "Agence de communication à Marrakech",
      intro:
        "À Marrakech, l'émotion et l'esthétique font vendre. Mohtaoua façonne une image de marque premium : direction artistique, contenus soignés, photo, vidéo et expériences qui valorisent l'expérience client.",
      overview: {
        what: "Le hub communication qui regroupe nos expertises marque, direction artistique, contenus premium et événementiel pour les acteurs de Marrakech.",
        who: "Hôtels, riads, promoteurs, marques lifestyle et acteurs du tourisme et du luxe.",
        benefits: [
          "Une image de marque désirable et cohérente",
          "Des contenus visuels premium adaptés au luxe",
          "Une production photo et vidéo haut de gamme",
        ],
        topics: [
          "Plateforme de marque",
          "Direction artistique",
          "Contenus premium",
          "Photo et vidéo",
          "Communication événementielle",
        ],
        takeaways: [
          "25 expertises communication disponibles à Marrakech",
          "Équipe créative et artistique basée au Maroc",
          "Audit gratuit avec recommandations éditoriales",
        ],
      },
      paragraphs: [
        "Marrakech vit d'image : hôtels, riads, promoteurs et marques lifestyle rivalisent sur l'esthétique et l'expérience. Une communication banale ou incohérente y passe inaperçue face à une clientèle internationale exigeante.",
        "Notre rôle d'agence de communication à Marrakech est de bâtir une direction artistique forte, puis de la décliner en contenus premium : identité, photo, vidéo, réseaux sociaux et prises de parole soignées.",
        "Nous mettons l'émotion et le storytelling au service de la marque, avec une exécution visuelle irréprochable qui reflète le positionnement et le niveau de gamme.",
        "La section ci-dessous relie nos expertises communication déclinées à Marrakech : branding, création, contenus, photo, vidéo et événementiel, chacune accessible via sa page locale dédiée.",
      ],
      challenges: [
        "Une image de marque en dessous du niveau de gamme visé",
        "Des contenus visuels irréguliers d'une saison à l'autre",
        "Un storytelling faible face à la concurrence internationale",
        "Une production créative dispersée entre prestataires",
      ],
      approach: [
        "Audit de la marque, du territoire artistique et des contenus",
        "Direction artistique et plateforme de marque",
        "Production photo, vidéo et contenus premium",
        "Diffusion et mesure de la notoriété",
      ],
      faqs: [
        {
          question:
            "Quelles expertises couvre votre agence de communication à Marrakech ?",
          answer:
            "Direction artistique, plateforme de marque, identité visuelle, contenus premium, photo, vidéo, motion design et communication événementielle.",
        },
        {
          question:
            "Quelle différence avec votre agence digitale à Marrakech ?",
          answer:
            "L'agence de communication porte l'image et la création ; l'agence digitale pilote l'acquisition, les réservations et la performance. Les deux se complètent.",
        },
        {
          question: "Produisez-vous photo et vidéo sur place ?",
          answer:
            "Oui. Direction artistique, photographie, vidéo, motion et Reels peuvent être produits à Marrakech selon votre projet.",
        },
        {
          question: "Comment démarrer avec Mohtaoua ?",
          answer:
            "Demandez un audit gratuit. Nous analysons votre image et proposons des recommandations créatives priorisées, sans devis ferme avant d'avoir cadré le besoin.",
        },
      ],
    },
    tanger: {
      metaTitle:
        "Agence de Communication Tanger | Marque, Contenus Multilingues & B2B",
      metaDescription:
        "Agence de communication à Tanger : image de marque, contenus multilingues, supports B2B et production. 25 expertises locales et audit gratuit.",
      h1: "Agence de communication à Tanger",
      intro:
        "À Tanger, la crédibilité internationale se joue sur l'image. Mohtaoua construit une communication B2B solide : marque, contenus multilingues, supports commerciaux et production adaptée aux marchés export.",
      overview: {
        what: "Le hub communication qui regroupe nos expertises marque, contenus multilingues, création et événementiel pour les entreprises tangéroises.",
        who: "Industriels, exportateurs, logisticiens et prestataires B2B tournés vers l'international.",
        benefits: [
          "Une image crédible auprès des donneurs d'ordre",
          "Des contenus multilingues cohérents",
          "Des supports commerciaux et corporate professionnels",
        ],
        topics: [
          "Plateforme de marque",
          "Identité visuelle",
          "Contenus multilingues",
          "Supports B2B",
          "Communication événementielle",
        ],
        takeaways: [
          "25 expertises communication disponibles à Tanger",
          "Équipe éditoriale et créative basée au Maroc",
          "Audit gratuit avec recommandations éditoriales",
        ],
      },
      paragraphs: [
        "Tanger, hub industriel et logistique tourné vers l'Europe, impose une communication crédible : les donneurs d'ordre et partenaires internationaux jugent une entreprise sur son image avant tout contact.",
        "Notre rôle d'agence de communication à Tanger est de poser une plateforme de marque claire, puis de produire des contenus multilingues, supports corporate et prises de parole conformes aux standards internationaux.",
        "Nous soignons la cohérence entre français, arabe et anglais, ainsi que la qualité des supports commerciaux qui accompagnent le développement export.",
        "La section ci-dessous relie nos expertises communication déclinées à Tanger : branding, création, contenus, photo, vidéo et événementiel, chacune accessible via sa page locale dédiée.",
      ],
      challenges: [
        "Une image peu crédible aux yeux des partenaires internationaux",
        "Des contenus multilingues incohérents ou mal traduits",
        "Des supports commerciaux datés",
        "Une marque peu différenciante sur les appels d'offres",
      ],
      approach: [
        "Audit de la marque, des supports et des contenus multilingues",
        "Plateforme de marque et messages B2B",
        "Production de supports, contenus et prises de parole",
        "Diffusion et mesure de la notoriété",
      ],
      faqs: [
        {
          question:
            "Quelles expertises couvre votre agence de communication à Tanger ?",
          answer:
            "Stratégie et plateforme de marque, identité visuelle, contenus multilingues, supports B2B, photo, vidéo et communication événementielle.",
        },
        {
          question: "Quelle différence avec votre agence digitale à Tanger ?",
          answer:
            "L'agence de communication porte la marque, l'image et les contenus ; l'agence digitale pilote l'acquisition, le web et la performance. Les deux se complètent.",
        },
        {
          question: "Produisez-vous des contenus en plusieurs langues ?",
          answer:
            "Oui. Nous produisons des contenus et supports en français, arabe et anglais selon vos marchés cibles.",
        },
        {
          question: "Comment démarrer avec Mohtaoua ?",
          answer:
            "Demandez un audit gratuit. Nous analysons votre image et proposons des recommandations éditoriales priorisées, sans devis ferme avant d'avoir cadré le besoin.",
        },
      ],
    },
    agadir: {
      metaTitle:
        "Agence de Communication Agadir | Image de Marque & Contenus Locaux",
      metaDescription:
        "Agence de communication à Agadir : image de marque, contenus, photo/vidéo et communication locale pour le tourisme et l'agro. 25 expertises locales et audit gratuit.",
      h1: "Agence de communication à Agadir",
      intro:
        "À Agadir, la marque doit parler à une clientèle mixte : résidents, touristes et distributeurs. Mohtaoua construit une communication claire et locale : image, contenus, photo, vidéo et supports adaptés.",
      overview: {
        what: "Le hub communication qui regroupe nos expertises marque, contenus, création et événementiel pour les entreprises d'Agadir.",
        who: "Acteurs du tourisme, de l'agroalimentaire, de la pêche et du commerce local.",
        benefits: [
          "Une image de marque claire pour une clientèle mixte",
          "Des contenus adaptés au mobile et au local",
          "Une production photo et vidéo régulière",
        ],
        topics: [
          "Plateforme de marque",
          "Identité visuelle",
          "Contenus locaux",
          "Photo et vidéo",
          "Communication événementielle",
        ],
        takeaways: [
          "25 expertises communication disponibles à Agadir",
          "Équipe créative et éditoriale basée au Maroc",
          "Audit gratuit avec recommandations éditoriales",
        ],
      },
      paragraphs: [
        "Agadir combine tourisme, agroalimentaire et commerce local. Les marques doivent s'adresser à des audiences très différentes — résidents, touristes et distributeurs — sans perdre en cohérence.",
        "Notre rôle d'agence de communication à Agadir est de bâtir une plateforme de marque claire, puis de produire des contenus, visuels et supports adaptés à chaque audience et à chaque saison.",
        "Nous soignons la lisibilité, l'adaptation au mobile et la régularité de la prise de parole, pour que la marque reste présente toute l'année.",
        "La section ci-dessous relie nos expertises communication déclinées à Agadir : branding, création, contenus, photo, vidéo et événementiel, chacune accessible via sa page locale dédiée.",
      ],
      challenges: [
        "Une image qui peine à parler à des audiences très différentes",
        "Des contenus irréguliers selon la saison",
        "Une production visuelle insuffisante",
        "Une marque peu identifiable localement",
      ],
      approach: [
        "Audit de la marque, des audiences et des contenus",
        "Plateforme de marque et ligne éditoriale",
        "Production de contenus, visuels et supports",
        "Diffusion locale et mesure de la notoriété",
      ],
      faqs: [
        {
          question:
            "Quelles expertises couvre votre agence de communication à Agadir ?",
          answer:
            "Stratégie et plateforme de marque, identité visuelle, contenus, réseaux sociaux, photo, vidéo et communication événementielle.",
        },
        {
          question: "Quelle différence avec votre agence digitale à Agadir ?",
          answer:
            "L'agence de communication porte la marque, l'image et les contenus ; l'agence digitale pilote l'acquisition et la performance. Les deux se complètent.",
        },
        {
          question: "Produisez-vous photo et vidéo à Agadir ?",
          answer:
            "Oui. Photographie, vidéo, motion et Reels peuvent être produits localement selon votre projet.",
        },
        {
          question: "Comment démarrer avec Mohtaoua ?",
          answer:
            "Demandez un audit gratuit. Nous analysons votre image et proposons des recommandations éditoriales priorisées, sans devis ferme avant d'avoir cadré le besoin.",
        },
      ],
    },
  },
  en: {
    casablanca: {
      metaTitle: "Communication Agency Casablanca | Brand Strategy & Image",
      metaDescription:
        "Communication agency in Casablanca: brand strategy, visual identity, content, social media and creative production. 25 local expertise areas and a free audit.",
      h1: "Communication agency in Casablanca",
      intro:
        "In Casablanca, your brand must stand out in a fiercely competitive ecosystem. Mohtaoua structures your communication: positioning, visual identity, content, social media and creative production, with consistency across every touchpoint.",
      overview: {
        what: "The communication hub gathering our brand, content, creative and events expertise for Casablanca businesses.",
        who: "Communication directors, brand managers and content-focused marketing teams.",
        benefits: [
          "A clear, differentiating brand message",
          "Consistent creative execution across every channel",
          "Centralized production: design, photo, video and print",
        ],
        topics: [
          "Brand platform",
          "Visual identity",
          "Content and social media",
          "Photo and video production",
          "Event communication",
        ],
        takeaways: [
          "25 communication expertise areas in Casablanca",
          "Creative and strategic team based in Morocco",
          "Free audit with editorial recommendations",
        ],
      },
      paragraphs: [
        "Casablanca concentrates Morocco's most exposed brands: groups, franchises, financial institutions and service companies compete for attention. A scattered image across suppliers weakens awareness and blurs the message.",
        "Our role as a communication agency in Casablanca is to build one brand platform, then roll it out consistently: visual identity, editorial line, social content, PR and audiovisual production.",
        "We don't think performance alone: communication serves reputation, brand preference and internal pride. Every message reinforces a recognizable territory rather than isolated visuals.",
        "The section below links our communication expertise available in Casablanca: branding, creative, content, photo, video and events, each on its dedicated local page.",
      ],
      challenges: [
        "A brand message diluted across agencies and formats",
        "Inconsistent visual identity from one channel to another",
        "No editorial calendar or content line",
        "A weakly differentiating brand image versus competitors",
      ],
      approach: [
        "Brand, editorial territory and collateral audit",
        "Brand platform: positioning, messages and guidelines",
        "Content, creative and messaging production",
        "Coordinated distribution, PR and awareness measurement",
      ],
      faqs: [
        {
          question:
            "What does your communication agency in Casablanca cover?",
          answer:
            "Brand strategy and platform, visual identity, graphic design, content, social media, photo, video, motion design and event communication.",
        },
        {
          question:
            "How is this different from your digital agency in Casablanca?",
          answer:
            "The communication agency focuses on brand, image and content; the digital agency drives acquisition, web, software and performance. They are complementary.",
        },
        {
          question: "Do you handle PR and events too?",
          answer:
            "Yes. We cover PR, corporate communication, brand activation and event organization in Casablanca.",
        },
        {
          question: "How do we start?",
          answer:
            "Request a free audit. We review your current image and provide prioritized editorial recommendations before any firm quote.",
        },
      ],
    },
    rabat: {
      metaTitle:
        "Communication Agency Rabat | Brand, Content & Public Relations",
      metaDescription:
        "Communication agency in Rabat: brand strategy, identity, institutional content and public relations. 25 local expertise areas and a free audit.",
      h1: "Communication agency in Rabat",
      intro:
        "In Rabat, credibility and clarity come first. Mohtaoua builds rigorous communication for institutions, consultancies and service companies: brand, institutional content, PR and polished collateral.",
      overview: {
        what: "The communication hub gathering our brand, institutional content, creative and events expertise for Rabat organizations.",
        who: "Communication directors of institutions, consultancies, schools and service companies focused on image.",
        benefits: [
          "A credible, consistent institutional image",
          "Educational and reassuring content",
          "Rigorous, validated editorial production",
        ],
        topics: [
          "Brand platform",
          "Visual identity",
          "Institutional content",
          "Public relations",
          "Event communication",
        ],
        takeaways: [
          "25 communication expertise areas in Rabat",
          "Editorial and creative team based in Morocco",
          "Free audit with editorial recommendations",
        ],
      },
      paragraphs: [
        "Rabat hosts institutions, administrations, consultancies and service companies whose reputation rests on trust. Sloppy or inconsistent communication directly undermines credibility.",
        "Our role as a communication agency in Rabat is to set a clear brand platform, then produce institutional content, collateral and messaging to high editorial standards.",
        "We favor pedagogy, proof and reassurance over aggressive selling: communication must build authority and trust over the long term.",
        "The section below links our communication expertise available in Rabat: branding, creative, content, photo, video and events, each on its dedicated local page.",
      ],
      challenges: [
        "An institutional image lacking unity",
        "Content that is too technical or inaccessible",
        "No reassuring editorial line",
        "Communication undervalued internally",
      ],
      approach: [
        "Brand, editorial territory and collateral audit",
        "Brand platform and institutional messages",
        "Content, collateral and messaging production",
        "Public relations and reputation measurement",
      ],
      faqs: [
        {
          question: "What does your communication agency in Rabat cover?",
          answer:
            "Brand strategy and platform, visual identity, institutional content, social media, photo, video, PR and event communication.",
        },
        {
          question:
            "How is this different from your digital agency in Rabat?",
          answer:
            "The communication agency carries brand, image and content; the digital agency drives acquisition, web and performance. They complement each other.",
        },
        {
          question: "Do you work with public institutions?",
          answer:
            "Yes. We support institutions, administrations and organizations with structured validation processes and an appropriate tone.",
        },
        {
          question: "How do we start?",
          answer:
            "Request a free audit. We review your image and provide prioritized editorial recommendations before any firm quote.",
        },
      ],
    },
    marrakech: {
      metaTitle:
        "Communication Agency Marrakech | Brand Image & Premium Content",
      metaDescription:
        "Communication agency in Marrakech: brand image, art direction, premium content, photo and video. 25 local expertise areas and a free audit.",
      h1: "Communication agency in Marrakech",
      intro:
        "In Marrakech, emotion and aesthetics sell. Mohtaoua shapes a premium brand image: art direction, polished content, photo, video and experiences that showcase the customer experience.",
      overview: {
        what: "The communication hub gathering our brand, art direction, premium content and events expertise for Marrakech players.",
        who: "Hotels, riads, developers, lifestyle brands and tourism and luxury players.",
        benefits: [
          "A desirable, consistent brand image",
          "Premium visual content suited to luxury",
          "High-end photo and video production",
        ],
        topics: [
          "Brand platform",
          "Art direction",
          "Premium content",
          "Photo and video",
          "Event communication",
        ],
        takeaways: [
          "25 communication expertise areas in Marrakech",
          "Creative and artistic team based in Morocco",
          "Free audit with editorial recommendations",
        ],
      },
      paragraphs: [
        "Marrakech lives on image: hotels, riads, developers and lifestyle brands compete on aesthetics and experience. Bland or inconsistent communication goes unnoticed by a demanding international clientele.",
        "Our role as a communication agency in Marrakech is to build strong art direction, then roll it out into premium content: identity, photo, video, social media and polished messaging.",
        "We put emotion and storytelling at the service of the brand, with flawless visual execution reflecting positioning and quality level.",
        "The section below links our communication expertise available in Marrakech: branding, creative, content, photo, video and events, each on its dedicated local page.",
      ],
      challenges: [
        "A brand image below the intended quality level",
        "Irregular visual content from one season to another",
        "Weak storytelling versus international competition",
        "Creative production scattered across suppliers",
      ],
      approach: [
        "Brand, artistic territory and content audit",
        "Art direction and brand platform",
        "Photo, video and premium content production",
        "Distribution and awareness measurement",
      ],
      faqs: [
        {
          question:
            "What does your communication agency in Marrakech cover?",
          answer:
            "Art direction, brand platform, visual identity, premium content, photo, video, motion design and event communication.",
        },
        {
          question:
            "How is this different from your digital agency in Marrakech?",
          answer:
            "The communication agency carries image and creative; the digital agency drives acquisition, bookings and performance. They complement each other.",
        },
        {
          question: "Do you produce photo and video on site?",
          answer:
            "Yes. Art direction, photography, video, motion and Reels can be produced in Marrakech depending on your project.",
        },
        {
          question: "How do we start?",
          answer:
            "Request a free audit. We review your image and provide prioritized creative recommendations before any firm quote.",
        },
      ],
    },
    tanger: {
      metaTitle:
        "Communication Agency Tangier | Brand, Multilingual Content & B2B",
      metaDescription:
        "Communication agency in Tangier: brand image, multilingual content, B2B collateral and production. 25 local expertise areas and a free audit.",
      h1: "Communication agency in Tangier",
      intro:
        "In Tangier, international credibility depends on image. Mohtaoua builds solid B2B communication: brand, multilingual content, sales collateral and production tailored to export markets.",
      overview: {
        what: "The communication hub gathering our brand, multilingual content, creative and events expertise for Tangier businesses.",
        who: "Industrial, export, logistics and B2B service companies focused on international markets.",
        benefits: [
          "A credible image with decision-makers",
          "Consistent multilingual content",
          "Professional sales and corporate collateral",
        ],
        topics: [
          "Brand platform",
          "Visual identity",
          "Multilingual content",
          "B2B collateral",
          "Event communication",
        ],
        takeaways: [
          "25 communication expertise areas in Tangier",
          "Editorial and creative team based in Morocco",
          "Free audit with editorial recommendations",
        ],
      },
      paragraphs: [
        "Tangier, an industrial and logistics hub oriented toward Europe, demands credible communication: decision-makers and international partners judge a company on its image before any contact.",
        "Our role as a communication agency in Tangier is to set a clear brand platform, then produce multilingual content, corporate collateral and messaging to international standards.",
        "We ensure consistency across French, Arabic and English, and the quality of the sales collateral supporting export growth.",
        "The section below links our communication expertise available in Tangier: branding, creative, content, photo, video and events, each on its dedicated local page.",
      ],
      challenges: [
        "A weakly credible image with international partners",
        "Inconsistent or poorly translated multilingual content",
        "Dated sales collateral",
        "A weakly differentiating brand in tenders",
      ],
      approach: [
        "Brand, collateral and multilingual content audit",
        "Brand platform and B2B messages",
        "Collateral, content and messaging production",
        "Distribution and awareness measurement",
      ],
      faqs: [
        {
          question:
            "What does your communication agency in Tangier cover?",
          answer:
            "Brand strategy and platform, visual identity, multilingual content, B2B collateral, photo, video and event communication.",
        },
        {
          question:
            "How is this different from your digital agency in Tangier?",
          answer:
            "The communication agency carries brand, image and content; the digital agency drives acquisition, web and performance. They complement each other.",
        },
        {
          question: "Do you produce content in several languages?",
          answer:
            "Yes. We produce content and collateral in French, Arabic and English depending on your target markets.",
        },
        {
          question: "How do we start?",
          answer:
            "Request a free audit. We review your image and provide prioritized editorial recommendations before any firm quote.",
        },
      ],
    },
    agadir: {
      metaTitle:
        "Communication Agency Agadir | Brand Image & Local Content",
      metaDescription:
        "Communication agency in Agadir: brand image, content, photo/video and local communication for tourism and agri-food. 25 local expertise areas and a free audit.",
      h1: "Communication agency in Agadir",
      intro:
        "In Agadir, the brand must speak to a mixed audience: residents, tourists and distributors. Mohtaoua builds clear, local communication: image, content, photo, video and tailored collateral.",
      overview: {
        what: "The communication hub gathering our brand, content, creative and events expertise for Agadir businesses.",
        who: "Tourism, agri-food, fishing and local retail players.",
        benefits: [
          "A clear brand image for a mixed audience",
          "Content adapted to mobile and local context",
          "Regular photo and video production",
        ],
        topics: [
          "Brand platform",
          "Visual identity",
          "Local content",
          "Photo and video",
          "Event communication",
        ],
        takeaways: [
          "25 communication expertise areas in Agadir",
          "Creative and editorial team based in Morocco",
          "Free audit with editorial recommendations",
        ],
      },
      paragraphs: [
        "Agadir combines tourism, agri-food and local retail. Brands must speak to very different audiences — residents, tourists and distributors — without losing consistency.",
        "Our role as a communication agency in Agadir is to build a clear brand platform, then produce content, visuals and collateral tailored to each audience and season.",
        "We focus on readability, mobile adaptation and regular messaging, so the brand stays present all year round.",
        "The section below links our communication expertise available in Agadir: branding, creative, content, photo, video and events, each on its dedicated local page.",
      ],
      challenges: [
        "An image that struggles to speak to very different audiences",
        "Irregular content depending on the season",
        "Insufficient visual production",
        "A brand that is hard to identify locally",
      ],
      approach: [
        "Brand, audience and content audit",
        "Brand platform and editorial line",
        "Content, visual and collateral production",
        "Local distribution and awareness measurement",
      ],
      faqs: [
        {
          question:
            "What does your communication agency in Agadir cover?",
          answer:
            "Brand strategy and platform, visual identity, content, social media, photo, video and event communication.",
        },
        {
          question:
            "How is this different from your digital agency in Agadir?",
          answer:
            "The communication agency carries brand, image and content; the digital agency drives acquisition and performance. They complement each other.",
        },
        {
          question: "Do you produce photo and video in Agadir?",
          answer:
            "Yes. Photography, video, motion and Reels can be produced locally depending on your project.",
        },
        {
          question: "How do we start?",
          answer:
            "Request a free audit. We review your image and provide prioritized editorial recommendations before any firm quote.",
        },
      ],
    },
  },
  ar: {
    casablanca: {
      metaTitle: "وكالة تواصل في الدار البيضاء | استراتيجية العلامة والصورة",
      metaDescription:
        "وكالة تواصل في الدار البيضاء: استراتيجية العلامة والهوية البصرية والمحتوى والشبكات الاجتماعية والإنتاج الإبداعي. 25 خبرة محلية وتدقيق مجاني.",
      h1: "وكالة تواصل في الدار البيضاء",
      intro:
        "في الدار البيضاء، يجب أن تتميّز علامتك في بيئة شديدة التنافس. تنظم Mohtaoua تواصلك: التموضع والهوية البصرية والمحتوى والشبكات الاجتماعية والإنتاج الإبداعي بتناسق على كل نقاط الاتصال.",
      overview: {
        what: "مركز التواصل الذي يجمع خبراتنا في العلامة والمحتوى والإبداع والفعاليات لشركات الدار البيضاء.",
        who: "مديرو التواصل ومسؤولو صورة العلامة وفرق التسويق الموجهة نحو المحتوى والسمعة.",
        benefits: [
          "رسالة علامة واضحة ومميزة",
          "تنفيذ إبداعي متناسق على كل قناة",
          "إنتاج مركزي: تصميم وصورة وفيديو ومطبوعات",
        ],
        topics: [
          "منصة العلامة",
          "الهوية البصرية",
          "المحتوى والشبكات الاجتماعية",
          "الإنتاج المصور والفيديو",
          "تواصل الفعاليات",
        ],
        takeaways: [
          "25 خبرة تواصل متاحة في الدار البيضاء",
          "فريق إبداعي واستراتيجي في المغرب",
          "تدقيق مجاني مع توصيات تحريرية",
        ],
      },
      paragraphs: [
        "تجمع الدار البيضاء أكثر العلامات ظهورًا في المغرب: مجموعات وامتيازات ومؤسسات مالية وشركات خدمات تتنافس على الانتباه. والصورة المشتتة بين عدة مزودين تضعف السمعة وتشوّش الرسالة.",
        "دورنا كوكالة تواصل في الدار البيضاء هو بناء منصة علامة واحدة ثم تفعيلها بتناسق: الهوية البصرية والخط التحريري والمحتوى الاجتماعي والعلاقات الصحفية والإنتاج السمعي البصري.",
        "لا نفكر بالأداء وحده: التواصل يخدم السمعة وتفضيل العلامة والفخر الداخلي. كل تعبير يعزز مجالًا معروفًا بدل صور معزولة.",
        "يربط القسم أدناه خبرات التواصل المتاحة في الدار البيضاء: الهوية والإبداع والمحتوى والصورة والفيديو والفعاليات، كل منها عبر صفحتها المحلية.",
      ],
      challenges: [
        "رسالة علامة مخففة بين الوكالات والصيغ",
        "هوية بصرية غير متناسقة بين القنوات",
        "غياب تقويم تحريري وخط محتوى",
        "صورة علامة قليلة التميّز أمام المنافسين",
      ],
      approach: [
        "تدقيق العلامة والمجال التحريري والدعائم",
        "منصة العلامة: التموضع والرسائل والميثاق",
        "إنتاج المحتوى والإبداع والتعبير",
        "نشر منسق وعلاقات صحفية وقياس السمعة",
      ],
      faqs: [
        {
          question: "ما الخبرات التي تغطيها وكالة التواصل في الدار البيضاء؟",
          answer:
            "استراتيجية ومنصة العلامة والهوية البصرية والتصميم والمحتوى والشبكات والصورة والفيديو والموشن وتواصل الفعاليات.",
        },
        {
          question: "ما الفرق مع وكالتكم الرقمية في الدار البيضاء؟",
          answer:
            "تركز وكالة التواصل على العلامة والصورة والمحتوى؛ بينما تقود الوكالة الرقمية الاستقطاب والويب والبرمجيات والأداء. وهما متكاملتان.",
        },
        {
          question: "هل تديرون العلاقات الصحفية والفعاليات؟",
          answer:
            "نعم، نغطي العلاقات الصحفية والتواصل المؤسسي وتنشيط العلامة وتنظيم الفعاليات في الدار البيضاء.",
        },
        {
          question: "كيف نبدأ مع Mohtaoua؟",
          answer:
            "اطلب تدقيقًا مجانيًا. نحلل صورتك الحالية ونقدم توصيات تحريرية مرتبة قبل أي عرض سعر نهائي.",
        },
      ],
    },
    rabat: {
      metaTitle: "وكالة تواصل في الرباط | العلامة والمحتوى والعلاقات العامة",
      metaDescription:
        "وكالة تواصل في الرباط: استراتيجية العلامة والهوية والمحتوى المؤسسي والعلاقات العامة. 25 خبرة محلية وتدقيق مجاني.",
      h1: "وكالة تواصل في الرباط",
      intro:
        "في الرباط، تتقدم المصداقية والوضوح. تبني Mohtaoua تواصلًا صارمًا للمؤسسات والمكاتب وشركات الخدمات: العلامة والمحتوى المؤسسي والعلاقات العامة والدعائم المتقنة.",
      overview: {
        what: "مركز التواصل الذي يجمع خبراتنا في العلامة والمحتوى المؤسسي والإبداع والفعاليات لمنظمات الرباط.",
        who: "مديرو التواصل في المؤسسات والمكاتب والمدارس وشركات الخدمات المهتمة بصورتها.",
        benefits: [
          "صورة مؤسسية موثوقة ومتناسقة",
          "محتوى تربوي ومطمئن",
          "إنتاج تحريري صارم ومعتمد",
        ],
        topics: [
          "منصة العلامة",
          "الهوية البصرية",
          "المحتوى المؤسسي",
          "العلاقات العامة",
          "تواصل الفعاليات",
        ],
        takeaways: [
          "25 خبرة تواصل متاحة في الرباط",
          "فريق تحريري وإبداعي في المغرب",
          "تدقيق مجاني مع توصيات تحريرية",
        ],
      },
      paragraphs: [
        "تضم الرباط مؤسسات وإدارات ومكاتب وشركات خدمات تقوم سمعتها على الثقة. والتواصل غير المتقن أو غير المتناسق يضعف المصداقية مباشرة.",
        "دورنا كوكالة تواصل في الرباط هو وضع منصة علامة واضحة ثم إنتاج محتوى مؤسسي ودعائم وتعبير وفق معايير تحريرية عالية.",
        "نفضّل التربية والإثبات والطمأنة على البيع العدواني: التواصل يجب أن يرسّخ السلطة والثقة على المدى الطويل.",
        "يربط القسم أدناه خبرات التواصل المتاحة في الرباط: الهوية والإبداع والمحتوى والصورة والفيديو والفعاليات، كل منها عبر صفحتها المحلية.",
      ],
      challenges: [
        "صورة مؤسسية تفتقر إلى الوحدة",
        "محتوى تقني جدًا أو صعب الوصول",
        "غياب خط تحريري مطمئن",
        "تواصل غير مثمّن داخليًا",
      ],
      approach: [
        "تدقيق العلامة والمجال التحريري والدعائم",
        "منصة العلامة والرسائل المؤسسية",
        "إنتاج المحتوى والدعائم والتعبير",
        "العلاقات العامة وقياس السمعة",
      ],
      faqs: [
        {
          question: "ما الخبرات التي تغطيها وكالة التواصل في الرباط؟",
          answer:
            "استراتيجية ومنصة العلامة والهوية البصرية والمحتوى المؤسسي والشبكات والصورة والفيديو والعلاقات العامة وتواصل الفعاليات.",
        },
        {
          question: "ما الفرق مع وكالتكم الرقمية في الرباط؟",
          answer:
            "تحمل وكالة التواصل العلامة والصورة والمحتوى؛ بينما تقود الوكالة الرقمية الاستقطاب والويب والأداء. وهما متكاملتان.",
        },
        {
          question: "هل تعملون مع المؤسسات العمومية؟",
          answer:
            "نعم، نرافق المؤسسات والإدارات والمنظمات بمسارات مصادقة منظمة ونبرة مناسبة.",
        },
        {
          question: "كيف نبدأ مع Mohtaoua؟",
          answer:
            "اطلب تدقيقًا مجانيًا. نحلل صورتك ونقدم توصيات تحريرية مرتبة قبل أي عرض سعر نهائي.",
        },
      ],
    },
    marrakech: {
      metaTitle: "وكالة تواصل في مراكش | صورة العلامة والمحتوى الفاخر",
      metaDescription:
        "وكالة تواصل في مراكش: صورة العلامة والإدارة الفنية والمحتوى الفاخر والصورة والفيديو. 25 خبرة محلية وتدقيق مجاني.",
      h1: "وكالة تواصل في مراكش",
      intro:
        "في مراكش، العاطفة والجمال يبيعان. تصوغ Mohtaoua صورة علامة فاخرة: إدارة فنية ومحتوى متقن وصورة وفيديو وتجارب تبرز تجربة العميل.",
      overview: {
        what: "مركز التواصل الذي يجمع خبراتنا في العلامة والإدارة الفنية والمحتوى الفاخر والفعاليات لفاعلي مراكش.",
        who: "الفنادق والرياض والمطورون والعلامات اللايف ستايل وفاعلو السياحة والرفاهية.",
        benefits: [
          "صورة علامة مرغوبة ومتناسقة",
          "محتوى بصري فاخر يناسب الرفاهية",
          "إنتاج صورة وفيديو راقٍ",
        ],
        topics: [
          "منصة العلامة",
          "الإدارة الفنية",
          "المحتوى الفاخر",
          "الصورة والفيديو",
          "تواصل الفعاليات",
        ],
        takeaways: [
          "25 خبرة تواصل متاحة في مراكش",
          "فريق إبداعي وفني في المغرب",
          "تدقيق مجاني مع توصيات تحريرية",
        ],
      },
      paragraphs: [
        "تعيش مراكش على الصورة: الفنادق والرياض والمطورون وعلامات اللايف ستايل تتنافس على الجمال والتجربة. والتواصل العادي أو غير المتناسق يمر دون ملاحظة أمام عملاء دوليين صارمين.",
        "دورنا كوكالة تواصل في مراكش هو بناء إدارة فنية قوية ثم تفعيلها في محتوى فاخر: الهوية والصورة والفيديو والشبكات والتعبير المتقن.",
        "نضع العاطفة والسرد في خدمة العلامة بتنفيذ بصري لا تشوبه شائبة يعكس التموضع ومستوى الجودة.",
        "يربط القسم أدناه خبرات التواصل المتاحة في مراكش: الهوية والإبداع والمحتوى والصورة والفيديو والفعاليات، كل منها عبر صفحتها المحلية.",
      ],
      challenges: [
        "صورة علامة دون المستوى المستهدف",
        "محتوى بصري غير منتظم بين المواسم",
        "سرد ضعيف أمام المنافسة الدولية",
        "إنتاج إبداعي مشتت بين المزودين",
      ],
      approach: [
        "تدقيق العلامة والمجال الفني والمحتوى",
        "الإدارة الفنية ومنصة العلامة",
        "إنتاج الصورة والفيديو والمحتوى الفاخر",
        "النشر وقياس السمعة",
      ],
      faqs: [
        {
          question: "ما الخبرات التي تغطيها وكالة التواصل في مراكش؟",
          answer:
            "الإدارة الفنية ومنصة العلامة والهوية البصرية والمحتوى الفاخر والصورة والفيديو والموشن وتواصل الفعاليات.",
        },
        {
          question: "ما الفرق مع وكالتكم الرقمية في مراكش؟",
          answer:
            "تحمل وكالة التواصل الصورة والإبداع؛ بينما تقود الوكالة الرقمية الاستقطاب والحجوزات والأداء. وهما متكاملتان.",
        },
        {
          question: "هل تنتجون الصورة والفيديو في الموقع؟",
          answer:
            "نعم، يمكن إنتاج الإدارة الفنية والتصوير والفيديو والموشن وReels في مراكش حسب مشروعك.",
        },
        {
          question: "كيف نبدأ مع Mohtaoua؟",
          answer:
            "اطلب تدقيقًا مجانيًا. نحلل صورتك ونقدم توصيات إبداعية مرتبة قبل أي عرض سعر نهائي.",
        },
      ],
    },
    tanger: {
      metaTitle: "وكالة تواصل في طنجة | العلامة والمحتوى متعدد اللغات وB2B",
      metaDescription:
        "وكالة تواصل في طنجة: صورة العلامة والمحتوى متعدد اللغات ودعائم B2B والإنتاج. 25 خبرة محلية وتدقيق مجاني.",
      h1: "وكالة تواصل في طنجة",
      intro:
        "في طنجة، تُبنى المصداقية الدولية على الصورة. تبني Mohtaoua تواصلًا B2B متينًا: العلامة والمحتوى متعدد اللغات والدعائم التجارية والإنتاج المناسب لأسواق التصدير.",
      overview: {
        what: "مركز التواصل الذي يجمع خبراتنا في العلامة والمحتوى متعدد اللغات والإبداع والفعاليات لشركات طنجة.",
        who: "الصناعيون والمصدرون واللوجستيون ومقدمو خدمات B2B الموجهون نحو الأسواق الدولية.",
        benefits: [
          "صورة موثوقة لدى صناع القرار",
          "محتوى متعدد اللغات متناسق",
          "دعائم تجارية ومؤسسية احترافية",
        ],
        topics: [
          "منصة العلامة",
          "الهوية البصرية",
          "المحتوى متعدد اللغات",
          "دعائم B2B",
          "تواصل الفعاليات",
        ],
        takeaways: [
          "25 خبرة تواصل متاحة في طنجة",
          "فريق تحريري وإبداعي في المغرب",
          "تدقيق مجاني مع توصيات تحريرية",
        ],
      },
      paragraphs: [
        "طنجة، مركز صناعي ولوجستيكي موجه نحو أوروبا، تفرض تواصلًا موثوقًا: يحكم صناع القرار والشركاء الدوليون على الشركة من صورتها قبل أي اتصال.",
        "دورنا كوكالة تواصل في طنجة هو وضع منصة علامة واضحة ثم إنتاج محتوى متعدد اللغات ودعائم مؤسسية وتعبير وفق المعايير الدولية.",
        "نحرص على التناسق بين الفرنسية والعربية والإنجليزية وعلى جودة الدعائم التجارية المرافقة لنمو التصدير.",
        "يربط القسم أدناه خبرات التواصل المتاحة في طنجة: الهوية والإبداع والمحتوى والصورة والفيديو والفعاليات، كل منها عبر صفحتها المحلية.",
      ],
      challenges: [
        "صورة ضعيفة المصداقية لدى الشركاء الدوليين",
        "محتوى متعدد اللغات غير متناسق أو سيئ الترجمة",
        "دعائم تجارية قديمة",
        "علامة قليلة التميّز في المناقصات",
      ],
      approach: [
        "تدقيق العلامة والدعائم والمحتوى متعدد اللغات",
        "منصة العلامة ورسائل B2B",
        "إنتاج الدعائم والمحتوى والتعبير",
        "النشر وقياس السمعة",
      ],
      faqs: [
        {
          question: "ما الخبرات التي تغطيها وكالة التواصل في طنجة؟",
          answer:
            "استراتيجية ومنصة العلامة والهوية البصرية والمحتوى متعدد اللغات ودعائم B2B والصورة والفيديو وتواصل الفعاليات.",
        },
        {
          question: "ما الفرق مع وكالتكم الرقمية في طنجة؟",
          answer:
            "تحمل وكالة التواصل العلامة والصورة والمحتوى؛ بينما تقود الوكالة الرقمية الاستقطاب والويب والأداء. وهما متكاملتان.",
        },
        {
          question: "هل تنتجون محتوى بعدة لغات؟",
          answer:
            "نعم، ننتج المحتوى والدعائم بالفرنسية والعربية والإنجليزية حسب أسواقك المستهدفة.",
        },
        {
          question: "كيف نبدأ مع Mohtaoua؟",
          answer:
            "اطلب تدقيقًا مجانيًا. نحلل صورتك ونقدم توصيات تحريرية مرتبة قبل أي عرض سعر نهائي.",
        },
      ],
    },
    agadir: {
      metaTitle: "وكالة تواصل في أكادير | صورة العلامة والمحتوى المحلي",
      metaDescription:
        "وكالة تواصل في أكادير: صورة العلامة والمحتوى والصورة/الفيديو والتواصل المحلي للسياحة والأغذية. 25 خبرة محلية وتدقيق مجاني.",
      h1: "وكالة تواصل في أكادير",
      intro:
        "في أكادير، يجب أن تخاطب العلامة جمهورًا مختلطًا: السكان والسياح والموزعين. تبني Mohtaoua تواصلًا واضحًا ومحليًا: الصورة والمحتوى والصورة والفيديو والدعائم المناسبة.",
      overview: {
        what: "مركز التواصل الذي يجمع خبراتنا في العلامة والمحتوى والإبداع والفعاليات لشركات أكادير.",
        who: "فاعلو السياحة والأغذية والصيد والتجارة المحلية.",
        benefits: [
          "صورة علامة واضحة لجمهور مختلط",
          "محتوى مناسب للجوال والسياق المحلي",
          "إنتاج صورة وفيديو منتظم",
        ],
        topics: [
          "منصة العلامة",
          "الهوية البصرية",
          "المحتوى المحلي",
          "الصورة والفيديو",
          "تواصل الفعاليات",
        ],
        takeaways: [
          "25 خبرة تواصل متاحة في أكادير",
          "فريق إبداعي وتحريري في المغرب",
          "تدقيق مجاني مع توصيات تحريرية",
        ],
      },
      paragraphs: [
        "تجمع أكادير بين السياحة والأغذية والتجارة المحلية. ويجب على العلامات مخاطبة جماهير مختلفة جدًا — السكان والسياح والموزعين — دون فقدان التناسق.",
        "دورنا كوكالة تواصل في أكادير هو بناء منصة علامة واضحة ثم إنتاج محتوى وصور ودعائم مناسبة لكل جمهور وكل موسم.",
        "نحرص على الوضوح والتكيف مع الجوال وانتظام التعبير كي تبقى العلامة حاضرة طوال السنة.",
        "يربط القسم أدناه خبرات التواصل المتاحة في أكادير: الهوية والإبداع والمحتوى والصورة والفيديو والفعاليات، كل منها عبر صفحتها المحلية.",
      ],
      challenges: [
        "صورة تكافح لمخاطبة جماهير مختلفة جدًا",
        "محتوى غير منتظم حسب الموسم",
        "إنتاج بصري غير كافٍ",
        "علامة يصعب التعرف عليها محليًا",
      ],
      approach: [
        "تدقيق العلامة والجماهير والمحتوى",
        "منصة العلامة والخط التحريري",
        "إنتاج المحتوى والصور والدعائم",
        "النشر المحلي وقياس السمعة",
      ],
      faqs: [
        {
          question: "ما الخبرات التي تغطيها وكالة التواصل في أكادير؟",
          answer:
            "استراتيجية ومنصة العلامة والهوية البصرية والمحتوى والشبكات والصورة والفيديو وتواصل الفعاليات.",
        },
        {
          question: "ما الفرق مع وكالتكم الرقمية في أكادير؟",
          answer:
            "تحمل وكالة التواصل العلامة والصورة والمحتوى؛ بينما تقود الوكالة الرقمية الاستقطاب والأداء. وهما متكاملتان.",
        },
        {
          question: "هل تنتجون الصورة والفيديو في أكادير؟",
          answer:
            "نعم، يمكن إنتاج التصوير والفيديو والموشن وReels محليًا حسب مشروعك.",
        },
        {
          question: "كيف نبدأ مع Mohtaoua؟",
          answer:
            "اطلب تدقيقًا مجانيًا. نحلل صورتك ونقدم توصيات تحريرية مرتبة قبل أي عرض سعر نهائي.",
        },
      ],
    },
  },
};

let migratedCount = 0;
let addedCount = 0;

for (const locale of ["fr", "en", "ar"]) {
  const path = join(root, `messages/${locale}/agencyHubPages.json`);
  const json = JSON.parse(readFileSync(path, "utf8"));

  // 1. Migration idempotente items.{ville} -> items.digitale.{ville}
  if (!json.items.digitale) {
    const digitale = {};
    for (const city of DIGITALE_CITIES) {
      if (json.items[city]) {
        digitale[city] = json.items[city];
        delete json.items[city];
      }
    }
    json.items = { digitale, ...json.items };
    migratedCount += Object.keys(digitale).length;
  }

  // 2. Ajout du bloc communication
  json.items.communication = communication[locale];
  addedCount += Object.keys(communication[locale]).length;

  // 3. Labels de grille communication
  Object.assign(json.labels, communicationLabels[locale]);

  writeFileSync(path, `${JSON.stringify(json, null, 2)}\n`);

  // 4. serviceCityPages.localContext -> structure digitale/communication
  const scPath = join(root, `messages/${locale}/serviceCityPages.json`);
  const scJson = JSON.parse(readFileSync(scPath, "utf8"));
  scJson.localContext = localContext[locale];
  writeFileSync(scPath, `${JSON.stringify(scJson, null, 2)}\n`);

  console.log(`Lot 3 i18n : ${locale} — migration + communication OK`);
}

console.log(
  `Migration digitale: ${migratedCount} clés — communication ajoutées: ${addedCount} clés`
);
