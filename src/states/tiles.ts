import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { identify, OptionalIdentifier } from '../types';

interface State {
    tiles: TileDefinition[],
    isEditorActive: boolean,
}

export interface TileDefinition {
    id?: string,
    name: string,
    editors: EditorIndex[],
}

export interface EditorIndex {
    id?: string,
    editorId: string,
}

const stripIdentity = <T extends OptionalIdentifier>(obj: T): T => {
    const result = { ...obj };
    delete result.id;
    return result;
}

export const stripTileIdentity = (tile: TileDefinition) => {
    const result = stripIdentity(tile);
    result.editors.forEach(editor => stripIdentity(editor));
}

const ensureIdentity = <T extends {}>(obj: T) => {
    return (!('id' in obj) || !obj['id' as keyof typeof obj])
        ? identify(obj)
        : obj;
}

export const ensureTileIdentity = (tile: TileDefinition): TileDefinition => {
    tile.editors.forEach(editor => ensureIdentity(editor));
    return ensureIdentity(tile);
}

const reducers = {
    toggleEditor: (state: State) => {
        state.isEditorActive = !state.isEditorActive;
    },

    newTile: (state: State) => {
        state.tiles.push(ensureTileIdentity({
            name: '',
            editors: [],
        }));
    },

    setTile: (state: State, { payload: tile }: PayloadAction<TileDefinition>) => {
        ensureTileIdentity(tile);
        const index = state.tiles.findIndex(item => item.id === tile.id);
        if (index === -1) {
            state.tiles.push(tile);
        } else {
            state.tiles[index] = tile;
        }
    },

    removeTile: (state: State, { payload: tileIndex }: PayloadAction<number>) => {
        state.tiles.splice(tileIndex, 1);
    },

    clearTiles: (state: State) => {
        state.tiles = [];
    },

    setTiles: (state: State, { payload: tiles }: PayloadAction<TileDefinition[]>) => {
        tiles.forEach(tile => ensureTileIdentity(tile));
        state.tiles = tiles;
    },

    setName: (state: State, { payload: [tileIndex, tileName] }: PayloadAction<[number, string]>) => {
        const tile = state.tiles.at(tileIndex);
        if (tile) {
            tile.name = tileName;
        }
    },

    setEditor: (state: State, { payload: [tileIndex, editor] }: PayloadAction<[number, EditorIndex]>) => {
        ensureIdentity(editor);
        const tile = state.tiles.at(tileIndex);
        if (tile) {
            const index = tile.editors.findIndex(item => item.id === editor.id);
            if (index === -1) {
                tile.editors.push(editor);
            } else {
                tile.editors[index] = editor;
            }
        }
    },

    removeEditor: (state: State, { payload: [tileIndex, editorIndex] }: PayloadAction<[number, number]>) => {
        state.tiles.at(tileIndex)?.editors.splice(editorIndex, 1);
    },
};

const tilesSlice = createSlice<State, typeof reducers>({
    name: 'tiles',
    initialState: {
        tiles: [],
        isEditorActive: false,
    },
    reducers,
})

export default tilesSlice.reducer;
export const {
    toggleEditor, newTile, setTile, removeTile, clearTiles, setTiles, setName, setEditor, removeEditor,
} = tilesSlice.actions;
