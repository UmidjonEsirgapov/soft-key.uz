import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { TopicKeyboard } from "@/components/TopicKeyboard";
import { getAllPosts, getPostBySlug, getPostsByCategory } from "@/lib/posts";

const FEATURED_SLUG = "doppix-milliy-operatsion-tizimini-tatbiq-etish-jadal-davom-etmoqda";

function SectionHeading({ title, href, cta }: { title: string; href?: string; cta?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {href && (
        <Link href={href} className="shrink-0 text-sm font-semibold text-ink-2 hover:text-accent-ink">
          {cta ?? "Barchasi"} →
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const all = getAllPosts();
  const featured = getPostBySlug(FEATURED_SLUG) ?? all[0];
  const rest = all.filter((p) => p.slug !== featured?.slug);
  const latest = rest.slice(0, 6);
  const junior = getPostsByCategory("junior").slice(0, 5);
  const study = getPostsByCategory("universitet").slice(0, 5);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="paper-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {all.length} ta maqola · o&apos;zbek tilida
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              IT&apos;ni oddiy tilda
              <br />
              <span className="text-accent">o&apos;rganing.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-2">
              Dasturlash, karyera, kurslar va xorijda o&apos;qish haqida —
              tajribadan kelib chiqqan, keraksiz gaplarsiz maqolalar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/blog" className="keycap keycap-accent inline-flex h-12 items-center rounded-xl px-6 font-semibold">
                Maqolalarni o&apos;qish
              </Link>
              <Link href="/kategoriya/junior" className="keycap inline-flex h-12 items-center rounded-xl px-6 font-semibold text-ink">
                Endi boshlayapman
              </Link>
            </div>
          </div>
          <TopicKeyboard />
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <ArticleCard post={featured} variant="featured" priority />
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <SectionHeading title="Yangi maqolalar" href="/blog" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
        {[
          { title: "Boshlovchilar uchun", href: "/kategoriya/junior", posts: junior },
          { title: "Xorijda o'qish", href: "/kategoriya/universitet", posts: study },
        ].map((block) => (
          <div key={block.href} className="rounded-2xl border border-line bg-card p-5 sm:p-6">
            <SectionHeading title={block.title} href={block.href} />
            <div className="divide-y divide-line">
              {block.posts.map((post) => (
                <ArticleCard key={post.slug} post={post} variant="compact" />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
