import { ArticleCard } from "./ArticleCard";
import type { Post } from "@/lib/types";

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-8 border-t border-slate-200 pt-8 sm:mt-12 sm:pt-10">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 sm:mb-6 sm:text-xl">
        O&apos;xshash maqolalar
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
