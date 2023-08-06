import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./meals-api-slice";
// import categoryReducer from "./features/categorySlice"
import categorySlice from "./features/categorySlice";


export const store = configureStore({
    reducer: {
        category: categorySlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
})


