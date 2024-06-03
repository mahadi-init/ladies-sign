import { BACKEND_BASE_URL, GUEST_BEARER_TOKEN } from "@/consts/site-data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_BASE_URL,
    prepareHeaders: async (headers) => {
      try {
        const userInfo = Cookies.get("userInfo");
        if (userInfo) {
          const user = JSON.parse(userInfo);
          if (user?.accessToken) {
            headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
        } else {
          headers.set("Authorization", `Bearer ${GUEST_BEARER_TOKEN}`);
        }
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
  tagTypes: [
    "Products",
    "Coupon",
    "Product",
    "RelatedProducts",
    "UserOrder",
    "UserOrders",
    "ProductType",
    "OfferProducts",
    "PopularProducts",
    "TopRatedProducts",
    "Reviews",
  ],
});
