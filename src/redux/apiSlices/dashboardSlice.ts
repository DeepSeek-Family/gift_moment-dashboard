
import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAnalytic: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/analytic",
        };
      },
    }),
    getDashboardUserMonthlyProgress: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/user-monthly-progress",
        };
      },
    }),
    getDashboardRevenueMonthlyProgress: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/subscription-monthly-progress",
        };
      },
    }),
    getRecentSubscribers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/recent-subscribers",
        };
      },
    }),
    getAllUserForDashboard: builder.query({
      query: ({ page, limit }) => {
        return {
          method: "GET",
          url: `/admin/users?page=${page}&limit=${limit}`,
        };
      },
    }),
  }),
});

export const {
  useGetDashboardAnalyticQuery,
  useGetDashboardUserMonthlyProgressQuery,
  useGetDashboardRevenueMonthlyProgressQuery,
  useGetRecentSubscribersQuery,
  useGetAllUserForDashboardQuery,
} = dashboardSlice;