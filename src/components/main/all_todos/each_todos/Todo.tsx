/*
  [Todo Component]
    element: div
    description:
      ul 内に収まって drop 先を示唆するSortableTodo Component に対して、
      これは drag 中にカーソルに追従する、（外見上、）実体となるコピー要素
*/


/* common: essential */
import React, { LegacyRef, forwardRef } from 'react';
import styled from 'styled-components';
/* common: others */
import { TodoType } from '../../../../types/Todos';
/* children components */
import { Detail } from './Detail';
import { TodoHeader } from './Header';


// === component 定義部分 ============================================= //
interface PropsType {
  todo: TodoType;
  todosId: number;
}

export const Todo = forwardRef(({...props}: PropsType, ref: LegacyRef<HTMLDivElement> | undefined) => {
  const { todo } = props;
  const {
    id: currentTodoId,
    main,
    expired: isExpired,
    // open: isOpen,
    completed: isCompleted,
    ...rest
  } = todo;
  
  return (
    <StyledDiv ref={ref}>

      <TodoHeader
        isCompleted={ isCompleted }
        sortable={false}
        main={main}
        isExpired={isExpired} />

      <Detail {...rest} />
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