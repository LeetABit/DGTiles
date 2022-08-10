import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Entity } from '../types';

export interface TileDefinition {
}

const tilesSlice = createSlice({
    name: 'tiles',
    initialState: {
        items: [] as Entity<TileDefinition>[],
    },
    reducers: {
        addTile: (state, action: PayloadAction<TileDefinition>) => { state.items.push(new Entity(action.payload)) },
        clearTiles: (state) => { state.items = [] },
        removeTile: (state, action: PayloadAction<string>) => { state.items = state.items.filter(tile => tile.id !== action.payload) },
    },
})

export default tilesSlice.reducer;
export const { addTile, clearTiles, removeTile } = tilesSlice.actions
