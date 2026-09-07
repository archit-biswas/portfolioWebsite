# Archit Biswas — Portfolio

My personal portfolio site: full-stack + GenAI/LLM engineer, built as a scroll-driven, animation-heavy single page rather than a static template. Live copy, resume viewer, a working contact form backed by a real database, and a fair amount of canvas/GSAP work under the hood.

**Live site:** https://architbiswas.dev *(update if the domain changes)*

## What's actually on the page

- **Hero** with a cursor-tracking spotlight and a full-viewport animated node graph running behind everything (canvas-based, connects nearby nodes with lines that light up near the pointer)
- **About** as a pinned deck of cards that flip through on scroll (falls back to a normal stacked layout on phones and under reduced-motion)
- **Journey** (work + education) as a horizontally pinned rail you scroll through vertically, panels zooming into focus as they pass center
- **Skills** as a sticky "I work with ___" line where categories scroll past and light up when centered, using native CSS scroll-driven animations (`animation-timeline: view()`) where supported, with a GSAP ScrollTrigger fallback
- **Projects** as a horizontal explorer with scroll-zoom cards
- **Certifications** as a pinned "circular split roll", titles and badges travel around two separate circular paths, both scrubbed by one ScrollTrigger
- **Resume viewer** with a cursor-following thumbnail preview and a direct PDF download
- **Contact form** that actually sends, validated with Zod, submitted through a TanStack Start server function, written to Postgres via Supabase, with an honeypot field against basic bots
- Dark/light theme toggle, kinetic full-screen nav overlay (GSAP), animated contact banner marquee, custom cursor glow, and skip-to-content link for accessibility

Almost none of this is decorative for its own sake. Motion is gated behind `prefers-reduced-motion` and screen width checks throughout, so it degrades to plain, readable content rather than breaking on phones or for people who've turned off animation.

## Stack

**Frontend**
- React 19 + TypeScript
- TanStack Start (file-based routing, SSR, server functions) on TanStack Router
- Tailwind CSS v4
- shadcn/ui (New York style) on top of Radix primitives, 47 components
- GSAP (ScrollTrigger, CustomEase) for scroll-scrubbed and pinned animations
- Framer Motion for viewport reveals and the projects explorer
- Lenis for smooth scrolling
- Lucide for icons

**Backend / data**
- Supabase (Postgres + auth) for the contact form's storage
- TanStack Start server functions for the form submission path, with a dedicated service-role client for server-side writes and a separate RLS-scoped client for anything user-authenticated
- Zod for request validation

**Build/tooling**
- Vite 8, Bun for package management (bun.lock is the source of truth; `package-lock.json` is also present for npm compatibility)
- ESLint + Prettier
- Nitro for the server build

## Project structure

```
src/
├── assets/                  Portrait image + generated asset metadata
├── components/
│   ├── portfolio/           All the custom, page-specific sections and effects
│   │   ├── AboutPanels.tsx        Pinned flip-card About section
│   │   ├── CertificationsOrbit.tsx Dual-ring scroll-pinned certifications
│   │   ├── ContactBits.tsx        Marquee banner + copy-to-clipboard bits
│   │   ├── ContactForm.tsx        Validated contact form + server fn call
│   │   ├── HeroSpotlight.tsx      Cursor-tracking radial glow
│   │   ├── JourneyRail.tsx        Horizontally pinned work/education rail
│   │   ├── KineticNav.tsx         Full-screen animated nav overlay
│   │   ├── NodeCanvas.tsx         Animated background node graph (canvas)
│   │   ├── ProjectsExplorer.tsx   Horizontal scroll-zoom project cards
│   │   ├── ResumeViewer.tsx       Resume preview + download
│   │   ├── Reveal.tsx             Viewport-triggered fade/slide wrapper
│   │   ├── Sections.tsx           Section shells that assemble the page
│   │   ├── SiteHeader.tsx         Sticky header + section-aware nav state
│   │   ├── SkillsScroll.tsx       Scroll-timeline skills focus list
│   │   └── ThemeToggle.tsx        Light/dark switch
│   └── ui/                  shadcn/ui component library (buttons, dialogs, forms, etc.)
├── data/
│   └── portfolio.ts         All site content: bio, journey, skills, projects, certs
├── hooks/
│   ├── use-horizontal-pin.ts  Generic GSAP pin + horizontal scroll hook
│   ├── use-parallax.ts        Vertical parallax on scroll
│   ├── use-scroll-zoom.ts     Scale/opacity scrub toward viewport center
│   ├── use-mobile.tsx         Breakpoint detection
│   └── use-theme.tsx          Theme state + localStorage persistence
├── integrations/supabase/   Client setup, auth middleware, generated DB types
├── lib/
│   ├── accents.ts            Category-to-accent-color mapping
│   ├── contact.functions.ts  Server function for contact form submission
│   ├── error-capture.ts      SSR error capture
│   ├── error-page.ts         Fallback error HTML
│   └── utils.ts               cn() helper, etc.
├── routes/                  TanStack Router file-based routes
├── router.tsx               Router + QueryClient setup
├── server.ts                SSR entry with error normalization
├── start.ts                 Middleware registration (CSRF, auth, error handling)
└── styles.css                Tailwind config, CSS custom properties, view-timeline keyframes

supabase/
├── config.toml
└── migrations/              SQL migration for the contact_messages table
```

## Content is data, not markup

Everything you'd normally hunt through JSX to edit, name, bio, work history, skills, project list, certifications, resume metadata, lives in one file: `src/data/portfolio.ts`. Updating the site's copy means editing that file, not touching component code.

## Running it locally

**Requirements:** Node 18+ (or Bun), and a Supabase project if you want the contact form to actually persist submissions.

```bash
# install
bun install
# or: npm install

# dev server
bun run dev
# or: npm run dev

# production build
bun run build

# preview the production build
bun run preview
```

### Environment variables

The contact form needs a Supabase project to write to. Set these (client-exposed, `VITE_`-prefixed for the browser client):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

And these for the server-side admin client (used only in server functions, never shipped to the browser):

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Without these set, the app still runs and renders, the contact form will just fail to submit, and the server client throws a clear error naming exactly which variable is missing.

### Database

The `contact_messages` table (id, name, email, subject, message, created_at) is defined in `supabase/migrations/`. Row Level Security is enabled with an insert-only policy for anonymous and authenticated users, so form submissions can be written but never read back through the public API. Apply the migration through the Supabase CLI or dashboard against your own project.

## Accessibility and performance notes

- Skip-to-content link on every page load
- All animation-heavy components check `prefers-reduced-motion` and viewport width before running GSAP/canvas work; under either condition they render as static, fully readable markup
- Server-side error boundaries return a styled fallback page instead of a blank crash on SSR failures
- SEO: per-page meta tags, Open Graph and Twitter card data, JSON-LD `Person` schema, sitemap, and robots.txt

## License

Personal portfolio source, shared for reference. Feel free to look through the implementation for the scroll/animation patterns, but the content (bio, resume, project descriptions) is specific to Archit Biswas and shouldn't be reused as-is.
