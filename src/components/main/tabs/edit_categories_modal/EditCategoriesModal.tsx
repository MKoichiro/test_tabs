/*
  [EditCategoriesModal]
    element: div
    description:
      （未定）ボタンクリックで開く categories 編集用モーダルを提供している
      category の削除、追加、表示順変更の機能を実装
*/


/* common: essential */
import React, { FC, useContext } from 'react';
import styled from 'styled-components';
/* font awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
/* children components */
import { CreateNewCategory } from './CreateNewCategory';
import { Categories } from './Categories';
import { ModalContext, Modal } from '../../../../providers/ModalProvider';

// === component 定義部分 ============================================= //
interface EditCategoriesModalProps {
  className?: string;
}

export const EditCategoriesModal: FC<EditCategoriesModalProps> = (props) => {
  const { className } = props;

  const { isOpen, dispatchClose, scrollableRef } = useContext(ModalContext);

  const handleCloseBtnClick = () => {
    dispatchClose();
  };


  return (
    <StyledModal isOpen={isOpen} className={className}>
      <div className='modal-contents-container'>

        <h2
          className='modal-heading'
          children={'Edit Categories'}
        />

        <button
          className='btn-modal-close'
          onClick={handleCloseBtnClick} >
          <FontAwesomeIcon icon={ faXmark } />
        </button>

        <section
          className='categories-display-container'
          ref={scrollableRef} >
          <Categories />
        </section>

        <section className='form-create-new-categories-container'>
          <CreateNewCategory />
        </section>

      </div>
    </StyledModal>

  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
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
// ================================================= style 定義部分 === //