import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/portfolio/Logo";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { Reveal } from "@/components/portfolio/Reveal";
import { useRipple } from "@/components/portfolio/Ripple";
import { LogoMarquee } from "@/components/portfolio/LogoMarquee";
import { PortfolioFolders } from "@/components/portfolio/PortfolioFolders";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  SERVICES,

  WORK_SETUP,
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
  { label: "Experience", href: "#experience" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
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
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              {PROFILE.role}
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-6xl">
              I turn manual operations into systems that run themselves.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {PROFILE.summary}
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
            </div>
            <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4">
              {[
                ["8+ yrs", "Operations experience"],
                ["7", "Certifications"],
                ["50–70", "Staff managed"],
                ["4", "Automation platforms"],
              ].map(([value, label], i) => (
                <Reveal key={label} delay={i * 80} className="bg-surface px-5 py-6">
                  <dt className="font-display text-2xl font-semibold text-primary">{value}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{label}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              index="01 / Services"
              title="What I build"
              lead="Practical automation work, scoped around where the manual effort actually is."
            />
            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <Reveal
                  key={s.no}
                  as="article"
                  delay={i * 90}
                  className="group bg-surface p-8 transition-colors hover:bg-card"
                >
                  <span className="font-mono text-xs text-primary">{s.no}</span>
                  <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="rounded-sm border border-border px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading index="02 / Experience" title="Work experience" />
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

        {/* Portfolio */}
        <section id="portfolio" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              index="03 / Portfolio"
              title="Portfolio"
              lead="Automations built and shipped inside live operations. Open a folder to see the build, the tools behind it and the value it delivers."
            />
            <PortfolioFolders />
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              index="04 / Stack"
              title="Software & platforms I use"
              lead="The tools I build in daily, plus the setup that keeps me online."
            />
            <Reveal className="rounded-sm border border-border bg-surface py-6">
              <LogoMarquee />
            </Reveal>
            <Reveal className="mt-14 rounded-sm border border-border bg-surface p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Work setup
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {WORK_SETUP.map((s) => (
                  <li key={s} className="text-sm text-muted-foreground">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              index="05 / Contact"
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
                  { label: "LinkedIn", value: "kenneth-cleofe", href: PROFILE.linkedin },
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
