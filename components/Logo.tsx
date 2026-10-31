import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Soft Key — bosh sahifa">
      <span className="keycap keycap-accent inline-flex h-9 w-9 items-center justify-center rounded-[9px] font-display text-sm font-bold tracking-tight group-hover:-translate-y-px">
        SK
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-ink">
        Soft Key
      </span>
    </Link>
  );
}
