import { Reveal } from "@/components/portfolio/Reveal";
import { Toggle } from "@/components/portfolio/Experience";

// FAQ as a split layout: the heading stays in view on the left while the questions open
// and close on the right. The first question starts open.
export function Faq({
  items,
  title,
  lead,
}: {
  items: { q: string; a: string }[];
  title: string;
  lead: string;
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
      <Reveal className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">{lead}</p>
      </Reveal>
      <div className="border-b border-border">
        {items.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <details open={i === 0} className="group/row border-t border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold">{f.q}</h3>
                <Toggle />
              </summary>
              <p className="pb-7 pr-15 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
