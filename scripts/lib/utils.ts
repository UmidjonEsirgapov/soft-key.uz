import fs from "fs";
import path from "path";

export const ROOT = process.cwd();
export const RAW_DIR = path.join(ROOT, "data", "raw");
export const POSTS_DIR = path.join(ROOT, "content", "posts");
export const SCRAPE_ERRORS = path.join(ROOT, "data", "scrape-errors.json");
export const REWRITE_ERRORS = path.join(ROOT, "data", "rewrite-errors.json");

export function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function loadEnvFile(filename = ".env.local") {
  const filePath = path.join(ROOT, filename);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

export function parseArgs() {
  const args = process.argv.slice(2);
  const flags: Record<string, string | boolean> = {};

  for (const arg of args) {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      flags[key] = value ?? true;
    }
  }

  return flags;
}

export interface ScrapedArticle {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  image?: string;
  htmlContent: string;
  plainText: string;
  links: { text: string; href: string }[];
  sourceUrl: string;
}

export interface RewriteResult {
  title: string;
  description: string;
  content: string;
  categories: string[];
  tags: string[];
}
