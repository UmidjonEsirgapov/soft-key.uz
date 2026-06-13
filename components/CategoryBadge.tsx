import Link from "next/link";
import { getCategoryName } from "@/lib/categories";

interface CategoryBadgeProps {
  slug: string;
}

export function CategoryBadge({ slug }: CategoryBadgeProps) {
  return (
    <Link
      href={`/kategoriya/${slug}`}
      className="inline-flex min-h-9 items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100 sm:min-h-8 sm:py-1"
    >
      {getCategoryName(slug)}
    </Link>
  );
}
