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
import React from 'react';
import styled from 'styled-components';

/* --- types --------------------- */
import { TodoType } from '../../../../../providers/types/categories';

/* --- utils --------------------- */
import { DLFormatters, statusCheckers } from '../../../../../utils/todoPropsHandler';
import { getFormattedDate } from '../../../../../utils/dateFormatter';

/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';

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
    } = getFormattedInfo(todo);

    return (
        <StyledTable $isDev={isDebugMode}>
            <thead className="info-heads-container">
                <tr className="info-heads">
                    <th
                        className="info-head"
                        children="deadline"
                    />
                    <th
                        className="info-head"
                        children="created"
                    />
                    <th
                        className="info-head"
                        children="updated"
                    />
                    <th
                        className="info-head"
                        children="status"
                    />
                    <th
                        className="info-head"
                        children="priority"
                    />
                    {isDebugMode && (
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
                    <td
                        className="info-value"
                        children={deadline}
                    />
                    <td
                        className="info-value"
                        children={createdDate}
                    />
                    <td
                        className="info-value"
                        children={updatedDate}
                    />
                    <td
                        className="info-value"
                        children={status}
                    />
                    <td
                        className="info-value"
                        children={priority}
                    />
                    {isDebugMode && (
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
    /* margin: 0 1.6rem; */
    margin-left: auto;
    border-collapse: collapse;
    /* padding: 1.6rem; */
    width: ${({ $isDev }) => ($isDev ? '100%' : '50%')};

    .dev-th {
        background: #ddd;
    }
    .dev-td {
        background: #eee;
    }

    tr {
        display: flex;
        padding: 0 0.8rem;
    }
    th,
    td {
        flex: 1;
        border: 1px solid #aaa;
        padding: 0.8rem 0;
        text-align: center;
    }

    thead.info-heads-container {
        /* background: #ddd; */
        tr.info-heads {
            th.info-head {
            }
        }
    }

    tbody.info-values-container {
        tr.info-values {
            td.info-value {
            }
        }
    }
`;
// ========================================================= STYLE === //
