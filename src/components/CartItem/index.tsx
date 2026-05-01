import useCart from 'src/hooks/useCart';
import type { CartItemProps } from './cartItem.type';
import QuantityControl from '../QuantityControl';

function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useCart();

  return (
    <article className="flex flex-col gap-5 rounded-3xl border border-zinc-200 bg-white p-5 sm:flex-row">
      <img
        src={item.image}
        alt={item.name}
        className="h-40.5 w-full rounded-2xl object-cover sm:w-36"
      />

      <div className="flex flex-1 flex-col">
        <span className="text-sm text-zinc-500">{item.category}</span>

        <h2 className="mt-1 text-xl font-semibold">{item.name}</h2>

        <strong className="mt-3 text-2xl font-bold">
          {item.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </strong>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <QuantityControl product={item} />

          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="font-medium text-red-600"
          >
            Remover
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
