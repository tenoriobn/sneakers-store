import type { PaginationProps } from "./pagination.type";

function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-12 flex justify-center gap-2" aria-label="Paginação">
      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            aria-label={`Página ${page}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border font-medium transition ${
              isActive
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-300 bg-white hover:bg-zinc-100"
            }`}
          >
            {page}
          </button>
        );
      })}
    </nav>
  );
}

export default Pagination;
