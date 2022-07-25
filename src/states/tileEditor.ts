import { createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from '../hooks/stateHooks';
import { AppDispatch } from '../store';

const editingTiles = createSlice({
    name: 'tileEditor',
    initialState: {
        isActive: false,
    },
    reducers: {
        toggleIsActive: (state) => ({ isActive: !state.isActive }),
    },
})

export default editingTiles.reducer;
export const isActive = () => useAppSelector(state => state.tileEditor.isActive);
export const toggleIsActive = (dispatch: AppDispatch) => {
    return () => dispatch(editingTiles.actions.toggleIsActive());
}
