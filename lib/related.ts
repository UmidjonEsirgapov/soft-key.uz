import type { Post } from "./types";
import { getAllPosts } from "./posts";

export function getRelatedPosts(current: Post, limit = 4): Post[] {
  const all = getAllPosts().filter((p) => p.slug !== current.slug);

  const scored = all.map((post) => {
    let score = 0;

    for (const cat of post.categories) {
      if (current.categories.includes(cat)) {
        score += 3;
      }
    }

    for (const tag of post.tags) {
      if (current.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        score += 1;
      }
    }

    return { post, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}
