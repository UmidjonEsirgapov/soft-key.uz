import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import {
  RAW_DIR,
  SCRAPE_ERRORS,
  ScrapedArticle,
  ensureDir,
  parseArgs,
  sleep,
} from "./lib/utils";

const BASE_URL = "https://www.texnoman.uz";

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "SoftKeyBot/1.0 (content migration)",
      Accept: "text/html",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }

  return res.text();
}

function normalizeUrl(href: string): string {
  if (href.startsWith("http")) return href;
  if (href.startsWith("//")) return `https:${href}`;
  return `${BASE_URL}${href.startsWith("/") ? "" : "/"}${href}`;
}

function extractSlugFromPostUrl(url: string): string | null {
  const match = url.match(/\/post\/([^/.]+)\.html/);
  return match ? match[1] : null;
}

async function collectArticleUrls(): Promise<string[]> {
  const urls = new Set<string>();
  const LISTING_BASE = `${BASE_URL}/posts/talim`;

  let page = 1;
  let prevSize = 0;

  while (page <= 50) {
    const pageUrl =
      page === 1 ? LISTING_BASE : `${LISTING_BASE}?Post_page=${page}`;

    console.log(`Listing: ${pageUrl}`);
    const html = await fetchHtml(pageUrl);
    const $ = cheerio.load(html);

    $("a[href]").each((_, el) => {
      const href = $(el).attr("href");
      if (!href) return;

      const full = normalizeUrl(href.split("#")[0]);
      if (full.includes("/post/") && full.endsWith(".html")) {
        urls.add(full);
      }
    });

    if (urls.size === prevSize) {
      break;
    }

    prevSize = urls.size;
    page++;
    await sleep(1200);
  }

  return Array.from(urls);
}

function extractArticleContent($: cheerio.CheerioAPI): {
  htmlContent: string;
  plainText: string;
  links: { text: string; href: string }[];
} {
  const selectors = [
    ".post-content",
    ".article-content",
    ".entry-content",
    "#post-content",
    "article .content",
    ".blog-post-content",
    "article",
    ".container .row .col",
  ];

  let $content = $("body");
  for (const sel of selectors) {
    const found = $(sel).first();
    if (found.length && found.text().trim().length > 200) {
      $content = found;
      break;
    }
  }

  if ($content.is("body")) {
    $("header, nav, footer, .sidebar, .comments, script, style").remove();
    const h1 = $("h1").first();
    if (h1.length) {
      const node = h1.parent();
      if (node.text().trim().length > 200) {
        $content = node;
      }
    }
  }

  $content.find("script, style, .comments, .related-posts, .author-box").remove();

  const links: { text: string; href: string }[] = [];
  $content.find("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    const text = $(el).text().trim();
    if (href && text && !href.startsWith("#")) {
      links.push({ text, href: normalizeUrl(href) });
    }
  });

  const htmlContent = $content.html()?.trim() ?? "";
  const plainText = $content.text().replace(/\s+/g, " ").trim();

  return { htmlContent, plainText, links };
}

async function scrapeArticle(url: string): Promise<ScrapedArticle> {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const slug = extractSlugFromPostUrl(url);
  if (!slug) throw new Error(`Invalid post URL: ${url}`);

  const title =
    $("h1").first().text().trim() ||
    $('meta[property="og:title"]').attr("content")?.trim() ||
    $("title").text().replace(/ - Texnoman\.uz$/, "").trim();

  const excerpt =
    $('meta[name="description"]').attr("content")?.trim() ||
    $('meta[property="og:description"]').attr("content")?.trim() ||
    "";

  let image =
    $('meta[property="og:image"]').attr("content") ||
    $("article img, .post-content img, .content img, #post img").first().attr("src");

  if (image) {
    image = normalizeUrl(image);
    if (image.includes("/logo") || image.includes("/assets/")) {
      const articleImg = $("#post img, article img")
        .map((_, el) => $(el).attr("src"))
        .get()
        .find((src) => src && src.includes("/uploads/"));
      if (articleImg) image = normalizeUrl(articleImg);
    }
  }

  const dateMeta = $('meta[property="article:published_time"]').attr("content");
  const dateText = $(".date, .post-date, time").first().attr("datetime") ||
    $(".date, .post-date, time").first().text().trim();
  const publishedAt = dateMeta || parseTexnomanDate(dateText) || new Date().toISOString().slice(0, 10);

  const { htmlContent, plainText, links } = extractArticleContent($);

  return {
    title,
    slug,
    excerpt,
    publishedAt,
    image,
    htmlContent,
    plainText,
    links,
    sourceUrl: url,
  };
}

function parseTexnomanDate(text: string): string | null {
  if (!text) return null;
  const match = text.match(/(\d{2})\/(\d{2})\/(\d{2})/);
  if (match) {
    const [, dd, mm, yy] = match;
    const year = Number(yy) < 50 ? `20${yy}` : `19${yy}`;
    return `${year}-${mm}-${dd}`;
  }
  return null;
}

async function main() {
  const flags = parseArgs();
  const force = flags.force === true;

  ensureDir(RAW_DIR);
  const errors: { url: string; error: string }[] = [];

  console.log("Collecting article URLs from Ta'lim blog...");
  const articleUrls = await collectArticleUrls();
  console.log(`Found ${articleUrls.length} articles`);

  for (const url of articleUrls) {
    const slug = extractSlugFromPostUrl(url);
    if (!slug) continue;

    const outPath = path.join(RAW_DIR, `${slug}.json`);
    if (!force && fs.existsSync(outPath)) {
      console.log(`Skip (exists): ${slug}`);
      continue;
    }

    try {
      console.log(`Scraping: ${slug}`);
      const article = await scrapeArticle(url);
      fs.writeFileSync(outPath, JSON.stringify(article, null, 2), "utf8");
      await sleep(1500);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Error: ${slug} — ${message}`);
      errors.push({ url, error: message });
    }
  }

  if (errors.length > 0) {
    fs.writeFileSync(SCRAPE_ERRORS, JSON.stringify(errors, null, 2), "utf8");
    console.log(`\n${errors.length} errors saved to data/scrape-errors.json`);
  }

  console.log("\nScraping complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
