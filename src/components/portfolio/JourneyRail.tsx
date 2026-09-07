import { GraduationCap, Briefcase } from "lucide-react";
import { useHorizontalPin } from "@/hooks/use-horizontal-pin";
import { portfolio } from "@/data/portfolio";

type JourneyItem = (typeof portfolio.journey)[number];

const iconFor = (item: JourneyItem) => (item.type === "education" ? GraduationCap : Briefcase);
const accentFor = (item: JourneyItem) =>
  item.type === "education" ? "--cat-signal" : "--cat-ember";

function ItemBody({ item, index }: { item: JourneyItem; index: number }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[0.8125rem] font-semibold tracking-[0.12em] text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-2 font-display text-3xl font-semibold leading-[1.2] text-foreground">
        {item.role}
      </h3>
      <p className="mt-1 text-lg font-medium tracking-[0.01em] text-muted-foreground">
        {item.org}
      </p>
      <p className="mt-1 font-mono text-[0.75rem] tracking-[0.08em] text-muted-foreground">
        {item.location.toUpperCase()} · {item.start} — {item.end}
      </p>
      {item.achievements.length > 0 && (
        <ul className="mt-4 space-y-2">
          {item.achievements.map((a) => (
            <li key={a} className="font-andika text-sm leading-[1.6] text-muted-foreground">
              — {a}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Static stack used on mobile and for prefers-reduced-motion. */
function StaticStack({ items }: { items: JourneyItem[] }) {
  return (
    <div className="flex flex-col gap-6 px-6">
      {items.map((item, i) => (
        <article
          key={`${item.org}-${item.start}`}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <ItemBody item={item} index={i} />
        </article>
      ))}
    </div>
  );
}

/**
 * Journey milestones on a pinned horizontal rail. As the page scrolls down,
 * cards travel right-to-left across the viewport; each card brightens and
 * scales up as it reaches the centre and stays lit once passed — the final
 * card remains fully bright when the section releases.
 */
export function JourneyRail() {
  const items = portfolio.journey as JourneyItem[];
  const { containerRef, trackRef } = useHorizontalPin<HTMLDivElement>({
    snap: true,
    dimOut: false,
  });

  return (
    <div className="relative w-full overflow-x-clip">
      {/* mobile / reduced-motion fallback */}
      <div className="md:hidden">
        <StaticStack items={items} />
      </div>

      <div ref={containerRef} className="relative hidden md:block">
        <div className="flex h-screen items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 will-change-transform"
          >
            {items.map((item, i) => {
              const Icon = iconFor(item);
              const accent = accentFor(item);
              return (
                <article
                  key={`${item.org}-${item.start}`}
                  data-panel
                  className="relative flex w-[min(34rem,72vw)] shrink-0 flex-col justify-between rounded-[1.75rem] border p-8"
                  style={{
                    background: `color-mix(in oklab, var(${accent}) 10%, var(--card))`,
                    borderColor: `color-mix(in oklab, var(${accent}) 30%, transparent)`,
                  }}
                >
                  <ItemBody item={item} index={i} />
                  <div
                    aria-hidden="true"
                    className="mt-6 flex items-center justify-between"
                  >
                    <span
                      className="h-[3px] w-16 rounded-full"
                      style={{ background: `var(${accent})` }}
                    />
                    <Icon className="size-10" style={{ color: `var(${accent})` }} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
