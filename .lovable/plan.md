# Projects rail sizing, pin/scrub tuning, and a circular Certifications roll

## 1. Projects section

**Rail length halved, density unchanged.** Ticks stay at `results.length * 10` with the same `SUB = 10` band grouping. Only the per-tick geometry shrinks: `TICK` 6 → 3 and `GAP` 3 → 1.5, so `PITCH` goes 9 → 4.5 and the column's total height (`total * PITCH`) is exactly half of what it is now. The falloff radius `R = PITCH * 10` scales with it automatically, so the crest still spans the same number of ticks.

**Tick width reverted, then adjusted.** The very first rail version used base width 18px and peak 52px (18 + 34). Those are restored and the standing 5%/7% rule is layered on:
- resting `BASE_W = 18 * 0.95 = 17.1`
- crest `PEAK_W = 52 * 1.07 = 55.64`

**Card follows the crest.** The featured card gets a vertical offset equal to the active band's centre on the rail (`bandCenterTick(selected) * PITCH`, minus half the card height, clamped so it never runs off the top or past the rail's bottom). Animated with the same spring used by the ticks, instant when `prefers-reduced-motion`.

**Card proportions.** Width down ~5% (`lg:w-[95%]`, left-aligned in its column) and minimum height up ~5% (`min-h-[16rem]` → `min-h-[16.8rem]`), so it reads narrower and taller.

## 2. Pin sizing, snap, and scrub latency

**Skills — full-viewport pin.** The skills block gets a real pinned wrapper: an `h-screen` flex container that fills exactly 100% of the viewport while the list scrolls through it, replacing today's tall-padding (`md:py-[45vh]`) approach.

**Skills — snap.** Scroll-snap so each category settles in the centre instead of drifting: CSS `scroll-snap-type: y mandatory` on the pinned viewport with `scroll-snap-align: center` per row on the native path, and GSAP `snap` at `1 / (items.length - 1)` (duration 0.15–0.4, `power2.out`) on the ScrollTrigger fallback path.

**Scrub deltas** (seconds, small deliberate increases):

| Section | Now | New |
| --- | --- | --- |
| Skills (GSAP fallback) | 0.2 | 0.35 |
| Journey (`use-horizontal-pin`) | 1 | 1.25 |
| About | 1 | 1.25 |
| Certifications | 1 | 1.3 |

Journey and About share `use-horizontal-pin`; About sets its own scrub, so both land at 1.25 without diverging behaviour. Per-panel `scrub: true` sub-triggers inside the pin hook stay as they are — they are position-linked, not latency-driven.

## 3. Certifications — centred, circular split roll

**Centring.** The left/right two-column grid is dropped. Everything sits on a single centred axis: titles centre-aligned, the badge panel horizontally centred, and the mobile stacked list becomes centred cards (icon, name, issuer · date, then the "Verify credential" link centred beneath) instead of the current left-text/right-link row.

**Two circular paths, one timeline.** Inside the existing pinned `h-screen` container, two concentric rings share a single GSAP timeline on the existing ScrollTrigger — no second trigger:

```text
        ┌──────── section (pinned, h-screen) ────────┐
        │            ○ ○                              │
        │        ○   [ badge ]   ○      inner ring    │
        │      ○   ·  FOCUS  ·     ○    (badge panels)│
        │        ○    Title      ○      outer ring    │
        │            ○ ○                (title text)  │
        └─────────────────────────────────────────────┘
```

- Outer ring carries the certification names, inner ring carries an accent-coloured badge panel per certification (existing `Award` icon + `accentVars` cycling).
- Both rings are children of the same rotation tween, so a title and its badge always reach the focus point at the centre together.
- Focus point is the top-centre of each ring; the focused pair is full scale/opacity, everything else drops to `textSideScale 0.68` / `textSideOpacity 0.18` (kept as component-level constants so they stay tunable).

**Sizing, responsive.** Radii derive from the measured container instead of the reference's fixed 500px/205px:
- outer (title) radius `= min(container width * 0.42, 26rem)`
- inner (badge) radius `= outer * 0.55`
- badge size `= clamp(7.5rem, 14vw, 11.5rem)`

Measured on mount and on `ScrollTrigger.refresh`, so the rings never overflow the section's container.

**Details stay.** Issuer, date, and the "Verify credential" link render on the focused badge panel, centred, exactly as they do today on the active card.

**Fallbacks.** Below 768px and under `prefers-reduced-motion`, no circular motion at all — the existing stacked list renders, now centred.

**Tokens.** All colours from `--card`, `--border`, `--foreground`, `--muted-foreground`, and the `--cat-*` accent variables. No new dependencies.

## Files to change

- `src/components/portfolio/ProjectsExplorer.tsx`
- `src/components/portfolio/SkillsScroll.tsx`
- `src/styles.css` (skills pin height + snap keyframe/rules)
- `src/hooks/use-horizontal-pin.ts` (scrub only)
- `src/components/portfolio/AboutPanels.tsx` (scrub only)
- `src/components/portfolio/CertificationsOrbit.tsx` (rewritten)
