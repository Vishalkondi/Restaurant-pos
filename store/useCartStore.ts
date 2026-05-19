import { create } from "zustand";

interface CartItem {

  id: string;

  name: string;

  basePrice: number;

  quantity: number;

  size: string;

  image?: string;
}

interface CartStore {

  cart: CartItem[];

  addToCart: (
    item: CartItem
  ) => void;

  removeFromCart: (
    id: string
  ) => void;

  clearCart: () => void;

  increaseQuantity: (
    id: string
  ) => void;

  decreaseQuantity: (
    id: string
  ) => void;
}

export const useCartStore =
  create<CartStore>((set) => ({

    cart: [],

    addToCart: (item) =>

      set((state) => {

        const existing =
          state.cart.find(
            (cartItem) =>
              cartItem.id === item.id
          );

        if (existing) {

          return {

            cart: state.cart.map(
              (cartItem) =>

                cartItem.id === item.id
                  ? {
                      ...cartItem,
                      quantity:
                        cartItem.quantity + 1,
                    }
                  : cartItem
            ),
          };
        }

        return {

          cart: [
            ...state.cart,
            item,
          ],
        };
      }),

    removeFromCart: (id) =>

      set((state) => ({

        cart: state.cart.filter(
          (item) =>
            item.id !== id
        ),
      })),

    clearCart: () =>

      set({
        cart: [],
      }),

    increaseQuantity: (id) =>

      set((state) => ({

        cart: state.cart.map(
          (item) =>

            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        ),
      })),

    decreaseQuantity: (id) =>

      set((state) => ({

        cart: state.cart
          .map((item) =>

            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1,
                }
              : item
          )
          .filter(
            (item) =>
              item.quantity > 0
          ),
      })),
  }));