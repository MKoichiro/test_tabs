/*
# Slidable Components

### <Slidabele/>
  - render as: div > div
  - description: スライド可能なコンテナを提供するコンポーネント。
### <SlidableMain/>
  - render as: div
  - description: 通常時に表示させたいコンテナの子要素。
### <SlidableHidden/>
  - render as: div
  - description: スライドで横から表示させたいコンテナの子要素。
  
### USAGE:
```
<StyledLi key={  }>

    <Slidable slidableParams={slidableParams}>
    
        <SlidableMain className='slidable-main-contents' >
          <div>
            something you want to show.
          </div>
        </SlidableMain>

        <SlidableHidden className='btns-container' slidableLength={slidableParams.SLIDABLE_LENGTH}>
          <button>
            some btns you want to show when slided.
          </button>
        </SlidableHidden>

    </Slidable>

</StyledLi>
```
*/


/* --- react/styled-components --- */
import React, { FC } from 'react';
import styled from 'styled-components';
/* --- hooks --------------------- */
import { useSlidable } from './Hooks';
/* --- types --------------------- */
import { SlidableType, SlidableMainType, SlidableHiddenType } from './Types';



// === COMPONENT ====================================================== //
// 1. Slidable
export const Slidable: FC<SlidableType> = (props) => {

  const { children, className, slidableParams } = props;

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    containerRef,
    translateX
  } = useSlidable(slidableParams);

  return (
    <StyledSlidable
      className='slidable-master'
      onTouchStart  = {  handleTouchStart }
      onTouchMove   = {   handleTouchMove }
      onTouchEnd    = {    handleTouchEnd }
    >

        <StyledSlidableContainer
          className   = {     className }
          ref         = {  containerRef }
          $translateX = {    translateX }
          children    = {      children } />

    </StyledSlidable>
  );
};

// 2. SlidableMain
export const SlidableMain: FC<SlidableMainType> = (props) => {

  const { children, className } = props;

  return (
    <StyledSlidableMain
      className = { className }
      children  = { children  } />
  );
};

// 3. SlidableHidden
export const SlidableHidden: FC<SlidableHiddenType> = (props) => {
  const { children, className, slidableLength } = props;

  return (
    <StyledSlidableHidden
      className       = {       className }
      $slidableLength = {  slidableLength }
      children        = {        children } />
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
// for "Slidable"
const StyledSlidable = styled.div`
  overflow-x: hidden;
`;
const StyledSlidableContainer = styled.div<{ $translateX: number }>`
  display: flex;
  transform: translateX(${ props => props.$translateX }px);
`;

// for "SlidableMain"
const StyledSlidableMain = styled.div`
  min-width: 100%;
`;

// for "SlidableHidden"
const StyledSlidableHidden = styled.div<{ $slidableLength: number }>`
  min-width: ${props => props.$slidableLength}px;
`;
// ========================================================= STYLE === //