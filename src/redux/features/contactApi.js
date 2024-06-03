import { BACKEND_BASE_URL } from "@/consts/site-data";
import { apiSlice } from "../api/apiSlice";

const url = BACKEND_BASE_URL;

export const contactApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${url}/contact/send-message`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = contactApi;
