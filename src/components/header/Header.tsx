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
interface HeaderType {}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const Header: FC<HeaderType> = () => {
	return (
		<StyledHeader>
      <div className = "header-container">
        <h1>
          T<span>o</span>D<span>o</span>
        </h1>
        {/* <h2 children = " - To Do 管理ツール編 - " /> */}
      </div>
    </StyledHeader>
  )
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledHeader = styled.header`
  height: 45vh;
  background-color: #454e70;
  color: #d0d0d0;;
  clip-path: polygon(
    0 0,
    100% 0,
    100% 100%,
    0 calc(100% - 5vw)
  );
  letter-spacing: .15rem;

  @media (width < 600px) {
    height: 30vh;
  }

  span {
    color: #cfcf00;
  }

  .header-container {
    height: 100%;
    width: 60%;
    margin: 0 auto;
    @media (width < 600px) {
      width: 75%;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.8rem;

    h1, h2 { margin: 0 auto; }
    /* h1 {  } */
    h2 {
      width: auto;
      text-align: right;
    }
  }
`;
// ========================================================= STYLE === //