import type { Product } from "src/types/product.type";

export type CartItem = Product & {
  quantity: number;
};

export type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  addToCart: (product: Product) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  finishOrder: () => void;
};
