import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 + delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-block px-1">
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[0.05em] h-[45%] origin-left rounded-[2px] bg-highlight"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, margin: "0px 0px -10% 0px" }}
        transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut", delay: 0.3 }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  highlightTitle = true,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
  highlightTitle?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 overflow-x-clip py-20 sm:py-28"
    >
      <div className="grid w-full gap-10 px-8 lg:grid-cols-[220px_1fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            {eyebrow && (
              <p className="font-mono text-xs font-semibold tracking-[0.02em] text-muted-foreground">
                {eyebrow}
              </p>
            )}
              <h2
              id={`${id}-heading`}
              className="mt-2 font-story text-[clamp(2.1rem,3vw+1.2rem,3.3rem)] font-normal leading-[1.15] tracking-[0] text-foreground"
            >
              {highlightTitle ? <Highlight>{title}</Highlight> : title}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={80} className="min-w-0">{children}</Reveal>
      </div>
    </section>
  );
}
