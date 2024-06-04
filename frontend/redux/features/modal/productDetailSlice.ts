import { createSlice } from "@reduxjs/toolkit";


interface IProductDetailModal {
    isOpen: boolean;
    id: string
  }

const initialState: IProductDetailModal = {
    isOpen: false,
    id: ""
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
      getId: (state, action) => {
        state.id = action.payload
      }
    },
  });

  export const { onOpen, onClose, getId } = productDetailModal.actions;

  export default productDetailModal