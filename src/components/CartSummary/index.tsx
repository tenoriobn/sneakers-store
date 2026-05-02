import useCart from 'src/hooks/useCart';
import type { CartSummaryProps } from './cartSummary.type';
import { formatPrice } from 'src/utils/formatPrice';

export default function CartSummary({ subtotal, shipping, total }: CartSummaryProps) {
  const { clearCart, finishOrder } = useCart();

  return (
    <aside
      className="sticky top-26 h-max rounded-3xl border border-zinc-200 bg-white p-6 md:top-30"
      aria-labelledby="cart-summary-title"
    >
      <header>
        <h2 id="cart-summary-title" className="text-2xl font-bold">
          Resumo
        </h2>
      </header>

      <dl className="mt-6 space-y-4">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>
            <strong>{formatPrice(subtotal)}</strong>
          </dd>
        </div>

        <div className="flex justify-between">
          <dt>Frete</dt>
          <dd>
            <strong>{formatPrice(shipping)}</strong>
          </dd>
        </div>

        <div className="border-t border-zinc-200 pt-4">
          <div className="flex justify-between text-lg">
            <dt>Total</dt>
            <dd>
              <strong>{formatPrice(total)}</strong>
            </dd>
          </div>
        </div>
      </dl>

      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={finishOrder}
          className="transition-default h-14 w-full rounded-2xl bg-orange-400 font-semibold text-white hover:bg-orange-400/75 active:scale-95 active:bg-orange-400/85"
        >
          Finalizar compra
        </button>

        <button
          type="button"
          onClick={clearCart}
          className="transition-default h-14 w-full rounded-2xl border border-orange-400 font-semibold text-orange-400 hover:border-orange-400/75 active:scale-95 active:border-orange-400/85"
        >
          Limpar carrinho
        </button>
      </div>
    </aside>
  );
}
