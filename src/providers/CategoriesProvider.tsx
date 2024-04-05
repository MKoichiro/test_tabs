import React, { ReactNode, createContext, useReducer } from 'react';
import { storedActiveIdx, storedCategories } from '../data/categories';
import { CategoryType, TodoType, DeadlineType } from '../types/Categories';
import DOMPurify from 'dompurify';
import { generateUUID } from '../utils/generateUUID';
import { isDebugMode } from '../utils/adminDebugMode';
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
  getFormattedDate: () => '---',
  getSanitizedDetail: () => '',
  deadlineFormatters: {
    convertToStoredFormat: () => '---',
    convertToDisplayFormat: () => '---',
  },
});

// functions
const checkIsCompleted = (todo: TodoType) => {
  return todo.status === 'completed';
};
const checkIsExpired = (todo: TodoType) => {
  const deadline = todo.deadline;
  if (!checkIsCompleted(todo) && deadline !== '---') {
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

  return '---';                                                              // 年月日: 無し,   時刻: 無し
};
const convertToDisplayFormat = (todo: TodoType) => {
  const deadline = todo.deadline;
  if (deadline === '---') return '---';

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
    type: 'test';
    arg1: string;
    arg2: number;
};
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {

    case 'switch_tab': {
        const newCategories = state.categories.map((todos, i) => {
          todos.isActive = false;
          i === action.newActiveIdx && (todos.isActive = true);
          return todos;
        });
        const newState = {...state, activeIdx: action.newActiveIdx, categories: newCategories};
        return newState;
    }

    case 'update_categories': {
        const newState = {...state, categories: action.newCategories};
        return newState;
    }

    case 'add_new_todo': {
      const newTodo = action.newTodo;

      if (isDebugMode) {
        // strict モードの場合、二度呼び出されてしまうので、重複を防ぐ。
        const category = state.categories[state.activeIdx];
        const isDuplicate = category.todos.find(todo => todo.id === newTodo.id);
        if (isDuplicate) return state;
      }

      const newCategories = [...state.categories];
      newCategories[state.activeIdx].todos.push(newTodo);
      return { ...state, categories: newCategories };
    }

    case 'test': {
      return state;
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
    // getFormattedDeadline,
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