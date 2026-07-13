#!/usr/bin/env node
/** Patch EN/AR serviceCityPages sectors & cities from translation maps */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fr = JSON.parse(readFileSync(join(root, "messages/fr/serviceCityPages.json"), "utf8"));

const enSectors = {
  "finance-industrie": {
    label: "finance, industry and large SMEs",
    context: "Casablanca hosts Morocco's largest economic basin: headquarters, industries, banks and fast-growing scale-ups. Decision-makers expect providers who deliver quickly with demonstrable ROI and premium execution.",
    challenges: "In this environment, digital visibility is no longer optional: without a structured presence, prospects compare your competitors in a few clicks and choose whoever inspires the most trust online.",
    opportunity: "Strong local positioning in Casablanca captures qualified B2B and B2C leads, strengthens your brand image and accelerates sales cycles through optimized customer journeys.",
  },
  "administration-services": {
    label: "government, public services and B2B",
    context: "Rabat and its region host institutions, consultancies, integrators and service companies selling to demanding clients. Tone, credibility and clarity of the digital message are decisive for conversion.",
    challenges: "Decision cycles are often longer: without nurturing, CRM and reassurance content, opportunities cool before signing.",
    opportunity: "A structured digital strategy in Rabat helps you generate qualified leads, professionalize your image and automate sales follow-up so no opportunity is lost.",
  },
  "tourisme-immobilier": {
    label: "tourism, real estate and hospitality",
    context: "Marrakech attracts investors, developers, hoteliers and luxury players. Seasonality, international competition and the importance of visuals require flawless execution across all channels.",
    challenges: "Many players rely only on word of mouth or one-off campaigns, without tracking or optimization — wasting budget in high season.",
    opportunity: "Combining premium content, targeted advertising and local SEO in Marrakech maximizes bookings, visits and quote requests throughout the year.",
  },
  "logistique-industrie": {
    label: "logistics, industry and export",
    context: "Tangier, gateway to Africa and a major logistics hub, concentrates industrialists, exporters and B2B providers. Buyers compare offers online before any first commercial contact.",
    challenges: "Without a performant website, multilingual content and structured lead generation, Tangier businesses lose tenders and export opportunities.",
    opportunity: "Investing in digital in Tangier strengthens credibility with buyers, facilitates international acquisition and supports industrial growth.",
  },
  "tourisme-agro": {
    label: "tourism, agri-food and fisheries",
    context: "Agadir combines seaside tourism, agri-business and sea-related activities. Local companies must capture a mixed clientele — residents, tourists and national distributors.",
    challenges: "Tourist seasonality and fragmented channels make it hard to manage a coherent media budget without reliable data.",
    opportunity: "A data-driven approach in Agadir aligns acquisition, brand image and conversion with the most profitable periods of your activity.",
  },
  "artisanat-commerce": {
    label: "crafts, retail and education",
    context: "Fes has a rich economic fabric mixing crafts, traditional commerce, education and cultural tourism. Differentiation comes through authentic brand storytelling and a polished digital presence.",
    challenges: "Many local players under-invest in digital, leaving the field open to better-positioned competitors on Google and social media.",
    opportunity: "Structuring your acquisition and image in Fes lets you reach local and national customers while showcasing your brand identity.",
  },
  "industrie-agro": {
    label: "industry and agri-food",
    context: "Meknes is a strategic industrial and agri-food hub. Companies seek partners who can modernize communication and sales tools without disrupting operations.",
    challenges: "Sales processes remain very field-based, with little digital lead tracking and outdated websites that hurt credibility with professional buyers.",
    opportunity: "Digitizing acquisition in Meknes improves sales productivity, reduces response times and opens new regional markets.",
  },
  "commerce-transfrontalier": {
    label: "cross-border trade and commerce",
    context: "Oujda, a dynamic border city, sees merchants, distributors and SMEs oriented toward Algeria and eastern Morocco. Responsiveness and trust are essential buying criteria.",
    challenges: "Few businesses fully leverage WhatsApp, geo-targeted ads and SEO to capture very concrete, immediate local demand.",
    opportunity: "A digital strategy adapted to Oujda turns visibility into qualified prospect flows, with controlled acquisition cost.",
  },
  "industrie-logistique": {
    label: "industry and port logistics",
    context: "Kenitra and its industrial zone host manufacturers, logisticians and subcontractors serving major accounts. Compliance, reliability and performance are at the heart of client expectations.",
    challenges: "Without a professional digital presence, local SMEs struggle to be referenced by buyers who search for providers online.",
    opportunity: "Strengthening your {service} in Kenitra consolidates your B2B image, facilitates talent recruitment and supports regional commercial development.",
  },
};

