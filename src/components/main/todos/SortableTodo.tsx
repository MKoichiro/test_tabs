/*
  [SortableTodo Component]
    element: li
    description:
      Todo Componentと比較して、内部的にはこちらが実体だが、
      外見上は drop 位置を示唆するゴースト要素
*/


/* common: essential */
import React, { useContext } from 'react';
import styled from 'styled-components';
/* common: others */
import { TodoType } from '../../../types/Todos';
import { AllTodosAdminContext } from "../../../Providers";
/* dnd-kit */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
/* children components */
import { Detail } from './Detail';
import { TodoHeader } from './Header';


// === component 定義部分 ============================================= //
interface PropsType {
  todo: TodoType;
  todosId: number;
}

export const SortableTodo = (props: PropsType) => {
  // currentTodo"s"Id と currentTodo""Id があるので注意
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
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
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
// ================================================= style 定義部分 === //