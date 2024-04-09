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
import React, { FC, useContext, useRef } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { TodoDetail } from './TodoDetail';
import { TodoHeader } from './TodoHeader';
// slidable
import { Slidable, SlidableMain, SlidableHidden } from '../../../../../functions/slidable/Components';
/* --- types --------------------- */
import { TodoType } from '../../../../../types/Categories';
// slidable
import { SlidableParamsType } from '../../../../../functions/slidable/Types';
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





// === CONSTANT Against RENDERING ===================================== //
const contentsWidth = convertVwToPx(getCurrentContentsVw());
const deleteBtnWidth = contentsWidth * .5;

// slidable
const slidableParams: SlidableParamsType = {
  SLIDABLE_LENGTH: deleteBtnWidth,
  GRADIENT_THRESHOLD: .5,
  TOGGLE_THRESHOLD: .2,
  COMPLEMENT_ANIME_DURATION: 200,
};
// ===================================== CONSTANT Against RENDERING === //


// === TYPE =========================================================== //
// - PROPS
interface PropsType {
  todo: TodoType;
  liIdx: number;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const ActiveTodo: FC<PropsType> = (props) => {

  const { todo, liIdx } = props;
  const currentId = todo.id;

  const { dispatchCategoriesChange } = useContext(CategoriesContext);

  // --- dnd-kit ------------------------------------------------ //
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
  // ------------------------------------------------ dnd-kit --- //

  // 今後
  const containerRef = useRef<HTMLDivElement | null>(null);
  const showCardsModal = () => {
    // card view modal を展開する処理
  };


  return (
    <StyledLi
      key={ currentId }
      ref={setNodeRef}
      style={style}
      {...attributes}
      $isDragging={ isDragging }
    >

      <Slidable slidableParams={slidableParams}>
      
        <SlidableMain className='slidable-main-contents' >
          <TodoHeader
            attributes={ 'active' }
            listeners={ listeners }
            todo={ todo } />

          <TodoDetail
            // ref={containerRef}
            liIdx={liIdx}
            todo={ todo } />
        </SlidableMain>

        <SlidableHidden className='btns-container' slidableLength={slidableParams.SLIDABLE_LENGTH}>
          <button
            className="btn-info"
            onClick={ showCardsModal }
          >
            <FontAwesomeIcon icon={faCircleInfo}/>
          </button>
          <button
            className="btn-check"
            onClick={ () => dispatchCategoriesChange({ type: 'change_todo_status', todoId: currentId, newStatus: 'completed' }) }
          >
            <FontAwesomeIcon icon={faCheck}/>
          </button>
          <button
            className="btn-delete"
            onClick={ () => dispatchCategoriesChange({ type: 'archive_todo', todoId: currentId }) }
          >
            <FontAwesomeIcon icon={faTrashCan}/>
          </button>
        </SlidableHidden>
      </Slidable>
    </StyledLi>
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledLi = styled.li<{ $isDragging: boolean; }>`
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


  .btns-container {
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
`;
// ========================================================= STYLE === //