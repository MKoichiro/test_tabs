import React, { useContext } from "react";
import { FC, MutableRefObject, ReactNode, createContext, useRef } from "react";
import { ModalName } from "./ModalProvider";
import styled from "styled-components";

type DialogElm = HTMLDialogElement | null;
type MaskElm = HTMLDivElement | null;
type ScrollableElm = HTMLDivElement | null;
interface ModalElms {
  [name: ModalName]: {
    basics: {
      dialog: DialogElm;
      mask: MaskElm;
    }
    scrollables: ScrollableElm[];
  }
}
type ModalElmsRef = MutableRefObject<ModalElms>;


interface ModalElmsRefContextType {
  modalElmsRef: ModalElmsRef;
}
const ModalElmsRefContext = createContext<ModalElmsRefContextType>({
  modalElmsRef: { current: {} }
});


interface ModalElmsRefProviderType {
  children: ReactNode;
}
export const ModalElmsRefProvider: FC<ModalElmsRefProviderType> = (props) => {

  const { children } = props;
  const modalElmsRef = useRef<ModalElms>({});

  const value = { modalElmsRef };

  return (
    <ModalElmsRefContext.Provider value={value}>
      {children}
    </ModalElmsRefContext.Provider>
  );
};

const useModalRegistrant = (name: ModalName) => {
  const { modalElmsRef } = useContext(ModalElmsRefContext);

  const setDialogElm = (dialog: DialogElm) => {
    modalElmsRef.current[name].basics.dialog = dialog;
  };

  const setMaskElm = (mask: MaskElm) => {
    modalElmsRef.current[name].basics.mask = mask;
  };

  const addScrollableElm = (scrollable: ScrollableElm) => {
    modalElmsRef.current[name].scrollables.push(scrollable);
  };

  return { setDialogElm, setMaskElm, addScrollableElm };
};

const useModalHandler = (name: ModalName) => {
  const { modalElmsRef } = useContext(ModalElmsRefContext);

  const openModal = () => {
    modalElmsRef.current[name].basics.dialog?.showModal();
  };

  const closeModal = () => {
    modalElmsRef.current[name].basics.dialog?.close();
  };

  return { openModal, closeModal };
};

interface ModalType {
  name: ModalName;
  isOpen: boolean;
  zIndex?: number;
  children: ReactNode;
}

const Modal: FC<ModalType> = (props) => {
  const { name, isOpen, zIndex, children } = props;
  const { setDialogElm, setMaskElm } = useModalRegistrant(name);
  const { closeModal } = useModalHandler(name);

  return (
    <StyledDialog
      ref={setDialogElm}
      // isOpen={false}
      $zIndex={zIndex || 10}
    >
      <StyledMask
        ref={setMaskElm}
        $isOpen={isOpen}
        onClick={ closeModal }/>
      {children}
    </StyledDialog>
  );
};


interface StyledDialogType {
  $zIndex: number;
}
const StyledDialog = styled.dialog<StyledDialogType>`
  // reset & minimum styles

  /* position: cover overall */
  position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100lvh;
    z-index: ${props => props.$zIndex};

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

interface StyledMaskType {
  $isOpen: boolean;
}
const StyledMask = styled.div<StyledMaskType>`
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100lvh;
    z-index: -1;

  background-color: transparent;
`;