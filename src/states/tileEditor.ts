import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const editingTiles = createSlice({
    name: 'tileEditor',
    initialState: {
        isActive: false,
        items: [] as number[],
        lastItem: 0,
    },
    reducers: {
        toggleIsActive: (state) => { state.isActive = !state.isActive },
        addItem: (state) => { state.items = [...(state.items), state.lastItem]; ++state.lastItem },
        clearItems: (state) => { state.items = []; state.lastItem = 0 },
        removeItem: (state, action: PayloadAction<number>) => { state.items.splice(action.payload, 1) },
    },
})

export default editingTiles.reducer;
export const { toggleIsActive, addItem, clearItems, removeItem } = editingTiles.actions
