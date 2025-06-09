import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types";

export const fetchProduct = createAsyncThunk("products/fetch", async() => {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    return await res.json();
})

const productSlice = createSlice({
    name: "products",
    initialState: { items: []as Product[], loading: false},
    reducers: {},
    extraReducers: builder  => {
        builder.addCase(fetchProduct.pending, state => {
            state.loading = true;
        })

        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        });
    },
});

export default productSlice.reducer;