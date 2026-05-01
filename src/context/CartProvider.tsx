import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getStoredCart, persistCart } from 'src/services/cartService';
import type { CartItem } from 'src/types/cart.type';
import type { Product } from 'src/types/product.type';
import { CartContext } from './CartContext';

type CartProviderProps = {
  children: ReactNode;
};

const SHIPPING_PRICE = 29.9;

function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => getStoredCart());

  useEffect(() => {
    persistCart(items);
  }, [items]);

  function addToCart(product: Product) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  const getProductQuantity = useCallback(
    (productId: string) => items.find((item) => item.id === productId)?.quantity ?? 0,
    [items]
  );

  function incrementQuantity(productId: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function removeFromCart(productId: string) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  }

  function decrementQuantity(productId: string) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  function finishOrder() {
    setItems([]);
  }

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const shipping = items.length > 0 ? SHIPPING_PRICE : 0;

  const total = subtotal + shipping;

  const value = useMemo(
    () => ({
      items,
      totalItems,
      subtotal,
      shipping,
      total,
      addToCart,
      incrementQuantity,
      decrementQuantity,
      removeFromCart,
      getProductQuantity,
      clearCart,
      finishOrder,
    }),
    [items, totalItems, subtotal, shipping, total, getProductQuantity]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
