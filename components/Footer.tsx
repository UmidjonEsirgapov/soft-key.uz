import Link from "next/link";
import { categories } from "@/lib/categories";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-line bg-paper-2 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_2fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-ink-2">
            Dasturlash, IT karyera va ta&apos;lim haqida o&apos;zbek tilidagi
            sodda va amaliy maqolalar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-3">Sayt</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="text-ink-2 hover:text-ink">Barcha maqolalar</Link></li>
              <li><Link href="/mavzular" className="text-ink-2 hover:text-ink">Mavzular</Link></li>
              <li><Link href="/qidiruv" className="text-ink-2 hover:text-ink">Qidiruv</Link></li>
            </ul>
          </div>
          <div className="sm:col-span-2">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-3">Mavzular</p>
            <ul className="grid gap-2 text-sm sm:grid-cols-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/kategoriya/${cat.slug}`} className="text-ink-2 hover:text-ink">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 font-mono text-xs text-ink-3 sm:px-6">
          © {year} Soft Key · soft-key.uz
        </p>
      </div>
    </footer>
  );
}
