import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal } from "@/components/portfolio/Reveal";
import { useRipple } from "@/components/portfolio/Ripple";
import { PORTFOLIO, type PortfolioItem } from "@/components/portfolio/portfolioData";

// Lightbox grow: the clicked folder's preview image grows to the center, then shrinks back
// to the exact same spot on close.
const DURATION = 600;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const THUMB_RADIUS = 10; // matches .folder-peek border-radius
const BIG_RADIUS = 16;

// Automations shown before "Show more"; two full rows at three across.
const FIRST_AUTOMATIONS = 6;

function StatusLabel({ status }: { status: PortfolioItem["status"] }) {
  if (!status) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
      {status}
    </span>
  );
}

function FolderCard({
  item,
  index,
  onOpen,
  delay,
  large,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: () => void;
  delay: number;
  large?: boolean;
}) {
  const ripple = useRipple();
  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={onOpen}
        onMouseDown={ripple}
        data-folder={index}
        className={`folder-card ripple-host press group w-full text-left${large ? " folder-card--large" : ""}`}
        aria-label={`Open ${item.title}`}
      >
        <span className="folder-tab" aria-hidden />
        <span className="folder-body">
          <span className="folder-peek">
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover object-left-top"
            />
          </span>
          <span className="folder-front">
            <span className="flex items-center justify-between gap-3">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                {item.category}
              </span>
              <StatusLabel status={item.status} />
            </span>
            <span className="mt-2 block text-sm font-semibold leading-snug text-foreground">
              {item.title}
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  );
}

