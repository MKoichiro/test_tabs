/*
  EachTodos Component:
    element: ul
    description:
      category 毎の todos を表示している
*/


/* common: essential */
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
/* common: others */
import { TodosType } from "../../../../types/Todos";
/* children components */
import { EachTodos } from "./EachTodos";
import { CardsContainer } from "./CardsModal";
import { AllTodosContext } from "../../../../providers/AllTodosProvider";


// === component 定義部分 ============================================= //
interface PropsType {
  todosData: TodosType;
  index: number;
}

export const EachTodosContainer: FC<PropsType> = (props) => {
  const { index } = props;
  const { activeIndex } = useContext(AllTodosContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (index === activeIndex) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [index, activeIndex]);

  return (
    <StyledDiv>
      <EachTodos { ...props } />
      { isActive && <CardsContainer { ...props }/> }
    </StyledDiv>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div`
`;
// ================================================= style 定義部分 === //