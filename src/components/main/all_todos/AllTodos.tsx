/*
  [Test Component]
    element: div
    description:
      hogehogehogehogehogehogehogehoge
*/


/* common: essential */
import React, { useContext } from 'react';
import styled from 'styled-components';
/* contexts */
import { CategoriesContext } from '../../../providers/CategoriesProvider';
/* child components */
import { EachTodosContainer } from './each_todos/EachTodosContainer';

// === component 定義部分 ============================================= //
export const AllTodos = () => {
  const { activeIdx, categories } = useContext(CategoriesContext);

  return (
    <StyledUl $activeIndex={ activeIdx }>

      { categories.map((category, i) => {
        return (
          <li key={ category.id }>
            <EachTodosContainer category={ category } index={ i } />
          </li>
        );
      }) }
    </StyledUl>
  )
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledUl = styled.ul<{ $activeIndex: number }>`
  display: flex;
  transition: transform 750ms;
  transform: ${ props => `translateX(calc(-1 * var(--contents-width) * ${ props.$activeIndex }))` };
  > li {
    min-width: 100%;
    background: pink;
  }
`;
// ================================================= style 定義部分 === //
