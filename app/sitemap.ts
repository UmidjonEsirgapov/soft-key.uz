import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { categories } from "@/lib/categories";
import { getAllPosts, getLatestPostDate } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const posts = getAllPosts();
  const lastContentUpdate = getLatestPostDate();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: lastContentUpdate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: lastContentUpdate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/mavzular`,
      lastModified: lastContentUpdate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/kategoriya/${cat.slug}`,
    lastModified: lastContentUpdate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}
