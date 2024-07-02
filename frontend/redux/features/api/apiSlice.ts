import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {useLoadUser} from "../auth/authSlice"
import { loadSellerUser } from '../auth/sellerSlice';
import { setStripeApiKey } from '../payment/paymentSlice';


export const apiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI!
    }),
    endpoints: (builder) => ({
        loadUser: builder.query({
            query: () => ({
                url: 'user/getuser',
                method:"GET",
                credentials: "include" as const,
            }),

            async onQueryStarted(arg:any, {queryFulfilled, dispatch}) {
                try {
                    const result=await queryFulfilled;
                    console.log(result.data.data)
                    dispatch(
                        useLoadUser({
                            user: result.data.data
                        })
                    )
                } catch (error:any) {
                  console.log(error);
                    
                }
            }
        }),

        loadSeller: builder.query({
            query: () => ({
                url: 'shop/load-seller',
                method:"GET",
                credentials: "include" as const,
            }),

            async onQueryStarted(arg:any, {queryFulfilled, dispatch}) {
                try {
                    const result=await queryFulfilled;
                    console.log(result.data)
                    dispatch(
                        loadSellerUser({
                            shopUserData: result.data
                        })
                    )
                } catch (error:any) {
                  console.log(error);
                    
                }
            }
        }),
        getApiKey: builder.query({
            query: () => ({
              url: "payment/stripeapikey",
              method: "GET",
              credentials: "include" as const,
            }),
      
            async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
              try {
                const result = await queryFulfilled;

                dispatch(
                  setStripeApiKey({
                    stripeApiKey: result.data.apiKey,
                  })
                );
              } catch (error: any) {
                console.log(error);
              }
            },
          })
    })
})

export const { useLoadUserQuery } = apiSlice