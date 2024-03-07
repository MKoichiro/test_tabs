/* todos のトップコンポーネント */

import React, { useContext } from 'react';
import styled from 'styled-components';

import { EachTodos } from './EachTodos';
import { AllTodosAdminContext } from '../../../Providers';


export const AllTodos = () => {

  const { activeIndex, allTodos } = useContext(AllTodosAdminContext);

  const todosContainers = allTodos.map((todos, i) => {
    return (
      <li key={ todos.id }>
        <EachTodos todosData={ todos } index={ i } />
      </li>
    );
  });

  return (
    <StyledDiv $activeIndex={ activeIndex }>
      <ul>
        { todosContainers }
      </ul>
    </StyledDiv>
  );
};



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

