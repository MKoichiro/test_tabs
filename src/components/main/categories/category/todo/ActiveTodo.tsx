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
import React, { MouseEvent, TouchEvent, useRef } from 'react';
import styled, { css } from 'styled-components';

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
import { setActiveIdx as setCardViewActiveIdx } from '../../../../../providers/redux/slices/cardSlice';
import { setActiveIdx as setInfoTableActiveIdx } from '../../../../../providers/redux/slices/infoTableActiveIdx';

/* --- providers/contexts -------- */
import { useCardViewOpener } from '../../../../../providers/context_api/CardView';

/* --- types --------------------- */
import { TodoType, notSet } from '../../../../../providers/types/categories';
// slidable
import { SlidableParams } from '../../../../../functions/slidable/types';

/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

/* --- dnd-kit ------------------- */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useWindowSizeSelector } from '../../../../../providers/redux/store';
import { vw2px } from '../../../../../utils/converters';
import {
    Inventory2Outlined,
    TaskAltOutlined,
    UnpublishedOutlined,
    ViewArrayOutlined,
} from '@mui/icons-material';
import { useSlidableRegister } from '../../../../../functions/slidable/Hooks';
import { isTouchDevice } from '../../../../../data/constants/constants';
import { ControlPanel } from '../../../../common/list_control_panel/ControlPanel';
import {
    activeListCommon,
    draggingItemStyle,
    marginBetweenLiEls,
} from '../../../../../globalStyle';
// import { useGlobalSelectRef } from '../../../../../providers/context_api/global_ref/GlobalSelectRef';
import { setInEditing } from '../../../../../providers/redux/slices/immediateEditableSlice';
// import { SerializedStyles, css } from '@emotion/react';

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
    handleMouseDown: (e: MouseEvent | TouchEvent) => void;
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

    // liに適用するstyle
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // drag中に折りたたんだときのcollision判定に使われる実体の高さをスタイルと一致させる。
        // これがないと、drag中に折りたたんでいるのに、展開時の大きさでcollision判定が発生し挙動が不安定になる。
        // 3.2remは今のところmagicなので、後で変数で管理し、TodoHeaderと共有する。
        height: isDragging ? '3.2rem' : 'auto',
    };

    return { attributes, listeners, setNodeRef, style, isDragging };
};

/**
 * ActiveTodo コンポーネントのロジックを担当。
 * @param arg
 *
 * @category Custom Hook
 */
