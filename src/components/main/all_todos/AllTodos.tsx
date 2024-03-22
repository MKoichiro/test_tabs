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
import { AllTodosContext } from '../../../providers/AllTodosProvider';
/* child components */
import { EachTodosContainer } from './each_todos/EachTodosContainer';

// === component 定義部分 ============================================= //
export const AllTodos = () => {
  const { activeIndex, allTodos } = useContext(AllTodosContext);

  return (
    <StyledUl $activeIndex={ activeIndex }>
      { allTodos.map((todos, i) => {
        return (
          <li key={ todos.id }>
            <EachTodosContainer todosData={ todos } index={ i } />
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
