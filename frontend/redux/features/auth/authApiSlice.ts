import { apiSlice } from "../api/apiSlice";


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
                credentials: "include" as const,
            })
        })
    }),
});

export const { useRegisterMutation,useActivateAccountMutation } = authApiSlice