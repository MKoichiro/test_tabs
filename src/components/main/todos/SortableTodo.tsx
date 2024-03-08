/*
  [SortableTodo Component]
    element: li
    description:
      Todo Componentと比較して、内部的にはこちらが実体だが、
      外見上は drop 位置を示唆するゴースト要素
*/


/* common: essential */
import React, { useContext, useState, TouchEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';
/* common: others */
import { TodoType } from '../../../types/Todos';
import { $contentWidth } from '../../../Providers';
import { AllTodosAdminContext } from "../../../Providers";
/* dnd-kit */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
/* children components */
import { Detail } from './Detail';
import { TodoHeader } from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';



const TOUCH_MOVE_DELAY = 8;

// const contentWidthPx = $contentWidth.map(())


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
    completed: isCompleted,
    ...rest
  } = currentTodo;

  const { allTodos, dispatchAllTodosChange } = useContext(AllTodosAdminContext);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({id: currentTodoId});


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  const idxOfCurrentTodos = allTodos.findIndex(todos => todos.id === currentTodosId);
  // todo のプロパティを編集して allTodos を更新する関数
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

  // li毎に関数定義されてしまうから、ここら辺の処理はEachTodosに移動した方がよさそう、それかメモ化？
  // --- li を左にスワイプして右に delete btn を表示 ------------------------------- //
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isSlided, setIsSlided] = useState(false);

  // --- TouchStart ---
  const handleTouchStart = (e: TouchEvent) => {
    setTimeout(() => {
      setStartX(e.touches[0].clientX);
      setStartY(e.touches[0].clientY);
    }, TOUCH_MOVE_DELAY);
  };

  // --- TouchMove ---
  let id: NodeJS.Timeout | null = null;
  const handleTouchMove = (e: TouchEvent) => {
    (id !== null) && clearTimeout(id); // 頻繁に発火するので間引く
    id = setTimeout(netProcess, TOUCH_MOVE_DELAY);

    // 正味の処理内容
    function netProcess() {
      id = null;
      const swipingDisplacement = e.touches[0].clientX - startX; // スワイプ中の符号を含む変位

      const yDisplacement = e.touches[0].clientY - startY;
      if (Math.abs(swipingDisplacement) < Math.abs(yDisplacement)) { return }; // 縦方向の変位の方が大きい場合は抜ける
      
      // swiping to left: 往路, 表示させる過程
      if (!isSlided && Math.sign(swipingDisplacement) === -1 && -200 < swipingDisplacement) {
        setTranslateX(swipingDisplacement);
      }
      // swiping to right: 復路, 非表示にする過程
      if (isSlided && Math.sign(swipingDisplacement) === 1 && swipingDisplacement < 200) {
        setTranslateX(swipingDisplacement - 200);
      }
    };
  };

  // --- TouchEnd ---
  const handleTouchEnd = () => {
    setTimeout(netProcess, TOUCH_MOVE_DELAY); // 確実に TouchMove の処理より後に実行するための setTimeout

    // 正味の処理内容
    function netProcess() {
      setStartX(0);
      if (translateX < -100) {
        setTranslateX(-200);
        setIsSlided(true);
      } else {
        setTranslateX(0);
        setIsSlided(false);
      }
    };
  };
  // ------------------------------- li を左にスワイプして右に delete btn を表示 --- //


  return (
    <StyledLi
      key={ currentTodoId }
      $isCompleted={ isCompleted }
      $isDragging={ isDragging }
      ref={e => {setNodeRef(e);}}
      style={style}
      {...attributes}
      onTouchStart={ handleTouchStart }
      onTouchMove={ handleTouchMove }
      onTouchEnd={ handleTouchEnd }
      $translateX={ translateX }
    >
      <div className="todo-container">
        <TodoHeader
          sortable={ true }
          listeners={ listeners }
          main={main}
          isExpired={ isExpired }
          onBtnsClick={ handleTodoPropsEdit } />

        <Detail {...rest} />
      </div>
      <button className="btn-delete">
        <FontAwesomeIcon icon={faTrashCan}/>
      </button>

    </StyledLi>
  )
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledLi = styled.li<{ $isCompleted: boolean; $isDragging: boolean; $translateX: number; }>`
  opacity: ${ props => props.$isDragging ? .5 : 1 };
  transform: ${ props => `translateX(${ props.$translateX }px)` };

  display: flex;

  .todo-container {
    min-width: 100%;
  }
  .btn-delete {
    min-width: 20%;
    background: #999;
  }

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