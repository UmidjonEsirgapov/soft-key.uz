import Link from "next/link";
import { categories } from "@/lib/categories";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="text-lg font-bold text-slate-900 sm:text-xl"
        >
          Soft <span className="text-blue-600">Key</span>
        </Link>

        <nav
          className="hidden items-center gap-5 lg:gap-6 md:flex"
          aria-label="Asosiy navigatsiya"
        >
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Maqolalar
          </Link>
          {categories.slice(0, 5).map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategoriya/${cat.slug}`}
              className="text-sm text-slate-500 hover:text-blue-600"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
