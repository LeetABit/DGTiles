import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { identify } from 'src/types';

export type TileDefinition = {
    name: string,
}

interface State {
    tilesOrder: string[],
    tileDefinitions: { [id: string]: TileDefinition },
}

const reducers = {
    setTile: (state: State, { payload: tileEntity }: PayloadAction<[string, TileDefinition]>) => {
        const [id, entity] = tileEntity;
        if (!state.tileDefinitions[id]) {
            state.tilesOrder.push(id);
        }

        state.tileDefinitions[id] = entity;
    },

    removeTile: (state: State, { payload: tileId }: PayloadAction<string>) => {
        const index = state.tilesOrder.indexOf(tileId);
        if (index >= 0) {
            state.tilesOrder.splice(index, 1);
            delete state.tileDefinitions[tileId];
        }
    },

    setTiles: (state: State, { payload: tiles }: PayloadAction<TileDefinition[]>) => {
        state.tilesOrder = [];
        state.tileDefinitions = {};

        for (const tile of tiles) {
            const id = uuid();
            state.tilesOrder.push(id);
            state.tileDefinitions[id] = tile;
        }
    },

    reorderTile: (state: State, { payload: [tileId, index] }: PayloadAction<[string, number]>) => {
        const currentIndex = state.tilesOrder.indexOf(tileId);
        if (currentIndex >= 0) {
            state.tilesOrder.splice(currentIndex, 1);
            state.tilesOrder.splice(index, 0, tileId);
        }
    },
};

const slice = createSlice<State, typeof reducers>({
    name: 'tiles',
    initialState: {
        tilesOrder: [],
        tileDefinitions: {},
    },
    reducers,
})

export default slice.reducer;

export const setTile = (tileId: string, tile: TileDefinition) => slice.actions.setTile([tileId, tile]);
export const removeTile = (tileId: string) => slice.actions.removeTile(tileId);
export const setTiles = (tileEntities: TileDefinition[]) => slice.actions.setTiles(tileEntities);
export const reorderTile = (tileId: string, index: number) => slice.actions.reorderTile([tileId, index]);
export const selectAllTiles = (state: State) => state.tilesOrder.map(id => identify(state.tileDefinitions[id], id));
