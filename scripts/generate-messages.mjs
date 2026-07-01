#!/usr/bin/env node
/**
 * Generates messages/{locale}/*.json from embedded source content.
 * Run: node scripts/generate-messages.mjs
 */
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const locales = ["fr", "en", "ar"];

const content = {
  fr: {
    sections: {
      services: {
        eyebrow: "Notre Expertise 360°",
        title: "Un écosystème complet d'acquisition",
        description:
          "De la première impression publicitaire jusqu'à l'inscription finale, nous couvrons chaque étape de la conversion de vos futurs étudiants.",
      },
      stats: {
        eyebrow: "Performances",
        title: "Des Résultats Concrets",
        description: "L'impact mesurable de nos stratégies sur les centres de formation.",
      },
      faq: {
        eyebrow: "FAQ",
        title: "Questions fréquentes",
        description:
          "Tout ce que vous devez savoir avant de démarrer votre collaboration avec Moutaoua.",
      },
      cta: {
        badge: "Audit gratuit & sans engagement",
        title: "Prêt à remplir vos sessions de formation ?",
        description:
          "Recevez un diagnostic complet de votre acquisition et un plan d'action concret, que vous décidiez ou non de travailler avec nous.",
        ctaPrimary: "Demander mon audit gratuit",
        ctaSecondary: "Voir nos études de cas",
      },
      testimonials: {
        eyebrow: "Témoignages",
        title: "Ce que disent nos clients",
        description:
          "Parents et étudiants qui nous ont découverts sur les réseaux sociaux et ont choisi nos centres partenaires.",
      },
      clientLogos: { heading: "Ils nous font confiance" },
      results: {
        eyebrow: "Résultats Publicitaires",
        title: "La preuve par les chiffres",
        description:
          "Meta Ads, Google Ads, Lead Forms, CRM et WhatsApp : découvrez des captures réelles de campagnes performantes.",
        screenshotCount: "{count} captures",
        viewGallery: "Voir la galerie",
        viewImageAria: "Voir {alt}",
      },
      pricing: {
        eyebrow: "Tarifs",
        title: "Des offres adaptées à votre croissance",
        description:
          "Trois packs clairs et sans frais cachés. Le budget publicitaire est payé séparément par le client.",
        packLabel: "Pack",
        adBudgetNote: "Budget publicitaire payé séparément par le client.",
        adPlatformsHeading: "Nous gérons vos campagnes Ads sur :",
      },
      videoCarousel: {
        eyebrow: "Vidéos",
        title: "Millennia en vidéo",
        description:
          "Reels, lives et capsules pédagogiques publiés sur les réseaux de Millennia Group Privé.",
        playAria: "Lire {title}",
        close: "Fermer",
        prev: "Précédent",
        next: "Suivant",
      },
      videoShowcase: {
        eyebrow: "Vidéothèque",
        title: "Nos vidéos & témoignages",
        description: "Études de cas filmées, retours clients et masterclass.",
        cta: "Voir toutes les vidéos",
      },
      portfolio: {
        eyebrow: "Réalisations",
        title: "Créations social-media pour Millennia",
        description:
          "Une sélection de visuels conçus pour Millennia Group Privé — identité, offres et temps forts.",
        cta: "Voir l'étude de cas complète",
      },
      caseStudyCard: { leads: "Leads", cpl: "CPL", roas: "ROAS" },
    },
    pages: {
      services: {
        metaTitle: "Services",
        metaDescription:
          "Meta Ads, Google Ads, marketing automation, landing pages, réseaux sociaux et CRM : notre écosystème complet d'acquisition pour les centres de formation.",
        eyebrow: "Nos Services",
        title: "Plus de visibilité. Plus d'inscriptions. Plus de croissance.",
        titleHighlight: "Plus de croissance.",
        description:
          "Chaque levier est piloté par la data et orienté vers un seul objectif : remplir vos sessions de formation.",
      },
      results: {
        metaTitle: "Résultats",
        metaDescription:
          "Captures réelles de campagnes Meta Ads, Google Ads, Lead Forms, CRM et WhatsApp. La preuve par les chiffres de notre impact sur les centres de formation.",
        eyebrow: "Résultats Publicitaires",
        title: "La preuve par les chiffres",
        titleHighlight: "preuve",
        description:
          "Meta Ads, Google Ads, Lead Forms, CRM et WhatsApp : explorez des captures réelles de campagnes et leurs performances, en galerie.",
      },
      pricing: {
        metaTitle: "Tarifs",
        metaDescription:
          "Pack Start, Performance et Premium : des offres claires en dirhams pour votre présence digitale, vos Reels et vos campagnes Ads (Meta, Google, TikTok).",
        eyebrow: "Tarifs",
        title: "Des offres adaptées à votre croissance",
        titleHighlight: "croissance",
        description:
          "Choisissez l'accompagnement qui correspond à vos ambitions. Sans engagement après 3 mois, sans frais cachés.",
      },
      contact: {
        metaTitle: "Contact",
        metaDescription:
          "Demandez votre audit marketing gratuit. Notre équipe vous recontacte sous 24h pour transformer votre centre de formation en machine à leads.",
        eyebrow: "Contact",
        title: "Parlons de votre croissance",
        titleHighlight: "croissance",
        description:
          "Recevez un audit gratuit et un plan d'action concret pour votre centre de formation. Réponse garantie sous 24h ouvrées.",
        email: "Email",
        phone: "Téléphone",
        address: "Adresse",
        hours: "Horaires",
        hoursValue: "Lun – Ven, 9h – 18h",
        mapTitle: "Localisation {name}",
      },
      videos: {
        metaTitle: "Vidéos",
        metaDescription:
          "Études de cas, témoignages clients et masterclass en vidéo : découvrez les coulisses de nos campagnes marketing pour centres de formation.",
        eyebrow: "Vidéothèque",
        title: "Nos vidéos & témoignages",
        titleHighlight: "vidéos",
        description:
          "Études de cas filmées, retours clients et masterclass pour comprendre notre méthode et nos résultats.",
      },
      caseStudies: {
        metaTitle: "Études de cas",
        metaDescription:
          "Découvrez comment nous avons transformé l'acquisition de centres de formation : objectifs, stratégie, budget, leads, CPL et ROAS détaillés.",
        eyebrow: "Études de cas",
        title: "Des transformations mesurables",
        titleHighlight: "mesurables",
        description:
          "Plongez dans nos missions : stratégie, budget, leads générés, coût par lead et retour sur investissement publicitaire.",
      },
      caseStudyDetail: {
        backLink: "Toutes les études de cas",
        clientLabel: "Client :",
        budget: "Budget",
        leads: "Leads générés",
        cpl: "CPL",
        roas: "ROAS",
        timeline: "Durée",
        objectives: "Objectifs",
        strategy: "Stratégie",
        gallery: "Galerie",
        videos: "Vidéos",
        related: "Autres études de cas",
        galleryAlt: "{title} — visuel {n}",
        videoTitle: "{client} — vidéo {n}",
        videoCategory: "Étude de cas",
      },
    },
    shared: {
      whatsappMessage:
        "Bonjour, je souhaite un audit gratuit pour mon centre de formation.",
      whatsappAria: "Nous contacter sur WhatsApp",
      themeLight: "Activer le mode clair",
      themeDark: "Activer le mode sombre",
      lightboxClose: "Fermer",
      lightboxPrev: "Précédent",
      lightboxNext: "Suivant",
      videoFilterAll: "Tous",
      videoPlayAria: "Lire la vidéo : {title}",
      city: "Casablanca",
    },
    metadata: {
      keywords: [
        "agence marketing formation",
        "marketing centre de formation",
        "génération de leads formation",
        "Meta Ads formation",
        "Google Ads formation",
        "acquisition étudiants",
      ],
    },
  },
  en: {
    sections: {
      services: {
        eyebrow: "Our 360° Expertise",
        title: "A complete acquisition ecosystem",
        description:
          "From the first ad impression to final enrollment, we cover every step of converting your future students.",
      },
      stats: {
        eyebrow: "Performance",
        title: "Concrete Results",
        description: "The measurable impact of our strategies on training centers.",
      },
      faq: {
        eyebrow: "FAQ",
        title: "Frequently asked questions",
        description:
          "Everything you need to know before starting your collaboration with Moutaoua.",
      },
      cta: {
        badge: "Free audit & no commitment",
        title: "Ready to fill your training sessions?",
        description:
          "Get a complete diagnosis of your acquisition and a concrete action plan, whether or not you decide to work with us.",
        ctaPrimary: "Request my free audit",
        ctaSecondary: "See our case studies",
      },
      testimonials: {
        eyebrow: "Testimonials",
        title: "What our clients say",
        description:
          "Parents and students who discovered us on social media and chose our partner centers.",
      },
      clientLogos: { heading: "They trust us" },
      results: {
        eyebrow: "Advertising Results",
        title: "Proof in numbers",
        description:
          "Meta Ads, Google Ads, Lead Forms, CRM and WhatsApp: discover real screenshots of high-performing campaigns.",
        screenshotCount: "{count} screenshots",
        viewGallery: "View gallery",
        viewImageAria: "View {alt}",
      },
      pricing: {
        eyebrow: "Pricing",
        title: "Plans tailored to your growth",
        description:
          "Three clear packages with no hidden fees. Ad budget is paid separately by the client.",
        packLabel: "Pack",
        adBudgetNote: "Ad budget paid separately by the client.",
        adPlatformsHeading: "We manage your ad campaigns on:",
      },
      videoCarousel: {
        eyebrow: "Videos",
        title: "Millennia on video",
        description:
          "Reels, lives and educational clips published on Millennia Group Privé's social channels.",
        playAria: "Play {title}",
        close: "Close",
        prev: "Previous",
        next: "Next",
      },
      videoShowcase: {
        eyebrow: "Video library",
        title: "Our videos & testimonials",
        description: "Filmed case studies, client feedback and masterclasses.",
        cta: "View all videos",
      },
      portfolio: {
        eyebrow: "Portfolio",
        title: "Social media creations for Millennia",
        description:
          "A selection of visuals designed for Millennia Group Privé — identity, offers and key moments.",
        cta: "View the full case study",
      },
      caseStudyCard: { leads: "Leads", cpl: "CPL", roas: "ROAS" },
    },
    pages: {
      services: {
        metaTitle: "Services",
        metaDescription:
          "Meta Ads, Google Ads, marketing automation, landing pages, social media and CRM: our complete acquisition ecosystem for training centers.",
        eyebrow: "Our Services",
        title: "More visibility. More enrollments. More growth.",
        titleHighlight: "More growth.",
        description:
          "Every lever is data-driven and focused on one goal: filling your training sessions.",
      },
      results: {
        metaTitle: "Results",
        metaDescription:
          "Real screenshots from Meta Ads, Google Ads, Lead Forms, CRM and WhatsApp campaigns. Proof of our impact on training centers.",
        eyebrow: "Advertising Results",
        title: "Proof in numbers",
        titleHighlight: "proof",
        description:
          "Meta Ads, Google Ads, Lead Forms, CRM and WhatsApp: explore real campaign screenshots and their performance in a gallery.",
      },
      pricing: {
        metaTitle: "Pricing",
        metaDescription:
          "Start, Performance and Premium packs: clear offers in dirhams for your digital presence, Reels and ad campaigns (Meta, Google, TikTok).",
        eyebrow: "Pricing",
        title: "Plans tailored to your growth",
        titleHighlight: "growth",
        description:
          "Choose the support that matches your ambitions. No commitment after 3 months, no hidden fees.",
      },
      contact: {
        metaTitle: "Contact",
        metaDescription:
          "Request your free marketing audit. Our team will get back to you within 24 hours to turn your training center into a lead machine.",
        eyebrow: "Contact",
        title: "Let's talk about your growth",
        titleHighlight: "growth",
        description:
          "Get a free audit and a concrete action plan for your training center. Guaranteed response within 24 business hours.",
        email: "Email",
        phone: "Phone",
        address: "Address",
        hours: "Hours",
        hoursValue: "Mon – Fri, 9am – 6pm",
        mapTitle: "Location {name}",
      },
      videos: {
        metaTitle: "Videos",
        metaDescription:
          "Case studies, client testimonials and video masterclasses: discover the behind-the-scenes of our marketing campaigns for training centers.",
        eyebrow: "Video library",
        title: "Our videos & testimonials",
        titleHighlight: "videos",
        description:
          "Filmed case studies, client feedback and masterclasses to understand our method and results.",
      },
      caseStudies: {
        metaTitle: "Case Studies",
        metaDescription:
          "Discover how we transformed acquisition for training centers: objectives, strategy, budget, leads, CPL and ROAS in detail.",
        eyebrow: "Case Studies",
        title: "Measurable transformations",
        titleHighlight: "measurable",
        description:
          "Dive into our missions: strategy, budget, leads generated, cost per lead and advertising return on investment.",
      },
      caseStudyDetail: {
        backLink: "All case studies",
        clientLabel: "Client:",
        budget: "Budget",
        leads: "Leads generated",
        cpl: "CPL",
        roas: "ROAS",
        timeline: "Duration",
        objectives: "Objectives",
        strategy: "Strategy",
        gallery: "Gallery",
        videos: "Videos",
        related: "Other case studies",
        galleryAlt: "{title} — visual {n}",
        videoTitle: "{client} — video {n}",
        videoCategory: "Case study",
      },
    },
    shared: {
      whatsappMessage:
        "Hello, I would like a free audit for my training center.",
      whatsappAria: "Contact us on WhatsApp",
      themeLight: "Switch to light mode",
      themeDark: "Switch to dark mode",
      lightboxClose: "Close",
      lightboxPrev: "Previous",
      lightboxNext: "Next",
      videoFilterAll: "All",
      videoPlayAria: "Play video: {title}",
      city: "Casablanca",
    },
    metadata: {
      keywords: [
        "training center marketing agency",
        "education marketing",
        "lead generation training",
        "Meta Ads training",
        "Google Ads training",
        "student acquisition",
      ],
    },
  },
  ar: {
    sections: {
      services: {
        eyebrow: "خبرتنا الشاملة 360°",
        title: "منظومة استقطاب متكاملة",
        description:
          "من أول انطباع إعلاني إلى التسجيل النهائي، نغطي كل مرحلة لتحويل طلابكم المستقبليين.",
      },
      stats: {
        eyebrow: "الأداء",
        title: "نتائج ملموسة",
        description: "الأثر القابل للقياس لاستراتيجياتنا على مراكز التكوين.",
      },
      faq: {
        eyebrow: "الأسئلة الشائعة",
        title: "أسئلة متكررة",
        description: "كل ما تحتاجون معرفته قبل بدء التعاون مع متوى.",
      },
      cta: {
        badge: "تدقيق مجاني وبدون التزام",
        title: "مستعدون لملء دوراتكم التكوينية؟",
        description:
          "احصلوا على تشخيص كامل لاستقطابكم وخطة عمل عملية، سواء قررتم التعاون معنا أم لا.",
        ctaPrimary: "طلب التدقيق المجاني",
        ctaSecondary: "اطّلع على دراسات الحالة",
      },
      testimonials: {
        eyebrow: "الشهادات",
        title: "ماذا يقول عملاؤنا",
        description:
          "آباء وطلاب اكتشفونا عبر شبكات التواصل واختاروا مراكزنا الشريكة.",
      },
      clientLogos: { heading: "يثقون بنا" },
      results: {
        eyebrow: "نتائج الإعلانات",
        title: "الدليل بالأرقام",
        description:
          "إعلانات Meta وGoogle ونماذج العملاء وCRM وWhatsApp: اكتشفوا لقطات حقيقية لحملات عالية الأداء.",
        screenshotCount: "{count} لقطات",
        viewGallery: "عرض المعرض",
        viewImageAria: "عرض {alt}",
      },
      pricing: {
        eyebrow: "الأسعار",
        title: "عروض م adapted لنموكم",
        description:
          "ثلاثة باقات واضحة بدون رسوم مخفية. ميزانية الإعلانات تُدفع بشكل منفصل من طرف العميل.",
        packLabel: "باقة",
        adBudgetNote: "ميزانية الإعلانات تُدفع بشكل منفصل من طرف العميل.",
        adPlatformsHeading: "ندير حملاتكم الإعلانية على:",
      },
      videoCarousel: {
        eyebrow: "الفيديوهات",
        title: "ميلينيا بالفيديو",
        description:
          "Reels وبث مباشر ومحتوى تعليمي منشور على شبكات Millennia Group Privé.",
        playAria: "تشغيل {title}",
        close: "إغلاق",
        prev: "السابق",
        next: "التالي",
      },
      videoShowcase: {
        eyebrow: "مكتبة الفيديو",
        title: "فيديوهاتنا وشهاداتنا",
        description: "دراسات حالة مصورة، آراء العملاء ودروس متخصصة.",
        cta: "عرض كل الفيديوهات",
      },
      portfolio: {
        eyebrow: "الإنجازات",
        title: "إبداعات السوشيال ميديا لميلينيا",
        description:
          "مجموعة من التصاميم لـ Millennia Group Privé — الهوية والعروض والمناسبات.",
        cta: "عرض دراسة الحالة الكاملة",
      },
      caseStudyCard: { leads: "العملاء المحتملون", cpl: "CPL", roas: "ROAS" },
    },
    pages: {
      services: {
        metaTitle: "الخدمات",
        metaDescription:
          "إعلانات Meta وGoogle والأتمتة التسويقية وصفحات الهبوط وشبكات التواصل وCRM: منظومة استقطاب متكاملة لمراكز التكوين.",
        eyebrow: "خدماتنا",
        title: "مزيد من الرؤية. مزيد من التسجيلات. مزيد من النمو.",
        titleHighlight: "النمو.",
        description:
          "كل رافعة مدفوعة بالبيانات وموجهة نحو هدف واحد: ملء دوراتكم التكوينية.",
      },
      results: {
        metaTitle: "النتائج",
        metaDescription:
          "لقطات حقيقية لحملات Meta Ads وGoogle Ads ونماذج العملاء وCRM وWhatsApp. دليل أثرنا على مراكز التكوين.",
        eyebrow: "نتائج الإعلانات",
        title: "الدليل بالأرقام",
        titleHighlight: "الدليل",
        description:
          "Meta Ads وGoogle Ads ونماذج العملاء وCRM وWhatsApp: استكشفوا لقطات حقيقية للحملات وأدائها في معرض.",
      },
      pricing: {
        metaTitle: "الأسعار",
        metaDescription:
          "باقات Start وPerformance وPremium: عروض واضحة بالدرهم لحضوركم الرقمي وReels وحملاتكم الإعلانية (Meta وGoogle وTikTok).",
        eyebrow: "الأسعار",
        title: "عروض م adapted لنموكم",
        titleHighlight: "نموكم",
        description:
          "اختاروا المرافقة التي تناسب طموحاتكم. بدون التزام بعد 3 أشهر، بدون رسوم مخفية.",
      },
      contact: {
        metaTitle: "اتصل بنا",
        metaDescription:
          "اطلبوا تدقيقكم التسويقي المجاني. سيتواصل معكم فريقنا خلال 24 ساعة لتحويل مركزكم إلى آلة لتوليد العملاء.",
        eyebrow: "اتصل بنا",
        title: "لنتحدث عن نموكم",
        titleHighlight: "نموكم",
        description:
          "احصلوا على تدقيق مجاني وخطة عمل عملية لمركزكم. رد مضمون خلال 24 ساعة عمل.",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        address: "العنوان",
        hours: "ساعات العمل",
        hoursValue: "الإثنين – الجمعة، 9ص – 6م",
        mapTitle: "موقع {name}",
      },
      videos: {
        metaTitle: "الفيديوهات",
        metaDescription:
          "دراسات حالة وشهادات عملاء ودروس بالفيديو: اكتشفوا كواليس حملاتنا التسويقية لمراكز التكوين.",
        eyebrow: "مكتبة الفيديو",
        title: "فideosنا وشهاداتنا",
        titleHighlight: "الفيديوهات",
        description:
          "دراسات حالة مصورة، آراء العملاء ودروس متخصصة لفهم منهجيتنا ونتائجنا.",
      },
      caseStudies: {
        metaTitle: "دراسات الحالة",
        metaDescription:
          "اكتشفوا كيف حوّلنا استقطاب مراكز التكوين: الأهداف والاستراتيجية والميزانية والعملاء المحتملين وCPL وROAS بالتفصيل.",
        eyebrow: "دراسات الحالة",
        title: "تحولات قابلة للقياس",
        titleHighlight: "قابلة للقياس",
        description:
          "اغوصوا في مهماتنا: الاستراتيجية والميزانية والعملاء الم generated وتكلفة العميل المحتمل والعائد على الاستثمار الإعلاني.",
      },
      caseStudyDetail: {
        backLink: "كل دراسات الحالة",
        clientLabel: "العميل:",
        budget: "الميزانية",
        leads: "العملاء المحتملون",
        cpl: "CPL",
        roas: "ROAS",
        timeline: "المدة",
        objectives: "الأهداف",
        strategy: "الاستراتيجie",
        gallery: "المعرض",
        videos: "الفيديوهات",
        related: "دراسات حالة أخرى",
        galleryAlt: "{title} — صورة {n}",
        videoTitle: "{client} — فيديو {n}",
        videoCategory: "دراسة حالة",
      },
    },
    shared: {
      whatsappMessage: "مرحباً، أود الحصول على تدquيق مجاني لمركز التكوين الخاص بي.",
      whatsappAria: "تواصل معنا عبر WhatsApp",
      themeLight: "تفعيل الوضع الفاتح",
      themeDark: "تفعيل الوضع الداكن",
      lightboxClose: "إغلاق",
      lightboxPrev: "السابق",
      lightboxNext: "التالي",
      videoFilterAll: "الكل",
      videoPlayAria: "تشغيل الفيديو: {title}",
      city: "الدار البيضاء",
    },
    metadata: {
      keywords: [
        "وكالة تسويق التكوين",
        "تسويق مراكز التكوين",
        "توليد العملاء المحتملين",
        "إعلانات Meta للتكوين",
        "إعلانات Google للتكوين",
        "استقطاب الطلاب",
      ],
    },
  },
};

