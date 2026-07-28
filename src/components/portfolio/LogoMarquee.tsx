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

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {PLATFORMS.map((p) => (
        <div
          key={p.name}
          className="group grid h-20 w-32 shrink-0 place-items-center sm:w-40"
          title={p.name}
        >
          <img
            src={`https://cdn.simpleicons.org/${p.slug}`}
            alt={`${p.name} logo`}
            loading="lazy"
            width={40}
            height={40}
            className="h-10 w-10 object-contain opacity-80 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 dark:brightness-[1.9] dark:group-hover:brightness-100"
          />
        </div>
      ))}
    </div>
  );
}

export function LogoMarquee() {
  return (
    <div className="marquee-mask group/marquee relative w-full overflow-hidden">
      <div className="marquee-track group-hover/marquee:[animation-play-state:paused]">
        <Row />
        <Row />
      </div>
    </div>
  );
}