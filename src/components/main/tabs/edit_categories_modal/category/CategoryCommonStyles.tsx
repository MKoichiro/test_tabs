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

import { css } from 'styled-components';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';

export interface CategoryCommonStylesType {
    $isDragging?: boolean;
    $inEditing?: boolean;
}

export const categoryCommonStyles = css<{ $isDragging?: boolean; $inEditing?: boolean }>`
    display: flex;
    align-items: center;

    * {
        font-size: var(--fs-category-name);
        line-height: 4rem;
    }

    .gripper {
        touch-action: none;
        cursor: grab;
        width: 3rem;
        svg {
            display: block;
            margin: 0 auto;
        }
    }

    .category-name-container {
        flex: 1;
    }
`;
