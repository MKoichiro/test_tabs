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
import React, { useContext, useLayoutEffect, useRef, useState, forwardRef } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { InfoTable } from './InfoTable';
/* --- providers/contexts -------- */
import { MdeContext } from '../../../../../providers/MdeProvider';
import { CategoriesContext } from '../../../../../providers/CategoriesProvider';
/* --- types --------------------- */
import { TodoType } from '../../../../../types/Categories';
/* --- utils --------------------- */
import { scrollToRef } from '../../../../../utils/smoothScrollToRef';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';
import { getSanitizedDetail } from '../../../../../utils/todoPropsHandler';


// useUnsettledHeightAcc: 内容物の高さが可変のアコーディオンを実装するためのカスタムフック
//                        open/close 状態を保持する isOpen state は保守性のため(今後、外部でも使用することも考えられるため)、外部で定義して渡す。
//                        また、内容物の文字列が変更された時にも高さを再取得する必要があるため、
//                        state 管理されたテキストコンテンツを changeableTxtContentsState を引数で渡す必要がある。
const useUnsettledHeightAcc = (isOpen: boolean, changeableTxtContentsState: string) => {
  const [height, setHeight] = useState<number | null>(null);

  const heightGetterRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (heightGetterRef.current) {
      const newHeight = heightGetterRef.current.getBoundingClientRect().height;
      setHeight(newHeight);
    }
  }, [isOpen, changeableTxtContentsState]);
  return { height, heightGetterRef };
};


// === TYPE =========================================================== //
// - PROPS
interface TodoDetailType {
  liIdx?: number;
  todo: TodoType;
}
// - STYLE
interface StyledSectionType {
  $isOpen: boolean;
  $height: number | null;
  $inEditing: boolean;
}
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const TodoDetail = forwardRef<HTMLElement, TodoDetailType>((props, ref) => {
  const { liIdx, todo } = props;
  const todoId = todo.id;

  // const { getSanitizedDetail         } = useContext(CategoriesContext);
  
  const { inEditing, handleModalOpen } = useContext(MdeContext);

  const { detail, isOpen } = todo;
  const { height, heightGetterRef } = useUnsettledHeightAcc(isOpen, detail);


  const executeModalOpen = () => {
    handleModalOpen(todoId);

    if (innerWidth > 600) {
      scrollToRef(ref);
    }
  };


  return (
    <StyledSection
      $isOpen={ isOpen }
      $height={ height }
      $inEditing={ inEditing }
    >
      <div
        className="children-height-getter"
        ref={ heightGetterRef }
      >
          <section
            className="detail-container"
            onDoubleClick={ executeModalOpen }
          >
              <div
                dangerouslySetInnerHTML={{
                  __html: getSanitizedDetail(todo) }} />
          </section>

          <InfoTable todo={ todo } />
      </div>

    </StyledSection>
  )
});
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledSection = styled.section<StyledSectionType>`

  height: ${ props => props.$isOpen ? `${ props.$height }px` : '0' };
  transition: height 500ms;
  contain: paint;

  .detail-container {
    h1 {
      font-size: 2.2rem;
      @media (width < 600px) { font-size: 18px }
    }
    h2 {
      font-size: 2.0rem;
      @media (width < 600px) { font-size: 16px }
    }
    h3 {
      font-size: 1.8rem;
      @media (width < 600px) { font-size: 14px }
    }
    h4 {
      font-size: 1.6rem;
      @media (width < 600px) { font-size: 12px }
    }
    h5 {
      font-size: 1.4rem;
      @media (width < 600px) { font-size: 10px }
    }
    h6 {
      font-size: 1.2rem;
      @media (width < 600px) { font-size: 8px }
    }

    ol {
        list-style-type: decimal;
        padding-left: 16px;
        margin-left: 16px;
    }
    ul {
        list-style-type: circle;
        padding-left: 16px;
        margin-left: 16px;
    }
    li {

    }

  }


  .children-height-getter {
    /* ! do not change vertical margin */
    margin-top: 0; margin-bottom: 0;

    .detail-container {
      
      padding: .8rem 1.6rem;
      > div {
        padding-left: 1.6rem;
        border-left: .15rem solid #777;
      }
    }

  }
`;
// ========================================================= STYLE === //