const enCities = {
  casablanca: {
    localInsight: "In Casablanca, our clients value our ability to run ambitious projects: multi-channel campaigns, high-traffic sites, CRM integrations and executive reporting. We tailor every deliverable to targeted neighborhoods and audiences — Maarif, Anfa, Sidi Maarouf or industrial zones.",
    marketNote: "The Casablanca market rewards execution speed and proof by numbers: we set KPIs from launch and adjust every week.",
  },
  rabat: {
    localInsight: "In Rabat and Salé, we work with organizations that demand rigor and clarity: institutions, consultancies, schools and service companies. Our deliverables meet high editorial standards and structured validation processes.",
    marketNote: "The Rabat audience responds well to educational content, case studies and progressive conversion paths rather than overly aggressive approaches.",
  },
  marrakech: {
    localInsight: "In Marrakech, aesthetics and emotion come first: our campaigns and creatives highlight the customer experience, whether you target Gueliz, Hivernage or international clients seeking authenticity.",
    marketNote: "We calibrate budgets according to high season, local events and demand peaks to maximize every dirham invested.",
  },
  tanger: {
    localInsight: "In Tangier, we support B2B and industrial players who export or serve the greater North. Our content can be delivered in French, Arabic and English depending on your target markets.",
    marketNote: "Proximity to Europe and free zones requires credible, international communication — we ensure this on every touchpoint.",
  },
  agadir: {
    localInsight: "In Agadir, we combine tourist acquisition and local commercial development: mobile-friendly creatives, clear messages and WhatsApp follow-up to convert incoming requests quickly.",
    marketNote: "Dual tourism / agri seasonality requires a flexible media calendar — we build it with you upfront.",
  },
  fes: {
    localInsight: "In Fes, we highlight your brand authenticity while modernizing acquisition channels: social media, Google and content that speaks to the local population and visitors.",
    marketNote: "Word of mouth remains strong: we digitize it through reviews, social proof and geo-targeted awareness campaigns.",
  },
  meknes: {
    localInsight: "In Meknes, we help industrialists and retailers professionalize their online presence without unnecessary jargon: clear sites, product sheets and lead generation for field teams.",
    marketNote: "Local buyers compare several suppliers — being visible and credible first often makes the difference.",
  },
  oujda: {
    localInsight: "In Oujda, we favor concrete, fast tactics: WhatsApp Business, geo-targeted ads, mobile landing pages and automated follow-ups so no prospect is lost.",
    marketNote: "Responsiveness is key: we configure alerts and response processes in under one business day.",
  },
  kenitra: {
    localInsight: "In Kenitra, we serve industrial SMEs that need B2B credibility: corporate sites, technical sheets, SEO and content oriented toward buyers.",
    marketNote: "We align your communication with major account requirements while staying agile as a local SME.",
  },
};

