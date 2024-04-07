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
export const Footer: FC<FooterType> = (props) => {
	const {} = props;
	return (
    <StyledFooter>
  		<h1 children="Footer" />
    </StyledFooter>
	);
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledFooter = styled.footer`
  h1 {
    background: pink;
    color: red;
  }
`;
// ========================================================= STYLE === //



// memo:
// export Footer = () => { return (<StyledFooter><h1/></StyledFooter>)};
// に対して、本来は、
// const StyledFooter = styled.footer` /* css */ `;
// が正解だが、
// const StyledFooter = styled(Footer)` /* css */ `;
// と誤記していた状態で、npm start すると、
// ターミナルには成功時と同様にwebpack 5.91.0 compiled successfully in 1739 msまで表示されるが、
// ブラウザには、tab部分にsite titleが表示される以外、真っ白で何も表示されない。
// dev toolを開いても、何も要素もコンソールもすべて空でエラーが全く表示されない。
// これは、FooterコンポーネントとStyledFooterコンポーネントが相互に参照し合っているため、無限ループが発生していると考えられる。
// このような状態が発生し、かなり沼ったので、今後注意が必要。