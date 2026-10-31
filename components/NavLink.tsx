"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={
        className ??
        `rounded-lg px-3 py-2 text-sm font-medium transition ${
          active ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper-2 hover:text-ink"
        }`
      }
    >
      {children}
    </Link>
  );
}
