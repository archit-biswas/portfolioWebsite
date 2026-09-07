# Projects rail, hover-reveal cards, resume thumbnail fix

## Part 1 — Proximity-magnify rail beside Projects

A slim vertical rail of identical tick marks sits to the left of the projects grid on large screens. One tick per project currently shown by the search box and tag filters, so the rail shrinks and grows with the filters. Moving the pointer near the rail makes nearby ticks swell and slide outward, strongest at the pointer and easing off smoothly either side, and the tick at the crest pops out a small card with that project's name and a shortened description. The card flips to whichever side has more space.

Clicking a tick (or pressing Enter on it) smooth-scrolls the page down to that project's card in the grid and briefly rings it. Arrow keys walk the rail, Home/End jump to the ends. Reduced motion keeps the same positions and preview card but without spring easing.

The rail is hidden below `lg`; on smaller screens nothing changes — the existing search and tag filters remain the only navigation. The rail never blocks or delays page scrolling.

## Part 2 — Hover-to-reveal project cards

Cards show only the title and description at rest — tags and links are hidden. Hovering (or keyboard-focusing) the card reveals, in the same space: the skills as plain comma-separated text, a line "Click to open the GitHub repo", and, when a project has one, a separate small "Live demo" link.

The whole card becomes clickable and opens the repo in a new tab; clicking "Live demo" opens the demo instead. On touch screens the first tap only reveals the hidden details; a second tap opens the repo. The existing lift/scale/shadow hover motion stays exactly as it is.

## Part 3 — Resume hover thumbnail in the hero

The small resume preview that trails the cursor works from the Resume section but misbehaves from the hero's "Download Resume" button: it is trapped inside an animated, clipped wrapper. The thumbnail will render into its own layer attached to the page body instead, so it follows the cursor freely anywhere on screen from either button. The buttons themselves are unchanged.

## Technical notes

Files changed:
- `src/components/portfolio/ProjectsExplorer.tsx` — new `ProjectRail` subcomponent + reworked `ProjectCard`; layout becomes `lg:grid-cols-[auto_1fr]` with the rail `sticky top-28`.
- `src/components/portfolio/ResumeViewer.tsx` — `ResumeHoverThumb` renders through `createPortal` into a lazily created `div[data-resume-thumb-layer]` appended to `document.body` (fixed, inset-0, pointer-events-none, z-[110]), created in an effect so SSR renders nothing.
- `src/components/portfolio/Sections.tsx` — no structural change required once portalled; keep the existing `onMouseEnter/onMouseLeave` handlers.

Rail data model: `results` (the already-memoized filtered array) maps 1:1 to ticks; each project gets a stable DOM id `project-${slug(name)}` set on its `<article>` in the grid, and the tick stores the same id for `scrollIntoView({ behavior: "smooth", block: "center" })` (instant when `prefers-reduced-motion`). Tick height `TICK = 22px` with `GAP = 6px`, so rail height = `results.length * (TICK + GAP)` — no fixed height.

Magnify: a single `useMotionValue` holds the pointer's y within the rail, updated on `pointermove` on the rail wrapper (and reset on `pointerleave`). Each tick derives width/x/opacity via `useTransform` on that shared value with a raised-cosine falloff `0.5 * (1 + cos(pi * clamp(d/R,0,1)))`, `R ≈ 3 tick pitches`, wrapped in `useSpring` (stiffness 300, damping 30) unless reduced motion. Crest index is tracked with `useMotionValueEvent` into React state to drive the preview card; keyboard focus overrides the crest. No per-tick hover handlers, so no flicker.

A11y: rail is `role="listbox"`-free — plain `<ul>` of `<button>`s with roving `tabIndex` (`0` on active, `-1` otherwise), `aria-label` per tick with the project name, and `aria-hidden` on the decorative preview card (name is already on the tick label).

Card reveal: `useState` for `revealed`, set by `onMouseEnter/onMouseLeave`, `onFocus/onBlur` (via `focus-within`), and by a first `onClick` when `window.matchMedia("(hover: none)").matches`. Hidden block uses `grid-rows-[0fr]` → `grid-rows-[1fr]` transition with `overflow-hidden` so no layout jump on scroll. Card is a `<div role="link" tabIndex={0}>` with keyboard Enter handling plus an accessible visually-hidden anchor to `project.repo` for screen readers; the demo link calls `e.stopPropagation()`. Colors keep `text-muted-foreground` / `text-primary` tokens for contrast in both themes.
