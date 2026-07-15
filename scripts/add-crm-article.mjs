#!/usr/bin/env node
/** Article du 16 juillet : CRM entreprise Maroc (FR/EN/AR) */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SLUG = "crm-entreprise-maroc-guide";

const fr = {
  title: "CRM pour entreprises au Maroc : comment choisir, déployer et rentabiliser en 2026",
  excerpt:
    "HubSpot, Pipedrive, Excel ou CRM sur mesure : méthode complète pour structurer vos leads, automatiser le suivi et augmenter votre taux de conversion au Maroc.",
  category: "automation",
  cover: "/logo-full.svg",
  overview: {
    what: "Guide expert pour choisir, configurer et faire adopter un CRM adapté aux PME et entreprises marocaines : outils, pipeline, intégrations Meta/Google/WhatsApp et indicateurs de performance.",
    who: "Dirigeants, responsables commerciaux et équipes marketing qui perdent des leads faute de suivi structuré après leurs campagnes d'acquisition.",
    benefits: [
      "Grille de choix CRM adaptée au contexte marocain",
      "Pipeline commercial type prêt à configurer",
      "Intégrations acquisition (Meta, Google, WhatsApp) expliquées pas à pas"
    ],
    topics: [
      "CRM Maroc",
      "HubSpot",
      "Pipedrive",
      "Marketing automation",
      "Qualification leads",
      "WhatsApp Business"
    ],
    takeaways: [
      "Sans CRM, 60 à 80 % des leads générés par vos campagnes ne sont jamais rappelés dans les 24 heures",
      "Un pipeline en 5 à 7 étapes suffit pour la majorité des PME marocaines",
      "L'intégration WhatsApp + CRM est le levier n°1 de conversion au Maroc, avant même l'email"
    ]
  },
  sections: [
    {
      id: "intro",
      heading: "Pourquoi un CRM est devenu indispensable au Maroc",
      paragraphs: [
        "Vous investissez en Meta Ads, Google Ads ou TikTok. Les leads arrivent : formulaires, appels, messages WhatsApp. Et puis ? Si votre équipe commerciale note les contacts dans un fichier Excel partagé, sur un carnet ou dans des conversations WhatsApp éparpillées, vous perdez mécaniquement une partie de votre investissement publicitaire. Ce n'est pas un problème de budget média : c'est un problème de suivi.",
        "Au Maroc, où WhatsApp est le canal de communication dominant entre entreprises et clients, un CRM bien configuré n'est plus un luxe réservé aux grands comptes. C'est l'infrastructure qui transforme vos dépenses marketing en chiffre d'affaires mesurable. Ce guide vous explique comment choisir l'outil adapté à votre taille, votre secteur et votre budget — et surtout comment le faire adopter par vos équipes."
      ]
    },
    {
      id: "probleme",
      heading: "Le problème : où partent vos leads",
      paragraphs: [
        "Nous auditons régulièrement des entreprises marocaines qui dépensent 15 000 à 50 000 DH par mois en publicité digitale. Le constat est récurrent : les leads arrivent, mais personne ne sait exactement combien ont été contactés, dans quel délai, par qui, et avec quel résultat. Les commerciaux jonglent entre trois numéros WhatsApp, un Google Sheet et des notes sur papier.",
        "Les conséquences sont chiffrables. Un lead non rappelé dans les 5 premières minutes a 80 % de chances de ne jamais convertir. Un lead rappelé après 24 heures convertit 7 fois moins qu'un lead contacté dans l'heure. Sans CRM, vous ne voyez pas ces fuites — vous constatez seulement que le « marketing ne marche pas », alors que le problème est en aval de l'acquisition."
      ],
      bullets: [
        "Leads dispersés entre WhatsApp, email, téléphone et Excel",
        "Aucune visibilité sur le délai de premier contact",
        "Impossible de mesurer le taux de conversion lead → client",
        "Perte de l'historique quand un commercial quitte l'entreprise",
        "Campagnes optimisées sur les leads, pas sur les ventes réelles"
      ]
    },
    {
      id: "definition",
      heading: "Qu'est-ce qu'un CRM et que doit-il faire pour vous",
      paragraphs: [
        "Un CRM (Customer Relationship Management) centralise toutes vos interactions prospects et clients : coordonnées, source d'acquisition, historique des échanges, statut dans le pipeline commercial, tâches de relance et documents associés. Ce n'est pas un simple carnet d'adresses numérique : c'est le système nerveux de votre machine commerciale.",
        "Pour une entreprise marocaine en 2026, un CRM efficace doit au minimum : capturer automatiquement les leads depuis vos formulaires web, Meta Lead Ads, Google Ads et WhatsApp ; assigner chaque lead à un commercial avec notification instantanée ; imposer un pipeline de qualification clair ; tracer chaque action (appel, message, email, rendez-vous) ; et produire des tableaux de bord exploitables pour le dirigeant et l'équipe marketing."
      ]
    },
    {
      id: "choix",
      heading: "HubSpot, Pipedrive, Zoho ou CRM sur mesure : comment choisir",
      paragraphs: [
        "Le marché CRM est vaste. Pour une PME marocaine, quatre familles d'outils dominent. HubSpot offre une version gratuite solide et une montée en puissance marketing/sales complète — idéal si vous voulez unifier acquisition et suivi commercial, avec un budget qui peut monter à 500-2 000 USD/mois en version payante. Pipedrive est plus simple, orienté pipeline visuel, excellent pour les équipes commerciales de 2 à 15 personnes, à partir de 15 USD/utilisateur/mois.",
        "Zoho CRM est une alternative économique populaire au Maroc (à partir de 14 USD/utilisateur), avec un bon rapport qualité-prix mais une interface moins intuitive. Enfin, un CRM sur mesure — comme la solution propriétaire Mohtaoua — devient pertinent quand vos processus sont spécifiques (secteur réglementé, multi-agences, intégration ERP) ou quand vous voulez une intégration native WhatsApp + Meta + facturation sans empiler cinq abonnements SaaS étrangers."
      ],
      bullets: [
        "HubSpot : complet, gratuit au départ, coûteux à l'échelle, excellent pour marketing + sales",
        "Pipedrive : simple, pipeline visuel, idéal équipes commerciales PME",
        "Zoho CRM : économique, fonctionnel, courbe d'apprentissage plus longue",
        "CRM sur mesure : processus spécifiques, intégrations locales (WhatsApp API, CMI, ERP)",
        "Excel/Google Sheets : acceptable sous 20 leads/mois, ingérable au-delà"
      ]
    },
    {
      id: "pipeline",
      heading: "Construire un pipeline commercial qui fonctionne",
      paragraphs: [
        "La majorité des CRM échouent non pas à cause de l'outil, mais à cause d'un pipeline mal conçu. Un pipeline trop complexe (12 étapes) ne sera jamais mis à jour. Un pipeline trop simple (3 étapes) ne donne aucune visibilité sur les blocages. Pour la plupart des entreprises marocaines, 5 à 7 étapes suffisent.",
        "Voici la structure que nous déployons le plus souvent : Nouveau lead → Contacté → Qualifié → Proposition envoyée → Négociation → Gagné / Perdu. Chaque transition doit avoir une règle claire : « Contacté » signifie un premier échange réel (appel ou WhatsApp), pas une tentative. « Qualifié » signifie que le budget, le besoin et le délai sont confirmés. Ces définitions évitent le gonflement artificiel du pipeline."
      ],
      bullets: [
        "Nouveau lead : entrée automatique depuis formulaire, pub ou WhatsApp",
        "Contacté : premier échange réel dans les 60 minutes (objectif)",
        "Qualifié : besoin, budget et délai confirmés",
        "Proposition : devis ou offre envoyée",
        "Négociation : échanges actifs sur les conditions",
        "Gagné / Perdu : clôture obligatoire avec motif si perdu"
      ]
    },
    {
      id: "whatsapp",
      heading: "WhatsApp + CRM : le duo indispensable au Maroc",
      paragraphs: [
        "Au Maroc, plus de 90 % de vos prospects préfèrent WhatsApp au email pour les premiers échanges. Un CRM déconnecté de WhatsApp est donc un CRM incomplet. L'intégration peut prendre trois formes : WhatsApp Business App (gratuit, manuel, acceptable pour 1-2 commerciaux), WhatsApp Business API via un partenaire comme Twilio ou 360dialog (automatisé, scalable, nécessite validation Meta), ou une solution intégrée comme Mohtaoua CRM qui centralise conversations, assignation et relances.",
        "L'objectif : chaque message WhatsApp entrant crée ou met à jour automatiquement une fiche contact dans le CRM, avec l'historique complet visible par toute l'équipe. Fini les « ce lead, c'est le mien, je l'ai sur mon téléphone ». Le commercial reçoit une notification, répond depuis le CRM ou son téléphone, et chaque interaction est tracée."
      ]
    },
    {
      id: "integrations",
      heading: "Connecter vos canaux d'acquisition au CRM",
      paragraphs: [
        "Un CRM isolé de vos campagnes publicitaires vous oblige à saisir manuellement chaque lead — source d'erreurs et de retards. Les intégrations prioritaires pour une entreprise marocaine en 2026 :"
      ],
      bullets: [
        "Meta Lead Ads → CRM : via Zapier, Make ou intégration native HubSpot/Pipedrive (lead en temps réel)",
        "Google Ads (formulaires) → CRM : webhook ou Zapier, avec UTM conservés pour l'attribution",
        "Formulaire site web → CRM : plugin natif ou webhook depuis votre landing page",
        "TikTok Lead Gen → CRM : via Make/Zapier, en forte croissance au Maroc",
        "WhatsApp entrant → CRM : API Business ou solution intégrée",
        "Retour conversion → Meta/Google : envoyer les événements « Lead qualifié » et « Vente » pour optimiser les algorithmes"
      ]
    },
    {
      id: "deploiement",
      heading: "Déployer un CRM en 30 jours : la méthode Mohtaoua",
      paragraphs: [
        "Un CRM se déploie en projet, pas en achat de licence. Voici le calendrier type que nous appliquons pour nos clients marocains, de la PME à la structure multi-sites."
      ],
      bullets: [
        "Semaine 1 — Audit & design : cartographie du parcours actuel, définition du pipeline, choix de l'outil, nettoyage de la base existante",
        "Semaine 2 — Configuration : création des champs, étapes, automatisations (assignation, relances J+1/J+3), intégrations Meta/Google/WhatsApp",
        "Semaine 3 — Migration & formation : import des contacts existants, formation équipe commerciale (2h), scripts d'appel et messages WhatsApp types",
        "Semaine 4 — Lancement & suivi : mise en production, daily check des leads non traités, ajustements pipeline, premier reporting dirigeant"
      ]
    },
    {
      id: "kpis",
      heading: "Les KPIs CRM à suivre chaque semaine",
      paragraphs: [
        "Un CRM sans indicateurs est une base de données glorifiée. Ces six métriques suffisent pour piloter votre performance commerciale et alimenter vos décisions marketing."
      ],
      bullets: [
        "Délai moyen de premier contact (objectif : < 1 heure en B2C, < 4 heures en B2B)",
        "Taux de contact (leads joint au moins une fois / total leads)",
        "Taux de qualification (leads qualifiés / leads contactés)",
        "Taux de conversion (ventes / leads qualifiés)",
        "Durée moyenne du cycle de vente (jours entre premier contact et signature)",
        "CA par source d'acquisition (Meta vs Google vs organique vs recommandation)"
      ]
    },
    {
      id: "erreurs",
      heading: "Les 7 erreurs CRM les plus fréquentes au Maroc",
      paragraphs: [
        "Ces erreurs expliquent pourquoi tant d'entreprises abandonnent leur CRM après trois mois. Les éviter multiplie vos chances de succès."
      ],
      bullets: [
        "Choisir un outil trop complexe pour l'équipe (HubSpot Enterprise pour 3 commerciaux)",
        "Ne pas définir les étapes du pipeline avant la configuration",
        "Oublier l'intégration WhatsApp — le canal n°1 au Maroc",
        "Aucune règle d'assignation : les leads tombent dans une boîte commune et personne ne réagit",
        "Pas de relances automatiques : les leads tièdes refroidissent en 48 heures",
        "Former l'équipe une seule fois sans suivi ni contrôle hebdomadaire",
        "Optimiser les campagnes sur les leads CRM, pas sur les ventes réelles remontées"
      ]
    },
    {
      id: "conclusion",
      heading: "CRM : le multiplicateur de votre investissement marketing",
      paragraphs: [
        "Chaque dirham investi en Meta Ads, Google Ads ou TikTok ne vaut quelque chose que si le lead est capturé, suivi et converti. Un CRM structuré augmente mécaniquement votre taux de conversion de 20 à 40 % sans dépenser un dirham de plus en publicité — simplement en éliminant les fuites dans votre processus commercial.",
        "Chez Mohtaoua, nous accompagnons les entreprises marocaines de tous secteurs dans le choix, le déploiement et l'intégration CRM : HubSpot, Pipedrive, ou notre solution propriétaire connectée à WhatsApp, Meta et Google. Demandez un audit gratuit de votre processus commercial : nous identifions vos fuites et vous proposons un plan d'action chiffré."
      ]
    }
  ],
  faqs: [
    {
      question: "Quel CRM gratuit pour commencer au Maroc ?",
      answer: "HubSpot CRM gratuit est le meilleur point de départ pour une PME : contacts illimités, pipeline, intégrations de base et montée en puissance progressive. Pipedrive n'a pas de version gratuite mais offre un essai 14 jours. Évitez Excel dès que vous dépassez 30 leads par mois."
    },
    {
      question: "Combien coûte un CRM pour une PME marocaine ?",
      answer: "Comptez 0 DH (HubSpot gratuit) à 1 500 DH/mois pour 3-5 utilisateurs sur Pipedrive ou Zoho. Un CRM sur mesure avec intégrations WhatsApp + Meta démarre autour de 3 000-8 000 DH/mois tout inclus (licence, intégration, maintenance). Le ROI se mesure en leads convertis, pas en coût logiciel."
    },
    {
      question: "Faut-il un CRM si on a seulement WhatsApp ?",
      answer: "Justement, WhatsApp sans CRM est le problème le plus courant au Maroc. Dès que deux personnes gèrent des leads sur WhatsApp, vous avez besoin d'un système centralisé : assignation, historique, relances et reporting. Sinon vous perdez leads et visibilité."
    },
    {
      question: "Combien de temps pour déployer un CRM ?",
      answer: "Un déploiement standard PME prend 3 à 4 semaines : audit, configuration, intégrations, migration et formation. Un déploiement express (outil simple, équipe réduite) peut se faire en 10 jours. Prévoyez 2 à 3 mois pour une adoption complète par l'équipe."
    },
    {
      question: "Comment connecter Meta Ads à mon CRM ?",
      answer: "Trois options : intégration native HubSpot/Pipedrive (la plus simple), connecteur Zapier/Make (flexible, ~20 USD/mois), ou webhook custom depuis Meta Lead Ads vers votre CRM. L'essentiel : le lead doit arriver dans le CRM en moins de 60 secondes avec la source campagne conservée."
    },
    {
      question: "CRM sur mesure ou SaaS : que choisir ?",
      answer: "SaaS (HubSpot, Pipedrive) si vos processus sont standards et votre équipe < 20 personnes. CRM sur mesure si vous avez des workflows spécifiques (multi-agences, secteur réglementé, intégration ERP/CMI), ou si vous voulez une stack unifiée WhatsApp + acquisition + facturation sans multiplier les abonnements."
    }
  ]
};

