/**
 * @summary detail open時に表示される詳細な情報を表示するテーブル部分。
 *
 * @issues
 * - なし
 * @copilot
 * - 未確認
 *
 * @module
 */

/* --- react/styled-components --- */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

/* --- types --------------------- */
import {
    TodoType,
    priorityLiterals,
    statusLiterals,
} from '../../../../../providers/types/categories';

/* --- utils --------------------- */
import { DLFormatters, statusCheckers } from '../../../../../utils/todoPropsHandler';
import { getFormattedDate } from '../../../../../utils/dateFormatter';

/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';
import { useImmediateEditable } from '../../../../../functions/immediateEditable/Hooks';
import { useCoexistSingleDoubleClickHandler } from '../../../../../functions/coexist_single_double_click_handler/Hooks';
import { useImmediateInputEditable, useImmediateSelectEditable } from '../../../../../functions/immediateEditable/Hooks_ver2';
import { useDispatch, useInfoTableActiveIdxSelector } from '../../../../../providers/redux/store';
import { setActiveIdx } from '../../../../../providers/redux/slices/infoTableActiveIdx';

const displayMoreInfo = false;

// === TYPE =========================================================== //
/**
 * @property todo - todo の情報
 * @category Type of Props
 */
interface InfoTableProps {
    todo: TodoType;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
const getFormattedInfo = (todo: TodoType) => {
    const { checkIsExpired, checkIsCompleted } = statusCheckers;
    const { toDispDeadline } = DLFormatters;

    return {
        ...todo,
        isExpired: checkIsExpired(todo),
        isCompleted: checkIsCompleted(todo),
        deadline: toDispDeadline(todo),
        createdDate: getFormattedDate(todo.createdDate),
        updatedDate: getFormattedDate(todo.updatedDate),
    };
};

// order of columns
const DISPLAY_ORDER = ['deadline', 'status', 'priority', 'created', 'updated'];
// waiting time for double click
const CLICK_DELAY = 200;
// get index of active column
const getActiveIdx = (e: React.MouseEvent): number => {
    const targetCell = (e.target as HTMLElement).closest('th, td');
    if (!targetCell) return -1;

    // key will be got like following: 'info-head priority' -> 'priority', 'info-value priority' -> 'priority'
    const classNames = targetCell.className.split(' ');
    const key = classNames.filter((className) => DISPLAY_ORDER.includes(className))[0];

    return DISPLAY_ORDER.indexOf(key);
};

const useInfoTable = (todo: TodoType) => {
    const dispatch = useDispatch();
    const activeIdx = useInfoTableActiveIdxSelector(todo.id)?.activeIdx;

    const deadlineIE = useImmediateInputEditable({ target: todo, targetProperty: 'deadline' });
    const statusIE = useImmediateSelectEditable({ target: todo, targetProperty: 'status' });
    const priorityIE = useImmediateSelectEditable({ target: todo, targetProperty: 'priority' });
    const inEditingStates = [deadlineIE.inEditing, statusIE.inEditing, priorityIE.inEditing];

    // handleOutsideClickは、よく使うのでhooks化するべきかも
    const tableRef = useRef<HTMLTableElement>(null);
    const handleOutsideClick = (e: MouseEvent) => {
        if (tableRef.current && !tableRef.current.contains(e.target as Node)) {
            dispatch(setActiveIdx({ todoId: todo.id, activeIdx: undefined }));
            deadlineIE.handleBlur();
            statusIE.handleBlur();
            priorityIE.handleBlur();
        }
    };
    useEffect(() => {
        activeIdx !== undefined
            ? document.addEventListener('mousedown', handleOutsideClick)
            : document.removeEventListener('mousedown', handleOutsideClick); // cleanup
    }, [activeIdx]);

    const toggleActiveKey = (e: React.MouseEvent): void => {
        const newIdx = getActiveIdx(e);
        if (activeIdx === newIdx && !inEditingStates[activeIdx]) {
            dispatch(setActiveIdx({ todoId: todo.id, activeIdx: undefined }));
        } else {
            dispatch(setActiveIdx({ todoId: todo.id, activeIdx: newIdx }));
        }
    };
    const activateKey = (e: React.MouseEvent): void => {
        const newIdx = getActiveIdx(e);
        if (activeIdx !== newIdx) dispatch(setActiveIdx({ todoId: todo.id, activeIdx: newIdx }));
    };

    const handleDeadlineDoubleClick = (e: React.MouseEvent) => {
        activateKey(e);
        deadlineIE.handleDoubleClick();
    };
    const handleStatusDoubleClick = (e: React.MouseEvent) => {
        activateKey(e);
        statusIE.handleDoubleClick();
    };
    const handlePriorityDoubleClick = (e: React.MouseEvent) => {
        activateKey(e);
        priorityIE.handleDoubleClick();
    };
    const handleDeadlineClick = useCoexistSingleDoubleClickHandler({
        handlers: {
            single: toggleActiveKey,
            double: handleDeadlineDoubleClick,
        },
        delay: CLICK_DELAY,
    });
    const handleStatusClick = useCoexistSingleDoubleClickHandler({
        handlers: {
            single: toggleActiveKey,
            double: handleStatusDoubleClick,
        },
        delay: CLICK_DELAY,
    });
    const handlePriorityClick = useCoexistSingleDoubleClickHandler({
        handlers: {
            single: toggleActiveKey,
            double: handlePriorityDoubleClick,
        },
        delay: CLICK_DELAY,
    });

    const handleDeadlineBlur = () => {
        deadlineIE.handleBlur();
        dispatch(setActiveIdx({ todoId: todo.id, activeIdx: undefined }));
    };
    const handleStatusBlur = () => {
        statusIE.handleBlur();
        dispatch(setActiveIdx({ todoId: todo.id, activeIdx: undefined }));
    };
    const handlePriorityBlur = () => {
        priorityIE.handleBlur();
        dispatch(setActiveIdx({ todoId: todo.id, activeIdx: undefined }));
    };

    const handleDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
        deadlineIE.handleChange(e);
        if (deadlineIE.inputRef && deadlineIE.inputRef.current) {
            deadlineIE.inputRef.current.blur();
        }
    };
    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        statusIE.handleChange(e);
        if (statusIE.selectRef && statusIE.selectRef.current) {
            statusIE.selectRef.current.blur();
        }
    };
    const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        priorityIE.handleChange(e);
        if (priorityIE.selectRef && priorityIE.selectRef.current) {
            priorityIE.selectRef.current.blur();
        }
    };

    return {
        deadlineIE,
        statusIE,
        priorityIE,
        handleDeadlineClick,
        handleStatusClick,
        handlePriorityClick,
        handleDeadlineBlur,
        handleStatusBlur,
        handlePriorityBlur,
        handleDeadlineChange,
        handleStatusChange,
        handlePriorityChange,
        tableRef,
        ...getFormattedInfo(todo),
        activeIdx,
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<table/>`
 * @example
 * ```tsx
 * <InfoTable todo={} />
 * ```
 *
 * @category Component
 */
export const InfoTable = ({ todo }: InfoTableProps) => {
    const {
        deadlineIE,
        statusIE,
        priorityIE,
        handleDeadlineClick,
        handleStatusClick,
        handlePriorityClick,
        handleDeadlineBlur,
        handleStatusBlur,
        handlePriorityBlur,
        handleDeadlineChange,
        handleStatusChange,
        handlePriorityChange,
        tableRef,
        id,
        isExpired,
        isCompleted,
        deadline,
        createdDate,
        updatedDate,
        status,
        priority,
        isArchived,
        isOpen,
        activeIdx,
    } = useInfoTable(todo);

    return (
        <StyledTable
            $isDev={isDebugMode}
            ref={tableRef}
        >
            <thead className="info-heads-container">
                <tr className="info-heads">
                    <StyledTh
                        $isActive={activeIdx === 0}
                        className="info-head deadline"
                        children="deadline"
                        onClick={handleDeadlineClick}
                    />
                    <StyledTh
                        $isActive={activeIdx === 1}
                        className="info-head status"
                        children="status"
                        onClick={handleStatusClick}
                    />
                    <StyledTh
                        $isActive={activeIdx === 2}
                        className="info-head priority"
                        children="priority"
                        onClick={handlePriorityClick}
                    />
                    <th
                        className="info-head"
                        children="created"
                    />
                    <th
                        className="info-head"
                        children="updated"
                    />
                    {isDebugMode && displayMoreInfo && (
                        <>
                            <th
                                className="dev-th info-head"
                                children="archived"
                            />
                            <th
                                className="dev-th info-head"
                                children="open"
                            />
                            <th
                                className="dev-th info-head"
                                children="expired"
                            />
                            <th
                                className="dev-th info-head"
                                children="id"
                            />
                            <th
                                className="dev-th info-head"
                                children="completed"
                            />
                        </>
                    )}
                </tr>
            </thead>
            <tbody className="info-values-container">
                <tr className="info-values">
                    <StyledTd
                        $isActive={activeIdx === 0}
                        className="info-value deadline"
                        onClick={handleDeadlineClick}
                    >
                        {deadlineIE.inEditing ? (
                            <form onSubmit={deadlineIE.handleSubmit}>
                                <input
                                    type="date"
                                    ref={deadlineIE.inputRef.setRef}
                                    defaultValue={deadline}
                                    onChange={handleDeadlineChange}
                                    onBlur={handleDeadlineBlur}
                                />
                            </form>
                        ) : (
                            <span children={deadline} />
                        )}
                    </StyledTd>
                    <StyledTd
                        $isActive={activeIdx === 1}
                        className="info-value status"
                        onClick={handleStatusClick}
                    >
                        {statusIE.inEditing ? (
                            <form onSubmit={statusIE.handleSubmit}>
                                <select
                                    ref={statusIE.selectRef.setRef}
                                    defaultValue={status}
                                    onChange={handleStatusChange}
                                    onBlur={handleStatusBlur}
                                >
                                    {statusLiterals.map((option) => (
                                        <option
                                            key={option}
                                            defaultValue={option}
                                            children={option}
                                        />
                                    ))}
                                </select>
                            </form>
                        ) : (
                            <span children={status} />
                        )}
                    </StyledTd>
                    <StyledTd
                        $isActive={activeIdx === 2}
                        className="info-value priority"
                        onClick={handlePriorityClick}
                    >
                        {priorityIE.inEditing ? (
                            <form onSubmit={priorityIE.handleSubmit}>
                                <select
                                    ref={priorityIE.selectRef.setRef}
                                    defaultValue={priority}
                                    onChange={handlePriorityChange}
                                    onBlur={handlePriorityBlur}
                                >
                                    {priorityLiterals.map((option) => (
                                        <option
                                            key={option}
                                            defaultValue={option}
                                            children={option}
                                        />
                                    ))}
                                </select>
                            </form>
                        ) : (
                            <span children={priority} />
                        )}
                    </StyledTd>
                    <td
                        className="info-value"
                        children={createdDate}
                    />
                    <td
                        className="info-value"
                        children={updatedDate}
                    />
                    {isDebugMode && displayMoreInfo && (
                        <>
                            <td
                                className="dev-td info-value"
                                children={String(isArchived)}
                            />
                            <td
                                className="dev-td info-value"
                                children={String(isOpen)}
                            />
                            <td
                                className="dev-td info-value"
                                children={String(isExpired)}
                            />
                            <td
                                className="dev-td info-value"
                                children={String(id)}
                            />
                            <td
                                className="dev-td info-value"
                                children={String(isCompleted)}
                            />
                        </>
                    )}
                </tr>
            </tbody>
        </StyledTable>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledTable = styled.table<{ $isDev: boolean }>`
    /* reset --- */
    th,
    td {
        padding: 0;
        display: block;
    }
    user-select: none;
    /* --- reset */
    /* dev --- */
    width: ${({ $isDev }) => ($isDev ? '100%' : '50%')};
    .dev-th,
    .dev-td {
        outline: var(--border-weight) solid #ddd;
    }
    /* --- dev */

    width: 100%;
    height: 100%;
    margin-left: auto;
    border-collapse: collapse; // cell 間の border が2重にならず1本にまとまる
    display: flex;
    flex-direction: column;

    thead,
    tbody {
        flex: 1;
    }
    tr {
        height: 100%;
        width: 100%;
        display: flex;
    }
    thead > tr {
        border-bottom: var(--border-weight) solid var(--color-black-1);
        // header行は下寄せ
        align-items: flex-end;
    }
    tbody > tr {
        // value行は上寄せ
        align-items: flex-start;
    }
    th,
    td {
        flex: 1;
        height: 67%;
        font-size: 1.4rem;
        letter-spacing: 0.05em;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
    }
`;

const StyledTh = styled.th<{ $isActive: boolean }>`
    ${({ $isActive }) => getActiveStyles($isActive)}
    border-top-width: var(--border-weight);
    border-top-style: solid;
    border-top-color: ${({ $isActive }) => ($isActive ? 'var(--color-black-1)' : 'transparent')};
    border-left-width: var(--border-weight);
    border-left-style: solid;
    border-left-color: ${({ $isActive }) => ($isActive ? 'var(--color-black-1)' : 'transparent')};
    transition:
        min-height 300ms,
        border-top-color 1000ms,
        border-left-color 1000ms,
        color 1000ms;
`;
const StyledTd = styled.td<{ $isActive: boolean }>`
    ${({ $isActive }) => getActiveStyles($isActive)}
    border-bottom-width: var(--border-weight);
    border-bottom-style: solid;
    border-bottom-color: ${({ $isActive }) => ($isActive ? 'var(--color-black-1)' : 'transparent')};
    border-right-width: var(--border-weight);
    border-right-style: solid;
    border-right-color: ${({ $isActive }) => ($isActive ? 'var(--color-black-1)' : 'transparent')};
    transition:
        min-height 300ms,
        border-bottom-color 1000ms,
        border-right-color 1000ms,
        color 1000ms;

    form {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        input,
        select {
            font-family: var(--ff-3);
            font-weight: bold;
            letter-spacing: 0.05em;
            text-align-last: center;
            color: tomato;
            user-select: none;
            width: 100%;
            height: 100%;
            font-size: 1.4rem;
            padding: 0;
            border: none;
            border-radius: 0;
            outline: 0;
            background-color: transparent;
            animation: blinking 1500ms infinite;
        }
    }

    @keyframes blinking {
        0% {
            opacity: 0;
        }
        40% {
            opacity: 1;
        }
        60% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;

const getActiveStyles = ($isActive: boolean) => css`
    cursor: pointer;
    font-size: ${$isActive ? '1.6rem' : '1.4rem'};
    min-height: ${$isActive ? '85%' : '67%'};
    tr > & {
        // 詳細度を1 point 上げるためにセレクタを指定
        color: ${$isActive ? '#000' : '#999'};
    }
`;
// ========================================================= STYLE === //

// memo: React.MouseEvent と MouseEvent の違い
// そもそも'MouseEvent'には二種類存在する。
// 1. 'MouseEvent': これはブラウザネイティブのAPIから提供されている型定義で、Reactのイベントとは関係ない。
// 2. 'React.MouseEvent': これはReactが提供している型定義。

// 使い分け
// 1. 'MouseEvent': vanilla.js の add(/remove)EventListener に渡す関数の型定義として使う。
// 2. 'React.MouseEvent': JSX の 例えば onClick などのReactのイベントハンドラに渡す関数の型定義として使う。
// 混同すると、これらは相互に互換性がないため、エラーが発生する。
