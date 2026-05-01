import useCart from 'src/hooks/useCart';

import type { CartSummaryProps } from './cartSummary.type';

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function CartSummary({ subtotal, shipping, total }: CartSummaryProps) {
  const { clearCart, finishOrder } = useCart();

  return (
    <aside className="sticky top-6 rounded-3xl border border-zinc-200 bg-white p-6">
      <h2 className="text-2xl font-bold">Resumo</h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>

        <div className="flex justify-between">
          <span>Frete</span>
          <strong>{formatPrice(shipping)}</strong>
        </div>

        <div className="border-t border-zinc-200 pt-4">
          <div className="flex justify-between text-lg">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={finishOrder}
        className="transition-default mt-8 h-14 w-full rounded-2xl bg-orange-400 font-semibold text-white hover:bg-orange-400/75 active:scale-95 active:bg-orange-400/85"
      >
        Finalizar compra
      </button>

      <button
        type="button"
        onClick={clearCart}
        className="transition-default mt-3 h-14 w-full rounded-2xl border border-orange-400 font-semibold text-orange-400 hover:border-orange-400/75 active:scale-95 active:border-orange-400/85"
      >
        Limpar carrinho
      </button>
    </aside>
  );
}

export default CartSummary;
