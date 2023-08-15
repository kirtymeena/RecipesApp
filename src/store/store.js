import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./meals-api-slice";
// import categoryReducer from "./features/categorySlice"
import authReducer from "./features/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
})


