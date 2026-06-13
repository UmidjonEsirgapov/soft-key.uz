export interface Category {
  slug: string;
  name: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt?: string;
  image?: string;
  categories: string[];
  tags: string[];
  sourceUrl?: string;
  wordCount?: number;
}

export interface Post extends PostFrontmatter {
  content: string;
}
