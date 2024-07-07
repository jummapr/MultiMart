import { apiSlice } from "../api/apiSlice";
import { setOrders } from "./orderSlice";

export const OrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data: any) => ({
        url: "order/create-order",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            setOrders({
              orders: result.data.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    stripePayment: builder.mutation({
      query: (data: any) => ({
        url: "payment/process",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    })
  }),
});

export const {useCreateOrderMutation,useStripePaymentMutation} = OrderApi;
