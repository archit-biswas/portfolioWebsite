import { useEffect, useRef } from "react";

/**
 * Soft radial glow that trails the cursor, scoped to the hero section.
 * Idles as a static glow under prefers-reduced-motion / on touch devices.
 */
export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parent = el.parentElement;
    if (!parent) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (!active) {
        active = true;
        cx = tx;
        cy = ty;
        el.style.opacity = "1";
      }
    };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 size-[36rem] rounded-full opacity-0 blur-3xl transition-opacity duration-500 motion-reduce:hidden"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--cat-violet) 22%, transparent) 0%, transparent 65%)",
      }}
    />
  );
}
