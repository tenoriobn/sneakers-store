import Search from 'public/icons/search.svg?react';
import Filter from 'public/icons/filter.svg?react';
import ChevronUpDown from 'public/icons/chevron-up-down.svg?react';
import type { ProductFiltersProps } from './productFilters.type';
import Dropdown from '../Dropdown';
import type { ProductOrder } from 'src/types/product.type';

const ORDER_OPTIONS = [
  { value: 'name-asc', label: 'Nome (A-Z)' },
  { value: 'name-desc', label: 'Nome (Z-A)' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
];

export default function ProductFilters({ categories, filters, onChange }: ProductFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...filters, search: e.target.value });

  const categoryOptions = [
    { value: '', label: 'Todas categorias' },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  return (
    <section className="mb-10 grid gap-4 md:grid-cols-3 lg:gap-6">
      <div className="group relative">
        <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-orange-400" />

        <input
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Buscar produto..."
          className="h-12 w-full rounded-xl border border-zinc-200 bg-white pr-4 pl-11 text-zinc-700 shadow-sm transition-all outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10"
        />
      </div>

      <Dropdown
        icon={<Filter />}
        value={filters.category}
        placeholder="Todas categorias"
        options={categoryOptions}
        onChange={(val) => onChange({ ...filters, category: val })}
      />

      <Dropdown
        icon={<ChevronUpDown />}
        value={filters.order}
        placeholder="Ordenar"
        options={ORDER_OPTIONS}
        onChange={(val) => onChange({ ...filters, order: val as ProductOrder })}
      />
    </section>
  );
}
