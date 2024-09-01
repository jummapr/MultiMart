import { apiSlice } from "../api/apiSlice";
// import { createCouponData, getAllCoupon, getCouponCode } from "./couponSlice";

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createConversation: builder.mutation({
            query: (data: any) => ({
                url: "conversation/create-conversation",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),

            // async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
            //     try {
            //         const result = await queryFulfilled;
            //         console.log(result.data);
            //         dispatch(
            //             createCouponData({
            //                 coupon: result.data.data,
            //             })
            //         );
            //     } catch (error: any) {
            //         console.log(error);
            //     }
            // },
        }),
    }),
});

export const {
    useCreateConversationMutation,
} = conversationApi;
