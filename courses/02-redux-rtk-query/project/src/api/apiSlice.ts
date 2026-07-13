import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockApi } from './mockServer';

interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          const data = await mockApi.getUsers();
          return { data };
        } catch (error: any) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
    }),
  }),
});

export const { useGetUsersQuery } = apiSlice;