import { BACKEND_BASE_URL } from "@/consts/site-data";
import { apiSlice } from "../api/apiSlice";

const url = BACKEND_BASE_URL;

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${url}/category/add`,
        method: "POST",
        body: data,
      }),
    }),
    getActiveCategory: builder.query({
      query: () => `${url}/category/active`,
    }),
    getProductTypeCategory: builder.query({
      query: (type) => `${url}/category/active/${type}`,
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetProductTypeCategoryQuery,
  useGetActiveCategoryQuery,
} = categoryApi;
