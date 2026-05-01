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

const SHIPPING_PRICE = 29.9;

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
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
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

  function incrementQuantity(productId: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
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
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
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
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
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
      clearCart,
      finishOrder,
    }),
    [items, totalItems, subtotal, shipping, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
