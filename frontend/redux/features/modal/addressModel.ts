import { createSlice } from "@reduxjs/toolkit";

interface IAddress {
  isOpen: boolean;
}

const initialState: IAddress = {
  isOpen: false,
};

const addressModel = createSlice({
  name: "addressModel",
  reducerPath: "addressModel",
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

export const { onOpen, onClose } = addressModel.actions;

export default addressModel;
