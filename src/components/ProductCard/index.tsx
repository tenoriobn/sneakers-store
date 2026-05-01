import { Link } from 'react-router-dom';
import type { ProductCardProps } from './productCard.type';
import QuantityControl from '../QuantityControl';
import useBuyNow from 'src/hooks/useBuyNow';

export default function ProductCard({ product }: ProductCardProps) {
  const { buyNow } = useBuyNow();

  return (
    <article className="transition-default row-span-7 grid grid-rows-subgrid gap-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-zinc-100">
        <img
          src={product.image}
          alt={product.name}
          className="transition-default h-full w-full object-cover hover:scale-105"
        />
      </div>

      <span className="mx-5 mt-5 inline-flex w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-orange-400">
        {product.category}
      </span>

      <h2 className="mx-5 mt-5 text-lg font-semibold text-zinc-900">{product.name}</h2>

      <p className="mx-5 mt-2 text-sm text-zinc-500">{product.description}</p>

      <strong className="mx-5 mt-5 text-2xl font-bold text-zinc-900">
        {product.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </strong>

      <div className="mx-5 mt-5">
        <QuantityControl product={product} fullWidth />
      </div>

      <div className="m-5 flex flex-wrap gap-3">
        <Link
          to={`/produto/${product.id}`}
          className="transition-default min-w-35 flex-1 rounded-xl border border-orange-400 px-4 py-3 text-center font-medium whitespace-nowrap text-orange-400 hover:border-orange-400/75 active:scale-95 active:border-orange-400/85"
        >
          Ver detalhes
        </Link>

        <button
          type="button"
          onClick={() => buyNow(product)}
          className="transition-default min-w-35 flex-1 rounded-xl bg-orange-400 px-4 py-3 font-medium whitespace-nowrap text-white hover:bg-orange-400/75 active:scale-95 active:bg-orange-400/85"
        >
          Comprar
        </button>
      </div>
    </article>
  );
}
