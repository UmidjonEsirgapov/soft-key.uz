import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getAllTags, getPostsByTag, paginatePosts } from "@/lib/posts";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

interface TagPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;

  return buildPageMetadata({
    title: `#${slug}`,
    description: `${slug} tegi bo'yicha maqolalar — Soft Key blogi. Texnologiya va ta'lim mavzulari.`,
    path: `/teg/${slug}`,
    keywords: [slug, "teg", "maqolalar", "soft key"],
  });
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const allTagPosts = getPostsByTag(slug);

  if (allTagPosts.length === 0) {
    notFound();
  }

  const page = Number(query.page ?? "1");
  const { posts, totalPages, currentPage } = paginatePosts(allTagPosts, page);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Bosh sahifa", path: "/" },
          { name: "Maqolalar", path: "/blog" },
          { name: `#${slug}`, path: `/teg/${slug}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Maqolalar", href: "/blog" },
          { label: `#${slug}` },
        ]}
      />

      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:mb-8 sm:text-3xl">
        #{slug}
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination
        basePath={`/teg/${slug}`}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
