import ProductCard from 'src/components/ProductCard';
import ProductFilters from 'src/components/ProductFilters';
import Pagination from 'src/components/Pagination';
import useProducts from 'src/hooks/useProducts';

export default function Home() {
  const { products, categories, pages, filters, isLoading, error, updateFilters, changePage } =
    useProducts();

  return (
    <section aria-labelledby="products-heading">
      <header className="mb-10">
        <p className="text-sm font-medium tracking-[0.2em] text-orange-400 uppercase">
          Loja virtual
        </p>

        <h1 id="products-heading" className="mt-3 text-4xl font-bold text-zinc-900">
          Produtos em destaque
        </h1>

        <p className="mt-3 text-zinc-500">
          Explore nossa coleção com produtos modernos, funcionais e selecionados para o dia a dia.
        </p>
      </header>

      <ProductFilters categories={categories} filters={filters} onChange={updateFilters} />

      {isLoading && (
        <div role="status" aria-live="polite" className="py-20 text-center text-lg text-zinc-500">
          Carregando produtos...
        </div>
      )}

      {!isLoading && error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-red-700"
        >
          {error}
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-zinc-200 bg-white px-6 py-12 text-center text-zinc-500"
        >
          Nenhum produto encontrado.
        </div>
      )}

      {!isLoading && !error && products.length > 0 && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination currentPage={filters.page} totalPages={pages} onChange={changePage} />
        </>
      )}
    </section>
  );
}
