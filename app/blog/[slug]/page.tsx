import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Cover } from "@/components/Cover";
import { TagList } from "@/components/TagList";
import { MarkdownContent } from "@/components/MarkdownContent";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ShareButtons } from "@/components/ShareButtons";
import { TableOfContents } from "@/components/TableOfContents";
import { JsonLd } from "@/components/JsonLd";
import {
  formatDate,
  getAdjacentPosts,
  getAllPostSlugs,
  getLinkedTags,
  getPostBySlug,
} from "@/lib/posts";
import { getRelatedPosts } from "@/lib/related";
import { markdownToHtml } from "@/lib/markdown";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildPostMetadata,
  getSiteUrl,
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

  const [inline, ...related] = getRelatedPosts(post, 4);
  const { html, toc } = await markdownToHtml(
    post.content,
    inline && { href: `/blog/${inline.slug}`, title: inline.title }
  );
  const tags = getLinkedTags(post.tags);
  const { previous, next } = getAdjacentPosts(post.slug);
  const updated = post.updatedAt ?? post.date;

  return (
    <>
      <ReadingProgress />
      <article>
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

        <header className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 sm:pt-12">
          <Breadcrumbs
            items={[
              { label: "Bosh sahifa", href: "/" },
              { label: "Maqolalar", href: "/blog" },
              { label: post.title },
            ]}
          />
          <div className="mb-5 flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <CategoryBadge key={cat} slug={cat} />
            ))}
          </div>
          <h1 className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-ink sm:text-[2.6rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wider text-ink-3">
            <time dateTime={updated}>{formatDate(updated)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} daqiqa o&apos;qish</span>
          </div>
        </header>

        <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6">
          <Cover
            post={post}
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="aspect-[16/9] rounded-2xl border border-line"
          />
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,680px)_1fr]">
          <div className="hidden lg:block" />
          <div className="min-w-0">
            {toc.length >= 3 && (
              <details className="mb-8 rounded-xl border border-line bg-card p-4 lg:hidden">
                <summary className="cursor-pointer font-display font-semibold text-ink">
                  Mundarija
                </summary>
                <ol className="mt-3 space-y-2 text-sm">
                  {toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                      <a href={`#${item.id}`} className="text-ink-2 hover:text-ink">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <MarkdownContent html={html} />

            <div className="mt-12 space-y-6 border-t border-dashed border-line pt-8">
              {tags.length > 0 && <TagList tags={tags} />}
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-3">
                  Foydali bo&apos;lsa, ulashing
                </p>
                <ShareButtons url={`${getSiteUrl()}/blog/${post.slug}`} title={post.title} />
              </div>
            </div>

            {(previous || next) && (
              <nav aria-label="Boshqa maqolalar" className="mt-10 grid gap-3 sm:grid-cols-2">
                {previous ? (
                  <Link href={`/blog/${previous.slug}`} className="keycap rounded-xl p-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-3">← Oldingi</span>
                    <span className="mt-1 line-clamp-2 block font-display font-semibold text-ink">{previous.title}</span>
                  </Link>
                ) : <span />}
                {next && (
                  <Link href={`/blog/${next.slug}`} className="keycap rounded-xl p-4 text-right">
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-3">Keyingi →</span>
                    <span className="mt-1 line-clamp-2 block font-display font-semibold text-ink">{next.title}</span>
                  </Link>
                )}
              </nav>
            )}
          </div>

          {toc.length >= 3 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}
        </div>
      </article>

      <RelatedPosts posts={related} />
    </>
  );
}
