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
/* --- child components ---------- */
import { CreateNewCategory } from './CreateNewCategory';
import { Categories } from './Categories';
/* --- providers/contexts -------- */
// import { ModalContext, Modal } from '../../../../providers/ModalProvider';
import { ModalName, Modal, useModalCloser, useInnerScrollable, useModalState } from '../../../../providers/ModalProvider_ver2';
/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface EditCategoriesModalProps {
  className?: string;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const EditCategoriesModal: FC<EditCategoriesModalProps> = (props) => {
  const { className } = props;

  // const { isOpen, dispatchClose, scrollableRef } = useContext(ModalContext);

  const modalName = 'testModal' as ModalName;
  const { isOpen } = useModalState(modalName);
  const { closeModal } = useModalCloser(modalName);
  const { addScrollableElm } = useInnerScrollable(modalName);


  const handleCloseBtnClick = () => {
    // dispatchClose();
    closeModal();
  };


  return (
    <StyledModal name={modalName} isOpen={isOpen} className={className}>
      <div className='modal-contents-container'>

        <h2
          className='modal-heading'
          children={'Edit Categories'}
        />

        <button
          className='btn-modal-close'
          onClick={ handleCloseBtnClick } >
          <FontAwesomeIcon icon={ faXmark } />
        </button>

        <section
          className='categories-display-container'
          ref={ addScrollableElm } >
          <Categories />
        </section>

        <section className='form-create-new-categories-container'>
          <CreateNewCategory />
        </section>

      </div>
    </StyledModal>

  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledModal = styled(Modal)<{isOpen: boolean;}>`
  background: transparent;
  height: 100lvh;
  &[open] { display: flex }
  align-items: center;

  .modal-mask {
    z-index: 4;
    --bgc: ${ props => props.isOpen ? 'rgba(255 0 255 / .3)' : 'none' };
    --bdf: ${ props => props.isOpen ? 'blur(4px)' : 'blur(0px)' };

    backdrop-filter: var(--bdf);
    -webkit-backdrop-filter: var(--bdf);
    background-color: var(--bgc);

    transition:
      background-color 750ms,
      -webkit-backdrop-filter 750ms,
      backdrop-filter 750ms;
  }



  .modal-contents-container {
    z-index: 5;

    width: var(--contents-width);
    margin: auto 0;
    display: grid;
    gap: 1.6rem;
    grid-template:
    "heading   btn"   auto
    "list     list"   50vh
    "form     form"   auto
    / 1fr     3rem;

    > * {
      background: rgba(255 255 255 / .85);
      padding: .8rem;
      border-radius: .4rem;
    }
    .modal-heading {
      grid-area: heading;
    }
    .btn-modal-close {
      grid-area: btn;
      display: block;
      outline: none;
    }
    .categories-display-container {
      grid-area: list;
      overflow-y: auto;
      overscroll-behavior: none;
      -ms-scrollbar: none;
      scrollbar-width: none;
      ::-webkit-scrollbar { display: none }
    }
    .form-create-new-categories-container {
      grid-area: form;
    }
  }
`;
// ========================================================= STYLE === //