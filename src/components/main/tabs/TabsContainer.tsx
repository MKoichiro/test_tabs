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
import React, { FC, useRef, useContext } from 'react';
import styled from 'styled-components';
/* --- providers/contexts -------- */
import { CategoriesContext } from '../../../providers/CategoriesProvider';
import { useModalOpener } from '../../../providers/ModalProvider';
import { modalNames } from '../../../providers/modalNames';
/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
/* --- child components ---------- */
import { Tab } from './Tab';
import { EditCategoriesModal } from './edit_categories_modal/EditCategoriesModal';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface TabsProps {
	className?: string;
}
// - STYLE
// - OTHERS
// ===================================================== 型定義部分 === //


// === COMPONENT ====================================================== //
export const TabsContainer: FC<TabsProps> = (props) => {
  const { className } = props;

  // contexts
  const { categories } = useContext(CategoriesContext);
  const modalName = modalNames.editCategories;
  const { openModal } = useModalOpener(modalName);

  // register refs
  const ulRef = useRef<HTMLUListElement | null>(null);


	return (
    <StyledNav>
      <ul
        className = { className }
        ref       = {     ulRef }
      >
        { categories.map((category, i) => {
          return (
            <Tab
              key   = { category.id }
              ulRef = {       ulRef }
              index = {           i } />
          )}
        ) }
      </ul>

      <span className={'separater-tabs'}/>

      <button onClick={ openModal }>
        <FontAwesomeIcon icon={faPen} />
      </button>

      <EditCategoriesModal/>

    </StyledNav>

	);
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledNav = styled.nav`
  margin-top: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1.6rem;
  height: 5rem;
  > ul {
    width: 62vw;
    display: flex;
    height: 100%;
    overflow-x: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar { display: none; };
  }
  .separater-tabs {
    display: block;
    height: 100%;
    background: #fff;
    width: 3px;
    margin-left: 1.6rem;
  }
  >button {
    display: block;
    padding: 0 1.6rem;
  }
`;
// ========================================================= STYLE === //