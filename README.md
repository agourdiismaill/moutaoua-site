# Moutaoua

Site vitrine pour **Moutaoua**, agence de marketing digital spécialisée dans les centres de formation au Maroc. UI premium, animations Framer Motion, mode sombre, i18n FR / EN / AR.

## Stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3** (design tokens via variables CSS, light/dark)
- **Framer Motion** (fade, slide, scale, hover, parallax, compteurs animés)
- **shadcn/ui** (Radix UI) — Button, Card, Badge, Accordion, Dialog, Tabs, Input…
- **next-themes** — dark mode persistant
- **lucide-react** — icônes

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm start        # serveur de production
npm run lint
```

## Fonctionnalités

- Navbar sticky transparente (glassmorphisme au scroll) + menu mobile animé
- Hero animé avec mockup de dashboard flottant et cartes de métriques
- Compteurs statistiques animés au scroll
- Logos clients en marquee infini
- Section Services (grille de cartes, features optionnelles)
- Résultats publicitaires (Meta, Google, Lead Forms, CRM, WhatsApp) avec **galerie lightbox**
- Vitrine vidéo : cartes (thumbnail, play, titre, client, description, date, catégorie) → **modal vidéo moderne**
- Études de cas détaillées + pages dynamiques SSG
- Tarifs, FAQ (accordéon), témoignages, CTA
- SEO : métadonnées, OpenGraph, JSON-LD, `sitemap.xml`, `robots.txt`, manifest PWA
- Lazy loading des sections below-the-fold + images optimisées `next/image`
- Mobile-first, entièrement responsive

## Structure

```
app/                      # Pages (App Router)
  page.tsx                # Accueil
  services/  results/  videos/  pricing/  contact/
  case-studies/           # Liste + [slug] (SSG)
  sitemap.ts  robots.ts  manifest.ts
components/
  ui/                     # Primitives shadcn
  layout/                 # Navbar, Footer
  sections/               # Hero, Stats, ResultCard, VideoCard, CaseStudyCard…
  shared/                 # Reveal, Lightbox, VideoModal, AnimatedCounter…
  providers/              # ThemeProvider
data/                     # Source de vérité (typée)
  types.ts                # Tous les types de contenu
  case-studies.json       # ← Admin-ready (voir ci-dessous)
  services.ts  videos.ts  results.ts  pricing.ts  faq.ts  testimonials.ts  site.ts
lib/                      # utils, variants Framer Motion
```

## Admin-ready : ajouter une étude de cas sans coder

Toutes les études de cas vivent dans [`data/case-studies.json`](./data/case-studies.json).
Il suffit d'ajouter un objet respectant cette structure — la page de liste, la page
détail (`/case-studies/[slug]`), le sitemap et les métadonnées sont générés
automatiquement.

```jsonc
{
  "slug": "mon-client",            // URL: /case-studies/mon-client
  "title": "Titre de la mission",
  "client": "Nom du client",
  "industry": "Secteur",
  "description": "Résumé…",
  "objectives": ["…"],
  "strategy": ["…"],
  "budget": "88 000 DH / mois",
  "leads": 1240,
  "cpl": "53 DH",
  "roas": "5,2x",
  "timeline": "6 mois",
  "cover": "https://…",
  "images": ["https://…"],          // galerie lightbox
  "videos": ["YOUTUBE_ID"],         // ouvertes en modal
  "testimonials": [{ "quote": "…", "author": "…", "role": "…" }],
  "featured": true,
  "tags": ["Meta Ads", "CRO"]
}
```

Les autres contenus (services, vidéos, résultats, tarifs, FAQ, témoignages,
statistiques) sont eux aussi centralisés et typés dans `data/`.

## Personnalisation

- **Couleurs / thème** : variables CSS dans `app/globals.css` (`:root` et `.dark`).
- **Identité & navigation** : `data/site.ts`.
- **Images distantes** : autoriser les domaines dans `next.config.ts`.
