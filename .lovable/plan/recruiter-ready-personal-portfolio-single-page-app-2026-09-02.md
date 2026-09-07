# Recruiter-Ready Personal Portfolio — Single Page App

A modern-minimalist one-page portfolio with anchor navigation, subtle motion, and recruiter-focused copy. Seeded with placeholder content ([Your Name], [Email], [GitHub URL]) you can swap out later.

## Design direction

- Minimal editorial layout: generous whitespace, one accent color, strong type scale, thin hairline dividers.
- Motion: fade-and-rise on section entry (IntersectionObserver), 150–250ms hover/focus transitions, gentle parallax on the hero only. All motion respects `prefers-reduced-motion`.
- Accessibility: WCAG AA contrast via semantic tokens, visible focus rings, skip link, semantic landmarks (`header/nav/main/section/footer`), one `<h1>`, labelled sections via `aria-labelledby`.
- Rationale: recruiters scan in under a minute — minimalism keeps hierarchy obvious, subtle transitions signal craft without slowing the scan, and every section leads with outcomes rather than description.

## Page architecture

```text
/ (single route)
├── SkipLink
├── Header (sticky) — logo/name, section nav, "Hire Me" CTA, "Download Resume"
├── main
│   ├── #hero        Hero          name, role, one-line pitch, dual CTA
│   ├── #about       About         bio, portrait, core values, personal statement
│   ├── #journey     Journey       alternating vertical timeline (education + work)
│   ├── #skills      Skills        category tabs + proficiency meters
│   ├── #projects    Projects      search box + tag/language filter chips + repo cards
│   ├── #certs       Certifications  cards: issuer, date, credential link
│   ├── #resume      Resume        embedded PDF viewer + download button
│   └── #contact     Contact       email, socials, "Hire Me" CTA repeat
└── Footer
```

Also planned: a `/resume` fallback route that serves the PDF full-screen for mobile browsers that cannot embed PDFs.

## Components and props

| Component | Props |
|---|---|
| `Header` | `sections: {id,label}[]`, `resumeUrl`, `email` |
| `Hero` | `name`, `title`, `pitch`, `location`, `portrait?` |
| `SectionShell` | `id`, `title`, `eyebrow?`, `children` (handles heading + reveal animation) |
| `About` | `bio`, `statement`, `values: {icon,label,text}[]`, `portrait?` |
| `Timeline` | `items: JourneyItem[]`, `variant: 'education' \| 'work'` |
| `TimelineItem` | `title`, `org`, `start`, `end`, `location`, `achievements: string[]` |
| `SkillsGrid` | `categories: {name, skills: {name, level, percent}[]}[]` |
| `SkillMeter` | `name`, `percent`, `level` (renders `role="meter"` with aria values) |
| `ProjectsExplorer` | `projects: Project[]` (owns search + filter state) |
| `ProjectCard` | `project` |
| `FilterChips` | `tags`, `active`, `onToggle` |
| `CertificationList` | `items: Certification[]` |
| `ResumeViewer` | `pdfUrl`, `updatedAt` |
| `ContactCTA` | `email`, `links: {label,url}[]` |
| `RevealOnScroll` | `as`, `delay`, `children` |

## Data model (seed JSON in `src/data/portfolio.ts`)

```json
{
  "about": { "name": "[Your Name]", "title": "[Your Role]", "location": "[City, Country]",
             "email": "[Email]", "pitch": "[One-line value proposition]",
             "bio": "[2-3 sentence bio]", "statement": "[Short personal statement]",
             "portrait": "/portrait.jpg",
             "values": [{ "label": "Ownership", "text": "[Why this matters to you]" }] },
  "journey": [{ "type": "work", "role": "[Role]", "org": "[Company]", "location": "[City]",
                "start": "2024-01", "end": "present",
                "achievements": ["[Action verb + result + metric]"] }],
  "skills": [{ "category": "Languages",
               "items": [{ "name": "TypeScript", "level": "Advanced", "percent": 85 }] }],
  "projects": [{ "name": "[Project]", "description": "[What it does + impact, 1 line]",
                 "repo": "[GitHub URL]", "demo": null,
                 "language": "TypeScript", "tags": ["react", "api"] }],
  "certifications": [{ "name": "[Certification]", "issuer": "[Body]",
                       "date": "2025-06", "credentialUrl": "[URL]" }],
  "resume": { "url": "/resume.pdf", "updatedAt": "2026-08", "fileSize": "180 KB" }
}
```

## Technical notes

- Stack as-is: TanStack Start + React 19 + Tailwind v4. Single route `src/routes/index.tsx` replaces the placeholder; components under `src/components/portfolio/`.
- Design tokens (accent, surface, muted, ring, motion durations) added to `src/styles.css` under `:root`/`.dark` and `@theme inline` — no hardcoded colors in components.
- Layout with CSS Grid for section shells and card grids, Flexbox for inline clusters; mobile-first breakpoints (`sm/md/lg`).
- Projects filtering is client-side over the seed JSON (search by name/description + tag and language chips), so it works with zero backend. Optional later upgrade: fetch live repos from the GitHub API.
- Resume: `<object>`/`<iframe>` viewer with a download anchor fallback; PDF placeholder in `public/resume.pdf`.
- Performance: images lazy-loaded with width/height set, no heavy animation libraries (CSS transitions + IntersectionObserver), fonts loaded via `<link>` in `__root.tsx`.
- SEO: route `head()` with unique title, description, og/twitter tags, plus JSON-LD `Person` schema.

## Testing checklist

- Nav: every anchor scrolls to its section; active link updates on scroll; keyboard tab order is logical; skip link works.
- About/Journey: content renders from JSON; timeline readable at 375px width.
- Skills: meters expose correct `aria-valuenow`; category switching keyboard accessible.
- Projects: search + chips filter combine; empty state shows; repo links open in new tab with `rel="noopener"`.
- Certifications: credential links valid; dates formatted consistently.
- Resume: viewer renders on desktop, download works on mobile.
- Global: `prefers-reduced-motion` disables animation; AA contrast in light and dark; no console/build errors.

## Open items for you

Replace placeholders in `src/data/portfolio.ts`, drop your `resume.pdf` and `portrait.jpg` into `public/`.
