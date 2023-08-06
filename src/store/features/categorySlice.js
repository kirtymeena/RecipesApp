import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryDescription: ''
}


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        description(state, action) {
            state.categoryDescription = action.payload.categoryDescription
        }
    }
})

export const { description } = categorySlice.actions;
export default categorySlice.reducer