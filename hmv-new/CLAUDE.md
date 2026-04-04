# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React 19 website for a school (hmv), built with Vite 8 and TailwindCSS 4. Features a public-facing site with a landing page and sub-pages, plus a client-side admin panel.

## Scripts

| Command        | Description           |
| -------------- | --------------------- |
| `npm run dev`  | Start Vite dev server |
| `npm run build`| Production build      |
| `npm run lint` | Run ESLint            |
| `npm run preview` | Preview production build |

Note: There is **no test framework** configured.

## Architecture

### Tech Stack
- **Framework:** React 19 with Vite 8
- **Styling:** TailwindCSS 4 + Radix UI primitives (shadcn/ui pattern)
- **Routing:** React Router v7 with lazy-loaded page components
- **Animations:** Framer Motion
- **Backend:** Supabase (client SDK)
- **Icons:** Lucide React
- **Path alias:** `@/` maps to `src/` (configured in `vite.config.js`)

### Directory Structure

```
src/
├── App.jsx              # Main app: routing,ThemeProvider, CinematicLoader
├── main.jsx             # Entry point
├── index.css            # Global styles + Tailwind
├── components/
│   ├── ui/              # Reusable shadcn/ui primitives (.tsx)
│   ├── Header.jsx       # Navigation header with scroll effects
│   ├── Footer.jsx       # Site footer
│   ├── Hero.jsx         # Landing hero section
│   ├── CinematicLoader.jsx  # Page transition loader
│   ├── NoiseOverlay.jsx     # Visual noise overlay
│   ├── ScrollReveal.jsx
│   ├── MagneticButton.jsx
│   ├── PageHero.jsx         # Sub-page hero/banner
│   └── ...                  # Landing page section components
├── pages/             # Full page components (lazy-loaded in App.jsx)
│   ├── HistoryPage.jsx
│   ├── AcademicsPage.jsx
│   ├── ClubsPage.jsx
│   ├── SportsPage.jsx
│   ├── NewsPage.jsx
│   ├── ContactPage.jsx
│   ├── LifeAtSchoolPage.jsx
│   └── NotFoundPage.jsx
├── admin/             # Admin panel (client-side auth)
│   ├── AdminLogin.jsx
│   ├── AdminLayout.jsx
│   └── Dashboard.jsx
└── lib/
    ├── utils.js       # cn() utility (clsx + tailwind-merge)
    └── supabase.js    # Supabase client (uses VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
```

### Routing

- `/` — Landing page (single-page layout with all sections)
- `/history`, `/academics`, `/clubs`, `/sports`, `/news`, `/contact`, `/life-at-school` — Sub-pages
- `/admin/login` — Admin login (redirects to `/admin` if authenticated)
- `/admin` — Protected admin area with nested routes (`news`, `gallery`, `staff`, `societies`, `settings`) — most are placeholders ("Coming Soon")

### Patterns
- All page-level components outside `App.jsx` are **lazy-loaded** via `Suspense`
- Supabase credentials come from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars, with fallback placeholders in `src/lib/supabase.js`
- Admin auth is **client-side only** (useState in App.jsx) — not production-ready for sensitive data
- UI components in `components/ui/` follow the shadcn/ui pattern with `cn()` utility and `class-variance-authority`
- Wrangler (Cloudflare Workers) is a dev dependency — previous project may have used Cloudflare deployment
