import { useNavigate } from 'react-router-dom';

import useCart from 'src/hooks/useCart';
import type { Product } from 'src/types/product.type';

export default function useBuyNow() {
  const navigate = useNavigate();

  const { addToCart, getProductQuantity } = useCart();

  function buyNow(product: Product) {
    const quantity = getProductQuantity(product.id);

    if (quantity === 0) {
      addToCart(product);
    }

    navigate('/carrinho');
  }

  return {
    buyNow,
  };
}
