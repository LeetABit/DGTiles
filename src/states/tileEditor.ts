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
        removeItem: (state, action: PayloadAction<number>) => { state.items.splice(action.payload, 1) },
    },
})

export default editingTiles.reducer;
export const { toggleIsActive, addItem, removeItem } = editingTiles.actions
