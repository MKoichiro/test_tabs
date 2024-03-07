import React, { useContext } from 'react';
import styled from 'styled-components';
import { TodoType } from '../../../types/Todos';
import { AllTodosAdminContext } from "../../../Providers";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Detail } from './Detail';
import { TodoHeader } from './Header';


interface PropsType {
  todo: TodoType;
  todosId: number;
}

export const SortableTodo = (props: PropsType) => {
  // currentTodo"s"Id と currentTodo""Idがあるので注意
  const { todo: currentTodo, todosId: currentTodosId } = props;
  const {
    id: currentTodoId,
    main,
    expired: isExpired,
    open: isOpen,
    completed: isCompleted,
    ...rest
  } = currentTodo;

  const { allTodos, dispatchAllTodosChange } = useContext(AllTodosAdminContext);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id: currentTodoId});


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  const idxOfCurrentTodos = allTodos.findIndex(todos => todos.id === currentTodosId);
  // todoのプロパティを編集してallTodosを更新する関数
  const handleTodoPropsEdit = (propName: string) => {
    const idxOfCurrentTodo = allTodos[idxOfCurrentTodos].todos.findIndex(todo => todo.id === currentTodo.id);
    const newAllTodos = [...allTodos];
    switch (propName) {
      case 'open':
        newAllTodos[idxOfCurrentTodos].todos[idxOfCurrentTodo].open = !currentTodo.open;
        dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });
        break;
      case 'archived':
        newAllTodos[idxOfCurrentTodos].todos[idxOfCurrentTodo].archived = true;
        dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });
        break;
    }
  };


  return (
    <StyledLi
      key={ currentTodoId }
      $isOpen={ isOpen }
      $isCompleted={ isCompleted }
      $isDragging={ isDragging }
      ref={setNodeRef}
      style={style}
      {...attributes}
    >

      <TodoHeader
        sortable={ true }
        listeners={ listeners }
        main={main}
        isExpired={ isExpired }
        onBtnsClick={ handleTodoPropsEdit } />

      <Detail {...rest} />

    </StyledLi>
  )
}

const StyledLi = styled.li<{ $isOpen: boolean; $isCompleted: boolean; $isDragging: boolean; }>`
  color: ${ props =>  props.$isOpen ? '#fff' : '#000' };
  opacity: ${ props => props.$isDragging ? .5 : 1 };

  .gripper {
    touch-action: none;
    padding: 0 .8rem;
    cursor: grab;
  }

  header {
    display: flex;
  }

  h4 {
    text-decoration: ${ props => props.$isCompleted ? 'line-through' : '' };
  }
  .icon-expired {
    color: red;
  }

  .detail-container {

  }
`;