import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type DraggingTarget = 'todo' | 'category';
type Type = boolean;
type StateType = Record<DraggingTarget, Type>;

const initialState: StateType = {
    todo: false,
    category: false,
};

const GlobalDragging = createSlice({
    name: 'GlobalDragging',
    initialState,
    reducers: {
        setGlobalDragging: (state, action: PayloadAction<{ target: DraggingTarget; newState: Type }>) => {
            const { target, newState } = action.payload;
            state[target] = newState;
        },
    },
});

export const { setGlobalDragging } = GlobalDragging.actions;

export default GlobalDragging.reducer;
