import { BACKEND_BASE_URL } from "@/consts/site-data";
import { apiSlice } from "../api/apiSlice";

const url = BACKEND_BASE_URL;

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${BACKEND_BASE_URL}/category/add`,
        method: "POST",
        body: data,
      }),
    }),
    getActiveCategory: builder.query({
      query: () => `${BACKEND_BASE_URL}/category/active`,
    }),
    getProductTypeCategory: builder.query({
      query: (type) => `${BACKEND_BASE_URL}/category/active/type?type=${type}`,
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetProductTypeCategoryQuery,
  useGetActiveCategoryQuery,
} = categoryApi;
