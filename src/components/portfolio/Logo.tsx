export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group inline-flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-sm bg-primary font-display text-sm font-bold tracking-tight text-primary-foreground">
        KC
      </span>
      {!compact && (
        <span className="font-display text-sm font-medium tracking-tight text-foreground">
          Kenneth Louie <span className="text-primary">Cleofe</span>
        </span>
      )}
    </a>
  );
}