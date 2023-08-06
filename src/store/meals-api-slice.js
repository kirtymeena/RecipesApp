import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    // where we're keeping the data
    reducerPath: 'api',

    // how we're fetch
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://themealdb.com/api/json/v1/1'
    }),
    endpoints(builder) {
        return {
            fetchCategory: builder.query({
                query() {
                    return `/categories.php`
                }
            }),
            fetchMealByCategory: builder.query({
                query(category) {
                    return `filter.php?c=${category}`
                }
            })
        }
    }
});

export const { useFetchCategoryQuery, useFetchMealByCategoryQuery } = apiSlice;