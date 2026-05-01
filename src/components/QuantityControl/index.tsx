import useCart from 'src/hooks/useCart';
import type { QuantityControlProps } from './quantityControl.type';

export default function QuantityControl({ product, fullWidth = false }: QuantityControlProps) {
  const { addToCart, incrementQuantity, decrementQuantity, getProductQuantity } = useCart();

  const quantity = getProductQuantity(product.id);

  const isMinusDisabled = quantity === 0;

  function handleIncrease() {
    if (quantity === 0) {
      addToCart(product);
      return;
    }

    incrementQuantity(product.id);
  }

  function handleDecrease() {
    if (isMinusDisabled) return;

    decrementQuantity(product.id);
  }

  return (
    <div
      className={`flex items-center overflow-hidden rounded-xl border border-zinc-300/50 bg-white ${
        fullWidth ? 'w-full' : 'w-fit'
      }`}
      role="group"
      aria-label={`Controle de quantidade de ${product.name}`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={isMinusDisabled}
        aria-label="Diminuir quantidade"
        className="transition-default flex h-12 w-12 items-center justify-center bg-orange-400 text-xl font-medium text-white hover:bg-orange-400/75 active:bg-orange-400/85 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-orange-400 disabled:active:bg-orange-400"
      >
        -
      </button>

      <span
        className="flex h-12 flex-1 items-center justify-center border-x border-zinc-300/50 px-4 text-center font-semibold"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="sr-only">Quantidade atual:</span>
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        aria-label="Aumentar quantidade"
        className="transition-default flex h-12 w-12 items-center justify-center bg-orange-400 text-xl font-medium text-white hover:bg-orange-400/75 active:bg-orange-400/85 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-orange-400 disabled:active:bg-orange-400"
      >
        +
      </button>
    </div>
  );
}
