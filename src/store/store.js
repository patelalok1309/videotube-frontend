import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./authSlice";
import layoutSlice from "./layoutSlice";

// Define the persist configuration
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

// Combine your reducers
const rootReducer = combineReducers({
    auth: authSlice,     // Correct key name for persisted state
    layout: layoutSlice, // Correct key name for persisted state
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
    reducer: persistedReducer, // Use persistedReducer here
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

// Create the persistor
export const persistor = persistStore(store);
