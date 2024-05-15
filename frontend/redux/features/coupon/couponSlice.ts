import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  createCoupon: {},
  allCoupon: [],
};

const couponSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createCouponData: (state, action: PayloadAction<{ coupon: any }>) => {
      state.createCoupon = action.payload.coupon;
    },
    getAllCoupon: (state, action: PayloadAction<{ coupon: any }>) => {
      state.allCoupon = action.payload.coupon;
    },
  },
});

export const { createCouponData, getAllCoupon } = couponSlice.actions;
export default couponSlice;
