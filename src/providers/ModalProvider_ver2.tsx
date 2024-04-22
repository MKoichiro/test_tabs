import React, { useContext, useEffect } from "react";
import { FC, MutableRefObject, ReactNode, createContext, useRef } from "react";
import { ModalName } from "./ModalProvider";
import styled from "styled-components";
import { useDispatch } from "./store";
import { close, open } from "./slices/modalSlice";

type DialogElm = HTMLDialogElement | null;
type MaskElm = HTMLDivElement | null;
export type ScrollableElm = HTMLDivElement | null;
interface ModalElms {
  basics: {
    dialog: DialogElm;
    mask: MaskElm;
  };
  scrollables: ScrollableElm[];
}
interface ModalsElms {
  [name: ModalName]: ModalElms;
}
type ModalElmsRef = MutableRefObject<ModalsElms>;


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
  const modalElmsRef = useRef<ModalsElms>({});

  const value = { modalElmsRef };

  return (
    <ModalElmsRefContext.Provider value={value}>
      {children}
    </ModalElmsRefContext.Provider>
  );
};

// name毎に参照を変えて初期化する必要があるため、関数で用意
const initialModalElms = (): ModalElms => ({
  basics: {
    dialog: null,
    mask: null
  },
  scrollables: []
});

export const useModalRegistrant = (name: ModalName) => {
  const { modalElmsRef } = useContext(ModalElmsRefContext);

  const setDialogRef = (dialog: DialogElm) => {
    // StrictMode によるアンマウントシミュレーションではスキップ
    if (dialog === null) { return }
    // 未登録なら初期化して登録
    if (!modalElmsRef.current[name]) { modalElmsRef.current[name] = initialModalElms() }
    modalElmsRef.current[name].basics.dialog = dialog;
  };
  
  const setMaskRef = (mask: MaskElm) => {
    // StrictMode によるアンマウントシミュレーションではスキップ
    if (mask === null) { return }
    // 未登録なら初期化して登録
    if (!modalElmsRef.current[name]) { modalElmsRef.current[name] = initialModalElms() }
    modalElmsRef.current[name].basics.mask = mask;
  };
  
  const addScrollableRef = (scrollable: ScrollableElm) => {
    // 未登録なら初期化して登録
    if (!modalElmsRef.current[name]) { modalElmsRef.current[name] = initialModalElms() }

    // ref callback は再レンダリングの度に実行される。よって、同じ入力に対して同じ出力を返すように、早期returnする。
    // 1. 既に登録されている場合
    if (modalElmsRef.current[name].scrollables.includes(scrollable)) { return }
    // 2. StrictMode によるアンマウントのシミュレーションを回避する場合: nullが渡される
    // ※ setDialogRef, setMaskRef は StrictMode による復元が効くため問題ない。
    // 両者の違いは同じ入力に対して異なる出力を返すかどうか。
    if (scrollable === null) { return }

    modalElmsRef.current[name].scrollables.push(scrollable);
  };

  return { setBasicsRef: { setDialogRef, setMaskRef }, addScrollableRef };
};


export const useModalOpener = (name: ModalName) => {
  const { modalElmsRef } = useContext(ModalElmsRefContext);
  const dispatch = useDispatch();

  const openModal = () => {
    modalElmsRef.current[name].basics.dialog?.showModal();
    dispatch(open(name));
  };

  return { openModal };
};

export const useModalCloser = (name: ModalName) => {
  const { modalElmsRef } = useContext(ModalElmsRefContext);
  const dispatch = useDispatch();
  
  return () => {
    modalElmsRef.current[name].basics.dialog?.close();
    dispatch(close(name));
  };
};

interface ModalType {
  name: ModalName;
  isOpen: boolean;
  zIndex?: number;
  setBasicsRef: {
    setDialogRef: (dialog: DialogElm) => void;
    setMaskRef: (mask: MaskElm) => void;
  };
  children: ReactNode;
  className?: string;
  classNameMask?: string;
}

export const Modal: FC<ModalType> = (props) => {
  const { name, isOpen, zIndex, setBasicsRef, children, className, classNameMask } = props;
  const { setDialogRef, setMaskRef } = setBasicsRef;
  const closeModal = useModalCloser(name);
  const classNameMaskDefault = `${ name }-modal-mask`;


  return (
    <StyledDialog
      className={className}
      ref={setDialogRef}
      $zIndex={zIndex || 10}
    >
      <StyledMask
        className = { classNameMask || classNameMaskDefault }
        ref={setMaskRef}
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


// StrictModeの挙動
// アンマウントのシミュレーションが行われる
// そのため、refcallbackには
// 1. 通常のDOM要素
// 2. null
// が渡される。
// あくまでもシミュレーションであり、通常、strictmodeは1の値を復元する。
// よって、通常問題無いが、refcallbackで配列へのpushなどを含む、同じ入力に対して、異なる出力を返す処理を行う場合、
// nullは配列に格納されてしまう。