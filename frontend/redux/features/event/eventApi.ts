import { apiSlice } from "../api/apiSlice";
import { createNewEvent, getAllEvents } from "./eventSlice";

export const ProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewEvent: builder.mutation({
      query: (data: any) => ({
        url: "event/create-event",
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
            createNewEvent({
              event: result.data.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    getallEvents: builder.mutation({
      query: (data: any) => ({
        url: `event/get-all-event/${data}`,
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            getAllEvents({
              event: result.data.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    deleteEvent: builder.mutation({
      query: (data: any) => ({
        url: `event/delete-event/${data}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateNewEventMutation,
  useGetallEventsMutation,
  useDeleteEventMutation,
} = ProductApiSlice;
