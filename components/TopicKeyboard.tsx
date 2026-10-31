import Link from "next/link";
import { categories } from "@/lib/categories";
import { getCategoryCounts } from "@/lib/posts";

// Categories laid out as a keyboard: each key is a topic, pressing it opens the topic.
export function TopicKeyboard() {
  const counts = getCategoryCounts();

  return (
    <div className="rounded-[22px] border border-line bg-paper-2 p-3 shadow-[0_10px_0_var(--key-shadow)] sm:p-4">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/kategoriya/${cat.slug}`}
            className={`group relative flex min-h-[84px] flex-col justify-between rounded-xl border border-black/10 p-3 text-[#16171b] shadow-[0_4px_0_rgba(22,23,27,0.22)] transition hover:-translate-y-0.5 active:translate-y-[3px] active:shadow-[0_1px_0_rgba(22,23,27,0.22)] ${
              i === 0 ? "col-span-2 sm:col-span-1" : ""
            }`}
            style={{ background: cat.color }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
              {counts.get(cat.slug) ?? 0} maqola
            </span>
            <span className="font-display text-base font-bold leading-tight">{cat.short}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
