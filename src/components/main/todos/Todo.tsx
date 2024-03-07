import React, { LegacyRef, forwardRef } from 'react';
import styled from 'styled-components';
import { TodoType } from '../../../types/Todos';
import { Detail } from './Detail';
import { TodoHeader } from './Header';

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
    open: isOpen,
    completed: isCompleted,
    ...rest
  } = todo;
  
  return (
    <StyledDiv ref={ref}>

      <TodoHeader
        sortable={false}
        main={main}
        isExpired={isExpired} />

      <Detail {...rest} />
    </StyledDiv>
  );
});

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
