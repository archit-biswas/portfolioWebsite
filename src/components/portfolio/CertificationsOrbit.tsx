import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { accentVars } from "@/lib/accents";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Off-focus presentation for both rows. Off-focus items are fully hidden. */
const SIDE_SCALE = 0.68;
/** Fraction of one step over which an item fades in/out around focus. */
const FADE_SPAN = 0.75;

/**
 * Certifications as a pinned horizontal roll: each screenshot sits directly
 * above its title and both share the same horizontal path, so they stay
 * centred on each other the whole way through. Both rows are driven by a
 * single scrubbed ScrollTrigger. Items sweep in from the right and out to
 * the left, matching the Journey rail, and only the item at the focus point
 * is visible at all.
 *
 * Phones and prefers-reduced-motion get a centred stacked list instead.
 */
export function CertificationsOrbit() {
  const items = portfolio.certifications;
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLLIElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [dims, setDims] = useState({ outer: 520, card: 300 });

  // Size the path and the screenshot width from the actual viewport width.
  useLayoutEffect(() => {
    const measure = () => {
      const w = stageRef.current?.offsetWidth ?? window.innerWidth;
      if (!w) return;
      const outer = Math.min(w * 0.46, 620);
      setDims({
        outer,
        // Max screenshot width. Height follows the image's own aspect ratio
        // and is separately capped in the render so tall images still fit.
        card: Math.max(220, Math.min(w * 0.22, 340)),
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage || typeof window === "undefined") return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const step = 360 / items.length;
        const snapPoints = items.map((_, i) => i / (items.length - 1));
        const state = { rotation: 0 };

        const place = () => {
          const apply = (nodes: (HTMLLIElement | null)[], radius: number) => {
            nodes.forEach((node, i) => {
              if (!node) return;
              const a = i * step + state.rotation;
              const rad = (a * Math.PI) / 180;
              // Angular distance from the focus point, in degrees (0..180).
              const dist = Math.abs(((((a + 180) % 360) + 360) % 360) - 180);
              // Hard cutoff: only the item at focus is visible at all.
              const k = gsap.utils.clamp(0, 1, 1 - dist / (step * FADE_SPAN));
              gsap.set(node, {
                // Horizontal sweep: right -> centre -> left.
                x: Math.sin(rad) * radius,
                y: 0,
                scale: SIDE_SCALE + (1 - SIDE_SCALE) * k,
                opacity: k,
                visibility: k <= 0.01 ? "hidden" : "visible",
                zIndex: Math.round(k * 100),
              });
            });
          };
          // Same radius for both rows keeps each image centred over its title.
          apply(titleRefs.current, dims.outer);
          apply(badgeRefs.current, dims.outer);
        };

        place();

        gsap.to(state, {
          rotation: () => -step * (items.length - 1),
          ease: "none",
          onUpdate: place,
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: `+=${items.length * 520}`,
            pin: stage,
            pinSpacing: true,
            scrub: 1.3,
            snap: {
              snapTo: (p: number) => gsap.utils.snap(snapPoints)(p),
              duration: { min: 0.2, max: 0.5 },
              delay: 0.08,
              ease: "power2.out",
            },
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: place,
            onUpdate: (self) => {
              setActive(
                Math.min(items.length - 1, Math.round(self.progress * (items.length - 1))),
              );
            },
          },
        });
      }, container);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [items.length, dims.outer]);

  const activeItem = items[active]!;
  const activeAccent = accentVars[active % accentVars.length]!;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Horizontal roll (desktop), full-bleed and exactly one viewport tall */}
      <div
        ref={stageRef}
        aria-hidden="true"
        className="relative left-1/2 hidden h-screen w-screen -translate-x-1/2 overflow-hidden md:block"
      >
        {/* upper row: screenshot panels, centred above the titles */}
        <ul className="pointer-events-none absolute left-1/2 top-[24%] h-0 w-0">
          {items.map((c, i) => {
            const accent = accentVars[i % accentVars.length]!;
            return (
              <li
                key={`badge-${c.name}`}
                ref={(el) => {
                  badgeRefs.current[i] = el;
                }}
                className="absolute w-max -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border p-1.5 shadow-lg"
                style={{
                  background: `color-mix(in oklab, var(${accent}) 12%, var(--card))`,
                  borderColor: `color-mix(in oklab, var(${accent}) 40%, transparent)`,
                }}
              >
                {c.image && (
                  <div
                    className="flex items-center justify-center overflow-hidden rounded-xl"
                    style={{ width: `min(${dims.card}px, 36vh)`, aspectRatio: "1.42" }}
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="block max-h-full max-w-full rounded-xl object-contain"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* lower row: certification titles */}
        <ul className="pointer-events-none absolute left-1/2 top-[62%] h-0 w-0">
          {items.map((c, i) => (
            <li
              key={`title-${c.name}`}
              ref={(el) => {
                titleRefs.current[i] = el;
              }}
              className="absolute w-[min(42rem,78vw)] -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <span
                className="font-display text-2xl font-semibold leading-tight lg:text-3xl"
                style={{ color: `var(${accentVars[i % accentVars.length]})` }}
              >
                {c.name}
              </span>
            </li>
          ))}
        </ul>

        {/* focused details, centred beneath the titles */}
        <div className="absolute inset-x-0 bottom-[8%] flex justify-center px-4">
          <div key={activeItem.name} className="animate-fade-in w-full max-w-2xl text-center">
            <p className="text-base font-medium text-muted-foreground">
              {activeItem.issuer} ·{" "}
              <span className="font-mono text-[0.9375rem]">{activeItem.date}</span>
            </p>
            {activeItem.description && (
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground/80">
                {activeItem.description}
              </p>
            )}
            <a
              href={activeItem.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto mt-4 inline-flex items-center gap-2 text-base font-medium underline-offset-4 hover:underline"
              style={{ color: `var(${activeAccent})` }}
            >
              Verify credential <ExternalLink aria-hidden="true" className="size-[1.125rem]" />
            </a>
          </div>
        </div>
      </div>

      {/* Screen-reader summary for the animated desktop view. */}
      <p className="sr-only hidden md:block">
        {items.map((c) => `${c.name}, ${c.issuer}, ${c.date}.`).join(" ")}
      </p>

      {/* Mobile and reduced motion: centred stacked list, image above the name */}
      <ul className="grid gap-5 px-4 md:hidden">
        {items.map((c, i) => {
          const accent = accentVars[i % accentVars.length]!;
          return (
            <li
              key={c.name + c.date}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-6 text-center"
            >
              {c.image && (
                <div
                  className="flex aspect-[1.42] w-full max-w-[34rem] items-center justify-center overflow-hidden rounded-xl border p-1.5 shadow-md"
                  style={{
                    background: `color-mix(in oklab, var(${accent}) 12%, var(--card))`,
                    borderColor: `color-mix(in oklab, var(${accent}) 40%, transparent)`,
                  }}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    className="block max-h-full max-w-full rounded-lg object-contain"
                  />
                </div>
              )}
              <h3 className="mt-1 font-display text-xl font-semibold text-foreground">{c.name}</h3>
              <p className="text-base font-medium text-muted-foreground">
                {c.issuer} · <span className="font-mono text-[0.9375rem]">{c.date}</span>
              </p>
              {c.description && (
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground/80">
                  {c.description}
                </p>
              )}
              <a
                href={c.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-base font-medium text-primary underline-offset-4 hover:underline"
              >
                Verify credential <ExternalLink aria-hidden="true" className="size-[1.125rem]" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}