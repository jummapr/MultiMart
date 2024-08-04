import { apiSlice } from "../api/apiSlice";
import { setAllSellerOrders, setAllUserOrders, setOrders } from "./orderSlice";

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
    }),

    getAllUserOrders: builder.query({
      query: (data: any) => ({
        url: `order/get-orders/${data}`,
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          // console.log(result.data);
          dispatch(
            setAllUserOrders({
              userOrders: result.data.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    getAllSellerOrders: builder.query({
      query: (data: any) => ({
        url: `order/get-all-seller-orders/${data}`,
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          // console.log(result.data);
          dispatch(
            setAllSellerOrders({
              sellerOrders: result.data.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    updateOrderStatus: builder.mutation({
      query: (args: any) => {
        console.log(typeof args.status);
        console.log(args.status);
        return {
        url: `order/update-order-status/${args.orderId}`,
        method: "POST",
        body: {
          status: args.status,
        },
        credentials: "include" as const,
      }},
    }),

    // give refund
    giveRefund: builder.mutation({
      query: (args: any) => {
        return {
        url: `order/give-refund/${args.orderId}`,
        method: "PUT",
        body: {
          status: args.status,
        },
        credentials: "include" as const,
      }},
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useStripePaymentMutation,
  useGetAllUserOrdersQuery,
  useLazyGetAllSellerOrdersQuery,
  useUpdateOrderStatusMutation,
  useGiveRefundMutation
} = OrderApi;
