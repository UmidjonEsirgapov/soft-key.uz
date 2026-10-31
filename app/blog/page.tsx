import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PostGrid } from "@/components/PostGrid";
import { buildPageMetadata, getSiteUrl } from "@/lib/seo";
import { getAllPosts, paginatePosts } from "@/lib/posts";
import { categories } from "@/lib/categories";

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = Number(params.page ?? "1");

  if (page <= 1) {
    return buildPageMetadata({
      title: "Maqolalar",
      description:
        "Soft Key blogidagi barcha maqolalar — texnologiya, dasturlash va ta'lim mavzularida.",
      path: "/blog",
    });
  }

  const base = buildPageMetadata({
    title: `Maqolalar — ${page}-sahifa`,
    description: `Soft Key blogi, ${page}-sahifa. Texnologiya va ta'lim haqidagi maqolalar.`,
    path: `/blog?page=${page}`,
  });

  return {
    ...base,
    alternates: {
      canonical: `${getSiteUrl()}/blog?page=${page}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const all = getAllPosts();
  const { posts, totalPages, currentPage } = paginatePosts(all, page);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Bosh sahifa", href: "/" }, { label: "Maqolalar" }]}
        eyebrow={`${all.length} ta maqola${currentPage > 1 ? ` · ${currentPage}-sahifa` : ""}`}
        title="Barcha maqolalar"
        description="Dasturlash, karyera, kurslar va ta'lim haqida yozilgan hamma narsa bir joyda."
      >
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategoriya/${cat.slug}`}
              className="keycap inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-ink-2"
            >
              <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: cat.color }} />
              {cat.short}
            </Link>
          ))}
        </div>
      </PageHeader>
      <PostGrid posts={posts} basePath="/blog" currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
