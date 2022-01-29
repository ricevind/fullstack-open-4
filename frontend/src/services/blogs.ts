import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BlogUpdate, Blog } from "../models/blog";
import { BlogComment } from "../models/blogComment";
import { AppState } from "../state/store";

import config from "../utils/config";

export const blogsApi = createApi({
  reducerPath: "blogs",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.API_HOST}/api/`,
    prepareHeaders: (headers, api) => {
      const token = (api.getState() as AppState).auth.token;
      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ["BLOGS", "COMMENTS"],
  endpoints: (builder) => ({
    get: builder.query<Blog[], void>({
      query: () => ({ url: "blogs", method: "GET" }),
      providesTags: ["BLOGS"],
    }),
    create: builder.mutation<Blog, Omit<Blog, "id" | "likes">>({
      query: (blog) => ({
        url: "blogs",
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["BLOGS"],
    }),
    update: builder.mutation<Blog, BlogUpdate>({
      query: (update) => {
        const { id, ...changes } = update;
        return {
          url: `blogs/${id}`,
          method: "PATCH",
          body: changes,
        };
      },
      invalidatesTags: ["BLOGS"],
    }),
    delete: builder.mutation<void, Pick<Blog, "id">>({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BLOGS"],
    }),
  }),
});

export const commentsApi = blogsApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<BlogComment, BlogComment>({
      query: (comment) => ({
        url: `blogs/${comment.blogId}/comments`,
        method: "POST",
        body: { ...comment, blog: comment.blogId },
      }),
      transformResponse: (response: any) => ({
        ...response,
        blogId: response.blog,
      }),
      invalidatesTags: (data) => [{ type: "COMMENTS", id: data?.blogId }],
    }),
    comments: builder.query<BlogComment[], BlogComment["blogId"]>({
      query: (blogId) => ({
        url: `blogs/${blogId}/comments`,
        method: "GET",
      }),
      transformResponse: (data: any) =>
        data.map((comment: any) => ({ ...comment, blogId: comment.blog })),
      providesTags: (_, __, blogId) => [{ type: "COMMENTS", id: blogId }],
    }),
  }),
});