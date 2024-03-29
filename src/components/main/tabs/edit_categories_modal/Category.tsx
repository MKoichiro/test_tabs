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
import { TodosType } from '../../../../types/Todos';
import { DragIndicator } from '@mui/icons-material';


// === component 定義部分 ============================================= //
interface PropsType {
  todos: TodosType;
}

export const Category = forwardRef(({ ...props }: PropsType, ref: LegacyRef<HTMLDivElement> | undefined) => {
  const { todos } = props;
  return (
    <StyledDiv ref={ ref }>
      <span className="gripper">
        <DragIndicator />
      </span>
      <p children={ todos.category_name } />
    </StyledDiv>
  );
});
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div`
  font-size: var(--fs-category-name);
  display: flex;
  align-items: center;
  * {
    font-size: var(--fs-category-name);
    line-height: 4rem;
  }
  .gripper {
    /* cursor: grab; */
    cursor: grabbing;
    width: 3rem;
    svg {
      display: block;
      margin: 0 auto;
    }
  }
`;
// ================================================= style 定義部分 === //