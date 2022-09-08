import { createSlice } from '@reduxjs/toolkit'

interface State {
    isActive: boolean,
}

const reducers = {
    toggleIsActive: (state: State) => {
        state.isActive = !state.isActive;
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
export const { toggleIsActive } = editorSlice.actions;
