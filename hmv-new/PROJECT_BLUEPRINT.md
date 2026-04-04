# Project Blueprint — Homagama MV School Website

## 1. Current State (As-Is)

### Architecture
Single-page React application with client-side routing. All state is local (`useState`); no global state management layer. All page components are lazy-loaded with a shared `Suspense` fallback.

### Tech Stack
| Layer            | Technology                          |
|------------------|-------------------------------------|
| Framework        | React 19                            |
| Build            | Vite 8 + Oxc (via plugin-react)     |
| Routing          | React Router v7                     |
| Styling          | TailwindCSS 4 (via `@tailwindcss/vite`) |
| Animations       | Framer Motion                       |
| UI Primitives    | Radix UI + shadcn/ui pattern        |
| Backend (planned)| Supabase (client SDK installed)     |
| Icons            | Material Symbols Outlined + Lucide  |
| Lint             | ESLint 9                            |
| Deployment (prep) | Cloudflare Workers (wrangler deps)  |

### Routes Map
```
/                   → Landing (Hero, About, News, Gallery, Athletics, Societies, Contact)
/history            → History page
/academics          → Academics page
/clubs              → Clubs page
/sports             → Sports page
/news               → Full news listing
/contact            → Contact page
/life-at-school     → Life at school page
/admin/login        → Login (client-side only)
/admin/*            → Admin panel with nested routes:
  /admin            → Dashboard
  /admin/news       → CMS placeholder (Coming Soon)
  /admin/gallery    → CMS placeholder (Coming Soon)
  /admin/staff      → CMS placeholder (Coming Soon)
  /admin/societies  → CMS placeholder (Coming Soon)
  /admin/settings   → Settings placeholder (Coming Soon)
*                   → 404 page
```

### File Inventory (34 files)
```
src/
  main.jsx                        → App entry
  App.jsx                         → Router + state (auth, loader, suspender)
  App.css                         → (likely unused)
  index.css                       → Full design system (colors, glass, animations)

  components/
    Header.jsx                    → Scroll-morphing nav + mobile sheet
    Footer.jsx                    → 4-column footer + newsletter form (stub)
    Hero.jsx                      → Parallax hero + testimonial card
    About.jsx                     → Landing section
    News.jsx                      → Landing section
    Gallery.jsx                   → Landing section
    Societies.jsx                 → Landing section
    Athletics.jsx                 → Landing section
    Contact.jsx                   → Landing section
    OnlineLearning.jsx            → Landing section
    HistoryBanner.jsx             → Landing section
    CinematicLoader.jsx           → 2.2s intro animation on mount
    NoiseOverlay.jsx              → Grain overlay
    ScrollReveal.jsx              → Intersection Observer reveal
    MagneticButton.jsx            → Magnetic hover effect
    PageHero.jsx                  → Sub-page hero/banner
    ThemeProvider.jsx             → Light/dark theme context

    ui/
      button.tsx                  → shadcn Button (CVA variants)
      card.tsx                    → shadcn Card
      input.tsx                   → shadcn Input
      textarea.tsx                → shadcn Textarea
      label.tsx                   → shadcn Label
      dialog.tsx                  → shadcn Dialog (Radix)

  pages/
    HistoryPage.jsx
    AcademicsPage.jsx
    ClubsPage.jsx
    SportsPage.jsx
    NewsPage.jsx
    ContactPage.jsx
    LifeAtSchoolPage.jsx
    NotFoundPage.jsx

  admin/
    AdminLogin.jsx                → Login form
    AdminLayout.jsx               → Admin shell + sidebar
    Dashboard.jsx                 → Admin dashboard

  lib/
    utils.js                      → cn() = clsx + tailwind-merge
    supabase.js                   → Supabase client (needs env vars)

  assets/
    hero.png                      → Local hero image
    react.svg                     → Vite default
    vite.svg                      → Vite default

public/
  logo.png, favicon.svg, icons.svg → Static assets
```

---

## 2. Identified Gaps & Issues

### Critical
- **Admin auth is trivially bypassable** — `useState(null)` in App.jsx with no backend, no session, no persistence
- **Supabase client uses hardcoded placeholder keys** — will fail real calls; no `.env` or `.env.local` exists
- **All CMS routes are empty "Coming Soon" shells** — no CRUD, no database integration
- **Newsletter form is non-functional** — no submission handler, no API endpoint

