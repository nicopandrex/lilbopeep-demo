import { useEffect, useMemo, useState } from 'react';
import { CartContext } from './cart-context.js';

const STORAGE_KEY = 'lilbo-cart-v1';

const defaultCart = {
  handedness: 'Right-handed',
  quantity: 1,
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultCart;
      const parsed = JSON.parse(raw);
      return {
        handedness:
          parsed.handedness === 'Left-handed' ? 'Left-handed' : 'Right-handed',
        quantity: Number.isInteger(parsed.quantity)
          ? Math.min(99, Math.max(1, parsed.quantity))
          : 1,
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
      setHandedness: (handedness) => setCart((prev) => ({ ...prev, handedness })),
      setQuantity: (quantity) =>
        setCart((prev) => ({ ...prev, quantity: Math.min(99, Math.max(1, quantity)) })),
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
