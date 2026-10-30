import { useLayoutEffect, useRef, type ComponentType } from "react";
import { Reveal } from "@/components/portfolio/Reveal";

type Step = {
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  desc: string;
};

// Six-step timeline: the oxblood line draws itself step by step when the section scrolls into
// view, then a soft dot travels from the first step to the last on a loop. Horizontal on large
// screens, vertical on small ones.
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // The dot's track runs from the first circle's center to the last circle's center.
  useLayoutEffect(() => {
    const list = listRef.current;
    const track = trackRef.current;
    if (!list || !track) return;
    const measure = () => {
      const nodes = list.querySelectorAll<HTMLElement>("[data-node]");
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      // Measured against the list, which sits at the top-left of the same positioned wrapper.
      const origin = list.getBoundingClientRect();
      const a = first.getBoundingClientRect();
      const b = last.getBoundingClientRect();
      const x0 = a.left + a.width / 2 - origin.left;
      const y0 = a.top + a.height / 2 - origin.top;
      const x1 = b.left + b.width / 2 - origin.left;
      const y1 = b.top + b.height / 2 - origin.top;
      Object.assign(track.style, {
        left: `${x0}px`,
        top: `${y0}px`,
        width: `${Math.max(0, x1 - x0)}px`,
        height: `${Math.max(0, y1 - y0)}px`,
      });
    };
    const resize = new ResizeObserver(measure);
    resize.observe(list);
    measure();
    return () => resize.disconnect();
  }, []);

  return (
    <Reveal className="group/steps relative">
      <ol ref={listRef} className="relative grid gap-10 lg:grid-cols-6 lg:gap-6">
        {steps.map((step, i) => (
          <li key={step.label} className="group relative flex gap-6 lg:block">
            {i < steps.length - 1 && (
              <>
                {/* Connector to the next step: grey track, oxblood fill drawn in sequence */}
                <span
                  aria-hidden
                  className="absolute -bottom-10 left-8 top-16 w-px bg-border lg:bottom-auto lg:left-16 lg:top-8 lg:h-px lg:w-[calc(100%-2.5rem)]"
                />
                <span
                  aria-hidden
                  className="absolute -bottom-10 left-8 top-16 w-px origin-top scale-y-0 bg-cta-hover transition-transform duration-300 ease-linear group-data-[visible=true]/steps:scale-y-100 motion-reduce:transition-none lg:bottom-auto lg:left-16 lg:top-8 lg:h-px lg:w-[calc(100%-2.5rem)] lg:origin-left lg:scale-x-0 lg:scale-y-100 lg:group-data-[visible=true]/steps:scale-x-100"
                  style={{ transitionDelay: `${i * 300 + 150}ms` }}
                />
              </>
            )}
            <div
              data-node
              className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-[transform,background-color] duration-300 group-hover:-translate-y-1 group-hover:bg-cta-hover/15"
            >
              <span
                aria-hidden
                className="absolute -inset-px rounded-full border border-cta-hover opacity-0 transition-opacity duration-500 group-data-[visible=true]/steps:opacity-100 motion-reduce:transition-none"
                style={{ transitionDelay: `${i * 300}ms` }}
              />
              <step.icon
                size={20}
                strokeWidth={1.5}
                className="text-muted-foreground transition-colors group-hover:text-foreground"
              />
            </div>
            <div className="pt-2 lg:pt-6">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1.5 text-base font-semibold">{step.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
      {/* Travelling dot: passes behind each circle, starts once the line has drawn */}
      <div ref={trackRef} aria-hidden className="pointer-events-none absolute motion-reduce:hidden">
        <span className="timeline-dot absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-[var(--arc)] opacity-0 group-data-[visible=true]/steps:[animation:timeline-dot_5s_linear_2s_infinite]" />
      </div>
    </Reveal>
  );
}
