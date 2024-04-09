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
/* --- child components ---------- */
import { TodoDetail } from './TodoDetail';
import { TodoHeader } from './TodoHeader';
/* --- types --------------------- */
import { TodoType } from '../../../../../types/Categories';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface PropsType {
  todo: TodoType;
  categoryId: string;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const Todo = forwardRef(({...props}: PropsType, ref: LegacyRef<HTMLDivElement> | undefined) => {
  const { todo } = props;
  
  return (
    <StyledDiv ref={ref}>

      <TodoHeader
        attributes={ 'ghost' }
        todo={ todo } />

      <TodoDetail todo={ todo } />
    </StyledDiv>
  );
});
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledDiv = styled.div`
  background: grey;
  
  .gripper {
    padding: 0 .8rem;
    cursor: grabbing;
  }

  header {
    display: flex;
  }

  h4 {

  }
  .icon-expired {
    color: red;
  }

  .detail-container {

    .todo-info {
      width: 20%;
      margin: 0 1.6rem 0 auto;
      .info-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .info-label {

        }
        .info-value {
        }
      }

    }
  }
`;
// ========================================================= STYLE === //