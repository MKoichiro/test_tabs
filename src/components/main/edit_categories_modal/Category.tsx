/*
  [Category Component]
    element: span
    description:
      ul 内に収まって drop 先を示唆する SortableCategory Component に対して、
      これは drag 中にカーソルに追従する、（外見上、）実体となるコピー要素
*/


/* common: essential */
import React, { LegacyRef, forwardRef } from 'react';
import styled from 'styled-components';
/* common: others */
import { TodosType } from '../../../types/Todos';


// === component 定義部分 ============================================= //
interface PropsType {
  todos: TodosType;
}

export const Category = forwardRef(({ ...props }: PropsType, ref: LegacyRef<HTMLSpanElement> | undefined) => {
  const { todos } = props;
  return (
    <StyledSpan ref={ ref }>{ todos.category_name }</StyledSpan>
  );
});
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledSpan = styled.span`
  font-size: var(--fs-category-name);
  cursor: grabbing;
`;
// ================================================= style 定義部分 === //