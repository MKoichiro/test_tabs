/*
  [SortableTodo Component]
    element: li
    description:
      Todo Componentと比較して、内部的にはこちらが実体だが、
      外見上は drop 位置を示唆するゴースト要素
*/


/* common: essential */
import React, { useContext, useState, useRef, TouchEvent } from 'react';
import styled from 'styled-components';
/* providers */
import { AllTodosContext } from "../../../../providers/AllTodosProvider";
/* types */
import { TodoType } from '../../../../types/Todos';
import { TouchStartArgType, TouchMoveArgType, TouchEndArgType } from './EachTodos';
/* utils */
import { convertVwToPx, getCurrentContentsVw } from '../../../../utils/converters';
/* font awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleInfo, faCheck } from '@fortawesome/free-solid-svg-icons';
/* children components */
import { Detail } from './Detail';
import { TodoHeader } from './Header';
/* dnd-kit */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


const contentsWidth = convertVwToPx(getCurrentContentsVw());
const deleteBtnWidth = contentsWidth * .5;


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
    activeIndex,
    allTodos,
    dispatchAllTodosChange
  } = useContext(AllTodosContext);
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


  // const activeIndex = allTodos.findIndex(todos => todos.id === currentTodosId); // activeIndexと同じでは？
  const todoIdx = allTodos[activeIndex].todos.findIndex(todo => todo.id === currentTodo.id);

  const handleTodoPropsEdit = (propName: string, newValue?: string) => {
    // todo のプロパティを編集して allTodos を更新する関数
    const newAllTodos = [...allTodos];
    switch (propName) {
      case 'open':
        newAllTodos[activeIndex].todos[todoIdx].open = !currentTodo.open;
        dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });
        break;
      case 'archived':
        newAllTodos[activeIndex].todos[todoIdx].archived = true;
        dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });
        break;
      case 'status':
        newAllTodos[activeIndex].todos[todoIdx].status = 'COMPLETED';
        dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });
        break;
      case 'main':
        newValue && (newAllTodos[activeIndex].todos[todoIdx].main = newValue);
        dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });
        break;
    }
  };

  // --- li を左にスワイプして右に delete btn を表示 ------------------------------- //
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [startX,     setStartX    ] = useState<number | undefined>(undefined);
  const [startY,     setStartY    ] = useState<number | undefined>(undefined);
  const [isSlided,   setIsSlided  ] = useState(false);
  const [translateX, setTranslateX] = useState(0);


  // --- TouchStart ---------
  const executeHandleTouchStart = (e: TouchEvent<HTMLLIElement>) => {
    handleTouchStart({e, setStartX, setStartY});
  };

  // --- TouchMove ---------
  let allowed: boolean = false, rejected: boolean = false; // 初回で (allow = true) Or (reject = true) の二択、ともにtrueにはなり得ない
  const executeHandleTouchMove = (e: TouchEvent<HTMLLIElement>) => {
    if (rejected) { return }
    if (!(startX && startY)) { return } // null check

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
  const executeHandleTouchEnd = (e: TouchEvent<HTMLLIElement>) => {
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

  const showInfo = () => {

  };

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
            handleTodoPropsEdit={ handleTodoPropsEdit } />

          <Detail
            ref={containerRef}
            todoIdx={todoIdx}
            {...rest} />
        </div>
        <div className='btns-container'>
          <button
            className="btn-info"
            onClick={ showInfo }
          >
            <FontAwesomeIcon icon={faCircleInfo}/>
          </button>
          <button
            className="btn-check"
            onClick={ () => handleTodoPropsEdit('status') }
          >
            <FontAwesomeIcon icon={faCheck}/>
          </button>
          <button
            className="btn-delete"
            onClick={ () => handleTodoPropsEdit('archived') }
          >
            <FontAwesomeIcon icon={faTrashCan}/>
          </button>
        </div>
      </div>
    </StyledLi>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledLi = styled.li<{ $isDragging: boolean; $translateX: number; }>`
  margin: 1.6rem 0;
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
      min-width: ${`${ deleteBtnWidth }px`};
      z-index: 100;
      display: flex;
      button {
        flex: 1;
        font-size: 2rem;
      }
      .btn-info {
        background: pink;
      }
      .btn-check {
        background: skyblue;
      }
      .btn-delete {
        background: #999;
      }

    }
  }
`;
// ================================================= style 定義部分 === //