const en = {
  title: "CRM for businesses in Morocco: how to choose, deploy and make it pay off in 2026",
  excerpt:
    "HubSpot, Pipedrive, Excel or custom CRM: a complete method to structure your leads, automate follow-up and increase conversion rates in Morocco.",
  category: "automation",
  cover: "/logo-full.svg",
  overview: {
    what: "Expert guide to choosing, configuring and driving adoption of a CRM suited to Moroccan SMEs and businesses: tools, pipeline, Meta/Google/WhatsApp integrations and performance metrics.",
    who: "Business owners, sales managers and marketing teams losing leads due to unstructured follow-up after acquisition campaigns.",
    benefits: [
      "CRM selection framework adapted to the Moroccan context",
      "Ready-to-configure standard sales pipeline",
      "Acquisition integrations (Meta, Google, WhatsApp) explained step by step"
    ],
    topics: [
      "CRM Morocco",
      "HubSpot",
      "Pipedrive",
      "Marketing automation",
      "Lead qualification",
      "WhatsApp Business"
    ],
    takeaways: [
      "Without a CRM, 60-80% of leads from your campaigns are never called back within 24 hours",
      "A 5-7 step pipeline is enough for most Moroccan SMEs",
      "WhatsApp + CRM integration is the #1 conversion lever in Morocco, even before email"
    ]
  },
  sections: [
    {
      id: "intro",
      heading: "Why a CRM has become essential in Morocco",
      paragraphs: [
        "You invest in Meta Ads, Google Ads or TikTok. Leads arrive: forms, calls, WhatsApp messages. And then? If your sales team logs contacts in a shared Excel file, a notebook or scattered WhatsApp conversations, you mechanically lose part of your advertising investment. It's not a media budget problem: it's a follow-up problem.",
        "In Morocco, where WhatsApp is the dominant communication channel between businesses and customers, a well-configured CRM is no longer a luxury reserved for large accounts. It's the infrastructure that turns your marketing spend into measurable revenue. This guide explains how to choose the right tool for your size, industry and budget — and how to get your teams to actually use it."
      ]
    },
    {
      id: "probleme",
      heading: "The problem: where your leads go",
      paragraphs: [
        "We regularly audit Moroccan businesses spending 15,000 to 50,000 MAD per month on digital advertising. The finding is consistent: leads arrive, but nobody knows exactly how many were contacted, in what timeframe, by whom, and with what result. Sales reps juggle three WhatsApp numbers, a Google Sheet and paper notes.",
        "The consequences are quantifiable. A lead not called back within the first 5 minutes has an 80% chance of never converting. A lead called after 24 hours converts 7 times less than one contacted within an hour. Without a CRM, you don't see these leaks — you only notice that \"marketing doesn't work\", when the problem is downstream of acquisition."
      ],
      bullets: [
        "Leads scattered across WhatsApp, email, phone and Excel",
        "No visibility on time to first contact",
        "Impossible to measure lead-to-customer conversion rate",
        "History lost when a salesperson leaves",
        "Campaigns optimized on leads, not actual sales"
      ]
    },
    {
      id: "definition",
      heading: "What is a CRM and what should it do for you",
      paragraphs: [
        "A CRM (Customer Relationship Management) centralizes all your prospect and customer interactions: contact details, acquisition source, exchange history, sales pipeline status, follow-up tasks and associated documents. It's not a simple digital address book: it's the nervous system of your sales machine.",
        "For a Moroccan business in 2026, an effective CRM must at minimum: automatically capture leads from your web forms, Meta Lead Ads, Google Ads and WhatsApp; assign each lead to a salesperson with instant notification; enforce a clear qualification pipeline; track every action (call, message, email, meeting); and produce actionable dashboards for management and marketing."
      ]
    },
    {
      id: "choix",
      heading: "HubSpot, Pipedrive, Zoho or custom CRM: how to choose",
      paragraphs: [
        "The CRM market is vast. For a Moroccan SME, four tool families dominate. HubSpot offers a solid free tier and complete marketing/sales scaling — ideal if you want to unify acquisition and sales follow-up, with budgets that can reach $500-2,000/month on paid plans. Pipedrive is simpler, pipeline-visual, excellent for sales teams of 2 to 15 people, from $15/user/month.",
        "Zoho CRM is an economical alternative popular in Morocco (from $14/user), with good value but a less intuitive interface. Finally, a custom CRM — like Mohtaoua's proprietary solution — becomes relevant when your processes are specific (regulated sector, multi-branch, ERP integration) or when you want native WhatsApp + Meta + billing integration without stacking five foreign SaaS subscriptions."
      ],
      bullets: [
        "HubSpot: comprehensive, free to start, expensive at scale, excellent for marketing + sales",
        "Pipedrive: simple, visual pipeline, ideal for SME sales teams",
        "Zoho CRM: economical, functional, steeper learning curve",
        "Custom CRM: specific processes, local integrations (WhatsApp API, payment gateways, ERP)",
        "Excel/Google Sheets: acceptable under 20 leads/month, unmanageable beyond"
      ]
    },
    {
      id: "pipeline",
      heading: "Building a sales pipeline that works",
      paragraphs: [
        "Most CRMs fail not because of the tool, but because of a poorly designed pipeline. A pipeline that's too complex (12 stages) will never be updated. One that's too simple (3 stages) gives no visibility on blockages. For most Moroccan businesses, 5 to 7 stages are enough.",
        "Here's the structure we deploy most often: New lead → Contacted → Qualified → Proposal sent → Negotiation → Won / Lost. Each transition must have a clear rule: \"Contacted\" means a real first exchange (call or WhatsApp), not an attempt. \"Qualified\" means budget, need and timeline are confirmed. These definitions prevent artificial pipeline inflation."
      ],
      bullets: [
        "New lead: automatic entry from form, ad or WhatsApp",
        "Contacted: real first exchange within 60 minutes (target)",
        "Qualified: need, budget and timeline confirmed",
        "Proposal: quote or offer sent",
        "Negotiation: active exchanges on terms",
        "Won / Lost: mandatory closure with reason if lost"
      ]
    },
    {
      id: "whatsapp",
      heading: "WhatsApp + CRM: the essential duo in Morocco",
      paragraphs: [
        "In Morocco, over 90% of your prospects prefer WhatsApp to email for first exchanges. A CRM disconnected from WhatsApp is therefore an incomplete CRM. Integration can take three forms: WhatsApp Business App (free, manual, acceptable for 1-2 salespeople), WhatsApp Business API via a partner like Twilio or 360dialog (automated, scalable, requires Meta validation), or an integrated solution like Mohtaoua CRM that centralizes conversations, assignment and follow-ups.",
        "The goal: every incoming WhatsApp message creates or updates a contact record in the CRM, with full history visible to the whole team. No more \"this lead is mine, it's on my phone\". The salesperson gets a notification, replies from the CRM or their phone, and every interaction is tracked."
      ]
    },
    {
      id: "integrations",
      heading: "Connecting your acquisition channels to the CRM",
      paragraphs: [
        "A CRM isolated from your ad campaigns forces manual lead entry — a source of errors and delays. Priority integrations for a Moroccan business in 2026:"
      ],
      bullets: [
        "Meta Lead Ads → CRM: via Zapier, Make or native HubSpot/Pipedrive integration (real-time lead)",
        "Google Ads (forms) → CRM: webhook or Zapier, with UTMs preserved for attribution",
        "Website form → CRM: native plugin or webhook from your landing page",
        "TikTok Lead Gen → CRM: via Make/Zapier, fast-growing in Morocco",
        "Incoming WhatsApp → CRM: Business API or integrated solution",
        "Conversion feedback → Meta/Google: send \"Qualified lead\" and \"Sale\" events to optimize algorithms"
      ]
    },
    {
      id: "deploiement",
      heading: "Deploying a CRM in 30 days: the Mohtaoua method",
      paragraphs: [
        "A CRM is deployed as a project, not a license purchase. Here's the typical timeline we apply for our Moroccan clients, from SME to multi-site structures."
      ],
      bullets: [
        "Week 1 — Audit & design: map current journey, define pipeline, choose tool, clean existing database",
        "Week 2 — Configuration: create fields, stages, automations (assignment, D+1/D+3 follow-ups), Meta/Google/WhatsApp integrations",
        "Week 3 — Migration & training: import existing contacts, sales team training (2h), call scripts and WhatsApp message templates",
        "Week 4 — Launch & monitoring: go-live, daily check on untreated leads, pipeline adjustments, first management report"
      ]
    },
    {
      id: "kpis",
      heading: "CRM KPIs to track every week",
      paragraphs: [
        "A CRM without metrics is a glorified database. These six metrics are enough to drive your sales performance and inform marketing decisions."
      ],
      bullets: [
        "Average time to first contact (target: < 1 hour B2C, < 4 hours B2B)",
        "Contact rate (leads reached at least once / total leads)",
        "Qualification rate (qualified leads / contacted leads)",
        "Conversion rate (sales / qualified leads)",
        "Average sales cycle length (days from first contact to signature)",
        "Revenue per acquisition source (Meta vs Google vs organic vs referral)"
      ]
    },
    {
      id: "erreurs",
      heading: "The 7 most common CRM mistakes in Morocco",
      paragraphs: [
        "These mistakes explain why so many businesses abandon their CRM after three months. Avoiding them multiplies your chances of success."
      ],
      bullets: [
        "Choosing a tool too complex for the team (HubSpot Enterprise for 3 salespeople)",
        "Not defining pipeline stages before configuration",
        "Forgetting WhatsApp integration — the #1 channel in Morocco",
        "No assignment rules: leads fall into a shared inbox and nobody reacts",
        "No automatic follow-ups: warm leads go cold within 48 hours",
        "Training the team once with no weekly follow-up or control",
        "Optimizing campaigns on CRM leads, not actual sales reported back"
      ]
    },
    {
      id: "conclusion",
      heading: "CRM: the multiplier of your marketing investment",
      paragraphs: [
        "Every dirham invested in Meta Ads, Google Ads or TikTok is only worth something if the lead is captured, followed up and converted. A structured CRM mechanically increases your conversion rate by 20-40% without spending one more dirham on advertising — simply by eliminating leaks in your sales process.",
        "At Mohtaoua, we support Moroccan businesses across all industries in CRM selection, deployment and integration: HubSpot, Pipedrive, or our proprietary solution connected to WhatsApp, Meta and Google. Request a free audit of your sales process: we'll identify your leaks and propose a quantified action plan."
      ]
    }
  ],
  faqs: [
    {
      question: "Which free CRM to start with in Morocco?",
      answer: "HubSpot free CRM is the best starting point for an SME: unlimited contacts, pipeline, basic integrations and gradual scaling. Pipedrive has no free version but offers a 14-day trial. Avoid Excel once you exceed 30 leads per month."
    },
    {
      question: "How much does a CRM cost for a Moroccan SME?",
      answer: "Expect 0 MAD (HubSpot free) to 1,500 MAD/month for 3-5 users on Pipedrive or Zoho. A custom CRM with WhatsApp + Meta integrations starts around 3,000-8,000 MAD/month all-inclusive (license, integration, maintenance). ROI is measured in converted leads, not software cost."
    },
    {
      question: "Do I need a CRM if I only use WhatsApp?",
      answer: "WhatsApp without CRM is the most common problem in Morocco. As soon as two people manage leads on WhatsApp, you need a centralized system: assignment, history, follow-ups and reporting. Otherwise you lose leads and visibility."
    },
    {
      question: "How long to deploy a CRM?",
      answer: "A standard SME deployment takes 3 to 4 weeks: audit, configuration, integrations, migration and training. An express deployment (simple tool, small team) can be done in 10 days. Allow 2-3 months for full team adoption."
    },
    {
      question: "How do I connect Meta Ads to my CRM?",
      answer: "Three options: native HubSpot/Pipedrive integration (simplest), Zapier/Make connector (flexible, ~$20/month), or custom webhook from Meta Lead Ads to your CRM. The key: the lead must arrive in the CRM within 60 seconds with the campaign source preserved."
    },
    {
      question: "Custom CRM or SaaS: which to choose?",
      answer: "SaaS (HubSpot, Pipedrive) if your processes are standard and your team < 20 people. Custom CRM if you have specific workflows (multi-branch, regulated sector, ERP/payment integration), or if you want a unified WhatsApp + acquisition + billing stack without multiplying subscriptions."
    }
  ]
};

