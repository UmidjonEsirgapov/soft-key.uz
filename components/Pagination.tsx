interface PaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
}

function getVisiblePages(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}

export function Pagination({
  basePath,
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);
  const prevHref =
    currentPage > 2
      ? `${basePath}?page=${currentPage - 1}`
      : currentPage === 2
        ? basePath
        : undefined;
  const nextHref =
    currentPage < totalPages
      ? `${basePath}?page=${currentPage + 1}`
      : undefined;

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10"
      aria-label="Sahifalar"
    >
      {prevHref ? (
        <a
          href={prevHref}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          aria-label="Oldingi sahifa"
        >
          ←
        </a>
      ) : (
        <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-100 px-3 text-sm text-slate-300">
          ←
        </span>
      )}

      <div className="flex max-w-full flex-wrap justify-center gap-1.5 sm:gap-2">
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex min-h-11 min-w-8 items-center justify-center text-slate-400"
            >
              …
            </span>
          ) : (
            <a
              key={page}
              href={page === 1 ? basePath : `${basePath}?page=${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-3 text-sm font-medium ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {page}
            </a>
          )
        )}
      </div>

      {nextHref ? (
        <a
          href={nextHref}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          aria-label="Keyingi sahifa"
        >
          →
        </a>
      ) : (
        <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-100 px-3 text-sm text-slate-300">
          →
        </span>
      )}
    </nav>
  );
}
