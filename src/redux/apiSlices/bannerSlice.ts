
import { api } from "../api/baseApi";

const bannerSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    allBanner: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/banner/admin",
        };
      },
    }),

    createBanner: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/banner",
          body: data,
        };
      },
    }),
    updateBannerStatus: builder.mutation({
      query: ({ id, status }) => {
        return {
          method: "PATCH",
          url: `/banner/${id}`,
          body: { status },
        };
      },
    }),
  }),
});

export const {
  useAllBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerStatusMutation,
} = bannerSlice;