import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { useModalCloser } from '../../../providers/context_api/ModalElmsRef';
import { ModalName, DialogElm, MaskElm } from '../../../providers/types/modal';


// === TYPE =========================================================== //
// - COMPONENT
interface ModalType {
  className?:          string;
  classNameMask?:      string;
  name:             ModalName;
  isOpen:             boolean;
  zIndex?:             number;
  children:         ReactNode;
  setBasicsRef: {
    setDialogRef:   (dialog: DialogElm)   =>   void;
    setMaskRef:     (mask: MaskElm)       =>   void;
  };
}
// - STYLE
interface StyledDialogType {
  $zIndex: number;
}
interface StyledMaskType {
  $isOpen: boolean;
}
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const Modal: FC<ModalType> = (props) => {
  const { className, classNameMask, name, isOpen, zIndex, children, setBasicsRef } = props;
  const { setDialogRef, setMaskRef } = setBasicsRef;
  const closeModal = useModalCloser(name);
  const classNameDefault     = `${ name }-modal`;
  const classNameMaskDefault = `${ name }-modal-mask`;


  return (
    <StyledDialog
      className = { className || classNameDefault }
      ref       = {                  setDialogRef }
      $zIndex   = {                  zIndex || 10 }
    >
        <StyledMask
          className = { classNameMask || classNameMaskDefault }
          ref       = {                            setMaskRef }
          $isOpen   = {                                isOpen }
          onClick   = {                            closeModal } />

        {children}

    </StyledDialog>
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================== //
const StyledDialog = styled.dialog<StyledDialogType>`
  // reset & minimum styles

  /* position: cover overall */
  position: fixed;
    top: 0; left: 0; right: 0;
    height: 100lvh;
    z-index: ${({$zIndex}) => $zIndex};

  /* reset */
  padding: 0;
  margin: auto;
  max-width: none;
  max-height: none;
  border: none;
  &::backdrop { display: none } // 疑似要素はjsから操作できないためdefaultで表示されるが使わない。resetしておく。

  /* functions as modal */
  touch-action: none; // スクロールをブロックするために指定
  background-color: transparent; // 背景を透過するために指定
`;

const StyledMask = styled.div<StyledMaskType>`
  pointer-events: ${({$isOpen}) => $isOpen ? 'auto' : 'none'};
  position: fixed;
    top: 0; left: 0; right: 0;
    height: 100lvh;
    z-index: -1;

  background-color: transparent;
`;
// ========================================================== STYLE === //
