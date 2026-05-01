import type { CartItem } from 'src/types/cart.type';

const CART_STORAGE_KEY = 'sneakers-store:cart';

export function getStoredCart() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    return JSON.parse(storedCart) as CartItem[];
  } catch {
    return [];
  }
}

export function persistCart(cartItems: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
}
