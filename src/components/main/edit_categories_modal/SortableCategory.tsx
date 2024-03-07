import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { TodosType } from '../../../types/Todos';
import { DragIndicator } from '@mui/icons-material';

interface PropsType { todos: TodosType }

export const SortableCategory = (props: PropsType) => {
  const { todos } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todos.id });

  // これはほとんどおまじない。
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <StyledLi
      ref={ setNodeRef }
      style={ style }
      $isDragging={ isDragging }
      { ...attributes }
    >
      <span { ...listeners }>
        <DragIndicator />
      </span>
      { props.todos.category_name }
    </StyledLi>
  )
};

const StyledLi = styled.li<{ $isDragging: boolean; }>`
  font-size: var(--fs-category-name);
  touch-action: none;
  opacity: ${ props => props.$isDragging ? .5 : 1 };
  span {
    cursor: grab;
  }
`;
