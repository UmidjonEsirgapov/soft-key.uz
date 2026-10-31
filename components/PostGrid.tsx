import type { Post } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";
import { Pagination } from "./Pagination";

interface PostGridProps {
  posts: Post[];
  basePath: string;
  currentPage: number;
  totalPages: number;
}

export function PostGrid({ posts, basePath, currentPage, totalPages }: PostGridProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <ArticleCard key={post.slug} post={post} priority={i < 3} />
            ))}
          </div>
          <Pagination basePath={basePath} currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <p className="text-ink-3">Hozircha maqolalar yo&apos;q.</p>
      )}
    </div>
  );
}
