import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getCategoryBySlug, categories } from "@/lib/categories";
import { getPostsByCategory, paginatePosts } from "@/lib/posts";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return buildPageMetadata({
    title: category.name,
    description: `${category.name} bo'yicha maqolalar — Soft Key blogi. Texnologiya va ta'lim mavzularida foydali kontent.`,
    path: `/kategoriya/${slug}`,
    keywords: [category.slug, category.name, "maqolalar", "soft key"],
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const page = Number(query.page ?? "1");
  const allPosts = getPostsByCategory(slug);
  const { posts, totalPages, currentPage } = paginatePosts(allPosts, page);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Bosh sahifa", path: "/" },
          { name: "Kategoriyalar", path: "/blog" },
          { name: category.name, path: `/kategoriya/${slug}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Maqolalar", href: "/blog" },
          { label: category.name },
        ]}
      />

      <h1 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
        {category.name}
      </h1>
      <p className="mb-6 text-sm text-slate-600 sm:mb-8 sm:text-base">
        {allPosts.length > 0
          ? `${allPosts.length} ta maqola`
          : "Hozircha maqolalar yo'q"}
      </p>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination
            basePath={`/kategoriya/${slug}`}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <p className="text-slate-500">Bu kategoriyada hozircha maqolalar yo&apos;q.</p>
      )}
    </div>
  );
}
