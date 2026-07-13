import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockApi } from './mockServer';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
}

// Safely cast mockApi to an interface containing the dynamic extensions to satisfy ESLint
interface ExtendedMockApi {
  getUsers: () => Promise<User[]>;
  getPosts: () => Promise<Post[]>;
  addPost: (post: Partial<Post>) => Promise<Post>;
}

const typedMockApi = mockApi as unknown as ExtendedMockApi;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          const data = await typedMockApi.getUsers();
          return { data };
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          return { error: { status: 'CUSTOM_ERROR', error: message } };
        }
      },
    }),
    getPosts: builder.query<Post[], void>({
      queryFn: async () => {
        try {
          const data = await typedMockApi.getPosts();
          return { data };
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          return { error: { status: 'CUSTOM_ERROR', error: message } };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post' as const, id: 'LIST' },
            ]
          : [{ type: 'Post' as const, id: 'LIST' }],
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      queryFn: async (newPost) => {
        try {
          const data = await typedMockApi.addPost(newPost);
          return { data };
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          return { error: { status: 'CUSTOM_ERROR', error: message } };
        }
      },
      invalidatesTags: [{ type: 'Post' as const, id: 'LIST' }],
    }),
  }),
});

export const { useGetUsersQuery, useGetPostsQuery, useAddPostMutation } = apiSlice;