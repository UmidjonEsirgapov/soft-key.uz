import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PostGrid } from "@/components/PostGrid";
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
    description: category.description,
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
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Bosh sahifa", path: "/" },
          { name: "Mavzular", path: "/mavzular" },
          { name: category.name, path: `/kategoriya/${slug}` },
        ])}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Mavzular", href: "/mavzular" },
          { label: category.name },
        ]}
        eyebrow={`${allPosts.length} ta maqola`}
        title={category.name}
        description={category.description}
        color={category.color}
      />
      <PostGrid
        posts={posts}
        basePath={`/kategoriya/${slug}`}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
