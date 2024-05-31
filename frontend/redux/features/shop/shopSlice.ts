import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  shopInfo: {},
  allProduct: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    getShopInfo: (state, action: PayloadAction<{ shop: any }>) => {
      state.shopInfo = action.payload.shop;
    },
    getAllShopProduct: (state, action: PayloadAction<{ product: any }>) => {
        state.allProduct = action.payload.product;
    },
  },
});

export const { getShopInfo,getAllShopProduct } = shopSlice.actions;
export default shopSlice;
