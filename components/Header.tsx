import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

export const MAIN_NAV = [
  { href: "/blog", label: "Maqolalar" },
  { href: "/kategoriya/dasturlash", label: "Dasturlash" },
  { href: "/kategoriya/suniy-intellekt", label: "AI" },
  { href: "/kategoriya/karyera", label: "Karyera" },
  { href: "/kategoriya/junior", label: "Junior" },
  { href: "/mavzular", label: "Barcha mavzular" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Asosiy navigatsiya">
          {MAIN_NAV.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/qidiruv"
            className="keycap inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm text-ink-2"
            aria-label="Qidiruv"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="hidden lg:inline">Qidiruv</span>
          </Link>
          <MobileNav items={MAIN_NAV} />
        </div>
      </div>
    </header>
  );
}
