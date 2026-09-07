import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";
import { accentForCategory, chipStyle } from "@/lib/accents";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const supportsScrollTimeline = () =>
  typeof CSS !== "undefined" &&
  typeof CSS.supports === "function" &&
  CSS.supports("animation-timeline: view()");

/**
 * Skills as a scroll-driven focus list: a sticky "I work with" line stays
 * centred in the viewport while the categories scroll past it, each one
 * lighting up in its own hue as it reaches the centre and dimming again.
 *
 * Primary path is a native CSS view() scroll timeline (see styles.css);
 * a GSAP ScrollTrigger scrub is used only where that isn't supported.
 * Phones and prefers-reduced-motion get a static, fully legible list.
 */
export function SkillsScroll() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>("[data-skill-row]", root);
        if (items.length < 2) return;

        const snapPoints = items.map((_, i) => i / (items.length - 1));
        const common = {
          trigger: items[0]!,
          endTrigger: items[items.length - 1]!,
          start: "center center",
          end: "center center",
          invalidateOnRefresh: true,
          snap: {
            snapTo: (p: number) => gsap.utils.snap(snapPoints)(p),
            duration: { min: 0.15, max: 0.4 },
            delay: 0.05,
            ease: "power2.out",
          },
        } as const;

        if (supportsScrollTimeline()) {
          // CSS drives the dimming; this trigger only supplies the snap.
          ScrollTrigger.create({ ...common });
          return;
        }

        gsap.set(items, { opacity: (i: number) => (i === 0 ? 1 : 0.2) });
        const dimmer = gsap
          .timeline()
          .to(items.slice(1), { opacity: 1, stagger: 0.5 })
          .to(items.slice(0, items.length - 1), { opacity: 0.2, stagger: 0.5 }, 0);

        ScrollTrigger.create({
          ...common,
          animation: dimmer,
          scrub: 0.35,
        });
      }, root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);


  const readableList = portfolio.skills
    .map((group) => `${group.category}: ${group.items.map((s) => s.name).join(", ")}`)
    .join(". ");

  return (
    <div ref={rootRef}>
      <p className="max-w-[70ch] font-andika text-base leading-[1.6] text-muted-foreground">
        {portfolio.skillsIntro}
      </p>

      {/* Screen-reader version of the animated list. */}
      <p className="sr-only">I work with {readableList}.</p>

      <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-14">
        <p
          aria-hidden="true"
          className="font-story text-[clamp(1.6rem,2vw+1rem,2.4rem)] leading-[1.15] text-muted-foreground md:sticky md:top-1/2 md:h-fit md:-translate-y-1/2 md:self-start"
        >
          I work with
        </p>

        <ul
          aria-hidden="true"
          className="flex flex-col gap-8 md:gap-8"
        >
          {portfolio.skills.map((group) => {
            const accent = accentForCategory(group.category);
            return (
              <li
                key={group.category}
                data-skill-row
                className="min-w-0"
              >

                <h3
                  className="font-display text-[clamp(1.75rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight"
                  style={{ color: `var(${accent})` }}
                >
                  {group.category}.
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill.name}
                      style={chipStyle(accent)}
                      className="rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold tracking-[0.02em]"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
