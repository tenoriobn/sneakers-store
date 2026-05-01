import { NavLink } from 'react-router-dom';
import useCart from 'src/hooks/useCart';

export default function Header() {
  const { totalItems } = useCart();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-default hover:text-orange-400/75 active:scale-95 active:text-orange-400/85 ${
      isActive ? 'text-orange-400' : ''
    }`;

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-480 items-center justify-between px-4 py-6 md:px-8 md:py-8 xl:px-21">
        <NavLink to="/" className="text-xl font-bold">
          Store
        </NavLink>

        <nav className="flex items-center gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/carrinho" className={linkClass}>
            <span className="flex items-center gap-1">
              Carrinho
              {totalItems > 0 && (
                <span className="transition-default inline-flex aspect-square min-h-6 min-w-6 items-center justify-center rounded-full bg-orange-400 px-2 text-xs font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
