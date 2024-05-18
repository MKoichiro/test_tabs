import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InEditingData {
    id: string;
    inEditing: boolean;
}
type PropertyNames = 'name' | 'title' | 'deadline' | 'status' | 'priority';
type InEditingsObj = Record<PropertyNames, InEditingData[]>;

const initialState: InEditingsObj = {
    name: [],
    title: [],
    deadline: [],
    status: [],
    priority: [],
};

const immediateEditableSlice = createSlice({
    name: 'immediateEditable',
    initialState,
    reducers: {
        setInEditing: (state, action: PayloadAction<{ property: PropertyNames; newState: InEditingData }>) => {
            const { property, newState } = action.payload;
            const target = state[property].find((item) => item.id === newState.id);
            if (target) {
                target.inEditing = newState.inEditing;
            } else {
                state[property].push(newState);
            }

            // state[property] = state[property].map((item) => {
            //     if (item.id === target.id) {
            //         return { ...item, inEditing: !item.inEditing };
            //     }
            //     return item;
            // });
        },
    },
});

export const { setInEditing } = immediateEditableSlice.actions;

export default immediateEditableSlice.reducer;
