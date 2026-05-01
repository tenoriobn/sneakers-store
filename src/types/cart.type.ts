import type { Product } from "src/types/product.type";

export type CartItem = Product & {
  quantity: number;
};

export type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};
