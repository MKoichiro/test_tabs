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
import React, { FC, useContext } from 'react';
import styled from 'styled-components';
/* --- providers/contexts -------- */
import { CategoriesContext } from '../../../providers/CategoriesProvider';
import { MdeContext } from '../../../providers/MdeProvider';
/* --- easymde ------------------- */
import SimpleMdeReact from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";


// === TYPE =========================================================== //
// - PROPS
interface MdeModalType {}
// - STAYLE
interface StyleType {
  $activeIndex: number;
  $inEditing: boolean;
  $viewportHeight: number | undefined;
  $hasEditorOverflow: boolean;
}
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const MdeModal: FC<MdeModalType> = (props) => {
  const {} = props;

  const {
    activeIdx,
    categories,
  } = useContext(CategoriesContext)

  const {
    refs,
    inEditing,
    getEditorValue,
    handleChange,
    options,
    viewportHeight,
    hasEditorOverflow,
    ...rest
  } = useContext(MdeContext);

  return (
    <>
      <StyledDiv
        $activeIndex={ activeIdx }
        $inEditing={ inEditing }
        $viewportHeight={viewportHeight}
        $hasEditorOverflow={hasEditorOverflow}
        ref={refs.modal}
      >
        <form
          className="mde-modal-contents"
          onSubmit={e => e.preventDefault()}
        >
          <SimpleMdeReact
            getMdeInstance={(instance: any) => { refs.mde && (refs.mde.current = instance) }}
            options={options}
            value={getEditorValue()}
            onChange={handleChange} />
        </form>
      </StyledDiv>


      {inEditing && (
        <StyledMask className='mask' ref={refs.mask} />
      )}
    </>
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledDiv = styled.div<StyleType>`
  position: fixed;
  z-index: 10;
  opacity: ${ props => props.$inEditing ? '1' : '0' };
  top: ${ props => props.$inEditing ? '50vh' : '100vh' };
  bottom: ${ props => props.$inEditing ? '-50vh' :'0' };
  transition: top 750ms, bottom 750ms, opacity 750ms;
  background: lightgrey;
  width: var(--contents-width);
  height: 50vh;
  @media (width < 600px) {
    top: ${ props => props.$inEditing ? '0' : '100vh' };
    bottom: auto;
    right: 0;
    left: 0;
    height: ${ props => props.$inEditing ? `${props.$viewportHeight}px` :'' };
    width: auto;
    transition: opacity 750ms;
  }

  .EasyMDEContainer {
    display: flex;
    flex-direction: column-reverse;
    .editor-toolbar {
      padding: 0 .8rem;
      min-height: 3.0rem;

      display: flex;
      align-items: center;
      overflow-x: auto;

      scrollbar-width: none;
      -ms-scrollbar: none;
      ::-webkit-scrollbar {
        display: none;
      }
      button {
        border-radius: 0;
        border: none;
        min-width: 2.6rem;
        height: 2.6rem;
        padding: 0;
        i {
          font-size: 1.4rem;
        }
        &.heading-2 {
          i { scale: .85 }
        }
        &.heading-3 {
          i { scale: .7 }
        }
        &.submit {
          margin-left: auto;
        }
      }
    }
    .CodeMirror {
      padding: 0;
      font-size: 16px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      .CodeMirror-scroll {
        overscroll-behavior: none; // スクロールチェーンを回避
        touch-action: ${ props => props.$hasEditorOverflow ? '': 'none' };
      }
    }
    .editor-statusbar {
      padding: 0 .8rem;
      font-size: 1.4rem;
      min-height: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }


`;

const StyledMask = styled.div`
  /* .mask { */
    position: fixed;
    inset: 0;
    z-index: 5;
    touch-action: none;
  /* } */
`;
// ========================================================= STYLE === //