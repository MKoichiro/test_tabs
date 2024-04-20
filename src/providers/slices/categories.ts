import { createSlice } from "@reduxjs/toolkit";
import { storedActiveIdx, storedCategories } from "../../data/categories";



const categories = createSlice({
  name: "categories",
  initialState: {activeIdx: storedActiveIdx, categories: storedCategories},
  reducers: {

    switchCategory: (state, action) => {
      const newActiveIdx = action.payload;
      // 1. state.categories: 各category.isActiveを書き換える
      state.categories.forEach((category, i) => {
        if (i === newActiveIdx) {
          category.isActive = true;
        } else {
          category.isActive = false;
        }
      });

      // 2. state.activeIdx: 更新
      state.activeIdx = newActiveIdx;
    },

    updateCategories: (state, action) => {
      state.categories = action.payload;
    },

    updateTodo: (state, action) => {
      const updatedTodo = action.payload;
      const currentCategory = state.categories[state.activeIdx];
      const todoIdx = currentCategory.todos.findIndex(todo => todo.id === updatedTodo.id);
      currentCategory.todos[todoIdx] = updatedTodo;
    },

    openTodo: (state, action) => {
      const todoId = action.payload;
      const currentCategory = state.categories[state.activeIdx];
      const todoIdx = currentCategory.todos.findIndex(todo => todo.id === todoId);
      const targetTodo = currentCategory.todos[todoIdx];
      targetTodo.isOpen = true;
    },

    closeTodo: (state, action) => {
      const todoId = action.payload;
      const currentCategory = state.categories[state.activeIdx];
      const todoIdx = currentCategory.todos.findIndex(todo => todo.id === todoId);
      const targetTodo = currentCategory.todos[todoIdx];
      targetTodo.isOpen = false;
    },

    updateTodoStatus: (state, action) => {
      const { todoId, newStatus } = action.payload;
      const currentCategory = state.categories[state.activeIdx];
      const todoIdx = currentCategory.todos.findIndex(todo => todo.id === todoId);
      const targetTodo = currentCategory.todos[todoIdx];
      targetTodo.status = newStatus;
    },

    updateTodoPriority: (state, action) => {
      const { todoId, newPriority } = action.payload;
      const currentCategory = state.categories[state.activeIdx];
      const todoIdx = currentCategory.todos.findIndex(todo => todo.id === todoId);
      const targetTodo = currentCategory.todos[todoIdx];
      targetTodo.priority = newPriority;
    },

    // updateTodoDeadline: (state, action) => {
    //   const { todoId, newDeadline } = action.payload;
    //   const currentCategory = state.categories[state.activeIdx];
    //   const todoIdx = currentCategory.todos.findIndex(todo => todo.id === todoId);
    //   const targetTodo = currentCategory.todos[todoIdx];
    //   targetTodo.deadline = newDeadline;
    // },

    addTodo: (state, action) => {
      const newTodo = action.payload;
      // push も mutable だけど、immer が対応してくれるのかな？、まあ、エラーが出るかも。
      state.categories[state.activeIdx].todos.push(newTodo);
    },

    archiveTodo: (state, action) => {
      const todoId = action.payload;
      const currentCategory = state.categories[state.activeIdx];
      const todoIdx = currentCategory.todos.findIndex(todo => todo.id === todoId);
      const targetTodo = currentCategory.todos[todoIdx];
      targetTodo.isArchived = true;
    },

    removeTodo: (state, action) => {
      const todoId = action.payload;
      const currentCategory = state.categories[state.activeIdx];
      const newTodos = currentCategory.todos.filter(todo => todo.id !== todoId);
      currentCategory.todos = newTodos;
    },
  }
});

// export const { addCategory, removeCategory } = categories.actions;

export default categories.reducer;