export const useActiveTodo = ({
    todo,
    activeTodoIdx,
    isGloballyDragging,
}: Omit<ActiveTodoProps, 'handleMouseDown'>) => {
    const todoId = todo.id;
    const isCompleted = todo.status === 'completed';

    const { contentsWidth } = useWindowSizeSelector();
    const btnsContainerWidthPx = vw2px(contentsWidth) * 0.5;
    const SLIDABLE_LENGTH = btnsContainerWidthPx;
    const SLIDABLE_PARAMS: SlidableParams = { SLIDABLE_LENGTH };

    const { isSlided, slide, unSlide, addSlidableBtn, register } = useSlidableRegister({
        params: SLIDABLE_PARAMS,
        skipCondition: isGloballyDragging,
    });

    // dnd-kit
    const { attributes, listeners, setNodeRef, style, isDragging } = useDndItem(todoId);

    // contexts
    const dispatch = useDispatch();
    const { cardViewOpen } = useCardViewOpener();

    const liRef = useRef<HTMLElement | null>(null);

    // handlers
    const handleInfoBtnClick = () => {
        cardViewOpen(activeTodoIdx);
        dispatch(setCardViewActiveIdx(activeTodoIdx));
    };
    
    const handleCompleteBtnClick = () => {
        if (isCompleted) {
            dispatch(setInEditing({ property: 'status', newState: { id: todoId, inEditing: true } }));
            dispatch(setInfoTableActiveIdx({ todoId: todoId, activeIdx: 1 }));
            dispatch(updateTodoProps({
                todoId,
                update: {
                    status: notSet,
                    isOpen: true,
                }
            }));
        } else {
            dispatch(updateTodoProps({ todoId, update: { status: 'completed' } }));
        }
    };
    const handleArchiveBtnClick = () => {
        dispatch(updateTodoProps({ todoId, update: { isArchived: true } }));
    };

    return {
        todoId,
        isCompleted,
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
        /** Slidable のパラメータ: slide距離 */
        SLIDABLE_LENGTH,
        /** Slidable登録用 */
        register,

        isSlided,
        slide,
        unSlide,
        addSlidableBtn,
    };
};
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
export const ActiveTodo = ({
    todo,
    activeTodoIdx,
    isGloballyDragging,
    handleMouseDown,
}: ActiveTodoProps) => {
    const {
        todoId,
        isCompleted,
        attributes,
        listeners,
        setNodeRef,
        style,
        isDragging,
        liRef,
        handleInfoBtnClick,
        handleCompleteBtnClick,
        handleArchiveBtnClick,
        SLIDABLE_LENGTH,
        register,
        isSlided,
        slide,
        unSlide,
        addSlidableBtn,
    } = useActiveTodo({ todo, activeTodoIdx, isGloballyDragging });

    const { device } = useWindowSizeSelector();

    const isOpen = todo.isOpen;

    return (
        <StyledLi
            key={todoId}
            style={style}
            $isDragging={isDragging}
            $isGlobalDragging={isGloballyDragging}
            $isOpen={isOpen}
            ref={(e) => {
                setNodeRef(e);
                liRef.current = e;
            }}
            {...attributes}
        >
            {/* slidable: li内をスライド可能にするためのコンテナ */}
            <Slidable {...register}>
                {/* slidable: 通常時に表示されている要素 */}
                <SlidableMain className="slidable-main-contents">
                    {/* spサイズのタッチデバイスでは非表示 / pcでもタッチデバイスならリサイズで小さくなっている場合には非表示 */}
                    {!(isTouchDevice && device === 'sp') && (
                        <ControlPanel
                            // className="todo-control-panel"
                            attrs={['drag', 'slide']}
                            isGloballyDragging={isGloballyDragging}
                            isOpen={isOpen}
                            drag={{ handleMouseDown, listeners }}
                            slide={{ isSlided, slide, addSlidableBtn }}
                        />
                    )}

                    <div className="contents">
                        <TodoHeader
                            attributes={'active'}
                            listeners={listeners}
                            todo={todo}
                            isGloballyDragging={isGloballyDragging}
                            handleMouseDown={handleMouseDown}
                        />

                        <TodoDetail
                            ref={liRef}
                            todo={todo}
                            isGloballyDragging={isGloballyDragging}
                        />
                    </div>
                </SlidableMain>

                {/* slidable: スライドで右から出てくる要素 */}
                <SlidableHidden
                    className="btns-container"
                    slidableLength={SLIDABLE_LENGTH}
                >
                    {/* 1. cards modal を表示する */}
                    <div className="each-btn-container info-btn-container">
                        <button
                            className={'each-btn btn-info'}
                            onClick={handleInfoBtnClick}
                            children={<ViewArrayOutlined />}
                        />
                    </div>

                    {/* 2. todo を完了済み(completed)にする */}
                    <div className="each-btn-container check-btn-container">
                        <button
                            className={'each-btn btn-check'}
                            onClick={handleCompleteBtnClick}
                            children={!isCompleted ? <TaskAltOutlined /> : <UnpublishedOutlined />}
                        />
                    </div>

                    {/* 3. todo をアーカイブ(isArchived === true)にする */}
                    <div className="each-btn-container delete-btn-container">
                        <button
                            className={'each-btn btn-delete'}
                            onClick={handleArchiveBtnClick}
                            children={<Inventory2Outlined />}
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
    $isOpen: boolean;
    $isGlobalDragging: boolean;
}

const StyledLi = styled.li<StyledLiType>`
    ${marginBetweenLiEls()}
    ${activeListCommon({ type: 'todo' })}
    ${({ $isDragging }) => draggingItemStyle($isDragging)}



    .slidable-main-contents {
        display: flex;

        .contents {
            flex: 1;
        }
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
                border: var(--border-1);
                border-radius: 0.2rem;
                @media (width < 600px) {
                    border-radius: 0.15rem;
                }
            }

            .each-btn:has([class^='MuiSvgIcon']) {
                svg {
                    font-size: 2.4rem;
                }
            }

            .btn-info {
                color: tomato;
            }
            .btn-check {
                color: tomato;
            }
            .btn-delete {
                color: tomato;
            }
        }
    }

    /* position: relative; */
`;

// ========================================================= STYLE === //
