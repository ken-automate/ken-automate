import { ChevronDown, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/portfolio/Reveal";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE } from "@/components/portfolio/data";

// Round open/close indicator shared by the expandable rows. Turns oxblood on hover like
// every other clickable element on the page.
export function Toggle() {
  return (
    <span
      aria-hidden
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-[border-color,color,transform] duration-300 group-hover/row:border-cta-hover group-hover/row:text-foreground group-open/row:rotate-180"
    >
      <ChevronDown size={16} strokeWidth={1.5} />
    </span>
  );
}

// Work history as an expandable list: dates on the left, role and company on the right.
// The current role starts open; earlier roles open on click.
export function ExperienceList() {
  return (
    <div className="border-b border-border">
      {EXPERIENCE.map((job, i) => (
        <Reveal key={job.company} delay={i * 60}>
          <details open={i === 0} className="group/row border-t border-border">
            <summary className="flex cursor-pointer list-none items-start gap-6 py-7 [&::-webkit-details-marker]:hidden">
              <div className="grid flex-1 gap-1 md:grid-cols-[220px_1fr] md:gap-6">
                <p className="font-mono text-xs text-muted-foreground md:pt-1.5">{job.period}</p>
                <div>
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{job.company}</p>
                </div>
              </div>
              <Toggle />
            </summary>
            <ul className="space-y-3 pb-9 pr-15 md:pl-[calc(220px+1.5rem)]">
              {job.points.map((p) => (
                <li
                  key={p}
                  className="relative pl-5 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-cta-hover"
                >
                  {p}
                </li>
              ))}
            </ul>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

// Education leads one even grid with the certifications: 8 tiles, 4 x 2 on desktop, 2 across
// on smaller screens, so no tile is left alone on a row.
export function Credentials() {
  const tile = "flex h-full flex-col justify-between gap-4 rounded-sm border bg-surface px-5 py-5";
  return (
    <div className="mt-16">
      <h3 className="text-xl font-semibold">Education & certifications</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <div className={`${tile} border-cta-hover/60`}>
            <div className="flex items-start gap-3">
              <GraduationCap size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold leading-snug">{EDUCATION.degree}</p>
                <p className="mt-1 text-xs text-muted-foreground">{EDUCATION.school}</p>
              </div>
            </div>
            <p className="font-mono text-xs text-muted-foreground">Degree · {EDUCATION.year}</p>
          </div>
        </Reveal>
        {CERTIFICATIONS.map((c, i) => (
          <Reveal key={c.name} delay={((i + 1) % 4) * 60}>
            <div className={`${tile} border-border`}>
              <p className="text-sm font-medium leading-snug">{c.name}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {c.issuer ? `${c.issuer} · ${c.year}` : c.year}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
