/**
 * @summary カテゴリー内のアーカイブされていない todo の表示を担当。
 *
 * @issues
 * - なし
 *
 * @copilot
 * - なし
 *
 * @module
 */

/* --- react/styled-components --- */
import React, { useRef } from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { TodoDetail } from './TodoDetail';
import { TodoHeader } from './TodoHeader';
// slidable
import {
    Slidable,
    SlidableMain,
    SlidableHidden,
} from '../../../../../functions/slidable/Components';

/* --- redux --------------------- */
import { useDispatch } from 'react-redux';
import { updateTodoProps } from '../../../../../providers/redux/slices/categoriesSlice';
import { setActiveIdx } from '../../../../../providers/redux/slices/cardSlice';

/* --- providers/contexts -------- */
import { useCardViewOpener } from '../../../../../providers/context_api/CardView';

/* --- types --------------------- */
import { TodoType } from '../../../../../providers/types/categories';
// slidable
import { SlidableParams } from '../../../../../functions/slidable/types';

/* --- utils --------------------- */
// import { vw2px, getCurrentContentsVw } from '../../../../../utils/converters';

/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleInfo, faCheck } from '@fortawesome/free-solid-svg-icons';

/* --- dnd-kit ------------------- */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useWindowSizeSelector } from '../../../../../providers/redux/store';
import { vw2px } from '../../../../../utils/converters';
import { useHeightGetter } from '../../../../../functions/height_getter/heightGetter';
import { ViewArray, ViewArrayOutlined, ViewArrayRounded } from '@mui/icons-material';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';


// === TYPE =========================================================== //
/**
 * @property todo - 各 todo の情報
 * @property activeTodoIdx - todos 配列の index ではなく、todos 配列に isArchived === false でfiltering した配列における index
 * @category Type of Props
 */
interface ActiveTodoProps {
    todo: TodoType;
    activeTodoIdx: number;
    isGloballyDragging: boolean;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * dnd-kit の useSortable を使って、drag される要素の情報を取得する。
 * {@link useActiveTodo} のヘルパーとして使用。
 * @param arg
 * 
 * @category Custom Hook
 * @example
 * ```tsx
 * const { attributes, listeners, setNodeRef, style, isDragging } = useDNDItem(todoId);
 * ```
 */
export const useDndItem = (todoId: string) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: todoId,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        height: isDragging ? '3.2rem' : 'auto',
    };

    return { attributes, listeners, setNodeRef, style, isDragging };
};

/**
 * ActiveTodo コンポーネントのロジックを担当。
 * @param arg
 * 
 * @category Custom Hook
 * @example
 * ```tsx
 * const {
 *      todoId,
 *      attributes, 
 *      listeners, 
 *      setNodeRef, 
 *      style, 
 *      isDragging, 
 *      liRef, 
 *      handleInfoBtnClick, 
 *      handleCompleteBtnClick, 
 *      handleArchiveBtnClick
 * } = useActiveTodo({todo, activeTodoIdx});
 * ```
 */
export const useActiveTodo = ({todo, activeTodoIdx}: Omit<ActiveTodoProps, 'isGloballyDragging'>) => {
    const todoId = todo.id;

    const { contentsWidth } = useWindowSizeSelector();
    const btnContainerWidth = vw2px(contentsWidth) * .5;
    const slidableParams: SlidableParams = { SLIDABLE_LENGTH: btnContainerWidth };

    // dnd-kit
    const { attributes, listeners, setNodeRef, style, isDragging } = useDndItem(todoId);

    // contexts
    const dispatch = useDispatch();
    const { cardViewOpen } = useCardViewOpener();

    const liRef = useRef<HTMLElement | null>(null);

    // handlers
    const handleInfoBtnClick = () => {
        cardViewOpen(activeTodoIdx);
        dispatch(setActiveIdx(activeTodoIdx));
    };
    const handleCompleteBtnClick = () => {
        dispatch(updateTodoProps({ todoId, update: { status: 'completed' } }));
    };
    const handleArchiveBtnClick = () => {
        dispatch(updateTodoProps({ todoId, update: { isArchived: true } }));
    };

    return {
        todoId,
        /** dnd-kit: dnd-kit の仕様上必要。 */
        attributes,
        /** dnd-kit: `<TodoHeader/>` に渡して、最終的に dnd 時にグリッパーとなる span 要素にバインド。 */
        listeners,
        /** dnd-kit: drag される要素の ref を設定する ref callback。 仕様上必要。 */
        setNodeRef,
        /** dnd-kit: drag される要素の transform 関連の style 仕様上コンポーネント定義内で定義して渡す。 */
        style,
        /** dnd-kit: drag 中かどうか。 */
        isDragging,
        /** detail の double click で mde modal を開くときに自動 scroll 先となる ref */
        liRef,
        /** info ボタンの click handler */
        handleInfoBtnClick,
        /** complete ボタンの click handler */
        handleCompleteBtnClick,
        /** archive ボタンの click handler */
        handleArchiveBtnClick,
        /** Slidable のパラメータ */
        slidableParams,
    };
}
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * 
 * @renderAs
 * - `<li/>`
 * @example
 * ```tsx
 * <ActiveTodo />
 * ```
 *
 * @category Component
 */
