import { Link } from 'react-router-dom';

import CartItem from 'src/components/CartItem';
import CartSummary from 'src/components/CartSummary';
import SEO from 'src/components/SEO';
import useCart from 'src/hooks/useCart';

export default function Cart() {
  const { items, subtotal, shipping, total } = useCart();

  if (!items.length) {
    return (
      <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-20 text-center">
        <h1 className="text-4xl font-bold">Seu carrinho está vazio</h1>

        <p className="mt-4 text-zinc-500">Adicione produtos para continuar sua compra.</p>

        <Link
          to="/"
          className="mt-8 inline-flex h-14 items-center rounded-2xl bg-zinc-900 px-8 font-semibold text-white transition hover:bg-zinc-700"
        >
          Voltar para Home
        </Link>
      </section>
    );
  }

  return (
    <section>
      <SEO title="Carrinho" description="Confira seus produtos selecionados." />

      <header className="mb-10">
        <h1 className="text-4xl font-bold">Carrinho</h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <CartSummary subtotal={subtotal} shipping={shipping} total={total} />
      </div>
    </section>
  );
}
