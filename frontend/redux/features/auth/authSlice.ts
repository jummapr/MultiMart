import {PayloadAction, createSlice} from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isAuthenticated: false
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        useLoadUser: (state,action: PayloadAction<{user: any}>) => {
            state.user= action.payload.user
            console.log(action)
            state.isAuthenticated = true
        },
        logoutUser: (state,action: PayloadAction<{user: any}>) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
})

export const {useLoadUser} = authSlice.actions
export default authSlice