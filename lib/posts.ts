import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostFrontmatter } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function parsePost(filename: string): Post {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    ...(data as PostFrontmatter),
    content: content.trim(),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map(parsePost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
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
