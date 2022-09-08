import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Entity } from '../types';

export interface TileDefinition {
    functions: number[],
    input: Entity<number>[],
    output: Entity<number>[],
    functionLinks: FunctionLink[],
    inputLinks: EditorLink[],
    outputLinks: EditorLink[],
}

export interface FunctionParameter {
    functionIndex: number,
    parameterIndex: number,
}

export interface FunctionLink {
    input: FunctionParameter,
    output: FunctionParameter,
}

export interface EditorLink {
    editorIndex: number,
    functionParameter: FunctionParameter,
}

interface State {
    items: Entity<TileDefinition>[],
    editedItemIndex: number,
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
        const index = state.items.findIndex(item => item.id === tileId);
        if (index !== -1) {
            if (state.editedItemIndex === index) {
                state.editedItemIndex = -1;
            }

            state.items.splice(index, 1);
        }
    },

    clearItems: (state: State) => {
        state.items = [];
        state.editedItemIndex = -1;
    },

    setItems: (state: State, { payload: items }: PayloadAction<Entity<TileDefinition>[]>) => {
        state.items = items;
        state.editedItemIndex = -1;
    },

    setEditedItemIndex: (state: State, { payload: editedItemIndex }: PayloadAction<number>) => {
        state.editedItemIndex = editedItemIndex;
    },

    addFunction: (state: State, { payload: functionIndex }: PayloadAction<number>) => {
        if (state.editedItemIndex !== -1) {
            const item = state.items[state.editedItemIndex];
            item.entity.functions.push(functionIndex);
        }
    },

    addInputEditor: (state: State, { payload: editorIndex }: PayloadAction<number>) => {
        if (state.editedItemIndex !== -1) {
            const item = state.items[state.editedItemIndex];
            item.entity.input.push(new Entity<number>(editorIndex));
        }
    },

    addOutputEditor: (state: State, { payload: editorIndex }: PayloadAction<number>) => {
        if (state.editedItemIndex !== -1) {
            const item = state.items[state.editedItemIndex];
            item.entity.output.push(new Entity<number>(editorIndex));
        }
    },

    linkFunctions: (state: State, { payload: link }: PayloadAction<FunctionLink>) => {
        if (state.editedItemIndex !== -1) {
            const item = state.items[state.editedItemIndex];
            item.entity.functionLinks.push(link);
        }
    },

    linkInput: (state: State, { payload: link }: PayloadAction<EditorLink>) => {
        if (state.editedItemIndex !== -1) {
            const item = state.items[state.editedItemIndex];
            item.entity.inputLinks.push(link);
        }
    },

    linkOutput: (state: State, { payload: link }: PayloadAction<EditorLink>) => {
        if (state.editedItemIndex !== -1) {
            const item = state.items[state.editedItemIndex];
            item.entity.outputLinks.push(link);
        }
    },
};

const tilesSlice = createSlice<State, typeof reducers>({
    name: 'tiles',
    initialState: {
        items: [],
        editedItemIndex: -1,
    },
    reducers,
})

export default tilesSlice.reducer;
export const {
    addOrUpdateItem, removeItem, clearItems, setItems, setEditedItemIndex, addFunction, addInputEditor, addOutputEditor, linkFunctions, linkInput, linkOutput,
} = tilesSlice.actions;
