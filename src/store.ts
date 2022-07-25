import { configureStore } from '@reduxjs/toolkit'
import tileEditor from './states/tileEditor'

export const store = configureStore({
    reducer: {
        tileEditor,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
