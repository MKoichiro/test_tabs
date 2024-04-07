/*
  [SortableTodo Component]
    element: li
    description:
      Todo Componentと比較して、内部的にはこちらが実体だが、
      外見上は drop 位置を示唆するゴースト要素
*/

// 今後の実装課題
// - useSlidable を使って、スライド可能な要素にする
// - dnd sort する時には一時的に展開状態のTodoを閉じる
// - 展開時に簡易的にtable形式で詳細を表示する

/* common: essential */
import React, { useContext, useState, useRef, TouchEvent } from 'react';
import styled from 'styled-components';
/* providers */
/* types */
import { TodoType } from '../../../../../types/Categories';
import { TouchStartArgType, TouchMoveArgType, TouchEndArgType } from '../Category';
/* utils */
import { convertVwToPx, getCurrentContentsVw } from '../../../../../utils/converters';
/* font awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleInfo, faCheck } from '@fortawesome/free-solid-svg-icons';
/* children components */
import { TodoDetail } from './TodoDetail';
import { TodoHeader } from './TodoHeader';
/* dnd-kit */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CategoriesContext } from '../../../../../providers/CategoriesProvider';


const contentsWidth = convertVwToPx(getCurrentContentsVw());
const deleteBtnWidth = contentsWidth * .5;


// === component 定義部分 ============================================= //
interface PropsType {
  todo: TodoType;
  liIdx: number;
  handleTouchStart: (args: TouchStartArgType) => void;
  handleTouchMove: (args: TouchMoveArgType) => void;
  handleTouchEnd: (args: TouchEndArgType) => void;
}

export const ActiveTodo = (props: PropsType) => {
  const {
    todo,
    liIdx,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = props;
  const currentId = todo.id;
  const {
    activeIdx,
    categories,
    dispatchCategoriesChange,
  } = useContext(CategoriesContext);

  // dnd-kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({id: currentId});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };



  // const todoIdx = categories[activeIdx].todos.findIndex(todo => todo.id === currentId);

  const handleTodoPropsEdit = (propName: string, newValue?: string) => {
    // todo のプロパティを編集して categories を更新する関数
    const newCategories = [...categories];
    switch (propName) {
      case 'open':
        newCategories[activeIdx].todos[liIdx].isOpen = !todo.isOpen;
        dispatchCategoriesChange({ type: 'update_categories', newCategories });
        break;
      case 'archived':
        newCategories[activeIdx].todos[liIdx].isArchived = true;
        dispatchCategoriesChange({ type: 'update_categories', newCategories });
        break;
      case 'status':
        newCategories[activeIdx].todos[liIdx].status = 'completed';
        dispatchCategoriesChange({ type: 'update_categories', newCategories });
        break;
      case 'main':
        newValue && (newCategories[activeIdx].todos[liIdx].title = newValue);
        dispatchCategoriesChange({ type: 'update_categories', newCategories });
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


  const showInfo = () => {
    // card view modal を展開する処理
  };

  // ------------------------------- li を左にスワイプして右に delete btn を表示 --- //


  return (
    <StyledLi
      key={ currentId }
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
            sortable={ true }
            listeners={ listeners }
            todo={ todo }
            handleTodoPropsEdit={ handleTodoPropsEdit } />

          <TodoDetail
            ref={containerRef}
            liIdx={liIdx}
            todo={ todo } />
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
  background: #efefef;

  border-radius: .4rem;
  /* background: #e0e0e0;
  box-shadow:  2rem 2rem 6rem #bebebe,
              -2rem -2rem 6rem #ffffff; */
  
  margin: 1.6rem 0;
  opacity: ${ props => props.$isDragging ? .5 : 1 };
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