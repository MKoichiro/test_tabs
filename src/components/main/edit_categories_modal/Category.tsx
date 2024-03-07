import React, { LegacyRef, forwardRef } from 'react';
import { TodosType } from '../../../types/Todos';
import styled from 'styled-components';

interface PropsType {
  todos: TodosType;
}

export const Category = forwardRef(({ ...props }: PropsType, ref: LegacyRef<HTMLSpanElement> | undefined) => {
  const { todos } = props;
  return (
    <StyledSpan ref={ ref }>{ todos.category_name }</StyledSpan>
  );
});

const StyledSpan = styled.span`
  font-size: var(--fs-category-name);
  cursor: grabbing;
`;