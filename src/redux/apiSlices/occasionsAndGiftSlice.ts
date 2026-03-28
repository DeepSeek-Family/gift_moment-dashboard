
import { api } from "../api/baseApi";

interface OccasionItem {
    _id: string;
    name: string;
    image?: string;
}

interface OccasionListResponse {
    data: OccasionItem[];
}

interface GiftItem {
    _id: string;
    file: string;
    isFree: boolean;
    price: number;
    type: "image" | "video";
    isActive: "active" | "inactive";
    occasionId: string;
}

interface GiftListResponse {
    data: GiftItem[];
}

const occasionsAndGiftSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        createOccasionsAndGift: builder.mutation<OccasionItem, FormData>({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/occasions",
                    body: data,
                };
            },
        }),
        getAllOccasionsAndGift: builder.query<OccasionListResponse, void>({
            query: () => {
                return {
                    method: "GET",
                    url: "/occasions",
                };
            },
        }),
        // add gift
        createGift: builder.mutation<GiftItem, FormData>({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/cards",
                    body: data,
                };
            },
        }),
        getAllGift: builder.query<GiftListResponse, void>({
            query: () => {
                return {
                    method: "GET",
                    url: "/cards",
                };
            },
        }),


    }),
});

export const {
    useCreateOccasionsAndGiftMutation,
    useGetAllOccasionsAndGiftQuery,
    useCreateGiftMutation,
    useGetAllGiftQuery,
} = occasionsAndGiftSlice;