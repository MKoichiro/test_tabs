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
import React, { FC, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { CardsCarousel } from './CardsCarousel';
/* --- types --------------------- */
import { CategoryType } from '../../../../../types/Categories';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';
import { useCardDialogRegister } from '../../../../../providers/CardViewProvider';

import { Modal, ModalName, useModalDeclarer, useModalState } from '../../../../../providers/ModalProvider_ver3';

// === TYPE =========================================================== //
// - PROPS
interface PropsType {
  category: CategoryType;
  index: number;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
export const CardsContainer: FC<PropsType> = (props) => {
  const { dialogRef } = useCardDialogRegister();

  return (
      <StyledDialog ref={dialogRef}>
        <CardsCarousel {...props} />
      </StyledDialog>
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledDialog = styled.dialog`
  background: transparent;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  max-width: none; // reset
  max-height: none; // reset
  border: none; // reset
  width: 100vw;
  height: 100vh;
  padding: 0;
`;
// ========================================================= STYLE === //