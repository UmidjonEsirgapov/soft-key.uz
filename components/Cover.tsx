import Image from "next/image";
import type { Post } from "@/lib/types";
import { getCategoryColor, getCategoryShort } from "@/lib/categories";

interface CoverProps {
  post: Post;
  sizes: string;
  priority?: boolean;
  className?: string;
}

// Covers share the category's pastel as backdrop, so a missing image still looks intentional.
export function Cover({ post, sizes, priority, className = "" }: CoverProps) {
  const category = post.categories[0];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: getCategoryColor(category) }}
    >
      {post.image ? (
        <Image
          src={post.image}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-xl border border-black/10 bg-white/70 px-4 py-3 font-display text-lg font-bold text-[#16171b] shadow-[0_4px_0_rgba(0,0,0,0.12)]">
            {category ? getCategoryShort(category) : "Soft Key"}
          </span>
        </div>
      )}
    </div>
  );
}
