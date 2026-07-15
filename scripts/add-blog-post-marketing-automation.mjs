#!/usr/bin/env node
/**
 * Article du jour — Marketing Automation Maroc (2026-07-17)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SLUG = "marketing-automation-maroc-guide";
const LOCALES = ["fr", "en", "ar"];

const posts = {
  fr: {
    title: "Marketing automation au Maroc : automatiser vos leads sans perdre l'humain",
    excerpt:
      "Séquences email, relances WhatsApp, scoring et nurturing : guide complet pour structurer l'automatisation marketing des PME et centres de formation marocains.",
    category: "automation",
    overview: {
      what: "Guide expert pour déployer le marketing automation au Maroc : workflows, outils, intégrations Meta/Google/WhatsApp/CRM et KPIs pour convertir plus sans augmenter l'équipe.",
      who: "Dirigeants, responsables marketing et commerciaux qui génèrent des leads mais n'ont pas de système de relance structuré.",
      benefits: [
        "3 workflows prêts à déployer (accueil lead, nurturing, réactivation)",
        "Stack outils adaptée au budget PME marocaine",
        "Connexion acquisition → CRM → WhatsApp expliquée pas à pas",
      ],
      topics: [
        "Marketing automation Maroc",
        "Nurturing leads",
        "WhatsApp automation",
        "HubSpot",
        "Make Zapier",
        "Scoring leads",
      ],
      takeaways: [
        "L'automation ne remplace pas le commercial : elle garantit qu'aucun lead n'est oublié",
        "WhatsApp + email + CRM est le trio gagnant au Maroc, pas l'email seul",
        "3 workflows bien configurés suffisent pour doubler le taux de contact dans les 24 h",
      ],
    },
    sections: [
      {
        id: "intro",
        heading: "Pourquoi le marketing automation est devenu critique au Maroc",
        paragraphs: [
          "En 2026, la majorité des entreprises marocaines investissent enfin dans l'acquisition digitale : Meta Ads, Google Ads, TikTok, landing pages. Le problème n'est plus de générer des leads — c'est de les traiter assez vite et assez souvent pour convertir. Sans automatisation, vos commerciaux passent leur journée à copier-coller des messages WhatsApp, relancer manuellement les prospects tièdes et chercher qui a répondu à quelle campagne.",
          "Le marketing automation structure ces tâches répétitives : accueil instantané du lead, assignation au bon commercial, séquences de relance, rappels de rendez-vous, scoring et handoff humain au bon moment. Ce guide vous montre comment le déployer au Maroc sans transformer votre entreprise en usine à messages impersonnels — l'enjeu est d'automatiser le processus, pas la relation.",
        ],
      },
      {
        id: "probleme",
        heading: "Le problème : vous payez l'acquisition, vous perdez la conversion",
        paragraphs: [
          "Nous voyons le même scénario chaque semaine en audit : 200 leads par mois via Meta Ads, 40 % jamais contactés dans les 24 heures, 25 % sans relance après le premier échange, aucune visibilité sur le motif de perte. L'équipe commerciale est débordée, le dirigeant ne sait pas si le problème vient des campagnes ou du suivi, et le budget média augmente pour compenser un pipeline qui fuit.",
          "L'automation ne crée pas de la magie : elle applique des règles que vous définissez une fois, de façon systématique. Un lead formulaire déclenche une notification WhatsApp au commercial, un message d'accueil au prospect, une tâche de rappel à J+1 si pas de réponse, et un passage en « lead froid » à J+7 pour une campagne de réactivation. Chaque étape est tracée dans le CRM.",
        ],
        bullets: [
          "Délai de premier contact trop long (objectif : < 1 h en B2C)",
          "Relances oubliées quand l'équipe est en rendez-vous ou en week-end",
          "Aucune segmentation : même message pour un lead chaud et un curieux",
          "Marketing et commercial sur des outils différents sans synchronisation",
          "Impossible de mesurer le taux de conversion par source et par séquence",
        ],
      },
      {
        id: "definition",
        heading: "Qu'est-ce que le marketing automation (vraiment) ?",
        paragraphs: [
          "Le marketing automation, c'est l'orchestration automatique d'actions marketing et commerciales déclenchées par un événement : soumission de formulaire, clic sur une pub, ouverture d'email, changement de statut dans le CRM, date clé (rentrée, fin d'essai). Ces actions peuvent être des emails, des messages WhatsApp, des SMS, des notifications internes, des mises à jour de champs CRM ou l'assignation à un commercial.",
          "Ce n'est pas du spam industrialisé. Les meilleures implémentations au Maroc combinent automation et points de contact humains : le message automatique confirme la réception et propose un créneau ; le commercial prend le relais pour la vente. L'automation gère le volume et la régularité ; l'humain gère la persuasion et la clôture.",
        ],
      },
      {
        id: "workflows",
        heading: "Les 3 workflows indispensables pour commencer",
        paragraphs: [
          "Ne déployez pas 20 scénarios d'un coup. Trois workflows couvrent 80 % des besoins d'une PME ou d'un centre de formation marocain.",
        ],
        bullets: [
          "Workflow 1 — Accueil lead : formulaire ou Lead Ad → création CRM → notification commercial → message WhatsApp d'accueil → tâche rappel 60 min",
          "Workflow 2 — Nurturing tiède : lead sans réponse J+1 → message valeur (témoignage, FAQ) → J+3 proposition RDV → J+7 dernière relance avant archivage",
          "Workflow 3 — Réactivation : leads froids > 30 jours → campagne ciblée (nouvelle promo, rentrée, offre limitée) → réintégration pipeline si réponse",
        ],
      },
      {
        id: "outils",
        heading: "Quels outils pour le marketing automation au Maroc ?",
        paragraphs: [
          "Le choix dépend de votre stack existante, de votre budget et de la place de WhatsApp dans votre processus. Voici les options les plus pertinentes pour le marché marocain en 2026.",
        ],
        bullets: [
          "HubSpot : workflows marketing + CRM intégrés, idéal si vous centralisez acquisition et suivi (gratuit au départ, puis payant)",
          "Make (ex-Integromat) ou Zapier : connecteurs Meta, Google, WhatsApp API, CRM — flexible pour PME qui composent leur stack",
          "Brevo (ex-Sendinblue) : email + SMS + automation simple, bon rapport qualité-prix pour l'emailing",
          "Solution Mohtaoua : automation native WhatsApp + CRM + campagnes, adaptée aux entreprises qui veulent une stack unifiée locale",
          "WhatsApp Business API : indispensable pour scaler au-delà de 2 commerciaux sur le même numéro",
        ],
      },
      {
        id: "etapes",
        heading: "Déployer l'automation en 5 étapes",
        paragraphs: [
          "Suivez cette séquence pour éviter les projets qui s'enlisent pendant trois mois sans résultat mesurable.",
        ],
        bullets: [
          "1. Cartographier le parcours actuel : de la source lead à la signature, avec les délais réels observés",
          "2. Définir 3 déclencheurs prioritaires (nouveau lead, pas de réponse J+1, RDV manqué) et les messages associés",
          "3. Connecter les sources : Meta Lead Ads, formulaire site, Google Ads → CRM via webhook ou Make",
          "4. Rédiger les scripts WhatsApp et emails (ton humain, darija ou français selon cible) et les faire valider par le commercial",
          "5. Lancer en pilote sur un canal (ex. Meta uniquement), mesurer 30 jours, puis étendre",
        ],
      },
      {
        id: "whatsapp",
        heading: "WhatsApp : le canal n°1 à automatiser au Maroc",
        paragraphs: [
          "L'email seul ne suffit pas au Maroc : les taux d'ouverture WhatsApp dépassent largement l'email pour le B2C et la formation. Automatisez au minimum : accusé de réception instantané, rappel de RDV 24 h avant, relance post-visite ou post-devis. Utilisez des templates approuvés Meta pour les messages hors fenêtre 24 h.",
          "Attention à la frontière automation / spam : limitez-vous à 3-4 touchpoints automatiques avant intervention humaine. Personnalisez avec le prénom, la formation ou le produit demandé, et la ville quand c'est pertinent. Un message générique « Bonjour, comment pouvons-nous vous aider ? » convertit moins qu'un « Bonjour Karim, voici les horaires du cours d'allemand B1 à Casablanca ».",
        ],
      },
      {
        id: "integrations",
        heading: "Connecter acquisition, CRM et automation",
        paragraphs: [
          "L'automation n'a de valeur que si les données circulent. Voici les intégrations prioritaires pour une entreprise marocaine qui fait de la pub digitale.",
        ],
        bullets: [
          "Meta Lead Ads → CRM + séquence WhatsApp (temps réel, < 60 secondes)",
          "Google Ads formulaires → CRM avec UTM et mot-clé conservés",
          "Landing page → webhook → CRM → automation (éviter la saisie manuelle)",
          "CRM → Meta/Google CAPI : renvoyer « Lead qualifié » et « Vente » pour optimiser les algorithmes",
          "Calendrier (Calendly, Google Calendar) → rappels automatiques et mise à jour statut CRM",
        ],
      },
      {
        id: "scoring",
        heading: "Scoring et qualification automatique",
        paragraphs: [
          "Tous les leads ne méritent pas le même effort immédiat. Un système de scoring simple — basé sur la source, le budget déclaré, la réactivité et l'engagement (ouverture messages, clic lien) — permet de prioriser les leads chauds pour un appel dans l'heure, et de mettre les curieux en nurturing automatique.",
          "Exemple pour un centre de formation : +20 points si budget confirmé, +15 si réponse sous 2 h, +10 si source Google (intention forte), -10 si email jetable. Au-delà de 50 points : alerte commercial prioritaire. En dessous de 20 : séquence nurturing 7 jours avant appel humain.",
        ],
      },
      {
        id: "kpis",
        heading: "KPIs à suivre chaque semaine",
        paragraphs: [
          "Mesurez l'efficacité de l'automation sur la conversion, pas sur le volume de messages envoyés.",
        ],
        bullets: [
          "Délai moyen de premier contact (avant / après automation)",
          "Taux de contact à J+1 et J+7",
          "Taux de conversion lead → RDV et lead → client",
          "Taux de réponse aux séquences WhatsApp vs email",
          "Coût par client acquis par source (avec suivi CRM rigoureux)",
          "Taux de réactivation des leads froids (workflow 3)",
        ],
      },
      {
        id: "erreurs",
        heading: "Les erreurs qui font échouer l'automation",
        paragraphs: [
          "Ces pièges reviennent dans la majorité des projets que nous reprenons en cours de route.",
        ],
        bullets: [
          "Automatiser avant d'avoir un CRM propre : vous accélérez le chaos",
          "Messages trop longs ou trop corporate sur WhatsApp",
          "Aucune règle de handoff vers l'humain : le prospect tourne en boucle",
          "Trop de workflows en parallèle dès le lancement",
          "Ne pas tester sur mobile (80 %+ du trafic marocain)",
          "Ignorer le consentement et les opt-out (risque blocage WhatsApp)",
          "Ne pas former les commerciaux : ils contournent l'outil et le projet meurt",
        ],
      },
      {
        id: "conclusion",
        heading: "Automation + humain : le modèle gagnant",
        paragraphs: [
          "Le marketing automation au Maroc n'est pas un luxe réservé aux multinationales. Avec trois workflows, un CRM connecté et WhatsApp bien intégré, une PME de 5 personnes peut traiter le volume de leads d'une structure trois fois plus grande — sans sacrifier la qualité de la relation.",
          "Chez Mohtaoua, nous concevons et déployons des systèmes d'automation sur mesure pour entreprises marocaines : connexion Meta, Google, TikTok, CRM, WhatsApp API et reporting dirigeant. Demandez un audit gratuit : nous cartographions vos fuites et vous proposons un plan d'automation chiffré, prêt à déployer en 30 jours.",
        ],
      },
    ],
    faqs: [
      {
        question: "Par quoi commencer si je n'ai jamais fait d'automation ?",
        answer:
          "Commencez par le workflow d'accueil lead : notification commercial + message WhatsApp automatique + tâche de rappel. C'est le ROI le plus rapide et il ne nécessite qu'un CRM et une connexion formulaire ou Meta Lead Ads.",
      },
      {
        question: "Make ou Zapier pour une PME marocaine ?",
        answer:
          "Make est souvent plus économique pour des volumes moyens et offre des scénarios visuels puissants. Zapier reste plus simple pour débuter. Les deux connectent Meta, Google, HubSpot et WhatsApp via API. Budget typique : 15-50 USD/mois selon le volume.",
      },
      {
        question: "L'automation va-t-elle déshumaniser notre relation client ?",
        answer:
          "Non, si vous limitez l'automation aux étapes logistiques (accueil, rappels, nurturing informatif) et gardez l'humain pour la vente et la négociation. Les clients marocains attendent une réponse rapide — l'automation la garantit.",
      },
      {
        question: "Combien de temps pour mettre en place 3 workflows ?",
        answer:
          "Comptez 2 à 4 semaines : audit parcours, rédaction scripts, configuration outil, tests, formation équipe. Un pilote sur un seul canal peut être live en 10 jours.",
      },
      {
        question: "Faut-il un CRM avant l'automation ?",
        answer:
          "Oui, dans 95 % des cas. L'automation sans CRM centralisé crée des relances dans le vide. HubSpot gratuit ou un CRM Mohtaoua suffit pour démarrer.",
      },
      {
        question: "WhatsApp automation sans API Business : est-ce possible ?",
        answer:
          "Pour 1-2 commerciaux, WhatsApp Business App avec réponses rapides manuelles peut suffire au début. Dès que vous dépassez 50 leads/mois ou 3 utilisateurs, l'API Business devient nécessaire pour assignation, historique CRM et templates.",
      },
    ],
  },
  en: {
    title: "Marketing automation in Morocco: automate leads without losing the human touch",
    excerpt:
      "Email sequences, WhatsApp follow-ups, scoring and nurturing: a complete guide to marketing automation for Moroccan SMEs and training centers.",
    category: "automation",
    overview: {
      what: "Expert guide to deploy marketing automation in Morocco: workflows, tools, Meta/Google/WhatsApp/CRM integrations and KPIs to convert more without growing your team.",
      who: "Business owners and marketing/sales leads who generate leads but lack structured follow-up.",
      benefits: [
        "3 ready-to-deploy workflows (welcome, nurturing, reactivation)",
        "Tool stack suited to Moroccan SME budgets",
        "Acquisition → CRM → WhatsApp connection explained step by step",
      ],
      topics: [
        "Marketing automation Morocco",
        "Lead nurturing",
        "WhatsApp automation",
        "HubSpot",
        "Make Zapier",
        "Lead scoring",
      ],
      takeaways: [
        "Automation doesn't replace sales — it ensures no lead is forgotten",
        "WhatsApp + email + CRM is the winning trio in Morocco, not email alone",
        "3 well-configured workflows can double your 24-hour contact rate",
      ],
    },
    sections: [
      {
        id: "intro",
        heading: "Why marketing automation has become critical in Morocco",
        paragraphs: [
          "In 2026, most Moroccan businesses invest in digital acquisition: Meta Ads, Google Ads, TikTok, landing pages. The problem is no longer generating leads — it's processing them fast and often enough to convert. Without automation, your sales team spends the day copy-pasting WhatsApp messages and manually chasing warm prospects.",
          "Marketing automation structures these repetitive tasks: instant lead welcome, assignment to the right rep, follow-up sequences, appointment reminders, scoring and human handoff at the right moment. This guide shows how to deploy it in Morocco without turning your business into an impersonal message factory.",
        ],
      },
      {
        id: "probleme",
        heading: "The problem: you pay for acquisition, you lose on conversion",
        paragraphs: [
          "We see the same scenario every week: 200 leads per month via Meta Ads, 40% never contacted within 24 hours, 25% with no follow-up after the first exchange. The sales team is overwhelmed and leadership can't tell if campaigns or follow-up is the bottleneck.",
          "Automation doesn't create magic — it applies rules you define once, systematically. A form submission triggers a WhatsApp notification to sales, a welcome message to the prospect, a J+1 reminder task if no response, and a move to 'cold lead' at J+7 for reactivation.",
        ],
        bullets: [
          "First contact delay too long (target: < 1 h in B2C)",
          "Follow-ups forgotten when the team is in meetings or on weekends",
          "No segmentation: same message for hot leads and curious browsers",
          "Marketing and sales on different tools without sync",
          "Unable to measure conversion by source and sequence",
        ],
      },
      {
        id: "definition",
        heading: "What marketing automation really means",
        paragraphs: [
          "Marketing automation orchestrates marketing and sales actions triggered by an event: form submission, ad click, email open, CRM status change, key date (back-to-school, trial end). Actions can be emails, WhatsApp messages, SMS, internal notifications, CRM field updates or rep assignment.",
          "It's not industrialized spam. The best implementations in Morocco combine automation with human touchpoints: the automatic message confirms receipt and offers a slot; the rep takes over for the sale.",
        ],
      },
      {
        id: "workflows",
        heading: "The 3 essential workflows to start",
        paragraphs: ["Don't deploy 20 scenarios at once. Three workflows cover 80% of Moroccan SME needs."],
        bullets: [
          "Workflow 1 — Lead welcome: form or Lead Ad → CRM creation → rep notification → WhatsApp welcome → 60 min callback task",
          "Workflow 2 — Warm nurturing: no response J+1 → value message → J+3 meeting offer → J+7 last touch before archive",
          "Workflow 3 — Reactivation: cold leads > 30 days → targeted campaign → pipeline re-entry if response",
        ],
      },
      {
        id: "outils",
        heading: "Which tools for marketing automation in Morocco?",
        paragraphs: ["Choice depends on your existing stack, budget and WhatsApp's role in your process."],
        bullets: [
          "HubSpot: marketing workflows + integrated CRM",
          "Make or Zapier: Meta, Google, WhatsApp API, CRM connectors",
          "Brevo: email + SMS + simple automation",
          "Mohtaoua solution: native WhatsApp + CRM + campaigns automation",
          "WhatsApp Business API: essential to scale beyond 2 reps on one number",
        ],
      },
      {
        id: "etapes",
        heading: "Deploy automation in 5 steps",
        paragraphs: ["Follow this sequence to avoid three-month projects with no measurable results."],
        bullets: [
          "1. Map the current journey from lead source to signature",
          "2. Define 3 priority triggers and associated messages",
          "3. Connect sources: Meta Lead Ads, site form, Google Ads → CRM",
          "4. Write WhatsApp and email scripts (human tone) and validate with sales",
          "5. Pilot on one channel, measure 30 days, then expand",
        ],
      },
      {
        id: "whatsapp",
        heading: "WhatsApp: the #1 channel to automate in Morocco",
        paragraphs: [
          "Email alone isn't enough: WhatsApp open rates far exceed email for B2C and training in Morocco. Automate at minimum: instant acknowledgment, 24h appointment reminder, post-visit follow-up. Use Meta-approved templates for messages outside the 24h window.",
          "Watch the automation/spam line: limit to 3-4 automatic touchpoints before human intervention. Personalize with first name, requested program and city when relevant.",
        ],
      },
      {
        id: "integrations",
        heading: "Connect acquisition, CRM and automation",
        paragraphs: ["Automation only works if data flows between systems."],
        bullets: [
          "Meta Lead Ads → CRM + WhatsApp sequence (real-time)",
          "Google Ads forms → CRM with UTM preserved",
          "Landing page → webhook → CRM → automation",
          "CRM → Meta/Google CAPI: send 'Qualified lead' and 'Sale' events",
          "Calendar → automatic reminders and CRM status updates",
        ],
      },
      {
        id: "scoring",
        heading: "Scoring and automatic qualification",
        paragraphs: [
          "Not all leads deserve the same immediate effort. Simple scoring — based on source, declared budget, responsiveness and engagement — lets you prioritize hot leads for a call within the hour and put curious leads in automatic nurturing.",
        ],
      },
      {
        id: "kpis",
        heading: "Weekly KPIs to track",
        paragraphs: ["Measure automation on conversion, not message volume."],
        bullets: [
          "Average first contact delay (before / after automation)",
          "Contact rate at J+1 and J+7",
          "Lead → meeting and lead → client conversion rates",
          "WhatsApp vs email sequence response rates",
          "Cost per acquired client by source",
          "Cold lead reactivation rate",
        ],
      },
      {
        id: "erreurs",
        heading: "Mistakes that kill automation projects",
        paragraphs: ["These traps appear in most projects we take over mid-flight."],
        bullets: [
          "Automating before having a clean CRM",
          "Messages too long or corporate on WhatsApp",
          "No human handoff rule",
          "Too many parallel workflows at launch",
          "Not testing on mobile",
          "Ignoring consent and opt-out",
          "Not training sales reps",
        ],
      },
      {
        id: "conclusion",
        heading: "Automation + human: the winning model",
        paragraphs: [
          "Marketing automation in Morocco isn't a luxury for multinationals. With three workflows, a connected CRM and well-integrated WhatsApp, a 5-person SME can handle the lead volume of a structure three times larger.",
          "At Mohtaoua, we design and deploy custom automation systems for Moroccan businesses. Request a free audit: we'll map your leaks and propose a priced automation plan ready to deploy in 30 days.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where to start if I've never done automation?",
        answer:
          "Start with the lead welcome workflow: rep notification + automatic WhatsApp + callback task. Fastest ROI, needs only CRM and form or Meta Lead Ads connection.",
      },
      {
        question: "Make or Zapier for a Moroccan SME?",
        answer:
          "Make is often more cost-effective for medium volume. Zapier is simpler to start. Both connect Meta, Google, HubSpot and WhatsApp via API. Typical budget: $15-50/month.",
      },
      {
        question: "Will automation dehumanize our customer relationship?",
        answer:
          "No, if you limit automation to logistics (welcome, reminders, informative nurturing) and keep humans for selling and negotiation.",
      },
      {
        question: "How long to set up 3 workflows?",
        answer: "Count 2-4 weeks for audit, scripts, configuration, tests and training. A single-channel pilot can go live in 10 days.",
      },
      {
        question: "Do I need a CRM before automation?",
        answer: "Yes in 95% of cases. Automation without centralized CRM creates follow-ups in a vacuum. HubSpot free or Mohtaoua CRM is enough to start.",
      },
      {
        question: "WhatsApp automation without Business API?",
        answer:
          "For 1-2 reps, WhatsApp Business App with quick replies may suffice initially. Beyond 50 leads/month or 3 users, Business API becomes necessary.",
      },
    ],
  },
  ar: {
    title: "أتمتة التسويق في المغرب: أتمتة العملاء المحتملين دون فقدان اللمسة الإنسانية",
    excerpt:
      "تسلسلات البريد الإلكتروني، متابعات واتساب، التسجيل والتغذية: دليل شامل لأتمتة التسويق للمؤسسات الصغيرة ومراكز التدريب المغربية.",
    category: "automation",
    overview: {
      what: "دليل خبير لنشر أتمتة التسويق في المغرب: سير العمل، الأدوات، تكاملات Meta/Google/WhatsApp/CRM ومؤشرات الأداء لتحويل المزيد دون توسيع الفريق.",
      who: "المديرون ومسؤولو التسويق والمبيعات الذين يولدون عملاء محتملين دون متابعة منظمة.",
      benefits: [
        "3 سير عمل جاهزة للنشر (استقبال، تغذية، إعادة تفعيل)",
        "مجموعة أدوات مناسبة لميزانية المؤسسات الصغيرة المغربية",
        "شرح خطوة بخطوة لربط الاكتساب → CRM → واتساب",
      ],
      topics: [
        "أتمتة التسويق المغرب",
        "تغذية العملاء المحتملين",
        "أتمتة واتساب",
        "HubSpot",
        "Make Zapier",
        "تسجيل العملاء المحتملين",
      ],
      takeaways: [
        "الأتمتة لا تحل محل المبيعات — بل تضمن عدم نسيان أي عميل محتمل",
        "واتساب + البريد + CRM هو الثلاثي الفائز في المغرب",
        "3 سير عمل جيدة التكوين تكفي لمضاعفة معدل الاتصال خلال 24 ساعة",
      ],
    },
    sections: [
      {
        id: "intro",
        heading: "لماذا أصبحت أتمتة التسويق حاسمة في المغرب",
        paragraphs: [
          "في 2026، تستثمر معظم الشركات المغربية في الاكتساب الرقمي: Meta Ads وGoogle Ads وTikTok وصفحات الهبوط. المشكلة لم تعد توليد العملاء المحتملين — بل معالجتهم بسرعة وكفاية للتحويل.",
          "أتمتة التسويق تنظم المهام المتكررة: استقبال فوري، تعيين للمندوب المناسب، تسلسلات متابعة، تذكيرات المواعيد، التسجيل والتسليم البشري في الوقت المناسب.",
        ],
      },
      {
        id: "probleme",
        heading: "المشكلة: تدفع للاكتساب وتخسر في التحويل",
        paragraphs: [
          "نرى نفس السيناريو أسبوعياً: 200 عميل محتمل شهرياً عبر Meta Ads، 40٪ لم يتم الاتصال بهم خلال 24 ساعة، 25٪ بدون متابعة بعد التبادل الأول.",
          "الأتمتة تطبق قواعد تحددها مرة واحدة بشكل منهجي: إشعار واتساب، رسالة ترحيب، مهمة تذكير J+1، انتقال إلى «عميل بارد» في J+7 لإعادة التفعيل.",
        ],
        bullets: [
          "تأخر الاتصال الأول (الهدف: < 1 ساعة في B2C)",
          "متابعات منسية عندما يكون الفريق في اجتماعات",
          "لا يوجد تجزئة: نفس الرسالة للجميع",
          "التسويق والمبيعات على أدوات مختلفة",
          "استحالة قياس التحويل حسب المصدر",
        ],
      },
      {
        id: "definition",
        heading: "ما هي أتمتة التسويق حقاً؟",
        paragraphs: [
          "أتمتة التسويق هي تنسيق الإجراءات التلقائية المشغلة بحدث: نموذج، نقرة إعلان، فتح بريد، تغيير حالة CRM، تاريخ مهم.",
          "ليست بريداً عشوائياً. أفضل التطبيقات في المغرب تجمع الأتمتة مع اللمسة البشرية: الرسالة التلقائية تؤكد الاستلام؛ المندوب يتولى البيع.",
        ],
      },
      {
        id: "workflows",
        heading: "3 سير العمل الأساسية للبدء",
        paragraphs: ["لا تنشر 20 سيناريو دفعة واحدة. ثلاثة تغطي 80٪ من احتياجات المؤسسات الصغيرة."],
        bullets: [
          "سير 1 — استقبال العميل: نموذج → CRM → إشعار مندوب → واتساب ترحيب → مهمة اتصال 60 دقيقة",
          "سير 2 — تغذية دافئة: بدون رد J+1 → رسالة قيمة → J+3 عرض موعد → J+7 آخر متابعة",
          "سير 3 — إعادة تفعيل: عملاء باردة > 30 يوم → حملة مستهدفة → إعادة دخول المسار",
        ],
      },
      {
        id: "outils",
        heading: "أي أدوات لأتمتة التسويق في المغرب؟",
        paragraphs: ["الاختيار يعتمد على مجموعتك الحالية وميزانيتك ودور واتساب."],
        bullets: [
          "HubSpot: سير عمل + CRM متكامل",
          "Make أو Zapier: موصلات Meta وGoogle وواتساب API",
          "Brevo: بريد + SMS + أتمتة بسيطة",
          "حل Mohtaoua: أتمتة واتساب + CRM + حملات",
          "WhatsApp Business API: ضروري للتوسع",
        ],
      },
      {
        id: "etapes",
        heading: "نشر الأتمتة في 5 خطوات",
        paragraphs: ["اتبع هذا التسلسل لتجنب مشاريع تستمر أشهراً دون نتائج."],
        bullets: [
          "1. رسم المسار الحالي من المصدر إلى التوقيع",
          "2. تحديد 3 محفزات أولوية والرسائل المرتبطة",
          "3. ربط المصادر: Meta Lead Ads والنماذج → CRM",
          "4. كتابة نصوص واتساب والبريد والتحقق من المبيعات",
          "5. تجربة على قناة واحدة، قياس 30 يوماً، ثم التوسع",
        ],
      },
      {
        id: "whatsapp",
        heading: "واتساب: القناة رقم 1 للأتمتة في المغرب",
        paragraphs: [
          "البريد وحده لا يكفي: معدلات فتح واتساب تتفوق على البريد في B2C والتدريب.",
          "احترم الحدود: 3-4 نقاط اتصال تلقائية كحد أقصى قبل التدخل البشري. خصص بالاسم والبرنامج والمدينة.",
        ],
      },
      {
        id: "integrations",
        heading: "ربط الاكتساب وCRM والأتمتة",
        paragraphs: ["الأتمتة تعمل فقط إذا تدفقت البيانات."],
        bullets: [
          "Meta Lead Ads → CRM + واتساب (فوري)",
          "نماذج Google Ads → CRM مع UTM",
          "صفحة هبوط → webhook → CRM",
          "CRM → Meta/Google CAPI: أحداث «عميل مؤهل» و«بيع»",
          "التقويم → تذكيرات تلقائية",
        ],
      },
      {
        id: "scoring",
        heading: "التسجيل والتأهيل التلقائي",
        paragraphs: [
          "ليس كل العملاء المحتملين يستحقون نفس الجهد. تسجيل بسيط حسب المصدر والميزانية والاستجابة يتيح أولوية العملاء الساخنين.",
        ],
      },
      {
        id: "kpis",
        heading: "مؤشرات أداء أسبوعية",
        paragraphs: ["قِس الأتمتة على التحويل، لا على حجم الرسائل."],
        bullets: [
          "متوسط تأخر الاتصال الأول",
          "معدل الاتصال J+1 وJ+7",
          "معدلات التحويل عميل → اجتماع وعميل → بيع",
          "معدلات الرد على واتساب مقابل البريد",
          "تكلفة اكتساب العميل حسب المصدر",
          "معدل إعادة تفعيل العملاء الباردين",
        ],
      },
      {
        id: "erreurs",
        heading: "أخطاء تُفشل مشاريع الأتمتة",
        paragraphs: ["هذه الفخاخ تتكرر في معظم المشاريع."],
        bullets: [
          "الأتمتة قبل CRM نظيف",
          "رسائل طويلة أو رسمية على واتساب",
          "لا قاعدة تسليم بشري",
          "سير عمل كثيرة عند الإطلاق",
          "عدم الاختبار على الجوال",
          "تجاهل الموافقة وإلغاء الاشتراك",
          "عدم تدريب المندوبين",
        ],
      },
      {
        id: "conclusion",
        heading: "الأتمتة + الإنسان: النموذج الفائز",
        paragraphs: [
          "أتمتة التسويق في المغرب ليست رفاهية. بثلاثة سير عمل وCRM متصل وواتساب متكامل، مؤسسة من 5 أشخاص تتعامل مع حجم عملاء أكبر بكثير.",
          "في Mohtaoua، نصمم وننشر أنظمة أتمتة مخصصة. اطلب تدقيقاً مجانياً: نرسم تسريباتك ونقترح خطة أتمتة جاهزة خلال 30 يوماً.",
        ],
      },
    ],
    faqs: [
      {
        question: "من أين أبدأ إذا لم أقم بالأتمتة من قبل؟",
        answer: "ابدأ بسير استقبال العميل: إشعار مندوب + واتساب تلقائي + مهمة اتصال. أسرع عائد استثمار.",
      },
      {
        question: "Make أم Zapier لمؤسسة صغيرة مغربية؟",
        answer: "Make غالباً أكثر اقتصاداً. Zapier أبسط للبدء. الميزانية النموذجية: 15-50 دولاراً شهرياً.",
      },
      {
        question: "هل ستُزيل الأتمتة اللمسة الإنسانية؟",
        answer: "لا، إذا حددت الأتمتة للخطوات اللوجستية واحتفظت بالبشر للبيع.",
      },
      {
        question: "كم من الوقت لإعداد 3 سير عمل؟",
        answer: "2-4 أسابيع للتدقيق والنصوص والتكوين والاختبار. تجربة قناة واحدة في 10 أيام.",
      },
      {
        question: "هل أحتاج CRM قبل الأتمتة؟",
        answer: "نعم في 95٪ من الحالات. HubSpot المجاني أو CRM Mohtaoua يكفي للبدء.",
      },
      {
        question: "أتمتة واتساب بدون API Business؟",
        answer: "لمندوبين اثنين قد يكفي WhatsApp Business App. فوق 50 عميلاً شهرياً، API ضروري.",
      },
    ],
  },
};

for (const locale of LOCALES) {
  const path = join(root, `messages/${locale}/blog.json`);
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.posts[SLUG] = { cover: "/logo-full.svg", ...posts[locale] };
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`✓ messages/${locale}/blog.json`);
}

console.log(`Done — slug: ${SLUG}`);
