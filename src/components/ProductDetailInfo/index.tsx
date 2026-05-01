import type { ProductDetailInfoProps } from './productDetailInfo.type';
import QuantityControl from '../QuantityControl';
import useBuyNow from 'src/hooks/useBuyNow';

export default function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const { buyNow } = useBuyNow();

  return (
    <section className="grid gap-10 lg:grid-cols-2" aria-labelledby="product-title">
      <figure className="overflow-hidden rounded-3xl bg-zinc-100">
        <img
          src={product.image}
          alt={`Imagem do produto ${product.name}`}
          className="transition-default aspect-square h-full w-full object-cover hover:scale-105"
        />
      </figure>

      <div className="flex flex-col justify-center">
        <span
          className="mb-4 inline-flex w-fit rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-orange-400"
          aria-label={`Categoria do produto: ${product.category}`}
        >
          {product.category}
        </span>

        <h1 id="product-title" className="text-4xl font-bold text-zinc-900">
          {product.name}
        </h1>

        <p
          className="mt-6 text-5xl font-bold text-zinc-900"
          aria-label={`Preço do produto ${product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}`}
        >
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>

        <p className="mt-6 text-lg leading-8 text-zinc-500">{product.description}</p>

        <div className="mt-10">
          <QuantityControl product={product} />
        </div>

        <button
          type="button"
          onClick={() => buyNow(product)}
          className="transition-default mt-10 h-14 cursor-pointer rounded-2xl bg-orange-400 px-8 font-semibold text-white hover:bg-orange-400/75 active:scale-95 active:bg-orange-400/85"
          aria-label={`Comprar produto ${product.name}`}
        >
          Comprar
        </button>
      </div>
    </section>
  );
}
