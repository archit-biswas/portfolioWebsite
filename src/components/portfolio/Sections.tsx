import { useState } from "react";
import { Download, Mail, ArrowRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { SectionShell, Highlight } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { HeroSpotlight } from "./HeroSpotlight";
import { JourneyRail } from "./JourneyRail";
import { SkillsScroll } from "./SkillsScroll";
import { AboutPanels } from "./AboutPanels";

import { CertificationsOrbit } from "./CertificationsOrbit";
import { ResumeViewer, ResumeHoverThumb } from "./ResumeViewer";
import { ContactBanner, EmailCopy } from "./ContactBits";



const HERO_FRAGMENTS = ["FULL-STACK", "GENAI / LLM", "ENGINEER"];

export function Hero() {
  const { name, title, pitch, pitchDetail, location, email, links } = portfolio.about;
  const [resumeHover, setResumeHover] = useState(false);
  const [firstName, ...restName] = name.split(" ");
  const lastName = restName.join(" ");
  const fragmentAnim = (i: number) => ({
    style: { animationDelay: `${0.15 + i * 0.12}s` },
    className: "animate-hero-rise",
  });

  return (
    <section id="hero" className="relative scroll-mt-24 overflow-hidden -mt-20">
      <HeroSpotlight />

      {/* vertical availability strip */}
      <p
        aria-hidden="true"
        className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-muted-foreground/70 [writing-mode:vertical-rl] lg:block"
      >
        Available for opportunity
      </p>

      {/* intro blurb — top left */}
      <p
        style={{ animationDelay: "0.1s" }}
        className="animate-hero-rise absolute left-8 top-28 z-10 hidden max-w-[26ch] font-mono text-[0.7rem] font-medium uppercase leading-relaxed tracking-[0.18em] text-muted-foreground lg:block xl:left-16"
      >
        Hi, I'm {name}. {pitch}
      </p>

      {/* collaboration blurb — bottom right */}
      <p
        style={{ animationDelay: "0.5s" }}
        className="animate-hero-rise absolute bottom-24 right-8 z-10 hidden max-w-[24ch] text-right font-mono text-[0.7rem] font-medium uppercase leading-relaxed tracking-[0.18em] text-muted-foreground lg:block xl:right-16"
      >
        Open to Software Engineer, Full-Stack & AI/ML roles — remote or in {location}.
      </p>

      {/* floating social icons */}
      {links[0] && (
        <a
          href={links[0].url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={links[0].label}
          style={{ animationDelay: "0.35s" }}
          className="animate-hero-rise absolute right-[12%] top-[30%] z-10 hidden font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline lg:inline-flex lg:items-center lg:gap-1"
        >
          {links[0].label}
          <ArrowRight aria-hidden="true" className="size-3 -rotate-45" />
        </a>
      )}
      {links[1] && (
        <a
          href={links[1].url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={links[1].label}
          style={{ animationDelay: "0.45s" }}
          className="animate-hero-rise absolute bottom-[34%] left-[10%] z-10 hidden font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline lg:inline-flex lg:items-center lg:gap-1"
        >
          {links[1].label}
          <ArrowRight aria-hidden="true" className="size-3 -rotate-45" />
        </a>
      )}

      <div className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center px-8 py-24 text-center sm:py-28">
        {/* giant name */}
        <h1 className="font-display uppercase leading-[0.85] tracking-tight text-foreground">
          <span
            style={{ animationDelay: "0.15s" }}
            className="animate-hero-rise block bg-gradient-to-r from-foreground via-violet to-ember bg-clip-text text-[clamp(3.4rem,13vw,12rem)] font-bold text-transparent"
          >
            {firstName}
          </span>
          <span
            style={{ animationDelay: "0.27s" }}
            className="animate-hero-rise block bg-gradient-to-r from-foreground via-violet to-ember bg-clip-text text-[clamp(3.4rem,13vw,12rem)] font-bold text-transparent"
          >
            {lastName}
          </span>
        </h1>

        {/* fragments */}
        <div className="mt-8 flex flex-wrap items-baseline justify-center gap-x-5 gap-y-1">
          {HERO_FRAGMENTS.map((fragment, i) => (
            <p
              key={fragment}
              style={fragmentAnim(i + 2).style}
              className="animate-hero-rise font-display text-[clamp(1.1rem,3vw,2rem)] font-bold uppercase leading-none tracking-tight text-foreground/80"
            >
              {fragment}
              {i < HERO_FRAGMENTS.length - 1 && (
                <span aria-hidden="true" className="ml-5 text-muted-foreground/50">
                  ·
                </span>
              )}
            </p>
          ))}
        </div>

        <p
          style={{ animationDelay: "0.55s" }}
          className="animate-hero-rise mt-8 max-w-[62ch] font-andika text-base leading-[1.6] text-muted-foreground"
        >
          {pitchDetail}
        </p>
        <p
          style={{ animationDelay: "0.62s" }}
          className="animate-hero-rise mt-3 font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground"
        >
          {location.toUpperCase()} · {title.toUpperCase()}
        </p>
        <div
          style={{ animationDelay: "0.7s" }}
          className="animate-hero-rise mt-9 flex flex-wrap justify-center gap-3"
        >
          <a
            href={`mailto:${email}?subject=${encodeURIComponent("Opportunity — " + name)}`}
            className="group relative inline-flex transition-transform duration-200 ease-in-out hover:scale-[1.02]"
          >
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet via-rose to-ember opacity-50 blur-md transition-opacity duration-500 group-hover:opacity-90"
            />
            <span className="relative inline-flex min-h-11 items-center gap-2 rounded-xl bg-card px-5 text-[0.9375rem] font-semibold tracking-[0.01em]">
              <span className="bg-gradient-to-r from-violet to-foreground bg-clip-text text-transparent">
                Work With me
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 text-rose transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </a>
          <a
            href={portfolio.resume.url}
            download
            onMouseEnter={() => setResumeHover(true)}
            onMouseLeave={() => setResumeHover(false)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-5 text-[0.9375rem] font-semibold tracking-[0.01em] text-foreground transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-accent hover:shadow-lg hover:shadow-foreground/10"
          >
            <Download aria-hidden="true" className="size-4" /> Download Resume
          </a>
          <ResumeHoverThumb active={resumeHover} />
        </div>

        {/* social links for small screens */}
        <div className="mt-8 flex justify-center gap-6 lg:hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {link.label}
              <ArrowRight aria-hidden="true" className="size-3 -rotate-45" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <SectionShell id="about" eyebrow="01" title="About">
      <AboutPanels />
    </SectionShell>
  );
}

export function Journey() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="scroll-mt-24 overflow-x-clip py-20 sm:py-28"
    >
      <div className="px-8">
        <p className="font-mono text-xs font-semibold tracking-[0.02em] text-muted-foreground">
          02
        </p>
        <h2
          id="journey-heading"
          className="mt-2 mb-10 font-story text-[clamp(2.1rem,3vw+1.2rem,3.3rem)] font-normal leading-[1.15] tracking-[0] text-foreground"
        >
          <Highlight>Journey</Highlight>
        </h2>
      </div>
      <JourneyRail />
    </section>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 overflow-x-clip py-20 sm:py-28"
    >
      <div className="px-8">
        <p className="font-mono text-xs font-semibold tracking-[0.02em] text-muted-foreground">
          03
        </p>
        <h2
          id="skills-heading"
          className="mt-2 mb-10 font-story text-[clamp(2.1rem,3vw+1.2rem,3.3rem)] font-normal leading-[1.15] tracking-[0] text-foreground"
        >
          <Highlight>Skills</Highlight>
        </h2>
        <SkillsScroll />
      </div>
    </section>
  );
}


export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="scroll-mt-24 overflow-x-clip py-20 sm:py-28"
    >
      <div className="px-8">
        <p className="font-mono text-xs font-semibold tracking-[0.02em] text-muted-foreground">
          05
        </p>
        <h2
          id="certifications-heading"
          className="mt-2 mb-10 font-story text-[clamp(2.1rem,3vw+1.2rem,3.3rem)] font-normal leading-[1.15] tracking-[0] text-foreground"
        >
          <Highlight>Certifications</Highlight>
        </h2>
      </div>
      <CertificationsOrbit />
    </section>
  );
}

