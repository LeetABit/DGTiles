import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, getStoredState, KEY_PREFIX, REHYDRATE } from 'redux-persist';
import thunk from 'redux-thunk';
import editor from './states/editor';
import tiles from './states/tiles';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    tiles: persistReducer(persistConfig, tiles),
    editor,
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export const persistor = persistStore(store);

const handleStorageEvent = async (event: StorageEvent) => {
    if (event.oldValue === event.newValue
        || !event.key?.startsWith(KEY_PREFIX)) {
        return;
    }

    const key = event.key.substring(KEY_PREFIX.length);
    const payload = await getStoredState(persistConfig);
    const rehydrateAction = {
        type: REHYDRATE,
        payload,
        key,
    };

    store.dispatch(rehydrateAction);
}

window.addEventListener('storage', handleStorageEvent);
