import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildPageMetadata, getSiteUrl } from "@/lib/seo";
import { getAllPosts, paginatePosts } from "@/lib/posts";

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
  const { posts, totalPages, currentPage } = paginatePosts(getAllPosts(), page);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Maqolalar" },
        ]}
      />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:mb-8 sm:text-3xl">
        Maqolalar
        {currentPage > 1 && (
          <span className="ml-2 text-lg font-normal text-slate-500 sm:text-xl">
            — {currentPage}-sahifa
          </span>
        )}
      </h1>
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination
            basePath="/blog"
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <p className="text-slate-500">Hozircha maqolalar mavjud emas.</p>
      )}
    </div>
  );
}
