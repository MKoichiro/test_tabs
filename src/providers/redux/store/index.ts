import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import categoriesReducer from '../slices/categoriesSlice';
import modalsReducer from '../slices/modalSlice';
import cardReducer from '../slices/cardSlice';
import windowSizeReducer from '../slices/window_size_slice/windowSizeSlice';
import immediateEditableReducer from '../slices/immediateEditableSlice';
import infoTableActiveIdxReducer from '../slices/infoTableActiveIdx';

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        modals: modalsReducer,
        card: cardReducer,
        windowSize: windowSizeReducer,
        immediateEditable: immediateEditableReducer,
        infoTableActiveIdx: infoTableActiveIdxReducer,
    },
});

// redux 公式: https://react-redux.js.org/tutorials/typescript-quick-start#define-root-state-and-dispatch-types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// redux 公式: https://react-redux.js.org/tutorials/typescript-quick-start#define-typed-hooks
const useAppSelector = useSelector.withTypes<RootState>();

// 各slice専用のuseSelectorを作成
export const useCategoriesSelector = () => useAppSelector((state) => state.categories);
export const useModalsSelector = () => useAppSelector((state) => state.modals);
export const useCardSelector = () => useAppSelector((state) => state.card);
export const useWindowSizeSelector = () => useAppSelector((state) => state.windowSize);
export const useImmediateEditableSelector = () =>
    useAppSelector((state) => state.immediateEditable);
export const useInfoTableActiveIdxSelector = (id: string) => useAppSelector((state) => {
    return state.infoTableActiveIdx.find((item) => item.todoId === id);
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// useAppDispatchをuseDispatchとしてexport
export { useAppDispatch as useDispatch };
