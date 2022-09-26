import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    isActive: boolean,
    editedTileId: string | null,
}

const reducers = {
    toggleIsActive: (state: State) => {
        state.isActive = !state.isActive;
    },

    startEditing: (state: State, { payload: tileId }: PayloadAction<string>) => {
        state.editedTileId = tileId;
    },

    stopEditing: (state: State) => {
        state.editedTileId = null;
    },
};

const slice = createSlice<State, typeof reducers>({
    name: 'editor',
    initialState: {
        isActive: false,
        editedTileId: null,
    },
    reducers,
});

export default slice.reducer;

export const { toggleIsActive, stopEditing } = slice.actions;
export const startEditing = (editedTileId: string) => slice.actions.startEditing(editedTileId);
