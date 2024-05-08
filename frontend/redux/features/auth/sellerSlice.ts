import {PayloadAction, createSlice} from "@reduxjs/toolkit";


const initialState = {
    seller: null,
    isSeller: false
}


const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        loadSellerUser : (state,action: PayloadAction<{shopUserData: any}>) => {
            state.seller= action.payload.shopUserData
            state.isSeller = true
        }
    }
})

export const {loadSellerUser} = sellerSlice.actions
export default sellerSlice
