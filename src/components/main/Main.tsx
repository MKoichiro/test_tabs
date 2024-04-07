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
import { TabsContainer } from './tabs/TabsContainer';
import { CategoriesContainer } from './categories/CategoriesContainer';
import { CreateNewTodo } from './create_new_todo/CreateNewTodo';
/* --- dev ----------------------- */
import { isDebugMode } from '../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface MainType {}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const Main: FC<MainType> = (props) => {
	const {} = props;

	return (
		<StyledMain>
			<h1 children="Main" />
			<section className="todos-display-container">
				<TabsContainer />
				<CategoriesContainer />
			</section>
			<section className="form-create-new-todos-container">
				<CreateNewTodo />				{/* = form */}
			</section>
		</StyledMain>
	);
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledMain = styled.main`
	width: var(--contents-width);
	margin: 0 auto;
`;
// ========================================================= STYLE === //