import React from 'react';
import styled from 'styled-components';
import { TodoType } from '../../../../../providers/types/categories';
import { TodoHeader } from './TodoHeader';

interface ArchivedTodoProps {
  key: string;
  activeTodoIdx: number;
  todo: TodoType;
  isGloballyDragging: boolean;
}

export const ArchivedTodo = (props: ArchivedTodoProps) => {
    return (
        <StyledLi>
            <TodoHeader
                attributes={'archived'}
                todo={props.todo}
                isGloballyDragging={props.isGloballyDragging}
            />
        </StyledLi>
    );
};

const StyledLi = styled.li`
  margin-top: .8rem;
  background-color: var(--color-white-3);
  border-radius: .2rem;
  width: 95%;
  margin: 1.6rem auto;

  /* opacity: .67; */
`;

