import { BACKEND_BASE_URL } from "@/consts/site-data";
import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `${BACKEND_BASE_URL}/product/all`,
      providesTags: ["Products"],
    }),
    getProductType: builder.query({
      query: ({ query }) => `${BACKEND_BASE_URL}/product/find?${query}`,
      providesTags: ["ProductType"],
    }),
    getOfferProducts: builder.query({
      query: () => `${BACKEND_BASE_URL}/product/offer`,
      providesTags: ["OfferProducts"],
    }),
    getPopularProductByType: builder.query({
      query: (type) => `${BACKEND_BASE_URL}/product/popular/${type}`,
      providesTags: ["PopularProducts"],
    }),
    getTopRatedProducts: builder.query({
      query: () => `${BACKEND_BASE_URL}/product/top-rated`,
      providesTags: ["TopRatedProducts"],
    }),
    getProduct: builder.query({
      query: (id) => `${BACKEND_BASE_URL}/product/get/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (_result, _error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    getRelatedProducts: builder.query({
      query: (id) => `${BACKEND_BASE_URL}/product/related/${id}`,
      providesTags: (_result, _error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
} = productApi;
