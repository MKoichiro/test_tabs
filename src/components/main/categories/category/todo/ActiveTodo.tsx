/**
# "AAA.tsx"

## RENDER AS:
- ``` <example/> ```

## DEPENDENCIES:
| type     | name                                            | role       |
| ---------| ----------------------------------------------- | ---------- |
| PARENT 1 | BBB.tsx                                         | 機能や役割 |
| CHILD  1 | CCC.tsx                                         | 機能や役割 |
| CHILD  2 | DDD.tsx                                         | 機能や役割 |
| PACKAGE  | importしているpackage名                         | 機能や役割 |
| PROVIDER | importしているprovider名                        | 機能や役割 |
| SETTING  | importしているsetting file名                    | 機能や役割 |
| UTILS    | ultils ディレクトリからimportしているファイル名 | 機能や役割 |
| TYPES    | 外部からimportしている型名                      | 機能や役割 |

## FEATURES:
- conponent

## DESCRIPTION:
- コンポーネントが提供する機能や役割を箇条書きで記述する。

## PROPS:
| name        | type | role                     |
| ----------- | ---- | ------------------------ |
| propsの名前 | 型   | 役割などの一言程度の説明 |

## STATES:
| name        | type | role                     |
| ----------- | ---- | ------------------------ |
| stateの名前 | 型   | 役割などの一言程度の説明 |

## FUTURE TASKS:
- 今後の展望や修正点を箇条書きで記述する。

## COPILOT
- copilotからの提案をここに箇条書きで記述する。
*/


/* --- react/styled-components --- */
import React, { FC, useContext, useState, useRef, TouchEvent } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { TodoDetail } from './TodoDetail';
import { TodoHeader } from './TodoHeader';
/* --- types --------------------- */
import { TodoType } from '../../../../../types/Categories';
import { TouchStartArgType, TouchMoveArgType, TouchEndArgType } from '../Category';
/* --- utils --------------------- */
import { convertVwToPx, getCurrentContentsVw } from '../../../../../utils/converters';
/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleInfo, faCheck } from '@fortawesome/free-solid-svg-icons';
/* --- dnd-kit ------------------- */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CategoriesContext } from '../../../../../providers/CategoriesProvider';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';


const contentsWidth = convertVwToPx(getCurrentContentsVw());
const deleteBtnWidth = contentsWidth * .5;

// === TYPE =========================================================== //
// - PROPS
interface PropsType {
  todo: TodoType;
  liIdx: number;
  handleTouchStart: (args: TouchStartArgType) => void;
  handleTouchMove: (args: TouchMoveArgType) => void;
  handleTouchEnd: (args: TouchEndArgType) => void;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const ActiveTodo: FC<PropsType> = (props) => {
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
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
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
// ========================================================= STYLE === //