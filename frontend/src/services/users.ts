import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { User } from "../models/user";
import { AppState } from "../state/store";
import config from "../utils/config";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.API_HOST}/api/`,
    prepareHeaders: (headers, api) => {
      const token = (api.getState() as AppState).auth.token;
      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ["USERS"],
  endpoints: (builder) => ({
    users: builder.query<User[], void>({
      query: () => ({ url: "users", method: "GET" }),
      transformResponse: (users: any) =>
        users.map((user: any) => ({
          ...user,
          blogsCount: user.blogs.length,
        })),
      providesTags: ["USERS"],
    }),
  }),
});
