import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { Blog, CreateBlogPayload, UpdateBlogPayload } from '../types/blog'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5002/api/v1'

type ApiResponse<T> = {
  success: boolean
  message?: string
  data?: T
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const refreshResult = await rawBaseQuery({ url: '/auth/refresh-token', method: 'POST' }, api, extraOptions)
    if ('data' in refreshResult) result = await rawBaseQuery(args, api, extraOptions)
  }

  if ('data' in result) {
    const response = result.data as ApiResponse<unknown>
    if (!response.success) {
      return { error: { status: 'CUSTOM_ERROR', error: response.message ?? 'Request failed.' } }
    }
    return { data: response.data }
  }

  const errorResponse = result.error.data as ApiResponse<unknown> | undefined
  if (errorResponse?.message) {
    return { error: { status: 'CUSTOM_ERROR', error: errorResponse.message } }
  }

  return result
}

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['BlogPost'],
  endpoints: (builder) => ({
    getBlogs: builder.query<Blog[], void>({
      query: () => '/admin/blog/posts',
      providesTags: (posts) => [
        ...(posts?.map(({ id }) => ({ type: 'BlogPost' as const, id })) ?? []),
        { type: 'BlogPost', id: 'LIST' },
      ],
    }),
    createBlog: builder.mutation<Blog, CreateBlogPayload>({
      query: (body) => ({ url: '/admin/blog/posts', method: 'POST', body }),
      invalidatesTags: [{ type: 'BlogPost', id: 'LIST' }],
    }),
    updateBlog: builder.mutation<Blog, { id: string; payload: UpdateBlogPayload }>({
      query: ({ id, payload }) => ({ url: `/admin/blog/posts/${id}`, method: 'PUT', body: payload }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'BlogPost', id }, { type: 'BlogPost', id: 'LIST' }],
    }),
    deleteBlog: builder.mutation<{ id: string }, string>({
      query: (id) => ({ url: `/admin/blog/posts/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [{ type: 'BlogPost', id }, { type: 'BlogPost', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi
