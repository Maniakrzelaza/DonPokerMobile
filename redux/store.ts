import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import mainReducer from './slices/mainSlice';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, mainReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

// @ts-ignore
if (process.env.NODE_ENV === "development" && module.hot) {
    // @ts-ignore
    module.hot.accept(() => {
        const newRootReducer = require("./slices/mainSlice").default;
        store.replaceReducer(newRootReducer);
    });
}

export const persistor = persistStore(store);