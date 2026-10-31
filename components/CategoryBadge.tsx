import Link from "next/link";
import { getCategoryColor, getCategoryName } from "@/lib/categories";

interface CategoryBadgeProps {
  slug: string;
}

export function CategoryBadge({ slug }: CategoryBadgeProps) {
  return (
    <Link
      href={`/kategoriya/${slug}`}
      className="inline-flex min-h-8 items-center rounded-full border border-black/5 px-3 py-1 text-xs font-semibold text-[#16171b] transition hover:brightness-95"
      style={{ background: getCategoryColor(slug) }}
    >
      {getCategoryName(slug)}
    </Link>
  );
}
