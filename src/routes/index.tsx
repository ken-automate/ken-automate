import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/portfolio/Logo";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { Reveal } from "@/components/portfolio/Reveal";
import { useRipple } from "@/components/portfolio/Ripple";
import { LogoMarquee } from "@/components/portfolio/LogoMarquee";
import { PortfolioFolders } from "@/components/portfolio/PortfolioFolders";
import {
  Search,
  GitBranch,
  Wrench,
  ClipboardCheck,
  Rocket,
  Headphones,
} from "lucide-react";
const portrait = { url: "/assets/ken-cleofe-portrait.png" };
const resume = { url: "/assets/Kenneth-Cleofe-Resume.pdf" };

import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  SERVICES,
} from "@/components/portfolio/data";

const TITLE = "Kenneth Louie Cleofe — AI Automation & Operations Specialist";
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

function SectionHeading({ index, title, lead }: { index: string; title: string; lead?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{index}</span>
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lead}</p>}
    </Reveal>
  );
}

function Index() {
  const ripple = useRipple();

  return (
    <div id="top" className="min-h-screen bg-background">
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
            <ThemeToggle />
            <a
              href={PROFILE.calendly}
              target="_blank"
              rel="noreferrer"
              onMouseDown={ripple}
              className="press ripple-host rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
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
            <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  {PROFILE.role}
                </p>
                <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl xl:text-6xl">
                  I turn manual operations into systems that run themselves.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  I help businesses eliminate repetitive work by building AI-powered automations that connect their apps, streamline operations, and free teams to focus on higher-value work. From CRM workflows and AI agents to custom integrations, I build reliable systems that save time, reduce manual effort, and scale with your business.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href={PROFILE.calendly}
                    target="_blank"
                    rel="noreferrer"
                    onMouseDown={ripple}
                    className="press ripple-host rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] hover:opacity-90"
                  >
                    Book a discovery call
                  </a>
                  <a
                    href="#portfolio"
                    onMouseDown={ripple}
                    className="press ripple-host rounded-sm border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    See previous work
                  </a>
                  <a
                    href={resume.url}
                    download="Kenneth-Cleofe-Resume.pdf"
                    onMouseDown={ripple}
                    className="press ripple-host rounded-sm border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Download Resume
                  </a>
                </div>
              </div>

              <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
                <div className="pointer-events-none absolute -inset-6 rounded-full bg-primary/15 blur-3xl" />
                <div className="relative overflow-hidden rounded-sm border border-border bg-surface">
                  <img
                    src={portrait.url}
                    alt="Portrait of Kenneth Louie Cleofe, AI automation and operations specialist"
                    width={1349}
                    height={1155}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-display text-sm font-semibold text-foreground">
                      {PROFILE.name}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {PROFILE.location}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Services — compact */}
            <div id="services" className="mt-20 scroll-mt-24">
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  Services
                </h2>
                <p className="text-xs text-muted-foreground">What I build</p>
              </div>
              <div className="mt-px grid gap-px overflow-hidden bg-border sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES.map((s, i) => (
                  <Reveal
                    key={s.no}
                    as="article"
                    delay={i * 80}
                    className="bg-surface p-6 transition-colors hover:bg-card"
                  >
                    <span className="font-mono text-xs text-primary">{s.no}</span>
                    <h3 className="mt-3 text-sm font-semibold">{s.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {s.points.map((p) => (
                        <li
                          key={p}
                          className="rounded-sm border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How I Work */}
        <section id="how-i-work" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Reveal className="mb-12 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                How I Work
              </span>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                From first call to running automation
              </h2>
            </Reveal>
            <div className="relative">
              <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
                {PROCESS_STEPS.map((step, i) => (
                  <Reveal
                    key={step.label}
                    as="article"
                    delay={i * 100}
                    className="group relative text-center"
                  >
                    <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-[var(--shadow-lift)]">
                      <step.icon
                        size={20}
                        strokeWidth={1.5}
                        className="text-muted-foreground transition-colors group-hover:text-primary"
                      />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold">{step.label}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                    {i < PROCESS_STEPS.length - 1 && (
                      <span className="absolute right-0 top-8 hidden -translate-y-1/2 text-muted-foreground lg:block">
                        →
                      </span>
                    )}
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              index="01 / Stack"
              title="Software & platforms I use"
              lead="The tools I build in daily."
            />
            <Reveal className="rounded-sm border border-border bg-surface py-6">
              <LogoMarquee />
            </Reveal>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              index="02 / Portfolio"
              title="Portfolio"
              lead="Automations built and shipped inside live operations. Open a folder to see the build, the tools behind it and the value it delivers."
            />
            <PortfolioFolders />
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading index="03 / Experience" title="Work experience" />
            <div className="space-y-px bg-border">
              {EXPERIENCE.map((job) => (
                <Reveal
                  key={job.company}
                  as="article"
                  className="grid gap-6 bg-background py-10 md:grid-cols-[280px_1fr]"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{job.role}</h3>
                    <p className="mt-1 text-sm text-primary">{job.company}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{job.period}</p>
                  </div>
                  <ul className="space-y-3">
                    {job.points.map((p) => (
                      <li
                        key={p}
                        className="relative pl-5 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-primary"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
            <div className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-2">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                  Education
                </h3>
                <p className="mt-4 text-sm font-medium">{EDUCATION.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {EDUCATION.school} · {EDUCATION.year}
                </p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                  Certifications
                </h3>
                <ul className="mt-4 space-y-2">
                  {CERTIFICATIONS.map((c) => (
                    <li key={c} className="text-sm text-muted-foreground">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              index="04 / Contact"
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
                  { label: "LinkedIn", value: "www.linkedin.com/in/kenneth-cleofe-72a8bb119", href: PROFILE.linkedin },
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
                  className="block rounded-sm bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
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