export function Resume() {
  return (
    <SectionShell id="resume" eyebrow="06" title="Resume">
      <div>
        <p className="mb-6 max-w-[70ch] font-andika text-base leading-[1.6] text-muted-foreground">
          {portfolio.resume.blurb}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <ResumeViewer />
          <p className="text-sm text-muted-foreground">
            Updated <span className="font-mono text-[0.8125rem]">{portfolio.resume.updatedAt}</span>{" "}
            · {portfolio.resume.fileSize}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

export function Contact() {
  const { email, links } = portfolio.about;
  return (
    <SectionShell
      id="contact"
      eyebrow="07"
      highlightTitle={false}
      title={
        <>
          <span className="block">
            <Highlight>Let's work</Highlight>
          </span>
          <span className="block">
            <Highlight>together</Highlight>
          </span>
        </>
      }
    >
      <ContactBanner />
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-7">
          <p className="max-w-[65ch] font-andika text-base leading-[1.6] text-muted-foreground">
            Open to Software Engineer, Full-Stack Developer, and AI/ML Engineer roles, remote or
            based in Mumbai, India or elsewhere. Also available for freelance work building GenAI agents, RAG
            pipelines, and automation tools. The fastest way to reach me is by email.
          </p>
          <EmailCopy email={email} />
          <div className="inline-flex w-fit max-w-full flex-col items-stretch gap-3">
            <span className="group relative inline-flex w-fit transition-transform duration-200 ease-in-out hover:scale-[1.02]">
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl border-2 border-violet/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
              <a
                href={`mailto:${email}?subject=${encodeURIComponent("Opportunity — Archit Biswas")}`}
                className="relative inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rose px-5 text-[0.9375rem] font-semibold tracking-[0.01em] text-background shadow-lg shadow-rose/30 transition-colors duration-200 ease-in-out hover:bg-rose/85"
              >
                <Mail aria-hidden="true" className="size-4" /> Get in touch
              </a>
            </span>
            <div className="grid grid-cols-2 gap-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-border px-4 text-[0.875rem] font-semibold tracking-[0.01em] text-foreground transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-accent hover:shadow-lg hover:shadow-foreground/10"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </SectionShell>
  );
}
