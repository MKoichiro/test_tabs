// 未使用

import React, { createContext, useReducer, useState } from 'react';
import { CategoryType } from '../types/Categories';

interface CardViewContextType {

}

const CardViewContext = createContext({

});


const initialState = {

};
export const CardViewProvider = () => {
  const [cardActiveIdx, setCardActiveIdx] = useState(0);


  const value = {

  }
  return <CardViewContext.Provider value={value}/>
};