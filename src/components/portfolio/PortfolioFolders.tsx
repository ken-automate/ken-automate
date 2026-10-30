import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Reveal } from "@/components/portfolio/Reveal";
import { useRipple } from "@/components/portfolio/Ripple";
import { PORTFOLIO, type PortfolioItem } from "@/components/portfolio/portfolioData";

// Lightbox grow: the clicked folder's preview image grows to the center, then shrinks back
// to the exact same spot on close.
const DURATION = 600;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const THUMB_RADIUS = 10; // matches .folder-peek border-radius
const BIG_RADIUS = 16;

function FolderCard({
  item,
  index,
  onOpen,
  delay,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: () => void;
  delay: number;
}) {
  const ripple = useRipple();
  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={onOpen}
        onMouseDown={ripple}
        data-folder={index}
        className="folder-card ripple-host press group w-full text-left"
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
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              {item.category}
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

  return (
    <>
      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO.map((item, i) => (
          <FolderCard
            key={item.id}
            item={item}
            index={i}
            delay={(i % 3) * 90}
            onOpen={() => {
              if (openIndex !== null) return;
              const thumb = thumbFor(i);
              if (thumb?.naturalWidth) setRatio(`${thumb.naturalWidth} / ${thumb.naturalHeight}`);
              setOpenIndex(i);
            }}
          />
        ))}
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
              closeRef.current?.focus();
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
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                  {active.category}
                </span>
                <h3 id="lightbox-title" className="text-xl font-semibold sm:text-2xl">
                  {active.title}
                </h3>
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
