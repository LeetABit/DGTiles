import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Entity } from '../types';

export interface TileDefinition {
}

interface State {
    items: Entity<TileDefinition>[],
}

const reducers = {
    addOrUpdateItem: (state: State, { payload: tile }: PayloadAction<Entity<TileDefinition>>) => {
        const index = state.items.findIndex(item => item.id === tile.id);
        if (index === -1) {
            state.items.push(tile);
        } else {
            state.items[index] = tile;
        }
    },

    removeItem: (state: State, { payload: tileId }: PayloadAction<string>) => {
        state.items = state.items.filter(item => item.id !== tileId);
    },

    clearItems: (state: State) => {
        state.items = [];
    },

    setItems: (state: State, { payload: items }: PayloadAction<Entity<TileDefinition>[]>) => {
        state.items = items;
    },
};

const tilesSlice = createSlice<State, typeof reducers>({
    name: 'tiles',
    initialState: {
        items: [],
    },
    reducers,
})

export default tilesSlice.reducer;
export const { addOrUpdateItem, removeItem, clearItems, setItems } = tilesSlice.actions;
