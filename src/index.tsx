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
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';  // 現状createRootはreact-dom/clientから取得
/* --- styles -------------------- */
import GlobalStyle from './globalStyle';
/* --- child components ---------- */
import { App } from './components/App';
/* --- dev ----------------------- */
import { isDebugMode } from './utils/adminDebugMode';


// rootを取得
const rootDiv = document.querySelector('#root');

if (rootDiv) {
  const root = createRoot(rootDiv);

 root.render(
  <>
    <StrictMode>
      <GlobalStyle />          {/* 共通スタイルの読み込み */}
      <App />                  {/* プレエントリの読み込み */}
    </StrictMode>
  </>

 );

} else { console.error('The element with the id "root" is not found.') }