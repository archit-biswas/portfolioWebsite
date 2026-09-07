# Portfolio motion overhaul

A staged rebuild of how the site moves and reveals itself. All of your real words, photos, links and files stay exactly as they are — nothing is invented, nothing is padded with demo content. Each stage is checked on desktop and phone before the next one starts.

Your three answers are folded in: the red cursor stays (and grows 12%) while gaining magnetic snap, About becomes full-screen panels, and the "zoom as you scroll" treatment goes on Projects rather than a new Insights section.

## Stage 1 — Floating glass top bar
The bar becomes a shorter rounded pill floating below the top edge, frosted and translucent with a hairline edge and a soft shadow so page content visibly slides underneath. Same contents as today: your name, the Menu button, the light/dark switch. It condenses slightly once you scroll past the hero, and always sits above everything else.

## Stage 2 — Magnetic red cursor
Your existing red dot and trailing ring stay, get 12% larger, and gain a magnetic pull: buttons, links, social icons and project cards tug toward the pointer when it comes close, then spring back. Off on touch screens and for reduced-motion visitors.

## Stage 3 — Hero re-layout and reactive backdrop
- The hero copy is rearranged into a bolder, fragmented wall of type: a small kicker line, one plain intro sentence, then your role broken into two or three oversized stacked lines, with your GitHub and LinkedIn links tucked between those lines instead of in one row. Your supporting sentence, location line and the two existing buttons follow underneath. All wording is unchanged.
- The lines rise in one after another on load.
- Behind the hero only, a soft glow follows your cursor with a lag and the existing drifting nodes brighten near it. Idle-only for reduced motion.

## Stage 4 — Scroll "changes gear"
A reusable mechanism: certain sections pin in place while your scrolling drives content sideways, then release back into normal scrolling. Introduced first at the hero-to-About handoff, verified, then reused later. On phones this is always plain vertical scrolling.

## Stage 5 — Skills
Skills becomes a scroll-driven sequence built on the supplied component, restyled to your palette and fonts, using your real six categories and their chips. The tuning panel that ships with that code is not included in the live site.

## Stage 6 — Journey
Your milestones become a horizontal timeline: each role is one panel with its detail beside it, sliding left to right as you scroll while the incoming panel scales up into focus and the outgoing one shrinks away. Same roles, dates and bullets as now. Vertical stack with a simple fade on phones.

## Stage 7 — Projects zoom
Project cards get the same scale-toward-centre motion as you scroll. Search, filters, GitHub links and card content all keep working exactly as they do now.

## Stage 8 — Certifications orbit
Your certifications become a pinned orbital display: names circling on one side, badges on the other, drifting into and out of focus as you scroll. Built with your real certifications only — three, not the ten in the sample.

## Stage 9 — Resume
The button reads "View PDF". Hovering it shows a small snapshot of the resume's first page trailing your cursor. Clicking opens a large preview window with a Download button inside; closes on Escape, a click outside, or the close control.

## Stage 10 — About as full-screen panels
About is rebuilt as two to four full-height panels you scroll through, each with a small numbered label, a huge two-to-four-word headline, and one of your existing paragraphs, alternating background colours from your palette. Split from your current About copy only. Your portrait keeps a place in the first panel. Reduced-motion and phone visitors get the same content as a plain readable stack.

## Stage 11 — Contact
- A large repeating "CONTACT ✦ CONTACT ✦" banner scrolls across the top of the section, pausing on hover and frozen for reduced motion, with your existing pitch line beneath it.
- Your email appears as a large line that copies to the clipboard on click with a brief confirmation.
- GitHub and LinkedIn become small nudgeable chips.
- The form below is untouched in fields and behaviour, except the message box swaps to the styled textarea and success/failure now show as a toast.

## Technical notes
- New: `src/components/ui/magnetic-cursor.tsx` (merged into the existing `CustomCursor`), `story-scroll.tsx`, `scroll-reveal-content-a.tsx`, `you-can-scroll.tsx`, `circular-split-roll.tsx`, `cursor-follow.tsx`, plus a shared `useHorizontalPin` helper wrapping GSAP ScrollTrigger.
- `gsap` is already installed; adds `sonner`-based toast and a shadcn `dialog`. `tweakpane` is dropped — it is a developer tuning GUI and its code is stripped from the Skills component.
- All pinned ScrollTriggers are created in a single `gsap.context` per section and reverted on unmount, with `ScrollTrigger.refresh()` on resize; matchMedia gates every pin to `min-width: 768px` and `prefers-reduced-motion: no-preference`.
- Colours, fonts and spacing come from existing tokens in `src/styles.css` and `src/lib/accents.ts` — sample components' hardcoded hexes are replaced.
- The resume snapshot is a first-page render of `public/resume.pdf` stored as an asset.
- Section ids (hero, about, journey, skills, projects, certifications, resume, contact) and the fullscreen menu's scroll targets are preserved throughout.
