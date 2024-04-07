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
import React, { useContext, forwardRef, Ref, RefObject } from 'react';
import styled from 'styled-components';
/* --- providers/contexts -------- */
import { CategoriesContext } from '../../../providers/CategoriesProvider';
/* --- utils --------------------- */
import { convertVwToPx } from '../../../utils/converters';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface PropsType {
  index: number;
  containerRef: RefObject<HTMLUListElement | null>;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const Tab = forwardRef((props: PropsType, liRef: Ref<HTMLLIElement>) => {
  const { index, containerRef } = props;
  const { categories, dispatchCategoriesChange } = useContext(CategoriesContext);
  const category = categories[index];


  const handleContainerScroll = () => {
    // null check
    const container = containerRef.current;
    if (!liRef) {     console.error('li 要素が見つかりません。'); return; }
    if (!container) { console.error('tab ul が見つかりません。'); return; }

    const currentContentWidth = convertVwToPx(62);

    // get scroll coordinate
    const inActiveTabWidth = currentContentWidth * .15;
    const scroll = inActiveTabWidth * index;
    // execute scroll
    container.scrollTo({ left: scroll, behavior: 'smooth' });
  };

  const toggleActive = () => {
    handleContainerScroll();
    dispatchCategoriesChange({ type: 'switch_tab', newActiveIdx: index });
  };


  return (
    <StyledLi
      key={           category.id }
      $isActive={ category.isActive }
      ref={              liRef }
    >
      <button
        children={ category.name }
        onClick={         toggleActive } />

      { (index !== categories.length - 1) && <span className="separater" /> }
    </StyledLi>
  )
});
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
interface StylePropsType {
  $isActive: boolean;
}

const StyledLi = styled.li<StylePropsType>`
    & {
    display: flex;
    gap: inherit;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;

    transition: max-width 750ms;
    max-width: ${ props => props.$isActive ? `100%` : '15%' };

    height: 100%;
    min-width: 15%;
  }

  button {
    display: block;
    width: 100%;
    height: 66.7%;
    padding: 0 .8rem;

    background: ${ props => props.$isActive ? '#454e70' : '#ddd' };
    color: ${ props => props.$isActive ? '#fff' : '' };
    margin-left: .4rem;

    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: scale 50ms;
  }
  button:active { scale: .9; }

  .separater {
    height: 100%;
    min-width: .15rem;
    margin-left:.4rem;

    background: #fff;
  }
`;
// ========================================================= STYLE === //