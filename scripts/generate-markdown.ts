import fs from "fs";
import path from "path";
import type { PostFrontmatter } from "../lib/types";
import type { RewriteResult, ScrapedArticle } from "./lib/utils";
import { POSTS_DIR, ensureDir } from "./lib/utils";

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function generateMarkdownFile(
  raw: ScrapedArticle,
  result: RewriteResult
): string {
  const frontmatter: PostFrontmatter = {
    title: result.title,
    slug: raw.slug,
    description: result.description,
    date: raw.publishedAt,
    updatedAt: new Date().toISOString().slice(0, 10),
    image: raw.image,
    categories: result.categories,
    tags: result.tags,
    sourceUrl: raw.sourceUrl,
    wordCount: countWords(result.content),
  };

  const yaml = Object.entries(frontmatter)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([key, value]) => {
      if (typeof value === "number") {
        return `${key}: ${value}`;
      }
      if (Array.isArray(value)) {
        return `${key}: [${value.map((v) => `"${String(v).replace(/"/g, '\\"')}"`).join(", ")}]`;
      }
      return `${key}: "${String(value).replace(/"/g, '\\"')}"`;
    })
    .join("\n");

  return `---\n${yaml}\n---\n\n${result.content.trim()}\n`;
}

export function saveMarkdown(raw: ScrapedArticle, result: RewriteResult) {
  ensureDir(POSTS_DIR);
  const filePath = path.join(POSTS_DIR, `${raw.slug}.md`);
  fs.writeFileSync(filePath, generateMarkdownFile(raw, result), "utf8");
  return filePath;
}
