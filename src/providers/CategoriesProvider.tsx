import React, { ReactNode, createContext, useReducer } from 'react';
import { storedActiveIdx, storedCategories } from '../data/categories';
import { CategoryType, TodoType, DeadlineType, notSet } from '../types/Categories';
import DOMPurify from 'dompurify';
import { generateUUID } from '../utils/generateUUID';
import { isDebugMode } from '../utils/adminDebugMode';
import { StatusUnionType } from '../types/Categories';
const marked = require('marked');

// Context
interface CategoriesContextType {
  activeIdx: number;
  categories: CategoryType[];
  dispatchCategoriesChange: React.Dispatch<ActionType>;
  checkIsCompleted: (todo: TodoType) => boolean;
  checkIsExpired: (todo: TodoType) => boolean;
  getFormattedDate: (date: Date) => string;
  getSanitizedDetail: (todo: TodoType) => string;
  deadlineFormatters: {
    convertToStoredFormat: (dateInput: Date | undefined, timeInput: Date | undefined) => DeadlineType, 
    convertToDisplayFormat: (todo: TodoType) => string
  };
}
export const CategoriesContext = createContext<CategoriesContextType>({
  activeIdx: storedActiveIdx,
  categories: storedCategories,
  dispatchCategoriesChange: () => {},
  checkIsCompleted: () => false,
  checkIsExpired: () => false,
  getFormattedDate: () => notSet,
  getSanitizedDetail: () => '',
  deadlineFormatters: {
    convertToStoredFormat: () => notSet,
    convertToDisplayFormat: () => notSet,
  },
});

// functions
const checkIsCompleted = (todo: TodoType) => {
  return todo.status === 'completed';
};
const checkIsExpired = (todo: TodoType) => {
  const deadline = todo.deadline;
  if (!checkIsCompleted(todo) && deadline !== notSet) {
    return Date.now() > deadline.date.getTime();
  }
  return false;
};

const getFormattedDate = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

const getSanitizedDetail = (todo: TodoType) => {
  const detail = todo.detail;
  return DOMPurify.sanitize(marked.parse(detail));
};



