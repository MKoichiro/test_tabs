import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { CreateNewCategories } from './CreateNewCategories';
import { Categories } from './Categories';


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
        <CreateNewCategories />
      </section>
    </StyledDiv>
  );
};

const StyledDiv = styled.div<{ $isOpen: boolean }>`
  position: relative;

  .btn-modal-close {
    position: absolute;
    top: 1rem; right: 1rem;
  }
`;