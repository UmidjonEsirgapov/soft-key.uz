import Link from "next/link";
import type { Post } from "@/lib/types";
import { getCategoryColor, getCategoryShort } from "@/lib/categories";
import { Cover } from "./Cover";

interface ArticleCardProps {
  post: Post;
  variant?: "default" | "featured" | "compact";
  priority?: boolean;
}

function Meta({ post }: { post: Post }) {
  const category = post.categories[0];

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-3">
      {category && (
        <span className="inline-flex items-center gap-1.5 text-ink-2">
          <span className="h-2 w-2 rounded-[3px]" style={{ background: getCategoryColor(category) }} />
          {getCategoryShort(category)}
        </span>
      )}
      <span aria-hidden>·</span>
      <span>{post.readingMinutes} daq o&apos;qish</span>
    </div>
  );
}

export function ArticleCard({ post, variant = "default", priority }: ArticleCardProps) {
  const href = `/blog/${post.slug}`;

  if (variant === "compact") {
    return (
      <Link href={href} className="group flex gap-4 py-4">
        <Cover post={post} sizes="96px" className="h-20 w-24 shrink-0 rounded-lg" />
        <div className="min-w-0">
          <Meta post={post} />
          <h3 className="mt-1.5 line-clamp-2 font-display text-[15px] font-semibold leading-snug text-ink group-hover:text-accent-ink">
            {post.title}
          </h3>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className="group grid overflow-hidden rounded-2xl border border-line bg-card transition hover:border-ink-3 md:grid-cols-[1.25fr_1fr]"
      >
        <Cover
          post={post}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 640px"
          className="aspect-[16/10] md:aspect-auto md:min-h-80"
        />
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <Meta post={post} />
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink group-hover:text-accent-ink sm:text-3xl">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-ink-2">{post.description}</p>
          <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-ink">
            O&apos;qishni boshlash
            <span className="transition group-hover:translate-x-1" aria-hidden>→</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition hover:-translate-y-0.5 hover:border-ink-3 hover:shadow-[0_6px_0_var(--key-shadow)]"
    >
      <Cover
        post={post}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
        className="aspect-[16/10]"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Meta post={post} />
        <h2 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-accent-ink">
          {post.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-2">{post.description}</p>
      </div>
    </Link>
  );
}
