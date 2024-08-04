import { createSlice } from "@reduxjs/toolkit";

interface ICouponCode {
  isOpen: boolean;
  productId: string;
}

const initialState: ICouponCode = {
  isOpen: false,
  productId: ""
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
    setProductId: (state, action) => {
      state.productId = action.payload;
    }
  },
});

export const { onOpen, onClose, setProductId } = commentModel.actions;

export default commentModel;
