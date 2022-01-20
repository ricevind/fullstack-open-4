import config from "../utils/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Credentials, User } from "../models/user";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: `${config.API_HOST}/api/` }),
  endpoints: (builder) => ({
    login: builder.mutation<User, Credentials>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApi;
