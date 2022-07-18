import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./api";


export const ordersDetailApi = createApi({
    reducerPath: "ordersDetailApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5051" }),
    endpoints: (builder) => ({
        getAllOrdersDetail: builder.query({
            query: () => `details`,
        }),
    }),
});
export const { useGetAllOrdersDetailQuery } = ordersDetailApi;