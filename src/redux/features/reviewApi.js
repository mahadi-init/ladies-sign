import { BACKEND_BASE_URL } from "@/consts/site-data";
import { apiSlice } from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getReviewById: builder.query({
      query: (id) => `${BACKEND_BASE_URL}/review/${id}`,
      providesTags: ["Reviews"],
    }),

    addReview: builder.mutation({
      query: (data) => ({
        url: `${BACKEND_BASE_URL}/review/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Reviews",
        // { type: "Product", id: arg.productId },
      ],
    }),
  }),
});

export const { useGetReviewByIdQuery, useAddReviewMutation } = reviewApi;