const ar = {
  title: "نظام CRM للشركات في المغرب: كيف تختار وتطبق وتحقق العائد في 2026",
  excerpt:
    "HubSpot وPipedrive وExcel أو CRM مخصص: منهجية كاملة لهيكلة العملاء المحتملين وأتمتة المتابعة ورفع معدل التحويل في المغرب.",
  category: "automation",
  cover: "/logo-full.svg",
  overview: {
    what: "دليل خبير لاختيار وتكوين وإقرار نظام CRM مناسب للمقاولات الصغرى والمتوسطة والشركات المغربية: الأدوات، مسار المبيعات، تكاملات Meta/Google/WhatsApp ومؤشرات الأداء.",
    who: "أصحاب الأعمال ومسؤولو المبيعات وفرق التسويق الذين يفقدون العملاء المحتملين بسبب غياب متابعة منظمة بعد حملات الاستقطاب.",
    benefits: [
      "شبكة اختيار CRM مكيفة مع السياق المغربي",
      "مسار مبيعات نموذجي جاهز للتكوين",
      "شرح خطوة بخطوة لتكاملات الاستقطاب (Meta وGoogle وWhatsApp)"
    ],
    topics: [
      "CRM المغرب",
      "HubSpot",
      "Pipedrive",
      "أتمتة التسويق",
      "تأهيل العملاء المحتملين",
      "WhatsApp Business"
    ],
    takeaways: [
      "بدون CRM، لا يُعاد الاتصال بـ60 إلى 80% من العملاء المحتملين خلال 24 ساعة",
      "مسار من 5 إلى 7 مراحل يكفي لمعظم المقاولات الصغرى والمتوسطة المغربية",
      "تكامل WhatsApp + CRM هو الرافعة الأولى للتحويل في المغرب، حتى قبل البريد الإلكتروني"
    ]
  },
  sections: [
    {
      id: "intro",
      heading: "لماذا أصبح CRM ضروريًا في المغرب",
      paragraphs: [
        "تستثمر في إعلانات Meta وGoogle وTikTok. يصل العملاء المحتملون: نماذج، مكالمات، رسائل WhatsApp. ثم ماذا؟ إذا كان فريق المبيعات يسجل جهات الاتصال في ملف Excel مشترك أو دفتر أو محادثات WhatsApp مبعثرة، فأنت تخسر جزءًا من استثمارك الإعلاني تلقائيًا. ليست مشكلة ميزانية إعلامية: إنها مشكلة متابعة.",
        "في المغرب، حيث WhatsApp هو القناة السائدة للتواصل بين الشركات والعملاء، لم يعد CRM المُكوَّن جيدًا رفاهية للحسابات الكبرى. إنه البنية التحتية التي تحول إنفاقك التسويقي إلى إيرادات قابلة للقياس. يشرح هذا الدليل كيف تختار الأداة المناسبة لحجمك وقطاعك وميزانيتك — وكيف تجعل فريقك يستخدمها فعليًا."
      ]
    },
    {
      id: "probleme",
      heading: "المشكلة: أين يضيع عملاؤك المحتملون",
      paragraphs: [
        "نراجع بانتظام شركات مغربية تنفق 15,000 إلى 50,000 درهم شهريًا على الإعلان الرقمي. والملاحظة متكررة: يصل العملاء المحتملون، لكن لا أحد يعرف بالضبط كم منهم تم الاتصال بهم، وفي أي أجل، ومن قبل من، وبأي نتيجة. يتنقل مندوبو المبيعات بين ثلاثة أرقام WhatsApp وGoogle Sheet وملاحظات ورقية.",
        "والعواقب قابلة للقياس. عميل محتمل لا يُعاد الاتصال به في أول 5 دقائق لديه 80% فرصة ألا يتحول أبدًا. ومن يُتصل به بعد 24 ساعة يتحول 7 مرات أقل ممن يُتصل به خلال ساعة. بدون CRM لا ترى هذه التسريبات — ترى فقط أن «التسويق لا يعمل»، بينما المشكلة بعد الاستقطاب."
      ],
      bullets: [
        "عملاء محتملون موزعون بين WhatsApp والبريد والهاتف وExcel",
        "لا رؤية على مدة أول اتصال",
        "استحالة قياس معدل التحويل من عميل محتمل إلى زبون",
        "فقدان السجل عند مغادرة مندوب المبيعات",
        "حملات محسّنة على العملاء المحتملين لا على المبيعات الفعلية"
      ]
    },
    {
      id: "definition",
      heading: "ما هو CRM وماذا يجب أن يفعل من أجلك",
      paragraphs: [
        "نظام CRM (إدارة علاقات العملاء) يمركز كل تفاعلاتك مع العملاء المحتملين والزبناء: بيانات الاتصال، مصدر الاستقطاب، سجل التبادلات، وضعية في مسار المبيعات، مهام المتابعة والوثائق المرتبطة. ليس دفتر عناوين رقميًا بسيطًا: إنه الجهاز العصبي لآلة المبيعات.",
        "لشركة مغربية في 2026، يجب أن يقوم CRM فعال على الأقل بـ: التقاط العملاء المحتملين تلقائيًا من نماذج موقعك وMeta Lead Ads وGoogle Ads وWhatsApp؛ تعيين كل عميل محتمل لمندوب مع إشعار فوري؛ فرض مسار تأهيل واضح؛ تتبع كل إجراء (مكالمة، رسالة، بريد، اجتماع)؛ وإنتاج لوحات معلومات قابلة للاستخدام للإدارة والتسويق."
      ]
    },
    {
      id: "choix",
      heading: "HubSpot أم Pipedrive أم Zoho أم CRM مخصص: كيف تختار",
      paragraphs: [
        "سوق CRM واسع. للمقاولة الصغرى والمتوسطة المغربية، أربع عائلات أدوات تهيمن. يقدم HubSpot نسخة مجانية قوية وتوسعًا تسويقيًا/تجاريًا كاملاً — مثالي لتوحيد الاستقطاب والمتابعة التجارية، بميزانية قد تصل إلى 500-2,000 دولار شهريًا في النسخ المدفوعة. Pipedrive أبسط، مرئي المسار، ممتاز لفرق مبيعات من 2 إلى 15 شخصًا، ابتداءً من 15 دولارًا/مستخدم/شهر.",
        "Zoho CRM بديل اقتصادي شائع في المغرب (من 14 دولارًا/مستخدم)، بقيمة جيدة لكن واجهة أقل بديهية. وأخيرًا، CRM مخصص — مثل حل Mohtaoua الخاص — يصبح مناسبًا عندما تكون عملياتك خاصة (قطاع منظم، وكالات متعددة، تكامل ERP) أو تريد تكاملًا أصليًا لـWhatsApp + Meta + الفوترة دون تكديس خمس اشتراكات SaaS أجنبية."
      ],
      bullets: [
        "HubSpot: شامل، مجاني للبداية، مكلف عند التوسع، ممتاز للتسويق + المبيعات",
        "Pipedrive: بسيط، مسار مرئي، مثالي لفرق مبيعات المقاولات الصغرى والمتوسطة",
        "Zoho CRM: اقتصادي، وظيفي، منحنى تعلم أطول",
        "CRM مخصص: عمليات خاصة، تكاملات محلية (WhatsApp API، بوابات الدفع، ERP)",
        "Excel/Google Sheets: مقبول تحت 20 عميلًا/شهر، لا يُدار بعد ذلك"
      ]
    },
    {
      id: "pipeline",
      heading: "بناء مسار مبيعات يعمل فعلًا",
      paragraphs: [
        "يفشل معظم أنظمة CRM ليس بسبب الأداة، بل بسبب مسار سيئ التصميم. مسار معقد جدًا (12 مرحلة) لن يُحدَّث أبدًا. وبسيط جدًا (3 مراحل) لا يعطي رؤية على الاختناقات. لمعظم الشركات المغربية، 5 إلى 7 مراحل تكفي.",
        "إليك الهيكل الذي ننشره غالبًا: عميل محتمل جديد → تم الاتصال → مؤهل → عرض مُرسل → تفاوض → فوز / خسارة. لكل انتقال قاعدة واضحة: «تم الاتصال» يعني تبادلًا حقيقيًا أولًا (مكالمة أو WhatsApp)، لا محاولة. «مؤهل» يعني تأكيد الميزانية والحاجة والأجل. هذه التعريفات تمنع تضخيم المسار اصطناعيًا."
      ],
      bullets: [
        "عميل محتمل جديد: دخول تلقائي من نموذج أو إعلان أو WhatsApp",
        "تم الاتصال: تبادل حقيقي أول خلال 60 دقيقة (هدف)",
        "مؤهل: حاجة وميزانية وأجل مؤكدة",
        "عرض: عرض سعر أو عرض مُرسل",
        "تفاوض: تبادلات نشطة على الشروط",
        "فوز / خسارة: إغلاق إلزامي مع سبب إن خسر"
      ]
    },
    {
      id: "whatsapp",
      heading: "WhatsApp + CRM: الثنائي الضروري في المغرب",
      paragraphs: [
        "في المغرب، أكثر من 90% من عملائك المحتملين يفضلون WhatsApp على البريد للتبادلات الأولى. CRM منفصل عن WhatsApp هو إذن CRM ناقص. التكامل قد يأخذ ثلاث صيغ: WhatsApp Business App (مجاني، يدوي، مقبول لـ1-2 مندوب)، WhatsApp Business API عبر شريك مثل Twilio أو 360dialog (آلي، قابل للتوسع، يتطلب موافقة Meta)، أو حل متكامل مثل Mohtaoua CRM يمركز المحادثات والتعيين والمتابعات.",
        "الهدف: كل رسالة WhatsApp واردة تنشئ أو تحدّث سجل اتصال في CRM، مع السجل الكامل مرئيًا للفريق. انتهى «هذا العميل لي، على هاتفي». يتلقى المندوب إشعارًا، يرد من CRM أو هاتفه، وكل تفاعل مُتتبَّع."
      ]
    },
    {
      id: "integrations",
      heading: "ربط قنوات الاستقطاب بـCRM",
      paragraphs: [
        "CRM معزول عن حملاتك الإعلانية يُجبرك على إدخال كل عميل محتمل يدويًا — مصدر أخطاء وتأخير. التكاملات الأولوية لشركة مغربية في 2026:"
      ],
      bullets: [
        "Meta Lead Ads → CRM: عبر Zapier أو Make أو تكامل HubSpot/Pipedrive الأصلي (عميل فوري)",
        "Google Ads (نماذج) → CRM: webhook أو Zapier مع الاحتفاظ بـUTM للإسناد",
        "نموذج الموقع → CRM: إضافة أصلية أو webhook من صفحة الهبوط",
        "TikTok Lead Gen → CRM: عبر Make/Zapier، نمو سريع في المغرب",
        "WhatsApp وارد → CRM: Business API أو حل متكامل",
        "إرجاع التحويل → Meta/Google: إرسال أحداث «عميل مؤهل» و«بيع» لتحسين الخوارزميات"
      ]
    },
    {
      id: "deploiement",
      heading: "نشر CRM في 30 يومًا: منهجية Mohtaoua",
      paragraphs: [
        "يُنشر CRM كمشروع، لا كشراء ترخيص. إليك الجدول النموذجي الذي نطبقه لعملائنا المغاربة، من المقاولة الصغرى إلى الهياكل متعددة المواقع."
      ],
      bullets: [
        "الأسبوع 1 — تدقيق وتصميم: رسم المسار الحالي، تعريف المسار، اختيار الأداة، تنظيف القاعدة",
        "الأسبوع 2 — التكوين: إنشاء الحقول والمراحل والأتمتة (تعيين، متابعات J+1/J+3)، تكاملات Meta/Google/WhatsApp",
        "الأسبوع 3 — الترحيل والتدريب: استيراد جهات الاتصال، تدريب الفريق (ساعتان)، نصوص مكالمات ورسائل WhatsApp نموذجية",
        "الأسبوع 4 — الإطلاق والمتابعة: الإنتاج، فحص يومي للعملاء غير المعالجين، تعديلات المسار، أول تقرير إداري"
      ]
    },
    {
      id: "kpis",
      heading: "مؤشرات CRM للمتابعة أسبوعيًا",
      paragraphs: [
        "CRM بلا مؤشرات قاعدة بيانات مُجَلَّلة. هذه الستة مقاييس تكفي لقيادة أداء المبيعات وإعلام قرارات التسويق."
      ],
      bullets: [
        "متوسط مدة أول اتصال (هدف: < ساعة B2C، < 4 ساعات B2B)",
        "معدل الاتصال (عملاء تم الوصول إليهم مرة / الإجمالي)",
        "معدل التأهيل (مؤهلون / تم الاتصال بهم)",
        "معدل التحويل (مبيعات / مؤهلون)",
        "متوسط دورة البيع (أيام من أول اتصال إلى التوقيع)",
        "إيرادات حسب مصدر الاستقطاب (Meta مقابل Google مقابل عضوي مقابل إحالة)"
      ]
    },
    {
      id: "erreurs",
      heading: "الأخطاء السبعة الأكثر شيوعًا في CRM بالمغرب",
      paragraphs: [
        "هذه الأخطاء تفسر لماذا تتخلى كثير من الشركات عن CRM بعد ثلاثة أشهر. تجنبها يضاعف فرص نجاحك."
      ],
      bullets: [
        "اختيار أداة معقدة جدًا للفريق (HubSpot Enterprise لـ3 مندوبين)",
        "عدم تعريف مراحل المسار قبل التكوين",
        "نسيان تكامل WhatsApp — القناة الأولى في المغرب",
        "لا قواعد تعيين: العملاء يسقطون في صندوق مشترك ولا أحد يتفاعل",
        "لا متابعات تلقائية: العملاء الدافئون يبردون خلال 48 ساعة",
        "تدريب الفريق مرة واحدة بلا متابعة أسبوعية",
        "تحسين الحملات على عملاء CRM لا على المبيعات الفعلية المُرجَعة"
      ]
    },
    {
      id: "conclusion",
      heading: "CRM: مضاعف استثمارك التسويقي",
      paragraphs: [
        "كل درهم يُستثمر في Meta Ads أو Google Ads أو TikTok لا قيمة له إلا إذا اُلتقط العميل وُتابع وتحوّل. CRM منظم يرفع معدل التحويل 20 إلى 40% تلقائيًا دون درهم إضافي في الإعلان — ببساطة بإزالة التسريبات من عملية المبيعات.",
        "في Mohtaoua نرافق الشركات المغربية من مختلف القطاعات في اختيار ونشر وتكامل CRM: HubSpot أو Pipedrive أو حلنا الخاص المتصل بـWhatsApp وMeta وGoogle. اطلب تدقيقًا مجانيًا لعملية المبيعات: نحدد تسريباتك ونقدم خطة عمل مرقمة."
      ]
    }
  ],
  faqs: [
    {
      question: "أي CRM مجاني للبدء في المغرب؟",
      answer: "HubSpot CRM المجاني أفضل نقطة انطلاق للمقاولة الصغرى والمتوسطة: جهات اتصال غير محدودة، مسار، تكاملات أساسية وتوسع تدريجي. Pipedrive بلا نسخة مجانية لكن يقدم تجربة 14 يومًا. تجنب Excel فور تجاوز 30 عميلًا شهريًا."
    },
    {
      question: "كم يكلف CRM للمقاولة الصغرى والمتوسطة المغربية؟",
      answer: "توقع 0 درهم (HubSpot مجاني) إلى 1,500 درهم/شهر لـ3-5 مستخدمين على Pipedrive أو Zoho. CRM مخصص مع تكاملات WhatsApp + Meta يبدأ حوالي 3,000-8,000 درهم/شهر شاملة (ترخيص، تكامل، صيانة). العائد يُقاس بالعملاء المحولين لا بتكلفة البرنامج."
    },
    {
      question: "هل أحتاج CRM إذا استخدمت WhatsApp فقط؟",
      answer: "WhatsApp بلا CRM هو المشكلة الأكثر شيوعًا في المغرب. بمجرد أن يدير شخصان عملاء محتملين على WhatsApp، تحتاج نظامًا مركزيًا: تعيين، سجل، متابعات وتقارير. وإلا تفقد العملاء والرؤية."
    },
    {
      question: "كم من الوقت لنشر CRM؟",
      answer: "النشر القياسي للمقاولة الصغرى والمتوسطة يستغرق 3 إلى 4 أسابيع: تدقيق، تكوين، تكاملات، ترحيل وتدريب. نشر سريع (أداة بسيطة، فريق صغير) ممكن في 10 أيام. خصص 2-3 أشهر لإقرار كامل من الفريق."
    },
    {
      question: "كيف أربط Meta Ads بـCRM؟",
      answer: "ثلاث خيارات: تكامل HubSpot/Pipedrive الأصلي (الأبسط)، موصل Zapier/Make (مرن، ~20 دولارًا/شهر)، أو webhook مخصص من Meta Lead Ads إلى CRM. المهم: يصل العميل إلى CRM في أقل من 60 ثانية مع الاحتفاظ بمصدر الحملة."
    },
    {
      question: "CRM مخصص أم SaaS: ماذا أختار؟",
      answer: "SaaS (HubSpot، Pipedrive) إذا كانت عملياتك قياسية وفريقك < 20 شخصًا. CRM مخصص إذا لديك سير عمل خاص (وكالات متعددة، قطاع منظم، تكامل ERP/دفع)، أو تريد مكدسًا موحدًا WhatsApp + استقطاب + فوترة دون تكديس اشتراكات."
    }
  ]
};

for (const [locale, post] of Object.entries({ fr, en, ar })) {
  const path = join(root, `messages/${locale}/blog.json`);
  const json = JSON.parse(readFileSync(path, "utf8"));
  json.posts[SLUG] = post;
  writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
  console.log(`Ajouté ${SLUG} → messages/${locale}/blog.json`);
}
