import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Dish } from '../data/dishes';

export interface CartItem {
  id: string;
  dish: Dish;
  quantity: number;
  selectedSpecs: Record<string, string>;
  totalPrice: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (dish: Dish, selectedSpecs?: Record<string, string>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
}

const DELIVERY_FEE = 5;
const FREE_DELIVERY_THRESHOLD = 80;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (dish: Dish, selectedSpecs: Record<string, string> = {}) => {
        const { items } = get();

        let specPrice = 0;
        if (dish.specifications) {
          dish.specifications.forEach((spec) => {
            const selectedOption = spec.options.find(
              (opt) => opt.name === selectedSpecs[spec.name]
            );
            if (selectedOption) {
              specPrice += selectedOption.price;
            }
          });
        }

        const totalPrice = (dish.price + specPrice);
        const existingItemIndex = items.findIndex(
          (item) =>
            item.dish.id === dish.id &&
            JSON.stringify(item.selectedSpecs) === JSON.stringify(selectedSpecs)
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += 1;
          updatedItems[existingItemIndex].totalPrice =
            updatedItems[existingItemIndex].quantity * totalPrice;
          set({ items: updatedItems });
        } else {
          const newItem: CartItem = {
            id: `${dish.id}_${Date.now()}`,
            dish,
            quantity: 1,
            selectedSpecs,
            totalPrice,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (itemId: string) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const { items } = get();
        const updatedItems = items.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity,
              totalPrice: quantity * (item.totalPrice / item.quantity),
            };
          }
          return item;
        });
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.totalPrice, 0);
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getDeliveryFee();
      },
    }),
    {
      name: 'food-cart-storage',
    }
  )
);

export { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD };
