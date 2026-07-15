#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SLUG = "archidoc-archivage-electronique-maroc";
const LOCALES = ["fr", "en", "ar"];
const VIDEO = {
  src: "/blog/videos/archidoc-demo.mp4",
  caption: "Démonstration Archidoc — GED, OCR et archivage documentaire sécurisé",
};

const posts = {
  fr: {
    title: "Archivage électronique au Maroc : cadre légal, démarrage et solution Archidoc",
    excerpt:
      "Loi 09-08, conservation des documents, valeur probante : guide complet pour passer à l'archivage numérique avec Archidoc, la GED Mohtaoua hébergée au Maroc.",
    category: "business",
    overview: {
      what: "Guide expert sur l'archivage électronique au Maroc : obligations légales, méthode de démarrage, avantages d'Archidoc (GED, OCR, workflows) et intégration CRM pour cabinets, cliniques et administrations.",
      who: "Dirigeants, DSI, responsables administratifs, cabinets juridiques et comptables, cliniques et services publics qui gèrent encore des dossiers papier.",
      benefits: [
        "Comprendre le cadre légal marocain (CNDP, conservation, preuve électronique)",
        "Plan de migration en 4 étapes sans bloquer l'activité",
        "Découvrir Archidoc : OCR multilingue, workflows et archivage conforme",
      ],
      topics: [
        "Archivage électronique Maroc",
        "GED",
        "Archidoc",
        "Loi 09-08 CNDP",
        "OCR arabe français",
        "Valeur probante",
      ],
      takeaways: [
        "L'archivage papier coûte cher, ralentit les audits et expose aux pertes — la digitalisation n'est plus optionnelle",
        "La loi 09-08 et la loi 53-05 encadrent données personnelles et échanges électroniques au Maroc",
        "Archidoc combine GED, OCR, workflows et hébergement sécurisé au Maroc, avec options selon volume",
      ],
    },
    sections: [
      {
        id: "intro",
        heading: "Pourquoi l'archivage électronique est devenu prioritaire au Maroc",
        paragraphs: [
          "Cabinets juridiques, comptables, cliniques, administrations et industries marocaines produvent des milliers de documents chaque année : contrats, factures, dossiers patients, pièces comptables, correspondances. Stockés en cartons, classeurs et armoires, ces documents deviennent introuvables, illisibles ou perdus — au moment précis où un audit, un contrôle fiscal ou un contentieux les exige.",
          "L'archivage électronique (ou GED — Gestion Électronique des Documents) répond à un double enjeu : gagner en productivité au quotidien et respecter les obligations légales de conservation et de protection des données. Ce guide explique comment démarrer au Maroc, ce que dit le droit local, et pourquoi Archidoc — solution propriétaire Mohtaoua — est conçue pour ce contexte.",
        ],
      },
      {
        id: "probleme",
        heading: "Le problème des dossiers papier",
        paragraphs: [
          "Sans système centralisé, chaque collaborateur archive « à sa manière ». Une recherche de contrat signé en 2022 peut prendre une heure. Un dossier patient incomplet bloque une consultation. Un audit CNDP ou un contrôle révèle l'absence de traçabilité sur qui a consulté quoi. Les coûts de stockage physique (m², archiviste, transport) augmentent chaque année alors que le volume numérique pourrait être indexé en secondes.",
        ],
        bullets: [
          "Recherche lente et doublons (plusieurs versions du même document)",
          "Risque de perte, dégradation ou accès non autorisé",
          "Difficulté à prouver la conformité lors d'audits",
          "Télétravail impossible sans accès distant sécurisé",
          "Coûts de stockage physique en hausse",
        ],
      },
      {
        id: "cadre-legal",
        heading: "Cadre juridique marocain : ce que votre entreprise doit savoir",
        paragraphs: [
          "Le Maroc dispose d'un cadre juridique structurant la protection des données et les échanges électroniques. Ce n'est pas un conseil juridique formel — consultez votre avocat pour votre secteur — mais voici les textes de référence que tout responsable archivage doit connaître.",
          "La loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, modifiée par la loi n° 43-20, encadre la collecte, le traitement et la conservation des données personnelles. La CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel) veille au respect de ces règles. Tout système d'archivage contenant des données personnelles (dossiers clients, patients, salariés) doit garantir sécurité, limitation des accès et traçabilité.",
          "La loi n° 53-05 relative à l'échange électronique des données juridiques pose les bases de la reconnaissance des documents et signatures électroniques dans les relations juridiques. Combinée à des mécanismes d'horodatage, d'empreintes et de journal d'audit, un archivage électronique bien conçu peut renforcer la valeur probante de vos documents numériques.",
          "Par ailleurs, le Code de commerce et les usages comptables imposent des durées de conservation spécifiques (souvent 10 ans pour les pièces comptables). Votre politique d'archivage doit prévoir des durées de rétention, des règles de destruction sécurisée et des exports pour les contrôles.",
        ],
        bullets: [
          "Loi 09-08 + loi 43-20 : protection des données, déclarations CNDP si applicable",
          "Loi 53-05 : échange électronique et cadre de la preuve numérique",
          "Conservation légale : durées variables selon type de document (comptable, RH, juridique)",
          "Exigences sectorielles : santé, juridique, public — règles additionnelles possibles",
          "Hébergement et transferts : privilégier un hébergement au Maroc pour données sensibles",
        ],
      },
      {
        id: "comment-commencer",
        heading: "Comment commencer l'archivage électronique en 4 étapes",
        paragraphs: [
          "La migration ne se fait pas en un week-end. Une approche progressive limite les risques et favorise l'adoption par les équipes.",
        ],
        bullets: [
          "Étape 1 — Audit documentaire : inventorier types de documents, volumes, départements, durées légales de conservation",
          "Étape 2 — Plan de classement : arborescence unique (par client, dossier, année, type) validée par la direction",
          "Étape 3 — Numérisation & import : scanner l'historique prioritaire + connecter les nouveaux flux (email, ERP, CRM)",
          "Étape 4 — Workflows & droits : définir qui consulte, valide, signe ; former ; mesurer le temps de recherche avant/après",
        ],
      },
      {
        id: "demo-archidoc",
        heading: "Démonstration Archidoc en vidéo",
        paragraphs: [
          "Découvrez en quelques minutes comment Archidoc structure l'import, le classement OCR et la recherche documentaire. Cette démo présente l'interface, les workflows et la logique d'archivage sécurisé pensée pour les organisations marocaines.",
        ],
        video: VIDEO,
      },
      {
        id: "archidoc",
        heading: "Archidoc : la GED Mohtaoua pour le Maroc",
        paragraphs: [
          "Archidoc est la solution de gestion documentaire et d'archivage développée par Mohtaoua. Elle digitalise, indexe et sécurise vos documents avec OCR multilingue (arabe, français, anglais), workflows de validation, recherche full-text instantanée et archivage conforme aux exigences de traçabilité.",
          "Contrairement à une simple bibliothèque de fichiers, Archidoc structure le cycle de vie documentaire : réception, indexation, validation, conservation, consultation et destruction programmée. Elle s'intègre à l'écosystème Mohtaoua : CRM pour lier documents et relations clients, automatisation pour les relances et notifications, et API pour connecter ERP ou outils métier.",
        ],
      },
      {
        id: "avantages",
        heading: "Les avantages concrets d'Archidoc",
        paragraphs: [
          "Les organisations qui déploient Archidoc constatent des gains mesurables dès les premières semaines.",
        ],
        bullets: [
          "Recherche full-text en secondes (OCR sur PDF scannés et images)",
          "Gain de temps administratif : fin des classeurs et recherches manuelles",
          "Conformité : journal d'audit, horodatage, empreintes, droits par rôle",
          "Réduction des coûts de stockage physique et des risques de perte",
          "Accès distant sécurisé pour télétravail et multi-sites",
          "OCR arabe et français : adapté au contexte marocain bilingue",
          "Hébergement sécurisé au Maroc avec sauvegardes chiffrées",
        ],
      },
      {
        id: "options",
        heading: "Options et modules Archidoc",
        paragraphs: [
          "Archidoc s'adapte à votre volume et à votre secteur. La licence est mensuelle selon le volume documentaire et les modules activés — devis personnalisé après audit.",
        ],
        bullets: [
          "Module Numérisation & OCR : import masse, reconnaissance multilingue, correction assistée",
          "Module GED & classement : arborescence, métadonnées, versioning",
          "Module Workflows : circuits de validation, signatures, notifications",
          "Module Archivage légal : rétention, gel légal, export audit",
          "Module Accès & sécurité : rôles, MFA, logs de consultation",
          "Intégration CRM Mohtaoua : lier dossiers clients et pièces jointes",
          "API & connecteurs : ERP, email, scanners réseau",
        ],
      },
      {
        id: "secteurs",
        heading: "Pour quels secteurs au Maroc ?",
        paragraphs: [
          "Archidoc est déployée chez des profils exigeants en confidentialité et en volume documentaire.",
        ],
        bullets: [
          "Cabinets juridiques : dossiers clients, conclusions, pièces, délais",
          "Cabinets comptables : pièces comptables, déclarations, conservation 10 ans",
          "Cliniques & hôpitaux : dossiers patients, comptes-rendus, imagerie (hors PACS)",
          "Administrations & collectivités : courrier, marchés publics, archives",
          "Industries : qualité, conformité, contrats fournisseurs",
        ],
      },
      {
        id: "crm",
        heading: "Archidoc + CRM Mohtaoua : le duo documentaire et commercial",
        paragraphs: [
          "L'archivage ne vit pas en silo. Relier Archidoc au CRM Mohtaoua permet d'associer chaque document à un contact, une opportunité ou un dossier client. Un commercial retrouve le devis signé en un clic ; un comptable accède aux pièces liées à la facture ; un cabinet juridique ouvre le dossier complet depuis la fiche client.",
          "Cette intégration évite la double saisie et garantit que les documents produits par vos campagnes (contrats, KYC, pièces d'identité) sont stockés au bon endroit, avec les bonnes permissions, dès leur réception via formulaire, WhatsApp ou email.",
        ],
      },
      {
        id: "erreurs",
        heading: "Erreurs fréquentes à éviter",
        paragraphs: [
          "Ces erreurs retardent ou font échouer les projets GED au Maroc.",
        ],
        bullets: [
          "Numériser sans plan de classement (on recrée le chaos numérique)",
          "Ignorer la CNDP et les durées légales de conservation",
          "Choisir un hébergement hors Maroc sans analyse des transferts",
          "Oublier la formation des équipes — l'outil reste vide",
          "Négliger les workflows de validation sur documents sensibles",
          "Ne pas prévoir la migration progressive (tout scanner d'un coup)",
        ],
      },
      {
        id: "conclusion",
        heading: "Passez à l'archivage structuré avec Archidoc",
        paragraphs: [
          "L'archivage électronique n'est plus un projet « pour plus tard » : c'est une condition de compétitivité, de conformité et de sérénité face aux audits. Archidoc vous accompagne de l'audit documentaire à la formation, avec une solution hébergée au Maroc et pensée pour l'arabe, le français et les réalités des PME et structures réglementées.",
          "Demandez une démo personnalisée sur la page solution Archidoc ou contactez Mohtaoua pour un audit documentaire gratuit : nous évaluons votre volume, votre cadre légal et vous proposons un plan de déploiement chiffré.",
        ],
      },
    ],
    faqs: [
      {
        question: "Archidoc est-il conforme à la loi 09-08 au Maroc ?",
        answer:
          "Archidoc intègre contrôle d'accès, journal d'audit, chiffrement et hébergement sécurisé au Maroc. La conformité complète dépend aussi de vos processus internes et de vos déclarations CNDP le cas échéant. Nous vous accompagnons sur la mise en conformité technique.",
      },
      {
        question: "L'OCR fonctionne-t-il en arabe et en français ?",
        answer:
          "Oui. Archidoc propose un OCR multilingue arabe, français et anglais avec correction assistée — essentiel pour les documents marocains bilingues.",
      },
      {
        question: "Peut-on conserver la valeur probante des documents ?",
        answer:
          "Archidoc applique horodatage, empreintes et journal d'audit pour renforcer la traçabilité. La valeur probante juridique dépend du type de document et du cadre légal applicable — nous configurons l'archivage selon vos exigences sectorielles.",
      },
      {
        question: "Combien de temps pour déployer Archidoc ?",
        answer:
          "Un pilote sur un département peut être opérationnel en 2 à 3 semaines. Une migration complète se planifie sur 1 à 3 mois selon le volume historique à numériser.",
      },
      {
        question: "Archidoc remplace-t-il un CRM ?",
        answer:
          "Non, Archidoc est une GED d'archivage. Elle se connecte au CRM Mohtaoua pour lier documents et relations clients — le duo couvre archivage et suivi commercial.",
      },
      {
        question: "Quel budget pour Archidoc ?",
        answer:
          "Licence mensuelle selon volume documentaire et modules (OCR, workflows, archivage légal). Devis personnalisé après audit — voir la page /solutions/archidoc.",
      },
    ],
  },
  en: {
    title: "Electronic archiving in Morocco: legal framework, getting started and Archidoc",
    excerpt:
      "Law 09-08, document retention, legal validity: complete guide to digital archiving with Archidoc, Mohtaoua's Morocco-hosted DMS.",
    category: "business",
    overview: {
      what: "Expert guide on electronic archiving in Morocco: legal obligations, startup method, Archidoc benefits (DMS, OCR, workflows) and CRM integration.",
      who: "Executives, IT managers, legal and accounting firms, clinics and public services still managing paper files.",
      benefits: [
        "Understand Moroccan legal framework (CNDP, retention, electronic proof)",
        "4-step migration plan without disrupting operations",
        "Discover Archidoc: multilingual OCR, workflows and compliant archiving",
      ],
      topics: ["Electronic archiving Morocco", "DMS", "Archidoc", "Law 09-08", "OCR", "Legal validity"],
      takeaways: [
        "Paper archiving is costly and risky — digitization is no longer optional",
        "Laws 09-08 and 53-05 frame data protection and electronic exchanges in Morocco",
        "Archidoc combines DMS, OCR, workflows and secure Morocco hosting",
      ],
    },
    sections: [
      {
        id: "intro",
        heading: "Why electronic archiving is now a priority in Morocco",
        paragraphs: [
          "Moroccan businesses produce thousands of documents yearly. Stored in boxes and binders, they become impossible to find when audits or disputes arise. Electronic archiving (DMS) addresses productivity and legal compliance — this guide explains how to start and why Archidoc by Mohtaoua fits the local context.",
        ],
      },
      {
        id: "probleme",
        heading: "The paper file problem",
        paragraphs: ["Without a centralized system, every employee archives differently. Searches take hours, audits fail, and physical storage costs keep rising."],
        bullets: ["Slow search and duplicate versions", "Loss and unauthorized access risks", "Hard to prove compliance", "No secure remote access", "Rising storage costs"],
      },
      {
        id: "cadre-legal",
        heading: "Moroccan legal framework",
        paragraphs: [
          "Law 09-08 (as amended by Law 43-20) governs personal data protection under CNDP supervision. Law 53-05 covers electronic exchange of legal data and electronic signatures. Commercial code imposes retention periods (often 10 years for accounting records). Consult legal counsel for your sector — this is general information.",
        ],
        bullets: ["Law 09-08 + 43-20: data protection", "Law 53-05: electronic proof", "Retention by document type", "Sector-specific rules", "Prefer Morocco hosting for sensitive data"],
      },
      {
        id: "comment-commencer",
        heading: "How to start in 4 steps",
        bullets: [
          "Step 1 — Document audit: types, volumes, departments, legal retention",
          "Step 2 — Classification plan: single tree validated by management",
          "Step 3 — Scan & import: priority history + new flows",
          "Step 4 — Workflows & rights: roles, training, measure search time",
        ],
        paragraphs: ["Progressive migration limits risk and improves team adoption."],
      },
      {
        id: "demo-archidoc",
        heading: "Archidoc video demonstration",
        paragraphs: ["Watch how Archidoc handles import, OCR classification and secure document search — designed for Moroccan organizations."],
        video: { ...VIDEO, caption: "Archidoc demo — DMS, OCR and secure document archiving" },
      },
      {
        id: "archidoc",
        heading: "Archidoc: Mohtaoua's DMS for Morocco",
        paragraphs: [
          "Archidoc digitizes, indexes and secures documents with multilingual OCR, validation workflows, full-text search and compliant archiving. It integrates with Mohtaoua CRM, automation and APIs for ERP connectivity.",
        ],
      },
      {
        id: "avantages",
        heading: "Concrete benefits of Archidoc",
        bullets: [
          "Full-text search in seconds",
          "Less admin time, no more binders",
          "Audit trail, timestamps, role-based access",
          "Lower physical storage costs",
          "Secure remote access",
          "Arabic & French OCR",
          "Secure hosting in Morocco",
        ],
        paragraphs: ["Measurable gains within the first weeks of deployment."],
      },
      {
        id: "options",
        heading: "Archidoc options and modules",
        paragraphs: ["Monthly license based on document volume and modules — custom quote after audit."],
        bullets: [
          "Scanning & OCR module",
          "DMS & classification",
          "Validation workflows",
          "Legal archiving & retention",
          "Access & security roles",
          "Mohtaoua CRM integration",
          "API & connectors",
        ],
      },
      {
        id: "secteurs",
        heading: "Which sectors in Morocco?",
        bullets: ["Law firms", "Accounting firms", "Clinics & hospitals", "Public administration", "Industry & compliance"],
        paragraphs: ["Archidoc serves profiles with high confidentiality and document volume."],
      },
      {
        id: "crm",
        heading: "Archidoc + Mohtaoua CRM",
        paragraphs: [
          "Link every document to a contact, opportunity or client file. Sales finds signed quotes instantly; accounting accesses invoice attachments; law firms open complete case files from the client record.",
        ],
      },
      {
        id: "erreurs",
        heading: "Common mistakes to avoid",
        bullets: [
          "Scanning without a classification plan",
          "Ignoring CNDP and retention rules",
          "Offshore hosting without transfer analysis",
          "Skipping team training",
          "No validation workflows on sensitive docs",
          "Trying to digitize everything at once",
        ],
        paragraphs: ["These mistakes delay or derail DMS projects in Morocco."],
      },
      {
        id: "conclusion",
        heading: "Move to structured archiving with Archidoc",
        paragraphs: [
          "Electronic archiving is a compliance and competitiveness requirement. Request a personalized demo at /solutions/archidoc or contact Mohtaoua for a free document audit.",
        ],
      },
    ],
    faqs: [
      { question: "Is Archidoc compliant with Law 09-08?", answer: "Archidoc includes access control, audit logs, encryption and Morocco hosting. Full compliance also depends on your processes and CNDP declarations if applicable." },
      { question: "Does OCR work in Arabic and French?", answer: "Yes — multilingual OCR with assisted correction for Moroccan bilingual documents." },
      { question: "Can we preserve legal validity?", answer: "Archidoc uses timestamps, hashes and audit trails. Legal validity depends on document type and applicable law." },
      { question: "Deployment timeline?", answer: "Department pilot in 2-3 weeks. Full migration planned over 1-3 months depending on volume." },
      { question: "Does Archidoc replace a CRM?", answer: "No — it's a DMS that connects to Mohtaoua CRM for document-client linking." },
      { question: "Pricing?", answer: "Monthly license by volume and modules. Custom quote after audit on /solutions/archidoc." },
    ],
  },
  ar: {
    title: "الأرشفة الإلكترونية في المغرب: الإطار القانوني والبدء وحل Archidoc",
    excerpt:
      "القانون 09-08، حفظ الوثائق، القيمة القانونية: دليل شامل للأرشفة الرقمية مع Archidoc، نظام إدارة الوثائق من موحتاوا مستضاف في المغرب.",
    category: "business",
    overview: {
      what: "دليل خبير عن الأرشفة الإلكترونية في المغرب: الالتزامات القانونية، طريقة البدء، مزايا Archidoc (GED، OCR، سير العمل) والتكامل مع CRM.",
      who: "المديرون، مسؤولو تقنية المعلومات، مكاتب المحاماة والمحاسبة، العيادات والإدارات التي تدير ملفات ورقية.",
      benefits: [
        "فهم الإطار القانوني المغربي (CNDP، الحفظ، الإثبات الإلكتروني)",
        "خطة هجرة من 4 خطوات",
        "اكتشاف Archidoc: OCR متعدد اللغات وسير عمل وأرشفة متوافقة",
      ],
      topics: ["أرشفة إلكترونية المغرب", "GED", "Archidoc", "قانون 09-08", "OCR", "قيمة قانونية"],
      takeaways: [
        "الأرشفة الورقية مكلفة ومحفوفة بالمخاطر",
        "القوانين 09-08 و53-05 تنظم حماية البيانات والتبادل الإلكتروني",
        "Archidoc يجمع GED وOCR وسير العمل واستضافة آمنة في المغرب",
      ],
    },
    sections: [
      {
        id: "intro",
        heading: "لماذا أصبحت الأرشفة الإلكترونية أولوية في المغرب",
        paragraphs: [
          "الشركات المغربية تنتج آلاف الوثائق سنوياً. مخزنة في صناديق وملفات، تصبح مستحيلة الإيجاد عند التدقيق أو النزاعات. الأرشفة الإلكترونية تعالج الإنتاجية والامتثال — هذا الدليل يشرح كيفية البدء ولماذا Archidoc من Mohtaoua يناسب السياق المحلي.",
        ],
      },
      {
        id: "probleme",
        heading: "مشكلة الملفات الورقية",
        paragraphs: ["بدون نظام مركزي، كل موظف يؤرشف بطريقته. البحث يستغرق ساعات والتكاليف ترتفع."],
        bullets: ["بحث بطيء ونسخ مكررة", "مخاطر الفقدان والوصول غير المصرح", "صعوبة إثبات الامتثال", "لا وصول آمن عن بعد", "تكاليف تخزين متزايدة"],
      },
      {
        id: "cadre-legal",
        heading: "الإطار القانوني المغربي",
        paragraphs: [
          "القانون 09-08 (المعدل بالقانون 43-20) يحكم حماية البيانات الشخصية تحت إشراف CNDP. القانون 53-05 يغطي التبادل الإلكتروني للبيانات القانونية. قانون التجارة يفرض فترات حفظ (غالباً 10 سنوات للمحاسبة). استشر مستشارك القانوني.",
        ],
        bullets: ["قانون 09-08 + 43-20", "قانون 53-05", "الحفظ حسب نوع الوثيقة", "قواعد قطاعية", "استضافة في المغرب للبيانات الحساسة"],
      },
      {
        id: "comment-commencer",
        heading: "البدء في 4 خطوات",
        bullets: [
          "الخطوة 1 — تدقيق الوثائق",
          "الخطوة 2 — خطة التصنيف",
          "الخطوة 3 — المسح والاستيراد",
          "الخطوة 4 — سير العمل والصلاحيات",
        ],
        paragraphs: ["الهجرة التدريجية تحد من المخاطر."],
      },
      {
        id: "demo-archidoc",
        heading: "عرض فيديو Archidoc",
        paragraphs: ["شاهد كيف يتعامل Archidoc مع الاستيراد والتصنيف OCR والبحث الآمن."],
        video: { ...VIDEO, caption: "عرض Archidoc — GED وOCR وأرشفة آمنة" },
      },
      {
        id: "archidoc",
        heading: "Archidoc: نظام إدارة الوثائق من Mohtaoua",
        paragraphs: [
          "Archidoc يرقمن ويفهرس ويؤمن الوثائق مع OCR متعدد اللغات وسير عمل التحقق والبحث الفوري والأرشفة المتوافقة. يتكامل مع CRM Mohtaoua والأتمتة وواجهات API.",
        ],
      },
      {
        id: "avantages",
        heading: "مزايا Archidoc",
        bullets: ["بحث فوري", "توفير وقت إداري", "سجل تدقيق وطوابع زمنية", "تخفيض تكاليف التخزين", "وصول آمن عن بعد", "OCR عربي وفرنسي", "استضافة آمنة في المغرب"],
        paragraphs: ["مكاسب قابلة للقياس في الأسابيع الأولى."],
      },
      {
        id: "options",
        heading: "خيارات ووحدات Archidoc",
        paragraphs: ["ترخيص شهري حسب الحجم — عرض سعر بعد التدقيق."],
        bullets: ["المسح وOCR", "GED والتصنيف", "سير عمل التحقق", "أرشفة قانونية", "الصلاحيات والأمان", "تكامل CRM", "API وموصلات"],
      },
      {
        id: "secteurs",
        heading: "لأي قطاعات؟",
        bullets: ["مكاتب المحاماة", "المحاسبة", "العيادات والمستشفيات", "الإدارة العامة", "الصناعة"],
        paragraphs: ["Archidoc يخدم ملفات عالية السرية والحجم."],
      },
      {
        id: "crm",
        heading: "Archidoc + CRM Mohtaoua",
        paragraphs: ["ربط كل وثيقة بجهة اتصال أو ملف عميل. المبيعات تجد العروض الموقعة فوراً؛ المحاسبة تصل للمرفقات."],
      },
      {
        id: "erreurs",
        heading: "أخطاء شائعة",
        bullets: ["المسح بدون خطة تصنيف", "تجاهل CNDP", "استضافة خارجية دون تحليل", "عدم تدريب الفريق", "لا سير عمل للتحقق", "رقمنة كل شيء دفعة واحدة"],
        paragraphs: ["هذه الأخطاء تؤخر مشاريع GED."],
      },
      {
        id: "conclusion",
        heading: "انتقل إلى أرشفة منظمة مع Archidoc",
        paragraphs: ["اطلب عرضاً على /solutions/archidoc أو تدقيقاً مجانياً من Mohtaoua."],
      },
    ],
    faqs: [
      { question: "هل Archidoc متوافق مع القانون 09-08؟", answer: "يتضمن التحكم في الوصول وسجلات التدقيق والتشفير والاستضافة في المغرب." },
      { question: "هل OCR يعمل بالعربية والفرنسية؟", answer: "نعم — OCR متعدد اللغات مع تصحيح مساعد." },
      { question: "القيمة القانونية؟", answer: "Archidoc يستخدم الطوابع الزمنية وبصمات وسجلات التدقيق." },
      { question: "مدة النشر؟", answer: "تجريبي في 2-3 أسابيع. هجرة كاملة 1-3 أشهر." },
      { question: "هل يحل محل CRM؟", answer: "لا — GED يتصل بـ CRM Mohtaoua." },
      { question: "التسعير؟", answer: "ترخيص شهري حسب الحجم. عرض على /solutions/archidoc." },
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
