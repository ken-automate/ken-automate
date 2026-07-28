import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "@/components/portfolio/Reveal";
import { useRipple } from "@/components/portfolio/Ripple";
import { PORTFOLIO, type PortfolioItem } from "@/components/portfolio/portfolioData";

function FolderCard({ item, onOpen, delay }: { item: PortfolioItem; onOpen: () => void; delay: number }) {
  const ripple = useRipple();
  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={onOpen}
        onMouseDown={ripple}
        className="folder-card ripple-host press group w-full text-left"
        aria-label={`Open ${item.title}`}
      >
        <span className="folder-tab" aria-hidden />
        <span className="folder-body">
          <span className="folder-peek">
            <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover object-left-top" />
          </span>
          <span className="folder-front">
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              {item.category}
            </span>
            <span className="mt-2 block text-sm font-semibold leading-snug text-foreground">
              {item.title}
            </span>
            <span className="mt-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Click to open
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4">
      <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">{label}</h4>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export function PortfolioFolders() {
  const [active, setActive] = useState<PortfolioItem | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO.map((item, i) => (
          <FolderCard key={item.id} item={item} delay={(i % 3) * 90} onOpen={() => setActive(item)} />
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-sm border-border bg-surface p-0">
          {active && (
            <div>
              <DialogHeader className="space-y-2 border-b border-border p-6 text-left">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                  {active.category}
                </span>
                <DialogTitle className="text-xl font-semibold sm:text-2xl">{active.title}</DialogTitle>
              </DialogHeader>
              <div className="border-b border-border bg-background p-4 sm:p-6">
                <img
                  src={active.image}
                  alt={active.alt}
                  loading="lazy"
                  className="w-full rounded-sm border border-border"
                />
              </div>
              <div className="grid gap-6 p-6 md:grid-cols-2">
                <Detail label="What this shows">{active.shows}</Detail>
                <Detail label="What was built">{active.build}</Detail>
                <Detail label="Problem it solves">{active.problem}</Detail>
                <Detail label="Result & value">{active.result}</Detail>
                <div className="border-t border-border pt-4 md:col-span-2">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                    Tools & platforms
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {active.tools.map((t) => (
                      <li
                        key={t}
                        className="rounded-sm border border-border px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}