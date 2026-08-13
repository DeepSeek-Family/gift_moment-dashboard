import { api } from "../api/baseApi";

export type RuleType = "privacy" | "terms" | "about";

export type RuleDocument = {
  _id: string;
  content: string;
  __v?: number;
  type?: RuleType; // often absent — use requested type instead
};

type ApiSuccess<T> = {
  success: true;
  message: string;
  pagination?: unknown;
  data: T;
};

export type GetRuleResponse = ApiSuccess<RuleDocument | []>;
export type UpsertRuleResponse = ApiSuccess<RuleDocument>;

/** Normalize GET /rule/:type — data may be a doc or empty array when not created yet. */
export function getRuleContent(
  data: RuleDocument | [] | undefined | null,
): string {
  if (Array.isArray(data) && data.length === 0) return "";
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data.content ?? "";
  }
  return "";
}

const ruleSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getRulesAbout: builder.query<GetRuleResponse, void>({
      query: () => ({
        method: "GET",
        url: "/rule/about",
      }),
      providesTags: [{ type: "Rule", id: "about" }],
    }),
    updateRulesAbout: builder.mutation<
      UpsertRuleResponse,
      { content: string }
    >({
      query: (data) => ({
        method: "POST",
        url: "/rule",
        body: {
          content: data.content,
          type: "about" satisfies RuleType,
        },
      }),
      invalidatesTags: [{ type: "Rule", id: "about" }],
    }),
    getRulesTerms: builder.query<GetRuleResponse, void>({
      query: () => ({
        method: "GET",
        url: "/rule/terms",
      }),
      providesTags: [{ type: "Rule", id: "terms" }],
    }),
    updateRulesTerms: builder.mutation<
      UpsertRuleResponse,
      { content: string }
    >({
      query: (data) => ({
        method: "POST",
        url: "/rule",
        body: {
          content: data.content,
          type: "terms" satisfies RuleType,
        },
      }),
      invalidatesTags: [{ type: "Rule", id: "terms" }],
    }),
    getRulesPrivacy: builder.query<GetRuleResponse, void>({
      query: () => ({
        method: "GET",
        url: "/rule/privacy",
      }),
      providesTags: [{ type: "Rule", id: "privacy" }],
    }),
    updateRulesPrivacy: builder.mutation<
      UpsertRuleResponse,
      { content: string }
    >({
      query: (data) => ({
        method: "POST",
        url: "/rule",
        body: {
          content: data.content,
          type: "privacy" satisfies RuleType,
        },
      }),
      invalidatesTags: [{ type: "Rule", id: "privacy" }],
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
