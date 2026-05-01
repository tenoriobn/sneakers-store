import type { ChangeEvent } from 'react';

import type { ProductFiltersProps } from './productFilters.type';

function ProductFilters({ categories, filters, onChange }: ProductFiltersProps) {
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onChange({
      search: event.target.value,
    });
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange({
      category: event.target.value,
    });
  }

  function handleOrderChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange({
      order: event.target.value as 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc',
    });
  }

  return (
    <section className="mb-10 grid gap-4 md:grid-cols-3">
      <input
        type="text"
        value={filters.search}
        onChange={handleSearchChange}
        placeholder="Buscar produto..."
        aria-label="Buscar produto"
        className="h-12 rounded-xl border border-zinc-300 px-4 transition outline-none focus:border-zinc-900"
      />

      <select
        value={filters.category}
        onChange={handleCategoryChange}
        aria-label="Filtrar por categoria"
        className="h-12 rounded-xl border border-zinc-300 px-4 transition outline-none focus:border-zinc-900"
      >
        <option value="">Todas categorias</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={filters.order}
        onChange={handleOrderChange}
        aria-label="Ordenar produtos"
        className="h-12 rounded-xl border border-zinc-300 px-4 transition outline-none focus:border-zinc-900"
      >
        <option value="name-asc">Nome (A-Z)</option>
        <option value="name-desc">Nome (Z-A)</option>
        <option value="price-asc">Menor preço</option>
        <option value="price-desc">Maior preço</option>
      </select>
    </section>
  );
}

export default ProductFilters;
