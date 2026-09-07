# Projects: rail-driven single card + cursor-following tooltip

## Part 1 — One rail, one visible card

The vertical tick rail beside the projects stays exactly as it is today (one tick per project, magnify with the raised-cosine falloff and spring). What changes is what the grid shows.

- On load, the first project's card is shown; nothing else. The section is never blank.
- Moving the pointer along the rail switches the visible card to whichever tick is at the crest — one card at a time, no grid.
- Moving the pointer off the rail keeps the last shown card visible.
- Arrow keys (and Home/End) move the crest and switch the card; Enter opens that project's repo.
- Reduced motion: same one-at-a-time switching, instant swap with no spring.
- Below `lg` (touch/mobile): unchanged from today — rail hidden, all cards shown in the stacked/2-column grid, with the existing tap-to-reveal details.

## Part 2 — Cursor-following tooltip on the visible card

The inline reveal block inside the card (skills, "Click to open the GitHub repo", demo link) is removed on desktop and replaced by a small tooltip that trails the cursor while hovering the card:

- Spring-eased, offset below-right of the pointer, clamped to stay inside the card area.
- Contents: skills as plain comma-separated text, a line "Click to open the GitHub repo", and — when the project has one — a "Live demo" link that opens the demo instead of the repo.
- Styled with the existing card background, border and text tokens.
- Never shown on touch devices; there the current tap-to-reveal inline block stays.
- The whole card still opens the repo on click / Enter.

## Technical notes

Only `src/components/portfolio/ProjectsExplorer.tsx` changes.

State: `ProjectsExplorer` owns `selected` (index, default `0`). `ProjectRail` gets `selected` + `onSelect`; its existing crest tracking (`useMotionValueEvent` on the pointer motion value) calls `onSelect(i)` when the crest index changes, and no longer resets to `null` on `pointerleave` — the crest just stops updating, so the last card sticks. Keyboard `focusTick` also calls `onSelect`; Enter opens `project.repo` (replacing the current scroll-to behavior, since only one card renders). The preview card next to the rail stays.

Desktop grid becomes a single-card container: `results[selected]` rendered inside `AnimatePresence` with a short fade/translate (`duration: 0` under `useReducedMotion`). The mobile path renders the full `results.map` grid; the two are switched with Tailwind (`hidden lg:block` / `lg:hidden`) so SSR stays static and no `useIsMobile` flash occurs.

Tooltip: a local `CursorFollow` implemented with `useMotionValue` + `useSpring` (stiffness 300, damping 30; `{ duration: 0 }` when reduced) inside a `relative` card wrapper. `onPointerMove` on the card writes pointer coordinates relative to the card box; the tooltip is `absolute`, `pointer-events-none` except the demo link (`pointer-events-auto` + `stopPropagation`), `hidden lg:block`, and gated on a `hover` state so it only shows while the pointer is over the card. Touch is excluded by the `lg` gate plus a `matchMedia("(hover: hover)")` check.

A11y: the visually-hidden `<a href={project.repo}>` inside the card stays, and the tooltip is `aria-hidden` since its text is decorative duplication of that link plus the already-listed tags.
