import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  stripeApiKey: '',
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setStripeApiKey: (state, action: PayloadAction<{ stripeApiKey: any }>) => {
      state.stripeApiKey = action.payload.stripeApiKey;
    },
  },
});

export const { setStripeApiKey } = paymentSlice.actions;
export default paymentSlice;
