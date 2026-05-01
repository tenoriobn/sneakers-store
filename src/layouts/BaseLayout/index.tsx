import { Outlet } from 'react-router-dom';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';

function BaseLayout() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-480 px-4 py-8 sm:px-6 md:px-8 xl:px-21">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default BaseLayout;
