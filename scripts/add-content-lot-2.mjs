#!/usr/bin/env node
/**
 * Lot 2 — hubs agence digitale Rabat, Marrakech, Tanger, Agadir, Fès.
 * Maintient la parité des clés i18n FR / EN / AR.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const cityItems = {
  fr: {
    rabat: {
      metaTitle: "Agence Digitale Rabat | Mohtaoua 360°",
      metaDescription:
        "Agence digitale à Rabat : marketing, web, logiciels, mobile, design et automatisation. 53 expertises locales et audit gratuit.",
      h1: "Agence digitale à Rabat",
      intro:
        "Mohtaoua accompagne les entreprises de Rabat et de la région avec une équipe 360° capable de relier marketing, technologie, création et automatisation.",
      overview: {
        what: "Le hub local qui rassemble toutes les expertises digitales proposées par Mohtaoua aux entreprises de Rabat.",
        who: "Dirigeants, directions marketing et équipes digitales d'institutions, cabinets, écoles et entreprises de services.",
        benefits: [
          "Un partenaire unique pour le marketing et la technologie",
          "Des expertises adaptées aux cycles de décision B2B et institutionnels",
          "Un pilotage transparent de la stratégie à l'optimisation",
        ],
        topics: [
          "Acquisition digitale",
          "Sites web et e-commerce",
          "Logiciels, CRM et automatisation",
          "Branding, photo et vidéo",
        ],
        takeaways: [
          "53 services disponibles à Rabat",
          "Équipe multidisciplinaire basée au Maroc",
          "Audit gratuit avec plan d'action priorisé",
        ],
      },
      paragraphs: [
        "Rabat et sa région concentrent institutions, cabinets de conseil, intégrateurs et entreprises de services qui vendent à des clients exigeants. Dans cet environnement, le ton, la crédibilité et la clarté du message digital sont déterminants pour convertir.",
        "Notre rôle d'agence digitale à Rabat consiste à construire un système complet : SEO, publicité, contenus, web, logiciels, CRM, automatisation, design et production audiovisuelle, alignés sur vos objectifs commerciaux.",
        "Chaque mission est pilotée avec des indicateurs adaptés : coût par lead qualifié, conversion, chiffre d'affaires attribué, visibilité organique ou gains de productivité.",
        "La section ci-dessous relie directement toutes nos pages service à Rabat pour approfondir chaque expertise et son contexte local.",
      ],
      challenges: [
        "Convaincre des décideurs exigeants dans des cycles de vente longs",
        "Professionnaliser l'image digitale sans sacrifier la rigueur éditoriale",
        "Relier acquisition, nurturing et suivi commercial",
        "Automatiser le suivi sans perdre la relation humaine",
      ],
      approach: [
        "Audit de la marque, des canaux, du site et des données",
        "Feuille de route priorisée selon impact et faisabilité",
        "Équipe dédiée réunissant stratégie, création et technologie",
        "Reporting régulier et optimisation continue",
      ],
      faqs: [
        {
          question: "Quels services propose votre agence digitale à Rabat ?",
          answer:
            "Nous couvrons 53 expertises : marketing digital, SEO, publicité, web, e-commerce, logiciels, applications mobiles, CRM, automatisation, IA, branding, photo, vidéo et événements.",
        },
        {
          question: "Travaillez-vous avec les institutions et les PME ?",
          answer:
            "Oui. Le périmètre et l'équipe sont adaptés à la maturité, aux objectifs et aux contraintes de chaque organisation.",
        },
        {
          question: "Pouvez-vous intervenir dans nos locaux à Rabat ?",
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
    marrakech: {
      metaTitle: "Agence Digitale Marrakech | Mohtaoua 360°",
      metaDescription:
        "Agence digitale à Marrakech : marketing, web, logiciels, mobile, design et automatisation. 53 expertises locales et audit gratuit.",
      h1: "Agence digitale à Marrakech",
      intro:
        "Mohtaoua accompagne les entreprises de Marrakech avec une équipe 360° capable de relier marketing, technologie, création et automatisation.",
      overview: {
        what: "Le hub local qui rassemble toutes les expertises digitales proposées par Mohtaoua aux entreprises de Marrakech.",
        who: "Dirigeants et équipes marketing d'hôtels, promoteurs immobiliers, acteurs du tourisme et marques premium.",
        benefits: [
          "Une exécution créative à la hauteur d'un marché international",
          "Des campagnes calibrées selon la saisonnalité locale",
          "Un pilotage transparent de la stratégie à l'optimisation",
        ],
        topics: [
          "Acquisition digitale",
          "Sites web et e-commerce",
          "Logiciels, CRM et automatisation",
          "Branding, photo et vidéo",
        ],
        takeaways: [
          "53 services disponibles à Marrakech",
          "Équipe multidisciplinaire basée au Maroc",
          "Audit gratuit avec plan d'action priorisé",
        ],
      },
      paragraphs: [
        "Marrakech attire investisseurs, promoteurs, hôteliers et acteurs du luxe. La saisonnalité, la concurrence internationale et l'importance du visuel imposent une exécution irréprochable sur tous les canaux.",
        "Notre rôle d'agence digitale à Marrakech consiste à construire un système complet : SEO, publicité, contenus premium, web, logiciels, CRM, automatisation, design et production audiovisuelle.",
        "Chaque mission est pilotée avec des indicateurs adaptés : réservations, demandes de devis, coût par lead qualifié, conversion et visibilité organique.",
        "La section ci-dessous relie directement toutes nos pages service à Marrakech pour approfondir chaque expertise et son contexte local.",
      ],
      challenges: [
        "Maximiser le ROI en haute saison sans gaspiller le budget",
        "Se démarquer sur un marché très visuel et concurrentiel",
        "Relier campagnes marketing et suivi commercial",
        "Produire des contenus cohérents à grande échelle",
      ],
      approach: [
        "Audit de la marque, des canaux, du site et des données",
        "Calendrier média aligné sur la saisonnalité et les événements locaux",
        "Équipe dédiée réunissant stratégie, création et technologie",
        "Reporting régulier et optimisation continue",
      ],
      faqs: [
        {
          question: "Quels services propose votre agence digitale à Marrakech ?",
          answer:
            "Nous couvrons 53 expertises : marketing digital, SEO, publicité, web, e-commerce, logiciels, applications mobiles, CRM, automatisation, IA, branding, photo, vidéo et événements.",
        },
        {
          question: "Travaillez-vous avec l'hôtellerie et l'immobilier ?",
          answer:
            "Oui. Nous accompagnons hôtels, riads, promoteurs et acteurs du tourisme avec des stratégies adaptées à la saisonnalité.",
        },
        {
          question: "Pouvez-vous intervenir dans nos locaux à Marrakech ?",
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
    tanger: {
      metaTitle: "Agence Digitale Tanger | Mohtaoua 360°",
      metaDescription:
        "Agence digitale à Tanger : marketing, web, logiciels, mobile, design et automatisation. 53 expertises locales et audit gratuit.",
      h1: "Agence digitale à Tanger",
      intro:
        "Mohtaoua accompagne les entreprises de Tanger avec une équipe 360° capable de relier marketing, technologie, création et automatisation.",
      overview: {
        what: "Le hub local qui rassemble toutes les expertises digitales proposées par Mohtaoua aux entreprises de Tanger.",
        who: "Dirigeants et équipes digitales d'industriels, exportateurs, logisticiens et prestataires B2B du grand Nord.",
        benefits: [
          "Une communication crédible pour des marchés locaux et internationaux",
          "Des contenus multilingues adaptés à l'export",
          "Un pilotage transparent de la stratégie à l'optimisation",
        ],
        topics: [
          "Acquisition digitale",
          "Sites web et e-commerce",
          "Logiciels, CRM et automatisation",
          "Branding, photo et vidéo",
        ],
        takeaways: [
          "53 services disponibles à Tanger",
          "Équipe multidisciplinaire basée au Maroc",
          "Audit gratuit avec plan d'action priorisé",
        ],
      },
      paragraphs: [
        "Tanger, porte de l'Afrique et hub logistique majeur, concentre industriels, exportateurs et prestataires B2B. Les acheteurs comparent les offres en ligne avant tout premier contact commercial.",
        "Notre rôle d'agence digitale à Tanger consiste à construire un système complet : SEO, publicité, contenus multilingues, web, logiciels, CRM, automatisation, design et production audiovisuelle.",
        "Chaque mission est pilotée avec des indicateurs adaptés : leads qualifiés, appels d'offres, conversion, visibilité organique et crédibilité auprès des donneurs d'ordre.",
        "La section ci-dessous relie directement toutes nos pages service à Tanger pour approfondir chaque expertise et son contexte local.",
      ],
      challenges: [
        "Renforcer la crédibilité B2B auprès des donneurs d'ordre",
        "Générer des leads structurés pour l'export et les appels d'offres",
        "Moderniser les outils sans interrompre les opérations",
        "Produire des contenus multilingues cohérents",
      ],
      approach: [
        "Audit de la marque, des canaux, du site et des données",
        "Feuille de route priorisée selon impact et faisabilité",
        "Équipe dédiée réunissant stratégie, création et technologie",
        "Reporting régulier et optimisation continue",
      ],
      faqs: [
        {
          question: "Quels services propose votre agence digitale à Tanger ?",
          answer:
            "Nous couvrons 53 expertises : marketing digital, SEO, publicité, web, e-commerce, logiciels, applications mobiles, CRM, automatisation, IA, branding, photo, vidéo et événements.",
        },
        {
          question: "Travaillez-vous avec des entreprises exportatrices ?",
          answer:
            "Oui. Nous adaptons les contenus et campagnes aux marchés cibles, en français, arabe et anglais selon vos besoins.",
        },
        {
          question: "Pouvez-vous intervenir dans nos locaux à Tanger ?",
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
    agadir: {
      metaTitle: "Agence Digitale Agadir | Mohtaoua 360°",
      metaDescription:
        "Agence digitale à Agadir : marketing, web, logiciels, mobile, design et automatisation. 53 expertises locales et audit gratuit.",
      h1: "Agence digitale à Agadir",
      intro:
        "Mohtaoua accompagne les entreprises d'Agadir avec une équipe 360° capable de relier marketing, technologie, création et automatisation.",
      overview: {
        what: "Le hub local qui rassemble toutes les expertises digitales proposées par Mohtaoua aux entreprises d'Agadir.",
        who: "Dirigeants et équipes marketing d'acteurs du tourisme, de l'agroalimentaire, de la pêche et du commerce local.",
        benefits: [
          "Une approche data-driven adaptée à la double saisonnalité",
          "Des créatives optimisées mobile et WhatsApp",
          "Un pilotage transparent de la stratégie à l'optimisation",
        ],
        topics: [
          "Acquisition digitale",
          "Sites web et e-commerce",
          "Logiciels, CRM et automatisation",
          "Branding, photo et vidéo",
        ],
        takeaways: [
          "53 services disponibles à Agadir",
          "Équipe multidisciplinaire basée au Maroc",
          "Audit gratuit avec plan d'action priorisé",
        ],
      },
      paragraphs: [
        "Agadir combine tourisme balnéaire, filière agro et activités liées à la mer. Les entreprises locales doivent capter une clientèle mixte — résidents, touristes et distributeurs nationaux.",
        "Notre rôle d'agence digitale à Agadir consiste à construire un système complet : SEO, publicité, contenus, web, logiciels, CRM, automatisation, design et production audiovisuelle.",
        "Chaque mission est pilotée avec des indicateurs adaptés : réservations, demandes entrantes, coût par lead, conversion et visibilité sur les périodes les plus rentables.",
        "La section ci-dessous relie directement toutes nos pages service à Agadir pour approfondir chaque expertise et son contexte local.",
      ],
      challenges: [
        "Piloter un budget marketing malgré la saisonnalité touristique",
        "Convertir rapidement les demandes via mobile et WhatsApp",
        "Relier campagnes marketing et suivi commercial",
        "Produire des contenus cohérents pour des audiences variées",
      ],
      approach: [
        "Audit de la marque, des canaux, du site et des données",
        "Calendrier média flexible tourisme / agro",
        "Équipe dédiée réunissant stratégie, création et technologie",
        "Reporting régulier et optimisation continue",
      ],
      faqs: [
        {
          question: "Quels services propose votre agence digitale à Agadir ?",
          answer:
            "Nous couvrons 53 expertises : marketing digital, SEO, publicité, web, e-commerce, logiciels, applications mobiles, CRM, automatisation, IA, branding, photo, vidéo et événements.",
        },
        {
          question: "Travaillez-vous avec le tourisme et l'agroalimentaire ?",
          answer:
            "Oui. Nous adaptons les stratégies aux pics saisonniers et aux spécificités de chaque filière.",
        },
        {
          question: "Pouvez-vous intervenir dans nos locaux à Agadir ?",
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
    fes: {
      metaTitle: "Agence Digitale Fès | Mohtaoua 360°",
      metaDescription:
        "Agence digitale à Fès : marketing, web, logiciels, mobile, design et automatisation. 53 expertises locales et audit gratuit.",
      h1: "Agence digitale à Fès",
      intro:
        "Mohtaoua accompagne les entreprises de Fès avec une équipe 360° capable de relier marketing, technologie, création et automatisation.",
      overview: {
        what: "Le hub local qui rassemble toutes les expertises digitales proposées par Mohtaoua aux entreprises de Fès.",
        who: "Dirigeants et équipes marketing d'acteurs de l'artisanat, du commerce, de l'éducation et du tourisme culturel.",
        benefits: [
          "Une narration de marque authentique et moderne",
          "Une présence digitale soignée pour toucher clientèle locale et nationale",
          "Un pilotage transparent de la stratégie à l'optimisation",
        ],
        topics: [
          "Acquisition digitale",
          "Sites web et e-commerce",
          "Logiciels, CRM et automatisation",
          "Branding, photo et vidéo",
        ],
        takeaways: [
          "53 services disponibles à Fès",
          "Équipe multidisciplinaire basée au Maroc",
          "Audit gratuit avec plan d'action priorisé",
        ],
      },
      paragraphs: [
        "Fès possède un tissu économique riche mêlant artisanat, commerce traditionnel, éducation et tourisme culturel. La différenciation passe par une narration de marque authentique et une présence digitale soignée.",
        "Notre rôle d'agence digitale à Fès consiste à construire un système complet : SEO, publicité, contenus, web, logiciels, CRM, automatisation, design et production audiovisuelle.",
        "Chaque mission est pilotée avec des indicateurs adaptés : notoriété locale, leads qualifiés, conversion, avis clients et visibilité organique.",
        "La section ci-dessous relie directement toutes nos pages service à Fès pour approfondir chaque expertise et son contexte local.",
      ],
      challenges: [
        "Digitaliser le bouche-à-oreille sans perdre l'authenticité",
        "Se positionner face à des concurrents mieux référencés en ligne",
        "Relier campagnes marketing et suivi commercial",
        "Valoriser l'identité de marque sur tous les canaux",
      ],
      approach: [
        "Audit de la marque, des canaux, du site et des données",
        "Feuille de route priorisée selon impact et faisabilité",
        "Équipe dédiée réunissant stratégie, création et technologie",
        "Reporting régulier et optimisation continue",
      ],
      faqs: [
        {
          question: "Quels services propose votre agence digitale à Fès ?",
          answer:
            "Nous couvrons 53 expertises : marketing digital, SEO, publicité, web, e-commerce, logiciels, applications mobiles, CRM, automatisation, IA, branding, photo, vidéo et événements.",
        },
        {
          question: "Travaillez-vous avec l'artisanat et le commerce local ?",
          answer:
            "Oui. Nous aidons les acteurs locaux à moderniser leur acquisition tout en préservant l'authenticité de leur marque.",
        },
        {
          question: "Pouvez-vous intervenir dans nos locaux à Fès ?",
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
  en: {
    rabat: {
      metaTitle: "Digital Agency Rabat | Mohtaoua 360°",
      metaDescription:
        "Digital agency in Rabat: marketing, web, software, mobile, design and automation. 53 local services and a free audit.",
      h1: "Digital agency in Rabat",
      intro:
        "Mohtaoua supports Rabat businesses with a 360° team connecting marketing, technology, creative and automation.",
      overview: {
        what: "The local hub gathering every Mohtaoua digital expertise available to Rabat businesses.",
        who: "Leaders and digital teams in institutions, consultancies, schools and service companies.",
        benefits: [
          "One marketing and technology partner",
          "Expertise suited to B2B and institutional sales cycles",
          "Transparent management",
        ],
        topics: [
          "Digital acquisition",
          "Web and e-commerce",
          "Software, CRM and automation",
          "Branding, photo and video",
        ],
        takeaways: [
          "53 services in Rabat",
          "Morocco-based multidisciplinary team",
          "Free prioritized audit",
        ],
      },
      paragraphs: [
        "Rabat and its region host institutions, consultancies, integrators and service companies selling to demanding clients. Tone, credibility and message clarity are decisive for conversion.",
        "Our role as a digital agency in Rabat is to build a complete system: SEO, media, content, web, software, CRM, automation, design and audiovisual production.",
        "Every engagement is managed with indicators tied to qualified-lead cost, conversion, attributed revenue, organic visibility or productivity gains.",
        "The section below links every local service page in Rabat, helping you explore each expertise and its local context.",
      ],
      challenges: [
        "Convince demanding decision-makers in long sales cycles",
        "Professionalize digital image without losing editorial rigor",
        "Connect acquisition, nurturing and sales follow-up",
        "Automate follow-up without losing the human relationship",
      ],
      approach: [
        "Brand and channel audit",
        "Prioritized roadmap",
        "Dedicated multidisciplinary team",
        "Regular reporting",
      ],
      faqs: [
        {
          question: "Which services do you offer in Rabat?",
          answer:
            "We cover 53 areas across marketing, web, software, mobile, CRM, automation, AI, branding, photo, video and events.",
        },
        {
          question: "Do you work with institutions and SMEs?",
          answer:
            "Yes. Scope and team adapt to each organization's maturity and constraints.",
        },
        {
          question: "Can you work at our Rabat office?",
          answer:
            "Yes. Workshops, shoots and strategic meetings can be held on-site or remotely.",
        },
        {
          question: "How do we start?",
          answer:
            "Request a free audit for a prioritized action plan before any firm quote.",
        },
      ],
    },
    marrakech: {
      metaTitle: "Digital Agency Marrakech | Mohtaoua 360°",
      metaDescription:
        "Digital agency in Marrakech: marketing, web, software, mobile, design and automation. 53 local services and a free audit.",
      h1: "Digital agency in Marrakech",
      intro:
        "Mohtaoua supports Marrakech businesses with a 360° team connecting marketing, technology, creative and automation.",
      overview: {
        what: "The local hub gathering every Mohtaoua digital expertise available to Marrakech businesses.",
        who: "Leaders and marketing teams in hotels, real-estate developers, tourism players and premium brands.",
        benefits: [
          "Creative execution matching an international market",
          "Campaigns calibrated to local seasonality",
          "Transparent management",
        ],
        topics: [
          "Digital acquisition",
          "Web and e-commerce",
          "Software, CRM and automation",
          "Branding, photo and video",
        ],
        takeaways: [
          "53 services in Marrakech",
          "Morocco-based multidisciplinary team",
          "Free prioritized audit",
        ],
      },
      paragraphs: [
        "Marrakech attracts investors, developers, hoteliers and luxury players. Seasonality, international competition and visual impact require flawless execution across every channel.",
        "Our role as a digital agency in Marrakech is to build a complete system: SEO, media, premium content, web, software, CRM, automation, design and audiovisual production.",
        "Every engagement is managed with indicators tied to bookings, quote requests, qualified-lead cost, conversion and organic visibility.",
        "The section below links every local service page in Marrakech, helping you explore each expertise and its local context.",
      ],
      challenges: [
        "Maximize ROI in high season without wasting budget",
        "Stand out in a highly visual, competitive market",
        "Connect marketing and sales",
        "Scale consistent content",
      ],
      approach: [
        "Brand and channel audit",
        "Media calendar aligned with seasonality and local events",
        "Dedicated multidisciplinary team",
        "Regular reporting",
      ],
      faqs: [
        {
          question: "Which services do you offer in Marrakech?",
          answer:
            "We cover 53 areas across marketing, web, software, mobile, CRM, automation, AI, branding, photo, video and events.",
        },
        {
          question: "Do you work with hospitality and real estate?",
          answer:
            "Yes. We support hotels, riads, developers and tourism players with seasonality-aware strategies.",
        },
        {
          question: "Can you work at our Marrakech office?",
          answer:
            "Yes. Workshops, shoots and strategic meetings can be held on-site or remotely.",
        },
        {
          question: "How do we start?",
          answer:
            "Request a free audit for a prioritized action plan before any firm quote.",
        },
      ],
    },
    tanger: {
      metaTitle: "Digital Agency Tangier | Mohtaoua 360°",
      metaDescription:
        "Digital agency in Tangier: marketing, web, software, mobile, design and automation. 53 local services and a free audit.",
      h1: "Digital agency in Tangier",
      intro:
        "Mohtaoua supports Tangier businesses with a 360° team connecting marketing, technology, creative and automation.",
      overview: {
        what: "The local hub gathering every Mohtaoua digital expertise available to Tangier businesses.",
        who: "Leaders and digital teams in industrial, export, logistics and B2B service companies.",
        benefits: [
          "Credible communication for local and international markets",
          "Multilingual content adapted to export",
          "Transparent management",
        ],
        topics: [
          "Digital acquisition",
          "Web and e-commerce",
          "Software, CRM and automation",
          "Branding, photo and video",
        ],
        takeaways: [
          "53 services in Tangier",
          "Morocco-based multidisciplinary team",
          "Free prioritized audit",
        ],
      },
      paragraphs: [
        "Tangier, gateway to Africa and a major logistics hub, concentrates industrial, export and B2B service companies. Buyers compare offers online before any first commercial contact.",
        "Our role as a digital agency in Tangier is to build a complete system: SEO, media, multilingual content, web, software, CRM, automation, design and audiovisual production.",
        "Every engagement is managed with indicators tied to qualified leads, tenders, conversion, organic visibility and credibility with decision-makers.",
        "The section below links every local service page in Tangier, helping you explore each expertise and its local context.",
      ],
      challenges: [
        "Strengthen B2B credibility with decision-makers",
        "Generate structured leads for export and tenders",
        "Modernize tools safely",
        "Produce consistent multilingual content",
      ],
      approach: [
        "Brand and channel audit",
        "Prioritized roadmap",
        "Dedicated multidisciplinary team",
        "Regular reporting",
      ],
      faqs: [
        {
          question: "Which services do you offer in Tangier?",
          answer:
            "We cover 53 areas across marketing, web, software, mobile, CRM, automation, AI, branding, photo, video and events.",
        },
        {
          question: "Do you work with export companies?",
          answer:
            "Yes. We adapt content and campaigns to target markets in French, Arabic and English as needed.",
        },
        {
          question: "Can you work at our Tangier office?",
          answer:
            "Yes. Workshops, shoots and strategic meetings can be held on-site or remotely.",
        },
        {
          question: "How do we start?",
          answer:
            "Request a free audit for a prioritized action plan before any firm quote.",
        },
      ],
    },
    agadir: {
      metaTitle: "Digital Agency Agadir | Mohtaoua 360°",
      metaDescription:
        "Digital agency in Agadir: marketing, web, software, mobile, design and automation. 53 local services and a free audit.",
      h1: "Digital agency in Agadir",
      intro:
        "Mohtaoua supports Agadir businesses with a 360° team connecting marketing, technology, creative and automation.",
      overview: {
        what: "The local hub gathering every Mohtaoua digital expertise available to Agadir businesses.",
        who: "Leaders and marketing teams in tourism, agri-food, fishing and local retail.",
        benefits: [
          "Data-driven approach adapted to dual seasonality",
          "Mobile and WhatsApp-optimized creatives",
          "Transparent management",
        ],
        topics: [
          "Digital acquisition",
          "Web and e-commerce",
          "Software, CRM and automation",
          "Branding, photo and video",
        ],
        takeaways: [
          "53 services in Agadir",
          "Morocco-based multidisciplinary team",
          "Free prioritized audit",
        ],
      },
      paragraphs: [
        "Agadir combines seaside tourism, agri-food and sea-related activities. Local businesses must reach a mixed audience — residents, tourists and national distributors.",
        "Our role as a digital agency in Agadir is to build a complete system: SEO, media, content, web, software, CRM, automation, design and audiovisual production.",
        "Every engagement is managed with indicators tied to bookings, inbound requests, lead cost, conversion and visibility during the most profitable periods.",
        "The section below links every local service page in Agadir, helping you explore each expertise and its local context.",
      ],
      challenges: [
        "Manage marketing budget despite tourist seasonality",
        "Convert quickly via mobile and WhatsApp",
        "Connect marketing and sales",
        "Produce consistent content for varied audiences",
      ],
      approach: [
        "Brand and channel audit",
        "Flexible tourism / agri-food media calendar",
        "Dedicated multidisciplinary team",
        "Regular reporting",
      ],
      faqs: [
        {
          question: "Which services do you offer in Agadir?",
          answer:
            "We cover 53 areas across marketing, web, software, mobile, CRM, automation, AI, branding, photo, video and events.",
        },
        {
          question: "Do you work with tourism and agri-food?",
          answer:
            "Yes. We adapt strategies to seasonal peaks and each sector's specifics.",
        },
        {
          question: "Can you work at our Agadir office?",
          answer:
            "Yes. Workshops, shoots and strategic meetings can be held on-site or remotely.",
        },
        {
          question: "How do we start?",
          answer:
            "Request a free audit for a prioritized action plan before any firm quote.",
        },
      ],
    },
    fes: {
      metaTitle: "Digital Agency Fes | Mohtaoua 360°",
      metaDescription:
        "Digital agency in Fes: marketing, web, software, mobile, design and automation. 53 local services and a free audit.",
      h1: "Digital agency in Fes",
      intro:
        "Mohtaoua supports Fes businesses with a 360° team connecting marketing, technology, creative and automation.",
      overview: {
        what: "The local hub gathering every Mohtaoua digital expertise available to Fes businesses.",
        who: "Leaders and marketing teams in crafts, retail, education and cultural tourism.",
        benefits: [
          "Authentic and modern brand storytelling",
          "Polished digital presence for local and national audiences",
          "Transparent management",
        ],
        topics: [
          "Digital acquisition",
          "Web and e-commerce",
          "Software, CRM and automation",
          "Branding, photo and video",
        ],
        takeaways: [
          "53 services in Fes",
          "Morocco-based multidisciplinary team",
          "Free prioritized audit",
        ],
      },
      paragraphs: [
        "Fes has a rich economic fabric mixing crafts, traditional commerce, education and cultural tourism. Differentiation comes from authentic brand storytelling and a polished digital presence.",
        "Our role as a digital agency in Fes is to build a complete system: SEO, media, content, web, software, CRM, automation, design and audiovisual production.",
        "Every engagement is managed with indicators tied to local awareness, qualified leads, conversion, customer reviews and organic visibility.",
        "The section below links every local service page in Fes, helping you explore each expertise and its local context.",
      ],
      challenges: [
        "Digitize word-of-mouth without losing authenticity",
        "Compete with better-ranked online competitors",
        "Connect marketing and sales",
        "Strengthen brand identity across every channel",
      ],
      approach: [
        "Brand and channel audit",
        "Prioritized roadmap",
        "Dedicated multidisciplinary team",
        "Regular reporting",
      ],
      faqs: [
        {
          question: "Which services do you offer in Fes?",
          answer:
            "We cover 53 areas across marketing, web, software, mobile, CRM, automation, AI, branding, photo, video and events.",
        },
        {
          question: "Do you work with crafts and local retail?",
          answer:
            "Yes. We help local players modernize acquisition while preserving brand authenticity.",
        },
        {
          question: "Can you work at our Fes office?",
          answer:
            "Yes. Workshops, shoots and strategic meetings can be held on-site or remotely.",
        },
        {
          question: "How do we start?",
          answer:
            "Request a free audit for a prioritized action plan before any firm quote.",
        },
      ],
    },
  },
  ar: {
    rabat: {
      metaTitle: "وكالة رقمية في الرباط | Mohtaoua 360°",
      metaDescription:
        "وكالة رقمية بالرباط: تسويق وويب وبرمجيات وجوال وتصميم وأتمتة. 53 خدمة محلية وتدقيق مجاني.",
      h1: "وكالة رقمية في الرباط",
      intro:
        "ترافق Mohtaoua شركات الرباط والمنطقة بفريق 360° يربط التسويق والتكنولوجيا والإبداع والأتمتة.",
      overview: {
        what: "المركز المحلي الذي يجمع كل خبرات Mohtaoua الرقمية المتاحة لشركات الرباط.",
        who: "المديرون والفرق الرقمية في المؤسسات والمكاتب الاستشارية والمدارس وشركات الخدمات.",
        benefits: [
          "شريك للتسويق والتكنولوجيا",
          "خبرات مناسبة لدورات البيع B2B والمؤسساتية",
          "إدارة شفافة",
        ],
        topics: [
          "الاستقطاب الرقمي",
          "الويب والتجارة",
          "البرمجيات وCRM",
          "الهوية والصورة والفيديو",
        ],
        takeaways: [
          "53 خدمة في الرباط",
          "فريق متعدد التخصصات",
          "تدقيق مجاني مرتب",
        ],
      },
      paragraphs: [
        "تضم الرباط والمنطقة مؤسسات ومكاتب استشارية وشركات خدمات تبيع لعملاء صارمين. والنبرة والمصداقية ووضوح الرسالة حاسمة للتحويل.",
        "دورنا كوكالة رقمية في الرباط هو بناء نظام متكامل: SEO والإعلانات والمحتوى والويب والبرمجيات وCRM والأتمتة والتصميم والإنتاج.",
        "تُدار كل مهمة بمؤشرات مرتبطة بتكلفة العميل المؤهل والتحويل والإيراد المنسوب والظهور العضوي أو مكاسب الإنتاجية.",
        "يربط القسم أدناه كل صفحات الخدمات المحلية في الرباط لمساعدتك على استكشاف كل خبرة وسياقها المحلي.",
      ],
      challenges: [
        "إقناع صناع قرار صارمين في دورات بيع طويلة",
        "احترافية الصورة الرقمية دون فقدان الدقة التحريرية",
        "ربط الاستقطاب والتغذية والمتابعة التجارية",
        "أتمتة المتابعة دون فقدان العلاقة الإنسانية",
      ],
      approach: [
        "تدقيق العلامة والقنوات",
        "خطة أولويات",
        "فريق متعدد التخصصات",
        "تقارير منتظمة",
      ],
      faqs: [
        {
          question: "ما الخدمات التي تقدمونها في الرباط؟",
          answer:
            "نغطي 53 خبرة في التسويق والويب والبرمجيات والجوال وCRM والأتمتة والذكاء والهوية والصورة والفيديو والفعاليات.",
        },
        {
          question: "هل تعملون مع المؤسسات والمقاولات؟",
          answer: "نعم، يتكيف النطاق والفريق مع نضج كل مؤسسة وقيودها.",
        },
        {
          question: "هل يمكن العمل في مقرنا بالرباط؟",
          answer: "نعم، يمكن تنفيذ الورش والتصوير والاجتماعات في الموقع أو عن بعد.",
        },
        {
          question: "كيف نبدأ؟",
          answer: "اطلب تدقيقًا مجانيًا للحصول على خطة مرتبة قبل أي عرض سعر نهائي.",
        },
      ],
    },
    marrakech: {
      metaTitle: "وكالة رقمية في مراكش | Mohtaoua 360°",
      metaDescription:
        "وكالة رقمية بمراكش: تسويق وويب وبرمجيات وجوال وتصميم وأتمتة. 53 خدمة محلية وتدقيق مجاني.",
      h1: "وكالة رقمية في مراكش",
      intro:
        "ترافق Mohtaoua شركات مراكش بفريق 360° يربط التسويق والتكنولوجيا والإبداع والأتمتة.",
      overview: {
        what: "المركز المحلي الذي يجمع كل خبرات Mohtaoua الرقمية المتاحة لشركات مراكش.",
        who: "المديرون وفرق التسويق في الفنادق والترويج العقاري والسياحة والعلامات الفاخرة.",
        benefits: [
          "تنفيذ إبداعي يليق بسوق دولية",
          "حملات مضبوطة حسب الموسمية المحلية",
          "إدارة شفافة",
        ],
        topics: [
          "الاستقطاب الرقمي",
          "الويب والتجارة",
          "البرمجيات وCRM",
          "الهوية والصورة والفيديو",
        ],
        takeaways: [
          "53 خدمة في مراكش",
          "فريق متعدد التخصصات",
          "تدقيق مجاني مرتب",
        ],
      },
      paragraphs: [
        "تجذب مراكش المستثمرين والمطورين وأصحاب الفنادق وعلامات الرفاهية. والموسمية والمنافسة الدولية وأهمية البصري تفرض تنفيذًا لا تشوبه شائبة على كل القنوات.",
        "دورنا كوكالة رقمية في مراكش هو بناء نظام متكامل: SEO والإعلانات ومحتوى متميز والويب والبرمجيات وCRM والأتمتة والتصميم والإنتاج.",
        "تُدار كل مهمة بمؤشرات مرتبطة بالحجوزات وطلبات العروض وتكلفة العميل المؤهل والتحويل والظهور العضوي.",
        "يربط القسم أدناه كل صفحات الخدمات المحلية في مراكش لمساعدتك على استكشاف كل خبرة وسياقها المحلي.",
      ],
      challenges: [
        "تعظيم العائد في الموسم دون إهدار الميزانية",
        "التميّز في سوق بصرية وتنافسية",
        "ربط التسويق بالمبيعات",
        "توسيع المحتوى المتناسق",
      ],
      approach: [
        "تدقيق العلامة والقنوات",
        "تقويم إعلامي حسب الموسمية والفعاليات",
        "فريق متعدد التخصصات",
        "تقارير منتظمة",
      ],
      faqs: [
        {
          question: "ما الخدمات التي تقدمونها في مراكش؟",
          answer:
            "نغطي 53 خبرة في التسويق والويب والبرمجيات والجوال وCRM والأتمتة والذكاء والهوية والصورة والفيديو والفعاليات.",
        },
        {
          question: "هل تعملون مع الفندقة والعقار؟",
          answer: "نعم، نرافق الفنادق والرياض والمطورين باستراتيجيات مناسبة للموسمية.",
        },
        {
          question: "هل يمكن العمل في مقرنا بمراكش؟",
          answer: "نعم، يمكن تنفيذ الورش والتصوير والاجتماعات في الموقع أو عن بعد.",
        },
        {
          question: "كيف نبدأ؟",
          answer: "اطلب تدقيقًا مجانيًا للحصول على خطة مرتبة قبل أي عرض سعر نهائي.",
        },
      ],
    },
    tanger: {
      metaTitle: "وكالة رقمية في طنجة | Mohtaoua 360°",
      metaDescription:
        "وكالة رقمية بطنجة: تسويق وويب وبرمجيات وجوال وتصميم وأتمتة. 53 خدمة محلية وتدقيق مجاني.",
      h1: "وكالة رقمية في طنجة",
      intro:
        "ترافق Mohtaoua شركات طنجة بفريق 360° يربط التسويق والتكنولوجيا والإبداع والأتمتة.",
      overview: {
        what: "المركز المحلي الذي يجمع كل خبرات Mohtaoua الرقمية المتاحة لشركات طنجة.",
        who: "المديرون والفرق الرقمية في الصناعة والتصدير واللوجستيك وخدمات B2B.",
        benefits: [
          "تواصل موثوق للأسواق المحلية والدولية",
          "محتوى متعدد اللغات للتصدير",
          "إدارة شفافة",
        ],
        topics: [
          "الاستقطاب الرقمي",
          "الويب والتجارة",
          "البرمجيات وCRM",
          "الهوية والصورة والفيديو",
        ],
        takeaways: [
          "53 خدمة في طنجة",
          "فريق متعدد التخصصات",
          "تدقيق مجاني مرتب",
        ],
      },
      paragraphs: [
        "طنجة، بوابة إفريقيا ومركز لوجستيكي رئيسي، تجمع صناعيين ومصدرين ومقدمي خدمات B2B. ويقارن المشترون العروض عبر الإنترنت قبل أي اتصال تجاري.",
        "دورنا كوكالة رقمية في طنجة هو بناء نظام متكامل: SEO والإعلانات ومحتوى متعدد اللغات والويب والبرمجيات وCRM والأتمتة والتصميم والإنتاج.",
        "تُدار كل مهمة بمؤشرات مرتبطة بالعملاء المؤهلين والمناقصات والتحويل والظهور العضوي والمصداقية لدى صناع القرار.",
        "يربط القسم أدناه كل صفحات الخدمات المحلية في طنجة لمساعدتك على استكشاف كل خبرة وسياقها المحلي.",
      ],
      challenges: [
        "تعزيز المصداقية B2B لدى صناع القرار",
        "توليد عملاء منظمين للتصدير والمناقصات",
        "تحديث الأدوات بأمان",
        "إنتاج محتوى متعدد اللغات متناسق",
      ],
      approach: [
        "تدقيق العلامة والقنوات",
        "خطة أولويات",
        "فريق متعدد التخصصات",
        "تقارير منتظمة",
      ],
      faqs: [
        {
          question: "ما الخدمات التي تقدمونها في طنجة؟",
          answer:
            "نغطي 53 خبرة في التسويق والويب والبرمجيات والجوال وCRM والأتمتة والذكاء والهوية والصورة والفيديو والفعاليات.",
        },
        {
          question: "هل تعملون مع شركات التصدير؟",
          answer: "نعم، نكيّف المحتوى والحملات للأسواق المستهدفة بالفرنسية والعربية والإنجليزية.",
        },
        {
          question: "هل يمكن العمل في مقرنا بطنجة؟",
          answer: "نعم، يمكن تنفيذ الورش والتصوير والاجتماعات في الموقع أو عن بعد.",
        },
        {
          question: "كيف نبدأ؟",
          answer: "اطلب تدقيقًا مجانيًا للحصول على خطة مرتبة قبل أي عرض سعر نهائي.",
        },
      ],
    },
    agadir: {
      metaTitle: "وكالة رقمية في أكادير | Mohtaoua 360°",
      metaDescription:
        "وكالة رقمية بأكادير: تسويق وويب وبرمجيات وجوال وتصميم وأتمتة. 53 خدمة محلية وتدقيق مجاني.",
      h1: "وكالة رقمية في أكادير",
      intro:
        "ترافق Mohtaoua شركات أكادير بفريق 360° يربط التسويق والتكنولوجيا والإبداع والأتمتة.",
      overview: {
        what: "المركز المحلي الذي يجمع كل خبرات Mohtaoua الرقمية المتاحة لشركات أكادير.",
        who: "المديرون وفرق التسويق في السياحة والأغذية والصيد والتجارة المحلية.",
        benefits: [
          "مقاربة بالبيانات مناسبة للموسمية المزدوجة",
          "إبداعات محسّنة للجوال وWhatsApp",
          "إدارة شفافة",
        ],
        topics: [
          "الاستقطاب الرقمي",
          "الويب والتجارة",
          "البرمجيات وCRM",
          "الهوية والصورة والفيديو",
        ],
        takeaways: [
          "53 خدمة في أكادير",
          "فريق متعدد التخصصات",
          "تدقيق مجاني مرتب",
        ],
      },
      paragraphs: [
        "تجمع أكادير بين السياحة الساحلية والأغذية والأنشطة البحرية. ويجب على الشركات المحلية الوصول إلى جمهور مختلط: السكان والسياح والموزعين الوطنيين.",
        "دورنا كوكالة رقمية في أكادير هو بناء نظام متكامل: SEO والإعلانات والمحتوى والويب والبرمجيات وCRM والأتمتة والتصميم والإنتاج.",
        "تُدار كل مهمة بمؤشرات مرتبطة بالحجوزات والطلبات الواردة وتكلفة العميل والتحويل والظهور في الفترات الأكثر ربحية.",
        "يربط القسم أدناه كل صفحات الخدمات المحلية في أكادير لمساعدتك على استكشاف كل خبرة وسياقها المحلي.",
      ],
      challenges: [
        "إدارة ميزانية التسويق رغم موسمية السياحة",
        "التحويل السريع عبر الجوال وWhatsApp",
        "ربط التسويق بالمبيعات",
        "إنتاج محتوى متناسق لجماهير متنوعة",
      ],
      approach: [
        "تدقيق العلامة والقنوات",
        "تقويم إعلامي مرن للسياحة والأغذية",
        "فريق متعدد التخصصات",
        "تقارير منتظمة",
      ],
      faqs: [
        {
          question: "ما الخدمات التي تقدمونها في أكادير؟",
          answer:
            "نغطي 53 خبرة في التسويق والويب والبرمجيات والجوال وCRM والأتمتة والذكاء والهوية والصورة والفيديو والفعاليات.",
        },
        {
          question: "هل تعملون مع السياحة والأغذية؟",
          answer: "نعم، نكيّف الاستراتيجيات لذروات الموسم وخصوصيات كل قطاع.",
        },
        {
          question: "هل يمكن العمل في مقرنا بأكادير؟",
          answer: "نعم، يمكن تنفيذ الورش والتصوير والاجتماعات في الموقع أو عن بعد.",
        },
        {
          question: "كيف نبدأ؟",
          answer: "اطلب تدقيقًا مجانيًا للحصول على خطة مرتبة قبل أي عرض سعر نهائي.",
        },
      ],
    },
    fes: {
      metaTitle: "وكالة رقمية في فاس | Mohtaoua 360°",
      metaDescription:
        "وكالة رقمية بفاس: تسويق وويب وبرمجيات وجوال وتصميم وأتمتة. 53 خدمة محلية وتدقيق مجاني.",
      h1: "وكالة رقمية في فاس",
      intro:
        "ترافق Mohtaoua شركات فاس بفريق 360° يربط التسويق والتكنولوجيا والإبداع والأتمتة.",
      overview: {
        what: "المركز المحلي الذي يجمع كل خبرات Mohtaoua الرقمية المتاحة لشركات فاس.",
        who: "المديرون وفرق التسويق في الحرف والتجارة والتعليم والسياحة الثقافية.",
        benefits: [
          "سرد علامة أصيل وحديث",
          "حضور رقمي مصقول للجمهور المحلي والوطني",
          "إدارة شفافة",
        ],
        topics: [
          "الاستقطاب الرقمي",
          "الويب والتجارة",
          "البرمجيات وCRM",
          "الهوية والصورة والفيديو",
        ],
        takeaways: [
          "53 خدمة في فاس",
          "فريق متعدد التخصصات",
          "تدقيق مجاني مرتب",
        ],
      },
      paragraphs: [
        "تمتلك فاس نسيجًا اقتصاديًا غنيًا يمزج الحرف والتجارة التقليدية والتعليم والسياحة الثقافية. والتميّز يمر بسرد علامة أصيل وحضور رقمي مصقول.",
        "دورنا كوكالة رقمية في فاس هو بناء نظام متكامل: SEO والإعلانات والمحتوى والويب والبرمجيات وCRM والأتمتة والتصميم والإنتاج.",
        "تُدار كل مهمة بمؤشرات مرتبطة بالوعي المحلي والعملاء المؤهلين والتحويل والآراء والظهور العضوي.",
        "يربط القسم أدناه كل صفحات الخدمات المحلية في فاس لمساعدتك على استكشاف كل خبرة وسياقها المحلي.",
      ],
      challenges: [
        "رقمنة التسويق الشفهي دون فقدان الأصالة",
        "المنافسة مع منافسين أفضل مرجعية عبر الإنترنت",
        "ربط التسويق بالمبيعات",
        "تعزيز هوية العلامة على كل القنوات",
      ],
      approach: [
        "تدقيق العلامة والقنوات",
        "خطة أولويات",
        "فريق متعدد التخصصات",
        "تقارير منتظمة",
      ],
      faqs: [
        {
          question: "ما الخدمات التي تقدمونها في فاس؟",
          answer:
            "نغطي 53 خبرة في التسويق والويب والبرمجيات والجوال وCRM والأتمتة والذكاء والهوية والصورة والفيديو والفعاليات.",
        },
        {
          question: "هل تعملون مع الحرف والتجارة المحلية؟",
          answer: "نعم، نساعد الفاعلين المحليين على تحديث الاستقطاب مع الحفاظ على أصالة العلامة.",
        },
        {
          question: "هل يمكن العمل في مقرنا بفاس؟",
          answer: "نعم، يمكن تنفيذ الورش والتصوير والاجتماعات في الموقع أو عن بعد.",
        },
        {
          question: "كيف نبدأ؟",
          answer: "اطلب تدقيقًا مجانيًا للحصول على خطة مرتبة قبل أي عرض سعر نهائي.",
        },
      ],
    },
  },
};

for (const locale of ["fr", "en", "ar"]) {
  const path = join(root, `messages/${locale}/agencyHubPages.json`);
  const json = JSON.parse(readFileSync(path, "utf8"));
  Object.assign(json.items, cityItems[locale]);
  writeFileSync(path, `${JSON.stringify(json, null, 2)}\n`);
  console.log(`Lot 2 i18n ajouté pour ${locale}`);
}
