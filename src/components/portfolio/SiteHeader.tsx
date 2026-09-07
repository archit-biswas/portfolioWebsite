import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolio, sections } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { KineticNav } from "./KineticNav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("about");
  const [heroVisible, setHeroVisible] = useState(true);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("hero");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setHeroVisible(Boolean(entries[0]?.isIntersecting)),
      { rootMargin: "-20% 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) setActive(id);
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io?.disconnect());
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-[95] px-4 pt-4 sm:px-8">
      {open ? (
        <div className="pointer-events-none flex justify-end">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/60 shadow-lg shadow-foreground/5 backdrop-blur-xl backdrop-saturate-[1.7] transition-colors hover:bg-accent"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
      ) : (
        <div
          className={cn(
            "pointer-events-auto mx-auto flex w-full max-w-3xl items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-background/60 px-4 shadow-lg shadow-foreground/5 backdrop-blur-xl backdrop-saturate-[1.7] transition-all duration-300 ease-out sm:px-6",
            condensed ? "h-12" : "h-16",
            heroVisible &&
              "pointer-events-none -translate-y-4 opacity-0 border-transparent shadow-none",
          )}
        >
          <a
            href="#hero"
            aria-hidden={heroVisible}
            tabIndex={heroVisible ? -1 : undefined}
            className={cn(
              "font-display text-[1.1rem] font-semibold tracking-tight text-foreground transition-all duration-300",
              heroVisible ? "pointer-events-none invisible opacity-0" : "opacity-100",
            )}
          >
            {portfolio.about.name}
          </a>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div className="relative">
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={false}
                onClick={() => setOpen(true)}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 text-[0.9375rem] font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Menu aria-hidden="true" className="size-5" />
                <span className="hidden sm:inline">Menu</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <KineticNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
