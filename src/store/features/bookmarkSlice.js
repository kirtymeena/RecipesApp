import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookmark: false,
    bookmarkList: []
}


const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {
        isBookmarked(state, action) {
            state.bookmark = action.payload
            if (action.payload.favirote && !state.bookmarkList.includes(action.payload.recipeId)) {
                state.bookmarkList.push(action.payload.recipeId)
            }
            if (action.payload.favirote === false && state.bookmarkList.includes(action.payload.recipeId)) {
                const index = state.bookmarkList.indexOf(action.payload.recipeId);
                state.bookmarkList.splice(index, 1)
            }

        }


    }
})

export const { isBookmarked } = bookmarkSlice.actions;
export default bookmarkSlice.reducer