import { createSlice } from "@reduxjs/toolkit";

interface ICouponCode {
  isOpen: boolean;
}

const initialState: ICouponCode = {
  isOpen: false,
};

const commentModel = createSlice({
  name: "commentModel",
  reducerPath: "commentModel",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = commentModel.actions;

export default commentModel;
