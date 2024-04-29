import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    auth: {
        status: false,
        userData: null
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.auth.status = true;
            state.auth.userData = action.payload;
        },
        logout: (state) => {
            state.auth.status = false;
            state.auth.userData = null;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
