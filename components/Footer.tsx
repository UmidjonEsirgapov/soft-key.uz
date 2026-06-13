import Link from "next/link";
import { categories } from "@/lib/categories";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8">
          <p className="mb-4 text-sm font-semibold text-slate-900">
            Kategoriyalar
          </p>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategoriya/${cat.slug}`}
                className="text-sm text-slate-600 hover:text-blue-600"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
        <p className="text-sm text-slate-500">
          © {year} Soft Key. Texnologiya va ta&apos;lim haqida maqolalar.
        </p>
      </div>
    </footer>
  );
}
