import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5002/api/v1";

// 1. Data Models and Types
export type ContactStatus = "NEW" | "READ" | "REPLIED" | "CLOSED";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  ipAddress?: string | null;
  status: ContactStatus;
  repliedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedContactResponse {
  data: ContactMessage[];
  meta: PaginatedMeta;
}

export interface GetMessagesQueryParams {
  status?: ContactStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface UpdateStatusPayload {
  id: string;
  status: ContactStatus;
}

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  meta?: PaginatedMeta;
};

// 2. Base Query with Header Preparation
const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// 3. Base Query with Automatic Token Refresh & Response Unwrapping
const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await rawBaseQuery(
      { url: "/auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );
    if ("data" in refreshResult) {
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  if ("data" in result) {
    const response = result.data as ApiResponse<unknown>;
    if (!response.success) {
      return { error: { status: "CUSTOM_ERROR", error: response.message ?? "Request failed." } };
    }

    // Preserve metadata if present in paginated responses
    if (response.meta) {
      return { data: { data: response.data, meta: response.meta } };
    }

    return { data: response.data };
  }

  const errorResponse = result.error?.data as ApiResponse<unknown> | undefined;
  if (errorResponse?.message) {
    return { error: { status: "CUSTOM_ERROR", error: errorResponse.message } };
  }

  return result;
};

// 4. API Definition
export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["ContactMessage"],
  endpoints: (builder) => ({
    getContactMessages: builder.query<PaginatedContactResponse, GetMessagesQueryParams | void>({
      query: (params) => ({
        url: "/admin/contact/messages",
        params: params ?? {},
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "ContactMessage" as const, id })),
              { type: "ContactMessage", id: "LIST" },
            ]
          : [{ type: "ContactMessage", id: "LIST" }],
    }),

    getContactMessageById: builder.query<ContactMessage, string>({
      query: (id) => `/admin/contact/messages/${id}`,
      providesTags: (_result, _error, id) => [{ type: "ContactMessage", id }],
      // Automatically refresh the message list tag when auto-updated from NEW to READ
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(contactApi.util.invalidateTags([{ type: "ContactMessage", id: "LIST" }]));
        } catch {
          // Ignored
        }
      },
    }),

    updateContactStatus: builder.mutation<ContactMessage, UpdateStatusPayload>({
      query: ({ id, status }) => ({
        url: `/admin/contact/messages/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ContactMessage", id },
        { type: "ContactMessage", id: "LIST" },
      ],
    }),

    deleteContactMessage: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/admin/contact/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "ContactMessage", id },
        { type: "ContactMessage", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetContactMessagesQuery,
  useGetContactMessageByIdQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMessageMutation,
} = contactApi;