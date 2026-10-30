import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/portfolio/Logo";
import { Reveal } from "@/components/portfolio/Reveal";
import { useRipple } from "@/components/portfolio/Ripple";
import { LogoMarquee } from "@/components/portfolio/LogoMarquee";
import { PortfolioFolders } from "@/components/portfolio/PortfolioFolders";
import { ServicesScroll } from "@/components/portfolio/ServicesScroll";
import { Constellation } from "@/components/portfolio/Constellation";
import { ProcessTimeline } from "@/components/portfolio/ProcessTimeline";
import { Credentials, ExperienceList } from "@/components/portfolio/Experience";
import { Faq } from "@/components/portfolio/Faq";
import {
  Search,
  GitBranch,
  Wrench,
  ClipboardCheck,
  Rocket,
  Headphones,
} from "lucide-react";
const portrait = { url: "/assets/ken-cleofe-portrait-maroon.png" };
const resume = { url: "/assets/Kenneth-Cleofe-Resume.pdf" };

import {
  PROFILE,
} from "@/components/portfolio/data";

const TITLE = "Kenneth Louie Cleofe | AI Automation & Operations Specialist";
const DESCRIPTION =
  "8+ years turning manual operations into automated systems with Zapier, Make, n8n, GoHighLevel and AI. Services, work experience, past builds and a discovery call booking link.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#stack" },
  { label: "How I Work", href: "#how-i-work" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const PROCESS_STEPS = [
  {
    icon: Search,
    label: "Discovery",
    desc: "Understand your workflows, pain points, and goals.",
  },
  {
    icon: GitBranch,
    label: "Process Mapping",
    desc: "Map every step so nothing is missed before building.",
  },
  {
    icon: Wrench,
    label: "Build",
    desc: "Connect apps and assemble automations that fit your stack.",
  },
  {
    icon: ClipboardCheck,
    label: "Test",
    desc: "Run real scenarios, catch edge cases, and refine.",
  },
  {
    icon: Rocket,
    label: "Launch",
    desc: "Deploy live with monitoring and handover documentation.",
  },
  {
    icon: Headphones,
    label: "Support",
    desc: "Stay available for tweaks, fixes, and scaling.",
  },
];

// Also published as FAQPage structured data in index.html. Keep both in sync.
const FAQS = [
  {
    q: "What does Ken Cleofe do?",
    a: "Ken is an AI Automation & Operations Specialist who builds systems that eliminate manual, repetitive work, connecting business apps, automating CRM workflows, and deploying AI agents so teams can focus on higher-value tasks.",
  },
  {
    q: "What automation tools does he specialize in?",
    a: "Zapier, Make, and n8n for workflow automation, plus GoHighLevel and HubSpot for CRM pipelines, and ChatGPT/Claude for AI-powered operational workflows.",
  },
  {
    q: "Has he built custom web applications?",
    a: "Yes, including a full Django-based quoting application rebuild for a large-scale printing business, with both an admin dashboard and a client-facing quote approval flow, matched pixel-for-pixel to design mockups.",
  },
  {
    q: "Can he build data-gathering or market research systems?",
    a: "Yes. He's built Python-based web scraping systems (using pydoll) that monitor competitor pricing and inventory across multiple sites, feeding automated reports into Google Sheets on a schedule.",
  },
  {
    q: "What industries has he worked with?",
    a: "Large-scale printing, wealth & wellness, and real estate, plus retail and banking through his prior operations management career.",
  },
  {
    q: "Where is he based and is he open to remote work?",
    a: "Ken is based in Marikina City, Philippines, and works with clients remotely.",
  },
];

function SectionHeading({ title, lead }: { title: string; lead?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lead}</p>}
    </Reveal>
  );
}

