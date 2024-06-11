import { BACKEND_BASE_URL } from "@/consts/site-data";
import { apiSlice } from "../api/apiSlice";

export const sellerApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSellerData: builder.query({
      query: () => `${BACKEND_BASE_URL}/seller/info/me`,
      providesTags: ["Seller"],
    }),
    getSellerLastTransaction: builder.query({
      query: () => `${BACKEND_BASE_URL}/transaction/last`,
      providesTags: ["Seller"],
    }),
    getSellerLastWithdraw: builder.query({
      query: () => `${BACKEND_BASE_URL}/withdraw/last`,
      providesTags: ["Seller"],
    }),
    updateSellerInfo: builder.mutation({
      query: (data) => ({
        url: `${BACKEND_BASE_URL}/seller/edit`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Seller"],
    }),
  }),
});

export const {
  useGetSellerDataQuery,
  useGetSellerLastTransactionQuery,
  useGetSellerLastWithdrawQuery,
  useUpdateSellerInfoMutation,
} = sellerApi;
