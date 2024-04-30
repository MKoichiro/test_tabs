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
// import { CategoriesContext } from '../../../../../providers/CategoriesProvider';
/* --- types --------------------- */
import { TodoType } from '../../../../../providers/types/categories';
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
import { isDebugMode } from '../../../../../utils/adminDebugMode';
import { statusCheckers } from '../../../../../utils/todoPropsHandler';
import { useDispatch } from 'react-redux';
import { updateTodoProps } from '../../../../../providers/redux/slices/categoriesSlice';

// === TYPE =========================================================== //
// - PROPS
interface TodoHeaderType {
    todo: TodoType;
    attributes: 'active' | 'ghost' | 'archived'; // 3種類の親要素で、表示内容を変える
    listeners?: SyntheticListenerMap;
}
// - STYLE
interface StyledHeaderType {
    $isCompleted: boolean;
    $inEditing: boolean;
    $isOpen: boolean;
}
// - OTHERS
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
export const TodoHeader: FC<TodoHeaderType> = (props) => {
    const { todo, attributes, listeners } = props;

    // const { dispatchCategoriesChange, checkIsCompleted, checkIsExpired } = useContext(CategoriesContext);
    const { checkIsCompleted, checkIsExpired } = statusCheckers;
    const dispatch = useDispatch();

    // 'double clickで編集' の hooks
    const { inEditing, inputRef, handleDoubleClick, handleSubmit, handleChange, handleBlur } =
        useImmediateEditable('todo', todo);

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

    return (
        <StyledHeader
            $isCompleted={isCompleted}
            $inEditing={inEditing}
            $isOpen={isOpen}
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
            <div className="btn-container">
                <button
                    className="btn-toggle-detail"
                    onClick={attributes !== 'ghost' ? () => toggleOpen() : undefined} // Ghost要素に、detail開閉機能は不要。
                >
                    <FontAwesomeIcon icon={faChevronUp} />
                </button>
            </div>
        </StyledHeader>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledHeader = styled.header<StyledHeaderType>`
    display: flex;
    align-items: center;
    font-size: 2rem;
    line-height: 1.6em;
    height: 1.6em;
    @media (width < 600px) {
        font-size: 16px;
    }

    .gripper {
        display: flex;
        align-items: center;
        height: 100%;
        touch-action: none;
        padding: 0 0.8rem;
        cursor: grab;
        svg {
            font-size: inherit;
            @media (width < 600px) {
                font-size: 14px;
            }
        }
    }

    .icon-expired {
        color: #b00;
        display: flex;
        align-items: center;
        height: 100%;
        padding-right: 0.8rem;
        svg {
            height: 50%;
        }
    }

    .main-container {
        flex: 1;
        h4,
        input {
            font-size: inherit;
            line-height: inherit;
            padding: 0;
        }
        h4 {
            display: ${(props) => (props.$inEditing ? 'none' : 'block')};
            text-decoration: ${(props) => (props.$isCompleted ? 'line-through' : '')};
            cursor: pointer;
        }
        input {
            border: none;
            outline: none;
            background: none;
            border-bottom: 1px solid #000;
            border-radius: 0;
            display: ${(props) => (props.$inEditing ? 'block' : 'none')};
            width: 100%;
        }
    }

    .btn-container {
        display: flex;
        > button {
            height: 100%;
        }
        .btn-toggle-detail {
            scale: ${(props) => (props.$isOpen ? '1 1' : '1 -1')};
            transition: scale 500ms;
            display: flex;
            align-items: center;
            padding: 0 0.8rem;
            width: 3.6rem;
            svg {
                height: 50%;
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
