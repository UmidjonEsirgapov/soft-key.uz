import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { TocItem } from "./types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[‘’ʻʼ`']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .trim();
}

export async function markdownToHtml(
  markdown: string
): Promise<{ html: string; toc: TocItem[] }> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  const toc: TocItem[] = [];
  const used = new Set<string>();

  let html = result
    .toString()
    .replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level: string, inner: string) => {
      const text = stripTags(inner);
      let id = slugify(text) || "bolim";
      while (used.has(id)) id += "-2";
      used.add(id);
      toc.push({ id, text, level: Number(level) as 2 | 3 });
      return `<h${level} id="${id}">${inner}</h${level}>`;
    });

  html = html.replace(
    /<a href="(https?:\/\/(?!soft-key\.uz)[^"]+)"/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"'
  );

  return { html, toc };
}
