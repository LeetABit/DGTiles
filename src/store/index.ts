import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, getStoredState, KEY_PREFIX, REHYDRATE } from 'redux-persist';
import thunk from 'redux-thunk';
import tiles from './tiles';
import editor from './editor';

const rootReducer = combineReducers({
    tiles: persistReducer({
        key: 'tiles',
        storage,
    }, tiles),
    editor,
})

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

window.addEventListener('storage', async (event: StorageEvent) => {
    if (event.oldValue === event.newValue
        || !event.key?.startsWith(KEY_PREFIX)) {
        return;
    }

    const key = event.key.substring(KEY_PREFIX.length);
    const config = { key, storage };
    const payload = await getStoredState(config);
    const rehydrateAction = {
        type: REHYDRATE,
        payload,
        key,
    };

    store.dispatch(rehydrateAction);
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
export const persistor = persistStore(store);