const arSectors = {
  "finance-industrie": {
    label: "التمويل والصناعة والشركات المتوسطة الكبرى",
    context: "الدار البيضاء تجمع أكبر تجمع اقتصادي في المغرب: مقرات وصناعة وبنوك وشركات ناشئة سريعة النمو. يتوقع صناع القرار مزودين يقدمون بسرعة مع عائد استثمار واضح.",
    challenges: "في هذا السياق، الرؤية الرقمية لم تعد رفاهية: بدون حضور منظم، يقارن العملاء منافسيك بنقرة ويختارون الأكثر ثقة عبر الإنترنت.",
    opportunity: "تموضع محلي قوي في الدار البيضاء يجذب عملاء محتملين مؤهلين ويعزز صورتكم ويسرّع دورات البيع.",
  },
  "administration-services": {
    label: "الإدارة والخدمات والأعمال B2B",
    context: "الرباط ومنطقتها تضم مؤسسات ومكاتب استشارية وشركات خدمات تبيع لعملاء صعبين. النبرة والمصداقية والوضوح الرقمي حاسمان للتحويل.",
    challenges: "دورات القرار غالباً أطول: بدون متابعة وCRM ومحتوى مطمئن، تبرد الفرص قبل التوقيع.",
    opportunity: "استراتيجية رقمية منظمة في الرباط تولد عملاء مؤهلين وتحترف صورتكم وتؤتمت المتابعة التجارية.",
  },
  "tourisme-immobilier": {
    label: "السياحة والعقار والضيافة",
    context: "مراكش تجذب مستثمرين ومطورين وفنادق ولاعبين في الفخامة. الموسمية والمنافسة الدولية تفرض تنفيذاً لا تشوبه شائبة.",
    challenges: "كثيرون يعتمدون على السمعة أو حملات عرضية دون تتبع — ما يهدر الميزانية في الموسم العالي.",
    opportunity: "دمج محتوى متميز وإعلانات مستهدفة وSEO محلي في مراكش يزيد الحجوزات والطلبات على مدار السنة.",
  },
  "logistique-industrie": {
    label: "اللوجستيك والصناعة والتصدير",
    context: "طنجة، بوابة إفريقيا ومحور لوجستي، تجمع صناعيين ومصدرين ومزودي B2B. المشترون يقارنون العروض عبر الإنترنت أولاً.",
    challenges: "بدون موقع قوي ومحتوى متعدد اللغات وتوليد عملاء منظم، تفقد شركات طنجة مناقصات وفرص تصدير.",
    opportunity: "الاستثمار الرقمي في طنجة يعزز المصداقية ويسهل الاستقطاب الدولي ويدعم النمو الصناعي.",
  },
  "tourisme-agro": {
    label: "السياحة والفلاحة والصيد",
    context: "أكادير تجمع سياحة ساحلية وقطاعاً فلاحياً وأنشطة بحرية. يجب استهداف زبناء محليين وسياح وموزعين.",
    challenges: "موسمية السياحة وتعدد القنوات يصعبان إدارة ميزانية إعلامية دون بيانات موثوقة.",
    opportunity: "نهج قائم على البيانات في أكادير يوائم الاستقطاب والصورة والتحويل مع فترات النشاط الأكثر ربحية.",
  },
  "artisanat-commerce": {
    label: "الحرف والتجارة والتعليم",
    context: "فاس تتميز بحرف وتجارة تقليدية وتعليم وسياحة ثقافية. التميز يمر بسرد علامة أصيل وحضور رقمي أنيق.",
    challenges: "كثير من الفاعلين يقللون الاستثمار الرقمي، تاركين المجال لمنافسين أوضح على Google والشبكات.",
    opportunity: "هيكلة استقطابكم وصورتكم في فاس تصل بزبناء محليين ووطنيين وتبرز هوية علامتكم.",
  },
  "industrie-agro": {
    label: "الصناعة والفلاحة",
    context: "مكناس محور صناعي وفلاحي استراتيجي. الشركات تبحث عن شركاء يحدثون التواصل دون تعطيل العمليات.",
    challenges: "مبيعات ميدانية بلا تتبع رقمي ومواقع قديمة تضعف المصداقية أمام المشترين المحترفين.",
    opportunity: "رقمنة الاستقطاب في مكناس تحسن إنتاجية المبيعات وتفتح أسواقاً إقليمية جديدة.",
  },
  "commerce-transfrontalier": {
    label: "التجارة والتبادل عبر الحدود",
    context: "وجدة مدينة حدودية ديناميكية: تجار وموزعون وشركات صغيرة موجهة نحو الجزائر والشرق. السرعة والثقة معياران أساسيان.",
    challenges: "قليلون يستغلون WhatsApp والإعلانات الجغرافية وSEO لالتقاط طلب محلي فوري.",
    opportunity: "استراتيجية رقمية ملائمة لوجدة تحول الظهور إلى عملاء محتملين بكلفة مضبوطة.",
  },
  "industrie-logistique": {
    label: "الصناعة واللوجستيك المينائي",
    context: "القنيطرة ومنطقتها الصناعية تضم مصنعين ولوجستيين ومقاولين من الباطن لكبار العملاء.",
    challenges: "بدون حضور رقمي احترافي، تكافح الشركات الصغيرة ليُذكروا من قبل المشترين الذين يبحثون عبر الإنترنت.",
    opportunity: "تعزيز {service} في القنيطرة يقوي صورتكم B2B ويدعم التطور التجاري الإقليمي.",
  },
};

const arCities = {
  casablanca: {
    localInsight: "في الدار البيضاء، يقدّر عملاؤنا قدرتنا على إدارة مشاريع طموحة: حملات متعددة القنوات ومواقع عالية الزيارات وتكاملات CRM.",
    marketNote: "السوق الكاساوي يكافئ السرعة والأرقام: نحدد مؤشرات أداء من الإطلاق ونعدّل أسبوعياً.",
  },
  rabat: {
    localInsight: "في الرباط وسلا، نعمل مع جهات تتطلب دقة ووضوحاً: مؤسسات ومدارس وشركات خدمات بمعايير تحريرية عالية.",
    marketNote: "جمهور الرباط يستجيب للمحتوى التعليمي ودراسات الحالة ومسارات تحويل تدريجية.",
  },
  marrakech: {
    localInsight: "في مراكش، الجمالية والعاطفة أولاً: حملاتنا تبرز تجربة الزبون سواء استهدفتم كَلِيز أو هيفرناج أو زواراً دوليين.",
    marketNote: "نضبط الميزانيات حسب الموسم العالي والأحداث المحلية لأقصى عائد على كل درهم.",
  },
  tanger: {
    localInsight: "في طنجة، نرافق فاعلي B2B وصناعة يصدرون أو يخدمون الشمال الكبير. محتوانا بالفرنسية والعربية والإنجليزية.",
    marketNote: "القرب من أوروبا والمناطق الحرة يفرض تواصلاً دولياً موثوقاً على كل نقطة اتصال.",
  },
  agadir: {
    localInsight: "في أكادير، نجمع استقطاباً سياحياً وتطويراً تجارياً محلياً: إبداعات للجوال ورسائل واضحة ومتابعة WhatsApp.",
    marketNote: "ازدواجية موسم السياحة والفلاحة تتطلب تقويماً إعلامياً مرناً نبنيه معكم مسبقاً.",
  },
  fes: {
    localInsight: "في فاس، نبرز أصالة علامتكم مع تحديث قنوات الاستقطاب: شبكات وGoogle ومحتوى يخاطب السكان والزوار.",
    marketNote: "السمعة الشفهية قوية: نرقمنها عبر آراء وإثباتات اجتماعية وحملات وعي جغرافية.",
  },
  meknes: {
    localInsight: "في مكناس، نساعد الصناعيين والتجار على احتراف الحضور الرقمي: مواقع واضحة وتوليد عملاء لفرق الميدان.",
    marketNote: "المشترون المحليون يقارنون عدة موردين — الظهور والمصداقية أولاً يصنعان الفارق.",
  },
  oujda: {
    localInsight: "في وجدة، نفضل تكتيكات سريعة: WhatsApp Business وإعلانات جغرافية وصفحات هبوط للجوال ومتابعات آلية.",
    marketNote: "الاستجابة السريعة أساسية: نضبط تنبيهات وعمليات رد في أقل من يوم عمل.",
  },
  kenitra: {
    localInsight: "في القنيطرة، نخدم شركات صناعية تحتاج مصداقية B2B: مواقع مؤسسية وSEO ومحتوى موجه لكبار العملاء.",
    marketNote: "نوائم تواصلكم مع متطلبات كبار الحسابات مع بقاءنا رشيقين كشركة محلية.",
  },
};

function patch(locale, sectors, cities) {
  const base = JSON.parse(readFileSync(join(root, `messages/${locale}/serviceCityPages.json`), "utf8"));
  base.sectors = sectors;
  base.cities = cities;
  writeFileSync(join(root, `messages/${locale}/serviceCityPages.json`), JSON.stringify(base, null, 2) + "\n");
  console.log(`Patched messages/${locale}/serviceCityPages.json`);
}

patch("en", enSectors, enCities);
patch("ar", arSectors, arCities);
