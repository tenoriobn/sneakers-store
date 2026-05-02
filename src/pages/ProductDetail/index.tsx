import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductDetailInfo from 'src/components/ProductDetailInfo';
import RelatedProducts from 'src/components/RelatedProducts';
import { getProductById, getRelatedProducts } from 'src/services/productService';
import type { Product } from 'src/types/product.type';
import SEO from 'src/components/SEO';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        setError('');

        const foundProduct = await getProductById(id as string);

        setProduct(foundProduct);

        const related = await getRelatedProducts(foundProduct.category, foundProduct.id);

        setRelatedProducts(related);
      } catch {
        setError('Produto não encontrado.');
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (isLoading) {
    return (
      <section
        className="py-20 text-center text-lg text-zinc-500"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        Carregando produto...
      </section>
    );
  }

  if (error || !product) {
    return (
      <section
        className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700"
        role="alert"
        aria-live="assertive"
      >
        {error}
      </section>
    );
  }

  return (
    <main>
      <SEO
        title={product.name}
        description={product.description}
        image={product.image}
        url={`https://sneakers-store-app.vercel.app/produto/${product.id}`}
      />

      <nav className="mb-10 flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/" className="hover:text-zinc-900">
              Home
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li aria-current="page" className="text-zinc-900">
            {product.name}
          </li>
        </ol>
      </nav>

      <section aria-labelledby="product-detail">
        <h1 id="product-detail" className="sr-only">
          Detalhes do produto {product.name}
        </h1>

        <ProductDetailInfo product={product} />
      </section>

      <section aria-labelledby="related-products">
        <h2 id="related-products" className="sr-only">
          Produtos relacionados
        </h2>

        <RelatedProducts products={relatedProducts} />
      </section>
    </main>
  );
}
