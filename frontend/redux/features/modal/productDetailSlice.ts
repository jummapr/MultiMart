import { createSlice } from "@reduxjs/toolkit";


interface IProductDetailModal {
    isOpen: boolean;
  }

const initialState: IProductDetailModal = {
    isOpen: false
}

const productDetailModal = createSlice({
    name: 'productDetailModal',
    reducerPath: "productDetailModal",
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

  export const { onOpen, onClose } = productDetailModal.actions;

  export default productDetailModal