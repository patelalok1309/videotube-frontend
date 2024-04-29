import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sidebar: {
        isVisible: false
    },
    alert: {
        alertVisible : false,
        alertType: "",
        alertMessage : "",
    }
}

const layoutSlice = createSlice({
    name: 'layout',
    initialState: initialState,
    reducers: {
        toggleSidebar: (state, action) => {
            state.sidebar.isVisible = !state.sidebar.isVisible
        },
        setSidebarVisibility: (state, action) => {
            state.sidebar.isVisible = action.payload
        },
        setAlert : (state , action) => {
            state.alert.alertVisible = action.payload.alert.alertVisible
            state.alert.alertType = action.payload.alert.alertType
            state.alert.alertMessage = action.payload.alert.alertMessage
        }
    }
})

export const { toggleSidebar, setSidebarVisibility, setAlert } = layoutSlice.actions;

export default layoutSlice.reducer;