import { createContext } from 'react';
import type { CartContextValue } from 'src/types/cart.type';

export const CartContext = createContext<CartContextValue | null>(null);
