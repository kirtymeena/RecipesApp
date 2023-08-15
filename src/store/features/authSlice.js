import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showAuthForm: false,
    userData: {}
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        showAuth(state, action) {
            state.showAuthForm = action.payload
        },
        getUserData(state, action) {
            state.userData = action.payload
        }
    }
})

export const { showAuth, getUserData } = authSlice.actions;
export default authSlice.reducer