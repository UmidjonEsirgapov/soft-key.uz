"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";

interface MobileNavProps {
  items: { href: string; label: string }[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
        onClick={() => setOpen((v) => !v)}
        className="keycap inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h10"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-ink/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            id="mobile-menu"
            aria-label="Mobil navigatsiya"
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-paper px-4 pb-6 pt-3 shadow-xl"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-lg px-3 font-display text-lg font-semibold text-ink hover:bg-paper-2"
              >
                {item.label}
              </Link>
            ))}
            <p className="mb-2 mt-5 px-3 font-mono text-xs uppercase tracking-widest text-ink-3">
              Mavzular
            </p>
            <div className="grid grid-cols-2 gap-2 px-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/kategoriya/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-ink-2 hover:bg-paper-2"
                >
                  <span className="h-3 w-3 shrink-0 rounded-[4px]" style={{ background: cat.color }} />
                  {cat.short}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
