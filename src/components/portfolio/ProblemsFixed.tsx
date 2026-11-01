import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/portfolio/Reveal";
import { PROBLEMS } from "@/components/portfolio/data";

// Owner-facing problems, each paired with the real build that fixed it and its result.
// Written in the words a business owner would search for.
export function ProblemsFixed() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {PROBLEMS.map((p, i) => (
        <Reveal key={p.problem} delay={(i % 3) * 80} className="h-full">
          <article className="flex h-full flex-col rounded-sm border border-border bg-surface p-6 transition-colors duration-300 hover:border-cta-hover">
            <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em]">{p.problem}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.fix}</p>
            <div className="mt-auto pt-6">
              <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cta-hover" />
                {p.result}
              </p>
              <a
                href="#portfolio"
                className="mt-4 flex items-center gap-1 border-t border-border pt-4 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {p.project}
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
