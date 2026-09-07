import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scrubs an element from small/faded to full scale as it travels toward the
 * viewport centre, then back out again. Desktop + no-reduced-motion only.
 */
export function useScrollZoom<T extends HTMLElement = HTMLDivElement>(from = 0.9) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { scale: from, opacity: 0.55 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "center 55%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [from]);

  return ref;
}
