/**
 * @summary title を表示する todo のヘッダーコンポーネント。
 * @issues
 * - なし
 * @copilot
 * - なし
 * @module
 */

/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

/* --- redux --------------------- */
import { useDispatch } from 'react-redux';
import { updateTodoProps } from '../../../../../providers/redux/slices/categoriesSlice';

/* --- types --------------------- */
import { TodoType } from '../../../../../providers/types/categories';

/* --- utils --------------------- */
import { statusCheckers } from '../../../../../utils/todoPropsHandler';

/* --- hooks --------------------- */
import { useImmediateEditable } from '../../../../../functions/immediateEditable/Hooks';

/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

/* --- material icons ------------ */
import { DragIndicator } from '@mui/icons-material';

/* --- dnd-kit ------------------- */
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property todo - todo の情報
 * @property attributes - 親要素の属性によって、表示内容を変える
 * @property listeners - dnd-kit 用のリスナー、gripper に適用
 * @category Type of Props
 */
interface TodoHeaderProps {
    todo: TodoType;
    attributes: 'active' | 'ghost' | 'archived'; // 3種類の親要素で、表示内容を変える
    listeners?: SyntheticListenerMap;
    isGloballyDragging: boolean;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @param arg
 * 
 * @category Custom Hook
 * @example
 * ```tsx
 * const {
 *     inEditing,
 *     inputRef,
 *     handleDoubleClick,
 *     handleSubmit,
 *     handleChange,
 *     handleBlur,
 *     title,
 *     isExpired,
 *     isCompleted,
 *     isOpen,
 *     toggleOpen,
 * } = useTodoHeader(todo);
 * ```
 */
const useTodoHeader = (todo: TodoType) => {
    const { checkIsCompleted, checkIsExpired } = statusCheckers;
    const dispatch = useDispatch();

    // 'double clickで編集' の hooks
    const {
        inEditing,
        inputRef,
        handleDoubleClick,
        handleSubmit,
        handleChange,
        handleBlur
    } = useImmediateEditable({target: todo, targetProperty: 'title'});

    // todo の各 property を取得
    const { title, isOpen } = todo;
    const isExpired = checkIsExpired(todo);
    const isCompleted = checkIsCompleted(todo);

    // 'isOpen' property の編集を実行 → detail の表示/非表示を切り替える
    const toggleOpen = () => {
        isOpen
            ? dispatch(updateTodoProps({ todoId: todo.id, update: { isOpen: false } }))
            : dispatch(updateTodoProps({ todoId: todo.id, update: { isOpen: true } }));
    };

    return {
        inEditing,
        /** 編集中に表示する title の inputRef */
        inputRef,
        /** title がダブルクリックされた時の処理 */
        handleDoubleClick,
        /** title の編集内容を submit する処理 */
        handleSubmit,
        /** title の編集内容が変更された時の処理 */
        handleChange,
        /** title の編集が終了した時の処理 */
        handleBlur,
        title,
        isExpired,
        isCompleted,
        isOpen,
        toggleOpen,
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * 
 * @renderAs
 * - `<header/>`
 * @example
 * ```tsx
 * <TodoHeader todo={} attributes={} listeners={} />
 * ```
 *
 * @category Component
 */
export const TodoHeader = ({ todo, attributes, listeners, isGloballyDragging }: TodoHeaderProps) => {

    const {
        inEditing,
        inputRef,
        handleDoubleClick,
        handleSubmit,
        handleChange,
        handleBlur,
        title,
        isExpired,
        isCompleted,
        isOpen,
        toggleOpen,
    } = useTodoHeader(todo);

    return (
        <StyledHeader
            $isCompleted={isCompleted}
            $inEditing={inEditing}
            $isOpen={isOpen}
            $isGloballyDragging={isGloballyDragging}
            $isExpired={isExpired}
        >
            {/* 1. グリップ可能を示す、six-dots icon */}
            <span
                className="gripper"
                {...listeners}
            >
                <DragIndicator />
            </span>

            {/* 2. 期限切れアイコン */}
            {isExpired && (
                <span className="icon-expired">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                </span>
            )}

            {/* 3.1 Active要素なら、編集フォームを提供。 */}
            {attributes === 'active' && (
                <div
                    className="main-container"
                    onDoubleClick={handleDoubleClick}
                >
                    <h4 children={title} />
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            ref={inputRef}
                            defaultValue={title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </form>
                </div>
            )}

            {/* 3.2 Ghost要素、Archived要素には、編集フォームは不要。 */}
            {attributes !== 'active' && (
                <div className="main-container">
                    <h4 children={title} />
                </div>
            )}

            {/* 4. detail 開閉ボタン */}
            <button
                className="btn-toggle-detail"
                onClick={attributes !== 'ghost' ? () => toggleOpen() : undefined} // Ghost要素に、detail開閉機能は不要。
            >
                <FontAwesomeIcon icon={faChevronUp} />
            </button>
        </StyledHeader>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
interface StyledHeaderType {
    $isCompleted: boolean;
    $inEditing: boolean;
    $isOpen: boolean;
    $isGloballyDragging: boolean;
    $isExpired: boolean;
}
const StyledHeader = styled.header<StyledHeaderType>`
    --title-line-height: 3.2rem;
    display: flex;
    align-items: center;
    font-size: 2rem;
    line-height: var(--title-line-height);

    --icons-width: ${({$isExpired}) => {
        if ($isExpired) { return '3.2rem' }
        else { return '0px' }
    }};
    --btn-width: 3.6rem;
    --btns-width: calc(var(--btn-width) * 2);
    --title-width: calc(100% - var(--icons-width) - var(--btns-width));


    @media (width < 600px) {
        font-size: 16px;
    }

    .gripper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: var(--btn-width);
        touch-action: none;
        cursor: grab;
        svg {
            font-size: inherit;
            @media (width < 600px) {
                font-size: 14px;
            }
        }
    }

    /* .icon-expired と .btn-toggle-open 共通 */
    button:has(svg[class*="fa-"]) {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--title-line-height);
        svg {
            height: 1.6rem;
        }
    }

    .icon-expired {
        color: #b00;
        width: var(--icons-width);
    }

    .main-container {
        flex: 1;
        max-width: var(--title-width);
        border-bottom: ${({$inEditing}) => ($inEditing ? 'var(--border-1)' : 'var(--border-weight) solid transparent')};
        h4,
        input {
            font-size: inherit;
            line-height: inherit;
        }
        h4 {
            display: ${({$inEditing}) => ($inEditing ? 'none' : 'block')};
            text-decoration: ${({$isCompleted}) => ($isCompleted ? 'line-through' : '')};
            color: ${({$isCompleted}) => ($isCompleted ? 'var(--color-gray-1)' : 'var(--color-black-1)')};
            cursor: pointer;
            max-width: 100%;
            height: ${({$isGloballyDragging}) => ($isGloballyDragging ? 'var(--title-line-height)' : 'auto')};
            text-overflow: ${({$isGloballyDragging}) => ($isGloballyDragging ? 'ellipsis' : 'clip')};
            overflow: ${({$isGloballyDragging}) => ($isGloballyDragging ? 'hidden' : 'visible')};
            white-space: ${({$isGloballyDragging}) => ($isGloballyDragging ? 'nowrap' : 'normal')};
        }
        input {
            display: ${({$inEditing}) => ($inEditing ? 'block' : 'none')};
            width: 100%;
        }
    }

    .btn-toggle-detail {
        width: var(--btn-width);
        scale: ${({$isOpen}) => ($isOpen ? '1 1' : '1 -1')};
        transition: scale 500ms;
    }
`;
// ========================================================= STYLE === //

// memo: オブジェクトマッピング

// const toggleOpen = () => {
//   isOpen
//   ? dispatchCategoriesChange({ type: 'todo_close', todoId: todo.id })
//   : dispatchCategoriesChange({ type: 'todo_open',  todoId: todo.id });
// };

// の部分は、オブジェクトマッピングを使うと、以下のように書き換えることもできる。
// const actionTypeMap = {
//   true: 'todo_close',
//   false: 'todo_open',
// };
// const toggleOpen = () => {
//   dispatchCategoriesChange({ type: actionTypeMap[isOpen], todoId: todo.id });
// };
// と書くこともできると、copilotが提案している。
// 多分今回の場合は得られる恩恵が少ないので、そのままで良い。
// ただ、後で調べること。