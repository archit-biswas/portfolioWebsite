import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pins a section and translates an inner track horizontally with scroll.
 * Optionally scrubs each panel's scale/opacity so the panel nearest the
 * viewport centre zooms into focus.
 *
 * Desktop + no-reduced-motion only; otherwise the markup renders as a plain
 * vertical stack with no transforms applied.
 */
export function useHorizontalPin<T extends HTMLElement = HTMLDivElement>({
  panelSelector = "[data-panel]",
  zoom = true,
  snap = false,
  dimOut = true,
}: {
  panelSelector?: string;
  zoom?: boolean;
  snap?: boolean;
  /** When false, panels brighten into centre and STAY lit (no dim on exit). */
  dimOut?: boolean;
} = {}) {
  const containerRef = useRef<T>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          const panels = gsap.utils.toArray<HTMLElement>(panelSelector, track);

          // Pad the track so the FIRST panel sits centred at progress 0 and
          // the LAST panel sits centred at progress 1. Without this the rail
          // would release before the final card ever reached focus (and, on
          // the way back up, before the first card returned to focus).
          const padEdges = () => {
            const first = panels[0];
            const last = panels[panels.length - 1];
            if (!first || !last) return;
            track.style.paddingLeft = `${Math.max(0, (container.offsetWidth - first.offsetWidth) / 2)}px`;
            track.style.paddingRight = `${Math.max(0, (container.offsetWidth - last.offsetWidth) / 2)}px`;
          };
          padEdges();

          const distance = () => {
            padEdges();
            return Math.max(0, track.scrollWidth - container.offsetWidth);
          };



          const snapConfig = snap
            ? {
                snap: {
                  snapTo: (progress: number) => {
                    // Snap points: each panel centred, plus the two ends.
                    const d = distance();
                    if (d <= 0) return progress;
                    const travel = d;
                    const points = panels.map((panel) => {
                      const centre = panel.offsetLeft + panel.offsetWidth / 2 - container.offsetWidth / 2;
                      return gsap.utils.clamp(0, 1, centre / travel);
                    });
                    // include the very end so the tail hold is reachable
                    points.push(1);
                    return gsap.utils.snap(points)(progress);
                  },
                  duration: { min: 0.15, max: 0.45 },
                  delay: 0.08,
                  ease: "power2.out",
                },
              }
            : {};

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1.25,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              ...snapConfig,
            },
          });

          if (zoom) {
            panels.forEach((panel) => {
              gsap.fromTo(
                panel,
                { scale: 0.86, opacity: 0.45 },
                {
                  scale: 1,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: tween,
                    start: "left 85%",
                    end: "center 50%",
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                },
              );
              if (dimOut) {
                gsap.fromTo(
                  panel,
                  { scale: 1, opacity: 1 },
                  {
                    scale: 0.86,
                    opacity: 0.45,
                    ease: "none",
                    scrollTrigger: {
                      trigger: panel,
                      containerAnimation: tween,
                      start: "center 50%",
                      end: "right 15%",
                      scrub: true,
                      invalidateOnRefresh: true,
                    },
                  },
                );
              }
            });
          }
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
  }, [panelSelector, zoom, snap, dimOut]);

  return { containerRef, trackRef };
}
