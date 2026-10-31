"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/types";

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Maqola mundarijasi">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-3">Mundarija</p>
      <ol className="space-y-1 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l-2 py-1 text-sm leading-snug transition ${
                item.level === 3 ? "pl-6" : "pl-3"
              } ${
                active === item.id
                  ? "border-accent font-medium text-ink"
                  : "border-transparent text-ink-3 hover:text-ink"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