### Moderate
- **Hero image from external Google URL** — fragile, no fallback, potential CORS/broken-link risk
- **No tests** — zero test framework, no Vitest, no RTL
- **`App.css` is likely unused** — imported nowhere
- **No `.env.example`** — nothing documents required environment variables
- **Footer social links all point to `#`** — dead URLs
- **Mixed `.jsx`/`.tsx`** — UI components are `.tsx`, rest is `.jsx` (no tsconfig)

### Minor
- **No form validation library** — `zod` is not installed despite being referenced in patterns
- **Hardcoded ImageKit logo URL** — should use local asset or configured CDN
- **CinematicLoader always fires on mount** — cannot be triggered on route changes
- **No SEO/meta tags** — no react-helmet or Vite `index.html` customization
- **No 404 error boundary** — just a NotFoundPage component, no React Error Boundary

---

## 3. Recommended Phases

### Phase 1 — Foundation & Configuration
- [ ] Create `.env.example` with `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- [ ] Add `zod` + `@hookform/resolvers` for form validation
- [ ] Add Vitest + React Testing Library
- [ ] Remove unused `App.css` import
- [ ] Add React Error Boundaries
- [ ] Move external images to `public/` or configure a proper CDN env var
- [ ] Add meta tags / SEO structure to `index.html`

### Phase 2 — Complete Admin Panel UI
- [ ] Build News CMS (create/edit/delete articles, rich text)
- [ ] Build Gallery CMS (image upload to Supabase Storage)
- [ ] Build Staff CMS (profile management)
- [ ] Build Societies CMS
- [ ] Build Settings page

### Phase 3 — Backend Integration
- [ ] Design Supabase database schema (tables: `news`, `staff`, `galleries`, `societies`)
- [ ] Set up Supabase Row Level Security (RLS) policies
- [ ] Implement Supabase Auth for admin login (replace `useState`)
- [ ] Connect CMS CRUD to real Supabase queries/mutations
- [ ] Implement image upload to Supabase Storage
- [ ] Add loading/error states to all admin pages

### Phase 4 — Polish & Deployment
- [ ] Add form validation (zod schemas) to all admin forms
- [ ] Implement newsletter submission (Supabase Edge Function or API)
- [ ] Add proper social links in footer
- [ ] Set up Cloudflare Workers deployment (wrangler config exists, no config file)
- [ ] Add CI/CD pipeline (GitHub Actions)
- [ ] Performance audit + code splitting review
- [ ] Accessibility audit (keyboard nav, screen reader, color contrast)

### Phase 5 — Future Enhancements (Optional)
- [ ] Server-side rendering or SSG (Astro Remix / Vite SSR)
- [ ] Blog/article commenting system
- [ ] Student/Parent portal (authenticated section)
- [ ] School calendar integration
- [ ] Multi-language support
- [ ] Dark mode toggle (ThemeProvider exists but may not be wired)

---

## 4. Design System Reference

### Color Palette
```
Primary (Crimson)   #610000 → #8b0000 → #ff907f (light accents)
Secondary (Gold)    #705d00 → #fcd400 → #ffe16d (light accents)
Tertiary (Brown)    #3b2a00 → #563f00 → #ffdf9e
Surface             #f8f9fa (light) with full Material 3 elevation scale
Outline             #8e706b
```

### Typography
```
--font-display: "Playfair Display"  → Display/hero headings
--font-headline: "Noto Serif"       → Section headings
--font-body: "Manrope"              → Body text
--font-outfit: "Outfit"             → Accent labels
```

### Glass Utilities Available
`.glass-panel`, `.glass-card`, `.liquid-glass`, `.liquid-glass-crimson`, `.liquid-glass-yellow`

### Animations Available
`float`, `breathe`, `fadeInUp`, `shimmer`, `liquid-flow`, `drift`

---

## 5. Commands Quick Reference
```bash
npm run dev        # Dev server (localhost:5173)
npm run build      # Production build → dist/
npm run lint       # ESLint check
npm run preview    # Preview build output
```
