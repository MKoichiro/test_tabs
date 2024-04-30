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
import React, { FC, useContext } from 'react';
import styled from 'styled-components';
/* --- providers/contexts -------- */
import { CategoriesContext } from '../../../../../../trash/CategoriesProvider_ignore';
/* --- types --------------------- */
import { TodoType } from '../../../../../providers/types/categories';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';
import { DLFormatters, statusCheckers } from '../../../../../utils/todoPropsHandler';
import { getFormattedDate } from '../../../../../utils/dateFormatter';

// これはもはやフックスである必要はない。ただの関数でいい。これもutilsに入れるべきかもしれない。
const useFormattedInfoEmitter = (todo: TodoType) => {
    const { checkIsExpired, checkIsCompleted } = statusCheckers;
    const { toDispDeadline } = DLFormatters;

    // format
    const isExpired = checkIsExpired(todo);
    const isCompleted = checkIsCompleted(todo);
    const formattedDeadline = toDispDeadline(todo);
    const formattedCreatedDate = getFormattedDate(todo.createdDate);
    const formattedUpdatedDate = getFormattedDate(todo.updatedDate);

    return {
        ...todo,

        isExpired,
        isCompleted,
        deadline: formattedDeadline,
        createdDate: formattedCreatedDate,
        updatedDate: formattedUpdatedDate,
    };
};

// === TYPE =========================================================== //
// - PROPS
interface InfoTableType {
    todo: TodoType;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
export const InfoTable: FC<InfoTableType> = (props) => {
    const { todo } = props;

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
    } = useFormattedInfoEmitter(todo);

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
