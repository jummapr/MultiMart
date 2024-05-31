import { apiSlice } from "../api/apiSlice";
import { getAllShopProduct, getShopInfo } from "./shopSlice";

export const ShopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShopInfo: builder.mutation({
      query: (shopId: any) => ({
        url: `shop/get-shop-info/${shopId}`,
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            getShopInfo({
              shop: result.data.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    allSellerProduct: builder.mutation({
        query: (data: any) => ({
          url: `shop/get-all-seller-product/${data}`,
          method: "GET",
          credentials: "include" as const,
        }),
  
        async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
          try {
            const result = await queryFulfilled;
            console.log(result.data);
            dispatch(
                getAllShopProduct({
                product: result.data.data,
              })
            );
          } catch (error: any) {
            console.log(error);
          }
        },
      }),
    deleteProduct: builder.mutation({
      query: (data: any) => ({
        url: `product/delete-product/${data}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetShopInfoMutation,
  useDeleteProductMutation,
  useAllSellerProductMutation,
} = ShopApi;
