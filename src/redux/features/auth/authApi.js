import { BACKEND_BASE_URL } from "@/consts/site-data";
import { apiSlice } from "@/redux/api/apiSlice";
import Cookies from "js-cookie";
import { userLoggedIn } from "./authSlice";

const url = BACKEND_BASE_URL;

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${url}/user/register`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 },
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // signUpProvider
    // signUpProvider: builder.mutation({
    //   query: (token) => ({
    //     url: `${url}/api/user/register/${token}`,
    //     method: "POST",
    //   }),
    //
    //   async onQueryStarted(_, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;
    //
    //       Cookies.set(
    //         "userInfo",
    //         JSON.stringify({
    //           accessToken: result.data.data.token,
    //           user: result.data.data.user,
    //         }),
    //         { expires: 0.5 },
    //       );
    //
    //       dispatch(
    //         userLoggedIn({
    //           accessToken: result.data.data.token,
    //           user: result.data.data.user,
    //         }),
    //       );
    //     } catch (err) {
    //       // do nothing
    //     }
    //   },
    // }),
    // login
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${BACKEND_BASE_URL}/user/login`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const data = res.data;

          if (!data.success) {
            throw new Error();
          }

          Cookies.set(
            "userInfo",
            JSON.stringify({
              user: data.data,
              accessToken: data.token,
            }),
            { expires: 0.5 },
          );

          dispatch(
            userLoggedIn({
              user: data.data,
              accessToken: data.token,
              role: "user",
            }),
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    loginSeller: builder.mutation({
      query: (data) => ({
        url: `${BACKEND_BASE_URL}/seller/login`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const data = res.data;
          console.log(data);

          if (!data.success) {
            throw new Error();
          }

          Cookies.set(
            "userInfo",
            JSON.stringify({
              user: data.data,
              accessToken: data.token,
            }),
            { expires: 0.5 },
          );

          dispatch(
            userLoggedIn({
              user: data.data,
              accessToken: data.token,
              role: "seller",
            }),
          );

          // return data;
        } catch (err) {
          // do nothing
        }
      },
    }),
    // get me
    getUser: builder.query({
      query: () => `${BACKEND_BASE_URL}/me`,

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data,
            }),
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // confirmEmail
    confirmEmail: builder.query({
      query: (token) => `${url}/api/user/confirmEmail/${token}`,

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 },
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${url}/api/user/forget-password`,
        method: "PATCH",
        body: data,
      }),
    }),
    // confirmForgotPassword
    confirmForgotPassword: builder.mutation({
      query: (data) => ({
        url: `${url}/api/user/confirm-forget-password`,
        method: "PATCH",
        body: data,
      }),
    }),
    // change password
    changePassword: builder.mutation({
      query: (data) => ({
        url: `${url}/api/user/change-password`,
        method: "PATCH",
        body: data,
      }),
    }),
    // updateProfile password
    updateProfile: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${url}/api/user/update-user/${id}`,
        method: "PUT",
        body: data,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 },
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLoginSellerMutation,
  useRegisterUserMutation,
  useConfirmEmailQuery,
  useResetPasswordMutation,
  useConfirmForgotPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useSignUpProviderMutation,
} = authApi;
