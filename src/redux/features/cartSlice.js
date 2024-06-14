import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorage";
import { notifyError, notifySuccess } from "@/utils/toast";

const initialState = {
  cart_products: [],
  orderQuantity: 1,
  cartMiniOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_cart_product: (state, { payload }) => {
      let isExist = false;
      let matchIndex = 0;

      // loop through
      for (let i = 0; i < state.cart_products.length; i++) {
        if (
          state.cart_products[i]._id === payload._id &&
          state.cart_products[i].color === payload.color &&
          state.cart_products[i].size === payload.size
        ) {
          isExist = true;
          matchIndex = i;
          break;
        }
      }

      if (!isExist) {
        const newItem = {
          ...payload,
          orderQuantity: state.orderQuantity,
        };
        state.cart_products.push(newItem);
        notifySuccess(`${state.orderQuantity} ${payload.name} added to cart`);
        setLocalStorage("cart_products", state.cart_products);

        return;
      }

      state.cart_products.map((item) => {
        if (
          item._id === payload._id &&
          item.color === payload.color &&
          item.size === payload.size
        ) {
          if (item.quantity >= item.orderQuantity + state.orderQuantity) {
            item.orderQuantity =
              state.orderQuantity !== 1
                ? state.orderQuantity + item.orderQuantity
                : item.orderQuantity + 1;
            notifySuccess(`${state.orderQuantity} ${item.name} added to cart`);
          } else {
            notifyError("No more quantity available for this product!");
            state.orderQuantity = 1;
          }
        }

        return { ...item };
      });

      setLocalStorage("cart_products", state.cart_products);
    },

    resetOrderQuantity: (state) => {
      state.orderQuantity = 1;
    },

    increment: (state) => {
      state.orderQuantity = state.orderQuantity + 1;
    },

    decrement: (state) => {
      state.orderQuantity =
        state.orderQuantity > 1
          ? state.orderQuantity - 1
          : (state.orderQuantity = 1);
    },

    quantityDecrement: (state, { payload }) => {
      state.cart_products.map((item) => {
        if (
          item._id === payload._id &&
          item.color === payload.color &&
          item.size === payload.size
        ) {
          if (item.orderQuantity > 1) {
            item.orderQuantity = item.orderQuantity - 1;
          }
        }
        return { ...item };
      });
      setLocalStorage("cart_products", state.cart_products);
    },

    remove_product: (state, { payload }) => {
      state.cart_products = state.cart_products.filter(
        (item) =>
          !(
            item._id === payload.id &&
            item.color === payload.color &&
            item.size === payload.size
          ),
      );

      setLocalStorage("cart_products", state.cart_products);
      notifyError(`${payload.name} Removed from cart`);
    },

    get_cart_products: (state) => {
      state.cart_products = getLocalStorage("cart_products");
    },

    initialOrderQuantity: (state) => {
      state.orderQuantity = 1;
    },

    clearCart: (state) => {
      const isClearCart = window.confirm(
        "Are you sure you want to remove all items ?",
      );
      if (isClearCart) {
        state.cart_products = [];
      }
      setLocalStorage("cart_products", state.cart_products);
    },

    openCartMini: (state) => {
      state.cartMiniOpen = true;
    },

    closeCartMini: (state) => {
      state.cartMiniOpen = false;
    },
  },
});

export const {
  add_cart_product,
  resetOrderQuantity,
  increment,
  decrement,
  get_cart_products,
  remove_product,
  quantityDecrement,
  initialOrderQuantity,
  clearCart,
  closeCartMini,
  openCartMini,
} = cartSlice.actions;
export default cartSlice.reducer;
