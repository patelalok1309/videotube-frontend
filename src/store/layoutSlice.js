import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sidebar: {
        isVisible: false
    },
    alert: {
        alertVisible: false,
        alertType: "",
        alertMessage: "",
    },
    videos: [],
    searchTerm: '',
    loading: false,
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
        setAlert: (state, action) => {
            state.alert.alertVisible = action.payload.alert.alertVisible
            state.alert.alertType = action.payload.alert.alertType
            state.alert.alertMessage = action.payload.alert.alertMessage
        },
        pushVideos: (state, action) => {
            state.videos.push(action.payload)
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { toggleSidebar, setSidebarVisibility, setAlert, pushVideos, setSearchTerm } = layoutSlice.actions;

export default layoutSlice.reducer;