export const ActiveTodo = ({ todo, activeTodoIdx, isGloballyDragging }: ActiveTodoProps) => {
    const {
        todoId,
        attributes, 
        listeners, 
        setNodeRef, 
        style, 
        isDragging, 
        liRef, 
        handleInfoBtnClick, 
        handleCompleteBtnClick, 
        handleArchiveBtnClick,
        slidableParams,
     } = useActiveTodo({todo, activeTodoIdx});


    return (
        <StyledLi
            key={todoId}
            style={style}
            $isDragging={isDragging}
            ref={(e) => {
                setNodeRef(e);
                liRef.current = e;
            }}
            {...attributes}
        >
            {/* slidable: li内をスライド可能にするためのコンテナ */}
            <Slidable slidableParams={slidableParams}>
                {/* slidable: 通常時に表示されている要素 */}
                <SlidableMain className="slidable-main-contents">
                    <TodoHeader
                        attributes={'active'}
                        listeners={listeners}
                        todo={todo}
                    />

                    <TodoDetail
                        ref={liRef}
                        todo={todo}
                        isGloballyDragging={isGloballyDragging}
                    />
                </SlidableMain>

                {/* slidable: スライドで右から出てくる要素 */}
                <SlidableHidden
                    className="btns-container"
                    slidableLength={slidableParams.SLIDABLE_LENGTH}
                >
                    {/* 1. cards modal を表示する */}
                    <div className="each-btn-container info-btn-container">
                        <button
                            className={'each-btn btn-info'}
                            onClick={handleInfoBtnClick}
                            children={<ViewArrayOutlined/>}
                        />
                    </div>

                    {/* 2. todo を完了済み(completed)にする */}
                    <div className="each-btn-container check-btn-container">
                        <button
                            className={'each-btn btn-check'}
                            onClick={handleCompleteBtnClick}
                            children={<FontAwesomeIcon icon={faCheck} />}
                        />
                    </div>

                    {/* 3. todo をアーカイブ(isArchived === true に)する */}
                    <div className="each-btn-container delete-btn-container">
                        <button
                            className={'each-btn btn-delete'}
                            onClick={handleArchiveBtnClick}
                            children={<FontAwesomeIcon icon={faTrashCan} />}
                        />
                    </div>
                </SlidableHidden>
            </Slidable>
        </StyledLi>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
interface StyledLiType {
    $isDragging: boolean;
    // $isGlobalDragging: boolean;
    // $height: number | null;
}

const StyledLi = styled.li<StyledLiType>`
    background: var(--color-white-3);
    border-radius: 0.4rem;

    margin: 1.6rem 0;
    opacity: ${({$isDragging}) => ($isDragging ? 0.5 : 1)};
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
        .each-btn-container:active {
            scale: 0.95;
            transition: scale 100ms;
        }
        .each-btn-container {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .each-btn {
                font-size: 2rem;
                display: block;
                width: 95%;
                height: 95%;
                border:  var(--border-1);
                border-radius: 0.2rem;
                @media (width < 600px) {
                    border-radius: 0.15rem;
                }
            }

            .btn-info {
                color: pink;
                svg {
                    font-size: 2.4rem;
                }
            }
            .btn-check {
                color: tomato;
            }
            .btn-delete {
                color: maroon;
            }
        }
    }
`;
// ========================================================= STYLE === //
