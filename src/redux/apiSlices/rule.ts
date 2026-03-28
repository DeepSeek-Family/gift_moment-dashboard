import { api } from "../api/baseApi";

const ruleSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getRulesAbout: builder.query({
            query: () => {
                return {
                    method: "GET",
                    url: "/rule/about",
                };
            },
        }),
        updateRulesAbout: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/rule",
                    body: {
                        content: data.content,
                        type: "about",
                    },
                };
            },
        }),
        getRulesTerms: builder.query({
            query: () => {
                return {
                    method: "GET",
                    url: "/rule/terms",
                };
            },
        }),
        updateRulesTerms: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/rule",
                    body: {
                        content: data.content,
                        type: "terms",
                    },
                };
            },
        }),
        getRulesPrivacy: builder.query({
            query: () => {
                return {
                    method: "GET",
                    url: "/rule/privacy",
                };
            },
        }),
        updateRulesPrivacy: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/rule",
                    body: {
                        content: data.content,
                        type: "privacy",
                    },
                };
            },
        }),
    }),
});

export const {
    useGetRulesAboutQuery,
    useUpdateRulesAboutMutation,
    useGetRulesTermsQuery,
    useUpdateRulesTermsMutation,
    useGetRulesPrivacyQuery,
    useUpdateRulesPrivacyMutation,
} = ruleSlice;
