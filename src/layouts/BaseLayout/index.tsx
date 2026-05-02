import { Outlet } from 'react-router-dom';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';

export default function BaseLayout() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-480 flex-1 px-4 pt-26 sm:px-6 md:px-8 md:pt-30 xl:px-21">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
