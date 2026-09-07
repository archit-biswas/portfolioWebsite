import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { portfolio, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useScrollZoom } from "@/hooks/use-scroll-zoom";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const projectDomId = (p: Project) => `project-${slug(p.name)}`;

const TICK = 3;
const GAP = 1.5;
const PITCH = TICK + GAP;
const SUB = 10;
// Original rail widths (18 base / 52 peak), with the standing
// 5%-smaller-resting / 7%-larger-crest adjustment layered on top.
const BASE_W = 18 * 0.95;
const PEAK_W = 52 * 1.07;


const skillsOf = (p: Project) => [p.language, ...p.tags].join(", ");

const openRepo = (p: Project) => window.open(p.repo, "_blank", "noopener,noreferrer");

/* ---------------- Desktop: single card with cursor-following tooltip ---------------- */

function CursorTooltip({
  project,
  x,
  y,
  visible,
}: {
  project: Project;
  x: MotionValue<number>;
  y: MotionValue<number>;
  visible: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      className="pointer-events-none absolute left-0 top-0 z-30 w-64 rounded-xl border border-border bg-card p-3 shadow-lg"
    >
      <p className="font-mono text-xs leading-[1.6] text-muted-foreground">
        {skillsOf(project)}
      </p>
      <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        <Github aria-hidden="true" className="size-4" /> Click to open the GitHub repo
      </p>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto mt-2 flex w-fit items-center gap-1.5 text-sm text-foreground underline-offset-4 hover:underline"
        >
          <ExternalLink aria-hidden="true" className="size-4" /> Live demo
        </a>
      )}
    </motion.div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const reduced = useReducedMotion() ?? false;
  const [hover, setHover] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = reduced ? { duration: 0 } : { stiffness: 300, damping: 30 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  return (
    <article
      id={projectDomId(project)}
      role="link"
      tabIndex={0}
      onClick={() => openRepo(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openRepo(project);
        }
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "touch") return;
        if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches)
          return;
        setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
      onPointerMove={(e) => {
        const box = e.currentTarget.getBoundingClientRect();
        const tw = 256;
        const th = 140;
        const nx = Math.min(Math.max(e.clientX - box.left + 16, 8), Math.max(8, box.width - tw - 8));
        const ny = Math.min(
          Math.max(e.clientY - box.top + 16, 8),
          Math.max(8, box.height - th - 8),
        );
        if (!hover) {
          rawX.jump?.(nx);
          rawY.jump?.(ny);
        }
        rawX.set(nx);
        rawY.set(ny);
      }}
      className="group relative flex min-h-[16.8rem] cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <h3 className="font-display text-2xl font-semibold leading-[1.3] text-foreground">
        {project.name}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-[1.7] text-muted-foreground">
        {project.description}
      </p>

      <a href={project.repo} tabIndex={-1} className="sr-only">
        View {project.name} on GitHub
      </a>

      <CursorTooltip project={project} x={x} y={y} visible={hover} />
    </article>
  );
}

/* ---------------- Mobile / touch: static grid with tap-to-reveal ---------------- */

function ProjectCard({ project }: { project: Project }) {
  const zoomRef = useScrollZoom<HTMLElement>();
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    const touch =
      typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
    if (touch && !revealed) {
      setRevealed(true);
      return;
    }
    openRepo(project);
  };

  return (
    <article
      ref={zoomRef}
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openRepo(project);
        }
      }}
      onFocus={() => setRevealed(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setRevealed(false);
      }}
      className="group flex cursor-pointer flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <h3 className="font-display text-lg font-semibold leading-[1.3] text-foreground">
        {project.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-[1.6] text-muted-foreground">
        {project.description}
      </p>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          revealed ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="font-mono text-xs leading-[1.6] text-muted-foreground">
            {skillsOf(project)}
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <Github aria-hidden="true" className="size-4" /> Tap again to open the GitHub repo
          </p>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 flex w-fit items-center gap-1.5 text-sm text-foreground underline-offset-4 hover:underline"
            >
              <ExternalLink aria-hidden="true" className="size-4" /> Live demo
            </a>
          )}
        </div>
      </div>

      <a href={project.repo} tabIndex={-1} className="sr-only">
        View {project.name} on GitHub
      </a>
    </article>
  );
}

/* ---------------- Rail ---------------- */

