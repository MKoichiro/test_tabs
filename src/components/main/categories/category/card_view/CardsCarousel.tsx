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
import { CardTodo } from './CardTodo';
/* --- providers/contexts -------- */
import { useCardCarouselRegister } from '../../../../../providers/CardViewProvider';
/* --- types --------------------- */
import { CategoryType } from '../../../../../types/Categories';
/* --- utils --------------------- */
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';

import { getCardCarouselStyles } from '../../../../../providers/CardViewProvider';


// === TYPE =========================================================== //
// - PROPS
interface CardsCarouselType {
  category: CategoryType;
  index:          number;
}
// - STYLE
interface StyledUlType {
  $padding: string;
  $gap:     number;
}
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const CardsCarousel: FC<CardsCarouselType> = (props) => {
  const { category } = props;
  
  // contexts
  const { registerContainer } = useCardCarouselRegister();
  
  // register carousel container
  const { adjustedPadding_vw, carouselContainerRef } = registerContainer();

  // styles
  const { gap_vw } = getCardCarouselStyles();
  
  // format todos
  const todosFormatted = category.todos; // archiveしたものを削除または最後尾にした配列を渡すべき

  return (
    <StyledUl
      ref={carouselContainerRef}
      $padding={adjustedPadding_vw}
      $gap={gap_vw}
    >
      { todosFormatted.map((todo, i) => (
          <CardTodo
            key={ todo.id }
            todo={todo}
            idx={ i } />
       )
      ) }
    </StyledUl>
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledUl = styled.ul<StyledUlType>`
  background: transparent;
  padding: ${ props => props.$padding };
  gap: ${ props => `${props.$gap}vw` };
  display: flex;
  align-items: center;
  overflow-x: auto;
  height: 100%;
`;
// ========================================================= STYLE === //