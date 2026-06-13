import categoriesData from "@/content/categories.json";
import type { Category } from "./types";

export const categories: Category[] = categoriesData;

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(slug: string): string {
  return getCategoryBySlug(slug)?.name ?? slug;
}
