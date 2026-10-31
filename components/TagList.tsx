import Link from "next/link";

interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/teg/${tag.toLowerCase()}`}
          className="keycap inline-flex min-h-9 items-center rounded-lg px-3 font-mono text-xs text-ink-2"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
