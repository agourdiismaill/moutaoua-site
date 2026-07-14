#!/usr/bin/env node
/**
 * Article du jour : TikTok Ads au Maroc (FR/EN/AR).
 * Insère le post dans messages/{locale}/blog.json.
 * Usage : node scripts/add-tiktok-ads-article.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SLUG = "tiktok-ads-maroc-guide";

const fr = {
  title: "TikTok Ads au Maroc : le guide complet pour générer des leads en 2026",
  excerpt:
    "Formats, ciblage, créatives, budgets et CPL réalistes : tout ce qu'il faut savoir pour transformer TikTok en canal d'acquisition rentable au Maroc.",
  category: "publicite",
  cover: "/logo-full.svg",
  overview: {
    what: "Guide pratique et complet pour lancer, structurer et rentabiliser des campagnes TikTok Ads au Maroc : formats, ciblage, créatives, budget et tracking.",
    who: "Dirigeants, responsables marketing et e-commerçants marocains qui veulent toucher les 18-34 ans là où Meta et Google saturent.",
    benefits: [
      "Structure de campagne TikTok prête à déployer",
      "Règles créatives concrètes (hook 3 secondes, format natif)",
      "Budgets et CPL réalistes par secteur au Maroc"
    ],
    topics: [
      "TikTok Ads Maroc",
      "Publicité TikTok",
      "Lead generation TikTok",
      "Spark Ads",
      "Créatives vidéo courtes"
    ],
    takeaways: [
      "TikTok touche plus de 40 % des 18-34 ans au Maroc avec des CPM 30 à 50 % inférieurs à Meta",
      "La créative fait 70 % de la performance : tournez natif, vertical, avec un hook dans les 3 premières secondes",
      "Commencez avec 150-300 DH/jour et les Lead Forms natifs avant d'envoyer du trafic vers une landing page"
    ]
  },
  sections: [
    {
      id: "intro",
      heading: "Pourquoi TikTok Ads est devenu incontournable au Maroc",
      paragraphs: [
        "En 2026, TikTok n'est plus une plateforme de divertissement pour adolescents : c'est le média où les Marocains de 18 à 34 ans passent en moyenne plus d'une heure par jour. Pendant que les coûts publicitaires de Meta augmentent chaque trimestre et que Google Ads sature sur les mots-clés commerciaux, TikTok offre encore des CPM 30 à 50 % inférieurs et une portée organique que les autres plateformes ont perdue depuis longtemps.",
        "Pour une entreprise marocaine — centre de formation, e-commerce, restaurant, clinique ou agence immobilière — ignorer TikTok en 2026, c'est laisser un canal d'acquisition entier à ses concurrents. Ce guide couvre tout ce dont vous avez besoin pour lancer votre première campagne rentable : les formats, le ciblage, les créatives, les budgets réalistes et les erreurs qui coûtent cher."
      ]
    },
    {
      id: "audience",
      heading: "TikTok au Maroc : qui allez-vous vraiment toucher ?",
      paragraphs: [
        "TikTok compte plusieurs millions d'utilisateurs actifs au Maroc, avec une concentration forte sur Casablanca, Rabat, Marrakech et Tanger. Contrairement aux idées reçues, l'audience ne se limite pas aux 15-24 ans : la tranche 25-34 ans est aujourd'hui la plus dynamique en croissance, et les 35-44 ans arrivent massivement. C'est précisément la cible qui prend les décisions d'achat : inscription à une formation, réservation, achat en ligne, demande de devis.",
        "Le comportement est aussi différent de Meta : sur TikTok, l'utilisateur découvre. Il ne cherche pas activement un produit, mais il est dans un état d'esprit d'exploration qui rend la publicité native extrêmement efficace quand elle ne ressemble pas à une publicité. C'est la règle d'or de la plateforme : « Don't make ads, make TikToks »."
      ],
      bullets: [
        "Plus de 40 % des 18-34 ans marocains actifs chaque semaine sur la plateforme",
        "Temps de session moyen supérieur à Instagram et Facebook",
        "Audience francophone et arabophone : adaptez vos créatives aux deux",
        "Croissance rapide des segments 25-44 ans, décisionnaires d'achat"
      ]
    },
    {
      id: "probleme",
      heading: "Le problème : pourquoi la plupart des campagnes TikTok échouent",
      paragraphs: [
        "La majorité des annonceurs marocains qui testent TikTok Ads abandonnent après un mois. La raison est presque toujours la même : ils recyclent leurs créatives Meta ou leurs spots TV. Une vidéo institutionnelle avec logo animé et musique corporate est ignorée en moins d'une seconde sur TikTok. La plateforme punit algorithmiquement les contenus au faible taux de complétion : votre CPM monte, votre portée s'effondre.",
        "Le second échec classique est le manque de volume créatif. Sur Meta, une bonne créative peut tourner trois mois. Sur TikTok, la fatigue créative arrive en 7 à 14 jours. Sans un système de production capable de sortir 3 à 5 nouvelles vidéos par semaine, vos performances s'érodent mécaniquement, quel que soit votre budget."
      ]
    },
    {
      id: "formats",
      heading: "Les formats TikTok Ads qui fonctionnent au Maroc",
      paragraphs: [
        "TikTok propose plusieurs formats, mais trois concentrent l'essentiel des résultats pour les annonceurs marocains. Les In-Feed Ads sont le format standard : votre vidéo apparaît dans le flux « Pour toi », avec un bouton d'action vers votre site, votre formulaire ou WhatsApp. Les Spark Ads amplifient un contenu organique existant — le vôtre ou celui d'un créateur partenaire — en conservant les interactions sociales, ce qui renforce massivement la preuve sociale.",
        "Les Lead Generation Ads, enfin, permettent de collecter des coordonnées directement dans l'application via un formulaire natif pré-rempli. Pour les centres de formation, cliniques et services B2C au Maroc, c'est le format au meilleur coût par lead : pas de friction de chargement de page, pas de perte sur mobile."
      ],
      bullets: [
        "In-Feed Ads : le format de base, idéal pour le trafic et les conversions site",
        "Spark Ads : amplification de posts organiques, +30 à 60 % d'engagement vs In-Feed classique",
        "Lead Generation Ads : formulaire natif, CPL généralement 20 à 40 % inférieur à une landing page",
        "TopView et Branded Effects : réservés aux grandes marques, budgets à 6 chiffres"
      ]
    },
    {
      id: "etapes",
      heading: "Lancer votre première campagne : la méthode en 6 étapes",
      paragraphs: [
        "Voici la séquence exacte que nous appliquons pour chaque nouveau compte TikTok Ads au Maroc. Elle privilégie la simplicité au lancement : une structure trop fragmentée disperse le budget et empêche l'algorithme d'apprendre."
      ],
      bullets: [
        "1. Créez votre compte TikTok Business Center et installez le Pixel TikTok (+ Events API si e-commerce) avant toute dépense",
        "2. Définissez un objectif unique par campagne : génération de leads, conversions site ou trafic WhatsApp — jamais plusieurs à la fois",
        "3. Ciblage large au départ : Maroc, 20-45 ans, sans centres d'intérêt. Laissez l'algorithme trouver vos acheteurs",
        "4. Lancez avec 3 à 5 créatives différentes dans un seul ad group, budget 150-300 DH/jour",
        "5. Attendez 4 à 7 jours avant tout changement : l'algorithme a besoin d'environ 50 conversions pour sortir de la phase d'apprentissage",
        "6. Coupez les créatives sous-performantes, dupliquez les gagnantes avec de nouvelles variantes de hook"
      ]
    },
    {
      id: "creatives",
      heading: "Créatives : la règle des 3 secondes",
      paragraphs: [
        "Sur TikTok, la créative représente environ 70 % de la performance d'une campagne — bien plus que le ciblage. La règle absolue : capter l'attention dans les 3 premières secondes, sinon l'utilisateur scrolle et l'algorithme vous pénalise. Les hooks qui fonctionnent au Maroc combinent une accroche verbale directe (« Tu cherches une formation en développement web à Casablanca ? »), un texte à l'écran en darija ou en français selon la cible, et un visage humain dès la première image.",
        "Tournez vertical 9:16, en conditions réelles, avec un smartphone : la surproduction tue la performance. Les formats qui convertissent le mieux sont le témoignage client face caméra, le « avant/après », la démonstration produit en situation, et le créateur qui parle directement à la caméra comme dans un contenu organique. Sous-titrez systématiquement : plus de 60 % des vues se font sans le son."
      ],
      bullets: [
        "Hook verbal + texte écran dans les 3 premières secondes",
        "Format vertical 9:16 natif, tourné au smartphone",
        "Darija pour le mass-market, français pour le premium et le B2B",
        "Sous-titres obligatoires, appel à l'action clair avant la 20e seconde",
        "Renouvelez 3 à 5 créatives par semaine pour éviter la fatigue"
      ]
    },
    {
      id: "budget",
      heading: "Budget, enchères et CPL réalistes au Maroc",
      paragraphs: [
        "TikTok Ads reste le canal payant le plus abordable du marché marocain en 2026. Comptez un CPM moyen de 10 à 25 DH selon le secteur et la saison, contre 30 à 60 DH sur Meta pour des audiences comparables. Le budget minimum technique est d'environ 200 DH par jour au niveau de la campagne, mais nous recommandons 150 à 300 DH par jour et par ad group pour donner à l'algorithme assez de signal.",
        "Côté coût par lead, les fourchettes que nous observons chez nos clients marocains : 15 à 40 DH pour la formation et les services B2C avec Lead Forms natifs, 25 à 60 DH pour l'immobilier et l'automobile, 8 à 20 DH de coût par conversation WhatsApp pour la restauration et le retail. Utilisez l'enchère « Lowest Cost » au lancement ; ne passez en « Cost Cap » qu'une fois votre CPL de référence stabilisé sur 3 à 4 semaines."
      ]
    },
    {
      id: "tracking",
      heading: "Tracking : ce qu'il faut installer avant de dépenser 1 dirham",
      paragraphs: [
        "Sans mesure fiable, TikTok Ads devient une loterie. Le minimum vital : le Pixel TikTok sur votre site avec les événements standards (ViewContent, AddToCart, SubmitForm, Purchase), l'Events API côté serveur si vous êtes en e-commerce — indispensable depuis les restrictions iOS —, et des UTM propres pour recouper dans GA4. Si vos leads partent vers WhatsApp, tracez le clic comme conversion et reliez votre CRM pour suivre le taux de transformation lead → client réel.",
        "C'est ce dernier chiffre qui compte : un CPL de 20 DH avec 5 % de conversion en client coûte plus cher qu'un CPL de 40 DH qui convertit à 20 %. Pilotez au coût par client acquis, jamais au coût par lead seul."
      ]
    },
    {
      id: "secteurs",
      heading: "Ce qui marche par secteur au Maroc",
      paragraphs: [
        "Chaque secteur a ses codes sur TikTok. Voici les approches qui génèrent des résultats mesurables chez les annonceurs marocains en 2026."
      ],
      bullets: [
        "Formation & éducation : témoignages d'anciens étudiants + Lead Form natif, pics de performance en période de rentrée et de résultats du bac",
        "E-commerce : démonstration produit + Spark Ads avec créateurs, catalogue dynamique pour le retargeting",
        "Restauration & food : vidéos de préparation en cuisine, offres limitées, clic vers WhatsApp ou Google Maps",
        "Immobilier : visites virtuelles verticales de 30-45 secondes, ciblage 28-45 ans, Lead Form avec qualification budget",
        "Cliniques & esthétique : avant/après conformes aux règles de la plateforme, preuve d'expertise du praticien face caméra"
      ]
    },
    {
      id: "erreurs",
      heading: "Les 7 erreurs qui brûlent votre budget",
      paragraphs: [
        "Ces erreurs reviennent dans la quasi-totalité des comptes que nous auditons. Les éviter vous fait gagner plusieurs mois et plusieurs milliers de dirhams."
      ],
      bullets: [
        "Recycler des créatives Meta ou des spots TV au lieu de produire du contenu natif TikTok",
        "Toucher à la campagne pendant la phase d'apprentissage (les 50 premières conversions)",
        "Sur-segmenter le ciblage avec des audiences trop étroites pour le volume marocain",
        "Lancer sans Pixel ni Events API, puis piloter à l'aveugle sur les vues",
        "Ignorer les commentaires : sur TikTok, y répondre nourrit l'algorithme et la confiance",
        "Envoyer le trafic vers une page lente non optimisée mobile au lieu d'un Lead Form natif",
        "Abandonner après 2 semaines : les comptes TikTok performants se construisent sur 60 à 90 jours"
      ]
    },
    {
      id: "conclusion",
      heading: "TikTok dans votre mix média : complément, pas remplacement",
      paragraphs: [
        "TikTok Ads ne remplace ni Meta ni Google : il les complète. Le schéma gagnant que nous déployons au Maroc : TikTok pour la découverte et la génération de demande à faible coût, Meta pour le retargeting et la conversion, Google pour capter l'intention de recherche que TikTok a créée. Les annonceurs qui mesurent l'effet croisé constatent une baisse de 10 à 20 % de leur CPL global après 2 à 3 mois d'activation TikTok.",
        "Si vous voulez lancer TikTok Ads sans essuyer les plâtres, notre équipe gère la stratégie, la production de créatives natives et l'optimisation continue pour des entreprises marocaines de tous secteurs. Demandez votre audit gratuit : nous analysons votre potentiel TikTok et vous remettons un plan d'action chiffré."
      ]
    }
  ],
  faqs: [
    {
      question: "Quel budget minimum pour commencer TikTok Ads au Maroc ?",
      answer: "Techniquement 200 DH/jour au niveau campagne. En pratique, prévoyez 150 à 300 DH par jour et par ad group pendant au moins 30 jours, soit un budget de test de 5 000 à 9 000 DH pour obtenir des données fiables et sortir de la phase d'apprentissage."
    },
    {
      question: "TikTok Ads fonctionne-t-il pour le B2B au Maroc ?",
      answer: "Oui, mais différemment. Les décideurs marocains sont sur TikTok à titre personnel. Le contenu expert face caméra (conseils, coulisses métier) génère des leads B2B qualifiés, surtout pour la formation professionnelle, les services et le software. Le CPL est souvent inférieur à LinkedIn Ads."
    },
    {
      question: "Faut-il créer du contenu en darija ou en français ?",
      answer: "Les deux, selon votre cible. La darija performe mieux pour le mass-market (e-commerce, food, retail) avec des taux de complétion supérieurs. Le français reste pertinent pour le premium, le B2B et l'éducation supérieure. Testez les deux variantes sur la même offre : l'écart de CPL est souvent de 20 à 40 %."
    },
    {
      question: "Combien de temps avant de voir des résultats ?",
      answer: "Les premières conversions arrivent en général sous 7 jours. Comptez 3 à 4 semaines pour un CPL stabilisé et 60 à 90 jours pour un compte pleinement optimisé avec un système créatif rodé. Abandonner avant 30 jours est l'erreur la plus coûteuse."
    },
    {
      question: "Lead Form natif ou landing page : que choisir ?",
      answer: "Commencez par le Lead Form natif : CPL 20 à 40 % inférieur grâce à l'absence de friction. Passez à la landing page quand vous avez besoin de mieux qualifier (budget, ville, programme) ou de vendre en ligne. Beaucoup de nos clients combinent : Lead Form pour le volume, landing page pour la qualité."
    },
    {
      question: "TikTok Ads peut-il remplacer Meta Ads ?",
      answer: "Non. TikTok excelle en découverte et en coût de portée, Meta reste supérieur en retargeting et en profondeur de données de conversion. Le mix optimal au Maroc alloue généralement 20 à 35 % du budget média à TikTok, en complément de Meta et Google — avec un effet mesurable de baisse du CPL global."
    }
  ]
};

const en = {
  title: "TikTok Ads in Morocco: the complete guide to generating leads in 2026",
  excerpt:
    "Formats, targeting, creatives, budgets and realistic CPLs: everything you need to turn TikTok into a profitable acquisition channel in Morocco.",
  category: "publicite",
  cover: "/logo-full.svg",
  overview: {
    what: "A practical, complete guide to launching, structuring and making TikTok Ads campaigns profitable in Morocco: formats, targeting, creatives, budget and tracking.",
    who: "Moroccan business owners, marketing managers and e-commerce brands looking to reach 18-34 year olds where Meta and Google are saturating.",
    benefits: [
      "A TikTok campaign structure ready to deploy",
      "Concrete creative rules (3-second hook, native format)",
      "Realistic budgets and CPLs per industry in Morocco"
    ],
    topics: [
      "TikTok Ads Morocco",
      "TikTok advertising",
      "TikTok lead generation",
      "Spark Ads",
      "Short-form video creatives"
    ],
    takeaways: [
      "TikTok reaches over 40% of 18-34 year olds in Morocco with CPMs 30-50% lower than Meta",
      "Creative drives 70% of performance: shoot native, vertical, with a hook in the first 3 seconds",
      "Start with 150-300 MAD/day and native Lead Forms before sending traffic to a landing page"
    ]
  },
  sections: [
    {
      id: "intro",
      heading: "Why TikTok Ads has become essential in Morocco",
      paragraphs: [
        "In 2026, TikTok is no longer an entertainment platform for teenagers: it is the medium where Moroccans aged 18 to 34 spend more than an hour a day on average. While Meta's advertising costs rise every quarter and Google Ads saturates on commercial keywords, TikTok still offers CPMs 30 to 50% lower and an organic reach the other platforms lost long ago.",
        "For a Moroccan business — training center, e-commerce brand, restaurant, clinic or real estate agency — ignoring TikTok in 2026 means handing an entire acquisition channel to your competitors. This guide covers everything you need to launch your first profitable campaign: formats, targeting, creatives, realistic budgets and the mistakes that cost real money."
      ]
    },
    {
      id: "audience",
      heading: "TikTok in Morocco: who will you actually reach?",
      paragraphs: [
        "TikTok has several million active users in Morocco, heavily concentrated in Casablanca, Rabat, Marrakech and Tangier. Contrary to popular belief, the audience is not limited to 15-24 year olds: the 25-34 bracket is now the fastest growing, and 35-44 year olds are arriving en masse. This is precisely the audience making purchase decisions: enrolling in a course, booking, buying online, requesting a quote.",
        "Behavior also differs from Meta: on TikTok, users discover. They are not actively searching for a product, but they are in an exploratory mindset that makes native advertising extremely effective when it doesn't look like advertising. That is the platform's golden rule: \"Don't make ads, make TikToks\"."
      ],
      bullets: [
        "Over 40% of Moroccan 18-34 year olds active weekly on the platform",
        "Average session time higher than Instagram and Facebook",
        "French- and Arabic-speaking audience: adapt your creatives to both",
        "Fast growth in the 25-44 segments — the purchase decision-makers"
      ]
    },
    {
      id: "probleme",
      heading: "The problem: why most TikTok campaigns fail",
      paragraphs: [
        "Most Moroccan advertisers who test TikTok Ads give up after a month. The reason is almost always the same: they recycle their Meta creatives or TV spots. A corporate video with an animated logo and stock music gets skipped in under a second on TikTok. The platform algorithmically punishes content with low completion rates: your CPM climbs, your reach collapses.",
        "The second classic failure is lack of creative volume. On Meta, a good creative can run for three months. On TikTok, creative fatigue hits within 7 to 14 days. Without a production system capable of shipping 3 to 5 new videos per week, performance erodes mechanically, whatever your budget."
      ]
    },
    {
      id: "formats",
      heading: "The TikTok Ads formats that work in Morocco",
      paragraphs: [
        "TikTok offers several formats, but three concentrate most of the results for Moroccan advertisers. In-Feed Ads are the standard format: your video appears in the \"For You\" feed with a call-to-action button to your site, form or WhatsApp. Spark Ads amplify existing organic content — yours or a partner creator's — while keeping the social interactions, which massively reinforces social proof.",
        "Lead Generation Ads, finally, collect contact details directly inside the app through a pre-filled native form. For training centers, clinics and B2C services in Morocco, it is the format with the best cost per lead: no page-load friction, no mobile drop-off."
      ],
      bullets: [
        "In-Feed Ads: the core format, ideal for traffic and site conversions",
        "Spark Ads: organic post amplification, +30-60% engagement vs standard In-Feed",
        "Lead Generation Ads: native form, CPL typically 20-40% lower than a landing page",
        "TopView and Branded Effects: reserved for big brands with six-figure budgets"
      ]
    },
    {
      id: "etapes",
      heading: "Launching your first campaign: the 6-step method",
      paragraphs: [
        "Here is the exact sequence we apply to every new TikTok Ads account in Morocco. It favors simplicity at launch: an over-fragmented structure spreads budget thin and prevents the algorithm from learning."
      ],
      bullets: [
        "1. Create your TikTok Business Center account and install the TikTok Pixel (+ Events API for e-commerce) before spending anything",
        "2. Set one objective per campaign: lead generation, site conversions or WhatsApp traffic — never several at once",
        "3. Start with broad targeting: Morocco, 20-45, no interest stacking. Let the algorithm find your buyers",
        "4. Launch with 3 to 5 different creatives in a single ad group, 150-300 MAD/day budget",
        "5. Wait 4 to 7 days before changing anything: the algorithm needs about 50 conversions to exit the learning phase",
        "6. Kill underperforming creatives, duplicate winners with new hook variations"
      ]
    },
    {
      id: "creatives",
      heading: "Creatives: the 3-second rule",
      paragraphs: [
        "On TikTok, creative accounts for roughly 70% of campaign performance — far more than targeting. The absolute rule: capture attention within the first 3 seconds, or the user scrolls and the algorithm penalizes you. Hooks that work in Morocco combine a direct verbal opener (\"Looking for a web development course in Casablanca?\"), on-screen text in Darija or French depending on the audience, and a human face from the very first frame.",
        "Shoot vertical 9:16, in real conditions, with a smartphone: over-production kills performance. The best-converting formats are the face-to-camera customer testimonial, the before/after, the product demo in context, and the creator speaking directly to camera like organic content. Always add subtitles: over 60% of views happen with sound off."
      ],
      bullets: [
        "Verbal hook + on-screen text within the first 3 seconds",
        "Native vertical 9:16, shot on a smartphone",
        "Darija for mass-market, French for premium and B2B",
        "Mandatory subtitles, clear call to action before second 20",
        "Refresh 3 to 5 creatives per week to avoid fatigue"
      ]
    },
    {
      id: "budget",
      heading: "Budget, bidding and realistic CPLs in Morocco",
      paragraphs: [
        "TikTok Ads remains the most affordable paid channel on the Moroccan market in 2026. Expect an average CPM of 10 to 25 MAD depending on industry and season, versus 30 to 60 MAD on Meta for comparable audiences. The technical minimum budget is about 200 MAD per day at campaign level, but we recommend 150 to 300 MAD per day per ad group to give the algorithm enough signal.",
        "On cost per lead, the ranges we observe with our Moroccan clients: 15-40 MAD for education and B2C services with native Lead Forms, 25-60 MAD for real estate and automotive, 8-20 MAD per WhatsApp conversation for restaurants and retail. Use Lowest Cost bidding at launch; switch to Cost Cap only once your baseline CPL has stabilized over 3-4 weeks."
      ]
    },
    {
      id: "tracking",
      heading: "Tracking: what to install before spending a single dirham",
      paragraphs: [
        "Without reliable measurement, TikTok Ads becomes a lottery. The bare minimum: the TikTok Pixel on your site with standard events (ViewContent, AddToCart, SubmitForm, Purchase), the server-side Events API if you run e-commerce — essential since iOS restrictions —, and clean UTMs to cross-check in GA4. If your leads go to WhatsApp, track the click as a conversion and connect your CRM to follow the lead-to-customer rate.",
        "That last number is what matters: a 20 MAD CPL converting 5% of leads into customers costs more than a 40 MAD CPL converting at 20%. Steer by cost per acquired customer, never by cost per lead alone."
      ]
    },
    {
      id: "secteurs",
      heading: "What works by industry in Morocco",
      paragraphs: [
        "Every industry has its own codes on TikTok. Here are the approaches generating measurable results for Moroccan advertisers in 2026."
      ],
      bullets: [
        "Education & training: alumni testimonials + native Lead Form, performance peaks at back-to-school and bac results season",
        "E-commerce: product demos + Spark Ads with creators, dynamic catalog for retargeting",
        "Food & restaurants: kitchen prep videos, limited offers, click-to-WhatsApp or Google Maps",
        "Real estate: 30-45 second vertical virtual tours, 28-45 targeting, Lead Form with budget qualification",
        "Clinics & aesthetics: platform-compliant before/afters, practitioner expertise face-to-camera"
      ]
    },
    {
      id: "erreurs",
      heading: "The 7 mistakes that burn your budget",
      paragraphs: [
        "These mistakes show up in nearly every account we audit. Avoiding them saves you months and thousands of dirhams."
      ],
      bullets: [
        "Recycling Meta creatives or TV spots instead of producing native TikTok content",
        "Touching the campaign during the learning phase (the first 50 conversions)",
        "Over-segmenting with audiences too narrow for Moroccan volume",
        "Launching without Pixel or Events API, then flying blind on views",
        "Ignoring comments: on TikTok, replying feeds both the algorithm and trust",
        "Sending traffic to a slow, non-mobile-optimized page instead of a native Lead Form",
        "Quitting after 2 weeks: high-performing TikTok accounts are built over 60-90 days"
      ]
    },
    {
      id: "conclusion",
      heading: "TikTok in your media mix: a complement, not a replacement",
      paragraphs: [
        "TikTok Ads replaces neither Meta nor Google: it complements them. The winning setup we deploy in Morocco: TikTok for discovery and low-cost demand generation, Meta for retargeting and conversion, Google to capture the search intent TikTok created. Advertisers who measure the cross-channel effect see their blended CPL drop 10-20% after 2-3 months of TikTok activation.",
        "If you want to launch TikTok Ads without the trial-and-error phase, our team handles strategy, native creative production and continuous optimization for Moroccan businesses across industries. Request your free audit: we assess your TikTok potential and hand you a quantified action plan."
      ]
    }
  ],
  faqs: [
    {
      question: "What minimum budget do I need to start TikTok Ads in Morocco?",
      answer: "Technically 200 MAD/day at campaign level. In practice, plan 150 to 300 MAD per day per ad group for at least 30 days — a test budget of 5,000 to 9,000 MAD to gather reliable data and exit the learning phase."
    },
    {
      question: "Does TikTok Ads work for B2B in Morocco?",
      answer: "Yes, but differently. Moroccan decision-makers are on TikTok personally. Expert face-to-camera content (tips, behind-the-scenes) generates qualified B2B leads, especially for professional training, services and software. CPL is often lower than LinkedIn Ads."
    },
    {
      question: "Should I create content in Darija or French?",
      answer: "Both, depending on your audience. Darija performs better for mass-market (e-commerce, food, retail) with higher completion rates. French remains relevant for premium, B2B and higher education. Test both variants on the same offer: the CPL gap is often 20-40%."
    },
    {
      question: "How long before I see results?",
      answer: "First conversions usually arrive within 7 days. Expect 3-4 weeks for a stabilized CPL and 60-90 days for a fully optimized account with a working creative system. Quitting before 30 days is the most expensive mistake."
    },
    {
      question: "Native Lead Form or landing page: which should I choose?",
      answer: "Start with the native Lead Form: 20-40% lower CPL thanks to zero friction. Move to a landing page when you need better qualification (budget, city, program) or online sales. Many of our clients combine both: Lead Form for volume, landing page for quality."
    },
    {
      question: "Can TikTok Ads replace Meta Ads?",
      answer: "No. TikTok excels at discovery and cost of reach; Meta remains superior for retargeting and conversion data depth. The optimal mix in Morocco typically allocates 20-35% of media budget to TikTok, alongside Meta and Google — with a measurable drop in blended CPL."
    }
  ]
};

const ar = {
  title: "إعلانات TikTok في المغرب: الدليل الشامل لتوليد العملاء المحتملين في 2026",
  excerpt:
    "الصيغ والاستهداف والإبداعات والميزانيات وتكلفة العميل الواقعية: كل ما تحتاجه لتحويل TikTok إلى قناة استقطاب مربحة في المغرب.",
  category: "publicite",
  cover: "/logo-full.svg",
  overview: {
    what: "دليل عملي شامل لإطلاق حملات إعلانات TikTok في المغرب وهيكلتها وجعلها مربحة: الصيغ، الاستهداف، الإبداعات، الميزانية والتتبع.",
    who: "أصحاب الأعمال ومسؤولو التسويق والتجارة الإلكترونية في المغرب الراغبون في الوصول إلى فئة 18-34 سنة حيث تتشبع Meta وGoogle.",
    benefits: [
      "هيكل حملة TikTok جاهز للتطبيق",
      "قواعد إبداعية ملموسة (جذب الانتباه في 3 ثوانٍ، صيغة أصلية)",
      "ميزانيات وتكلفة عميل واقعية حسب القطاع في المغرب"
    ],
    topics: [
      "إعلانات TikTok المغرب",
      "الإعلان على TikTok",
      "توليد العملاء عبر TikTok",
      "Spark Ads",
      "فيديوهات قصيرة إعلانية"
    ],
    takeaways: [
      "يصل TikTok إلى أكثر من 40% من فئة 18-34 سنة في المغرب بتكلفة ظهور أقل بـ30-50% من Meta",
      "الإبداع يصنع 70% من الأداء: صوّر بشكل أصلي وعمودي مع جذب الانتباه في أول 3 ثوانٍ",
      "ابدأ بـ150-300 درهم يوميًا ونماذج العملاء الأصلية قبل توجيه الزيارات إلى صفحة هبوط"
    ]
  },
  sections: [
    {
      id: "intro",
      heading: "لماذا أصبحت إعلانات TikTok ضرورية في المغرب",
      paragraphs: [
        "في 2026، لم يعد TikTok منصة ترفيه للمراهقين: إنه الوسيط الذي يقضي فيه المغاربة بين 18 و34 سنة أكثر من ساعة يوميًا في المتوسط. وبينما ترتفع تكاليف الإعلان على Meta كل فصل وتتشبع Google Ads على الكلمات المفتاحية التجارية، لا يزال TikTok يوفر تكلفة ظهور أقل بـ30 إلى 50% وانتشارًا عضويًا فقدته المنصات الأخرى منذ زمن.",
        "بالنسبة لشركة مغربية — مركز تكوين، تجارة إلكترونية، مطعم، عيادة أو وكالة عقارية — فإن تجاهل TikTok في 2026 يعني ترك قناة استقطاب كاملة للمنافسين. يغطي هذا الدليل كل ما تحتاجه لإطلاق أول حملة مربحة: الصيغ، الاستهداف، الإبداعات، الميزانيات الواقعية والأخطاء المكلفة."
      ]
    },
    {
      id: "audience",
      heading: "TikTok في المغرب: من ستصل إليه فعلًا؟",
      paragraphs: [
        "يضم TikTok عدة ملايين من المستخدمين النشطين في المغرب، بتركيز قوي على الدار البيضاء والرباط ومراكش وطنجة. وخلافًا للاعتقاد السائد، لا يقتصر الجمهور على فئة 15-24 سنة: فشريحة 25-34 سنة هي الأسرع نموًا اليوم، وفئة 35-44 تلتحق بأعداد كبيرة. وهذه بالضبط الفئة التي تتخذ قرارات الشراء: التسجيل في تكوين، الحجز، الشراء عبر الإنترنت، طلب عرض سعر.",
        "السلوك مختلف أيضًا عن Meta: على TikTok يكتشف المستخدم. إنه لا يبحث عن منتج بعينه، لكنه في حالة استكشاف تجعل الإعلان الأصلي فعالًا للغاية عندما لا يبدو كإعلان. وهذه هي القاعدة الذهبية للمنصة: «لا تصنع إعلانات، اصنع فيديوهات TikTok»."
      ],
      bullets: [
        "أكثر من 40% من المغاربة بين 18 و34 سنة نشطون أسبوعيًا على المنصة",
        "متوسط مدة الجلسة أعلى من Instagram وFacebook",
        "جمهور ناطق بالعربية والفرنسية: كيّف إبداعاتك للغتين",
        "نمو سريع لشرائح 25-44 سنة، أصحاب قرارات الشراء"
      ]
    },
    {
      id: "probleme",
      heading: "المشكلة: لماذا تفشل معظم حملات TikTok",
      paragraphs: [
        "يتخلى معظم المعلنين المغاربة الذين يجربون إعلانات TikTok بعد شهر واحد. والسبب واحد تقريبًا دائمًا: إعادة تدوير إبداعات Meta أو الومضات التلفزيونية. فالفيديو المؤسسي بشعار متحرك وموسيقى تجارية يُتجاهل في أقل من ثانية على TikTok. والمنصة تعاقب خوارزميًا المحتوى ذا نسبة الإكمال المنخفضة: ترتفع تكلفة الظهور وينهار الانتشار.",
        "الفشل الكلاسيكي الثاني هو نقص الحجم الإبداعي. على Meta، يمكن لإبداع جيد أن يعمل ثلاثة أشهر. على TikTok، يصل الإرهاق الإبداعي خلال 7 إلى 14 يومًا. وبدون نظام إنتاج قادر على إخراج 3 إلى 5 فيديوهات جديدة أسبوعيًا، يتآكل الأداء تلقائيًا مهما كانت ميزانيتك."
      ]
    },
    {
      id: "formats",
      heading: "صيغ إعلانات TikTok التي تنجح في المغرب",
      paragraphs: [
        "يوفر TikTok عدة صيغ، لكن ثلاثًا منها تجمع معظم النتائج للمعلنين المغاربة. إعلانات In-Feed هي الصيغة القياسية: يظهر فيديوك في خلاصة «لك» مع زر إجراء نحو موقعك أو نموذجك أو WhatsApp. أما Spark Ads فتضخّم محتوى عضويًا قائمًا — محتواك أو محتوى صانع محتوى شريك — مع الاحتفاظ بالتفاعلات الاجتماعية، ما يعزز الدليل الاجتماعي بقوة.",
        "وأخيرًا، تتيح إعلانات توليد العملاء (Lead Generation) جمع بيانات الاتصال مباشرة داخل التطبيق عبر نموذج أصلي معبأ مسبقًا. بالنسبة لمراكز التكوين والعيادات والخدمات الموجهة للأفراد في المغرب، إنها الصيغة ذات أفضل تكلفة للعميل المحتمل: لا بطء تحميل صفحات ولا فقدان على الهاتف."
      ],
      bullets: [
        "إعلانات In-Feed: الصيغة الأساسية، مثالية للزيارات وتحويلات الموقع",
        "Spark Ads: تضخيم المنشورات العضوية، تفاعل أعلى بـ30-60% من In-Feed العادية",
        "إعلانات توليد العملاء: نموذج أصلي، تكلفة عميل أقل عادة بـ20-40% من صفحة الهبوط",
        "TopView والمؤثرات الخاصة بالعلامات: للعلامات الكبرى بميزانيات ضخمة"
      ]
    },
    {
      id: "etapes",
      heading: "إطلاق حملتك الأولى: منهجية من 6 خطوات",
      paragraphs: [
        "إليك التسلسل الدقيق الذي نطبقه على كل حساب إعلانات TikTok جديد في المغرب. وهو يفضّل البساطة عند الانطلاق: فالهيكل المجزأ أكثر من اللازم يشتت الميزانية ويمنع الخوارزمية من التعلم."
      ],
      bullets: [
        "1. أنشئ حساب TikTok Business Center وثبّت بكسل TikTok (+ Events API للتجارة الإلكترونية) قبل أي إنفاق",
        "2. حدد هدفًا واحدًا لكل حملة: توليد العملاء، تحويلات الموقع أو محادثات WhatsApp — وليس عدة أهداف معًا",
        "3. استهداف واسع في البداية: المغرب، 20-45 سنة، دون اهتمامات. دع الخوارزمية تجد مشتريك",
        "4. انطلق بـ3 إلى 5 إبداعات مختلفة في مجموعة إعلانية واحدة، بميزانية 150-300 درهم يوميًا",
        "5. انتظر 4 إلى 7 أيام قبل أي تعديل: تحتاج الخوارزمية إلى نحو 50 تحويلًا للخروج من مرحلة التعلم",
        "6. أوقف الإبداعات الضعيفة وكرر الرابحة مع صيغ جذب جديدة"
      ]
    },
    {
      id: "creatives",
      heading: "الإبداعات: قاعدة الثواني الثلاث",
      paragraphs: [
        "على TikTok، يمثل الإبداع نحو 70% من أداء الحملة — أكثر بكثير من الاستهداف. القاعدة المطلقة: اجذب الانتباه في أول 3 ثوانٍ وإلا مرّر المستخدم وعاقبتك الخوارزمية. عناصر الجذب الناجحة في المغرب تجمع بين افتتاحية كلامية مباشرة («كتقلب على تكوين في تطوير الويب في كازا؟»)، ونص على الشاشة بالدارجة أو الفرنسية حسب الجمهور، ووجه بشري من أول لقطة.",
        "صوّر عموديًا 9:16 في ظروف حقيقية وبهاتف ذكي: الإنتاج المبالغ فيه يقتل الأداء. الصيغ الأفضل تحويلًا هي شهادة العميل أمام الكاميرا، وقبل/بعد، وعرض المنتج في سياقه، وصانع المحتوى الذي يتحدث مباشرة للكاميرا كمحتوى عضوي. أضف الترجمة النصية دائمًا: أكثر من 60% من المشاهدات تتم بدون صوت."
      ],
      bullets: [
        "جذب كلامي + نص على الشاشة في أول 3 ثوانٍ",
        "صيغة عمودية أصلية 9:16 مصورة بالهاتف",
        "الدارجة للجمهور الواسع، الفرنسية للفئات الراقية وB2B",
        "ترجمة نصية إلزامية ودعوة واضحة للإجراء قبل الثانية 20",
        "جدد 3 إلى 5 إبداعات أسبوعيًا لتفادي الإرهاق الإبداعي"
      ]
    },
    {
      id: "budget",
      heading: "الميزانية والمزايدات وتكلفة العميل الواقعية في المغرب",
      paragraphs: [
        "تبقى إعلانات TikTok القناة المدفوعة الأرخص في السوق المغربية سنة 2026. توقع تكلفة ظهور متوسطة بين 10 و25 درهمًا حسب القطاع والموسم، مقابل 30 إلى 60 درهمًا على Meta لجماهير مماثلة. الحد الأدنى التقني للميزانية نحو 200 درهم يوميًا على مستوى الحملة، لكننا ننصح بـ150 إلى 300 درهم يوميًا لكل مجموعة إعلانية لمنح الخوارزمية إشارة كافية.",
        "أما تكلفة العميل المحتمل، فالنطاقات التي نلاحظها لدى عملائنا المغاربة: 15-40 درهمًا للتكوين والخدمات الموجهة للأفراد مع النماذج الأصلية، 25-60 درهمًا للعقار والسيارات، و8-20 درهمًا لكل محادثة WhatsApp للمطاعم والتجزئة. استخدم مزايدة «أقل تكلفة» عند الانطلاق، ولا تنتقل إلى «سقف التكلفة» إلا بعد استقرار تكلفتك المرجعية على مدى 3-4 أسابيع."
      ]
    },
    {
      id: "tracking",
      heading: "التتبع: ما يجب تثبيته قبل إنفاق درهم واحد",
      paragraphs: [
        "بدون قياس موثوق تتحول إعلانات TikTok إلى يانصيب. الحد الأدنى الضروري: بكسل TikTok على موقعك مع الأحداث القياسية (ViewContent، AddToCart، SubmitForm، Purchase)، وEvents API من جهة الخادم إذا كنت في التجارة الإلكترونية — ضروري منذ قيود iOS —، وروابط UTM نظيفة للمطابقة في GA4. وإذا كان عملاؤك يتجهون إلى WhatsApp، تتبّع النقرة كتحويل واربط نظام CRM لمتابعة نسبة تحول العميل المحتمل إلى عميل فعلي.",
        "هذا الرقم الأخير هو الأهم: تكلفة عميل بـ20 درهمًا مع تحويل 5% إلى عملاء أغلى من تكلفة 40 درهمًا بتحويل 20%. قُد حملاتك بتكلفة العميل المكتسب، وليس بتكلفة العميل المحتمل وحدها أبدًا."
      ]
    },
    {
      id: "secteurs",
      heading: "ما ينجح حسب القطاع في المغرب",
      paragraphs: [
        "لكل قطاع رموزه الخاصة على TikTok. إليك المقاربات التي تحقق نتائج قابلة للقياس لدى المعلنين المغاربة في 2026."
      ],
      bullets: [
        "التعليم والتكوين: شهادات الخريجين + نموذج أصلي، ذروة الأداء في الدخول المدرسي ونتائج الباكالوريا",
        "التجارة الإلكترونية: عروض المنتج + Spark Ads مع صناع المحتوى، وكتالوج ديناميكي لإعادة الاستهداف",
        "المطاعم والأكل: فيديوهات التحضير في المطبخ، عروض محدودة، نقرة نحو WhatsApp أو خرائط Google",
        "العقار: جولات افتراضية عمودية من 30-45 ثانية، استهداف 28-45 سنة، نموذج مع تأهيل الميزانية",
        "العيادات والتجميل: قبل/بعد وفق قواعد المنصة، وإبراز خبرة الممارس أمام الكاميرا"
      ]
    },
    {
      id: "erreurs",
      heading: "الأخطاء السبعة التي تحرق ميزانيتك",
      paragraphs: [
        "تتكرر هذه الأخطاء في أغلب الحسابات التي نراجعها. وتفاديها يوفر عليك شهورًا وآلاف الدراهم."
      ],
      bullets: [
        "إعادة تدوير إبداعات Meta أو الومضات التلفزيونية بدل إنتاج محتوى أصلي لـTikTok",
        "التدخل في الحملة أثناء مرحلة التعلم (أول 50 تحويلًا)",
        "الإفراط في تجزئة الاستهداف بجماهير ضيقة جدًا على حجم السوق المغربية",
        "الانطلاق بدون بكسل أو Events API ثم القيادة عمياء على المشاهدات",
        "تجاهل التعليقات: الرد عليها يغذي الخوارزمية والثقة معًا",
        "توجيه الزيارات إلى صفحة بطيئة غير مهيأة للهاتف بدل النموذج الأصلي",
        "الاستسلام بعد أسبوعين: الحسابات الناجحة على TikTok تُبنى خلال 60 إلى 90 يومًا"
      ]
    },
    {
      id: "conclusion",
      heading: "TikTok في مزيجك الإعلامي: مكمّل لا بديل",
      paragraphs: [
        "لا تعوض إعلانات TikTok لا Meta ولا Google: بل تكملهما. المخطط الرابح الذي ننشره في المغرب: TikTok للاكتشاف وتوليد الطلب بتكلفة منخفضة، وMeta لإعادة الاستهداف والتحويل، وGoogle لالتقاط نية البحث التي أنشأها TikTok. والمعلنون الذين يقيسون الأثر المتقاطع يلاحظون انخفاض تكلفة العميل الإجمالية بـ10 إلى 20% بعد شهرين إلى ثلاثة من تفعيل TikTok.",
        "إذا أردت إطلاق إعلانات TikTok دون المرور بمرحلة التجربة والخطأ، يتكفل فريقنا بالاستراتيجية وإنتاج الإبداعات الأصلية والتحسين المستمر لشركات مغربية من مختلف القطاعات. اطلب تدقيقك المجاني: نحلل إمكاناتك على TikTok ونسلمك خطة عمل مرقمة."
      ]
    }
  ],
  faqs: [
    {
      question: "ما الميزانية الدنيا لبدء إعلانات TikTok في المغرب؟",
      answer: "تقنيًا 200 درهم يوميًا على مستوى الحملة. عمليًا، خصص 150 إلى 300 درهم يوميًا لكل مجموعة إعلانية لمدة 30 يومًا على الأقل، أي ميزانية اختبار بين 5,000 و9,000 درهم للحصول على بيانات موثوقة والخروج من مرحلة التعلم."
    },
    {
      question: "هل تنجح إعلانات TikTok في مجال B2B بالمغرب؟",
      answer: "نعم، لكن بطريقة مختلفة. أصحاب القرار المغاربة موجودون على TikTok بصفة شخصية. المحتوى الخبير أمام الكاميرا (نصائح، كواليس المهنة) يولد عملاء B2B مؤهلين، خاصة للتكوين المهني والخدمات والبرمجيات، وبتكلفة غالبًا أقل من LinkedIn Ads."
    },
    {
      question: "هل أنشئ المحتوى بالدارجة أم بالفرنسية؟",
      answer: "كلاهما حسب جمهورك. الدارجة تحقق أداء أفضل للجمهور الواسع (تجارة إلكترونية، أكل، تجزئة) بنسب إكمال أعلى. وتبقى الفرنسية مناسبة للفئات الراقية وB2B والتعليم العالي. اختبر الصيغتين على نفس العرض: فارق التكلفة غالبًا بين 20 و40%."
    },
    {
      question: "كم من الوقت قبل ظهور النتائج؟",
      answer: "تصل التحويلات الأولى عادة خلال 7 أيام. توقع 3 إلى 4 أسابيع لاستقرار تكلفة العميل و60 إلى 90 يومًا لحساب محسّن بالكامل مع نظام إبداعي فعال. والاستسلام قبل 30 يومًا هو الخطأ الأكثر كلفة."
    },
    {
      question: "النموذج الأصلي أم صفحة الهبوط: أيهما أختار؟",
      answer: "ابدأ بالنموذج الأصلي: تكلفة عميل أقل بـ20-40% بفضل انعدام الاحتكاك. انتقل إلى صفحة الهبوط عندما تحتاج تأهيلًا أدق (الميزانية، المدينة، البرنامج) أو بيعًا عبر الإنترنت. كثير من عملائنا يجمعون بينهما: النموذج للحجم وصفحة الهبوط للجودة."
    },
    {
      question: "هل يمكن لإعلانات TikTok أن تعوض Meta Ads؟",
      answer: "لا. يتفوق TikTok في الاكتشاف وتكلفة الوصول، بينما تبقى Meta أقوى في إعادة الاستهداف وعمق بيانات التحويل. المزيج الأمثل في المغرب يخصص عادة 20 إلى 35% من الميزانية الإعلامية لـTikTok إلى جانب Meta وGoogle — مع انخفاض ملموس في التكلفة الإجمالية للعميل."
    }
  ]
};

const posts = { fr, en, ar };
for (const [locale, post] of Object.entries(posts)) {
  const path = join(root, `messages/${locale}/blog.json`);
  const json = JSON.parse(readFileSync(path, "utf8"));
  json.posts[SLUG] = post;
  writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
  console.log(`Ajouté ${SLUG} dans messages/${locale}/blog.json`);
}
