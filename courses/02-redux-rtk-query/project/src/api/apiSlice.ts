import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockApi } from "./mockApi";
import type { Post } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      queryFn: async () => {
        try {
          const posts = await mockApi.getPosts();

          return {
            data: posts,
          };
        } catch (error) {
          return {
            error: error as Error,
          };
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map((post) => ({
                type: "Post" as const,
                id: post.id,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    getPostById: builder.query<Post, number>({
      queryFn: async (id) => {
        try {
          const post = await mockApi.getPostById(id);

          return {
            data: post,
          };
        } catch (error) {
          return {
            error: error as Error,
          };
        }
      },

      providesTags: (result, error, id) => [
        { type: "Post", id },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
} = apiSlice;