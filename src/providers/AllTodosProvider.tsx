import React, { ReactNode, createContext, useReducer } from 'react';
import { TodosType } from '../types/Todos';
import { storedActiveIndex, storedAllTodos } from '../data/allTodos';

// Context
interface AllTodosContextType {
  activeIndex: number;
  allTodos: TodosType[];
  dispatchAllTodosChange: React.Dispatch<ActionType>;
}
export const AllTodosContext = createContext<AllTodosContextType>({
  activeIndex: storedActiveIndex,
  allTodos: storedAllTodos,
  dispatchAllTodosChange: () => {},
});


// reducer
type StateType = {
  activeIndex: number;
  allTodos: TodosType[];
};
type ActionType =
  | {
    type: 'switch_tab';
    newActiveIndex: number;
  }
  | {
    type: 'update_all_todos';
    newAllTodos: TodosType[];
  }
  | {
    type: 'test';
    arg1: string;
    arg2: number;
};
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'switch_tab':
      {
        const newAllTodos = state.allTodos.map((todos, i) => {
          todos.active = false;
          i === action.newActiveIndex && (todos.active = true);
          return todos;
        });
        const newState = {...state, activeIndex: action.newActiveIndex, allTodos: newAllTodos};
        return newState;
      }
    case 'update_all_todos':
      {
        const newState = {...state, allTodos: action.newAllTodos};
        return newState;
      }
    case 'test':
      return state;
  }
};

// Provider
const initialState: StateType = {
  activeIndex: storedActiveIndex,
  allTodos: storedAllTodos,
}
export const AllTodosProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AllTodosContext.Provider value={{ ...state, dispatchAllTodosChange: dispatch }} > 
      { children }
    </AllTodosContext.Provider>
  );
};