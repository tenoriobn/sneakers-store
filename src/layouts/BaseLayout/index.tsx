import { Outlet, Link } from "react-router-dom";

function BaseLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-360 items-center justify-between px-4 sm:px-6 md:px-8 xl:px-21">
          <Link to="/" className="text-xl font-bold">
            Store
          </Link>

          <nav className="flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/carrinho">Carrinho</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-360 px-4 py-8 sm:px-6 md:px-8 xl:px-21">
        <Outlet />
      </main>
    </div>
  );
}

export default BaseLayout;
