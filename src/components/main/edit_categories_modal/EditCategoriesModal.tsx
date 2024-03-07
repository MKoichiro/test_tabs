/*
  [EditCategoriesModal]
    element: div
    description:
      （未定）ボタンクリックで開く categories 編集用モーダルを提供している
      category の削除、追加、表示順変更の機能を実装
*/


/* common: essential */
import React, { useState } from 'react';
import styled from 'styled-components';
/* font awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
/* children components */
import { CreateNewCategory } from './CreateNewCategory';
import { Categories } from './Categories';


// === component 定義部分 ============================================= //
export const EditCategories = () => {

  const [isOpen, setIsOpen] = useState(true);
 
  const handleCloseBtnClick = () => {
    setIsOpen(false);
  };

  return (
    <StyledDiv $isOpen={ isOpen }>
      <h2>Edit Categories</h2>
      <button className='btn-modal-close' onClick={ handleCloseBtnClick }>
        <FontAwesomeIcon icon={ faRectangleXmark } />
      </button>
      <section className='categories-display-container'>
        <Categories />
      </section>
      <section className='form-create-new-categories-container'>
        <CreateNewCategory />
      </section>
    </StyledDiv>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div<{ $isOpen: boolean }>`
  position: relative;

  .btn-modal-close {
    position: absolute;
    top: 1rem; right: 1rem;
  }
`;
// ================================================= style 定義部分 === //