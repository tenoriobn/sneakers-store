import { Outlet } from 'react-router-dom';
import Header from 'src/components/Header';

function BaseLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />

      <main className="mx-auto w-full max-w-480 px-4 py-8 sm:px-6 md:px-8 xl:px-21">
        <Outlet />
      </main>
    </div>
  );
}

export default BaseLayout;
