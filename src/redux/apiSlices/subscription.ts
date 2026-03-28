
import { api } from "../api/baseApi";

const subscriptionSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubscriberList: builder.query({
            query: () => {
                return {
                    method: "GET",
                    url: "/subscription",
                };
            },
        }),
    }),
});

export const {
    useGetAllSubscriberListQuery,
} = subscriptionSlice;