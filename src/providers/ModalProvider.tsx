import React from 'react';
import { createContext, useContext, useRef, useReducer } from 'react';
import { FC, MutableRefObject, ReactNode } from 'react';
import styled from 'styled-components';

interface Refs {
  modalRef: MutableRefObject<HTMLDialogElement | null> | null;
  scrollableRef: MutableRefObject<HTMLElement | null> | null;
  maskRef: MutableRefObject<HTMLDivElement | null> | null;
}
interface ActionType {
  type: 'open' | 'close';
  refs: Refs;
}

interface ContextType {
  isOpen: boolean;
  modalRef: MutableRefObject<HTMLDialogElement | null> | null;
  maskRef: MutableRefObject<HTMLDivElement | null> | null;
  scrollableRef: MutableRefObject<HTMLElement | null> | null;
  dispatchOpen: () => void;
  dispatchClose: () => void;
}
const initialRef: ContextType = {
  isOpen: false,
  modalRef: null,
  maskRef: null,
  scrollableRef: null,
  dispatchOpen: () => {},
  dispatchClose: () => {},
}
export const ModalContext = createContext<ContextType>(initialRef);



const preventScroll = (e: WheelEvent) => { e.preventDefault()  };
const reviveScroll  = (e: WheelEvent) => { e.stopPropagation() };
const handleModalClose = (modal: HTMLDialogElement, mask: HTMLDivElement, scrollable: HTMLElement) => {
  modal.removeEventListener('wheel', preventScroll);
  mask.removeEventListener('wheel', preventScroll);
  scrollable.removeEventListener('wheel', reviveScroll);
  modal.close();
};
const handleModalOpen = (modal: HTMLDialogElement, mask: HTMLDivElement, scrollable: HTMLElement) => {
  modal.showModal();
  modal.addEventListener('wheel', preventScroll, {passive: false});
  mask.addEventListener('wheel', preventScroll, {passive: false});
  scrollable.addEventListener('wheel', reviveScroll, {passive: false});
};

const modalReducer = (isOpen: boolean, action: ActionType) => {
  if (!action.refs.modalRef || !action.refs.maskRef || !action.refs.scrollableRef) { return false }

  const modal      = action.refs.modalRef.current;
  const scrollable = action.refs.scrollableRef.current;
  const mask       = action.refs.maskRef.current;
  if (!modal || !scrollable || !mask) { return false }

  switch (action.type) {
    case 'open': {
      handleModalOpen(modal, mask, scrollable);
      return true;
    };
    case 'close': {
      handleModalClose(modal, mask, scrollable);
      return false;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}



interface ModalProviderProps {
  children: ReactNode;
}
export const ModalProvider: FC<ModalProviderProps> = (props) => {
  const { children } = props;

  const initialState = false;
  const [isOpen, dispatch] = useReducer(modalReducer, initialState);

  const modalRef      = useRef<HTMLDialogElement | null>(null);
  const scrollableRef = useRef<HTMLElement       | null>(null);
  const maskRef       = useRef<HTMLDivElement    | null>(null);
  const refs: Refs    = { modalRef, scrollableRef, maskRef };

  const dispatchOpen = () => {
    const action: ActionType = { type: 'open', refs };
    dispatch(action);
  };
  const dispatchClose = () => {
    const action: ActionType = { type: 'close', refs };
    dispatch(action);
  };

  const value = {
    isOpen,
    dispatchOpen,
    dispatchClose,
    ...refs,
  };

  return <ModalContext.Provider value={value} children={ children } />;
};



interface ModalProps {
  isOpen: boolean;
  className?: string;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = (props) => {
  const { modalRef, maskRef, dispatchClose } = useContext(ModalContext);
  const { isOpen, children, className } = props;
  const handleMaskClick = () => {
    dispatchClose();
  };
  return (
    <StyledDialog
      ref={modalRef}
      className={className}
      $isOpen={isOpen}
    >
      {children}
      <div className='modal-mask' ref={ maskRef } onClick={handleMaskClick}/>
    </StyledDialog>
  );
};


const StyledDialog = styled.dialog<{$isOpen: boolean;}>`
  // resetと最低限modalたらしめるstyle
  touch-action: none;
  color: inherit;
  padding: 0;
  border: none;
  &::backdrop { display: none }

  .modal-mask {
    position: fixed;
    top: 0; left: 0; right: 0; height: 100lvh;
    pointer-events: ${ props => props.$isOpen ? 'auto' : 'none' };
  }
`;