import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { CardsCarousel } from './CardsCarousel';
import { CategoryType } from '../../../../../types/Categories';

interface PropsType {
  category: CategoryType;
  index: number;
}
export const CardsContainer: FC<PropsType> = (props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!dialogRef.current) { return }
    dialogRef.current.showModal();
    setIsOpen(true);
  };

  return (
    <>
      <StyledDialog ref={dialogRef}>
        <CardsCarousel {...props} isOpen={isOpen}/>
      </StyledDialog>
      <button onClick={handleClick}>open</button>
    </>
  );
};

const StyledDialog = styled.dialog`
  background: transparent;
  max-width: none; // reset
  width: 100vw;
  height: 90vh;
  padding: 0;
`;