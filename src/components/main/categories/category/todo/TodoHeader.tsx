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

/* --- material icons ------------ */
import { ErrorOutline, ExpandLess } from '@mui/icons-material';

/* --- dnd-kit ------------------- */
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useWindowSizeSelector } from '../../../../../providers/redux/store';
import { isTouchDevice } from '../../../../../data/constants/constants';
import { BulletIcon } from '../../../../common/btns_icons/bullet_icon/BulletIcon';
import { DragBtn } from '../../../../common/btns_icons/drag_btn/DragBtn';
import { immediateEditableInput } from '../../../../../styles/global/globalStyle';
import { useImmediateInputEditable } from '../../../../../functions/immediateEditable/Hooks_ver2';

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
    handleMouseDown?: (e: React.MouseEvent | React.TouchEvent) => void;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @param arg
 *
 * @category Custom Hook
 */
const useTodoHeader = ({ todo, attributes }: Pick<TodoHeaderProps, 'todo' | 'attributes'>) => {
    const { checkIsCompleted, checkIsExpired } = statusCheckers;
    const dispatch = useDispatch();

    // 'double clickで編集' の hooks
    const { inEditing, inputRef, handleDoubleClick, handleSubmit, handleChange, handleBlur } =
        useImmediateInputEditable({ target: todo, targetProperty: 'title' });

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
        isArchived: todo.isArchived,
        isActive: !todo.isArchived,
        isGhost: attributes === 'ghost',
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
export const TodoHeader = ({ todo, attributes, listeners, isGloballyDragging, handleMouseDown }: TodoHeaderProps) => {
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
        isArchived,
        isActive,
        isGhost,
    } = useTodoHeader({ todo, attributes });

    const { device } = useWindowSizeSelector();

    return (
        <StyledHeader
            $isCompleted={isCompleted}
            $inEditing={inEditing}
            $isOpen={isOpen}
            $isGloballyDragging={isGloballyDragging}
            $isActive={isActive}
            $isExpired={isExpired}
            $isArchived={isArchived}
        >
            {/* 1. title 直前の icon */}
            {isTouchDevice && device === 'sp' && !isArchived ? (
                <DragBtn
                    className="btn-gripper"
                    listeners={listeners}
                    handleMouseDown={handleMouseDown}
                />
            ) : (
                <BulletIcon />
            )}

            {/* 2. 期限切れアイコン */}
            {isExpired && (
                <span className="icon-expired">
                    <ErrorOutline />
                </span>
            )}

            {/* 3.1 Active要素なら、編集フォームを提供。 */}
            {isActive && (
                <div
                    className="main-container"
                    onDoubleClick={handleDoubleClick}
                >
                    <h4
                        className="IE-display"
                        children={title}
                    />
                    <form
                        className="IE-form"
                        onSubmit={handleSubmit}
                    >
                        <textarea
                            className="IE-edit"
                            ref={inputRef.setRef}
                            defaultValue={title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </form>
                </div>
            )}

            {/* 3.2 Ghost要素、Archived要素には、編集フォームは不要。 */}
            {!isActive && (
                <div className="main-container">
                    <h4 children={title} />
                </div>
            )}

            {/* 4. detail 開閉ボタン */}
            <button
                className="btn-toggle-detail"
                onClick={isActive ? () => toggleOpen() : undefined} // Ghost要素、Archived要素に、detail開閉機能は不要。
            >
                {!isArchived && <ExpandLess />}
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
    $isActive: boolean;
    $isExpired: boolean;
    $isArchived: boolean;
}
const StyledHeader = styled.header<StyledHeaderType>`
    /* set variables */
    --expired-width: ${({ $isExpired, $isArchived }) => {
        if ($isArchived) {
            return '0px';
        } else if ($isExpired) {
            return 'var(--icon-size-1)';
        } else {
            return '0px';
        }
    }};
    --num-of-btns: ${({ $isActive }) => ($isActive ? 2 : 1)};
    --btns-width: calc(var(--icon-size-1) * var(--num-of-btns));
    --todo-container-width: ${({ $isArchived }) =>
        !$isArchived ? 'var(--active-todo-width)' : 'var(--archived-todo-width)'};
    --title-width: calc(var(--todo-container-width) - var(--expired-width) - var(--btns-width));

    display: flex;
    align-items: center;
    color: ${({ $isCompleted, $isArchived }) =>
        $isCompleted || $isArchived ? 'var(--color-gray-1)' : 'var(--color-black-1)'};

    /* icons & buttons */
    :has([class*='MuiSvgIcon']) {
        min-width: var(--icon-size-1);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        svg {
            font-size: 2rem;
            @media (width < 600px) {
                font-size: 14px;
            }
        }
    }

    .icon-expired {
        color: tomato;
    }

    .btn-toggle-detail {
        scale: ${({ $isOpen }) => ($isOpen ? '1 1' : '1 -1')};
        transition: scale 500ms;
        svg {
            font-size: 3.2rem;
            @media (width < 600px) {
                font-size: 16px;
            }
        }
    }

    .main-container {
        flex: 1;
        max-width: var(--title-width);

        ${({ $inEditing }) => immediateEditableInput({ $inEditing })}

        .IE-display {
            cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
            text-decoration: ${({ $isCompleted }) => ($isCompleted ? 'line-through' : '')};

            height: ${({ $isGloballyDragging, $isArchived }) =>
                $isGloballyDragging || $isArchived ? 'var(--list-title-line-height)' : 'auto'};
            text-overflow: ${({ $isGloballyDragging, $isArchived }) =>
                $isGloballyDragging || $isArchived ? 'ellipsis' : 'clip'};
            overflow: ${({ $isGloballyDragging, $isArchived }) =>
                $isGloballyDragging || $isArchived ? 'hidden' : 'visible'};
            white-space: ${({ $isGloballyDragging, $isArchived }) =>
                $isGloballyDragging || $isArchived ? 'nowrap' : 'pre-line'};
        }
        .IE-form {
            .IE-edit {
            }
        }
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
