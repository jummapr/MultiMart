import { apiSlice } from "../api/apiSlice";
import { createProductData, getAllProduct } from "./productSlice";

export const ProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewProduct: builder.mutation({
      query: (data: any) => ({
        url: "product/create-product",
        method: "POST",
        body: data,
        credentials: "include" as const,
        formData: true,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            createProductData({
              product: result.data.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    allProduct: builder.mutation({
      query: (data: any) => ({
        url: `product/get-all-product`,
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            getAllProduct({
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
    productDetail: builder.query({
      query: (data: any) => ({
        url: `product/product-detail/${data}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    reviewProduct: builder.mutation({
      query: (data: any) => ({
        url: `product/reviewed-product`,
        method: "PATCH",
        body: data,
        credentials: "include" as const,
      }),
    })
  }),
});

export const {
  useCreateNewProductMutation,
  useAllProductMutation,
  useDeleteProductMutation,
  useProductDetailQuery,
  useReviewProductMutation
} = ProductApiSlice;
