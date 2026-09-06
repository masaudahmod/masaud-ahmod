import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

// Types for Category
export type Category = {
  id: string
  name: string
  slug?: string
  description?: string
  parentId?: string | null
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

export type CreateCategoryPayload = {
  name: string
  slug?: string
  description?: string
  parentId?: string
}

export type UpdateCategoryPayload = {
  name?: string
  slug?: string
  description?: string
  parentId?: string | null
}

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

  const errorResponse = (result.error?.data as ApiResponse<unknown>)
  if (errorResponse?.message) {
    return { error: { status: 'CUSTOM_ERROR', error: errorResponse.message } }
  }

  return result
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/admin/categories',
      providesTags: (categories) =>
        [
          ...(categories?.map(({ id }) => ({ type: 'Category' as const, id })) ?? []),
          { type: 'Category', id: 'LIST' },
        ],
    }),
    createCategory: builder.mutation<Category, CreateCategoryPayload>({
      query: (body) => ({ url: '/admin/categories', method: 'POST', body }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation<Category, { id: string; payload: UpdateCategoryPayload }>({
      query: ({ id, payload }) => ({ url: `/admin/categories/${id}`, method: 'PUT', body: payload }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Category', id }, { type: 'Category', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation<{ id: string }, string>({
      query: (id) => ({ url: `/admin/categories/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Category', id }, { type: 'Category', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi

