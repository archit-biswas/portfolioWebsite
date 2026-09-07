import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";
import { useParallax } from "@/hooks/use-parallax";

import portraitAsset from "@/assets/portrait.png.asset.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * About as a pinned deck of full-screen cards. On desktop the section sticks
 * to the viewport while each card flips up (rotateX) to reveal the next;
 * after the last flip the page scrolls on. On phones and under reduced
 * motion the same content reads as a plain vertical stack.
 */
export function AboutPanels() {
  const { bio, bioSecondary, statement, values } = portfolio.about;
  const portraitRef = useParallax<HTMLImageElement>(0.18);
  const containerRef = useRef<HTMLDivElement>(null);

  const panels = [
    {
      label: "01",
      headline: values[0]?.label ?? "Full-Stack Ownership",
      body: bio,
      tint: "--cat-violet",
      portrait: true,
    },
    {
      label: "02",
      headline: values[1]?.label ?? "Applied AI & Machine Learning",
      body: bioSecondary,
      tint: "--cat-ember",
      portrait: false,
    },
    {
      label: "03",
      headline: values[2]?.label ?? "Clean Systems Thinking",
      body: statement,
      tint: "--cat-aqua",
      portrait: false,
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          const cards = gsap.utils.toArray<HTMLElement>("[data-flip-card]", container);
          if (cards.length < 2) return;

          // stack: first card on top
          cards.forEach((card, i) => {
            gsap.set(card, {
              position: "absolute",
              inset: 0,
              zIndex: cards.length - i,
            });
          });

          // only cards 01–03 fly out; the last card stays fixed
          const flippable = cards.slice(0, -1);

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: container,
              start: "top top",
              // +35% tail so the final card is fully revealed and held
              // before the pin releases into the next section.
              end: () => `+=${flippable.length * 90 + 35}%`,
              pin: true,
              scrub: 1.25,
              anticipatePin: 1,
              snap: {
                snapTo: (progress: number) => {
                  const steps = flippable.length;
                  const total = steps + 0.35;
                  const points = Array.from({ length: steps + 1 }, (_, i) => (i * 1) / total);
                  points.push(1);
                  return gsap.utils.snap(points)(progress);
                },
                duration: { min: 0.15, max: 0.45 },
                delay: 0.08,
                ease: "power2.out",
              },
              invalidateOnRefresh: true,
            },
          });

          flippable.forEach((card) => {
            tl.to(card, {
              xPercent: 130,
              yPercent: -130,
              rotation: 14,
              opacity: 0,
              duration: 1,
              ease: "power1.in",
            });
          });

          // hold on the fully revealed last card before release
          tl.to({}, { duration: 0.35 });
        }, container);

        return () => ctx.revert();
      },
    );

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      mm.revert();
    };
  }, []);

  return (
    <div className="relative">
      <div ref={containerRef} className="relative md:h-screen">
        <div className="flex h-full flex-col gap-6 md:block md:[perspective:1600px]">
        {panels.map((panel) => (
          <section
            key={panel.label}
            data-flip-card
            className="flex flex-col justify-center gap-8 rounded-3xl border border-border p-8 will-change-transform md:-ml-[7%] md:mr-6 md:mt-6 md:mb-6 md:p-12"
            style={{
              background: `color-mix(in oklab, var(${panel.tint}) 8%, var(--card))`,
            }}
          >
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              {panel.label}
            </p>
            <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
              {panel.portrait && (
                <img
                  ref={portraitRef}
                  src={portraitAsset.url}
                  alt="Archit Biswas, Full-Stack Software Engineer and GenAI/LLM Developer based in Mumbai, India"
                  loading="lazy"
                  width={214}
                  height={214}
                  className="size-[214px] shrink-0 rounded-2xl border border-border object-cover"
                />
              )}
              <div className="min-w-0">
                <h3
                  className="font-display text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight"
                  style={{ color: `var(${panel.tint})` }}
                >
                  {panel.headline}
                </h3>
                <p className="mt-6 max-w-[62ch] font-fira text-lg leading-[1.6] text-foreground">
                  {panel.body}
                </p>
              </div>
            </div>
          </section>
        ))}

        {/* final card: the three compact value tiles */}
        <section
          data-flip-card
          className="flex flex-col justify-center gap-6 rounded-3xl p-8 will-change-transform md:-ml-[7%] md:mr-6 md:mt-6 md:mb-6 md:p-12"
        >
          <p className="font-mono text-xs font-semibold tracking-[0.18em] text-muted-foreground">
            04
          </p>
          <ul className="grid gap-4 sm:grid-cols-3">
            {values.map((v) => (
              <li key={v.label} className="rounded-2xl border border-border bg-background p-4">
                <h3 className="font-display text-base font-semibold text-foreground">{v.label}</h3>
                <p className="mt-1.5 text-sm leading-[1.6] text-muted-foreground">{v.text}</p>
              </li>
            ))}
          </ul>
        </section>
        </div>
      </div>
    </div>
  );
}
