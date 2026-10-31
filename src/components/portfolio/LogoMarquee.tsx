const PLATFORMS = [
  { name: "Zapier", slug: "zapier" },
  { name: "Make", slug: "make" },
  { name: "n8n", slug: "n8n" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Claude", slug: "claude" },
  { name: "Google Workspace", slug: "googledocs" },
  { name: "Google Drive", slug: "googledrive" },
  { name: "Zoom", slug: "zoom" },
  { name: "Loom", slug: "loom" },
  { name: "Notion", slug: "notion" },
  { name: "Airtable", slug: "airtable" },
  { name: "Trello", slug: "trello" },
  { name: "Shopify", slug: "shopify" },
  { name: "Calendly", slug: "calendly" },
];

type Platform = (typeof PLATFORMS)[number];

const ROWS = [PLATFORMS.slice(0, 7), PLATFORMS.slice(7)];

function Logo({ p }: { p: Platform }) {
  return (
    <div className="group mr-12 inline-flex shrink-0 items-center gap-3" title={p.name}>
      <img
        src={`https://cdn.simpleicons.org/${p.slug}/c9c1c1`}
        alt=""
        loading="lazy"
        width={24}
        height={24}
        className="h-6 w-6 object-contain opacity-75 transition-[opacity,transform] duration-300 group-hover:scale-110 group-hover:opacity-100"
      />
      <span className="whitespace-nowrap text-base font-semibold tracking-[-0.02em] text-muted-foreground transition-colors group-hover:text-foreground">
        {p.name}
      </span>
    </div>
  );
}

// One row: the logos are repeated so half the track is always wider than the screen,
// then the track slides by exactly half for a seamless loop.
function MarqueeRow({
  items,
  seconds,
  reverse,
}: {
  items: Platform[];
  seconds: number;
  reverse?: boolean;
}) {
  const set = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className="marquee-track group-hover/marquee:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${seconds}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {[...set, ...set].map((p, i) => (
          <Logo key={i} p={p} />
        ))}
      </div>
    </div>
  );
}

// Two rows moving in opposite directions (30s and 38s), soft fades on both edges, paused on hover.
export function LogoMarquee() {
  return (
    <div
      className="group/marquee grid gap-6"
      role="img"
      aria-label={`Tools I build with: ${PLATFORMS.map((p) => p.name).join(", ")}`}
    >
      <MarqueeRow items={ROWS[0]} seconds={30} />
      <MarqueeRow items={ROWS[1]} seconds={38} reverse />
    </div>
  );
}
