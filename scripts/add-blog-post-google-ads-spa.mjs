#!/usr/bin/env node
/**
 * Article du jour — Google Ads spa / institut beauté Maroc (2026-07-25)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SLUG = "google-ads-spa-institut-beaute-maroc";
const LOCALES = ["fr", "en", "ar"];

const posts = {
  fr: {
    title: "Google Ads pour spas et instituts de beauté au Maroc : générer des réservations en 2026",
    excerpt:
      "Search, Performance Max, mots-clés locaux et CPL réalistes : méthode complète pour remplir l'agenda d'un spa ou institut via Google Ads au Maroc.",
    category: "publicite",
    overview: {
      what: "Guide pratique Google Ads pour spas, hammams et instituts de beauté au Maroc : structure de campagne, mots-clés à intention locale, landing page, WhatsApp et budgets CPL.",
      who: "Gérants de spas, instituts de beauté, centres de bien-être et cliniques esthétiques qui veulent des réservations qualifiées près de chez eux.",
      benefits: [
        "Structure Search + Performance Max adaptée au bien-être",
        "Listes de mots-clés locaux (ville + soin) prêtes à tester",
        "Budgets et CPL réalistes au Maroc en 2026",
      ],
      topics: [
        "Google Ads spa Maroc",
        "Publicité institut beauté",
        "Lead generation spa",
        "Performance Max",
        "Réservation en ligne",
      ],
      takeaways: [
        "Google Ads capte l'intention : « spa Casablanca », « massage Marrakech », « épilation laser Rabat »",
        "Une landing page dédiée + WhatsApp convertit mieux qu'un site vitrine générique",
        "Commencez avec 150–300 DH/jour sur Search local avant d'élargir en Performance Max",
      ],
    },
    sections: [
      {
        id: "intro",
        heading: "Pourquoi Google Ads marche pour les spas au Maroc",
        paragraphs: [
          "Un client qui tape « spa Casablanca », « hammam Marrakech » ou « épilation laser Rabat » a déjà une intention claire : il cherche où réserver, souvent aujourd'hui ou cette semaine. Contrairement à Meta ou TikTok qui créent la demande, Google Ads intercepte une demande existante. Pour un spa ou un institut de beauté, c'est le canal le plus direct pour remplir les créneaux hors saison et absorber les pics (Ramadan, Aïd, Saint-Valentin, mariages).",
          "Ce guide détaille une méthode applicable à Casablanca, Rabat, Marrakech, Tanger et Agadir : quels types de campagnes lancer, quels mots-clés privilégier, comment structurer la page d'atterrissage, quel budget prévoir et quelles erreurs évitent de brûler le budget pub.",
        ],
      },
      {
        id: "probleme",
        heading: "Le problème : du trafic, peu de réservations",
        paragraphs: [
          "Beaucoup d'instituts investissent en Instagram ou boostent des posts sans mesurer le coût par réservation réelle. D'autres lancent Google Ads vers la page d'accueil du site : le prospect arrive, voit dix soins, hésite, part. Résultat : impressions payées, zéro RDV.",
          "Sans tracking (formulaires, clic WhatsApp, appels) et sans page dédiée à une offre (ex. « forfait hammam + massage 90 min »), vous optimisez à l'aveugle. Google continue de vous envoyer du trafic peu qualifié tant que vous ne lui renvoyez pas les conversions qui comptent.",
        ],
        bullets: [
          "Campagnes vers le site entier au lieu d'une offre claire",
          "Pas de suivi des appels / WhatsApp / formulaires",
          "Mots-clés trop larges (« beauté », « spa ») sans ville ni soin",
          "Concurrence des chaînes et des marketplaces sans différenciation",
          "Budget trop faible pour sortir de la phase d'apprentissage",
        ],
      },
      {
        id: "intention",
        heading: "Comprendre l'intention de recherche bien-être",
        paragraphs: [
          "Sur Google, les requêtes spa / beauté se classent en trois niveaux d'intention. Les requêtes transactionnelles (« spa près de moi », « réserver massage Casablanca ») doivent absorber la majorité du budget. Les requêtes informationnelles (« bienfaits du hammam ») servent plutôt le SEO et le content marketing. Les requêtes de comparaison (« meilleur spa Marrakech ») demandent des pages riches en preuves (avis, photos, tarifs).",
          "Au Maroc, ajoutez systématiquement la ville et, si pertinent, le quartier (Maarif, Agdal, Guéliz, Hassan). Les recherches « près de moi » et mobile représentent une part majoritaire : votre fiche Google Business Profile et vos extensions de lieu doivent être impeccables.",
        ],
        bullets: [
          "Transactionnel : spa + ville, massage + ville, épilation laser + ville",
          "Commercial : forfait spa week-end, soin visage anti-âge prix",
          "Local : hammam traditionnel près de moi, institut beauté [quartier]",
          "Marque : nom de votre établissement (défendre vos requêtes de marque)",
        ],
      },
      {
        id: "structure",
        heading: "Structure de campagne recommandée",
        paragraphs: [
          "Pour un spa ou institut qui démarre sur Google Ads au Maroc, une structure simple surpasse une architecture fragmentée. Deux campagnes suffisent au lancement.",
        ],
        bullets: [
          "Campagne Search — Soins phares : groupes d'annonces par famille (massage, hammam, soins visage, épilation, onglerie)",
          "Campagne Search — Marque : protéger le nom de l'enseigne à CPC bas",
          "Performance Max (phase 2) : assets photos/vidéos + feed d'offres pour élargir la portée",
          "Remarketing Display / YouTube (phase 3) : relancer les visiteurs non convertis",
        ],
      },
      {
        id: "mots-cles",
        heading: "Mots-clés qui convertissent (exemples Maroc)",
        paragraphs: [
          "Travaillez en exact et expression match d'abord, puis élargissez. Excluez les termes low-intent (emploi, formation, gratuit, DIY) via listes de négatifs.",
        ],
        bullets: [
          "spa Casablanca / spa Marrakech / spa Rabat",
          "massage relaxant + ville, massage couple + ville",
          "hammam traditionnel + ville, hammam privé",
          "épilation laser + ville, soin visage + ville",
          "institut de beauté + quartier, manucure / pédicure + ville",
          "Négatifs types : recrutement, salaire, cours, gratuit, à domicile (si vous n'offrez pas le domicile)",
        ],
      },
      {
        id: "annonces",
        heading: "Annonces et extensions qui réservent",
        paragraphs: [
          "Vos titres doivent coller à la requête et afficher un bénéfice clair : disponibilité, forfait, localisation, preuve sociale. Sur mobile, le clic vers WhatsApp ou l'appel direct bat souvent le formulaire long.",
        ],
        bullets: [
          "Titres : « Spa [Ville] — Réservez aujourd'hui », « Forfait hammam + massage », « Ouvert 7j/7 — [Quartier] »",
          "Descriptions : tarifs à partir de X DH, parking, avis Google, offre découverte",
          "Extensions : lieu, appel, liens annexes (tarifs, soins, contact), avis",
          "Assets Performance Max : photos réelles des cabines, avant/après soignés, vidéo 15–30 s",
        ],
      },
      {
        id: "landing",
        heading: "Landing page et WhatsApp : le duo conversion",
        paragraphs: [
          "N'envoyez pas le trafic vers la homepage. Créez une page dédiée par famille de soins ou par offre : promesse en 5 secondes, photos, tarif ou « à partir de », avis, CTA unique (Réserver / WhatsApp / Appeler). Temps de chargement mobile < 3 secondes.",
          "Au Maroc, le bouton WhatsApp pré-rempli (« Bonjour, je souhaite réserver un massage à Casablanca ») augmente fortement le taux de contact. Reliez chaque lead à un CRM ou un tableau de suivi pour mesurer le taux RDV → client payant.",
        ],
        bullets: [
          "Une offre = une page = un CTA",
          "Preuve : avis Google, photos, certifications des praticiens",
          "Tracking : Google Ads conversions (formulaire, appel, clic WhatsApp)",
          "Mentions légales / politique de confidentialité si vous collectez des données",
        ],
      },
      {
        id: "budget",
        heading: "Budget et CPL réalistes au Maroc (2026)",
        paragraphs: [
          "Les coûts varient selon la ville et la concurrence. À titre indicatif pour le secteur bien-être / beauté : CPC Search souvent entre 2 et 8 DH sur des requêtes locales, CPL (lead formulaire ou WhatsApp) entre 25 et 80 DH selon l'offre et la qualité de la page. Casablanca et Marrakech sont plus chères que des villes secondaires.",
          "Budget de démarrage recommandé : 150 à 300 DH/jour pendant 30 jours sur Search, soit 4 500 à 9 000 DH pour obtenir des données fiables. Intégrez la TVA 20 % sur les frais Ads dans votre calcul de rentabilité. Visez un coût par réservation confirmée inférieur à 15–25 % de la valeur moyenne du panier (soin ou forfait).",
        ],
      },
      {
        id: "meta-vs-google",
        heading: "Google Ads vs Meta Ads pour un spa",
        paragraphs: [
          "Google convertit l'intention ; Meta crée la désirabilité (avant/après, ambiance, offres flash). Le mix gagnant au Maroc alloue souvent 50–70 % du budget acquisition payante à Google Search pour les réservations, et 30–50 % à Meta pour la notoriété et le remarketing. TikTok fonctionne pour une clientèle jeune (onglerie, brows) mais moins pour le spa premium.",
        ],
      },
      {
        id: "etapes",
        heading: "Lancer en 7 étapes",
        paragraphs: ["Suivez cette séquence pour éviter les dépenses inutiles."],
        bullets: [
          "1. Audit Google Business Profile + photos + horaires + catégories",
          "2. Choisir 2–3 offres prioritaires et rédiger une landing chacune",
          "3. Installer le tag Google Ads + conversions (formulaire, appel, WhatsApp)",
          "4. Créer la campagne Search locale (ville + soins) avec négatifs",
          "5. Lancer 14 jours sans toucher à la structure (apprentissage)",
          "6. Couper les mots-clés / annonces faibles, renforcer les gagnants",
          "7. Ajouter Performance Max puis remarketing une fois le CPL stabilisé",
        ],
      },
      {
        id: "erreurs",
        heading: "Les 7 erreurs qui vident le budget",
        paragraphs: ["Ces erreurs reviennent dans la majorité des comptes spa / beauté que nous auditons."],
        bullets: [
          "Cibler tout le Maroc alors que votre clientèle est dans un rayon de 15 km",
          "Utiliser uniquement le réseau Display « pour avoir des clics pas chers »",
          "Pas de page mobile rapide ni de CTA WhatsApp",
          "Optimiser sur les clics au lieu des réservations",
          "Ignorer les avis Google (signal de confiance + extensions)",
          "Changer enchères et mots-clés tous les deux jours",
          "Oublier la marque : laisser un concurrent enchérir sur votre nom",
        ],
      },
      {
        id: "conclusion",
        heading: "Remplir l'agenda avec une acquisition mesurable",
        paragraphs: [
          "Google Ads est le levier le plus prévisible pour un spa ou institut au Maroc dès que l'intention locale existe. Combiné à une landing claire, WhatsApp et un suivi des réservations, il transforme les recherches « près de moi » en créneaux payés.",
          "Mohtaoua déploie des campagnes Google Ads pour les entreprises de services locaux au Maroc : structure, créatives, landing pages et reporting. Demandez un audit gratuit : nous estimons votre CPL cible et un plan de lancement sur 30 jours.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quel budget Google Ads pour un spa au Maroc ?",
        answer:
          "Comptez 150 à 300 DH/jour pendant au moins 30 jours pour une campagne Search locale. En dessous, l'algorithme manque de signal. Ajustez ensuite selon votre taux de remplissage et la valeur moyenne d'un soin.",
      },
      {
        question: "Google Ads ou Instagram pour un institut de beauté ?",
        answer:
          "Les deux. Google pour les réservations à intention forte ; Instagram/Meta pour la découverte et les offres visuelles. Beaucoup de nos clients splittent 60 % Google / 40 % Meta une fois le tracking en place.",
      },
      {
        question: "Faut-il une application de réservation avant de lancer les ads ?",
        answer:
          "Non. Un formulaire court ou WhatsApp suffit au démarrage. Une solution de réservation en ligne améliore la conversion plus tard, une fois le volume de leads stable.",
      },
      {
        question: "Comment suivre les appels téléphoniques dans Google Ads ?",
        answer:
          "Activez le suivi des appels (extensions et balise) et, si possible, un numéro de suivi. Sur mobile, le clic-to-call est souvent le premier canal de conversion pour les spas.",
      },
      {
        question: "Performance Max est-il adapté aux spas ?",
        answer:
          "Oui en phase 2, avec de bons assets (photos, logo, textes) et des conversions déjà mesurées. Au lancement, privilégiez Search pour contrôler mots-clés et intention.",
      },
      {
        question: "Combien de temps avant de voir des réservations ?",
        answer:
          "Les premiers leads arrivent souvent en quelques jours. Comptez 2 à 4 semaines pour un CPL stabilisé et un mois pour juger la rentabilité réelle (lead → RDV → soin payé).",
      },
    ],
  },
  en: {
    title: "Google Ads for spas and beauty institutes in Morocco: drive bookings in 2026",
    excerpt:
      "Search, Performance Max, local keywords and realistic CPL: a complete method to fill a spa or beauty salon schedule with Google Ads in Morocco.",
    category: "publicite",
    overview: {
      what: "Practical Google Ads guide for spas, hammams and beauty institutes in Morocco: campaign structure, local intent keywords, landing pages, WhatsApp and CPL budgets.",
      who: "Spa owners, beauty institute managers and wellness centers that need qualified local bookings.",
      benefits: [
        "Search + Performance Max structure for wellness",
        "Local keyword lists ready to test",
        "Realistic Morocco CPL and daily budgets for 2026",
      ],
      topics: ["Google Ads spa Morocco", "Beauty salon ads", "Spa lead generation", "Performance Max", "Online booking"],
      takeaways: [
        "Google captures intent: spa + city, massage + city, laser + city",
        "A dedicated landing page + WhatsApp beats a generic homepage",
        "Start with 150–300 MAD/day on local Search before Performance Max",
      ],
    },
    sections: [
      {
        id: "intro",
        heading: "Why Google Ads works for spas in Morocco",
        paragraphs: [
          "Someone searching “spa Casablanca” or “massage Marrakech” already intends to book. Google Ads intercepts that demand. This guide covers campaigns, keywords, landing pages, budgets and common mistakes for Moroccan wellness businesses.",
        ],
      },
      {
        id: "probleme",
        heading: "The problem: traffic without bookings",
        paragraphs: [
          "Boosted Instagram posts and ads to the homepage often fail to convert. Without tracking and a dedicated offer page, you optimize blindly.",
        ],
        bullets: [
          "Traffic to the whole website instead of one offer",
          "No call / WhatsApp / form tracking",
          "Keywords too broad without city or treatment",
          "Budget too low to exit learning",
        ],
      },
      {
        id: "intention",
        heading: "Search intent in wellness",
        paragraphs: [
          "Prioritize transactional queries (spa near me, book massage + city). Always add city and neighborhood. Mobile and “near me” searches dominate.",
        ],
        bullets: [
          "Transactional: spa + city, massage + city",
          "Commercial: spa weekend package, facial price",
          "Local: traditional hammam near me",
          "Brand: protect your business name",
        ],
      },
      {
        id: "structure",
        heading: "Recommended campaign structure",
        paragraphs: ["Keep it simple at launch."],
        bullets: [
          "Search — Core treatments by category",
          "Search — Brand defense",
          "Performance Max in phase 2",
          "Remarketing in phase 3",
        ],
      },
      {
        id: "mots-cles",
        heading: "Keywords that convert (Morocco examples)",
        paragraphs: ["Start with phrase/exact match and solid negatives."],
        bullets: [
          "spa Casablanca / Marrakech / Rabat",
          "relaxing massage + city, couples massage + city",
          "traditional hammam + city",
          "laser hair removal + city, facial + city",
          "Negatives: jobs, free, DIY, training",
        ],
      },
      {
        id: "annonces",
        heading: "Ads and extensions that book",
        paragraphs: ["Match the query, show proof, and offer WhatsApp or call on mobile."],
        bullets: [
          "Headlines with city + offer + availability",
          "Descriptions with from-price, reviews, parking",
          "Location, call and sitelink extensions",
          "Real photos and short video for Performance Max",
        ],
      },
      {
        id: "landing",
        heading: "Landing page + WhatsApp",
        paragraphs: [
          "One offer, one page, one CTA. Prefill WhatsApp messages. Track every lead to booking.",
        ],
        bullets: [
          "Mobile load under 3 seconds",
          "Reviews and real cabin photos",
          "Google Ads conversion tracking",
        ],
      },
      {
        id: "budget",
        heading: "Budgets and CPL in Morocco (2026)",
        paragraphs: [
          "Expect local Search CPC roughly 2–8 MAD and CPL 25–80 MAD depending on city and offer. Start at 150–300 MAD/day for 30 days. Include 20% VAT on ad spend in ROI math.",
        ],
      },
      {
        id: "meta-vs-google",
        heading: "Google Ads vs Meta Ads for spas",
        paragraphs: [
          "Google converts intent; Meta builds desire. A common split is 50–70% Google for bookings and 30–50% Meta for awareness and remarketing.",
        ],
      },
      {
        id: "etapes",
        heading: "Launch in 7 steps",
        paragraphs: ["Follow this sequence."],
        bullets: [
          "1. Fix Google Business Profile",
          "2. Build 2–3 offer landings",
          "3. Install conversion tracking",
          "4. Launch local Search",
          "5. Wait 14 days before major changes",
          "6. Cut losers, scale winners",
          "7. Add Performance Max + remarketing",
        ],
      },
      {
        id: "erreurs",
        heading: "7 budget-burning mistakes",
        paragraphs: ["Common spa account failures."],
        bullets: [
          "Targeting the whole country",
          "Cheap Display clicks only",
          "No WhatsApp CTA",
          "Optimizing for clicks not bookings",
          "Ignoring Google reviews",
          "Changing bids daily",
          "Not protecting brand terms",
        ],
      },
      {
        id: "conclusion",
        heading: "Fill the calendar with measurable acquisition",
        paragraphs: [
          "Google Ads is the most predictable local booking channel when intent exists. Mohtaoua runs Google Ads for Moroccan service businesses — request a free audit for a 30-day launch plan.",
        ],
      },
    ],
    faqs: [
      { question: "What Google Ads budget for a spa in Morocco?", answer: "150–300 MAD/day for at least 30 days on local Search is a solid start." },
      { question: "Google Ads or Instagram for a beauty institute?", answer: "Both: Google for high-intent bookings, Instagram/Meta for discovery and visual offers." },
      { question: "Do I need a booking app first?", answer: "No. A short form or WhatsApp is enough to start." },
      { question: "How do I track phone calls?", answer: "Enable call tracking and click-to-call assets; mobile calls are often the top conversion." },
      { question: "Is Performance Max good for spas?", answer: "Yes in phase 2 with strong assets and measured conversions. Start with Search." },
      { question: "How long until bookings?", answer: "Leads within days; stable CPL in 2–4 weeks; full ROI view after about a month." },
    ],
  },
  ar: {
    title: "إعلانات Google للسبا ومعاهد التجميل في المغرب: حجوزات في 2026",
    excerpt:
      "البحث وPerformance Max والكلمات المحلية وتكلفة العميل المحتمل: طريقة كاملة لملء جدول السبا أو معهد التجميل عبر Google Ads في المغرب.",
    category: "publicite",
    overview: {
      what: "دليل عملي لـ Google Ads للسبا والحمامات ومعاهد التجميل في المغرب: هيكل الحملات، الكلمات المحلية، صفحات الهبوط، واتساب والميزانيات.",
      who: "أصحاب السبا ومعاهد التجميل ومراكز العافية الذين يريدون حجوزات محلية مؤهلة.",
      benefits: [
        "هيكل Search + Performance Max مناسب للعافية",
        "قوائم كلمات محلية جاهزة للاختبار",
        "ميزانيات وتكلفة عميل محتمل واقعية في المغرب 2026",
      ],
      topics: ["Google Ads سبا المغرب", "إعلانات معهد تجميل", "توليد عملاء سبا", "Performance Max", "حجز عبر الإنترنت"],
      takeaways: [
        "Google يلتقط النية: سبا + مدينة، مساج + مدينة",
        "صفحة هبوط مخصصة + واتساب أفضل من الموقع العام",
        "ابدأ بـ 150–300 درهم يومياً على البحث المحلي",
      ],
    },
    sections: [
      {
        id: "intro",
        heading: "لماذا تنجح إعلانات Google للسبا في المغرب",
        paragraphs: [
          "من يبحث عن «سبا الدار البيضاء» أو «مساج مراكش» لديه نية واضحة للحجز. Google Ads يلتقط هذا الطلب. يغطي هذا الدليل الحملات والكلمات وصفحات الهبوط والميزانيات والأخطاء الشائعة.",
        ],
      },
      {
        id: "probleme",
        heading: "المشكلة: زيارات بلا حجوزات",
        paragraphs: [
          "تعزيز إنستغرام أو الإعلان نحو الصفحة الرئيسية غالباً لا يحوّل. بدون تتبع وصفحة عرض واضحة، تحسّن على عمى.",
        ],
        bullets: ["زيارات للموقع كله بدل عرض واحد", "لا تتبع للمكالمات أو واتساب", "كلمات عامة بلا مدينة", "ميزانية ضعيفة"],
      },
      {
        id: "intention",
        heading: "نية البحث في العافية",
        paragraphs: ["أعط الأولوية للاستعلامات المعاملاتية وأضف المدينة والحي. البحث عبر الجوال و«قربي» مهيمن."],
        bullets: ["معاملاتي: سبا + مدينة", "تجاري: باقة سبا", "محلي: حمام تقليدي قربي", "العلامة: احمِ اسم منشأتك"],
      },
      {
        id: "structure",
        heading: "هيكل الحملة الموصى به",
        paragraphs: ["البساطة عند الإطلاق أفضل."],
        bullets: ["Search — العلاجات الأساسية", "Search — حماية العلامة", "Performance Max في المرحلة 2", "إعادة الاستهداف في المرحلة 3"],
      },
      {
        id: "mots-cles",
        heading: "كلمات تحوّل (أمثلة مغربية)",
        paragraphs: ["ابدأ بالمطابقة التعبيرية/التامة مع كلمات سلبية."],
        bullets: ["سبا الدار البيضاء / مراكش / الرباط", "مساج + مدينة", "حمام تقليدي + مدينة", "إزالة شعر بالليزر + مدينة", "سلبيات: توظيف، مجاني، تدريب"],
      },
      {
        id: "annonces",
        heading: "إعلانات وإضافات تحجز",
        paragraphs: ["طابق الاستعلام واعرض الدليل ووفّر واتساب أو اتصال على الجوال."],
        bullets: ["عناوين بالمدينة والعرض", "أوصاف بالسعر من والتقييمات", "إضافات الموقع والاتصال", "صور حقيقية لفيديو Performance Max"],
      },
      {
        id: "landing",
        heading: "صفحة الهبوط + واتساب",
        paragraphs: ["عرض واحد، صفحة واحدة، دعوة واحدة للعمل. رسالة واتساب جاهزة. تتبّع كل عميل حتى الحجز."],
        bullets: ["تحميل الجوال أقل من 3 ثوان", "تقييمات وصور حقيقية", "تتبع تحويلات Google Ads"],
      },
      {
        id: "budget",
        heading: "الميزانية وتكلفة العميل في المغرب 2026",
        paragraphs: ["غالباً CPC محلي 2–8 درهم وCPL 25–80 درهم حسب المدينة. ابدأ بـ 150–300 درهم يومياً لمدة 30 يوماً. احسب ضريبة 20٪ على الإنفاق الإعلاني."],
      },
      {
        id: "meta-vs-google",
        heading: "Google Ads مقابل Meta للسبا",
        paragraphs: ["Google يحوّل النية؛ Meta يبني الرغبة. تقسيم شائع: 50–70٪ Google و30–50٪ Meta."],
      },
      {
        id: "etapes",
        heading: "الإطلاق في 7 خطوات",
        paragraphs: ["اتبع هذا التسلسل."],
        bullets: ["1. أصلح ملف Google Business", "2. أنشئ 2–3 صفحات عرض", "3. ثبّت التتبع", "4. أطلق البحث المحلي", "5. انتظر 14 يوماً", "6. أوقف الضعيف ووسّع القوي", "7. أضف Performance Max"],
      },
      {
        id: "erreurs",
        heading: "7 أخطاء تستنزف الميزانية",
        paragraphs: ["أخطاء شائعة في حسابات السبا."],
        bullets: ["استهداف كل المغرب", "عرض Display الرخيص فقط", "لا واتساب", "تحسين النقرات لا الحجوزات", "تجاهل التقييمات", "تغيير المزايدات يومياً", "عدم حماية العلامة"],
      },
      {
        id: "conclusion",
        heading: "املأ الجدول باكتساب قابل للقياس",
        paragraphs: [
          "Google Ads هو القناة الأكثر قابلية للتنبؤ للحجوزات المحلية عند وجود النية. Mohtaoua تدير حملات Google Ads للشركات الخدمية في المغرب — اطلب تدقيقاً مجانياً.",
        ],
      },
    ],
    faqs: [
      { question: "ما ميزانية Google Ads لسبا في المغرب؟", answer: "150–300 درهم يومياً لمدة 30 يوماً على الأقل على البحث المحلي." },
      { question: "Google أم إنستغرام لمعهد تجميل؟", answer: "الاثنان: Google للحجز بنيّة قوية، وإنستغرام/Meta للاكتشاف." },
      { question: "هل أحتاج تطبيق حجز أولاً؟", answer: "لا. نموذج قصير أو واتساب يكفي للبدء." },
      { question: "كيف أتتبع المكالمات؟", answer: "فعّل تتبع المكالمات وأصول الاتصال؛ المكالمات عبر الجوال غالباً أول تحويل." },
      { question: "هل Performance Max مناسب؟", answer: "نعم في المرحلة 2 مع أصول قوية. ابدأ بالبحث." },
      { question: "متى تظهر الحجوزات؟", answer: "عملاء خلال أيام؛ CPL مستقر خلال 2–4 أسابيع." },
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
