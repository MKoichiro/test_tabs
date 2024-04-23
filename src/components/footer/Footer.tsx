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
import React, { FC } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
/* --- dev ----------------------- */
import { isDebugMode } from '../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface FooterType {}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const Footer: FC<FooterType> = () => {
  return (
    <StyledFooter>
      <h3 children = "Todo By React x TypeScript x styled-components" />
    </StyledFooter>
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledFooter = styled.footer`
  display: flex;
  margin-top: auto;
  height: 15vh;
  width: 100%;
  color: #777;
  background: #fcfcfc;
  clip-path: polygon(
    0 5vw, 100% 0, 100% 100%, 0 100%
  );
  @media (width < 600px) {
    height: 10vh;
  }

  h3 {
    padding: 0 .8rem;
    align-self: flex-end;
    margin: 0 auto 0;
    width: var(--contents-width);
    line-height: 5rem;
    text-align: right;
    @media (width < 1024px) {
      width: 90%;
    }
  }
`;
// ========================================================= STYLE === //