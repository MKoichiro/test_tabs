import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import categoriesReducer from "../slices/categories";


export const store =  configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});

// redux 公式: https://react-redux.js.org/tutorials/typescript-quick-start#define-root-state-and-dispatch-types
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
// redux 公式: https://react-redux.js.org/tutorials/typescript-quick-start#define-typed-hooks
const useAppSelector = useSelector.withTypes<RootState>();
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// categories専用のuseSelectorを作成
export const useCategoriesSelector = () => useAppSelector(state => state.categories);

// useAppDispatchをuseDispatchとしてexport
export { useAppDispatch as useDispatch }