import { Routes, Route } from 'react-router-dom';

import BaseLayout from 'src/layouts/BaseLayout';
import Home from 'src/pages/Home';
import ProductDetail from 'src/pages/ProductDetail';
import Cart from 'src/pages/Cart';

export default function RoutesProvider() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<ProductDetail />} />
        <Route path="/carrinho" element={<Cart />} />
      </Route>
    </Routes>
  );
}
