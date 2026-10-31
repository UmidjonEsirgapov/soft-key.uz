import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SearchBox, type SearchEntry } from "@/components/SearchBox";
import { getAllPosts } from "@/lib/posts";
import { getCategoryColor, getCategoryShort } from "@/lib/categories";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Qidiruv",
    description: "Soft Key maqolalari bo'yicha qidiruv.",
    path: "/qidiruv",
  }),
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const entries: SearchEntry[] = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    keywords: [...post.tags, ...post.categories].join(" "),
    category: getCategoryShort(post.categories[0] ?? ""),
    color: getCategoryColor(post.categories[0]),
    minutes: post.readingMinutes,
  }));

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Bosh sahifa", href: "/" }, { label: "Qidiruv" }]}
        title="Qidiruv"
        description="Sarlavha, mavzu yoki kalit so'z bo'yicha maqolani toping."
      />
      <SearchBox entries={entries} />
    </>
  );
}
