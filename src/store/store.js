import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./meals-api-slice";
import authReducer from "./features/authSlice";
import bookmarkReducer from "./features/bookmarkSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        bookmark: bookmarkReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
})


