import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getStoredCart, persistCart } from "src/services/cartService";

import type { CartContextValue, CartItem } from "src/types/cart.type";
import type { Product } from "src/types/product.type";

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextValue | null>(null);

function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getStoredCart());
  }, []);

  useEffect(() => {
    persistCart(items);
  }, [items]);

  function addToCart(product: Product) {
    setItems((currentItems) => {
      const existingProduct = currentItems.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
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

  function removeFromCart(productId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      totalItems,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [items, totalItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
