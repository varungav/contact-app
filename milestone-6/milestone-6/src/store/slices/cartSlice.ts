import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types";

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
        const existing = state.find(
          (item) =>
            item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize
        );

        if (existing) {
          existing.quantity += action.payload.quantity;
        } else {
          state.push(action.payload);
        }
      },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      return state.filter((i) => i.id !== action.payload.id);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; qty: number }>) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) item.quantity = action.payload.qty;
    },
},});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;