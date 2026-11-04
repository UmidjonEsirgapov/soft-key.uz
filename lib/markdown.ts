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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface InlineLink {
  href: string;
  title: string;
}

function isTopLevel(before: string): boolean {
  const count = (re: RegExp) => (before.match(re) ?? []).length;
  return (
    count(/<(ul|ol|blockquote|table)[\s>]/g) === count(/<\/(ul|ol|blockquote|table)>/g)
  );
}

// Puts a "read also" card before a middle h2, so every post links to a related one in-content.
function insertInlineLink(html: string, link: InlineLink): string {
  const headings = [...html.matchAll(/<h2 /g)].map((m) => m.index ?? 0);
  // Short posts without sections get the card before a middle paragraph instead.
  const anchors =
    headings.length >= 2
      ? headings
      : [...html.matchAll(/<p>/g)]
          .map((m) => m.index ?? 0)
          .filter((i) => isTopLevel(html.slice(0, i)));
  if (anchors.length < 2) return html;
  const at = anchors[Math.floor(anchors.length / 2)];
  const card =
    `<aside class="read-also"><span>Shuningdek o'qing</span>` +
    `<a href="${link.href}">${escapeHtml(link.title)}</a></aside>\n`;
  return html.slice(0, at) + card + html.slice(at);
}

export async function markdownToHtml(
  markdown: string,
  inlineLink?: InlineLink
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

  if (inlineLink && !html.includes(`href="${inlineLink.href}"`)) {
    html = insertInlineLink(html, inlineLink);
  }

  return { html, toc };
}
