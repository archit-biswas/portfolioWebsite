import { createFileRoute } from "@tanstack/react-router";
import { useParallax } from "@/hooks/use-parallax";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { NodeCanvas } from "@/components/portfolio/NodeCanvas";
import { SectionShell } from "@/components/portfolio/Reveal";
import { ProjectsExplorer } from "@/components/portfolio/ProjectsExplorer";
import {
  About,
  Certifications,
  Contact,
  Hero,
  Journey,
  Resume,
  Skills,
} from "@/components/portfolio/Sections";
import { portfolio } from "@/data/portfolio";

import portraitAsset from "@/assets/portrait.png.asset.json";

const siteUrl = "https://project--4f0d2446-3ccb-412d-a873-1c3e1eed1a39.lovable.app";
const title = "Archit Biswas | Full-Stack & GenAI/LLM Engineer, Mumbai";
const description =
  "Archit Biswas is a Mumbai based Full-Stack Software Engineer specializing in GenAI, LLM/RAG pipelines, React, Node.js, and applied machine learning.";
const ogTitle = "Archit Biswas — Full-Stack & GenAI/LLM Engineer";
const ogDescription =
  "Full-stack engineer building GenAI/LLM pipelines, RAG agents, and production-grade web applications. Based in Mumbai, open to remote roles.";
const ogImage = `${siteUrl}${portraitAsset.url}`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Archit Biswas",
  jobTitle: "Full-Stack Software Engineer & GenAI/LLM Developer",
  url: siteUrl,
  sameAs: ["https://github.com/archit-biswas", "https://linkedin.com/in/archit-biswas"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressCountry: "IN",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personSchema),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const orbOne = useParallax<HTMLDivElement>(0.3);
  const orbTwo = useParallax<HTMLDivElement>(0.15);

  return (
    <div className="relative min-h-screen bg-background">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <NodeCanvas targetId="" />
        <div ref={orbOne} className="animate-orb-float absolute -top-24 left-[8%] size-96 rounded-full bg-violet-200/50 blur-3xl dark:bg-violet-600/25" />
        <div
          ref={orbTwo}
          className="animate-orb-float absolute right-[5%] top-1/3 size-[28rem] rounded-full bg-sky-200/50 blur-3xl dark:bg-cyan-500/15"
          style={{ animationDelay: "-6s" }}
        />
      </div>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Journey />
        <Skills />
        <SectionShell id="projects" eyebrow="04" title="Projects">
          <ProjectsExplorer />
        </SectionShell>
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <footer className="relative z-10 py-10">
        <div className="flex w-full flex-wrap items-center justify-between gap-3 px-8 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {portfolio.about.name}
          </p>
          <p>{portfolio.about.email}</p>
        </div>
      </footer>
    </div>
  );
}
