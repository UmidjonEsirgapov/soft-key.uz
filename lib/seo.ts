import type { Metadata } from "next";
import type { Post } from "./types";
import { getCategoryName } from "./categories";

export const SITE_NAME = "Soft Key";
const DEFAULT_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://soft-key.uz";

export const DEFAULT_DESCRIPTION =
  "Soft Key — O'zbek tilidagi texnologiya, dasturlash va ta'lim haqidagi foydali maqolalar.";

export const DEFAULT_KEYWORDS = [
  "dasturlash",
  "texnologiya",
  "talim",
  "it karyera",
  "o'zbek tilida",
  "soft key",
];

export function getSiteUrl(): string {
  return DEFAULT_SITE_URL.replace(/\/$/, "");
}

const robotsConfig = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-snippet": 150,
    "max-image-preview": "large" as const,
    "max-video-preview": -1,
  },
};

export function buildPageMetadata({
  title,
  description,
  path = "",
  image,
  keywords,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
}): Metadata {
  const url = `${getSiteUrl()}${path}`;
  const ogImage = image ?? `${getSiteUrl()}/opengraph-image`;

  return {
    title: path === "/" ? `${SITE_NAME} — ${title}` : `${title} | ${SITE_NAME}`,
    description,
    keywords: keywords ?? DEFAULT_KEYWORDS,
    alternates: { canonical: url },
    robots: robotsConfig,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "uz_UZ",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildPostMetadata(post: Post): Metadata {
  const url = `${getSiteUrl()}/blog/${post.slug}`;
  const ogImage = post.image ?? `${getSiteUrl()}/opengraph-image`;

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    keywords: [...post.tags, ...post.categories.map(getCategoryName)],
    alternates: { canonical: url },
    robots: robotsConfig,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      locale: "uz_UZ",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export function buildWebsiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
    description: DEFAULT_DESCRIPTION,
    inLanguage: "uz",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  };
}

export function buildOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/opengraph-image`,
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path?: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? `${getSiteUrl()}${item.path}` : undefined,
    })),
  };
}

export function buildArticleJsonLd(post: Post): Record<string, unknown> {
  const url = `${getSiteUrl()}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    image: post.image ? [post.image] : [`${getSiteUrl()}/opengraph-image`],
    inLanguage: "uz",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${getSiteUrl()}/opengraph-image`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    keywords: post.tags.join(", "),
    articleSection: post.categories.map(getCategoryName).join(", "),
  };
}
