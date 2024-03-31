import React, { FC } from 'react';
import styled from 'styled-components';
import { useSlidable } from './Hooks';
import { SlidableType, SlidableMainType, SlidableHiddenType } from './Types';


// === component 定義部分 ============================================= //
export const Slidable: FC<SlidableType> = (props) => {
  const {
    children,
    className,
    slidableParams
  } = props;

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

export const SlidableMain: FC<SlidableMainType> = (props) => {
  const {
    children,
    className
  } = props;

  return (
    <StyledSlidableMain
      className ={ className }
      children  ={ children } />
  );
};

export const SlidableHidden: FC<SlidableHiddenType> = (props) => {
  const {
    children,
    className,
    slidableLength
  } = props;

  return (
    <StyledSlidableHidden
    className       = {       className }
    $slidableLength = {  slidableLength }
    children        = {        children } />
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
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
// ================================================= style 定義部分 === //