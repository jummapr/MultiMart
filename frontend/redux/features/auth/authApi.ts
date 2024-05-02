import { apiSlice } from "../api/apiSlice";
import { useLoadUser, userLoggedIn } from "./authSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder:any) => ({
        register: builder.mutation({
            query: (data:any) => ({
                url: 'user/register',
                method:"POST",
                body: data,
                credentials: "include" as const,
                formData: true,
            })
        }),
        activateAccount: builder.mutation({
            query: (data:any) => ({
                url: `user/activateuser/${data}`,
                method:"POST",
                withCredentials: true,
                credentials: "include" as const,
            })
        }),
        loginUser: builder.mutation({
            query: (data:any) => ({
                url: 'user/login',
                method:"POST",
                body: data,
                credentials: "include" as const,
            }),

            async onQueryStarted(arg:any, {queryFulfilled, dispatch}) {
                try {
                    const result=await queryFulfilled;
                    console.log(result.data)
                    dispatch(
                        useLoadUser({
                            user: result.data.data.user
                        })
                    )
                } catch (error:any) {
                  console.log(error);
                    
                }
            }
        }),
       
    }),
});

export const { useRegisterMutation,useActivateAccountMutation,useLoginUserMutation } = authApiSlice