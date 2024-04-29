import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import layoutSlice from './layoutSlice';

const store = configureStore({
    reducer: { authSlice, layoutSlice }
});

export default store;