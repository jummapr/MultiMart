import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  createCoupon: {},
  allCoupon: [],
  couponCodeData: {},
  discountPrice: 0
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
    getCouponCode: (state, action: PayloadAction<{ coupon: any }>) => {
      state.couponCodeData = action.payload.coupon;
    },
    couponDiscountPrice: (state,action) => {
      state.discountPrice = action.payload
    }
  },
});

export const { createCouponData, getAllCoupon, getCouponCode,couponDiscountPrice } = couponSlice.actions;
export default couponSlice;
