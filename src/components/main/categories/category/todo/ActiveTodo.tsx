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
import React, { FC, useRef } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { TodoDetail } from './TodoDetail';
import { TodoHeader } from './TodoHeader';
// slidable
import { Slidable, SlidableMain, SlidableHidden } from '../../../../../functions/slidable/Components';
/* --- redux --------------------- */
import { useDispatch } from 'react-redux';
import { updateTodoProps } from '../../../../../providers/slices/categoriesSlice';
/* --- providers/contexts -------- */
import { useCardViewOpener } from '../../../../../providers/CardView';
/* --- types --------------------- */
import { TodoType } from '../../../../../types/Categories';
// slidable
import { SlidableParamsType } from '../../../../../functions/slidable/Types';
/* --- utils --------------------- */
import { vw2px, getCurrentContentsVw } from '../../../../../utils/converters';
/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleInfo, faCheck } from '@fortawesome/free-solid-svg-icons';
/* --- dnd-kit ------------------- */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';


// === CONSTANT Against RENDERING ===================================== //
const contentsWidth = vw2px(getCurrentContentsVw());
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
interface StyledLiType {
  $isDragging: boolean;
}
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const ActiveTodo: FC<PropsType> = (props) => {

  const { todo, liIdx } = props;
  const currentId = todo.id;

  // contexts
  const dispatch = useDispatch();
  const { cardViewOpen } = useCardViewOpener();



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

  // detail の double click で mde modal を開くときに自動 scroll 先となる ref
  const liRef = useRef<HTMLElement | null>(null);

  // handlers
  const handleInfoBtnClick = () => {
    cardViewOpen(liIdx);
  };
  const handleCompleteBtnClick = () => {
    dispatch(updateTodoProps({ todoId: currentId, update: {status: 'completed'} }));
  }
  const handleArchiveBtnClick = () => {
    dispatch(updateTodoProps({ todoId: currentId, update: {isArchived: true} }));
  }


  return (
    <StyledLi
      key         = {                                  currentId }
      style       = {                                      style }
      $isDragging = {                                 isDragging }
      ref         = { e => { setNodeRef(e); liRef.current = e; } }
      {...attributes}
    >

        {/* slidable: li内をスライド可能にするためのコンテナ */}
        <Slidable slidableParams={slidableParams}>
        
            {/* slidable: 通常時に表示されている要素 */}
            <SlidableMain className='slidable-main-contents'>

                <TodoHeader
                  attributes = {  'active' }
                  listeners  = { listeners }
                  todo       = {      todo } />

                <TodoDetail
                  ref   = { liRef }
                  liIdx = { liIdx }
                  todo  = { todo  } />

            </SlidableMain>


            {/* slidable: スライドで右から出てくる要素 */}
            <SlidableHidden className='btns-container' slidableLength={slidableParams.SLIDABLE_LENGTH}>

                {/* 1. cards modal を表示する */}
                <button
                  className = {                             'btn-info' }
                  onClick   = {                     handleInfoBtnClick }
                  children  = { <FontAwesomeIcon icon={faCircleInfo}/> } />

                {/* 2. todo を完了済み(completed)にする */}
                <button
                  className = {                       'btn-check' }
                  onClick   = {            handleCompleteBtnClick }
                  children  = { <FontAwesomeIcon icon={faCheck}/> } />

                {/* 3. todo をアーカイブ(isArchived === true に)する */}
                <button
                  className = {                         'btn-delete' }
                  onClick   = {                handleArchiveBtnClick }
                  children  = { <FontAwesomeIcon icon={faTrashCan}/> } />

            </SlidableHidden>
        </Slidable>
    </StyledLi>
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledLi = styled.li<StyledLiType>`
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