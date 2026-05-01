import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ProductDetailInfo from "src/components/ProductDetailInfo";
import RelatedProducts from "src/components/RelatedProducts";
import {
  getProductById,
  getRelatedProducts,
} from "src/services/productService";

import type { Product } from "src/types/product.type";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        setError("");

        const foundProduct = await getProductById(id as string);

        setProduct(foundProduct);

        const related = await getRelatedProducts(
          foundProduct.category,
          foundProduct.id,
        );

        setRelatedProducts(related);
      } catch {
        setError("Produto não encontrado.");
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
      <div className="py-20 text-center text-lg text-zinc-500">
        Carregando produto...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700">
        {error}
      </div>
    );
  }

  return (
    <>
      <nav
        className="mb-10 flex items-center gap-2 text-sm text-zinc-500"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-zinc-900">
          Home
        </Link>

        <span>/</span>

        <span className="text-zinc-900">{product.name}</span>
      </nav>

      <ProductDetailInfo product={product} />

      <RelatedProducts products={relatedProducts} />
    </>
  );
}

export default ProductDetail;
