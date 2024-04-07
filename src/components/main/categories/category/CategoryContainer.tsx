/*
  EachTodos Component:
    element: ul
    description:
      category 毎の todos を表示している
*/


/* --- react/styled-components --- */
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
/* --- child components ---------- */
import { Category } from "./Category";
import { CardsContainer } from "./card_view/CardsModal";
import { CategoriesContext } from "../../../../providers/CategoriesProvider";
import { CategoryType } from "../../../../types/Categories";

// === 型定義部分 ===================================================== //
// - component props
interface PropsType {
  category: CategoryType;
  index: number;
}
// - others
// ===================================================== 型定義部分 === //


// === component 定義部分 ============================================= //
export const CategoryContainer: FC<PropsType> = (props) => {
  const { index } = props;
  const { activeIdx } = useContext(CategoriesContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (index === activeIdx) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [index, activeIdx]);

  return (
    <StyledDiv>
      <Category { ...props } />
      { isActive && 
        ( <CardsContainer { ...props }/> )
      }
    </StyledDiv>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div`
`;
// ================================================= style 定義部分 === //