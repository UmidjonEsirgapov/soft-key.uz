import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/types";
import { getCategoryName } from "@/lib/categories";

interface ArticleCardProps {
  post: Post;
}

export function ArticleCard({ post }: ArticleCardProps) {
  const primaryCategory = post.categories[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] bg-slate-100">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-sm text-slate-400">
              Soft Key
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          {primaryCategory && (
            <span className="mb-2 text-xs font-medium uppercase tracking-wide text-blue-600">
              {getCategoryName(primaryCategory)}
            </span>
          )}
          <h2 className="mb-2 text-lg font-semibold leading-snug text-slate-900 group-hover:text-blue-700">
            {post.title}
          </h2>
          <p className="mb-4 line-clamp-3 flex-1 text-sm text-slate-600">
            {post.description}
          </p>
          <time
            dateTime={post.date}
            className="text-xs text-slate-400"
          >
            {new Date(post.date).toLocaleDateString("uz-UZ", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </Link>
    </article>
  );
}
