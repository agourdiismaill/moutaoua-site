#!/usr/bin/env node
/**
 * Lot 4 — hub communication Fès + pages pricing SEO (FR/EN/AR).
 * Usage : node scripts/add-content-lot-4.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["fr", "en", "ar"];

const fesCommunication = {
  fr: {
    metaTitle: "Agence de Communication Fès | Image de Marque & Artisanat",
    metaDescription:
      "Agence de communication à Fès : image de marque, contenus, photo/vidéo et communication locale pour l'artisanat, le commerce et le tourisme culturel. 25 expertises locales et audit gratuit.",
    h1: "Agence de communication à Fès",
    intro:
      "À Fès, la marque doit conjuguer authenticité et modernité : artisanat, commerce traditionnel et tourisme culturel. Mohtaoua construit une communication cohérente : identité, contenus, photo, vidéo et supports adaptés au territoire.",
    overview: {
      what: "Le hub communication qui regroupe nos expertises marque, contenus, création et événementiel pour les entreprises de Fès.",
      who: "Artisans, commerçants, acteurs du tourisme culturel et de l'éducation locale.",
      benefits: [
        "Une image de marque authentique et contemporaine",
        "Des contenus qui valorisent le patrimoine et le savoir-faire local",
        "Une production photo et vidéo adaptée aux circuits touristiques et commerciaux",
      ],
      topics: [
        "Plateforme de marque",
        "Identité visuelle",
        "Contenus culturels",
        "Photo et vidéo",
        "Communication événementielle",
      ],
      takeaways: [
        "25 expertises communication disponibles à Fès",
        "Équipe créative et éditoriale basée au Maroc",
        "Audit gratuit avec recommandations éditoriales",
      ],
    },
    paragraphs: [
      "Fès possède un tissu économique unique mêlant artisanat, commerce de proximité et tourisme culturel. Les marques doivent raconter une histoire authentique sans paraître datées.",
      "Notre rôle d'agence de communication à Fès est de bâtir une plateforme de marque claire, puis de produire des contenus, visuels et supports qui valorisent le patrimoine et le savoir-faire local.",
      "Nous soignons la cohérence entre boutique physique, réseaux sociaux et supports print, pour que l'image de marque accompagne la croissance commerciale.",
      "La section ci-dessous relie nos expertises communication déclinées à Fès : branding, création, contenus, photo, vidéo et événementiel, chacune accessible via sa page locale dédiée.",
    ],
    challenges: [
      "Une image qui peine à moderniser l'artisanat sans le dénaturer",
      "Des contenus irréguliers selon la saison touristique",
      "Une production visuelle insuffisante pour les circuits culturels",
      "Une marque peu identifiable face aux concurrents nationaux",
    ],
    approach: [
      "Audit de la marque, des audiences et des contenus",
      "Plateforme de marque et ligne éditoriale ancrée localement",
      "Production de contenus, visuels et supports",
      "Diffusion locale et mesure de la notoriété",
    ],
    faqs: [
      {
        question: "Quelles expertises couvre votre agence de communication à Fès ?",
        answer:
          "Stratégie et plateforme de marque, identité visuelle, contenus, réseaux sociaux, photo, vidéo et communication événementielle.",
      },
      {
        question: "Quelle différence avec votre agence digitale à Fès ?",
        answer:
          "L'agence de communication porte la marque, l'image et les contenus ; l'agence digitale pilote l'acquisition et la performance. Les deux se complètent.",
      },
      {
        question: "Travaillez-vous avec l'artisanat et le tourisme culturel ?",
        answer:
          "Oui. Nous aidons les acteurs locaux à valoriser leur patrimoine et leur savoir-faire via des contenus et supports adaptés.",
      },
      {
        question: "Comment démarrer avec Mohtaoua ?",
        answer:
          "Demandez un audit gratuit. Nous analysons votre image et proposons des recommandations éditoriales priorisées, sans devis ferme avant d'avoir cadré le besoin.",
      },
    ],
  },
  en: {
    metaTitle: "Communication Agency Fes | Brand Image & Local Craft",
    metaDescription:
      "Communication agency in Fes: brand image, content, photo/video and local communications for crafts, retail and cultural tourism. 25 local expertise pages and free audit.",
    h1: "Communication agency in Fes",
    intro:
      "In Fes, brands must blend authenticity and modernity: crafts, traditional commerce and cultural tourism. Mohtaoua builds coherent communications: identity, content, photo, video and locally adapted materials.",
    overview: {
      what: "The communication hub grouping our brand, content, creative and event expertise for businesses in Fes.",
      who: "Artisans, retailers, cultural tourism operators and local education providers.",
      benefits: [
        "An authentic yet contemporary brand image",
        "Content that highlights local heritage and craftsmanship",
        "Photo and video production suited to tourism and retail circuits",
      ],
      topics: [
        "Brand platform",
        "Visual identity",
        "Cultural content",
        "Photo and video",
        "Event communications",
      ],
      takeaways: [
        "25 communication expertise pages available in Fes",
        "Creative and editorial team based in Morocco",
        "Free audit with prioritized editorial recommendations",
      ],
    },
    paragraphs: [
      "Fes has a unique economic fabric combining crafts, local retail and cultural tourism. Brands must tell an authentic story without appearing outdated.",
      "Our role as a communication agency in Fes is to build a clear brand platform, then produce content, visuals and materials that highlight local heritage and know-how.",
      "We ensure consistency between physical stores, social media and print materials so the brand image supports commercial growth.",
      "The section below links our communication expertise in Fes: branding, creative, content, photo, video and events — each with its own local page.",
    ],
    challenges: [
      "A brand image that struggles to modernize crafts without losing authenticity",
      "Irregular content depending on the tourist season",
      "Insufficient visual production for cultural circuits",
      "Low local brand recognition vs national competitors",
    ],
    approach: [
      "Audit of brand, audiences and existing content",
      "Brand platform and locally anchored editorial line",
      "Content, visual and material production",
      "Local distribution and awareness measurement",
    ],
    faqs: [
      {
        question: "What expertise does your communication agency in Fes cover?",
        answer:
          "Brand strategy and platform, visual identity, content, social media, photo, video and event communications.",
      },
      {
        question: "How is this different from your digital agency in Fes?",
        answer:
          "The communication agency handles brand, image and content; the digital agency drives acquisition and performance. Both complement each other.",
      },
      {
        question: "Do you work with crafts and cultural tourism?",
        answer:
          "Yes. We help local players showcase heritage and craftsmanship through adapted content and materials.",
      },
      {
        question: "How do I get started with Mohtaoua?",
        answer:
          "Request a free audit. We review your brand image and provide prioritized editorial recommendations — no fixed quote before scoping the need.",
      },
    ],
  },
  ar: {
    metaTitle: "وكالة اتصال فاس | الهوية البصرية والحرف التقليدية",
    metaDescription:
      "وكالة اتصال في فاس: صورة العلامة، المحتوى، التصوير/الفيديو والاتصال المحلي للحرف والتجارة والسياحة الثقافية. 25 خبرة محلية ومراجعة مجانية.",
    h1: "وكالة اتصال في فاس",
    intro:
      "في فاس، يجب أن تجمع العلامة بين الأصالة والحداثة: الحرف اليدوية والتجارة التقليدية والسياحة الثقافية. تبني Mohtaoua اتصالاً متماسكاً: الهوية والمحتوى والتصوير والفيديو والمواد المناسبة للإقليم.",
    overview: {
      what: "مركز الاتصال الذي يجمع خبراتنا في العلامة والمحتوى والإبداع والفعاليات للشركات في فاس.",
      who: "الحرفيون والتجار ومشغلو السياحة الثقافية ومؤسسات التعليم المحلية.",
      benefits: [
        "صورة علامة أصيلة ومعاصرة",
        "محتوى يبرز التراث والمهارة المحلية",
        "إنتاج صور وفيديو مناسب للدوائر السياحية والتجارية",
      ],
      topics: [
        "منصة العلامة",
        "الهوية البصرية",
        "محتوى ثقافي",
        "التصوير والفيديو",
        "اتصال الفعاليات",
      ],
      takeaways: [
        "25 خبرة اتصال متاحة في فاس",
        "فريق إبداعي وتحريري مقره المغرب",
        "مراجعة مجانية مع توصيات تحريرية مرتبة",
      ],
    },
    paragraphs: [
      "تمتلك فاس نسيجاً اقتصادياً فريداً يجمع الحرف والتجارة المحلية والسياحة الثقافية. يجب على العلامات أن تروي قصة أصيلة دون أن تبدو قديمة.",
      "دورنا كوكالة اتصال في فاس هو بناء منصة علامة واضحة، ثم إنتاج محتوى ومرئيات ومواد تبرز التراث والمهارة المحلية.",
      "نهتم بالاتساق بين المتجر الفعلي ووسائل التواصل والمواد المطبوعة حتى تدعم صورة العلامة النمو التجاري.",
      "يربط القسم أدناه خبراتنا في الاتصال بفاس: العلامة والإبداع والمحتوى والتصوير والفيديو والفعاليات — لكل منها صفحة محلية مخصصة.",
    ],
    challenges: [
      "صورة علامة تواجه صعوبة في تحديث الحرف دون فقدان الأصالة",
      "محتوى غير منتظم حسب الموسم السياحي",
      "إنتاج بصري غير كافٍ للدوائر الثقافية",
      "علامة غير واضحة محلياً أمام المنافسين الوطنيين",
    ],
    approach: [
      "مراجعة العلامة والجماهير والمحتوى الحالي",
      "منصة علامة وخط تحريري محلي",
      "إنتاج المحتوى والمرئيات والمواد",
      "النشر المحلي وقياس الوعي",
    ],
    faqs: [
      {
        question: "ما الخبرات التي تغطيها وكالة الاتصال في فاس؟",
        answer:
          "استراتيجية ومنصة العلامة، الهوية البصرية، المحتوى، وسائل التواصل، التصوير والفيديو واتصال الفعاليات.",
      },
      {
        question: "ما الفرق عن الوكالة الرقمية في فاس؟",
        answer:
          "وكالة الاتصال تهتم بالعلامة والصورة والمحتوى؛ الوكالة الرقمية تقود الاكتساب والأداء. كلاهما يكمل الآخر.",
      },
      {
        question: "هل تعملون مع الحرف والسياحة الثقافية؟",
        answer:
          "نعم. نساعد الفاعلين المحليين على إبراز التراث والمهارة عبر محتوى ومواد مناسبة.",
      },
      {
        question: "كيف أبدأ مع Mohtaoua؟",
        answer:
          "اطلب مراجعة مجانية. نحلل صورة علامتك ونقدم توصيات تحريرية مرتبة، دون عرض سعر نهائي قبل تحديد الاحتياج.",
      },
    ],
  },
};

const pricingPages = {
  fr: {
    labels: {
      home: "Accueil",
      pricing: "Tarifs",
      share: "Partager",
      aiOverview: "Vue d'ensemble",
      what: "De quoi parle cette page ?",
      who: "Pour qui ?",
      benefits: "Bénéfices",
      topics: "Sujets couverts",
      takeaways: "À retenir",
      readingTime: "Temps de lecture estimé",
      indicativePrice: "Fourchette indicative",
      perMonth: "par mois",
      perProject: "par projet",
      included: "Inclus",
      faq: "Questions fréquentes",
    },
    items: {
      "creation-site-web-maroc": {
        metaTitle: "Prix création site web Maroc 2026 | Fourchettes indicatives",
        metaDescription:
          "Combien coûte un site web au Maroc ? Fourchettes indicatives par niveau (basique, standard, premium), facteurs de prix et FAQ. Devis personnalisé après audit.",
        h1: "Prix création site web au Maroc",
        intro:
          "Le coût d'un site web au Maroc varie selon le type de projet, le nombre de pages, les fonctionnalités et le niveau de design. Cette page présente des fourchettes indicatives — un devis ferme nécessite un cadrage précis de votre besoin.",
        overview: {
          what: "Guide des fourchettes de prix pour la création de sites web au Maroc, avec trois niveaux indicatifs et les facteurs qui influencent le budget.",
          who: "Dirigeants de PME, commerçants, centres de formation et organisations qui prévoient un site vitrine, corporate ou e-commerce.",
          benefits: [
            "Comprendre les ordres de grandeur avant un appel commercial",
            "Identifier le niveau de projet adapté à votre ambition",
            "Anticiper les postes de coût (design, développement, contenu, SEO)",
          ],
          topics: [
            "Fourchettes par niveau",
            "Facteurs de prix",
            "Inclus par formule",
            "Lien avec le service sites web",
          ],
          takeaways: [
            "Trois niveaux indicatifs : basique, standard, premium",
            "Budget projet typique de 6 000 à 120 000 MAD",
            "Devis ferme uniquement après audit et cadrage",
          ],
        },
        factorsTitle: "Facteurs qui influencent le prix d'un site web",
        factors: [
          "Nombre de pages et complexité de l'arborescence",
          "Design sur-mesure vs template adapté",
          "Fonctionnalités (formulaires, blog, multilingue, e-commerce)",
          "Intégration CRM, analytics et outils marketing",
          "Rédaction, traduction et optimisation SEO initiale",
          "Maintenance, hébergement et évolutions post-lancement",
        ],
        tiers: {
          basic: {
            name: "Basique",
            description: "Site vitrine compact pour une présence en ligne professionnelle.",
            includes: [
              "5 à 8 pages",
              "Design adapté à votre charte",
              "Formulaire de contact",
              "Version mobile responsive",
              "Configuration SEO de base",
            ],
          },
          standard: {
            name: "Standard",
            description: "Site corporate ou vitrine enrichi avec contenus et intégrations.",
            includes: [
              "10 à 20 pages",
              "Design personnalisé",
              "Blog ou actualités",
              "Multilingue (2 langues)",
              "Intégrations marketing (GA4, pixels)",
              "Optimisation SEO on-page",
            ],
          },
          premium: {
            name: "Premium",
            description: "Projet sur-mesure : e-commerce, portail ou plateforme avancée.",
            includes: [
              "Architecture complexe ou e-commerce",
              "Design UX/UI avancé",
              "Intégrations CRM et automatisation",
              "Performance et sécurité renforcées",
              "Accompagnement éditorial et SEO",
              "Maintenance et évolutions planifiées",
            ],
          },
        },
        disclaimer:
          "Ces fourchettes sont indicatives et peuvent varier selon votre secteur, vos délais et vos exigences techniques. Mohtaoua ne s'engage sur aucun prix ferme sans audit préalable. Demandez un devis personnalisé pour un chiffrage exact.",
        contextLinks: {
          service: "Découvrir notre service création de sites web",
          packs: "Voir nos packs marketing et tarifs",
        },
        faqs: [
          {
            question: "Combien coûte un site vitrine au Maroc ?",
            answer:
              "Un site vitrine professionnel se situe généralement entre 6 000 et 35 000 MAD selon le nombre de pages, le design et les fonctionnalités. Les projets e-commerce ou sur-mesure peuvent dépasser 40 000 MAD.",
          },
          {
            question: "Le prix inclut-il l'hébergement et le nom de domaine ?",
            answer:
              "Souvent non dans le prix de création initial. L'hébergement, le domaine et la maintenance peuvent faire l'objet d'un abonnement annuel séparé, à préciser dans le devis.",
          },
          {
            question: "Proposez-vous un paiement échelonné ?",
            answer:
              "Oui, selon l'ampleur du projet. Un échéancier est défini dans le devis après validation du périmètre.",
          },
          {
            question: "Comment obtenir un devis exact ?",
            answer:
              "Contactez-nous pour un audit gratuit. Nous cadrons le besoin, les fonctionnalités et les délais avant de proposer un chiffrage ferme.",
          },
        ],
      },
      "seo-maroc": {
        metaTitle: "Prix SEO Maroc 2026 | Fourchettes mensuelles indicatives",
        metaDescription:
          "Combien coûte le SEO au Maroc ? Fourchettes mensuelles par niveau, facteurs de prix et FAQ. Référencement naturel pour entreprises marocaines.",
        h1: "Prix SEO au Maroc",
        intro:
          "Le budget SEO au Maroc dépend de la concurrence sur vos mots-clés, de l'état actuel de votre site et de vos objectifs de visibilité. Voici des fourchettes mensuelles indicatives — un plan personnalisé suit toujours un audit.",
        overview: {
          what: "Guide des fourchettes de prix pour le référencement naturel (SEO) au Maroc, avec trois niveaux d'accompagnement mensuel.",
          who: "Entreprises, e-commerces et centres de formation qui veulent générer du trafic organique qualifié.",
          benefits: [
            "Anticiper un budget SEO réaliste",
            "Comprendre ce qui est inclus à chaque niveau",
            "Aligner investissement SEO et objectifs business",
          ],
          topics: ["Fourchettes mensuelles", "Facteurs de prix", "Livrables SEO", "FAQ"],
          takeaways: [
            "Budget mensuel typique de 3 000 à 40 000 MAD",
            "Audit technique et éditorial en prérequis",
            "Résultats SEO sur 3 à 12 mois selon la concurrence",
          ],
        },
        factorsTitle: "Facteurs qui influencent le prix du SEO",
        factors: [
          "Concurrence sur vos mots-clés cibles",
          "État technique du site (vitesse, structure, indexation)",
          "Volume de contenus à produire ou optimiser",
          "Nombre de langues et marchés visés",
          "Netlinking et autorité de domaine actuelle",
          "Reporting et fréquence des optimisations",
        ],
        tiers: {
          basic: {
            name: "Basique",
            description: "SEO local ou niche à faible concurrence.",
            includes: [
              "Audit technique initial",
              "Optimisation on-page prioritaire",
              "Suivi de 10 à 20 mots-clés",
              "Rapport mensuel synthétique",
            ],
          },
          standard: {
            name: "Standard",
            description: "SEO national pour PME avec objectifs de leads.",
            includes: [
              "Audit technique et sémantique",
              "Plan éditorial et optimisations mensuelles",
              "Suivi de 30 à 60 mots-clés",
              "Création ou optimisation de contenus",
              "Reporting détaillé et recommandations",
            ],
          },
          premium: {
            name: "Premium",
            description: "SEO compétitif multi-marchés ou e-commerce.",
            includes: [
              "Stratégie SEO complète multi-langues",
              "Production éditoriale régulière",
              "Netlinking et autorité de domaine",
              "Suivi avancé et tableaux de bord",
              "Coordination avec paid media et CRO",
            ],
          },
        },
        disclaimer:
          "Ces fourchettes mensuelles sont indicatives. Le SEO est un investissement continu : les résultats dépendent de la concurrence, de la qualité du site et de la régularité des actions. Aucun engagement de positionnement sans audit préalable.",
        contextLinks: {
          service: "Découvrir notre service SEO",
          packs: "Voir nos packs marketing et tarifs",
        },
        faqs: [
          {
            question: "Combien coûte le SEO par mois au Maroc ?",
            answer:
              "Comptez généralement entre 3 000 et 15 000 MAD/mois pour une PME, et jusqu'à 40 000 MAD/mois pour des marchés très concurrentiels ou multi-langues.",
          },
          {
            question: "En combien de temps voit-on des résultats SEO ?",
            answer:
              "Les premiers signaux apparaissent souvent entre 3 et 6 mois. Des résultats significatifs demandent généralement 6 à 12 mois selon la concurrence.",
          },
          {
            question: "Le SEO est-il compatible avec Google Ads ?",
            answer:
              "Oui, et c'est souvent recommandé : le paid génère des leads immédiats pendant que le SEO construit une visibilité durable.",
          },
          {
            question: "Comment obtenir un devis SEO personnalisé ?",
            answer:
              "Demandez un audit gratuit. Nous analysons votre site, vos concurrents et vos objectifs avant de proposer un plan et un budget mensuel.",
          },
        ],
      },
      "application-mobile-maroc": {
        metaTitle: "Prix application mobile Maroc 2026 | Fourchettes indicatives",
        metaDescription:
          "Combien coûte une application mobile au Maroc ? Fourchettes par niveau (MVP, standard, premium), facteurs techniques et FAQ.",
        h1: "Prix application mobile au Maroc",
        intro:
          "Le coût d'une application mobile au Maroc varie fortement selon les plateformes (iOS, Android), les fonctionnalités, les intégrations backend et le niveau de design. Cette page donne des ordres de grandeur indicatifs.",
        overview: {
          what: "Guide des fourchettes de prix pour le développement d'applications mobiles au Maroc.",
          who: "Startups, PME et organisations qui lancent une app métier, marketplace ou service client.",
          benefits: [
            "Estimer un budget avant le cahier des charges détaillé",
            "Comprendre l'impact du choix technologique (Flutter, natif)",
            "Anticiper les coûts de maintenance post-lancement",
          ],
          topics: ["Fourchettes projet", "Facteurs techniques", "Niveaux de complexité", "FAQ"],
          takeaways: [
            "Budget projet typique de 60 000 à 800 000 MAD",
            "MVP possible dès 60 000 MAD selon le périmètre",
            "Maintenance et évolutions à prévoir après le lancement",
          ],
        },
        factorsTitle: "Facteurs qui influencent le prix d'une application mobile",
        factors: [
          "Plateformes cibles (iOS, Android ou cross-platform)",
          "Nombre d'écrans et complexité des parcours utilisateur",
          "Authentification, paiement, géolocalisation, notifications",
          "Backend, API et intégrations tierces (CRM, ERP)",
          "Design UX/UI sur-mesure vs composants standards",
          "Tests, déploiement stores et maintenance",
        ],
        tiers: {
          basic: {
            name: "MVP",
            description: "Application minimale viable pour valider un concept.",
            includes: [
              "5 à 10 écrans principaux",
              "Une plateforme ou cross-platform (Flutter)",
              "Authentification basique",
              "Backend léger ou no-code",
              "Publication sur un store",
            ],
          },
          standard: {
            name: "Standard",
            description: "Application métier complète iOS + Android.",
            includes: [
              "15 à 30 écrans",
              "Cross-platform Flutter ou natif",
              "Backend API sur-mesure",
              "Notifications push et analytics",
              "Design UX/UI personnalisé",
              "Tests et déploiement stores",
            ],
          },
          premium: {
            name: "Premium",
            description: "Plateforme complexe, marketplace ou app à fort trafic.",
            includes: [
              "Architecture scalable",
              "Fonctionnalités avancées (paiement, temps réel, offline)",
              "Intégrations CRM/ERP",
              "Sécurité et performance renforcées",
              "Accompagnement produit et itérations",
              "Maintenance et SLA",
            ],
          },
        },
        disclaimer:
          "Ces fourchettes sont indicatives. Le choix entre Flutter, React Native ou natif, ainsi que la complexité du backend, peut faire varier le budget de 30 à 50 %. Un cadrage technique précis est indispensable avant tout devis ferme.",
        contextLinks: {
          service: "Découvrir notre service développement mobile Flutter",
          packs: "Voir nos packs et tarifs",
        },
        faqs: [
          {
            question: "Combien coûte une application mobile au Maroc ?",
            answer:
              "Un MVP démarre autour de 60 000 MAD. Une application métier complète se situe souvent entre 130 000 et 300 000 MAD. Les plateformes complexes peuvent dépasser 350 000 MAD.",
          },
          {
            question: "Flutter ou natif : quel impact sur le prix ?",
            answer:
              "Flutter (cross-platform) réduit généralement le coût vs deux apps natives séparées. Le natif peut être préférable pour des besoins très spécifiques à une plateforme.",
          },
          {
            question: "Le prix inclut-il la maintenance ?",
            answer:
              "La maintenance post-lancement (correctifs, mises à jour OS, évolutions) est souvent facturée en abonnement mensuel séparé, à définir dans le contrat.",
          },
          {
            question: "Comment obtenir un devis application mobile ?",
            answer:
              "Contactez-nous avec votre cahier des charges ou demandez un atelier de cadrage. Nous chiffrons après analyse technique détaillée.",
          },
        ],
      },
      "logo-maroc": {
        metaTitle: "Prix logo Maroc 2026 | Fourchettes création identité visuelle",
        metaDescription:
          "Combien coûte un logo au Maroc ? Fourchettes indicatives par niveau, facteurs de prix et FAQ. Création logo et identité visuelle professionnelle.",
        h1: "Prix logo au Maroc",
        intro:
          "Le prix d'un logo au Maroc dépend du niveau de recherche créative, du nombre de déclinaisons et de la livraison d'une charte graphique complète. Voici des fourchettes indicatives pour vous orienter.",
        overview: {
          what: "Guide des fourchettes de prix pour la création de logo et identité visuelle au Maroc.",
          who: "Entrepreneurs, PME, artisans et organisations qui lancent ou renouvellent leur image de marque.",
          benefits: [
            "Comprendre la différence entre logo simple et identité complète",
            "Anticiper le budget créatif",
            "Savoir ce qui est livré à chaque niveau",
          ],
          topics: ["Fourchettes projet", "Facteurs créatifs", "Livrables", "FAQ"],
          takeaways: [
            "Logo seul : 2 500 à 15 000 MAD selon le niveau",
            "Identité complète : jusqu'à 40 000 MAD",
            "Fichiers sources et charte inclus dans les formules standard et premium",
          ],
        },
        factorsTitle: "Facteurs qui influencent le prix d'un logo",
        factors: [
          "Nombre de propositions créatives et tours de révision",
          "Recherche stratégique et atelier de marque",
          "Déclinaisons (couleur, noir/blanc, favicon, réseaux sociaux)",
          "Livraison des fichiers sources (AI, SVG, PNG)",
          "Charte graphique et supports print/digital",
          "Délais et exclusivité sectorielle",
        ],
        tiers: {
          basic: {
            name: "Basique",
            description: "Logo simple pour démarrage rapide.",
            includes: [
              "2 à 3 propositions",
              "2 tours de révision",
              "Fichiers PNG et JPG",
              "Versions couleur et monochrome",
            ],
          },
          standard: {
            name: "Standard",
            description: "Logo professionnel avec déclinaisons et fichiers sources.",
            includes: [
              "3 à 5 propositions",
              "Recherche créative ciblée",
              "Fichiers sources (AI, SVG)",
              "Déclinaisons réseaux sociaux et favicon",
              "Mini charte couleurs et typographies",
            ],
          },
          premium: {
            name: "Premium",
            description: "Identité visuelle complète et plateforme de marque.",
            includes: [
              "Atelier stratégique de marque",
              "Logo et système graphique complet",
              "Charte graphique détaillée",
              "Templates réseaux sociaux et print",
              "Accompagnement déploiement image",
            ],
          },
        },
        disclaimer:
          "Ces fourchettes sont indicatives. Un logo à très bas prix peut manquer d'originalité ou de fichiers exploitables. Mohtaoua privilégie des livrables professionnels adaptés à votre secteur — devis ferme après brief créatif.",
        contextLinks: {
          service: "Découvrir notre service création de logo",
          packs: "Voir nos packs et tarifs",
        },
        faqs: [
          {
            question: "Combien coûte un logo au Maroc ?",
            answer:
              "Un logo professionnel se situe généralement entre 2 500 et 15 000 MAD. Une identité visuelle complète avec charte peut atteindre 18 000 à 40 000 MAD.",
          },
          {
            question: "Quels fichiers sont livrés ?",
            answer:
              "Selon la formule : PNG, JPG, et en standard/premium les fichiers sources (AI, SVG) plus les déclinaisons pour web et print.",
          },
          {
            question: "Combien de révisions sont incluses ?",
            answer:
              "En général 2 à 3 tours de révision selon la formule. Des révisions supplémentaires peuvent être facturées si le brief évolue significativement.",
          },
          {
            question: "Comment commander un logo ?",
            answer:
              "Contactez-nous pour un brief créatif. Nous cadrons le périmètre, le calendrier et le budget avant de lancer la recherche graphique.",
          },
        ],
      },
    },
  },
  en: {
    labels: {
      home: "Home",
      pricing: "Pricing",
      share: "Share",
      aiOverview: "Overview",
      what: "What is this page about?",
      who: "Who is it for?",
      benefits: "Benefits",
      topics: "Topics covered",
      takeaways: "Key takeaways",
      readingTime: "Estimated reading time",
      indicativePrice: "Indicative range",
      perMonth: "per month",
      perProject: "per project",
      included: "Included",
      faq: "Frequently asked questions",
    },
    items: {
      "creation-site-web-maroc": {
        metaTitle: "Website creation price Morocco 2026 | Indicative ranges",
        metaDescription:
          "How much does a website cost in Morocco? Indicative ranges by tier (basic, standard, premium), pricing factors and FAQ. Custom quote after audit.",
        h1: "Website creation price in Morocco",
        intro:
          "Website cost in Morocco varies by project type, page count, features and design level. This page shows indicative ranges — a firm quote requires scoping your exact needs.",
        overview: {
          what: "Pricing guide for website creation in Morocco with three indicative tiers and key budget factors.",
          who: "SME leaders, retailers, training centers and organizations planning a corporate, brochure or e-commerce site.",
          benefits: [
            "Understand ballpark figures before a sales call",
            "Identify the project level matching your ambition",
            "Anticipate cost items (design, development, content, SEO)",
          ],
          topics: ["Tier ranges", "Pricing factors", "What's included", "Web service link"],
          takeaways: [
            "Three indicative tiers: basic, standard, premium",
            "Typical project budget from 6,000 to 120,000 MAD",
            "Firm quote only after audit and scoping",
          ],
        },
        factorsTitle: "Factors that influence website price",
        factors: [
          "Page count and site architecture complexity",
          "Custom design vs adapted template",
          "Features (forms, blog, multilingual, e-commerce)",
          "CRM, analytics and marketing tool integrations",
          "Copywriting, translation and initial SEO",
          "Maintenance, hosting and post-launch updates",
        ],
        tiers: {
          basic: {
            name: "Basic",
            description: "Compact brochure site for a professional online presence.",
            includes: [
              "5 to 8 pages",
              "Design aligned with your brand",
              "Contact form",
              "Responsive mobile version",
              "Basic SEO setup",
            ],
          },
          standard: {
            name: "Standard",
            description: "Enriched corporate or brochure site with content and integrations.",
            includes: [
              "10 to 20 pages",
              "Custom design",
              "Blog or news section",
              "Multilingual (2 languages)",
              "Marketing integrations (GA4, pixels)",
              "On-page SEO optimization",
            ],
          },
          premium: {
            name: "Premium",
            description: "Custom project: e-commerce, portal or advanced platform.",
            includes: [
              "Complex architecture or e-commerce",
              "Advanced UX/UI design",
              "CRM and automation integrations",
              "Enhanced performance and security",
              "Editorial and SEO support",
              "Planned maintenance and updates",
            ],
          },
        },
        disclaimer:
          "These ranges are indicative and may vary by sector, timeline and technical requirements. Mohtaoua does not commit to fixed pricing without a prior audit. Request a custom quote for an exact figure.",
        contextLinks: {
          service: "Explore our corporate website service",
          packs: "View our marketing packs and pricing",
        },
        faqs: [
          {
            question: "How much does a brochure website cost in Morocco?",
            answer:
              "A professional brochure site typically ranges from 6,000 to 35,000 MAD depending on pages, design and features. E-commerce or custom projects can exceed 40,000 MAD.",
          },
          {
            question: "Does the price include hosting and domain?",
            answer:
              "Often not in the initial creation price. Hosting, domain and maintenance may be billed as a separate annual subscription, specified in the quote.",
          },
          {
            question: "Do you offer staged payment?",
            answer:
              "Yes, depending on project size. A payment schedule is defined in the quote after scope validation.",
          },
          {
            question: "How do I get an exact quote?",
            answer:
              "Contact us for a free audit. We scope needs, features and timeline before providing a firm quote.",
          },
        ],
      },
      "seo-maroc": {
        metaTitle: "SEO price Morocco 2026 | Indicative monthly ranges",
        metaDescription:
          "How much does SEO cost in Morocco? Indicative monthly ranges by tier, pricing factors and FAQ. Organic search for Moroccan businesses.",
        h1: "SEO price in Morocco",
        intro:
          "SEO budget in Morocco depends on keyword competition, current site health and visibility goals. Here are indicative monthly ranges — a custom plan always follows an audit.",
        overview: {
          what: "Pricing guide for organic search (SEO) in Morocco with three monthly support tiers.",
          who: "Businesses, e-commerce and training centers seeking qualified organic traffic.",
          benefits: [
            "Anticipate a realistic SEO budget",
            "Understand what's included at each tier",
            "Align SEO investment with business goals",
          ],
          topics: ["Monthly ranges", "Pricing factors", "SEO deliverables", "FAQ"],
          takeaways: [
            "Typical monthly budget from 3,000 to 40,000 MAD",
            "Technical and editorial audit as prerequisite",
            "SEO results over 3 to 12 months depending on competition",
          ],
        },
        factorsTitle: "Factors that influence SEO price",
        factors: [
          "Competition on target keywords",
          "Technical site health (speed, structure, indexing)",
          "Content volume to produce or optimize",
          "Languages and markets targeted",
          "Link building and current domain authority",
          "Reporting and optimization frequency",
        ],
        tiers: {
          basic: {
            name: "Basic",
            description: "Local SEO or low-competition niche.",
            includes: [
              "Initial technical audit",
              "Priority on-page optimization",
              "Tracking 10 to 20 keywords",
              "Monthly summary report",
            ],
          },
          standard: {
            name: "Standard",
            description: "National SEO for SMEs with lead goals.",
            includes: [
              "Technical and semantic audit",
              "Editorial plan and monthly optimizations",
              "Tracking 30 to 60 keywords",
              "Content creation or optimization",
              "Detailed reporting and recommendations",
            ],
          },
          premium: {
            name: "Premium",
            description: "Competitive multi-market or e-commerce SEO.",
            includes: [
              "Full multi-language SEO strategy",
              "Regular editorial production",
              "Link building and domain authority",
              "Advanced tracking and dashboards",
              "Coordination with paid media and CRO",
            ],
          },
        },
        disclaimer:
          "These monthly ranges are indicative. SEO is an ongoing investment: results depend on competition, site quality and action consistency. No ranking guarantees without a prior audit.",
        contextLinks: {
          service: "Explore our SEO service",
          packs: "View our marketing packs and pricing",
        },
        faqs: [
          {
            question: "How much does SEO cost per month in Morocco?",
            answer:
              "Typically 3,000 to 15,000 MAD/month for an SME, up to 40,000 MAD/month for highly competitive or multi-language markets.",
          },
          {
            question: "How long until SEO results?",
            answer:
              "Early signals often appear within 3 to 6 months. Significant results usually require 6 to 12 months depending on competition.",
          },
          {
            question: "Is SEO compatible with Google Ads?",
            answer:
              "Yes, and often recommended: paid drives immediate leads while SEO builds durable visibility.",
          },
          {
            question: "How do I get a custom SEO quote?",
            answer:
              "Request a free audit. We analyze your site, competitors and goals before proposing a plan and monthly budget.",
          },
        ],
      },
      "application-mobile-maroc": {
        metaTitle: "Mobile app price Morocco 2026 | Indicative ranges",
        metaDescription:
          "How much does a mobile app cost in Morocco? Ranges by tier (MVP, standard, premium), technical factors and FAQ.",
        h1: "Mobile app price in Morocco",
        intro:
          "Mobile app cost in Morocco varies widely by platform (iOS, Android), features, backend integrations and design level. This page provides indicative ballpark figures.",
        overview: {
          what: "Pricing guide for mobile app development in Morocco.",
          who: "Startups, SMEs and organizations launching a business app, marketplace or customer service app.",
          benefits: [
            "Estimate budget before detailed specifications",
            "Understand technology choice impact (Flutter, native)",
            "Anticipate post-launch maintenance costs",
          ],
          topics: ["Project ranges", "Technical factors", "Complexity tiers", "FAQ"],
          takeaways: [
            "Typical project budget from 60,000 to 800,000 MAD",
            "MVP possible from 60,000 MAD depending on scope",
            "Maintenance and updates to plan after launch",
          ],
        },
        factorsTitle: "Factors that influence mobile app price",
        factors: [
          "Target platforms (iOS, Android or cross-platform)",
          "Screen count and user journey complexity",
          "Authentication, payment, geolocation, notifications",
          "Backend, API and third-party integrations (CRM, ERP)",
          "Custom UX/UI design vs standard components",
          "Testing, store deployment and maintenance",
        ],
        tiers: {
          basic: {
            name: "MVP",
            description: "Minimum viable app to validate a concept.",
            includes: [
              "5 to 10 main screens",
              "One platform or cross-platform (Flutter)",
              "Basic authentication",
              "Light or no-code backend",
              "Single store publication",
            ],
          },
          standard: {
            name: "Standard",
            description: "Full business app iOS + Android.",
            includes: [
              "15 to 30 screens",
              "Cross-platform Flutter or native",
              "Custom API backend",
              "Push notifications and analytics",
              "Custom UX/UI design",
              "Testing and store deployment",
            ],
          },
          premium: {
            name: "Premium",
            description: "Complex platform, marketplace or high-traffic app.",
            includes: [
              "Scalable architecture",
              "Advanced features (payment, real-time, offline)",
              "CRM/ERP integrations",
              "Enhanced security and performance",
              "Product support and iterations",
              "Maintenance and SLA",
            ],
          },
        },
        disclaimer:
          "These ranges are indicative. Choice between Flutter, React Native or native, plus backend complexity, can shift budget by 30 to 50%. Precise technical scoping is required before any firm quote.",
        contextLinks: {
          service: "Explore our Flutter mobile development service",
          packs: "View our packs and pricing",
        },
        faqs: [
          {
            question: "How much does a mobile app cost in Morocco?",
            answer:
              "An MVP starts around 60,000 MAD. A full business app often ranges from 130,000 to 300,000 MAD. Complex platforms can exceed 350,000 MAD.",
          },
          {
            question: "Flutter or native: impact on price?",
            answer:
              "Flutter (cross-platform) generally reduces cost vs two separate native apps. Native may be preferable for very platform-specific needs.",
          },
          {
            question: "Does the price include maintenance?",
            answer:
              "Post-launch maintenance (fixes, OS updates, evolutions) is often billed as a separate monthly subscription, defined in the contract.",
          },
          {
            question: "How do I get a mobile app quote?",
            answer:
              "Contact us with your specifications or request a scoping workshop. We quote after detailed technical analysis.",
          },
        ],
      },
      "logo-maroc": {
        metaTitle: "Logo price Morocco 2026 | Visual identity creation ranges",
        metaDescription:
          "How much does a logo cost in Morocco? Indicative ranges by tier, pricing factors and FAQ. Professional logo and visual identity creation.",
        h1: "Logo price in Morocco",
        intro:
          "Logo price in Morocco depends on creative research depth, variation count and whether a full brand guidelines package is delivered. Here are indicative ranges to guide you.",
        overview: {
          what: "Pricing guide for logo and visual identity creation in Morocco.",
          who: "Entrepreneurs, SMEs, artisans and organizations launching or refreshing their brand image.",
          benefits: [
            "Understand difference between simple logo and full identity",
            "Anticipate creative budget",
            "Know what's delivered at each tier",
          ],
          topics: ["Project ranges", "Creative factors", "Deliverables", "FAQ"],
          takeaways: [
            "Logo alone: 2,500 to 15,000 MAD depending on tier",
            "Full identity: up to 40,000 MAD",
            "Source files and guidelines included in standard and premium tiers",
          ],
        },
        factorsTitle: "Factors that influence logo price",
        factors: [
          "Number of creative proposals and revision rounds",
          "Strategic research and brand workshop",
          "Variations (color, monochrome, favicon, social media)",
          "Source file delivery (AI, SVG, PNG)",
          "Brand guidelines and print/digital assets",
          "Timeline and sector exclusivity",
        ],
        tiers: {
          basic: {
            name: "Basic",
            description: "Simple logo for quick launch.",
            includes: [
              "2 to 3 proposals",
              "2 revision rounds",
              "PNG and JPG files",
              "Color and monochrome versions",
            ],
          },
          standard: {
            name: "Standard",
            description: "Professional logo with variations and source files.",
            includes: [
              "3 to 5 proposals",
              "Targeted creative research",
              "Source files (AI, SVG)",
              "Social media and favicon variations",
              "Mini color and typography guidelines",
            ],
          },
          premium: {
            name: "Premium",
            description: "Full visual identity and brand platform.",
            includes: [
              "Strategic brand workshop",
              "Logo and complete graphic system",
              "Detailed brand guidelines",
              "Social and print templates",
              "Image rollout support",
            ],
          },
        },
        disclaimer:
          "These ranges are indicative. Very low-cost logos may lack originality or usable files. Mohtaoua delivers professional assets suited to your sector — firm quote after creative brief.",
        contextLinks: {
          service: "Explore our logo design service",
          packs: "View our packs and pricing",
        },
        faqs: [
          {
            question: "How much does a logo cost in Morocco?",
            answer:
              "A professional logo typically ranges from 2,500 to 15,000 MAD. Full visual identity with guidelines can reach 18,000 to 40,000 MAD.",
          },
          {
            question: "What files are delivered?",
            answer:
              "Depending on tier: PNG, JPG, and in standard/premium source files (AI, SVG) plus web and print variations.",
          },
          {
            question: "How many revisions are included?",
            answer:
              "Generally 2 to 3 revision rounds per tier. Additional revisions may be billed if the brief changes significantly.",
          },
          {
            question: "How do I order a logo?",
            answer:
              "Contact us for a creative brief. We scope deliverables, timeline and budget before starting graphic research.",
          },
        ],
      },
    },
  },
  ar: {
    labels: {
      home: "الرئيسية",
      pricing: "الأسعار",
      share: "مشاركة",
      aiOverview: "نظرة عامة",
      what: "عن ماذا تتحدث هذه الصفحة؟",
      who: "لمن؟",
      benefits: "الفوائد",
      topics: "المواضيع",
      takeaways: "الخلاصة",
      readingTime: "وقت القراءة المقدر",
      indicativePrice: "نطاق إرشادي",
      perMonth: "شهرياً",
      perProject: "لكل مشروع",
      included: "يشمل",
      faq: "أسئلة شائعة",
    },
    items: {
      "creation-site-web-maroc": {
        metaTitle: "سعر إنشاء موقع ويب المغرب 2026 | نطاقات إرشادية",
        metaDescription:
          "كم يكلف الموقع في المغرب؟ نطاقات إرشادية حسب المستوى (أساسي، قياسي، متميز)، عوامل السعر والأسئلة الشائعة. عرض مخصص بعد المراجعة.",
        h1: "سعر إنشاء موقع ويب في المغرب",
        intro:
          "يتفاوت تكلفة الموقع في المغرب حسب نوع المشروع وعدد الصفحات والوظائف ومستوى التصميم. تعرض هذه الصفحة نطاقات إرشادية — العرض النهائي يتطلب تحديد الاحتياج بدقة.",
        overview: {
          what: "دليل نطاقات الأسعار لإنشاء المواقع في المغرب مع ثلاثة مستويات إرشادية وعوامل الميزانية.",
          who: "قادة المؤسسات الصغيرة والمتوسطة والتجار ومراكز التدريب والمنظمات التي تخطط لموقع مؤسسي أو تجاري.",
          benefits: [
            "فهم الأرقام التقريبية قبل الاتصال التجاري",
            "تحديد مستوى المشروع المناسب لطموحك",
            "توقع بنود التكلفة (التصميم، التطوير، المحتوى، SEO)",
          ],
          topics: ["نطاقات المستويات", "عوامل السعر", "ما يشمله العرض", "رابط خدمة المواقع"],
          takeaways: [
            "ثلاثة مستويات إرشادية: أساسي، قياسي، متميز",
            "ميزانية مشروع نموذجية من 6,000 إلى 120,000 درهم",
            "عرض نهائي فقط بعد المراجعة والتحديد",
          ],
        },
        factorsTitle: "عوامل تؤثر على سعر الموقع",
        factors: [
          "عدد الصفحات وتعقيد هيكل الموقع",
          "تصميم مخصص مقابل قالب معدّل",
          "الوظائف (نماذج، مدونة، متعدد اللغات، تجارة إلكترونية)",
          "تكامل CRM والتحليلات وأدوات التسويق",
          "كتابة المحتوى والترجمة وSEO الأولي",
          "الصيانة والاستضافة والتحديثات بعد الإطلاق",
        ],
        tiers: {
          basic: {
            name: "أساسي",
            description: "موقع تعريفي مدمج لحضور احترافي على الإنترنت.",
            includes: [
              "5 إلى 8 صفحات",
              "تصميم متوافق مع علامتك",
              "نموذج اتصال",
              "نسخة متجاوبة للجوال",
              "إعداد SEO أساسي",
            ],
          },
          standard: {
            name: "قياسي",
            description: "موقع مؤسسي أو تعريفي غني بالمحتوى والتكاملات.",
            includes: [
              "10 إلى 20 صفحة",
              "تصميم مخصص",
              "مدونة أو أخبار",
              "متعدد اللغات (لغتان)",
              "تكاملات تسويقية (GA4، pixels)",
              "تحسين SEO على الصفحة",
            ],
          },
          premium: {
            name: "متميز",
            description: "مشروع مخصص: تجارة إلكترونية أو بوابة أو منصة متقدمة.",
            includes: [
              "هيكل معقد أو تجارة إلكترونية",
              "تصميم UX/UI متقدم",
              "تكاملات CRM والأتمتة",
              "أداء وأمان معززان",
              "دعم تحريري وSEO",
              "صيانة وتحديثات مخططة",
            ],
          },
        },
        disclaimer:
          "هذه النطاقات إرشادية وقد تختلف حسب القطاع والمواعيد والمتطلبات التقنية. لا تلتزم Mohtaoua بسعر نهائي دون مراجعة مسبقة. اطلب عرضاً مخصصاً للحصول على رقم دقيق.",
        contextLinks: {
          service: "اكتشف خدمة إنشاء المواقع المؤسسية",
          packs: "اطلع على باقاتنا التسويقية والأسعار",
        },
        faqs: [
          {
            question: "كم يكلف موقع تعريفي في المغرب؟",
            answer:
              "عادة بين 6,000 و35,000 درهم حسب الصفحات والتصميم والوظائف. مشاريع التجارة الإلكترونية أو المخصصة قد تتجاوز 40,000 درهم.",
          },
          {
            question: "هل يشمل السعر الاستضافة واسم النطاق؟",
            answer:
              "غالباً لا في سعر الإنشاء الأولي. الاستضافة والنطاق والصيانة قد تُفوتر باشتراك سنوي منفصل، يُحدد في العرض.",
          },
          {
            question: "هل تقدمون دفعاً على أقساط؟",
            answer:
              "نعم، حسب حجم المشروع. يُحدد جدول الدفع في العرض بعد التحقق من النطاق.",
          },
          {
            question: "كيف أحصل على عرض دقيق؟",
            answer:
              "اتصل بنا لمراجعة مجانية. نحدد الاحتياج والوظائف والمواعيد قبل تقديم عرض نهائي.",
          },
        ],
      },
      "seo-maroc": {
        metaTitle: "سعر SEO المغرب 2026 | نطاقات شهرية إرشادية",
        metaDescription:
          "كم يكلف SEO في المغرب؟ نطاقات شهرية إرشادية حسب المستوى وعوامل السعر والأسئلة الشائعة. تحسين محركات البحث للشركات المغربية.",
        h1: "سعر SEO في المغرب",
        intro:
          "يعتمد ميزانية SEO في المغرب على منافسة الكلمات المفتاحية وحالة الموقع الحالية وأهداف الظهور. إليك نطاقات شهرية إرشادية — الخطة المخصصة تتبع دائماً مراجعة.",
        overview: {
          what: "دليل نطاقات الأسعار للبحث العضوي (SEO) في المغرب مع ثلاثة مستويات دعم شهري.",
          who: "الشركات والتجارة الإلكترونية ومراكز التدريب التي تسعى لزيارات عضوية مؤهلة.",
          benefits: [
            "توقع ميزانية SEO واقعية",
            "فهم ما يشمله كل مستوى",
            "مواءمة استثمار SEO مع أهداف العمل",
          ],
          topics: ["نطاقات شهرية", "عوامل السعر", "مخرجات SEO", "الأسئلة الشائعة"],
          takeaways: [
            "ميزانية شهرية نموذجية من 3,000 إلى 40,000 درهم",
            "مراجعة تقنية وتحريرية كشرط مسبق",
            "نتائج SEO خلال 3 إلى 12 شهراً حسب المنافسة",
          ],
        },
        factorsTitle: "عوامل تؤثر على سعر SEO",
        factors: [
          "منافسة الكلمات المفتاحية المستهدفة",
          "الصحة التقنية للموقع (السرعة، الهيكل، الفهرسة)",
          "حجم المحتوى للإنتاج أو التحسين",
          "اللغات والأسواق المستهدفة",
          "بناء الروابط وسلطة النطاق الحالية",
          "التقارير وتكرار التحسينات",
        ],
        tiers: {
          basic: {
            name: "أساسي",
            description: "SEO محلي أو تخصص منخفض المنافسة.",
            includes: [
              "مراجعة تقنية أولية",
              "تحسين على الصفحة ذو الأولوية",
              "متابعة 10 إلى 20 كلمة مفتاحية",
              "تقرير شهري موجز",
            ],
          },
          standard: {
            name: "قياسي",
            description: "SEO وطني للمؤسسات الصغيرة والمتوسطة بأهداف leads.",
            includes: [
              "مراجعة تقنية ودلالية",
              "خطة تحريرية وتحسينات شهرية",
              "متابعة 30 إلى 60 كلمة مفتاحية",
              "إنشاء أو تحسين المحتوى",
              "تقارير مفصلة وتوصيات",
            ],
          },
          premium: {
            name: "متميز",
            description: "SEO تنافسي متعدد الأسواق أو تجارة إلكترونية.",
            includes: [
              "استراتيجية SEO كاملة متعددة اللغات",
              "إنتاج تحريري منتظم",
              "بناء الروابط وسلطة النطاق",
              "متابعة متقدمة ولوحات معلومات",
              "تنسيق مع الإعلانات المدفوعة وCRO",
            ],
          },
        },
        disclaimer:
          "هذه النطاقات الشهرية إرشادية. SEO استثمار مستمر: النتائج تعتمد على المنافسة وجودة الموقع وانتظام الإجراءات. لا ضمانات ترتيب دون مراجعة مسبقة.",
        contextLinks: {
          service: "اكتشف خدمة SEO",
          packs: "اطلع على باقاتنا التسويقية والأسعار",
        },
        faqs: [
          {
            question: "كم يكلف SEO شهرياً في المغرب؟",
            answer:
              "عادة بين 3,000 و15,000 درهم/شهر للمؤسسة الصغيرة، وحتى 40,000 درهم/شهر للأسواق شديدة التنافس أو متعددة اللغات.",
          },
          {
            question: "متى تظهر نتائج SEO؟",
            answer:
              "غالباً إشارات أولية خلال 3 إلى 6 أشهر. نتائج ملموسة عادة 6 إلى 12 شهراً حسب المنافسة.",
          },
          {
            question: "هل SEO متوافق مع Google Ads؟",
            answer:
              "نعم، وغالباً موصى به: المدفوع يولد leads فورية بينما SEO يبني ظهوراً دائماً.",
          },
          {
            question: "كيف أحصل على عرض SEO مخصص؟",
            answer:
              "اطلب مراجعة مجانية. نحلل موقعك ومنافسيك وأهدافك قبل اقتراح خطة وميزانية شهرية.",
          },
        ],
      },
      "application-mobile-maroc": {
        metaTitle: "سعر تطبيق جوال المغرب 2026 | نطاقات إرشادية",
        metaDescription:
          "كم يكلف تطبيق جوال في المغرب؟ نطاقات حسب المستوى (MVP، قياسي، متميز) وعوامل تقنية والأسئلة الشائعة.",
        h1: "سعر تطبيق جوال في المغرب",
        intro:
          "تتفاوت تكلفة التطبيق في المغرب بشدة حسب المنصات (iOS، Android) والوظائف وتكاملات الخادم ومستوى التصميم. تعرض هذه الصفحة أرقاماً إرشادية تقريبية.",
        overview: {
          what: "دليل نطاقات الأسعار لتطوير تطبيقات الجوال في المغرب.",
          who: "الشركات الناشئة والمؤسسات الصغيرة والمتوسطة التي تطلق تطبيقاً مهنياً أو سوقاً أو خدمة عملاء.",
          benefits: [
            "تقدير الميزانية قبل المواصفات التفصيلية",
            "فهم تأثير اختيار التقنية (Flutter، أصلي)",
            "توقع تكاليف الصيانة بعد الإطلاق",
          ],
          topics: ["نطاقات المشروع", "عوامل تقنية", "مستويات التعقيد", "الأسئلة الشائعة"],
          takeaways: [
            "ميزانية مشروع نموذجية من 60,000 إلى 800,000 درهم",
            "MVP ممكن من 60,000 درهم حسب النطاق",
            "الصيانة والتحديثات للتخطيط بعد الإطلاق",
          ],
        },
        factorsTitle: "عوامل تؤثر على سعر التطبيق",
        factors: [
          "المنصات المستهدفة (iOS، Android أو متعدد المنصات)",
          "عدد الشاشات وتعقيد مسارات المستخدم",
          "المصادقة والدفع والموقع والإشعارات",
          "الخادم وAPI وتكاملات الطرف الثالث (CRM، ERP)",
          "تصميم UX/UI مخصص مقابل مكونات قياسية",
          "الاختبار ونشر المتاجر والصيانة",
        ],
        tiers: {
          basic: {
            name: "MVP",
            description: "تطبيق أدنى قابل للتطبيق للتحقق من الفكرة.",
            includes: [
              "5 إلى 10 شاشات رئيسية",
              "منصة واحدة أو متعدد (Flutter)",
              "مصادقة أساسية",
              "خادم خفيف أو no-code",
              "نشر على متجر واحد",
            ],
          },
          standard: {
            name: "قياسي",
            description: "تطبيق مهني كامل iOS + Android.",
            includes: [
              "15 إلى 30 شاشة",
              "Flutter متعدد المنصات أو أصلي",
              "خادم API مخصص",
              "إشعارات push وتحليلات",
              "تصميم UX/UI مخصص",
              "اختبار ونشر المتاجر",
            ],
          },
          premium: {
            name: "متميز",
            description: "منصة معقدة أو سوق أو تطبيق بحركة عالية.",
            includes: [
              "هيكل قابل للتوسع",
              "وظائف متقدمة (دفع، وقت حقيقي، دون اتصال)",
              "تكاملات CRM/ERP",
              "أمان وأداء معززان",
              "دعم منتج وتكرارات",
              "صيانة وSLA",
            ],
          },
        },
        disclaimer:
          "هذه النطاقات إرشادية. الاختيار بين Flutter أو React Native أو الأصلي، مع تعقيد الخادم، قد يغير الميزانية بنسبة 30 إلى 50%. التحديد التقني الدقيق ضروري قبل أي عرض نهائي.",
        contextLinks: {
          service: "اكتشف خدمة تطوير Flutter للجوال",
          packs: "اطلع على باقاتنا وأسعارنا",
        },
        faqs: [
          {
            question: "كم يكلف تطبيق جوال في المغرب؟",
            answer:
              "يبدأ MVP حوالي 60,000 درهم. التطبيق المهني الكامل غالباً بين 130,000 و300,000 درهم. المنصات المعقدة قد تتجاوز 350,000 درهم.",
          },
          {
            question: "Flutter أو أصلي: تأثير على السعر؟",
            answer:
              "Flutter (متعدد المنصات) يقلل عادة التكلفة مقابل تطبيقين أصليين منفصلين. الأصلي قد يكون أفضل لاحتياجات خاصة بمنصة واحدة.",
          },
          {
            question: "هل يشمل السعر الصيانة؟",
            answer:
              "الصيانة بعد الإطلاق (إصلاحات، تحديثات نظام التشغيل، تطورات) غالباً تُفوتر باشتراك شهري منفصل، يُحدد في العقد.",
          },
          {
            question: "كيف أحصل على عرض تطبيق جوال؟",
            answer:
              "اتصل بنا بمواصفاتك أو اطلب ورشة تحديد. نقدم العرض بعد تحليل تقني مفصل.",
          },
        ],
      },
      "logo-maroc": {
        metaTitle: "سعر الشعار المغرب 2026 | نطاقات الهوية البصرية",
        metaDescription:
          "كم يكلف الشعار في المغرب؟ نطاقات إرشادية حسب المستوى وعوامل السعر والأسئلة الشائعة. إنشاء شعار وهوية بصرية احترافية.",
        h1: "سعر الشعار في المغرب",
        intro:
          "يعتمد سعر الشعار في المغرب على عمق البحث الإبداعي وعدد التنويعات وتسليم دليل العلامة الكامل. إليك نطاقات إرشادية للتوجيه.",
        overview: {
          what: "دليل نطاقات الأسعار لإنشاء الشعار والهوية البصرية في المغرب.",
          who: "رواد الأعمال والمؤسسات الصغيرة والحرفيون والمنظمات التي تطلق أو تجدد صورة علامتها.",
          benefits: [
            "فهم الفرق بين شعار بسيط وهوية كاملة",
            "توقع الميزانية الإبداعية",
            "معرفة ما يُسلّم في كل مستوى",
          ],
          topics: ["نطاقات المشروع", "عوامل إبداعية", "المخرجات", "الأسئلة الشائعة"],
          takeaways: [
            "شعار فقط: 2,500 إلى 15,000 درهم حسب المستوى",
            "هوية كاملة: حتى 40,000 درهم",
            "ملفات المصدر والدليل مشمولة في المستويات القياسية والمتميزة",
          ],
        },
        factorsTitle: "عوامل تؤثر على سعر الشعار",
        factors: [
          "عدد المقترحات الإبداعية وجولات المراجعة",
          "البحث الاستراتيجي وورشة العلامة",
          "التنويعات (لون، أبيض وأسود، favicon، وسائل التواصل)",
          "تسليم ملفات المصدر (AI، SVG، PNG)",
          "دليل العلامة ومواد الطباعة/الرقمية",
          "المواعيد والحصرية القطاعية",
        ],
        tiers: {
          basic: {
            name: "أساسي",
            description: "شعار بسيط لإطلاق سريع.",
            includes: [
              "2 إلى 3 مقترحات",
              "جولتا مراجعة",
              "ملفات PNG وJPG",
              "نسخ ملونة وأحادية اللون",
            ],
          },
          standard: {
            name: "قياسي",
            description: "شعار احترافي مع تنويعات وملفات مصدر.",
            includes: [
              "3 إلى 5 مقترحات",
              "بحث إبداعي موجه",
              "ملفات مصدر (AI، SVG)",
              "تنويعات وسائل التواصل وfavicon",
              "دليل مصغر للألوان والخطوط",
            ],
          },
          premium: {
            name: "متميز",
            description: "هوية بصرية كاملة ومنصة علامة.",
            includes: [
              "ورشة علامة استراتيجية",
              "شعار ونظام رسومي كامل",
              "دليل علامة مفصل",
              "قوالب وسائل التواصل والطباعة",
              "دعم نشر الصورة",
            ],
          },
        },
        disclaimer:
          "هذه النطاقات إرشادية. الشعار منخفض التكلفة جداً قد يفتقر للأصالة أو الملفات القابلة للاستخدام. تقدم Mohtaoua مخرجات احترافية مناسبة لقطاعك — عرض نهائي بعد الموجز الإبداعي.",
        contextLinks: {
          service: "اكتشف خدمة تصميم الشعار",
          packs: "اطلع على باقاتنا وأسعارنا",
        },
        faqs: [
          {
            question: "كم يكلف الشعار في المغرب؟",
            answer:
              "الشعار الاحترافي عادة بين 2,500 و15,000 درهم. الهوية البصرية الكاملة مع الدليل قد تصل 18,000 إلى 40,000 درهم.",
          },
          {
            question: "ما الملفات المُسلّمة؟",
            answer:
              "حسب المستوى: PNG وJPG، وفي القياسي/المتميز ملفات المصدر (AI، SVG) وتنويعات الويب والطباعة.",
          },
          {
            question: "كم جولة مراجعة مشمولة؟",
            answer:
              "عادة 2 إلى 3 جولات حسب المستوى. مراجعات إضافية قد تُفوتر إذا تغير الموجز بشكل كبير.",
          },
          {
            question: "كيف أطلب شعاراً؟",
            answer:
              "اتصل بنا لموجز إبداعي. نحدد النطاق والجدول والميزانية قبل بدء البحث الرسومي.",
          },
        ],
      },
    },
  },
};

for (const locale of LOCALES) {
  const hubPath = join(root, `messages/${locale}/agencyHubPages.json`);
  const hubs = JSON.parse(readFileSync(hubPath, "utf8"));
  hubs.items.communication.fes = fesCommunication[locale];
  writeFileSync(hubPath, JSON.stringify(hubs, null, 2) + "\n");

  const pricingPath = join(root, `messages/${locale}/pricingPages.json`);
  writeFileSync(pricingPath, JSON.stringify(pricingPages[locale], null, 2) + "\n");
  console.log(`✓ ${locale}: communication.fes + pricingPages.json`);
}

console.log("Lot 4 content written.");
