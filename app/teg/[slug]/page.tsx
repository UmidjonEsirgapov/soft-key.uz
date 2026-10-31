import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PostGrid } from "@/components/PostGrid";
import { getAllTags, getPostsByTag, paginatePosts } from "@/lib/posts";
import { buildPageMetadata } from "@/lib/seo";

interface TagPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: tag.slug }));
}

// Tag pages are navigation aids only: never indexed, links still followed.
export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    ...buildPageMetadata({
      title: `#${slug}`,
      description: `${slug} tegi bo'yicha maqolalar — Soft Key blogi.`,
      path: `/teg/${slug}`,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const allTagPosts = getPostsByTag(decodeURIComponent(slug));

  if (allTagPosts.length === 0) {
    notFound();
  }

  const page = Number(query.page ?? "1");
  const { posts, totalPages, currentPage } = paginatePosts(allTagPosts, page);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Maqolalar", href: "/blog" },
          { label: `#${decodeURIComponent(slug)}` },
        ]}
        eyebrow={`${allTagPosts.length} ta maqola`}
        title={`#${decodeURIComponent(slug)}`}
      />
      <PostGrid posts={posts} basePath={`/teg/${slug}`} currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
