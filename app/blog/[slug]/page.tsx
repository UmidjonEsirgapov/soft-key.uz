import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryBadge } from "@/components/CategoryBadge";
import { TagList } from "@/components/TagList";
import { MarkdownContent } from "@/components/MarkdownContent";
import { RelatedPosts } from "@/components/RelatedPosts";
import { JsonLd } from "@/components/JsonLd";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { getRelatedPosts } from "@/lib/related";
import { markdownToHtml } from "@/lib/markdown";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildPostMetadata,
} from "@/lib/seo";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildPostMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const html = await markdownToHtml(post.content);
  const related = getRelatedPosts(post);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={[
          buildArticleJsonLd(post),
          buildBreadcrumbJsonLd([
            { name: "Bosh sahifa", path: "/" },
            { name: "Maqolalar", path: "/blog" },
            { name: post.title },
          ]),
        ]}
      />

      <Breadcrumbs
        items={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Maqolalar", href: "/blog" },
          { label: post.title },
        ]}
      />

      <header className="mb-6 sm:mb-8">
        <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
          {post.categories.map((cat) => (
            <CategoryBadge key={cat} slug={cat} />
          ))}
        </div>
        <h1 className="mb-3 text-2xl font-bold leading-tight text-slate-900 sm:mb-4 sm:text-3xl lg:text-4xl">
          {post.title}
        </h1>
        <p className="mb-3 text-base leading-relaxed text-slate-600 sm:mb-4 sm:text-lg">
          {post.description}
        </p>
        <time dateTime={post.date} className="text-sm text-slate-400">
          {new Date(post.date).toLocaleDateString("uz-UZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      {post.image && (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl sm:mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, 720px"
          />
        </div>
      )}

      <MarkdownContent html={html} />

      <div className="mt-6 border-t border-slate-200 pt-5 sm:mt-8 sm:pt-6">
        <TagList tags={post.tags} />
      </div>

      <RelatedPosts posts={related} />
    </article>
  );
}
