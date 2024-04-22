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
import React, { LegacyRef, forwardRef } from 'react';
import styled from 'styled-components';
/* --- types --------------------- */
import { CategoryType } from '../../../../../providers/types/categories';
/* --- styles -------------------- */
import { categoryCommonStyles, CategoryCommonStylesType } from './CategoryCommonStyles';
/* --- material icons ------------ */
import { DragIndicator } from '@mui/icons-material';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface GhostCategoryType {
  category: CategoryType;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const GhostCategory = forwardRef(({ ...props }: GhostCategoryType, ref: LegacyRef<HTMLDivElement> | undefined) => {
  const { category } = props;
  return (
    <StyledDiv ref={ ref }>
      <span className="gripper">
        <DragIndicator />
      </span>
      <p children={ category.name } />
    </StyledDiv>
  );
});
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledDiv = styled.div<CategoryCommonStylesType>`
  ${ categoryCommonStyles }
  .gripper {
    cursor: grabbing;
  }
  .category-name-container {
    p {
      display: block;
    }
  }
`;
// ========================================================= STYLE === //