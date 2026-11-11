import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { productById, salePrice, shippingFor } from '../utils/catalog';

const CartContext = createContext(null);
const STORAGE_KEY = 'volt-cart';

function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    return raw.filter((item) => item && item.id && item.qty > 0);
  } catch {
    return [];
  }
}

function sameLine(item, id, color) {
  return item.id === id && (item.color || '') === (color || '');
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const pushToast = useCallback((message) => {
    setToast({ message, id: Date.now() });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = productById(item.id);
          if (!product) return null;
          return { ...product, qty: item.qty, color: item.color || '' };
        })
        .filter(Boolean),
    [items]
  );

  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + salePrice(line) * line.qty, 0);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const addToCart = useCallback(
    (product, qty = 1, color = '') => {
      const chosen = color || product.colors?.[0] || '';
      const amount = Math.max(1, qty);
      setItems((prev) => {
        const index = prev.findIndex((item) => sameLine(item, product.id, chosen));
        if (index === -1) {
          return [...prev, { id: product.id, qty: Math.min(product.stock, amount), color: chosen }];
        }
        return prev.map((item, itemIndex) =>
          itemIndex === index
            ? { ...item, qty: Math.min(product.stock, item.qty + amount) }
            : item
        );
      });
      pushToast(`Added ${product.name}`);
    },
    [pushToast]
  );

  const updateQty = useCallback((id, color, qty) => {
    setItems((prev) =>
      prev.flatMap((item) => {
        if (!sameLine(item, id, color)) return [item];
        if (qty < 1) return [];
        const product = productById(id);
        const max = product?.stock ?? 99;
        return [{ ...item, qty: Math.min(max, qty) }];
      })
    );
  }, []);

  const remove = useCallback(
    (id, color) => {
      const product = productById(id);
      setItems((prev) => prev.filter((item) => !sameLine(item, id, color)));
      if (product) pushToast(`Removed ${product.name}`);
    },
    [pushToast]
  );

  const clear = useCallback(() => setItems([]), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      shipping,
      total,
      addToCart,
      updateQty,
      remove,
      clear,
      toast,
      dismissToast,
    }),
    [lines, count, subtotal, shipping, total, addToCart, updateQty, remove, clear, toast, dismissToast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
