import { BACKEND_BASE_URL } from "@/consts/site-data";
import { apiSlice } from "../api/apiSlice";

export const transactionApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addDeposit: builder.mutation({
      query: (data) => ({
        url: `${BACKEND_BASE_URL}/bkash/create-payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Seller"],
    }),
    addWithdraw: builder.mutation({
      query: (data) => ({
        url: `${BACKEND_BASE_URL}/withdraw/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Seller"],
    }),
  }),
});

export const { useAddDepositMutation, useAddWithdrawMutation } = transactionApi;
