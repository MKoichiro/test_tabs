import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storedActiveIdx, storedCategories } from '../../../data/categories';
import { arrayMove } from '@dnd-kit/sortable';
import { CategoryType, TodoType } from '../../types/categories';

// types
interface CategoriesState {
    activeIdx: number;
    categoriesEntity: CategoryType[];
}

const initialState: CategoriesState = {
    activeIdx: storedActiveIdx,
    categoriesEntity: storedCategories,
};

// helpers for each reducer
// reducerが増えそうになければ、廃止も検討
const getCurrentCategory = (state: CategoriesState) => {
    return state.categoriesEntity[state.activeIdx];
};
const getTargetTodoIdx = (state: CategoriesState, todoId: string) => {
    const currentCategory = getCurrentCategory(state);
    return currentCategory.todos.findIndex((todo) => todo.id === todoId);
};
const getTargetTodo = (state: CategoriesState, todoId: string) => {
    const currentCategory = getCurrentCategory(state);
    const todoIdx = getTargetTodoIdx(state, todoId);
    return currentCategory.todos[todoIdx];
};

const categories = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        // Categoryまでの更新

        switchCategory: (state, action: PayloadAction<number>) => {
            state.activeIdx = action.payload;
        },

        updateCategories: (state, action: PayloadAction<CategoryType[]>) => {
            state.categoriesEntity = action.payload;
        },

        updateCategoryProps: (
            state,
            action: PayloadAction<{ categoryId: string; update: Partial<CategoryType> }>
        ) => {
            const { categoryId, update } = action.payload;
            const categoryIdx = state.categoriesEntity.findIndex(
                (category) => category.id === categoryId
            );
            const targetCategory = state.categoriesEntity[categoryIdx];
            Object.assign(targetCategory, update);
        },

        deleteCategory: (state, action: PayloadAction<{ categoryId: string }>) => {
            const { categoryId } = action.payload;
            const removedCategories = state.categoriesEntity.filter(
                (category) => category.id !== categoryId
            );
            state.categoriesEntity = removedCategories;
        },

        // Todoより深層の更新

        /**
         * 汎用的な分todoをdeep copyなどして編集し、丸ごと渡す必要があるため、面倒だしメモリ効率も悪い
         * 基本的にupdateTodoPropsを使う。
         * @deprecated
         */
        updateTodo: (state, action: PayloadAction<{ updatedTodo: TodoType }>) => {
            const { updatedTodo } = action.payload;
            const currentCategory = getCurrentCategory(state);
            const todoIdx = currentCategory.todos.findIndex((todo) => todo.id === updatedTodo.id);
            currentCategory.todos[todoIdx] = updatedTodo;
        },

        // 並び替え、dnd-kitと連携して使う
        replaceTodos: (state, action: PayloadAction<{ oldIdx: number; newIdx: number }>) => {
            const { oldIdx, newIdx } = action.payload;
            const currentCategory = getCurrentCategory(state);
            const targetTodos = currentCategory.todos;
            const newTodos = arrayMove(targetTodos, oldIdx, newIdx);
            currentCategory.todos = newTodos;
        },

        // 複数propsにも対応
        // updateに{title: 'new title', detail: 'new detail'}を指定すれば、titleとdetailが更新される
        updateTodoProps: (
            state,
            action: PayloadAction<{ todoId: string; update: Partial<TodoType> }>
        ) => {
            const { todoId, update } = action.payload;
            const targetTodo = getTargetTodo(state, todoId);
            Object.assign(targetTodo, update);
        },

        addTodo: (state, action: PayloadAction<TodoType>) => {
            const newTodo = action.payload;
            state.categoriesEntity[state.activeIdx].todos.push(newTodo);
        },

        deleteTodo: (state, action: PayloadAction<{ todoId: string }>) => {
            const { todoId } = action.payload;
            const currentCategory = getCurrentCategory(state);
            const newTodos = currentCategory.todos.filter((todo) => todo.id !== todoId);
            currentCategory.todos = newTodos;
        },
    },
});

// action creators
export const {
    switchCategory,
    updateCategories,
    updateCategoryProps,
    deleteCategory,
    updateTodo,
    replaceTodos,
    updateTodoProps,
    addTodo,
    deleteTodo,
} = categories.actions;

export default categories.reducer;
