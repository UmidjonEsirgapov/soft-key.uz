export interface Category {
  slug: string;
  name: string;
  short: string;
  color: string;
  description: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt?: string;
  categories: string[];
  tags: string[];
  wordCount?: number;
}

export interface Post extends PostFrontmatter {
  content: string;
  image?: string;
  readingMinutes: number;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}
