import useCart from "src/hooks/useCart";

import type { ProductDetailInfoProps } from "./productDetailInfo.type";

function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(product);
  }

  return (
    <section className="grid gap-10 lg:grid-cols-2">
      <div className="overflow-hidden rounded-3xl bg-zinc-100">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        <span className="mb-4 inline-flex w-fit rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700">
          {product.category}
        </span>

        <h1 className="text-4xl font-bold text-zinc-900">{product.name}</h1>

        <strong className="mt-6 block text-5xl font-bold text-zinc-900">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </strong>

        <p className="mt-6 text-lg leading-8 text-zinc-500">
          {product.description}
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-10 h-14 cursor-pointer rounded-2xl bg-zinc-900 px-8 font-semibold text-white transition hover:bg-zinc-700"
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </section>
  );
}

export default ProductDetailInfo;
