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
import React, { FC } from 'react'
import styled from 'styled-components'
/* --- types --------------------- */
import { TodoType } from '../../../../../types/Categories';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';
import { useCardScroll } from '../../../../../providers/CardViewProvider';

import { getCardCarouselStyles } from '../../../../../providers/CardViewProvider';


// === TYPE =========================================================== //
// - PROPS
interface PropsType {
  todo: TodoType;
  idx: number;
  addScrollableElm: (elm: HTMLLIElement) => void;
}
// - STYLE
interface StyledLiType {
  $isActive: boolean;
  $activeWidth: number;
  $shrinkRatio: number;
}
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const CardTodo: FC<PropsType> = (props) => {
  const { todo, idx } = props;

  // contexts
  const { isActive, handleScroll } = useCardScroll(idx);

  // handlers
  const handleClick = () => {
    handleScroll(idx, 'smooth');
  };

  // styles
  const { activeWidth_vw, inactiveMagnification } = getCardCarouselStyles();


  return (
    <StyledLi
      onClick={handleClick}
      $isActive={isActive}
      $activeWidth={activeWidth_vw}
      $shrinkRatio={inactiveMagnification}
    >

      <section className='contents-wrapper'>
        <header>
          <h3>
            { todo.title }
          </h3>
        </header>

        <div className='color-container'>
          color-container
        </div>

        <div className='info-container'>
          infmation
        </div>

        <div className='detail-container'>
          <p>
            { todo.detail }
          </p>
        </div>

        <div className='category-container'>
          Category-0 // todoからcategoryを参照できるようにする
        </div>
      </section>

    </StyledLi>
  )
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledLi = styled.li<StyledLiType>`
  --active-width: ${ props => `${props.$activeWidth}vw` };
  --active-height: ${ props => `${props.$activeWidth}vh` };
  --shrink-ratio: ${ props => props.$shrinkRatio };
  pointer-events: auto;
  background-color: inherit;
  min-width: ${ props => props.$isActive ? 'var(--active-width)' : 'calc(var(--active-width) * var(--shrink-ratio))' };
  height: ${ props => props.$isActive ? 'var(--active-height)' : 'calc(var(--active-height) * var(--shrink-ratio))' };
  overflow-y: hidden;
  transition: min-width 300ms, height 300ms;

  .contents-wrapper {
    height: 100%;
    display: grid;
    grid-template:
      "heading    heading"  auto
      "color       detail"   1fr
      "info        detail"   2fr
      "category  category"  auto
    /       1fr       1fr;
    gap: 1.2rem;
    header {
      grid-area: heading;
      background: #eee;
    }
    .color-container {
      margin: 10%;
      grid-area: color;
      background: #eee;
    }
    .info-container {
      grid-area: info;
      background: #eee;
    }
    .detail-container {
      > * {
        transform: ${props => props.$isActive ? 'scale(1)' : 'scale(.5)'};
        transform-origin: top left;
        transition: transform 300ms;
      }
      grid-area: detail;
      background: #eee;
    }
    .category-container {
      grid-area: category;
      background: #eee;
    }
  }
`;
// ========================================================= STYLE === //