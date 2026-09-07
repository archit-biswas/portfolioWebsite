import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Download, FileText, X } from "lucide-react";
import { portfolio } from "@/data/portfolio";

/** Lazily create a body-level host layer so the thumbnail escapes any
 * transformed / overflow-hidden ancestor (e.g. the hero's animate-hero-rise). */
function useThumbHost() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => {
    let el = document.querySelector<HTMLElement>("[data-resume-thumb-layer]");
    if (!el) {
      el = document.createElement("div");
      el.setAttribute("data-resume-thumb-layer", "");
      el.style.cssText =
        "position:fixed;inset:0;pointer-events:none;z-index:110;overflow:visible";
      document.body.appendChild(el);
    }
    setHost(el);
  }, []);
  return host;
}

/**
 * Small first-page snapshot that trails the cursor while `active`.
 * Portalled into a fixed body-level layer; hidden below md and for reduced motion.
 */
export function ResumeHoverThumb({ active }: { active: boolean }) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const host = useThumbHost();

  useEffect(() => {
    if (!active) return;
    const el = thumbRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX + 14}px, ${e.clientY - 16}px, 0)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [active, host]);

  if (!active || !host) return null;
  return createPortal(
    <div
      ref={thumbRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 hidden w-40 overflow-hidden rounded-lg border border-border bg-card shadow-xl md:block motion-reduce:hidden"
    >
      <img src="/resume-preview.jpg" alt="" width={160} height={207} className="block w-full" />
    </div>,
    host,
  );
}


/**
 * "View PDF" trigger: hovering shows a small first-page snapshot trailing the
 * cursor; clicking opens a large preview with a download control inside.
 */
export function ResumeViewer() {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="group inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-border bg-card px-5 text-[0.9375rem] font-semibold tracking-[0.01em] text-foreground shadow-md transition-all duration-200 ease-in-out hover:scale-[1.02] hover:border-violet/60 hover:bg-accent hover:shadow-lg"
      >
        <FileText
          aria-hidden="true"
          className="size-4 text-violet transition-transform duration-200 group-hover:translate-y-0.5"
        />{" "}
        View PDF
      </button>

      <ResumeHoverThumb active={hovering} />

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close resume preview"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
              <p className="font-display text-base font-semibold text-foreground">
                {portfolio.about.name} — Resume
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={portfolio.resume.url}
                  download
                  className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  <Download aria-hidden="true" className="size-4" /> Download
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>
            <object
              data={portfolio.resume.url}
              type="application/pdf"
              aria-label="Resume document"
              className="hidden h-[75vh] w-full sm:block"
            >
              <img src="/resume-preview.jpg" alt="First page of the resume" className="w-full" />
            </object>
            <img
              src="/resume-preview.jpg"
              alt="First page of the resume"
              className="w-full sm:hidden"
            />
          </div>
        </div>
      )}
    </>
  );
}
