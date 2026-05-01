import useCart from 'src/hooks/useCart';
import type { CartItemProps } from './cartItem.type';

function CartItem({ item }: CartItemProps) {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

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
          <div className="flex items-center rounded-xl border border-zinc-300">
            <button
              type="button"
              onClick={() => decrementQuantity(item.id)}
              className="h-11 w-11 text-xl font-bold text-orange-400"
              aria-label="Diminuir quantidade"
            >
              -
            </button>

            <span className="min-w-12 text-center font-semibold">{item.quantity}</span>

            <button
              type="button"
              onClick={() => incrementQuantity(item.id)}
              className="h-11 w-11 text-xl font-bold text-orange-400"
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>

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
