import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=ADMIN",
        };
      },
    }),
    users: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user",
        };
      },
    }),
    vendors: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=VENDOR",
        };
      },
    }),
    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/admin/users/${id}`,
        };
      },
    }),
    bannedUser: builder.mutation({
      query: ({ id, isBanned }) => {
        return {
          method: "PATCH",
          url: `/admin/user/ban/${id}`,
          body: {
            isBanned,
          }
        };
      },
    }),
  }),
});

export const {
  useAdminQuery,
  useUsersQuery,
  useVendorsQuery,
  useUserByIdQuery,
  useBannedUserMutation,
} = userSlice;