function GroupHeading({ title, count }: { title: string; count: number }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h3 className="text-lg font-semibold tracking-[-0.01em]">{title}</h3>
      <span className="font-mono text-[11px] text-muted-foreground">{count}</span>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
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

// Places the full-size image over the thumbnail: same position, same crop (object-cover,
// anchored top-left) and same corner radius. Expects the image to have no transform applied.
function matchThumbnail(big: HTMLElement, thumb: HTMLImageElement) {
  const b = big.getBoundingClientRect();
  const t = thumb.getBoundingClientRect();
  const iw = thumb.naturalWidth || b.width;
  const ih = thumb.naturalHeight || b.height;
  const k = Math.max(t.width / iw, t.height / ih) / (b.width / iw);
  big.style.transform = `translate(${t.left - b.left}px, ${t.top - b.top}px) scale(${k})`;
  big.style.clipPath = `inset(0px ${b.width - t.width / k}px ${b.height - t.height / k}px 0px round ${THUMB_RADIUS / k}px)`;
}

function lockScroll(lock: boolean) {
  const html = document.documentElement;
  if (lock) {
    // Keep the page from shifting sideways when the scrollbar disappears.
    html.style.paddingRight = `${window.innerWidth - html.clientWidth}px`;
    html.style.overflow = "hidden";
  } else {
    html.style.overflow = "";
    html.style.paddingRight = "";
  }
}

export function PortfolioFolders() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const [ratio, setRatio] = useState("16 / 9");
  const [allAutomations, setAllAutomations] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  const active = openIndex === null ? null : PORTFOLIO[openIndex];
  const thumbFor = (i: number) =>
    gridRef.current?.querySelector<HTMLImageElement>(`[data-folder="${i}"] img`) ?? null;
  const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Open: start the big image on top of the thumbnail, then let it grow into place.
  useLayoutEffect(() => {
    if (openIndex === null) return;
    const big = bigRef.current;
    const thumb = thumbFor(openIndex);
    if (!big || !thumb) return;
    lockScroll(true);
    thumb.style.visibility = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    if (reduceMotion()) {
      setShown(true);
      return;
    }
    big.style.transition = "none";
    matchThumbnail(big, thumb);
    void big.offsetWidth;
    big.style.transition = `transform ${DURATION}ms ${EASE}, clip-path ${DURATION}ms ${EASE}`;
    big.style.transform = "none";
    big.style.clipPath = `inset(0px 0px 0px 0px round ${BIG_RADIUS}px)`;
    setShown(true);
  }, [openIndex]);

  // Close: shrink back onto the thumbnail's current spot, then hand focus back to the folder.
  const close = useCallback(() => {
    if (openIndex === null || closing.current) return;
    closing.current = true;
    const i = openIndex;
    const big = bigRef.current;
    const thumb = thumbFor(i);
    setShown(false);
    const instant = reduceMotion() || !big || !thumb;
    if (!instant) {
      big.style.transition = `transform ${DURATION}ms ${EASE}, clip-path ${DURATION}ms ${EASE}`;
      matchThumbnail(big, thumb);
    }
    window.setTimeout(
      () => {
        if (thumb) thumb.style.visibility = "";
        lockScroll(false);
        closing.current = false;
        setOpenIndex(null);
        gridRef.current
          ?.querySelector<HTMLButtonElement>(`[data-folder="${i}"]`)
          ?.focus({ preventScroll: true });
      },
      instant ? 0 : DURATION,
    );
  }, [openIndex]);

  useEffect(() => () => lockScroll(false), []);

  const open = (i: number) => {
    if (openIndex !== null) return;
    const thumb = thumbFor(i);
    if (thumb?.naturalWidth) setRatio(`${thumb.naturalWidth} / ${thumb.naturalHeight}`);
    setOpenIndex(i);
  };

  // Indexes stay those of PORTFOLIO, so the lightbox can find any folder's thumbnail.
  const indexed = PORTFOLIO.map((item, index) => ({ item, index }));
  const websites = indexed.filter(({ item }) => item.group === "website");
  const automations = indexed.filter(({ item }) => item.group === "automation");
  const hiddenCount = automations.length - FIRST_AUTOMATIONS;

  const showAll = () => {
    setAllAutomations(true);
    // Move keyboard focus to the first folder that just appeared.
    const next = automations[FIRST_AUTOMATIONS]?.index;
    requestAnimationFrame(() =>
      gridRef.current
        ?.querySelector<HTMLButtonElement>(`[data-folder="${next}"]`)
        ?.focus({ preventScroll: true }),
    );
  };

  return (
    <>
      <div ref={gridRef} className="space-y-16">
        <div>
          <GroupHeading title="Websites" count={websites.length} />
          <div className="grid gap-6 sm:grid-cols-2">
            {websites.map(({ item, index }, i) => (
              <FolderCard
                key={item.id}
                item={item}
                index={index}
                delay={(i % 2) * 90}
                large
                onOpen={() => open(index)}
              />
            ))}
          </div>
        </div>

        <div>
          <GroupHeading title="Automations and AI" count={automations.length} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Folders past the first rows stay in the HTML for crawlers, hidden until asked for. */}
            {automations.map(({ item, index }, i) => (
              <div key={item.id} hidden={!allAutomations && i >= FIRST_AUTOMATIONS}>
                <FolderCard
                  item={item}
                  index={index}
                  delay={i < FIRST_AUTOMATIONS ? (i % 3) * 90 : 0}
                  onOpen={() => open(index)}
                />
              </div>
            ))}
          </div>
          {!allAutomations && hiddenCount > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={showAll}
                className="press inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-cta-hover hover:bg-secondary"
              >
                Show {hiddenCount} more automations
              </button>
            </div>
          )}
        </div>
      </div>

      {active && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain"
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
            // Keep keyboard focus inside the lightbox.
            if (e.key === "Tab") {
              e.preventDefault();
              const items = [...e.currentTarget.querySelectorAll<HTMLElement>("a[href], button")];
              const from = items.indexOf(document.activeElement as HTMLElement);
              items[(from + (e.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
            }
          }}
        >
          <div
            className={`fixed inset-0 bg-background/90 backdrop-blur-sm transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"}`}
            onClick={close}
          />
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className={`fixed right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-[opacity,border-color] duration-200 hover:border-cta-hover hover:bg-secondary sm:right-6 sm:top-6 ${shown ? "opacity-100 delay-150" : "opacity-0"}`}
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          <div
            className="relative mx-auto w-full max-w-5xl px-4 py-16 sm:px-6"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div
              ref={bigRef}
              className="relative overflow-hidden rounded-2xl bg-surface shadow-[0_24px_80px_-24px_rgb(0_0_0/0.6)] will-change-transform"
              style={{ transformOrigin: "0 0", aspectRatio: ratio }}
            >
              <img
                src={active.image}
                alt={active.alt}
                className="block h-full w-full object-cover"
              />
            </div>

            <div
              className={`mt-6 overflow-hidden rounded-2xl border border-border bg-surface transition-[opacity,transform] duration-300 ${shown ? "translate-y-0 opacity-100 delay-300" : "translate-y-2 opacity-0"}`}
            >
              <div className="space-y-2 border-b border-border p-6">
                <span className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                    {active.category}
                  </span>
                  <StatusLabel status={active.status} />
                </span>
                <h3 id="lightbox-title" className="text-xl font-semibold sm:text-2xl">
                  {active.title}
                </h3>
                {active.liveUrl && (
                  <a
                    href={active.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press !mt-4 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-cta-hover hover:bg-secondary"
                  >
                    Visit live site
                    <ArrowUpRight size={16} strokeWidth={1.5} />
                  </a>
                )}
              </div>
              {active.gallery && active.gallery.length > 0 && (
                <div className="space-y-4 border-b border-border bg-background p-4 sm:p-6">
                  {active.gallery.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${active.title} screenshot ${i + 2}`}
                      loading="lazy"
                      className="w-full rounded-lg border border-border"
                    />
                  ))}
                </div>
              )}
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
          </div>
        </div>
      )}
    </>
  );
}
