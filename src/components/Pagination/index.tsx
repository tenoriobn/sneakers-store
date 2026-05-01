import type { PaginationProps } from './pagination.type';

export default function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
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
            aria-current={isActive ? 'page' : undefined}
            className={`transition-default flex h-11 w-11 items-center justify-center rounded-xl border font-medium ${
              isActive
                ? 'border-orange-400 bg-orange-400 text-white'
                : 'border-zinc-300 bg-white hover:border-orange-400/75 hover:bg-orange-400/75 hover:text-white active:scale-95 active:border-orange-400/85 active:bg-orange-400/85 active:text-white'
            }`}
          >
            {page}
          </button>
        );
      })}
    </nav>
  );
}
