import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

import { sections } from "@/data/portfolio";
import "./kinetic-nav.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const shapePalette = [
  "var(--cat-violet)",
  "var(--cat-rose)",
  "var(--cat-ember)",
  "var(--cat-aqua)",
  "var(--cat-signal)",
  "var(--cat-lime)",
  "var(--cat-violet)",
];

function tint(color: string, pct: number) {
  return `color-mix(in oklab, ${color} ${pct}%, transparent)`;
}

export function KineticNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const firstRun = useRef(true);

  useEffect(() => {
    try {
      if (!gsap.parseEase("kn-main")) {
        CustomEase.create("kn-main", "0.65, 0.01, 0.05, 0.99");
      }
    } catch {
      /* CustomEase unavailable — GSAP defaults apply */
    }
  }, []);

  // Hover shape reveals
  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll<HTMLElement>(".kn-item[data-shape]");
      const shapesContainer = root.querySelector(".kn-shapes");
      const cleanups: Array<() => void> = [];

      items.forEach((item) => {
        const index = item.getAttribute("data-shape");
        const shape = shapesContainer?.querySelector(`.kn-shape-${index}`);
        if (!shape) return;
        const shapeEls = shape.querySelectorAll(".kn-shape-element");

        const onEnter = () => {
          shapesContainer
            ?.querySelectorAll(".kn-shape")
            .forEach((s) => s.classList.remove("kn-active"));
          shape.classList.add("kn-active");
          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.7)",
              overwrite: "auto",
              transformOrigin: "50% 50%",
            },
          );
        };
        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
            onComplete: () => shape.classList.remove("kn-active"),
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // Open / close timeline
  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const wrap = root.querySelector(".kn-wrapper");
    const menu = root.querySelector(".kn-menu");
    const overlay = root.querySelector(".kn-overlay");
    const panels = root.querySelectorAll(".kn-backdrop-layer");
    const links = root.querySelectorAll(".kn-link");
    const fadeTargets = root.querySelectorAll("[data-menu-fade]");

    if (firstRun.current && !open) {
      firstRun.current = false;
      gsap.set(wrap, { display: "none" });
      return;
    }
    firstRun.current = false;

    const ease = reduce ? "none" : "kn-main";
    const duration = reduce ? 0.001 : 0.7;
    const tl = gsap.timeline({ defaults: { ease, duration } });

    if (open) {
      wrap?.setAttribute("data-nav", "open");
      tl.set(wrap, { display: "block" })
        .set(menu, { xPercent: 0 }, "<")
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
        .fromTo(
          panels,
          { xPercent: 101 },
          { xPercent: 0, stagger: reduce ? 0 : 0.12, duration: reduce ? 0.001 : 0.575 },
          "<",
        )
        .fromTo(
          links,
          { yPercent: 140, rotate: 10 },
          { yPercent: 0, rotate: 0, stagger: reduce ? 0 : 0.05 },
          reduce ? "<" : "<+=0.35",
        );
      if (fadeTargets.length) {
        tl.fromTo(
          fadeTargets,
          { autoAlpha: 0, yPercent: 50 },
          { autoAlpha: 1, yPercent: 0, stagger: reduce ? 0 : 0.04, clearProps: "all" },
          reduce ? "<" : "<+=0.2",
        );
      }
    } else {
      wrap?.setAttribute("data-nav", "closed");
      tl.to(overlay, { autoAlpha: 0 })
        .to(menu, { xPercent: 120 }, "<")
        .set(wrap, { display: "none" });
    }

    return () => {
      tl.kill();
    };
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  if (!mounted) return null;

  return createPortal(
    <div ref={containerRef}>
      <div data-nav="closed" className="kn-wrapper" aria-hidden={!open}>
        <div className="kn-overlay" onClick={onClose} />
        <nav className="kn-menu" aria-label="Site sections">
          <div className="kn-bg" aria-hidden="true">
            <div className="kn-backdrop-layer kn-first" />
            <div className="kn-backdrop-layer kn-second" />
            <div className="kn-backdrop-layer" />
            <div className="kn-shapes">
              {shapePalette.map((color, i) => (
                <svg
                  key={i}
                  className={`kn-shape kn-shape-${i + 1}`}
                  viewBox="0 0 400 400"
                  preserveAspectRatio="xMidYMid slice"
                  fill="none"
                >
                  <circle className="kn-shape-element" cx="80" cy="120" r="40" fill={tint(color, 18)} />
                  <circle className="kn-shape-element" cx="300" cy="80" r="60" fill={tint(color, 14)} />
                  <circle className="kn-shape-element" cx="200" cy="300" r="80" fill={tint(color, 12)} />
                  <circle className="kn-shape-element" cx="350" cy="290" r="30" fill={tint(color, 20)} />
                  <path
                    className="kn-shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke={tint(color, 14)}
                    strokeWidth="50"
                    fill="none"
                  />
                </svg>
              ))}
            </div>
          </div>

          <div className="kn-inner">
            <ul className="kn-list">
              {sections.map((s, i) => (
                <li key={s.id} className="kn-item" data-shape={i + 1}>
                  <a href={`#${s.id}`} className="kn-link" onClick={goTo(s.id)}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

          </div>
        </nav>
      </div>
    </div>,
    document.body,
  );
}
