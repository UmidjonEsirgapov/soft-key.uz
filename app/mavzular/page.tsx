import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { categories } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Mavzular",
  description:
    "Soft Key blogining barcha mavzulari: dasturlash, IT karyera, junior dasturchilar, o'quv kurslari, xorijda ta'lim va texnologiya.",
  path: "/mavzular",
});

export default function TopicsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Bosh sahifa", href: "/" }, { label: "Mavzular" }]}
        eyebrow={`${categories.length} ta mavzu`}
        title="Nimani o'rganmoqchisiz?"
        description="Mavzuni tanlang — har birida shu yo'nalishdagi barcha maqolalar jamlangan."
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-10 sm:grid-cols-2 sm:px-6 sm:py-12">
        {categories.map((cat) => {
          const posts = getPostsByCategory(cat.slug);
          return (
            <div key={cat.slug} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-card">
              <Link
                href={`/kategoriya/${cat.slug}`}
                className="group flex items-start justify-between gap-4 p-6 text-[#16171b]"
                style={{ background: cat.color }}
              >
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight">{cat.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed opacity-75">{cat.description}</p>
                </div>
                <span className="shrink-0 rounded-lg border border-black/10 bg-white/70 px-2.5 py-1 font-mono text-xs shadow-[0_3px_0_rgba(0,0,0,0.15)]">
                  {posts.length}
                </span>
              </Link>
              <ul className="flex-1 divide-y divide-line px-6">
                {posts.slice(0, 3).map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="block py-3 text-sm font-medium text-ink-2 hover:text-ink">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/kategoriya/${cat.slug}`}
                className="border-t border-line px-6 py-4 text-sm font-semibold text-ink hover:text-accent-ink"
              >
                Barcha {posts.length} ta maqola →
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
