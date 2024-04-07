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
import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { CardTodo } from './CardTodo';
/* --- types --------------------- */
import { CategoryType } from '../../../../../types/Categories';
/* --- utils --------------------- */
import { convertVwToPx } from '../../../../../utils/converters';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';

const carouselGap_vw = 5;
const carouselPadding_vw = carouselGap_vw * 2;
const activeWidth_vw = 80;
const inactiveWidth_vw = activeWidth_vw / 2;

// === TYPE =========================================================== //
// - PROPS
interface PropsType {
  category: CategoryType;
  index: number;
  isOpen: boolean;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const CardsCarousel: FC<PropsType> = (props) => {
  const { category, isOpen } = props;
  const [cardActiveIdx, setCardActiveIdx] = useState(0);
  const ulRef = useRef<HTMLUListElement | null>(null)
  const updateCardActiveIdx = (newIdx: number) => {
    setCardActiveIdx(newIdx);
    handleScroll(newIdx);
  };
  const todosFormatted = category.todos; // archiveしたものを削除または最後尾にした配列を渡すべき


  const gap           = convertVwToPx(carouselGap_vw);
  const padding       = convertVwToPx(carouselPadding_vw);
  const inactiveWidth = convertVwToPx(inactiveWidth_vw);

  const handleScroll = (n: number) => {
    if (!ulRef.current) { return }

    let Xn: number;
    switch (n) {
      case 0:   Xn = 0;                                                                 break;
      default:  Xn = padding + (inactiveWidth + gap)*(n - 1) + (inactiveWidth - gap);   break;
    }

    ulRef.current.scrollTo({ left: Xn, behavior: 'smooth' });
  };


  return (
    <StyledUl
      $cardActiveIdx={ cardActiveIdx }
      ref={ulRef}
    >
      { todosFormatted.map((todo, i) => (
          <CardTodo
            key={ todo.id }
            todo={todo}
            index={ i }
            cardActiveIdx={ cardActiveIdx }
            updateCardActiveIdx={updateCardActiveIdx} />
       )
      ) }
    </StyledUl>
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledUl = styled.ul<{$cardActiveIdx: number}>`
  --gap: ${`${carouselGap_vw}vw`};
  background: transparent;
  padding: 0 calc(var(--gap) * 2);
  gap: var(--gap);
  display: flex;
  align-items: center;
  overflow-x: auto;
  height: 100%;
`;
// ========================================================= STYLE === //
