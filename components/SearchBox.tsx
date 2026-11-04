"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";

export interface SearchEntry {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  category: string;
  color: string;
  minutes: number;
}

const SUGGESTIONS = ["junior", "rezyume", "python", "yaponiya", "algoritm", "kurs"];

function normalize(text: string): string {
  return text.toLowerCase().replace(/[‘’ʻʼ`']/g, "");
}

export function SearchBox({
  entries,
  initialQuery = "",
}: {
  entries: SearchEntry[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const deferred = useDeferredValue(query);

  const results = useMemo(() => {
    const words = normalize(deferred).split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    return entries
      .map((entry) => {
        const title = normalize(entry.title);
        const body = normalize(`${entry.description} ${entry.keywords}`);
        let score = 0;
        for (const w of words) {
          if (title.includes(w)) score += 3;
          else if (body.includes(w)) score += 1;
          else return { entry, score: 0 };
        }
        return { entry, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.entry);
  }, [deferred, entries]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <label htmlFor="qidiruv" className="sr-only">Qidiruv so&apos;zi</label>
      <input
        id="qidiruv"
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Masalan: junior dasturchi"
        className="keycap h-14 w-full rounded-xl px-5 text-lg text-ink outline-none placeholder:text-ink-3 focus:border-accent"
      />

      {query.trim() === "" ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuery(s)}
              className="keycap h-9 rounded-lg px-3 font-mono text-xs text-ink-2"
            >
              {s}
            </button>
          ))}
        </div>
      ) : (
        <>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-ink-3" aria-live="polite">
            {results.length} ta natija
          </p>
          <ul className="mt-3 divide-y divide-line">
            {results.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="group block py-4">
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-3">
                    <span className="h-2 w-2 rounded-[3px]" style={{ background: r.color }} />
                    {r.category} · {r.minutes} daq
                  </span>
                  <span className="mt-1 block font-display text-lg font-semibold text-ink group-hover:text-accent-ink">
                    {r.title}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm text-ink-2">{r.description}</span>
                </Link>
              </li>
            ))}
          </ul>
          {results.length === 0 && (
            <p className="mt-4 text-ink-2">Hech narsa topilmadi. Boshqa so&apos;z bilan urinib ko&apos;ring.</p>
          )}
        </>
      )}
    </div>
  );
}
