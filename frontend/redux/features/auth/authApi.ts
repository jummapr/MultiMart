import { apiSlice } from "../api/apiSlice";
import { deleteAddress, logoutUser, updateAddress, updateAvatar, updateUserInfo, useLoadUser } from "./authSlice";
import { loadSellerUser, logoutShop } from "./sellerSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: any) => ({
        url: "user/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
        formData: true,
      }),
    }),
    activateAccount: builder.mutation({
      query: (data: any) => ({
        url: `user/activateuser/${data}`,
        method: "POST",
        withCredentials: true,
        credentials: "include" as const,
      }),
    }),
    loginUser: builder.mutation({
      query: (data: any) => ({
        url: "user/login",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            useLoadUser({
              user: result.data.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "user/logout",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }) {
        dispatch(logoutUser());
      },
    }),
    shopCreateApi: builder.mutation({
      query: (data: any) => ({
        url: "shop/create-shop",
        method: "POST",
        body: data,
        credentials: "include" as const,
        formData: true,
      }),
    }),

    activateShop: builder.mutation({
      query: (data: any) => ({
        url: `shop/activate/${data}`,
        method: "POST",
        withCredentials: true,
        credentials: "include" as const,
      }),
    }),

    loginToShop: builder.mutation({
      query: (data: any) => ({
        url: "shop/shop-login",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          dispatch(
            loadSellerUser({
              shopUserData: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    updateUserInfo: builder.mutation({
      query: (data: any) => ({
        url: "user/update-user-info",
        method: "PUT",
        body: data,
        credentials: "include" as const,
        formData: true,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          dispatch(
            updateUserInfo({
              user: result.data.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    updateUserAvatar: builder.mutation({
      query: (data: any) => ({
        url: "user/update-avatar",
        method: "PUT",
        body: data,
        credentials: "include" as const,
        formData: true,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          dispatch(
            updateAvatar({
              user: result.data.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    updateUserAddress: builder.mutation({
      query: (data: any) => ({
        url: "user/update-user-address",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            updateAddress({
              user: result.data.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    deleteUserAddress: builder.mutation({
      query: (data: any) => ({
        url: `user/delete-user-address/${data}`,
        method: "DELETE",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          dispatch(
            deleteAddress({
              user: result.data.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    logoutShop: builder.mutation({
      query: () => ({
        url: "shop/logoutshop",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }) {
        dispatch(logoutShop());
      },
    }),
  }),
});
export const {
  useRegisterMutation,
  useActivateAccountMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useShopCreateApiMutation,
  useActivateShopMutation,
  useLoginToShopMutation,
  useLogoutShopMutation,
  useUpdateUserInfoMutation,
  useUpdateUserAvatarMutation,
  useUpdateUserAddressMutation,
  useDeleteUserAddressMutation
} = authApiSlice;
