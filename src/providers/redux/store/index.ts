import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import categoriesReducer from "../slices/categoriesSlice";
import modalsReducer from "../slices/modalSlice";

export const store =  configureStore({
  reducer: {
    categories: categoriesReducer,
    modals: modalsReducer,
  },
});

// redux 公式: https://react-redux.js.org/tutorials/typescript-quick-start#define-root-state-and-dispatch-types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// redux 公式: https://react-redux.js.org/tutorials/typescript-quick-start#define-typed-hooks
const useAppSelector = useSelector.withTypes<RootState>();
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// 各slice専用のuseSelectorを作成
export const useCategoriesSelector = () => useAppSelector(state => state.categories);
export const useModalsSelector = () => useAppSelector(state => state.modals);

// useAppDispatchをuseDispatchとしてexport
export { useAppDispatch as useDispatch };