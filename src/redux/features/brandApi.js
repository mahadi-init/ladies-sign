import { BACKEND_BASE_URL } from "@/consts/site-data";
import { apiSlice } from "../api/apiSlice";

export const brandApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getActiveBrands: builder.query({
      query: () => `${BACKEND_BASE_URL}/brand/active`,
    }),
  }),
});

export const { useGetActiveBrandsQuery } = brandApi;
