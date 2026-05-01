import { Outlet, Link } from 'react-router-dom';

import useCart from 'src/hooks/useCart';

function BaseLayout() {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-480 items-center justify-between px-4 py-6 md:px-8 md:py-8 xl:px-21">
          <Link to="/" className="text-xl font-bold">
            Store
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="transition-default hover:text-orange-400/75 active:scale-95 active:text-orange-400/85"
            >
              Home
            </Link>

            <Link
              to="/carrinho"
              className="transition-default relative hover:text-orange-400/75 active:scale-95 active:text-orange-400/85"
              aria-label={`Carrinho com ${totalItems} itens`}
            >
              Carrinho
              {totalItems > 0 && (
                <span className="transition-default absolute -top-5 right-0 flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-400 px-2 text-xs font-semibold text-white hover:bg-orange-400/75 active:bg-orange-400/85">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-480 px-4 py-8 sm:px-6 md:px-8 xl:px-21">
        <Outlet />
      </main>
    </div>
  );
}

export default BaseLayout;
