import { createSlice } from "@reduxjs/toolkit";

interface ICouponCode {
  isOpen: boolean;
}

const initialState: ICouponCode = {
  isOpen: false,
};

const couponCodeModal = createSlice({
  name: "couponCodeModel",
  reducerPath: "couponCodeModel",
  initialState,
  reducers: {
    // Action to open the modal
    onOpen: (state) => {
      state.isOpen = true;
    },
    // Action to close the modal
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = couponCodeModal.actions;

export default couponCodeModal;
