import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: []
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<{orders: any}>) => {
      state.orders = action.payload.orders
    }
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice;
