/*
  EachTodos Component:
    element: ul
    description:
      category 毎の todos を表示している
*/


/* common: essential */
import React, { FC } from "react";
import styled from "styled-components";
/* common: others */
import { TodosType } from "../../../../types/Todos";
/* children components */
import { EachTodos } from "./EachTodos";
import { CardsContainer } from "./CardsContainer";


// === component 定義部分 ============================================= //
interface PropsType {
  todosData: TodosType;
  index: number;
}

export const EachTodosContainer: FC<PropsType> = (props) => {
  return (
    <StyledDiv>
      <EachTodos { ...props } />
      <CardsContainer />
    </StyledDiv>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div`
`;
// ================================================= style 定義部分 === //