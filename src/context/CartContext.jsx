import { useEffect, useMemo, useState } from 'react';
import { CartContext } from './cart-context.js';

const STORAGE_KEY = 'lilbo-cart-v2';

const defaultCart = {
  leftQuantity: 0,
  rightQuantity: 1,
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultCart;
      const parsed = JSON.parse(raw);
      return {
        leftQuantity: Number.isInteger(parsed.leftQuantity)
          ? Math.min(99, Math.max(0, parsed.leftQuantity))
          : 0,
        rightQuantity: Number.isInteger(parsed.rightQuantity)
          ? Math.min(99, Math.max(0, parsed.rightQuantity))
          : 0,
      };
    } catch {
      return defaultCart;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      setLeftQuantity: (quantity) =>
        setCart((prev) => ({ ...prev, leftQuantity: Math.min(99, Math.max(0, quantity)) })),
      setRightQuantity: (quantity) =>
        setCart((prev) => ({ ...prev, rightQuantity: Math.min(99, Math.max(0, quantity)) })),
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
