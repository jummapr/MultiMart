"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import productDetailModal from "./features/modal/productDetailSlice";
import sellerSlice from "./features/auth/sellerSlice";
import productSlice from "./features/product/productSlice";
import eventSlice from "./features/event/eventSlice";
import couponCodeModal from "./features/modal/couponCode";
import couponSlice from "./features/coupon/couponSlice";
import shopSlice from "./features/shop/shopSlice";
import cartSlice from "./features/cart/cartSlice";
import wishListSlice from "./features/wishlist/wishlistSlice";
import authModel from "./features/modal/authModel";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    loadUser: authSlice.reducer,
    [productDetailModal.reducerPath]: productDetailModal.reducer,
    seller: sellerSlice.reducer,
    product: productSlice.reducer,
    event: eventSlice.reducer,
    couponModel: couponCodeModal.reducer,
    coupon: couponSlice.reducer,
    shop: shopSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishListSlice.reducer,

    [authModel.reducerPath]:  authModel.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const initializeApp = async () => {
  await Promise.all([
    store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {})),
    store.dispatch(apiSlice.endpoints.loadSeller.initiate({}, {})),
  ]);
};

initializeApp();
