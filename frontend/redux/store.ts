"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import productDetailModal from "./features/modal/productDetailSlice";
import sellerSlice from "./features/auth/sellerSlice";
import productSlice from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    loadUser: authSlice.reducer,
    [productDetailModal.reducerPath]: productDetailModal.reducer,
    seller: sellerSlice.reducer,
    product: productSlice.reducer,
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
