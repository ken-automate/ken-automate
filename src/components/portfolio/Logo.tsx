export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="kc-logo group inline-flex items-center gap-3" aria-label="Ken Cleofe — AI Automation Specialist">
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          className="kc-square"
          x="4"
          y="4"
          width="56"
          height="56"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
        />
        {/* K */}
        <g className="kc-k" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square">
          <path d="M19 18 V46" />
          <path d="M30 18 L20.5 32 L30 46" />
        </g>
        {/* C */}
        <path
          className="kc-c"
          d="M50 23 A10 10 0 1 0 50 41"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="4.5"
          strokeLinecap="square"
        />
      </svg>
      {!compact && (
        <span className="kc-text flex flex-col leading-none">
          <span className="font-display text-sm font-semibold tracking-[0.18em] text-foreground">
            KEN CLEOFE
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
            AI Automation Specialist
          </span>
        </span>
      )}
    </a>
  );
}