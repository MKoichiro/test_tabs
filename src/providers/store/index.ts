import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slices/categories";


export default configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});