function Index() {
  const ripple = useRipple();

  return (
    <div id="top" className="relative isolate min-h-screen bg-background">
      <Constellation />
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={PROFILE.calendly}
              target="_blank"
              rel="noreferrer"
              onMouseDown={ripple}
              className="press ripple-host rounded-full border border-cta-border bg-cta px-4 py-2 text-sm font-medium text-cta-foreground transition-colors hover:border-cta-hover hover:bg-cta-hover hover:text-cta-hover-foreground"
            >
              Book a call
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
          <div className="pointer-events-none absolute inset-0 hero-glow" />
          <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
            <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  {PROFILE.role}
                </p>
                <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl xl:text-6xl">
                  I turn manual operations into systems that run themselves.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  I help businesses eliminate repetitive work by building AI-powered automations that connect their apps, gather the data they need, and streamline operations, freeing teams to focus on higher-value work. From CRM workflows and AI agents to custom integrations and full custom applications, I build reliable systems that save time, reduce manual effort, and scale with your business.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href={PROFILE.calendly}
                    target="_blank"
                    rel="noreferrer"
                    onMouseDown={ripple}
                    className="press ripple-host arc-button rounded-full px-6 py-3 text-sm font-semibold text-cta-foreground shadow-[var(--shadow-lift)] transition-colors hover:text-cta-hover-foreground"
                  >
                    <span aria-hidden="true" className="arc-spin" />
                    Book a discovery call
                  </a>
                  <a
                    href="#portfolio"
                    onMouseDown={ripple}
                    className="press ripple-host rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-cta-hover hover:bg-secondary"
                  >
                    See previous work
                  </a>
                  <a
                    href={resume.url}
                    download="Kenneth-Cleofe-Resume.pdf"
                    onMouseDown={ripple}
                    className="press ripple-host rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-cta-hover hover:bg-secondary"
                  >
                    Download Resume
                  </a>
                </div>
              </div>

              <Reveal className="relative mx-auto w-full max-w-xs sm:max-w-sm">
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-8 rounded-full bg-glow/70 blur-3xl" />
                  <div className="relative aspect-square overflow-hidden rounded-full border border-border bg-surface">
                    <img
                      src={portrait.url}
                      alt="Portrait of Kenneth Louie Cleofe, AI automation and operations specialist"
                      width={1254}
                      height={1254}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="font-display text-sm font-semibold text-foreground">
                    {PROFILE.name}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {PROFILE.location}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services — vertical scroll pans the cards sideways */}
        <ServicesScroll />

        {/* How I Work: a timeline that draws itself in oxblood as the section scrolls into view */}
        <section id="how-i-work" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading title="From first call to running automation" />
            <ProcessTimeline steps={PROCESS_STEPS} />
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              title="Software & platforms I use"
              lead="The tools I build in daily."
            />
            <Reveal className="rounded-sm border border-cta-hover bg-surface py-6">
              <LogoMarquee />
            </Reveal>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              title="Portfolio"
              lead="Automations built and shipped inside live operations. Open a folder to see the build, the tools behind it and the value it delivers."
            />
            <PortfolioFolders />
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading title="Work experience" />
            <ExperienceList />
            <Credentials />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <Faq
              items={FAQS}
              title="Frequently asked questions"
              lead="Quick answers about what I do, the tools I build with, and how I work."
            />
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              title="Book a discovery call"
              lead="Pick a time that works for you and tell me where the manual work is piling up."
            />
            <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
              <div className="overflow-hidden rounded-sm border border-border bg-surface">
                <iframe
                  title="Book a discovery call with Kenneth Louie Cleofe"
                  src={PROFILE.calendly}
                  className="h-[720px] w-full"
                  loading="lazy"
                />
              </div>
              <div className="space-y-6">
                {[
                  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
                  {
                    label: "Phone",
                    value: PROFILE.phone,
                    href: `tel:${PROFILE.phone.replace(/\s/g, "")}`,
                  },
                  { label: "LinkedIn", value: "www.linkedin.com/in/ken-automate/", href: PROFILE.linkedin },
                  { label: "Location", value: PROFILE.location },
                ].map((c) => (
                  <div key={c.label} className="border-t border-border pt-4">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      {c.label}
                    </p>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-2 block text-sm text-foreground underline-offset-4 hover:text-primary hover:underline"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm">{c.value}</p>
                    )}
                  </div>
                ))}
                <a
                  href={PROFILE.calendly}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-full border border-cta-border bg-cta px-6 py-3 text-center text-sm font-semibold text-cta-foreground transition-colors hover:border-cta-hover hover:bg-cta-hover hover:text-cta-hover-foreground"
                >
                  Open scheduler in new tab
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {PROFILE.name}. {PROFILE.location}.
          </p>
        </div>
      </footer>
    </div>
  );
}
