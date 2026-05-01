import ProductCard from "src/components/ProductCard";

import type { RelatedProductsProps } from "./relatedProducts.type";

function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="mt-20">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-zinc-900">
          Produtos relacionados
        </h2>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
