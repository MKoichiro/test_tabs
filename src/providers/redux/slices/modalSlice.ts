import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ModalName = string & { _nameBrand: never };

interface Modals {
    [name: ModalName]: {
        isOpen: boolean;
    };
}

interface StateType {
    modalStates: Modals;
    curentModal: ModalName | null;
}

const initialState: StateType = {
    modalStates: {},
    curentModal: null,
};

const modals = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<ModalName>) => {
            const name = action.payload;
            state.modalStates[name] = { isOpen: false };
        },
        open: (state, action: PayloadAction<ModalName>) => {
            const name = action.payload;
            state.curentModal = name;
            state.modalStates[name].isOpen = true;
        },
        close: (state, action: PayloadAction<ModalName>) => {
            const name = action.payload;
            state.curentModal = null;
            state.modalStates[name].isOpen = false;
        },
    },
});

export const { register, open, close } = modals.actions;

export default modals.reducer;

// uuid の生成は、reducerの純粋性を保つために、actionCreatorで行う
// export const registerModalActionCreator = createAction('modal/registerModal', function prepare(name) {
//   const id = generateUUID();  // UUIDの生成
//   return { payload: { name, id } };
// });

// 使用側
// const actionCreator = registerModalActionCreator('modalName');
// const action = registerModal(actionCreator.payload)
// dispatch(action);

// 未使用
// const createUUID = (name: ModalName) => {
//   return (dispatch: AppDispatch, getState: () => StateType) => {
//     const id = generateUUID();
//     dispatch(registerModal({ name, id }));
//   };
// };
