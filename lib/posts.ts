import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostFrontmatter } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const COVERS_DIR = path.join(process.cwd(), "public", "covers");
const WORDS_PER_MINUTE = 200;

// A tag page is only worth linking to when it groups several posts.
export const MIN_LINKED_TAG_POSTS = 2;

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function parsePost(filename: string): Post {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  const coverFile = `${frontmatter.slug}.webp`;
  const words = countWords(content);

  return {
    ...frontmatter,
    content: content.trim(),
    image: fs.existsSync(path.join(COVERS_DIR, coverFile))
      ? `/covers/${coverFile}`
      : undefined,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}

let cache: Post[] | undefined;

export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;

  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  cache = files
    .map(parsePost)
    .sort(
      (a, b) =>
        new Date(b.updatedAt ?? b.date).getTime() -
          new Date(a.updatedAt ?? a.date).getTime() ||
        (b.wordCount ?? 0) - (a.wordCount ?? 0)
    );

  return cache;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((p) => p.categories.includes(categorySlug));
}

export function getPostsByTag(tagSlug: string): Post[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tagSlug.toLowerCase())
  );
}

export function getAllTags(): { slug: string; count: number }[] {
  const tagCounts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const slug = tag.toLowerCase();
      tagCounts.set(slug, (tagCounts.get(slug) ?? 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}

export function getLinkedTags(tags: string[]): string[] {
  const counts = new Map(getAllTags().map((t) => [t.slug, t.count]));
  return tags.filter(
    (tag) => (counts.get(tag.toLowerCase()) ?? 0) >= MIN_LINKED_TAG_POSTS
  );
}

export function getCategoryCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const cat of post.categories) {
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
  }
  return counts;
}

export function getLatestPostDate(): Date {
  const times = getAllPosts().map((p) =>
    new Date(p.updatedAt ?? p.date).getTime()
  );
  return new Date(Math.max(...times));
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getAdjacentPosts(slug: string): {
  previous?: Post;
  next?: Post;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return { previous: posts[index + 1], next: posts[index - 1] };
}

export function paginatePosts(
  posts: Post[],
  page: number,
  perPage = 12
): { posts: Post[]; totalPages: number; currentPage: number } {
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;

  return {
    posts: posts.slice(start, start + perPage),
    totalPages,
    currentPage,
  };
}

export function formatDate(date: string): string {
  const months = [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun",
    "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
  ];
  const d = new Date(date);
  return `${d.getDate()}-${months[d.getMonth()]}, ${d.getFullYear()}`;
}
