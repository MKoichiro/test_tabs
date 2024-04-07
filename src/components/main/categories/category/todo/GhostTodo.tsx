

/* --- react/styled-components --- */
import React, { LegacyRef, forwardRef } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { TodoDetail } from './TodoDetail';
import { TodoHeader } from './TodoHeader';
/* --- types --------------------- */
import { TodoType } from '../../../../../types/Categories';


// === 型定義部分 ===================================================== //
// - component props
interface PropsType {
  todo: TodoType;
  categoryId: string;
}
// - others
// ===================================================== 型定義部分 === //


// === component 定義部分 ============================================= //
export const Todo = forwardRef(({...props}: PropsType, ref: LegacyRef<HTMLDivElement> | undefined) => {
  const { todo } = props;
  
  return (
    <StyledDiv ref={ref}>

      <TodoHeader
        sortable={false}
        todo={todo} />

      <TodoDetail todo={todo} />
    </StyledDiv>
  );
});
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div`
  background: grey;
  
  .gripper {
    padding: 0 .8rem;
    cursor: grabbing;
  }

  header {
    display: flex;
  }

  h4 {

  }
  .icon-expired {
    color: red;
  }

  .detail-container {

    .todo-info {
      width: 20%;
      margin: 0 1.6rem 0 auto;
      .info-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .info-label {

        }
        .info-value {
        }
      }

    }
  }
`;
// ================================================= style 定義部分 === //