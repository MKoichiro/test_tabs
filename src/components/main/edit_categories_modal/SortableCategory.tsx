/*
  [SortableCategory Component]
    element: li
    description:
      Category Componentと比較して、内部的にはこちらが実体だが、
      外見上は drop 位置を示唆するゴースト要素
*/


/* common: essential */
import React from 'react';
import styled from 'styled-components';
/* common: others */
import { TodosType } from '../../../types/Todos';
/* material icons */
import { DragIndicator } from '@mui/icons-material';
/* dnd-kit */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


// === component 定義部分 ============================================= //
interface PropsType {
  todos: TodosType;
}

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
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledLi = styled.li<{ $isDragging: boolean; }>`
  font-size: var(--fs-category-name);
  touch-action: none;
  opacity: ${ props => props.$isDragging ? .5 : 1 };
  span {
    cursor: grab;
  }
`;
// ================================================= style 定義部分 === //