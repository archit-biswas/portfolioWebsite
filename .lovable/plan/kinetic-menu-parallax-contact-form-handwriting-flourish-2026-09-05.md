# Kinetic menu, parallax, contact form, handwriting flourish

Four additions from your document, built as separate steps so any one can be adjusted later. Nothing about the current layout, colours, fonts or content changes.

## 1. Fullscreen animated menu (replaces the dropdown)

- The existing top bar stays exactly as it is: name, Resume, Let's Chat, theme switch and the Menu button all keep their current look and show/hide behaviour.
- Clicking Menu now opens a fullscreen panel that slides in with layered backdrops, links rising into place, and soft shapes appearing behind whichever link you hover.
- Links: About, Journey, Skills, Projects, Certifications, Resume, Contact — each smooth-scrolls to that section and closes the panel. No Blog link.
- Closes on Escape, on clicking the backdrop, and on choosing a link. Button label toggles Menu/Close.
- Shape colours are re-skinned to your existing violet / rose / ember palette instead of the pasted indigo-pink, and adapt to light and dark themes.
- The old dropdown list is removed; the small Resume / Hire Me buttons it held on phones move into the fullscreen panel so nothing is lost.

## 2. Subtle parallax

- Applies only to imagery and decorative layers: the About portrait, the floating background orbs, and project card visuals — each at a slightly different speed so it reads as depth.
- Never applied to headings, paragraphs, navigation or buttons.
- Movement stays gentle (roughly 15–25% off native scroll), disabled entirely for reduced-motion visitors and on screens under 768px.

## 3. Working contact form

- Added below the existing Get in touch button and the GitHub / LinkedIn links, which all stay.
- Fields: Name (required), Email (required, format-checked), Subject (optional), Message (required). Inline errors, hidden honeypot for bots, proper labels and screen-reader announcements.
- Button matches the existing Get in touch styling; states are idle, sending, sent, and failed-with-retry — success only shows on a genuine send.
- Delivery uses Lovable Cloud (built-in backend plus email sending), so there is no third-party account for you to create. I'll turn it on as part of this step and confirm a real test message arrives at architbiswas885@yahoo.com before calling it done.

## 4. Handwriting flourish

- A short phrase that draws itself stroke by stroke, placed once in the hero directly beneath your name so it reinforces the existing script styling without competing with the headline. Static text for reduced-motion visitors.

## Technical notes

- New files: `src/components/portfolio/KineticNav.tsx`, `src/components/portfolio/ContactForm.tsx`, `src/components/ui/handwriting-text.tsx`, a parallax hook, plus a scoped stylesheet for the menu.
- `gsap` gets installed (not currently a dependency); `CustomEase` and `ScrollTrigger` registered client-side only. All GSAP contexts and ScrollTriggers are reverted on unmount; `ScrollTrigger.refresh()` on resize.
- Menu classes are namespaced (`kn-` prefix) to avoid collisions; the pasted `:root` variables are added only as `--nav-`-prefixed tokens where the component needs them, and existing tokens in `src/styles.css` are untouched.
- Menu markup renders inside the existing header component and is SSR-safe; animation work runs in effects after hydration.
- Contact form posts through a server function; the email provider key is stored as a secret, never in code.
- Section IDs already exist for all seven targets, so no new sections are created.
