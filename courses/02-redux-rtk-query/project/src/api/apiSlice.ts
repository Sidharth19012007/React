import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockApi } from './mockServer';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface NewUser {
  name: string;
  email: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          return { data: await mockApi.getUsers() };
        } catch (e) {
          return { error: { status: 'ERR', error: String(e) } };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    addUser: builder.mutation<User, NewUser>({
      queryFn: async (newUser) => {
        try {
          return { data: await mockApi.addUser(newUser) };
        } catch (e) {
          return { error: { status: 'ERR', error: String(e) } };
        }
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
      async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getUsers', undefined, (draft) => {
            draft.push({
              id: String(Date.now()),
              ...newUser,
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = apiSlice;