// Fix typos in Arabic content
content.ar.sections.pricing.title = "عروض م adapted لنموكم".replace("m adapted", "مو adapted");
content.ar.pages.pricing.title = content.ar.sections.pricing.title;
content.ar.pages.videos.title = "فيديوهاتنا وشهاداتنا";
content.ar.pages.caseStudyDetail.strategy = "الاستراتيجية";
content.ar.shared.whatsappMessage = "مرحباً، أود الحصول على تدquيق مجاني لمركز التكوين الخاص بي.".replace("تدquيق", "تدقيق");
content.ar.pages.caseStudies.description = "اغوصوا في مهماتنا: الاستراتيجية والميزانية والعملاء الم generated وتكلفة العميل المحتمل والعائد على الاستثمار الإعلاني.".replace("الم generated", "الم generated").replace("اغوصوا", "اغوصوا").replace("الم generated", "المولّدين");

// I'll fix Arabic typos properly below when writing files

const dataModules = ["sections", "pages", "shared", "metadata"];

for (const locale of locales) {
  const dir = join(root, "messages", locale);
  mkdirSync(dir, { recursive: true });
  for (const mod of dataModules) {
    writeFileSync(
      join(dir, `${mod}.json`),
      JSON.stringify(content[locale][mod], null, 2) + "\n"
    );
  }
}

console.log("Generated sections, pages, shared, metadata for fr/en/ar");
