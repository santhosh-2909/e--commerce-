import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Coupon } from '../types';
import { coupons as allCoupons } from '../data/mockData';

interface CartStore {
  items: CartItem[];
  coupon: Coupon | null;
  deliveryCharge: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      deliveryCharge: 49,

      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existing = items.find(i => i.product.id === product.id);
        if (existing) {
          set({ items: items.map(i => i.product.id === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) } : i) });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },

      removeItem: (productId) => set({ items: get().items.filter(i => i.product.id !== productId) }),

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) { get().removeItem(productId); return; }
        set({ items: get().items.map(i => i.product.id === productId ? { ...i, quantity } : i) });
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (code) => {
        const subtotal = get().getSubtotal();
        const coupon = allCoupons.find(c => c.code === code.toUpperCase());
        if (!coupon) return { success: false, message: 'Invalid coupon code' };
        if (subtotal < coupon.minOrder) return { success: false, message: `Minimum order of ₹${coupon.minOrder} required` };
        set({ coupon });
        return { success: true, message: `Coupon "${code}" applied successfully!` };
      },

      removeCoupon: () => set({ coupon: null }),

      getSubtotal: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      getDiscount: () => {
        const { coupon } = get();
        if (!coupon) return 0;
        const subtotal = get().getSubtotal();
        return coupon.type === 'percentage' ? Math.round(subtotal * coupon.value / 100) : coupon.value;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const delivery = subtotal - discount >= 999 ? 0 : get().deliveryCharge;
        return Math.max(0, subtotal - discount + delivery);
      },

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'shopease-cart' }
  )
);
