# Skills: sticky "I work with" scroll list

## What I found

- **The skills list already exists in one place**: `src/data/portfolio.ts` (`portfolio.skills` — six categories: Languages, Frontend, Backend & APIs, AI / ML & Data, XR & Game Development, DevOps & Infrastructure, each with named items, plus `portfolio.skillsIntro`). Nothing new will be hardcoded.
- **The Skills section is `src/components/portfolio/SkillsScroll.tsx`**, rendered inside the shared `SectionShell` (heading "Skills", eyebrow 03) in `Sections.tsx`.
- **It already does a version of this effect**: every category row dims to 18% opacity except the one at the viewport centre, driven by GSAP ScrollTrigger with `scrub`. There is no pin — the list just scrolls normally with tall padding.
- **GSAP + ScrollTrigger is already installed and used** across the site — no new dependency needed.
- **The pin-then-release pattern already exists** in `src/hooks/use-horizontal-pin.ts` (used by the Journey rail and the About deck): `ScrollTrigger` with `pin: true`, `start: "top top"`, `end` computed from content size, `scrub`, `invalidateOnRefresh`, all wrapped in `gsap.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)")` and `gsap.context()` so it reverts cleanly. I'll reuse exactly this mechanism.
- **Colours are tokenised**: `src/lib/accents.ts` maps each category to one of six theme hues (`--cat-signal`, `--cat-aqua`, `--cat-violet`, `--cat-ember`, `--cat-rose`, `--cat-lime`). Fonts/spacing come from existing tokens.

## Proposed behaviour

- Left column holds a pinned line — "I work with" — vertically centred, using the existing display font and muted colour.
- Right column is the list of the six skill categories. As each scrolls through the centre it becomes fully opaque and slightly bolder; everything else sits at ~0.2.
- The focused item's chips (individual skills) fade in with it, so the detail is still there.
- Colour: rather than an arbitrary 0–360 sweep, I'll use the six existing category hues, which already read as an evenly spread spectrum and keep both themes coherent. Say the word if you'd prefer a raw rainbow instead.
- The whole section pins at `top top` and releases the instant the last category has settled in focus — one continuous gesture, no extra scrolling.

## Responsive + accessibility

- **Mobile (< 768px)**: no pin, no scroll effect — the full list renders static and fully opaque, same as today. This is the safest option on touch and matches the existing sections. Flag it if you want the effect on mobile too.
- **prefers-reduced-motion**: identical static fallback, no pin.
- The animated list is `aria-hidden`; a visually-hidden sentence lists every category and skill in reading order for screen readers.

## Technical notes

- Primary path: native CSS scroll-driven animation (`animation-timeline: view()`, `@property --hue`-style animatable custom properties) for the per-item opacity/colour, gated by `CSS.supports("animation-timeline: view()")`.
- Fallback path: the existing GSAP ScrollTrigger scrub timeline (essentially today's code), used only when that check fails.
- Section pin/release: GSAP ScrollTrigger in both cases, matching `use-horizontal-pin.ts` conventions (matchMedia, `gsap.context`, pin a plain wrapper div — never a React-managed node — `end` derived from list height, `invalidateOnRefresh`).

## Files to change

- `src/components/portfolio/SkillsScroll.tsx` — rewritten: sticky heading + pinned wrapper + dual-path animation + screen-reader list.
- `src/styles.css` — add the scroll-timeline keyframes and `@property` declarations for the CSS path.
- `src/components/portfolio/Sections.tsx` — small adjustment so the Skills shell can host a full-height pinned block (heading placement, like Journey does).

No new dependencies.
