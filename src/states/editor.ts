import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Entity } from '../types';
import { TileDefinition } from './tiles';

interface State {
    isActive: boolean,
    editedItem?: Entity<TileDefinition>,
}

const reducers = {
    toggleIsActive: (state: State) => {
        state.isActive = !state.isActive;
    },
    setEditedItem: (state: State, { payload: editedItem }: PayloadAction<Entity<TileDefinition> | undefined>) => {
        state.editedItem = editedItem;
    },
}

const editorSlice = createSlice<State, typeof reducers>({
    name: 'editor',
    initialState: {
        isActive: false,
    },
    reducers,
})

export default editorSlice.reducer;
export const { toggleIsActive, setEditedItem } = editorSlice.actions;
