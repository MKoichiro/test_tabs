// 未使用

import React, { FC, ReactNode, createContext, useReducer, useState } from 'react';
import { CategoryType } from '../types/Categories';

interface CardViewContextType {
  isOpen:                      boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CardViewContext = createContext<CardViewContextType>({
  isOpen:       false,
  setIsOpen: () => {},
});


interface CardViewType {
  children: ReactNode;
}

export const CardViewProvider: FC<CardViewType> = (props) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);


  const value = {
    isOpen,
    setIsOpen,
  }
  return <CardViewContext.Provider value={value} children={children} />
};