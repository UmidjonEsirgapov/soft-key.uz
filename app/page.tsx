import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";
import { categories } from "@/lib/categories";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Texnologiya va ta&apos;lim
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Dasturlash, karyera, o&apos;quv kurslari va zamonaviy texnologiyalar
            haqida foydali maqolalar — O&apos;zbek tilida.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Barcha maqolalar
            </Link>
            {categories.slice(0, 3).map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategoriya/${cat.slug}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 sm:mb-8 sm:text-2xl">
          So&apos;nggi maqolalar
        </h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500">
            Hozircha maqolalar yo&apos;q. Tez orada yangi kontent qo&apos;shiladi.
          </p>
        )}
      </section>
    </div>
  );
}
