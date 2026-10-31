import categoriesData from "@/content/categories.json";
import type { Category } from "./types";

export const categories: Category[] = categoriesData;

const FALLBACK_COLOR = "#dcdfe6";

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(slug: string): string {
  return getCategoryBySlug(slug)?.name ?? slug;
}

export function getCategoryShort(slug: string): string {
  return getCategoryBySlug(slug)?.short ?? slug;
}

export function getCategoryColor(slug: string | undefined): string {
  return (slug && getCategoryBySlug(slug)?.color) || FALLBACK_COLOR;
}
