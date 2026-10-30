import { useEffect, useRef } from "react";
import { Reveal } from "@/components/portfolio/Reveal";
import { SERVICES } from "@/components/portfolio/data";

// Height of the sticky site header (h-16), so the pinned stage sits just below it.
const HEADER_OFFSET = 64;

export function ServicesScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!section || !stage || !track || !bar) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = [...track.querySelectorAll<HTMLElement>("[data-card]")];
    let travel = 0;
    let frame = 0;

    // Vertical scroll inside the tall section drives the track sideways.
    const update = () => {
      frame = 0;
      const max = section.offsetHeight - stage.offsetHeight;
      const p =
        max > 0
          ? Math.min(1, Math.max(0, (HEADER_OFFSET - section.getBoundingClientRect().top) / max))
          : 0;
      track.style.transform = `translate3d(${(-p * travel).toFixed(1)}px,0,0)`;
      bar.style.transform = `scaleX(${p.toFixed(3)})`;
      const on = Math.round(p * (cards.length - 1));
      cards.forEach((c, i) => (c.dataset.active = String(i === on)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Slide until the last card lines up with the page's right margin. scrollWidth leaves out
    // the track's end padding, so measure from the last card instead.
    // The pin always lasts at least one screen of scrolling, so short slides on wide screens
    // still feel deliberate rather than finishing in a single wheel tick.
    const measure = () => {
      const last = cards[cards.length - 1];
      const end =
        last.offsetLeft + last.offsetWidth + parseFloat(getComputedStyle(track).paddingRight);
      travel = Math.max(0, end - track.clientWidth);
      const scrollLength = travel > 0 ? Math.max(travel, window.innerHeight) : 0;
      section.style.height = `${stage.offsetHeight + scrollLength}px`;
      update();
    };

    const resize = new ResizeObserver(measure);
    resize.observe(track);
    resize.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    measure();

    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
      section.style.height = "";
      track.style.transform = "";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative scroll-mt-16 border-b border-border"
    >
      <div
        ref={stageRef}
        className="flex flex-col justify-center overflow-hidden py-20 motion-safe:sticky motion-safe:top-16 motion-safe:h-[calc(100dvh-4rem)] motion-safe:py-0"
      >
        <Reveal className="mx-auto w-full max-w-6xl px-6">
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Services</h2>
            <p className="text-xs text-muted-foreground">What I build</p>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className="mt-8 flex gap-6 px-[max(1.5rem,calc((100%-72rem)/2+1.5rem))] will-change-transform motion-reduce:snap-x motion-reduce:overflow-x-auto motion-reduce:pb-4"
        >
          {SERVICES.map((s) => (
            <article
              key={s.no}
              data-card
              data-active="false"
              className="group flex w-[min(82vw,26rem)] flex-none snap-start flex-col rounded-sm border border-charcoal-border bg-charcoal p-8 text-charcoal-foreground transition-colors duration-300 hover:bg-charcoal-hover data-[active=true]:border-cta-hover data-[active=true]:bg-charcoal-hover sm:min-h-[20rem]"
            >
              <span className="font-mono text-xs text-charcoal-muted transition-colors duration-300 group-data-[active=true]:text-charcoal-accent">
                {s.no}
              </span>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">{s.body}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-sm border border-charcoal-border px-2 py-0.5 text-[11px] text-charcoal-muted"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 w-full max-w-6xl px-6 motion-reduce:hidden">
          <div className="h-px bg-border">
            <span ref={barRef} className="block h-px origin-left scale-x-0 bg-cta-hover" />
          </div>
        </div>
      </div>
    </section>
  );
}
