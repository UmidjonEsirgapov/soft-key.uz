import type { ScrapedArticle, RewriteResult } from "./utils";

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "data-science": ["data", "science", "machine", "learning", "ai", "python", "pytorch"],
  dasturlash: ["dasturlash", "dastur", "kod", "algoritm", "vim", "solid", "framework"],
  karyera: ["ish", "karyera", "phd", "junior", "senior", "ishga"],
  "oquv-kurslar": ["kurs", "oquv", "markaz", "akademiya", "maktab", "bepul"],
  universitet: ["universitet", "yaponiya", "spi", "bakalavr", "talaba"],
  backend: ["backend", "django", "laravel", "framework", "ssl"],
  mobil: ["android", "sdk", "mobil"],
  junior: ["junior", "boshlangich", "yosh"],
  texnologiya: ["github", "tiktok", "texnologiya", "startup", "forum"],
  "shaxsiy-rivojlanish": ["rivojlanish", "pdp", "personal", "development", "plan"],
};

function pickCategories(article: ScrapedArticle): string[] {
  const text = `${article.title} ${article.plainText}`.toLowerCase();
  const scores = Object.entries(CATEGORY_KEYWORDS).map(([slug, keywords]) => ({
    slug,
    score: keywords.filter((k) => text.includes(k)).length,
  }));

  scores.sort((a, b) => b.score - a.score);
  const picked = scores.filter((s) => s.score > 0).slice(0, 2).map((s) => s.slug);

  if (picked.length < 2) {
    const defaults = ["dasturlash", "texnologiya"];
    for (const d of defaults) {
      if (!picked.includes(d) && picked.length < 2) picked.push(d);
    }
  }

  return picked.slice(0, 2);
}

function pickTags(article: ScrapedArticle): string[] {
  const words = `${article.title} ${article.excerpt}`
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04FF\s'-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3);

  const unique = [...new Set(words)].slice(0, 5);
  return unique.length > 0 ? unique : ["texnologiya", "talim"];
}

function formatContent(article: ScrapedArticle): string {
  const words = article.plainText.split(/\s+/).filter(Boolean);
  const excerpt = words.slice(0, 480).join(" ");

  const paragraphs = excerpt
    .split(/(?<=[.!?])\s+/)
    .reduce<string[]>((acc, sentence) => {
      const last = acc[acc.length - 1];
      if (!last || last.split(/\s+/).length > 80) {
        acc.push(sentence);
      } else {
        acc[acc.length - 1] = `${last} ${sentence}`;
      }
      return acc;
    }, [])
    .slice(0, 6);

  const linkSection =
    article.links.length > 0
      ? `\n\n## Foydali manbalar\n\n${article.links
          .slice(0, 8)
          .map((l) => `- [${l.text}](${l.href})`)
          .join("\n")}`
      : "";

  return `## Kirish\n\n${paragraphs.slice(0, 2).join("\n\n")}\n\n## Asosiy fikrlar\n\n${paragraphs.slice(2, 5).join("\n\n")}\n\n## Xulosa\n\n${paragraphs.slice(5).join(" ") || paragraphs[paragraphs.length - 1] || excerpt.slice(0, 200)}${linkSection}`;
}

export function generateFallbackRewrite(article: ScrapedArticle): RewriteResult {
  const description = article.excerpt.slice(0, 155) || article.plainText.slice(0, 155);

  return {
    title: article.title,
    description: description.length > 155 ? `${description.slice(0, 152)}...` : description,
    content: formatContent(article),
    categories: pickCategories(article),
    tags: pickTags(article),
  };
}
