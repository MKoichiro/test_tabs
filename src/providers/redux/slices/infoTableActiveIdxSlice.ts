import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StateType {
    todoId: string;
    activeIdx: number | undefined;
}

const initialState: StateType[] = [];

const infoTableActiveIdx = createSlice({
    name: 'infoTableActiveIdx',
    initialState,
    reducers: {
        setActiveIdx: (state, action: PayloadAction<StateType>) => {
            const { todoId, activeIdx } = action.payload;
            const target = state.find((item) => item.todoId === todoId);
            if (target) {
                target.activeIdx = activeIdx;
            } else {
                state.push({ todoId, activeIdx });
            }
        },
    },
});

export const { setActiveIdx } = infoTableActiveIdx.actions;

export default infoTableActiveIdx.reducer;
