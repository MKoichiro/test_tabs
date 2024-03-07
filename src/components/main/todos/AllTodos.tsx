/*
  [AllTodos Component]
    element: div
    description:
      全 category の全 todos を表示する todos dir のトップコンポーネント
      carousel のように、active な category の todos のみを閲覧させるようにしている
*/

/* common: essential */
import React, { useContext } from 'react';
import styled from 'styled-components';
/* common: others */
import { AllTodosAdminContext } from '../../../Providers';
/* children components */
import { EachTodos } from './EachTodos';


// === component 定義部分 ============================================= //
export const AllTodos = () => {
  const { activeIndex, allTodos } = useContext(AllTodosAdminContext);

  const todosLis = allTodos.map((todos, i) => {
    return (
      <li key={ todos.id }>
        <EachTodos todosData={ todos } index={ i } />
      </li>
    );
  });

  return (
    <StyledDiv $activeIndex={ activeIndex }>
      <ul children={ todosLis } />
    </StyledDiv>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div<{ $activeIndex: number }>`
  overflow-x: hidden;

  > ul {
    display: flex;
    transition: transform 750ms;
    transform: ${ props => `translateX(calc(-1 * var(--contents-width) * ${ props.$activeIndex }))` };
    > li {
      min-width: 100%;
      background: pink;
      /* height: 500px; */
    }
  }
`;
// ================================================= style 定義部分 === //