import { BACKEND_BASE_URL } from "@/consts/site-data";
import { apiSlice } from "@/redux/api/apiSlice";

const url = BACKEND_BASE_URL;

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOfferCoupons: builder.query({
      query: () => `${BACKEND_BASE_URL}/coupon/all`,
      providesTags: ["Coupon"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetOfferCouponsQuery } = authApi;
