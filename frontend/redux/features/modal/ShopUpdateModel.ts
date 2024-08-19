import { createSlice } from "@reduxjs/toolkit";

interface IShopUpdate {
    isOpen: boolean;
}

const initialState: IShopUpdate = {
    isOpen: false,
};

const shopUpdateModel = createSlice({
    name: "shopUpdateModel",
    reducerPath: "shopUpdateModel",
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

export const { onOpen, onClose } = shopUpdateModel.actions;

export default shopUpdateModel;
