import { Link } from "react-router-dom";

import useCart from "src/hooks/useCart";

import type { ProductCardProps } from "./productCard.type";

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(product);
  }

  return (
    <article
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      aria-label={product.name}
    >
      <div className="aspect-square bg-zinc-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-4 p-5">
        <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
          {product.category}
        </span>

        <div>
          <h2 className="line-clamp-2 text-lg font-semibold text-zinc-900">
            {product.name}
          </h2>

          <p className="mt-2 text-sm text-zinc-500">{product.description}</p>
        </div>

        <strong className="block text-2xl font-bold text-zinc-900">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </strong>

        <div className="flex gap-3">
          <Link
            to={`/produto/${product.id}`}
            className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 text-center font-medium transition hover:bg-zinc-100"
          >
            Ver detalhes
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 cursor-pointer rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white transition hover:bg-zinc-700"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
