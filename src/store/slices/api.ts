import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://parcel-delivery-system-apis.vercel.app"; 

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Parcel", "User", "Auth"],
  endpoints: (build) => ({
    // Auth
    login: build.mutation<
      { token: string; user: any },
      { email: string; password: string }
    >({
      query: (body) => ({ url: "/api/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    register: build.mutation<
      any,
      { name: string; email: string; password: string; role: string }
    >({
      query: (body) => ({ url: "/api/auth/register", method: "POST", body }),
    }),

    // Parcels
    createParcel: build.mutation<
      any,
      { receiverId: string; weight: number; address: string }
    >({
      query: (body) => ({ url: "/api/parcels", method: "POST", body }),
      invalidatesTags: (result) =>
        result ? [{ type: "Parcel", id: "LIST" }] : [],
    }),
    getMyParcels: build.query<any[], void>({
      query: () => ({ url: "/api/parcels/me" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((p: any) => ({
                type: "Parcel" as const,
                id: p._id,
              })),
              { type: "Parcel", id: "LIST" },
            ]
          : [{ type: "Parcel", id: "LIST" }],
    }),
    getIncomingParcels: build.query<any[], void>({
      query: () => ({ url: "/api/parcels/incoming" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((p: any) => ({
                type: "Parcel" as const,
                id: p._id,
              })),
              { type: "Parcel", id: "INCOMING" },
            ]
          : [{ type: "Parcel", id: "INCOMING" }],
    }),
    cancelParcel: build.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/api/parcels/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [
        { type: "Parcel", id: "LIST" },
        { type: "Parcel", id: "INCOMING" },
      ],
    }),
    updateParcelStatus: build.mutation<
      any,
      { id: string; status: string; note?: string }
    >({
      query: ({ id, ...rest }) => ({
        url: `/api/parcels/status/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Parcel", id: arg.id },
        { type: "Parcel", id: "LIST" },
        { type: "Parcel", id: "INCOMING" },
      ],
    }),
    trackParcel: build.query<any, { trackingId: string }>({
      query: ({ trackingId }) => ({ url: `/api/parcels/track/${trackingId}` }),
    }),

    // Admin / Users
    getAllUsers: build.query<any[], void>({
      query: () => ({ url: "/api/users" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((u) => ({ type: "User" as const, id: u._id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    blockUser: build.mutation<any, { id: string }>({
      query: ({ id }) => ({ url: `/api/users/block/${id}`, method: "PATCH" }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    unblockUser: build.mutation<any, { id: string }>({
      query: ({ id }) => ({ url: `/api/users/unblock/${id}`, method: "PATCH" }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getAllParcelsAdmin: build.query<any[], void>({
      query: () => ({ url: "/api/admin/parcels" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((p: any) => ({
                type: "Parcel" as const,
                id: p._id,
              })),
              { type: "Parcel", id: "LIST" },
            ]
          : [{ type: "Parcel", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreateParcelMutation,
  useGetMyParcelsQuery,
  useGetIncomingParcelsQuery,
  useCancelParcelMutation,
  useUpdateParcelStatusMutation,
  useTrackParcelQuery,
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetAllParcelsAdminQuery,
} = api;
