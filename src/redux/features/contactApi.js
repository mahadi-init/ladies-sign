import { BACKEND_BASE_URL } from "@/consts/site-data";
import { apiSlice } from "../api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${BACKEND_BASE_URL}/contact/send-message`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = contactApi;
