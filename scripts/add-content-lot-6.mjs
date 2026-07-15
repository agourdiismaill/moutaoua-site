#!/usr/bin/env node
/**
 * Lot 6 — 2 comparaisons + 3 guides (FR/EN/AR).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["fr", "en", "ar"];

const compareContent = {
  fr: {
    newItems: {
      "erp-vs-crm": {
        title: "ERP vs CRM : quel outil pour structurer votre entreprise ?",
        description:
          "Comparer ERP (gestion opérationnelle) et CRM (relation client) pour choisir le bon socle digital au Maroc.",
        columns: { criteria: "Critère", left: "ERP", right: "CRM" },
        rows: [
          { criteria: "Objectif principal", left: "Piloter stocks, achats, production, finance", right: "Suivre leads, opportunités et relation client" },
          { criteria: "Utilisateurs types", left: "Direction, finance, logistique, opérations", right: "Commercial, marketing, support, direction" },
          { criteria: "Données clés", left: "Commandes, stocks, facturation, coûts", right: "Contacts, pipeline, historique interactions" },
          { criteria: "Automatisation", left: "Workflows métier et alertes opérationnelles", right: "Relances, séquences, scoring leads" },
          { criteria: "Intégrations", left: "Comptabilité, entrepôt, production", right: "Formulaires, Ads, WhatsApp, email" },
          { criteria: "Meilleur pour", left: "PME avec flux opérationnels complexes", right: "Équipes commerciales qui veulent convertir plus" },
        ],
        verdict:
          "ERP et CRM ne sont pas interchangeables : l'ERP structure vos opérations internes, le CRM accélère la conversion commerciale. La plupart des entreprises en croissance finissent par combiner les deux.",
        faqs: [
          {
            question: "Dois-je commencer par un ERP ou un CRM ?",
            answer: "Si votre priorité est de convertir et suivre les leads, commencez par un CRM (crm-data). Si votre goulot est la gestion opérationnelle (stocks, production, facturation), l'ERP est prioritaire.",
          },
          {
            question: "Un CRM peut-il remplacer un ERP ?",
            answer: "Non. Un CRM ne gère pas la production, les stocks ni la comptabilité opérationnelle. Il complète l'ERP en reliant la vente à l'exécution.",
          },
          {
            question: "Mohtaoua accompagne-t-elle les deux ?",
            answer: "Oui : service ERP sur mesure, service CRM & data, et solution CRM packagée pour démarrer rapidement.",
          },
        ],
      },
      "flutter-vs-react-native": {
        title: "Flutter vs React Native : quelle techno mobile choisir ?",
        description:
          "Comparer Flutter et React Native pour qualifier votre application mobile cross-platform au Maroc.",
        columns: { criteria: "Critère", left: "Flutter", right: "React Native" },
        rows: [
          { criteria: "Langage", left: "Dart", right: "JavaScript / TypeScript" },
          { criteria: "Rendu UI", left: "Moteur Skia (UI native-like)", right: "Pont vers composants natifs" },
          { criteria: "Performance", left: "Très stable, animations fluides", right: "Bonne, dépend du pont natif" },
          { criteria: "Écosystème", left: "Google, croissance rapide", right: "Meta, large communauté JS" },
          { criteria: "Time-to-market", left: "Rapide avec UI cohérente", right: "Rapide si équipe React existante" },
          { criteria: "Meilleur pour", left: "Apps produit avec UI soignée", right: "Apps si vous avez déjà du React/web" },
        ],
        verdict:
          "Flutter excelle pour une expérience UI homogène et performante. React Native est pertinent si votre équipe maîtrise déjà JavaScript. Les deux permettent iOS + Android avec une seule base de code.",
        faqs: [
          {
            question: "Flutter ou React Native pour une startup ?",
            answer: "Flutter si vous visez une UI premium et une base unique robuste. React Native si vous capitalisez sur une équipe React existante.",
          },
          {
            question: "Peut-on publier sur iOS et Android avec les deux ?",
            answer: "Oui. Mohtaoua livre sur les deux stores avec Flutter ou React Native, selon votre stack et vos contraintes.",
          },
          {
            question: "Quel budget pour une app mobile au Maroc ?",
            answer: "Consultez notre page prix application mobile pour des fourchettes par complexité (MVP, standard, premium).",
          },
        ],
      },
    },
  },
  en: {
    newItems: {
      "erp-vs-crm": {
        title: "ERP vs CRM: which system should structure your business?",
        description:
          "Compare ERP (operations) and CRM (customer relationship) to choose the right digital foundation in Morocco.",
        columns: { criteria: "Criterion", left: "ERP", right: "CRM" },
        rows: [
          { criteria: "Main goal", left: "Manage inventory, purchasing, production, finance", right: "Track leads, opportunities and customer relationships" },
          { criteria: "Typical users", left: "Management, finance, logistics, operations", right: "Sales, marketing, support, management" },
          { criteria: "Key data", left: "Orders, stock, invoicing, costs", right: "Contacts, pipeline, interaction history" },
          { criteria: "Automation", left: "Business workflows and operational alerts", right: "Follow-ups, sequences, lead scoring" },
          { criteria: "Integrations", left: "Accounting, warehouse, production", right: "Forms, Ads, WhatsApp, email" },
          { criteria: "Best for", left: "SMEs with complex operational flows", right: "Sales teams focused on conversion" },
        ],
        verdict:
          "ERP and CRM are not interchangeable: ERP structures internal operations, CRM accelerates commercial conversion. Growing businesses usually combine both.",
        faqs: [
          {
            question: "Should I start with ERP or CRM?",
            answer: "If your priority is converting and tracking leads, start with CRM (crm-data). If operations (stock, production, invoicing) is the bottleneck, ERP comes first.",
          },
          {
            question: "Can a CRM replace an ERP?",
            answer: "No. A CRM does not manage production, inventory or operational accounting. It complements ERP by linking sales to execution.",
          },
          {
            question: "Does Mohtaoua support both?",
            answer: "Yes: custom ERP service, CRM & data service, and a packaged CRM solution to get started quickly.",
          },
        ],
      },
      "flutter-vs-react-native": {
        title: "Flutter vs React Native: which mobile stack to choose?",
        description:
          "Compare Flutter and React Native to qualify your cross-platform mobile app project in Morocco.",
        columns: { criteria: "Criterion", left: "Flutter", right: "React Native" },
        rows: [
          { criteria: "Language", left: "Dart", right: "JavaScript / TypeScript" },
          { criteria: "UI rendering", left: "Skia engine (native-like UI)", right: "Bridge to native components" },
          { criteria: "Performance", left: "Very stable, smooth animations", right: "Good, depends on native bridge" },
          { criteria: "Ecosystem", left: "Google, fast growth", right: "Meta, large JS community" },
          { criteria: "Time-to-market", left: "Fast with consistent UI", right: "Fast if you already have React/web" },
          { criteria: "Best for", left: "Product apps with polished UI", right: "Apps when your team already knows React" },
        ],
        verdict:
          "Flutter excels for homogeneous, high-performance UI. React Native makes sense if your team already masters JavaScript. Both support iOS + Android from one codebase.",
        faqs: [
          {
            question: "Flutter or React Native for a startup?",
            answer: "Flutter for premium UI and a robust single codebase. React Native if you leverage an existing React team.",
          },
          {
            question: "Can both publish to iOS and Android?",
            answer: "Yes. Mohtaoua ships to both stores with Flutter or React Native, depending on your stack and constraints.",
          },
          {
            question: "What budget for a mobile app in Morocco?",
            answer: "See our mobile app pricing page for ranges by complexity (MVP, standard, premium).",
          },
        ],
      },
    },
  },
  ar: {
    newItems: {
      "erp-vs-crm": {
        title: "ERP مقابل CRM: أي أداة لتنظيم شركتك؟",
        description:
          "مقارنة ERP (العمليات) وCRM (علاقة العملاء) لاختيار الأساس الرقمي المناسب في المغرب.",
        columns: { criteria: "المعيار", left: "ERP", right: "CRM" },
        rows: [
          { criteria: "الهدف الرئيسي", left: "إدارة المخزون والمشتريات والإنتاج والمالية", right: "تتبع العملاء المحتملين والفرص وعلاقة العملاء" },
          { criteria: "المستخدمون", left: "الإدارة، المالية، اللوجستيك، العمليات", right: "المبيعات، التسويق، الدعم، الإدارة" },
          { criteria: "البيانات الأساسية", left: "الطلبات، المخزون، الفوترة، التكاليف", right: "جهات الاتصال، مسار المبيعات، سجل التفاعلات" },
          { criteria: "الأتمتة", left: "سير عمل تشغيلي وتنبيهات", right: "متابعات، تسلسلات، تسجيل العملاء المحتملين" },
          { criteria: "التكاملات", left: "المحاسبة، المستودع، الإنتاج", right: "النماذج، الإعلانات، واتساب، البريد" },
          { criteria: "الأنسب لـ", left: "شركات بعمليات معقدة", right: "فرق مبيعات تركز على التحويل" },
        ],
        verdict:
          "ERP وCRM ليسا بديلين لبعضهما: ERP ينظم العمليات الداخلية وCRM يسرّع التحويل التجاري. معظم الشركات النامية تجمع بينهما.",
        faqs: [
          {
            question: "هل أبدأ بـ ERP أم CRM؟",
            answer: "إذا كانت أولويتك تحويل العملاء المحتملين، ابدأ بـ CRM (crm-data). إذا كانت العمليات (المخزون، الإنتاج، الفوترة) هي العائق، فالأولوية لـ ERP.",
          },
          {
            question: "هل يمكن لـ CRM أن يحل محل ERP؟",
            answer: "لا. CRM لا يدير الإنتاج ولا المخزون ولا المحاسبة التشغيلية. بل يكمل ERP بربط المبيعات بالتنفيذ.",
          },
          {
            question: "هل ترافقكم Mohtaoua في الاثنين؟",
            answer: "نعم: خدمة ERP مخصصة، خدمة CRM والبيانات، وحل CRM جاهز للانطلاق السريع.",
          },
        ],
      },
      "flutter-vs-react-native": {
        title: "Flutter مقابل React Native: أي تقنية موبايل تختار؟",
        description:
          "مقارنة Flutter وReact Native لتأهيل مشروع تطبيق موبايل متعدد المنصات في المغرب.",
        columns: { criteria: "المعيار", left: "Flutter", right: "React Native" },
        rows: [
          { criteria: "اللغة", left: "Dart", right: "JavaScript / TypeScript" },
          { criteria: "عرض الواجهة", left: "محرك Skia (واجهة شبه أصلية)", right: "جسر نحو مكونات أصلية" },
          { criteria: "الأداء", left: "مستقر جداً، حركات سلسة", right: "جيد، يعتمد على الجسر الأصلي" },
          { criteria: "النظام البيئي", left: "Google، نمو سريع", right: "Meta، مجتمع JS واسع" },
          { criteria: "سرعة الإطلاق", left: "سريع بواجهة متسقة", right: "سريع إذا كان لديك فريق React" },
          { criteria: "الأنسب لـ", left: "تطبيقات منتج بواجهة راقية", right: "تطبيقات مع فريق React موجود" },
        ],
        verdict:
          "Flutter ممتاز لتجربة واجهة متجانسة وعالية الأداء. React Native مناسب إذا أتقن فريقك JavaScript. كلاهما يدعم iOS وAndroid من قاعدة واحدة.",
        faqs: [
          {
            question: "Flutter أم React Native للشركات الناشئة؟",
            answer: "Flutter لواجهة متميزة وقاعدة قوية. React Native إذا استفدتم من فريق React موجود.",
          },
          {
            question: "هل يمكن النشر على iOS وAndroid مع الاثنين؟",
            answer: "نعم. Mohtaoua تنشر على المتجرين مع Flutter أو React Native حسب احتياجاتكم.",
          },
          {
            question: "ما ميزانية تطبيق موبايل في المغرب؟",
            answer: "راجعوا صفحة أسعار تطبيقات الموبايل لنطاقات حسب التعقيد (MVP، قياسي، متميز).",
          },
        ],
      },
    },
  },
};

const guideContent = {
  fr: {
    newItems: {
      "comment-creer-site-web-professionnel": {
        title: "Comment créer un site web professionnel au Maroc",
        description:
          "Étapes concrètes pour lancer un site corporate crédible : cadrage, contenu, design, technique et mise en ligne.",
        steps: [
          "Définir l'objectif business (leads, ventes, notoriété) et le persona",
          "Structurer l'arborescence (accueil, services, preuves, contact)",
          "Rédiger des contenus clairs orientés conversion",
          "Choisir design responsive aligné à votre identité",
          "Développer sur une stack performante (Next.js recommandé)",
          "Configurer SEO technique, analytics et formulaires",
          "Tester mobile, vitesse et parcours contact avant mise en ligne",
        ],
        mistakes: [
          "Copier un template sans stratégie de conversion",
          "Négliger la vitesse mobile et le SEO de base",
          "Oublier les preuves sociales et appels à l'action",
        ],
        faqs: [
          {
            question: "Combien de pages minimum pour un site pro ?",
            answer: "Souvent 5 à 8 pages structurées : accueil, services, à propos, réalisations, blog/ressources, contact.",
          },
          {
            question: "WordPress ou développement sur mesure ?",
            answer: "CMS pour un site simple ; Next.js/sur-mesure dès que performance, SEO et évolutivité sont critiques.",
          },
        ],
      },
      "combien-coute-site-web-maroc": {
        title: "Combien coûte un site web au Maroc ?",
        description:
          "Fourchettes de prix réalistes selon le type de site, les fonctionnalités et le niveau d'accompagnement.",
        steps: [
          "Identifier le type de site (vitrine, corporate, e-commerce, plateforme)",
          "Lister les fonctionnalités indispensables vs optionnelles",
          "Estimer le contenu (rédaction, photos, traductions)",
          "Comparer prestataire freelance vs agence 360°",
          "Demander un devis détaillé par postes (design, dev, SEO, maintenance)",
          "Prévoir un budget maintenance et évolutions annuelles",
        ],
        mistakes: [
          "Comparer uniquement le prix initial sans maintenance",
          "Sous-estimer la rédaction et les visuels",
          "Choisir la solution la moins chère sans audit technique",
        ],
        faqs: [
          {
            question: "Quel budget pour un site vitrine corporate ?",
            answer: "En général entre 6 000 et 35 000 MAD selon design, contenus et intégrations. Voir notre page prix création site web.",
          },
          {
            question: "Le SEO est-il inclus dans le prix du site ?",
            answer: "Le socle technique SEO oui ; la stratégie SEO continue est souvent un budget mensuel séparé.",
          },
        ],
      },
      "guide-marketing-digital-maroc": {
        title: "Guide marketing digital au Maroc",
        description:
          "Feuille de route pour structurer acquisition, conversion et fidélisation : canaux, outils et priorités budget.",
        steps: [
          "Clarifier objectifs et KPIs (leads, CA, coût d'acquisition)",
          "Cartographier parcours client (awareness → conversion → fidélisation)",
          "Choisir les canaux prioritaires (Meta, Google, SEO, email, WhatsApp)",
          "Mettre en place tracking et CRM pour mesurer chaque euro",
          "Créer landing pages et contenus alignés à l'intention",
          "Tester, optimiser hebdomadairement, scaler ce qui fonctionne",
        ],
        mistakes: [
          "Disperser le budget sur trop de canaux sans data",
          "Envoyer le trafic vers la page d'accueil générique",
          "Ignorer le nurturing post-lead (email, WhatsApp, retargeting)",
        ],
        faqs: [
          {
            question: "Par quel canal commencer au Maroc ?",
            answer: "Meta Ads pour créer la demande, Google Ads si votre offre est déjà recherchée, SEO en parallèle pour le moyen terme.",
          },
          {
            question: "Quel budget marketing digital minimum ?",
            answer: "À partir de 8 000 MAD/mois hors média pour une exécution structurée ; le média varie selon secteur et objectifs.",
          },
        ],
      },
    },
  },
  en: {
    newItems: {
      "comment-creer-site-web-professionnel": {
        title: "How to create a professional website in Morocco",
        description:
          "Concrete steps to launch a credible corporate site: scope, content, design, tech and go-live.",
        steps: [
          "Define business goal (leads, sales, awareness) and persona",
          "Structure site map (home, services, proof, contact)",
          "Write clear conversion-oriented copy",
          "Choose responsive design aligned with your brand",
          "Build on a performant stack (Next.js recommended)",
          "Set up technical SEO, analytics and forms",
          "Test mobile, speed and contact flow before launch",
        ],
        mistakes: [
          "Copying a template without conversion strategy",
          "Neglecting mobile speed and basic SEO",
          "Forgetting social proof and clear calls to action",
        ],
        faqs: [
          {
            question: "How many pages for a pro site?",
            answer: "Often 5 to 8 structured pages: home, services, about, work, blog/resources, contact.",
          },
          {
            question: "WordPress or custom development?",
            answer: "CMS for a simple site; Next.js/custom when performance, SEO and scalability matter.",
          },
        ],
      },
      "combien-coute-site-web-maroc": {
        title: "How much does a website cost in Morocco?",
        description:
          "Realistic price ranges by site type, features and level of agency support.",
        steps: [
          "Identify site type (brochure, corporate, e-commerce, platform)",
          "List must-have vs optional features",
          "Estimate content (copy, photos, translations)",
          "Compare freelancer vs 360° agency",
          "Request a detailed quote (design, dev, SEO, maintenance)",
          "Plan annual maintenance and evolution budget",
        ],
        mistakes: [
          "Comparing upfront price only without maintenance",
          "Underestimating copy and visuals",
          "Choosing the cheapest option without technical audit",
        ],
        faqs: [
          {
            question: "Budget for a corporate brochure site?",
            answer: "Typically 6,000 to 35,000 MAD depending on design, content and integrations. See our website creation pricing page.",
          },
          {
            question: "Is SEO included in the site price?",
            answer: "Technical SEO foundation yes; ongoing SEO strategy is usually a separate monthly budget.",
          },
        ],
      },
      "guide-marketing-digital-maroc": {
        title: "Digital marketing guide for Morocco",
        description:
          "Roadmap to structure acquisition, conversion and retention: channels, tools and budget priorities.",
        steps: [
          "Clarify goals and KPIs (leads, revenue, acquisition cost)",
          "Map customer journey (awareness → conversion → retention)",
          "Pick priority channels (Meta, Google, SEO, email, WhatsApp)",
          "Set up tracking and CRM to measure every dirham",
          "Create landing pages and content matched to intent",
          "Test, optimize weekly, scale what works",
        ],
        mistakes: [
          "Spreading budget across too many channels without data",
          "Sending traffic to a generic homepage",
          "Ignoring post-lead nurturing (email, WhatsApp, retargeting)",
        ],
        faqs: [
          {
            question: "Which channel to start with in Morocco?",
            answer: "Meta Ads to create demand, Google Ads if your offer is already searched, SEO in parallel for mid-term.",
          },
          {
            question: "Minimum digital marketing budget?",
            answer: "From 8,000 MAD/month excl. media for structured execution; media varies by sector and goals.",
          },
        ],
      },
    },
  },
  ar: {
    newItems: {
      "comment-creer-site-web-professionnel": {
        title: "كيفية إنشاء موقع ويب احترافي في المغرب",
        description:
          "خطوات عملية لإطلاق موقع مؤسسي موثوق: التحديد، المحتوى، التصميم، التقنية والنشر.",
        steps: [
          "تحديد الهدف التجاري (عملاء محتملون، مبيعات، شهرة) والشخصية المستهدفة",
          "هيكلة خريطة الموقع (الرئيسية، الخدمات، الإثباتات، الاتصال)",
          "كتابة محتوى واضح موجه للتحويل",
          "اختيار تصميم متجاوب متوافق مع الهوية",
          "التطوير على تقنية عالية الأداء (Next.js موصى به)",
          "إعداد SEO تقني والتحليلات والنماذج",
          "اختبار الموبايل والسرعة ومسار الاتصال قبل الإطلاق",
        ],
        mistakes: [
          "نسخ قالب دون استراتيجية تحويل",
          "إهمال سرعة الموبايل وSEO الأساسي",
          "نسيان الإثبات الاجتماعي ودعوات الإجراء",
        ],
        faqs: [
          {
            question: "كم صفحة كحد أدنى لموقع احترافي؟",
            answer: "غالباً 5 إلى 8 صفحات: الرئيسية، الخدمات، من نحن، الأعمال، مدونة/موارد، اتصال.",
          },
          {
            question: "WordPress أم تطوير مخصص؟",
            answer: "CMS للمواقع البسيطة؛ Next.js/مخصص عندما تكون الأداء وSEO والتوسع حاسمة.",
          },
        ],
      },
      "combien-coute-site-web-maroc": {
        title: "كم يكلف موقع ويب في المغرب؟",
        description:
          "نطاقات أسعار واقعية حسب نوع الموقع والميزات ومستوى المرافقة.",
        steps: [
          "تحديد نوع الموقع (تعريفي، مؤسسي، تجارة إلكترونية، منصة)",
          "سرد الميزات الأساسية مقابل الاختيارية",
          "تقدير المحتوى (نصوص، صور، ترجمات)",
          "مقارنة مستقل مقابل وكالة 360°",
          "طلب عرض مفصل (تصميم، تطوير، SEO، صيانة)",
          "تخطيط ميزانية صيانة وتطور سنوية",
        ],
        mistakes: [
          "مقارنة السعر الأولي فقط دون الصيانة",
          "التقليل من تكلفة المحتوى والمرئيات",
          "اختيار الأرخص دون تدقيق تقني",
        ],
        faqs: [
          {
            question: "ما ميزانية موقع مؤسسي تعريفي؟",
            answer: "عادة بين 6 000 و35 000 درهم حسب التصميم والمحتوى والتكاملات. راجعوا صفحة أسعار إنشاء المواقع.",
          },
          {
            question: "هل SEO مشمول في سعر الموقع؟",
            answer: "الأساس التقني لـ SEO نعم؛ الاستراتيجية المستمرة غالباً ميزانية شهرية منفصلة.",
          },
        ],
      },
      "guide-marketing-digital-maroc": {
        title: "دليل التسويق الرقمي في المغرب",
        description:
          "خارطة طريق لتنظيم الاستحواذ والتحويل والولاء: القنوات والأدوات وأولويات الميزانية.",
        steps: [
          "توضيح الأهداف ومؤشرات الأداء (عملاء محتملون، إيرادات، تكلفة الاستحواذ)",
          "رسم رحلة العميل (الوعي → التحويل → الولاء)",
          "اختيار القنوات ذات الأولوية (Meta، Google، SEO، بريد، واتساب)",
          "إعداد التتبع وCRM لقياس كل درهم",
          "إنشاء صفحات هبوط ومحتوى متوافق مع النية",
          "اختبار وتحسين أسبوعي وتوسيع ما ينجح",
        ],
        mistakes: [
          "توزيع الميزانية على قنوات كثيرة دون بيانات",
          "إرسال الزيارات إلى الصفحة الرئيسية العامة",
          "إهمال المتابعة بعد العميل المحتمل (بريد، واتساب، إعادة استهداف)",
        ],
        faqs: [
          {
            question: "بأي قناة نبدأ في المغرب؟",
            answer: "Meta Ads لخلق الطلب، Google Ads إذا كان عرضكم مطلوباً، SEO بالتوازي للمدى المتوسط.",
          },
          {
            question: "ما الحد الأدنى لميزانية التسويق الرقمي؟",
            answer: "من 8 000 درهم/شهر باستثناء الإعلانات لتنفيذ منظم؛ الإعلانات تختلف حسب القطاع والأهداف.",
          },
        ],
      },
    },
  },
};

for (const locale of LOCALES) {
  const comparePath = join(root, `messages/${locale}/compare.json`);
  const compare = JSON.parse(readFileSync(comparePath, "utf8"));
  Object.assign(compare.items, compareContent[locale].newItems);
  writeFileSync(comparePath, `${JSON.stringify(compare, null, 2)}\n`);

  const guidesPath = join(root, `messages/${locale}/guides.json`);
  const guides = JSON.parse(readFileSync(guidesPath, "utf8"));
  Object.assign(guides.items, guideContent[locale].newItems);
  writeFileSync(guidesPath, `${JSON.stringify(guides, null, 2)}\n`);

  console.log(`[OK] ${locale} compare + guides`);
}

console.log("Lot 6 content written.");
