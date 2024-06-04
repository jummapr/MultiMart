import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  // @ts-ignore
  wishlist: localStorage.getItem("wishlistItems") ? JSON.parse(localStorage.getItem("wishlistItems")) : [],
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
        const item = action.payload;
        const isItemExist = state.wishlist.find((i: any) => i._id === item._id);

        if (isItemExist) {
            return {
                ...state,
                wishlist: state.wishlist.map((i: any) => (i._id === isItemExist._id ? item : i))
            }
        } else {
            return  {
                ...state,
                wishlist: [...state.wishlist, item]
            }
        }
    },

    removeFromWishlist: (state, action) => {
      console.log("Remove from wishlist Action", action.payload);
      return {
        ...state,
        wishlist: state.wishlist.filter((i: any) => i._id !== action.payload._id),
      };
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishListSlice.actions;
export default wishListSlice;
