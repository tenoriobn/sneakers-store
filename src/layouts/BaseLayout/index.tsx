import { Outlet, Link } from "react-router-dom";

import useCart from "src/hooks/useCart";

function BaseLayout() {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-8 xl:px-[84px]">
          <Link to="/" className="text-xl font-bold">
            Store
          </Link>

          <nav className="flex items-center gap-6">
            <Link to="/" className="transition hover:opacity-70">
              Home
            </Link>

            <Link
              to="/carrinho"
              className="relative transition hover:opacity-70"
              aria-label={`Carrinho com ${totalItems} itens`}
            >
              Carrinho
              {totalItems > 0 && (
                <span className="absolute -right-4 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-zinc-900 px-2 text-xs font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 md:px-8 xl:px-[84px]">
        <Outlet />
      </main>
    </div>
  );
}

export default BaseLayout;
