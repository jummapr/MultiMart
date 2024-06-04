import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
}

const initialState: any = {
  // @ts-ignore
  cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const item = action.payload;
        const isItemExist = state.cart.find((i: any) => i._id === item._id);

        if (isItemExist) {
            return {
                ...state,
                cart: state.cart.map((i: any) => (i._id === isItemExist._id ? item : i))
            }
        } else {
            return  {
                ...state,
                cart: [...state.cart, item]
            }
        }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        cart: state.cart.filter((i: any) => i._id !== action.payload),
      };
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice;
