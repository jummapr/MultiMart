import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  userOrders: [],
  sellerOrders: []
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<{orders: any}>) => {
      state.orders = action.payload.orders
    },

    setAllUserOrders: (state, action: PayloadAction<{userOrders: any}>) => {
      state.userOrders = action.payload.userOrders
    },

    setAllSellerOrders: (state, action: PayloadAction<{sellerOrders: any}>) => {
      state.sellerOrders = action.payload.sellerOrders
    }
  },
});

export const { setOrders,setAllUserOrders,setAllSellerOrders } = orderSlice.actions;
export default orderSlice;
