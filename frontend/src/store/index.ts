import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./walletSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web


const persistConfig = {
    key: "root",
    storage,
    whiteList: ["wallet"],
};

const persistedReducer = persistReducer(persistConfig, walletReducer);

export const store = configureStore({
    reducer: {
        wallet: persistedReducer,
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values from redux-persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;