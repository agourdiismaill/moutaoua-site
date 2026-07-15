#!/usr/bin/env node
/**
 * Lot 5 — 2 pages pricing Ads + 3 comparaisons + migration colonnes compare.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["fr", "en", "ar"];

function migrateMetaAdsRows(rows) {
  return rows.map(({ criteria, meta, google, left, right }) => ({
    criteria,
    left: left ?? meta,
    right: right ?? google,
  }));
}

const compareContent = {
  fr: {
    labels: { criteria: "Critère", verdict: "Verdict :", faq: "Questions fréquentes" },
    metaRows: migrateMetaAdsRows([
      { criteria: "Type de demande", meta: "Demande créée (interruption)", google: "Demande existante (recherche)" },
      { criteria: "Délai premiers leads", meta: "7-14 jours", google: "3-10 jours" },
      { criteria: "CPL moyen", meta: "Souvent plus bas en volume", google: "Souvent plus qualifié" },
      { criteria: "Format créatif", meta: "Vidéo, image, carrousel", google: "Texte, extensions" },
      { criteria: "Meilleur pour", meta: "Lancement, notoriété, promo", google: "Offres recherchées" },
      { criteria: "Budget minimum conseillé", meta: "8 000 MAD/mois", google: "6 000 MAD/mois" },
    ]),
    newItems: {
      "seo-vs-google-ads": {
        title: "SEO vs Google Ads : organique ou payant ?",
        description: "Comparaison pour entreprises au Maroc : délai, coût, contrôle et complémentarité entre référencement naturel et publicité Google.",
        columns: { criteria: "Critère", left: "SEO", right: "Google Ads" },
        rows: [
          { criteria: "Type de trafic", left: "Organique (gratuit au clic)", right: "Payant (enchères)" },
          { criteria: "Délai premiers résultats", left: "3 à 12 mois", right: "Quelques jours" },
          { criteria: "Coût récurrent", left: "Honoraires SEO mensuels", right: "Budget média + gestion" },
          { criteria: "Contrôle du positionnement", left: "Indirect (algorithmes)", right: "Direct (enchères, budgets)" },
          { criteria: "Durabilité", left: "Effet cumulatif long terme", right: "S'arrête si budget coupé" },
          { criteria: "Meilleur pour", left: "Notoriété durable, autorité", right: "Leads immédiats, offres recherchées" },
        ],
        verdict: "Les deux sont complémentaires : Google Ads pour l'immédiat et le test de messages ; SEO pour construire une visibilité durable et réduire la dépendance au paid.",
        faqs: [
          { question: "Dois-je choisir entre SEO et Google Ads ?", answer: "Non. La plupart des PME performantes combinent les deux : Ads pour générer des leads rapidement, SEO pour consolider la présence organique." },
          { question: "Le SEO remplace-t-il Google Ads ?", answer: "Non. Le SEO met du temps à produire des résultats significatifs. Google Ads comble ce délai et permet de tester mots-clés et landing pages." },
          { question: "Quel budget prioriser au démarrage ?", answer: "Si votre offre est déjà recherchée, commencez par Google Ads. Parallèlement, lancez un socle SEO (technique + contenus) pour le moyen terme." },
        ],
      },
      "wordpress-vs-laravel": {
        title: "WordPress vs Laravel : quel choix pour votre projet web ?",
        description: "Comparer CMS vitrine (WordPress) et développement sur mesure (Laravel/Next.js) pour qualifier votre besoin au Maroc.",
        columns: { criteria: "Critère", left: "WordPress / CMS", right: "Laravel / sur-mesure" },
        rows: [
          { criteria: "Cas d'usage idéal", left: "Site vitrine, blog, petite boutique", right: "Plateforme métier, logique complexe" },
          { criteria: "Délai de mise en ligne", left: "Rapide (semaines)", right: "Plus long (mois)" },
          { criteria: "Coût initial", left: "Généralement plus bas", right: "Investissement plus élevé" },
          { criteria: "Évolutivité technique", left: "Limitée par les plugins", right: "Architecture scalable" },
          { criteria: "Performance & sécurité", left: "Dépend des extensions", right: "Contrôle total du code" },
          { criteria: "Maintenance", left: "Mises à jour plugins/thème", right: "Maintenance applicative dédiée" },
        ],
        verdict: "WordPress convient aux sites vitrine et contenus simples. Laravel (ou Next.js chez Mohtaoua) est pertinent dès que votre projet devient un vrai produit métier avec workflows, intégrations et montée en charge.",
        faqs: [
          { question: "Mohtaoua développe-t-elle en WordPress ?", answer: "Nous privilégions Next.js pour les sites corporate et les plateformes performantes. WordPress reste une référence marché que nous comparons pour vous aider à cadrer le bon niveau de projet." },
          { question: "Puis-je migrer de WordPress vers du sur-mesure ?", answer: "Oui. Nous auditons contenus, SEO et intégrations avant une migration progressive pour préserver le trafic et les conversions." },
          { question: "Comment savoir lequel choisir ?", answer: "Si vous avez surtout besoin de pages éditoriales et d'un blog, un CMS suffit. Si vous avez des rôles utilisateurs, API, paiements ou règles métier, partez sur du sur-mesure." },
        ],
      },
      "crm-vs-excel": {
        title: "CRM vs Excel : pourquoi structurer votre suivi commercial ?",
        description: "Comprendre les limites d'Excel pour la gestion des leads et prospects, et quand passer à un CRM structuré.",
        columns: { criteria: "Critère", left: "Excel / tableur", right: "CRM structuré" },
        rows: [
          { criteria: "Suivi des leads", left: "Listes manuelles, versions multiples", right: "Pipeline visuel, historique centralisé" },
          { criteria: "Rappels & relances", left: "Aucun automatique", right: "Tâches, notifications, séquences" },
          { criteria: "Collaboration équipe", left: "Conflits de versions", right: "Accès par rôle, une source de vérité" },
          { criteria: "Reporting", left: "Tableaux croisés à maintenir", right: "Tableaux de bord temps réel" },
          { criteria: "Intégrations", left: "Imports/exports manuels", right: "Formulaires, Ads, WhatsApp, email" },
          { criteria: "Scalabilité", left: "Devient ingérable au-delà de ~100 leads actifs", right: "Conçu pour volumes croissants" },
        ],
        verdict: "Excel reste utile pour des analyses ponctuelles, mais un CRM devient indispensable dès que plusieurs personnes gèrent des leads, que les relances sont critiques et que vous voulez mesurer votre pipeline. Les deux peuvent coexister : CRM pour l'opérationnel, Excel pour des exports ponctuels.",
        faqs: [
          { question: "Excel est-il « mauvais » pour gérer des leads ?", answer: "Non pour démarrer très petit. Il devient risqué quand l'équipe grandit : oublis de relance, doublons, absence de vision pipeline." },
          { question: "Quand passer au CRM ?", answer: "Dès que vous perdez des opportunités faute de suivi, que plusieurs commerciaux interviennent ou que vous lancez des campagnes Ads/WhatsApp avec volume de leads." },
          { question: "Quel lien avec Mohtaoua CRM ?", answer: "Notre service CRM-data et la solution CRM Mohtaoua couvrent structuration, intégrations et automatisation — au-delà d'un simple tableur." },
        ],
      },
    },
  },
  en: {
    labels: { criteria: "Criterion", verdict: "Verdict:", faq: "Frequently asked questions" },
    metaRows: migrateMetaAdsRows([
      { criteria: "Type of demand", meta: "Created demand (interruption)", google: "Existing demand (search)" },
      { criteria: "Time to first leads", meta: "7-14 days", google: "3-10 days" },
      { criteria: "Average CPL", meta: "Often lower in volume", google: "Often more qualified" },
      { criteria: "Creative format", meta: "Video, image, carousel", google: "Text, extensions" },
      { criteria: "Best for", meta: "Launch, awareness, promotion", google: "Searched offers" },
      { criteria: "Recommended minimum budget", meta: "8,000 MAD/month", google: "6,000 MAD/month" },
    ]),
    newItems: {
      "seo-vs-google-ads": {
        title: "SEO vs Google Ads: organic or paid?",
        description: "Comparison for businesses in Morocco: timeline, cost, control and how organic search complements paid Google.",
        columns: { criteria: "Criterion", left: "SEO", right: "Google Ads" },
        rows: [
          { criteria: "Traffic type", left: "Organic (no cost per click)", right: "Paid (auctions)" },
          { criteria: "Time to first results", left: "3 to 12 months", right: "A few days" },
          { criteria: "Recurring cost", left: "Monthly SEO fees", right: "Media budget + management" },
          { criteria: "Ranking control", left: "Indirect (algorithms)", right: "Direct (bids, budgets)" },
          { criteria: "Durability", left: "Cumulative long-term effect", right: "Stops when budget stops" },
          { criteria: "Best for", left: "Durable authority", right: "Immediate leads, searched offers" },
        ],
        verdict: "Both complement each other: Google Ads for immediacy and message testing; SEO for durable visibility and less paid dependency.",
        faqs: [
          { question: "Should I choose between SEO and Google Ads?", answer: "No. Most performing SMEs combine both: Ads for quick leads, SEO to build organic presence." },
          { question: "Does SEO replace Google Ads?", answer: "No. SEO takes time. Google Ads bridges the gap and helps test keywords and landing pages." },
          { question: "Which budget to prioritize at launch?", answer: "If your offer is already searched, start with Google Ads. In parallel, launch an SEO foundation for the medium term." },
        ],
      },
      "wordpress-vs-laravel": {
        title: "WordPress vs Laravel: which choice for your web project?",
        description: "Compare brochure CMS (WordPress) and custom development (Laravel/Next.js) to qualify your needs in Morocco.",
        columns: { criteria: "Criterion", left: "WordPress / CMS", right: "Laravel / custom" },
        rows: [
          { criteria: "Ideal use case", left: "Brochure site, blog, small shop", right: "Business platform, complex logic" },
          { criteria: "Time to launch", left: "Fast (weeks)", right: "Longer (months)" },
          { criteria: "Initial cost", left: "Generally lower", right: "Higher investment" },
          { criteria: "Technical scalability", left: "Limited by plugins", right: "Scalable architecture" },
          { criteria: "Performance & security", left: "Depends on extensions", right: "Full code control" },
          { criteria: "Maintenance", left: "Plugin/theme updates", right: "Dedicated app maintenance" },
        ],
        verdict: "WordPress suits simple brochure and content sites. Laravel (or Next.js at Mohtaoua) makes sense when the project becomes a real business product with workflows, integrations and scale.",
        faqs: [
          { question: "Does Mohtaoua develop in WordPress?", answer: "We favor Next.js for corporate sites and performant platforms. WordPress remains a market reference we compare to help you scope the right project level." },
          { question: "Can I migrate from WordPress to custom?", answer: "Yes. We audit content, SEO and integrations before a progressive migration to preserve traffic and conversions." },
          { question: "How do I know which to choose?", answer: "If you mainly need editorial pages and a blog, a CMS is enough. If you have user roles, APIs, payments or business rules, go custom." },
        ],
      },
      "crm-vs-excel": {
        title: "CRM vs Excel: why structure your sales follow-up?",
        description: "Understand Excel limits for lead tracking and when to move to a structured CRM.",
        columns: { criteria: "Criterion", left: "Excel / spreadsheet", right: "Structured CRM" },
        rows: [
          { criteria: "Lead tracking", left: "Manual lists, multiple versions", right: "Visual pipeline, centralized history" },
          { criteria: "Reminders & follow-ups", left: "None automatic", right: "Tasks, notifications, sequences" },
          { criteria: "Team collaboration", left: "Version conflicts", right: "Role-based access, single source of truth" },
          { criteria: "Reporting", left: "Pivot tables to maintain", right: "Real-time dashboards" },
          { criteria: "Integrations", left: "Manual import/export", right: "Forms, Ads, WhatsApp, email" },
          { criteria: "Scalability", left: "Unmanageable beyond ~100 active leads", right: "Built for growing volume" },
        ],
        verdict: "Excel remains useful for ad-hoc analysis, but a CRM becomes essential when several people manage leads, follow-ups are critical and you need pipeline visibility. Both can coexist: CRM for operations, Excel for occasional exports.",
        faqs: [
          { question: "Is Excel bad for managing leads?", answer: "Not when starting very small. It becomes risky as the team grows: missed follow-ups, duplicates, no pipeline view." },
          { question: "When to switch to CRM?", answer: "When you lose opportunities due to poor follow-up, several salespeople are involved, or you run Ads/WhatsApp campaigns with lead volume." },
          { question: "How does Mohtaoua CRM fit?", answer: "Our CRM-data service and CRM solution cover structuring, integrations and automation — beyond a simple spreadsheet." },
        ],
      },
    },
  },
  ar: {
    labels: { criteria: "المعيار", verdict: "الخلاصة:", faq: "أسئلة شائعة" },
    metaRows: migrateMetaAdsRows([
      { criteria: "نوع الطلب", meta: "طلب مُخلَق (مقاطعة)", google: "طلب موجود (بحث)" },
      { criteria: "وقت أول العملاء المحتملين", meta: "7-14 يوماً", google: "3-10 أيام" },
      { criteria: "متوسط CPL", meta: "غالباً أقل من حيث الحجم", google: "غالباً أكثر تأهيلاً" },
      { criteria: "صيغة الإبداع", meta: "فيديو، صورة، عرض دوار", google: "نص، امتدادات" },
      { criteria: "الأفضل لـ", meta: "الإطلاق، الوعي، العروض", google: "العروض المطلوبة" },
      { criteria: "الحد الأدنى الموصى به للميزانية", meta: "8,000 درهم/شهر", google: "6,000 درهم/شهر" },
    ]),
    newItems: {
      "seo-vs-google-ads": {
        title: "SEO مقابل Google Ads: عضوي أم مدفوع؟",
        description: "مقارنة للشركات بالمغرب: المدة والتكلفة والتحكم وتكامل البحث العضوي مع إعلانات Google.",
        columns: { criteria: "المعيار", left: "SEO", right: "Google Ads" },
        rows: [
          { criteria: "نوع الزيارات", left: "عضوي (بدون تكلفة لكل نقرة)", right: "مدفوع (مزايدات)" },
          { criteria: "وقت أول النتائج", left: "3 إلى 12 شهراً", right: "بضعة أيام" },
          { criteria: "التكلفة المتكررة", left: "أتعاب SEO شهرية", right: "ميزانية إعلامية + إدارة" },
          { criteria: "التحكم في الترتيب", left: "غير مباشر (خوارزميات)", right: "مباشر (مزايدات، ميزانيات)" },
          { criteria: "الاستدامة", left: "تأثير تراكمي طويل الأمد", right: "يتوقف عند قطع الميزانية" },
          { criteria: "الأفضل لـ", left: "سلطة دائمة، وعي", right: "عملاء محتملون فوريون" },
        ],
        verdict: "كلاهما مكمل: Google Ads للفورية واختبار الرسائل؛ SEO لبناء ظهور عضوي دائم وتقليل الاعتماد على المدفوع.",
        faqs: [
          { question: "هل أختار بين SEO وGoogle Ads؟", answer: "لا. معظم المؤسسات الناجحة تجمع بينهما: Ads لعملاء سريعين، SEO لحضور عضوي." },
          { question: "هل يحل SEO محل Google Ads؟", answer: "لا. SEO يحتاج وقتاً. Google Ads يسد الفجوة ويساعد على اختبار الكلمات وصفحات الهبوط." },
          { question: "أي ميزانية أُقدّم عند البدء؟", answer: "إذا كان عرضك مطلوباً في البحث، ابدأ بـ Google Ads. بالتوازي، أطلق أساس SEO للمدى المتوسط." },
        ],
      },
      "wordpress-vs-laravel": {
        title: "WordPress مقابل Laravel: أي خيار لمشروعك الويب؟",
        description: "مقارنة CMS تعريفي (WordPress) والتطوير المخصص (Laravel/Next.js) لتحديد احتياجك في المغرب.",
        columns: { criteria: "المعيار", left: "WordPress / CMS", right: "Laravel / مخصص" },
        rows: [
          { criteria: "الاستخدام المثالي", left: "موقع تعريفي، مدونة، متجر صغير", right: "منصة مهنية، منطق معقد" },
          { criteria: "وقت الإطلاق", left: "سريع (أسابيع)", right: "أطول (أشهر)" },
          { criteria: "التكلفة الأولية", left: "عادة أقل", right: "استثمار أعلى" },
          { criteria: "قابلية التوسع", left: "محدودة بالإضافات", right: "هيكل قابل للتوسع" },
          { criteria: "الأداء والأمان", left: "يعتمد على الإضافات", right: "تحكم كامل بالكود" },
          { criteria: "الصيانة", left: "تحديثات إضافات/قالب", right: "صيانة تطبيق مخصصة" },
        ],
        verdict: "WordPress يناسب المواقع التعريفية البسيطة. Laravel (أو Next.js لدى Mohtaoua) مناسب عندما يصبح المشروع منتجاً مهنياً بمسارات عمل وتكاملات وحجم.",
        faqs: [
          { question: "هل تطور Mohtaoua بـ WordPress؟", answer: "نفضل Next.js للمواقع المؤسسية والمنصات عالية الأداء. WordPress مرجع سوقي نقارنه لمساعدتك على تحديد مستوى المشروع." },
          { question: "هل يمكن الانتقال من WordPress إلى مخصص؟", answer: "نعم. نراجع المحتوى وSEO والتكاملات قبل ترحيل تدريجي يحافظ على الزيارات." },
          { question: "كيف أعرف ماذا أختار؟", answer: "إذا احتجت صفحات تحريرية ومدونة، CMS يكفي. إذا لديك أدوار مستخدمين وAPI ومدفوعات، اختر مخصصاً." },
        ],
      },
      "crm-vs-excel": {
        title: "CRM مقابل Excel: لماذا تهيكل متابعة المبيعات؟",
        description: "فهم حدود Excel لتتبع العملاء المحتملين ومتى الانتقال إلى CRM منظم.",
        columns: { criteria: "المعيار", left: "Excel / جدول", right: "CRM منظم" },
        rows: [
          { criteria: "تتبع العملاء المحتملين", left: "قوائم يدوية، نسخ متعددة", right: "مسار بصري، سجل مركزي" },
          { criteria: "التذكيرات والمتابعة", left: "لا شيء تلقائي", right: "مهام، إشعارات، تسلسلات" },
          { criteria: "تعاون الفريق", left: "تعارض نسخ", right: "وصول حسب الدور، مصدر واحد" },
          { criteria: "التقارير", left: "جداول محورية للصيانة", right: "لوحات معلومات فورية" },
          { criteria: "التكاملات", left: "استيراد/تصدير يدوي", right: "نماذج، إعلانات، واتساب، بريد" },
          { criteria: "قابلية التوسع", left: "صعب بعد ~100 عميل نشط", right: "مصمم لحجم متزايد" },
        ],
        verdict: "Excel مفيد للتحليلات العرضية، لكن CRM ضروري عندما يدير عدة أشخاص العملاء والمتابعة حاسمة. يمكن أن يتعايشا: CRM للتشغيل، Excel للتصدير أحياناً.",
        faqs: [
          { question: "هل Excel سيء لإدارة العملاء؟", answer: "ليس في البداية الصغيرة جداً. يصبح محفوفاً بالمخاطر مع نمو الفريق: نسيان متابعة، تكرار، غياب رؤية المسار." },
          { question: "متى أنتقل إلى CRM؟", answer: "عند فقدان فرص بسبب ضعف المتابعة، أو عدة مندوبين، أو حملات Ads/واتساب بحجم leads." },
          { question: "ما علاقة Mohtaoua CRM؟", answer: "خدمة CRM-data وحل CRM لدينا يغطيان الهيكلة والتكاملات والأتمتة — أبعد من جدول بسيط." },
        ],
      },
    },
  },
};

const pricingAdsFr = {
  mediaBudgetPerMonth: "budget média / mois",
  google: {
    metaTitle: "Prix Google Ads Maroc 2026 | Budget média indicatif",
    metaDescription: "Combien investir en Google Ads au Maroc ? Fourchettes de budget média mensuel (hors honoraires agence), facteurs et FAQ.",
    h1: "Prix Google Ads au Maroc",
    intro: "Cette page présente des fourchettes indicatives de budget média Google Ads — le montant investi directement sur la plateforme Google. Les honoraires de gestion de campagne sont facturés séparément par l'agence.",
    budgetNotes: {
      mediaBudget: "Les montants ci-dessous représentent uniquement le budget média mensuel sur Google Ads. Ils n'incluent pas les honoraires Mohtaoua pour la gestion de campagne.",
      agencyFees: "Honoraires de gestion : généralement 15 à 25 % du budget média ou forfait mensuel selon le périmètre. Voir /pricing ou demandez un devis après audit.",
    },
    overview: {
      what: "Guide des fourchettes de budget média Google Ads au Maroc, distinct des honoraires d'agence.",
      who: "PME, e-commerces et organisations qui structurent leurs campagnes Search/Display.",
      benefits: ["Anticiper le budget plateforme", "Séparer média et honoraires", "Dimensionner selon la concurrence"],
      topics: ["Budget média", "Honoraires agence", "Facteurs", "FAQ"],
      takeaways: ["Budget média : 4 000 à 45 000 MAD/mois", "Honoraires en sus", "Devis après audit"],
    },
    factorsTitle: "Facteurs qui influencent le budget média Google Ads",
    factors: ["Concurrence mots-clés", "Zone géographique", "Type de campagne", "Saisonnalité", "Qualité landing pages", "Objectif (leads, ventes)"],
    tiers: {
      basic: { name: "Test / local", description: "Campagne locale ou niche.", includes: ["1–2 campagnes Search", "Zone restreinte", "Suivi conversions", "Optimisation mensuelle"] },
      standard: { name: "Croissance PME", description: "Acquisition nationale.", includes: ["Search + extensions", "Multi groupes d'annonces", "A/B tests", "Optimisation hebdomadaire"] },
      premium: { name: "Scale", description: "Marchés concurrentiels.", includes: ["Performance Max + Search", "Remarketing", "Tests créatifs", "Reporting avancé"] },
    },
    disclaimer: "Fourchettes de budget média indicatives uniquement. Honoraires de gestion non inclus. Devis ferme après audit.",
    contextLinks: { service: "Découvrir notre service Google Ads", packs: "Voir nos packs marketing" },
    faqs: [
      { question: "Le prix inclut-il la gestion agence ?", answer: "Non. Ce sont des budgets média sur Google. La gestion est facturée séparément." },
      { question: "Budget média minimum ?", answer: "Environ 4 000 à 6 000 MAD/mois pour des données Search exploitables." },
      { question: "Payer uniquement la gestion ?", answer: "Impossible de diffuser sans budget média sur la plateforme." },
      { question: "Obtenir un devis complet ?", answer: "Audit gratuit : budget média recommandé + honoraires de gestion." },
    ],
  },
  meta: {
    metaTitle: "Prix Meta Ads Maroc 2026 | Budget média indicatif",
    metaDescription: "Budget média Meta Ads au Maroc (hors honoraires agence). Fourchettes, facteurs et FAQ.",
    h1: "Prix Meta Ads au Maroc",
    intro: "Fourchettes de budget média Meta Ads (Facebook/Instagram). Les honoraires de gestion sont distincts et facturés par l'agence.",
    budgetNotes: {
      mediaBudget: "Montants = budget média mensuel Meta uniquement. Hors honoraires Mohtaoua.",
      agencyFees: "Honoraires : 15–25 % du média ou forfait mensuel. Voir /pricing.",
    },
    overview: {
      what: "Guide budget média Meta Ads au Maroc.",
      who: "Marques et PME sur Facebook/Instagram.",
      benefits: ["Clarifier média vs honoraires", "Dimensionner création et diffusion", "Aligner sur objectifs business"],
      topics: ["Budget média", "Honoraires", "Facteurs Meta", "FAQ"],
      takeaways: ["Média : 5 000 à 50 000 MAD/mois", "Gestion à part", "Audit gratuit"],
    },
    factorsTitle: "Facteurs budget média Meta Ads",
    factors: ["Audience cible", "Objectif campagne", "Coût créatives", "Saisonnalité", "Concurrence secteur", "Qualité pixel"],
    tiers: {
      basic: { name: "Test / notoriété", description: "Test audience locale.", includes: ["1–2 campagnes", "Ciblage geo", "Image/carrousel", "Suivi conversions"] },
      standard: { name: "Acquisition PME", description: "Leads ou ventes réguliers.", includes: ["Campagnes leads/ventes", "Retargeting", "Tests créatifs", "Optimisation continue"] },
      premium: { name: "Scale", description: "Volume élevé.", includes: ["Full funnel", "Catalogue e-commerce", "A/B avancés", "Reporting détaillé"] },
    },
    disclaimer: "Budget média Meta indicatif uniquement. Honoraires agence non inclus.",
    contextLinks: { service: "Découvrir notre service Meta Ads", packs: "Voir nos packs marketing" },
    faqs: [
      { question: "Inclut-il la création publicitaire ?", answer: "Non pour le média affiché. Création et gestion = forfait séparé ou packs /pricing." },
      { question: "Budget média minimum Meta ?", answer: "Environ 5 000 MAD/mois pour tester au Maroc." },
      { question: "Différence avec /pricing ?", answer: "Les packs incluent gestion et création. Cette page isole le poste média." },
      { question: "Obtenir un devis ?", answer: "Audit gratuit : média + honoraires selon objectifs." },
    ],
  },
};

// EN/AR pricing: reuse structure with translated strings (abbreviated keys same shape)
const pricingAdsEn = {
  mediaBudgetPerMonth: "media budget / month",
  google: {
    ...pricingAdsFr.google,
    metaTitle: "Google Ads price Morocco 2026 | Indicative media budget",
    metaDescription: "Google Ads media budget ranges in Morocco (excluding agency fees).",
    h1: "Google Ads price in Morocco",
    intro: "Indicative Google Ads media budget — spend on Google's platform. Management fees are billed separately.",
    budgetNotes: {
      mediaBudget: "Amounts are monthly Google Ads media budget only. Excludes Mohtaoua management fees.",
      agencyFees: "Management fees: typically 15–25% of media or monthly flat fee. See /pricing.",
    },
    factorsTitle: "Factors influencing Google Ads media budget",
    disclaimer: "Indicative media budget only. Management fees not included.",
    contextLinks: { service: "Explore our Google Ads service", packs: "View our marketing packs" },
  },
  meta: {
    ...pricingAdsFr.meta,
    metaTitle: "Meta Ads price Morocco 2026 | Indicative media budget",
    h1: "Meta Ads price in Morocco",
    intro: "Meta Ads media budget ranges. Management fees are separate.",
    budgetNotes: {
      mediaBudget: "Monthly Meta media budget only. Excludes management fees.",
      agencyFees: "Typically 15–25% of media or flat fee. See /pricing.",
    },
    factorsTitle: "Factors influencing Meta Ads media budget",
    disclaimer: "Indicative Meta media budget only. Agency fees not included.",
    contextLinks: { service: "Explore our Meta Ads service", packs: "View our marketing packs" },
  },
};

const pricingAdsAr = {
  mediaBudgetPerMonth: "ميزانية إعلامية / شهر",
  google: {
    ...pricingAdsFr.google,
    metaTitle: "سعر Google Ads المغرب 2026 | ميزانية إعلامية",
    h1: "سعر Google Ads في المغرب",
    intro: "نطاقات ميزانية Google Ads الإعلامية. أتعاب الإدارة منفصلة.",
    budgetNotes: {
      mediaBudget: "ميزانية إعلامية شهرية على Google فقط.",
      agencyFees: "أتعاب إدارة: 15–25% من الإعلام أو مقطوع شهري.",
    },
    factorsTitle: "عوامل ميزانية Google Ads الإعلامية",
    disclaimer: "ميزانية إعلامية إرشادية. أتعاب الوكالة غير مشمولة.",
    contextLinks: { service: "خدمة Google Ads", packs: "باقاتنا التسويقية" },
  },
  meta: {
    ...pricingAdsFr.meta,
    metaTitle: "سعر Meta Ads المغرب 2026 | ميزانية إعلامية",
    h1: "سعر Meta Ads في المغرب",
    intro: "نطاقات ميزانية Meta الإعلامية. أتعاب الإدارة منفصلة.",
    budgetNotes: {
      mediaBudget: "ميزانية Meta إعلامية شهرية فقط.",
      agencyFees: "أتعاب: 15–25% من الإعلام أو مقطوع شهري.",
    },
    factorsTitle: "عوامل ميزانية Meta الإعلامية",
    disclaimer: "ميزانية إعلامية إرشادية. أتعاب الوكالة غير مشمولة.",
    contextLinks: { service: "خدمة Meta Ads", packs: "باقاتنا" },
  },
};

const pricingByLocale = { fr: pricingAdsFr, en: pricingAdsEn, ar: pricingAdsAr };

const metaColumns = {
  fr: { criteria: "Critère", left: "Meta Ads", right: "Google Ads" },
  en: { criteria: "Criterion", left: "Meta Ads", right: "Google Ads" },
  ar: { criteria: "المعيار", left: "Meta Ads", right: "Google Ads" },
};

for (const locale of LOCALES) {
  const lot5 = compareContent[locale];
  const comparePath = join(root, `messages/${locale}/compare.json`);
  const compare = JSON.parse(readFileSync(comparePath, "utf8"));
  const meta = compare.items["meta-ads-vs-google-ads"];
  compare.labels = lot5.labels;
  compare.items["meta-ads-vs-google-ads"] = {
    title: meta.title,
    description: meta.description,
    columns: metaColumns[locale],
    rows: lot5.metaRows,
    verdict: meta.verdict,
    faqs: meta.faqs,
  };
  Object.assign(compare.items, lot5.newItems);
  writeFileSync(comparePath, JSON.stringify(compare, null, 2) + "\n");

  const pa = pricingByLocale[locale];
  const pricingPath = join(root, `messages/${locale}/pricingPages.json`);
  const pricing = JSON.parse(readFileSync(pricingPath, "utf8"));
  pricing.labels.mediaBudgetPerMonth = pa.mediaBudgetPerMonth;
  pricing.items["google-ads-maroc"] = pa.google;
  pricing.items["meta-ads-maroc"] = pa.meta;
  writeFileSync(pricingPath, JSON.stringify(pricing, null, 2) + "\n");

  console.log(`✓ ${locale}`);
}

console.log("Lot 5 content written.");
