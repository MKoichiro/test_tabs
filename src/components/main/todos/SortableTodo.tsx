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

import { TouchStartArgType, TouchMoveArgType, TouchEndArgType } from './EachTodos';



const contentWidth = getPx($contentWidth);
const deleteBtnWidth = !(contentWidth instanceof Error) ? contentWidth * .5 : 0;


// === component 定義部分 ============================================= //
interface PropsType {
  todo: TodoType;
  todosId: number;
  handleTouchStart: (args: TouchStartArgType) => void;
  handleTouchMove: (args: TouchMoveArgType) => void;
  handleTouchEnd: (args: TouchEndArgType) => void;
}

export const SortableTodo = (props: PropsType) => {
  // currentTodo"s"Id と currentTodo""Id があるので注意
  const {
    todo: currentTodo,
    todosId: currentTodosId,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = props;
  const {
    id: currentTodoId,
    main,
    expired: isExpired,
    completed: isCompleted,
    ...rest
  } = currentTodo;
  const {
    allTodos,
    dispatchAllTodosChange
  } = useContext(AllTodosAdminContext);
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

  // --- li を左にスワイプして右に delete btn を表示 ------------------------------- //
  // パフォーマンスが気になれば、親コンポーネントに移動、またはメモ化。
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [startX, setStartX] = useState<number | undefined>(undefined);
  const [startY, setStartY] = useState<number | undefined>(undefined);
  const [isSlided, setIsSlided] = useState<boolean>(false);
  const [translateX, setTranslateX] = useState<number>(0);


  // --- TouchStart ---------
  const executeHandleTouchStart = (e: React.TouchEvent<HTMLLIElement>) => {
    handleTouchStart({e, setStartX, setStartY});
  };

  // --- TouchMove ---------
  let allowed: boolean = false, rejected: boolean = false; // 初回で (allow = true) Or (reject = true) の二択、ともにtrueにはなり得ない
  const executeHandleTouchMove = (e: React.TouchEvent<HTMLLIElement>) => {
    if (rejected) { return }
    if (!(startX && startY && containerRef.current)) { return } // null check

    // スワイプ中の符号を含む変位
    const displacementX = e.touches[0].clientX - startX;
    const displacementY = e.touches[0].clientY - startY;

    // 初回のみの処理
    if (!(allowed || rejected)) { // この条件で初回のみ判定できる
      const gradient = Math.abs(displacementY / displacementX); // 傾きの絶対値
      if (gradient > 1/ 2) {
        // 「単なる垂直方向のページスクロール」と判定
        rejected = true;
        return;
      } else {
        // 「削除ボタン非/表示のためのアクション」と判定
        allowed = true;
      }
    }

    handleTouchMove({displacementX, setTranslateX, isSlided});
  };

  // --- TouchEnd ---------
  const executeHandleTouchEnd = (e: React.TouchEvent<HTMLLIElement>) => {
    if (!(startX && containerRef.current)) { return } // null check
    handleTouchEnd({e, startX, setStartX, setStartY, containerRef, setTranslateX, setIsSlided});
    allowed = rejected = false; // initialize
  };

  // 本コンポーネント外からslide状態を解除する必要あり、（タブ切り替えのタイミングなど）
  // const slideToClose = () => {
  //   if (containerRef.current) containerRef.current.style.transition = `transform ${ DURATION }ms`;
  //   setTimeout(() => {
  //     if (containerRef.current) containerRef.current.style.transition = 'none';
  //   }, DURATION);

  //   setTranslateX(0);
  //   setIsSlided(false);
  // }

  // ------------------------------- li を左にスワイプして右に delete btn を表示 --- //


  return (
    <StyledLi
      key={ currentTodoId }
      ref={setNodeRef}
      style={style}
      {...attributes}
      onTouchStart={ executeHandleTouchStart }
      onTouchMove={ executeHandleTouchMove }
      onTouchEnd={ executeHandleTouchEnd }
      $translateX={ translateX }
      $isDragging={ isDragging }
    >
      <div
        className='container'
        ref={containerRef}
      >
        <div className="contents">
          <TodoHeader
            isCompleted={ isCompleted }
            sortable={ true }
            listeners={ listeners }
            main={main}
            isExpired={ isExpired }
            onBtnsClick={ handleTodoPropsEdit } />

          <Detail {...rest} />
        </div>
        <div className='btns-container'>
          <button className="btn-delete">
            <FontAwesomeIcon icon={faTrashCan}/>
          </button>
        </div>
      </div>
    </StyledLi>
  )
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledLi = styled.li<{ $isDragging: boolean; $translateX: number; }>`
  opacity: ${ props => props.$isDragging ? .5 : 1 };
  color: pink;
  overflow-x: hidden;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &:-webkit-scrollbar {
    display: none;
  }

  .container {
    display: flex;
    transform: ${ props => `translateX(${ props.$translateX }px)` };
  
    .contents {
      min-width: 100%;
    }

    .btns-container {
      min-width: ${`${deleteBtnWidth}px`};
      background: #999;
      z-index: 100;
      display: flex;
    }
  }
`;
// ================================================= style 定義部分 === //