const convertToStoredFormat = (dateInput: Date | undefined, timeInput: Date | undefined): DeadlineType => {
  const now = new Date();
  let deadline: Date;

  if (timeInput) {

    if (dateInput) { deadline = new Date(`${ dateInput } ${ timeInput }`); } // 年月日: 有り,   時刻: 有り
    else { deadline = new Date(`${ now.toDateString() } ${ timeInput }`);  } // 年月日: 無し,   時刻: 有り
    return { date: deadline, use_time: true }

  } else  if (dateInput) {
      deadline = new Date(`${ dateInput } 23:59:59`);
      return { date: deadline, use_time: false }                             // 年月日: 有り,   時刻: 無し
  }

  return notSet;                                                             // 年月日: 無し,   時刻: 無し
};
const convertToDisplayFormat = (todo: TodoType) => {
  const deadline = todo.deadline;
  if (deadline === notSet) return notSet;

  const date = deadline.date;
  if (deadline.use_time) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`; // 例: 2021/8/1 12:34
  } else {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;                                         // 例: 2021/8/1
  }
};

const deadlineFormatters = {
  convertToStoredFormat,
  convertToDisplayFormat
};







// reducer
type StateType = {
  activeIdx: number;
  categories: CategoryType[];
};
type ActionType =
  | {
    type: 'switch_tab';
    newActiveIdx: number;
  }
  | {
    type: 'update_categories';
    newCategories: CategoryType[];
  }
  | {
    type: 'add_new_todo';
    newTodo: TodoType;
  }
  | {
    type: 'update_todo';
    newTodo: TodoType;
  }
  | {
    type: 'todo_open';
    todoId: string;
  }
  | {
    type: 'todo_close';
    todoId: string;
  }
  | {
    type: 'change_todo_status';
    todoId: string;
    newStatus: StatusUnionType;
  }
  | {
    type: 'archive_todo';
    todoId: string;
  }
  | {
    type: 'delete_todo';
    todoId: string;
  };


const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {

    case 'switch_tab': {
        const newCategories = state.categories.map((category, i) => {
          category.isActive = false;
          i === action.newActiveIdx && (category.isActive = true);
          return category;
        });
        const newState = {...state, activeIdx: action.newActiveIdx, categories: newCategories};
        return newState;
    }

    case 'update_categories': {
        const newState = {...state, categories: action.newCategories};
        return newState;
    }

    // これは汎用的なメソッド。
    // 基本的にはこれより下のメソッドを使った方が、
    // newCategoriesを作って渡す手間がいらないので、記述が簡潔になる。
    case 'update_todo': {
      const newTodo = action.newTodo;
      // take a deep copy of state.categories
      const newCategories = state.categories.map(category => ({
        ...category,
        todos: category.todos.map(todo => ({ ...todo }))
      }));
      const category = newCategories[state.activeIdx];
      const todoIdx = category.todos.findIndex(todo => todo.id === newTodo.id);
      newCategories[state.activeIdx].todos[todoIdx] = newTodo;
      return { ...state, categories: newCategories };
    }

    case 'todo_open': {
      const todoId = action.todoId;
      // take a deep copy of state.categories
      const newCategories = state.categories.map(category => ({
        ...category,
        todos: category.todos.map(todo => ({ ...todo }))
      }));
      const category = newCategories[state.activeIdx];
      const todoIdx = category.todos.findIndex(todo => todo.id === todoId);
      newCategories[state.activeIdx].todos[todoIdx].isOpen = true;
      return { ...state, categories: newCategories };
    }
    
    case 'todo_close': {
      const todoId = action.todoId;
      // take a deep copy of state.categories
      const newCategories = state.categories.map(category => ({
        ...category,
        todos: category.todos.map(todo => ({ ...todo }))
      }));
      const category = newCategories[state.activeIdx];
      const todoIdx = category.todos.findIndex(todo => todo.id === todoId);
      newCategories[state.activeIdx].todos[todoIdx].isOpen = false;
      return { ...state, categories: newCategories };
    }

    case 'change_todo_status': {
      const todoId = action.todoId;
      const newStatus = action.newStatus;
      const newCategories = state.categories.map(category => ({
        ...category,
        todos: category.todos.map(todo => ({ ...todo }))
      }));
      const category = newCategories[state.activeIdx];
      const todoIdx = category.todos.findIndex(todo => todo.id === todoId);
      newCategories[state.activeIdx].todos[todoIdx].status = newStatus;
      return { ...state, categories: newCategories };
    }

    case 'archive_todo': {
      const todoId = action.todoId;
      const newCategories = state.categories.map(category => ({
        ...category,
        todos: category.todos.map(todo => ({ ...todo }))
      }));
      const category = newCategories[state.activeIdx];
      const todoIdx = category.todos.findIndex(todo => todo.id === todoId);
      newCategories[state.activeIdx].todos[todoIdx].isArchived = true;
      return { ...state, categories: newCategories };
    }

    case 'delete_todo': {
      const todoId = action.todoId;
      const newCategories = state.categories.map(category => ({
        ...category,
        todos: category.todos.map(todo => ({ ...todo }))
      }));
      const category = newCategories[state.activeIdx];
      const newTodos = category.todos.filter(todo => todo.id !== todoId); // delete logic: 渡された todo 以外で新しい配列を作成
      newCategories[state.activeIdx].todos = newTodos;
      return { ...state, categories: newCategories };
    }

    case 'add_new_todo': {  // 動作に不具合は無いが、これは純粋な関数ではないので、後で修正が必要。
      const newTodo = action.newTodo;

      if (isDebugMode) {
        // strict モードの場合、二度呼び出されてしまうので、重複を防ぐ。→二度呼び出しても同一の結果を返すように設計を変更すべき。
        const category = state.categories[state.activeIdx];
        const isDuplicate = category.todos.find(todo => todo.id === newTodo.id);
        if (isDuplicate) return state;
      }

      const newCategories = [...state.categories];
      newCategories[state.activeIdx].todos.push(newTodo);
      return { ...state, categories: newCategories };
    }

  }
};

// Provider
const initialState: StateType = {
  activeIdx: storedActiveIdx,
  categories: storedCategories,
}
export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ...state,
    dispatchCategoriesChange: dispatch,
    checkIsCompleted,
    checkIsExpired,
    getFormattedDate,
    getSanitizedDetail,
    deadlineFormatters,
  };
  

  return (
    <CategoriesContext.Provider value={value} > 
      { children }
    </CategoriesContext.Provider>
  );
};