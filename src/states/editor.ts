import { createSlice } from '@reduxjs/toolkit'

const editingTiles = createSlice({
    name: 'editor',
    initialState: {
        isActive: false,
    },
    reducers: {
        toggleIsActive: (state) => { state.isActive = !state.isActive },
    },
})

export default editingTiles.reducer;
export const { toggleIsActive } = editingTiles.actions
