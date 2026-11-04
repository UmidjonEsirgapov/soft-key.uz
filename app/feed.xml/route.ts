import { getAllPosts } from "@/lib/posts";
import { getCategoryName } from "@/lib/categories";
import { DEFAULT_DESCRIPTION, getSiteUrl, SITE_NAME } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const site = getSiteUrl();
  const posts = getAllPosts().slice(0, 30);

  const items = posts
    .map((post) => {
      const url = `${site}/blog/${post.slug}`;
      const categories = post.categories
        .map((cat) => `<category>${escapeXml(getCategoryName(cat))}</category>`)
        .join("");
      const enclosure = post.image
        ? `<enclosure url="${site}${post.image}" type="image/webp" length="0"/>`
        : "";
      return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(post.updatedAt ?? post.date).toUTCString()}</pubDate><description>${escapeXml(post.description)}</description>${categories}${enclosure}</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${SITE_NAME}</title>
<link>${site}</link>
<description>${escapeXml(DEFAULT_DESCRIPTION)}</description>
<language>uz</language>
<atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
