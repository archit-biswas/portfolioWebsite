import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ExternalLink } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { accentVars } from "@/lib/accents";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Off-focus presentation for both rings. Off-focus items are fully hidden. */
const SIDE_SCALE = 0.68;
/** Fraction of one step over which an item fades in/out around focus. */
const FADE_SPAN = 0.75;

/**
 * Certifications as a pinned "circular split roll": titles travel around one
 * circular path while accent badge panels travel around a second one, both
 * driven by a single scrubbed ScrollTrigger. Motion is horizontal — items
 * sweep in from the right and out to the left, matching the Journey rail —
 * and only the item at the focus point is visible at all.
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
  const [dims, setDims] = useState({ outer: 520, inner: 300, card: 150 });

  // Size both rings from the actual viewport width.
  useLayoutEffect(() => {
    const measure = () => {
      const w = stageRef.current?.offsetWidth ?? window.innerWidth;
      if (!w) return;
      const outer = Math.min(w * 0.46, 620);
      setDims({
        outer,
        inner: outer * 0.62,
        card: Math.max(120, Math.min(w * 0.12, 176)),
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
          apply(titleRefs.current, dims.outer);
          apply(badgeRefs.current, dims.inner);
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
  }, [items.length, dims.outer, dims.inner]);

  const activeItem = items[active]!;
  const activeAccent = accentVars[active % accentVars.length]!;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Circular split roll (desktop), full-bleed and exactly one viewport tall */}
      <div
        ref={stageRef}
        aria-hidden="true"
        className="relative left-1/2 hidden h-screen w-screen -translate-x-1/2 overflow-hidden md:block"
      >
        {/* upper path: accent badge panels */}
        <ul className="pointer-events-none absolute left-1/2 top-[34%] h-0 w-0">
          {items.map((c, i) => {
            const accent = accentVars[i % accentVars.length]!;
            return (
              <li
                key={`badge-${c.name}`}
                ref={(el) => {
                  badgeRefs.current[i] = el;
                }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border text-center"
                style={{
                  width: dims.card,
                  height: dims.card,
                  background: `color-mix(in oklab, var(${accent}) 12%, var(--card))`,
                  borderColor: `color-mix(in oklab, var(${accent}) 32%, transparent)`,
                }}
              >
                <Award className="size-9" style={{ color: `var(${accent})` }} />
              </li>
            );
          })}
        </ul>

        {/* lower path: certification titles */}
        <ul className="pointer-events-none absolute left-1/2 top-[58%] h-0 w-0">
          {items.map((c, i) => (
            <li
              key={`title-${c.name}`}
              ref={(el) => {
                titleRefs.current[i] = el;
              }}
              className="absolute w-[min(28rem,60vw)] -translate-x-1/2 -translate-y-1/2 text-center"
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

        {/* focused details, centred beneath the rings */}
        <div className="absolute inset-x-0 bottom-[12%] flex justify-center px-6">
          <div key={activeItem.name} className="animate-fade-in text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {activeItem.issuer} ·{" "}
              <span className="font-mono text-[0.8125rem]">{activeItem.date}</span>
            </p>
            <a
              href={activeItem.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto mt-3 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
              style={{ color: `var(${activeAccent})` }}
            >
              Verify credential <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Screen-reader summary for the animated desktop view. */}
      <p className="sr-only hidden md:block">
        {items.map((c) => `${c.name} — ${c.issuer}, ${c.date}.`).join(" ")}
      </p>

      {/* Mobile and reduced motion: centred stacked list */}
      <ul className="grid gap-4 px-8 md:hidden">
        {items.map((c, i) => (
          <li
            key={c.name + c.date}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center"
          >
            <Award
              aria-hidden="true"
              className="size-7"
              style={{ color: `var(${accentVars[i % accentVars.length]})` }}
            />
            <h3 className="font-display text-lg font-semibold text-foreground">{c.name}</h3>
            <p className="text-sm font-medium text-muted-foreground">
              {c.issuer} · <span className="font-mono text-[0.8125rem]">{c.date}</span>
            </p>
            <a
              href={c.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Verify credential <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
