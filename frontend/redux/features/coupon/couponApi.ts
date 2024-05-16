import { apiSlice } from "../api/apiSlice";
import { createCouponData, getAllCoupon } from "./couponSlice";

export const ProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewCoupon: builder.mutation({
      query: (data: any) => ({
        url: "coupon/create-coupon",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            createCouponData({
              coupon: result.data.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    getAllCoupon: builder.mutation({
      query: (data: any) => ({
        url: `coupon/get-all-coupon/${data}`,
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            getAllCoupon({
              coupon: result.data.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    deleteCoupon: builder.mutation({
      query: (data: any) => ({
        url: `coupon/delete-coupon/${data}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateNewCouponMutation,
  useGetAllCouponMutation,
  useDeleteCouponMutation,
} = ProductApiSlice;