function Tick({
  index,
  pointer,
  active,
  reduced,
  project,
  onSelect,
  onFocusTick,
  tabIndex,
}: {
  index: number;
  pointer: MotionValue<number>;
  active: boolean;
  reduced: boolean;
  project: Project;
  onSelect: () => void;
  onFocusTick: () => void;
  tabIndex: number;
}) {
  const center = index * PITCH + TICK / 2;
  const R = PITCH * 10;

  const falloff = useTransform(pointer, (y) => {
    if (y < 0) return 0;
    const d = Math.min(Math.abs(y - center) / R, 1);
    return 0.5 * (1 + Math.cos(Math.PI * d));
  });

  const rawWidth = useTransform(falloff, (f) => BASE_W + f * (PEAK_W - BASE_W));
  const rawX = useTransform(falloff, (f) => f * 6);
  const width = useSpring(rawWidth, reduced ? { duration: 0 } : { stiffness: 300, damping: 30 });
  const x = useSpring(rawX, reduced ? { duration: 0 } : { stiffness: 300, damping: 30 });
  const opacity = useTransform(falloff, (f) => 0.3 + f * 0.7);

  return (
    <li className="flex justify-start" style={{ height: TICK }}>
      <motion.button
        type="button"
        tabIndex={tabIndex}
        onClick={onSelect}
        onFocus={onFocusTick}
        aria-label={`Show ${project.name}`}
        style={reduced ? { opacity: 1 } : { width, x, opacity }}
        className={cn(
          "h-[2px] self-center rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          reduced && "w-3",
          active ? "bg-primary" : "bg-foreground/50",
        )}
      />
    </li>
  );
}

function ProjectRail({
  results,
  selected,
  onSelect,
}: {
  results: Project[];
  selected: number;
  onSelect: (i: number) => void;
}) {
  const reduced = useReducedMotion() ?? false;
  const pointer = useMotionValue(-1);
  const railRef = useRef<HTMLDivElement>(null);

  const total = results.length * SUB;
  const bandOf = (i: number) => Math.min(results.length - 1, Math.floor(i / SUB));
  const bandCenterTick = (b: number) => b * SUB + Math.floor(SUB / 2);

  useMotionValueEvent(pointer, "change", (y) => {
    if (y < 0) return;
    const i = Math.max(0, Math.min(total - 1, Math.round((y - TICK / 2) / PITCH)));
    onSelect(bandOf(i));
  });

  useEffect(() => {
    if (selected > results.length - 1) onSelect(Math.max(0, results.length - 1));
  }, [results.length, selected, onSelect]);

  const focusBand = (b: number) => {
    onSelect(b);
    const el = railRef.current?.querySelectorAll<HTMLButtonElement>("button")[bandCenterTick(b)];
    el?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      focusBand(Math.min(selected + 1, results.length - 1));
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      focusBand(Math.max(selected - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      focusBand(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusBand(results.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const p = results[selected];
      if (p) openRepo(p);
    }
  };

  if (results.length === 0) return null;

  return (
    <div
      ref={railRef}
      onKeyDown={onKeyDown}
      onPointerMove={(e) => {
        const box = e.currentTarget.getBoundingClientRect();
        pointer.set(e.clientY - box.top);
      }}
      onPointerLeave={() => pointer.set(-1)}
      className="sticky top-28 hidden lg:block"
    >
      <div className="relative py-2 pr-6">
        <ul
          aria-label="Project quick navigation"
          className="flex flex-col"
          style={{ gap: GAP, height: total * PITCH }}
        >
          {Array.from({ length: total }, (_, i) => {
            const b = bandOf(i);
            const p = results[b]!;
            return (
              <Tick
                key={i}
                index={i}
                pointer={pointer}
                reduced={reduced}
                active={selected === b}
                project={p}
                tabIndex={i === bandCenterTick(selected) ? 0 : -1}
                onSelect={() => onSelect(b)}
                onFocusTick={() => onSelect(b)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}


export function ProjectsExplorer() {
  const results = useMemo(() => portfolio.projects, []);
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion() ?? false;
  const current = results[selected] ?? results[0];

  // Card tracks the active band's crest position on the rail.
  const railHeight = results.length * SUB * PITCH;
  const CARD_H = 269; // ~16.8rem
  const bandCentre = (selected * SUB + Math.floor(SUB / 2)) * PITCH;
  const targetY = Math.min(
    Math.max(0, bandCentre - CARD_H / 2),
    Math.max(0, railHeight - CARD_H),
  );
  const cardY = useSpring(targetY, reduced ? { duration: 0 } : { stiffness: 300, damping: 30 });
  useEffect(() => {
    cardY.set(targetY);
  }, [cardY, targetY]);

  return (
    <div>
      <div className="mt-4 lg:grid lg:grid-cols-[auto_1fr] lg:items-start lg:gap-2">
        <ProjectRail results={results} selected={selected} onSelect={setSelected} />

        {/* Desktop: one card at a time, driven by the rail */}
        <motion.div
          className="hidden lg:block lg:w-[95%]"
          style={{ y: reduced ? 0 : cardY }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {current && (
              <motion.div
                key={current.name + current.repo}
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut" }}
              >
                <FeaturedCard project={current} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>


        {/* Mobile / touch: full static grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {results.map((p) => (
            <ProjectCard key={p.name + p.repo} project={p} />
          ))}
        </div>
      </div>

      <a
        href={portfolio.githubProfile}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        <Github aria-hidden="true" className="size-4" /> View all repositories on GitHub
      </a>
    </div>
  );
}
