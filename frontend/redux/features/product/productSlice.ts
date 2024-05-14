import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  createProduct: {},
  allProduct: [],
};

const productSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    createProductData: (state, action: PayloadAction<{ product: any }>) => {
      state.createProduct = action.payload.product;
    },
    getAllProduct: (state, action: PayloadAction<{ product: any }>) => {
      state.allProduct = action.payload.product;
    },
  },
});

export const { createProductData, getAllProduct } = productSlice.actions;
export default productSlice;
