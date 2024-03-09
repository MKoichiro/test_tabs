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
import { $contentWidth, getPx } from '../../../Providers';
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

const contentWidth = getPx($contentWidth);
const deleteBtnWidth = !(contentWidth instanceof Error) ? contentWidth * .2 : 0;


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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState<number | undefined>(undefined);
  const [startY, setStartY] = useState<number | undefined>(undefined);

  // --- TouchStart ---
  const handleTouchStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    if (containerRef.current) { containerRef.current.style.overflow = 'scroll'; }
  };

  // --- TouchMove ---
  let allowed:    boolean = false,
      rejected: boolean = false;
  // 初回でallowがtrueになるか、rejectがtrueになるかの二択、ともにtrueにはなり得ない。
  const handleTouchMove = (e: TouchEvent) => {
    if (rejected || allowed) { return }
    if (!(startX && startY && containerRef.current)) { return } // null check

    // 以下、初回のみ判定し、次回以降は早期リターン

    // スワイプ中の符号を含む変位
    const DisplacementX = e.touches[0].clientX - startX;
    const DisplacementY = e.touches[0].clientY - startY;
    // 傾きの絶対値
    const gradient = Math.abs(DisplacementY / DisplacementX);

    if (gradient > 1/ 2) {
      // 「単なる垂直方向のページスクロール」と判定
      console.log('rejected');
      rejected = true;
      containerRef.current.style.overflow = 'hidden';
    } else {
      // 「削除ボタン非/表示のためのアクション」と判定
      console.log('allowed');
      allowed = true;
    }
  };

  // --- TouchEnd ---
  const handleTouchEnd = (e: TouchEvent) => {
    if (!(startX && containerRef.current)) { return }

    const which = (e.changedTouches[0].clientX - startX > 0) ? 'right' : 'left';
    if (which === 'left') {
      if (e.changedTouches[0].clientX - startX < -deleteBtnWidth * .5) {
        containerRef.current.scrollTo({left: deleteBtnWidth, behavior: 'instant'});
      } else {
        containerRef.current.scrollTo({left: 0, behavior: 'instant'});
      }
    }

    if (which === 'right') {
      if (e.changedTouches[0].clientX - startX < deleteBtnWidth * .5) {
        containerRef.current.scrollTo({left: deleteBtnWidth, behavior: 'instant'});
      } else {
        containerRef.current.scrollTo({left: 0, behavior: 'instant'});
      }

    }

    // initialize;
    allowed = false;
    rejected = false;
    setStartX(undefined);
    setStartY(undefined);
    containerRef.current.style.overflow = 'hidden';
  };

  // ------------------------------- li を左にスワイプして右に delete btn を表示 --- //


  return (
    <StyledLi
      key={ currentTodoId }
      $isCompleted={ isCompleted }
      $isDragging={ isDragging }
      ref={e => {setNodeRef(e)}}
      style={style}
      {...attributes}
    >
      <div
        className='scroll-container'
        ref={containerRef}
        onTouchStart={ handleTouchStart }
        onTouchMove={ handleTouchMove }
        onTouchEnd={ handleTouchEnd }
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
      </div>


    </StyledLi>
  )
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledLi = styled.li<{ $isCompleted: boolean; $isDragging: boolean; }>`
  opacity: ${ props => props.$isDragging ? .5 : 1 };
  color: pink;

  .scroll-container {
    width: 100%;
    display: flex;
    overflow: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  :-webkit-scrollbar {
    display: none;
  }

  .todo-container {
    min-width: 100%;
  }
  .btn-delete {
    min-width: ${`${deleteBtnWidth}px`};
    background: #999;
    z-index: 100;
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