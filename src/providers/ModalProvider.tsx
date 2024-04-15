import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { createContext, useContext, useRef, useReducer } from 'react';
import { FC, MutableRefObject, ReactNode } from 'react';
import { UUID, generateUUID } from '../utils/generateUUID'; // uuid を生成する関数
import { preventScroll, reviveScroll } from '../utils/scrollBlock'; // スクロールをブロックする関数

// type UUID = string & { _uuidBrand: never }; // を import している。
export type ModalName = string & { _nameBrand: never };

type ModalElm = HTMLDialogElement | null;
type MaskElm  = HTMLDivElement    | null;
interface BasicRefs {
  modalRef:  MutableRefObject<ModalElm> | null;
  maskRef:   MutableRefObject<MaskElm>  | null;
}

type ScrollableElms = (HTMLElement | null)[];
type ScrollablesRef = MutableRefObject<ScrollableElms> | null;

interface Refs {
  basicRefs:              BasicRefs;
  scrollablesRef:    ScrollablesRef;
}
interface Modal {
  isOpen:   boolean;
  refs:        Refs;
}
interface Modals {
  [id: UUID]: Modal;
}


interface ModalNamedIds {
  [name: ModalName]: UUID;
}


type ActionType =
  | { type: 'register',  id: UUID,   initialModal: Modal }
  | { type: 'open',      id: UUID                        }
  | { type: 'close',     id: UUID                        };


interface ContextType {
  modals:                Modals;
  currentModalId:   UUID | null;
  register:       (name: ModalName, basicRefs: BasicRefs, scrollablesRef: ScrollablesRef) =>      void;
  dispatchOpen:   (name: ModalName)                                                       =>      void;
  dispatchClose:  (name: ModalName)                                                       =>      void;
  getModalState:  (name: ModalName)                                                       =>   boolean;
  getIdByName:    (name: ModalName)                                                       =>      UUID;
}


const initialContext: ContextType = {
  modals:            {},
  currentModalId:  null,
  register:       () =>         {},
  dispatchOpen:   () =>         {},
  dispatchClose:  () =>         {},
  getModalState:  () =>      false,
  getIdByName:    () => '' as UUID,
}
const ModalContext = createContext<ContextType>(initialContext);


// helpers for dispatch actions
const closeModal = (refs: Refs) => {
  const { basicRefs, scrollablesRef } = refs;

  const modalElm = basicRefs.modalRef?.current;
  const maskElm  = basicRefs.maskRef?.current;
  if (!modalElm || !maskElm) { console.log('modalElm or maskElm is null'); return }

  modalElm.removeEventListener('wheel', preventScroll);
  maskElm.removeEventListener('wheel', preventScroll);

  if (!scrollablesRef) { console.log('scrollableRefs is null'); return }
  const scrollableElms = scrollablesRef.current;
  scrollableElms.forEach(scrollableElm => {
    if (!scrollableElm) { console.log('scrollableElm is null'); return }
    scrollableElm.removeEventListener('wheel', reviveScroll);
  });

  modalElm.close();
};

const openModal = (refs: Refs) => {
  const { basicRefs, scrollablesRef } = refs;

  const modalElm = basicRefs.modalRef?.current;
  const maskElm  = basicRefs.maskRef?.current;
  if (!modalElm || !maskElm) { console.log('modalElm or maskElm is null'); return }
  modalElm.showModal();

  // 背景スクロールのブロックしつつ、scrollable要素のスクロールは許可する
  modalElm.addEventListener('wheel', preventScroll, {passive: false});
  maskElm.addEventListener('wheel', preventScroll, {passive: false});

  if (!scrollablesRef) { console.log('scrollableRefs is null'); return }
  const scrollableElms = scrollablesRef.current;
  scrollableElms.forEach(scrollableElm => {
    if (!scrollableElm) { console.log('scrollableElm is null'); return }
    scrollableElm.addEventListener('wheel', reviveScroll, {passive: false});
  });
};



// reducer for modals
const modalReducer = (modals: Modals, action: ActionType): Modals => {

  switch (action.type) {

    // 'register': modals に id をキーにして、modals[id] の state を初期化
    case 'register': {
      const { id, initialModal } = action;
      return { ...modals, [id]: initialModal };
    }

    case 'open': {
      const { id } = action;
      const modal = modals[id];
      const refs  = modal.refs;
      openModal(refs);
      return { ...modals, [id]: { ...modal, isOpen: true } };
    }

    case 'close': {
      const { id } = action;
      const modal = modals[id];
      const refs  = modal.refs;
      closeModal(refs);
      return { ...modals, [id]: { ...modal, isOpen: false } };
    }

    default: return modals;
  }
}



interface ModalProviderProps {
  children: ReactNode;
}
export const ModalProvider: FC<ModalProviderProps> = (props) => {
  const { children } = props;

  // states & refs
  const [modals, dispatch] = useReducer(modalReducer, {});                 // modals の state
  const [currentModalId, setCurrentModalId] = useState<UUID | null>(null); // 現在開いている modal の id
  const modalNamedIdsRef = useRef<ModalNamedIds>({});                      // name と id の紐づけ


  // helpers
  // 1. getIdByName: name で指定した modal の id を取得する
  const getIdByName = (name: ModalName): UUID => {
    return modalNamedIdsRef.current[name];
  };

  // functions
  // 1. register: name と紐づけた id をキーにしてmodalsの中に modal の情報を登録する
  const register = (name: ModalName, basicRefs: BasicRefs, scrollablesRef: ScrollablesRef) => {
    const initialModal: Modal = {
      isOpen: false,
      refs: { basicRefs, scrollablesRef }
    };
    
    try {
      // name の重複でエラー
      if (modalNamedIdsRef.current[name]) {
        throw new Error(`Duplicated modal name: ${name}`);
      }
      // id を発行して登録
      const id = generateUUID();
      modalNamedIdsRef.current[name] = id;
    
      const action: ActionType = { type: 'register', id, initialModal };
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };


  // 2, 3. dispatchOpen, dispatchClose: modal の 開閉を reducer に通知する
  const dispatchOpen = (name: ModalName) => {
    const id = getIdByName(name);
    const action: ActionType = { type: 'open', id };
    dispatch(action);
    setCurrentModalId(id);
  };
  const dispatchClose = (name: ModalName) => {
    const action: ActionType = { type: 'close', id: getIdByName(name) };
    dispatch(action);
    setCurrentModalId(null);
  };


  // 4. getModalState: name で指定した modal の isOpen state を取得する
  const getModalState = (name: ModalName) => {
    const id = getIdByName(name);
    return modals[id].isOpen;
  };


  // providing values
  const value = {
    modals,
    currentModalId,
    register,
    dispatchOpen,
    dispatchClose,
    getModalState,
    getIdByName,
  };

  return <ModalContext.Provider value={value} children={ children } />;
};


// hooks
// 1. useModalDeclarer: ModalName型 の name で modal を登録
export const useModalDeclarer = (name: ModalName) => {
  const { register } = useContext(ModalContext);
  
  // modal, mask の ref を発行
  const modalRef      = useRef<HTMLDialogElement | null>(null);
  const maskRef       = useRef<HTMLDivElement    | null>(null);
  const basicRefs: BasicRefs = { modalRef, maskRef };
  
  // scrollable 要素を格納する ref を発行
  const scrollablesRef: ScrollablesRef = useRef<ScrollableElms>([]);
  // scrollable 要素を追加する関数
  const addScrollableElm = (element: HTMLElement) => { scrollablesRef.current.push(element) };


  useEffect(() => {
    register(name, basicRefs, scrollablesRef);
  }, []);

  const { closeModal } = useModalCloser(name);

  return { closeModal, basicRefs, addScrollableElm };
};

// 2, 3. useModalOpener, useModalCloser: open/close btn を含むコンポーネントで使用
export const useModalOpener = (name: ModalName) => {
  const { dispatchOpen } = useContext(ModalContext);
  // console.log(name);
  return { openModal: () => { dispatchOpen(name) } };
};
export const useModalCloser = (name: ModalName) => {
  const { dispatchClose } = useContext(ModalContext);
  return { closeModal: () => dispatchClose(name) };
};

// 4. useModalState: name で指定した modal の isOpen state を取得してModalコンポーネントに渡す
export const useModalState = (name: ModalName) => {
  const { getModalState, modals, getIdByName } = useContext(ModalContext);
  const [isOpen, setIsOpen] = useState(false);
  const modal = modals[getIdByName(name)];
  useEffect(() => {
    if (typeof modal === 'undefined') return; // modals が初期化される前に実行されるのを防ぐ
    setIsOpen(getModalState(name));
  }, [modal]);

  return { isOpen };
};



// component
interface ModalProps {
  name:          ModalName;
  className?:       string;
  classNameMask?:   string;
  isOpen:          boolean;
  zIndex?:          number;
  basicRefs:     BasicRefs;
  closeModal:   () => void;
  children:      ReactNode;
}
interface StyledDialogType {
  $zIndex:  number;
}
interface StyledMaskType {
  $isOpen: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
  const { name, className, classNameMask, isOpen, zIndex, basicRefs, closeModal, children } = props;

  const classNameMaskDefault = `${ name }-modal-mask`;

  return (
    <>
      <StyledDialog
        className = { className          }
        ref       = { basicRefs.modalRef }
        $zIndex   = { zIndex || 1        }
      >
          { children }
        <StyledMask
          className = { classNameMask || classNameMaskDefault }
          ref       = { basicRefs.maskRef                     }
          onClick   = { closeModal                            }
          $isOpen   = { isOpen                                } />
      </StyledDialog>
    </>
  );
};

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



// # USAGE
// 1. 'Modal' コンポーネントを使用するコンポーネントで: Modalの登録
// 1.1. コード例
// import { Modal, useModalDeclarer, useModalState,  ModalName } from '../providers/ModalProvider';
// const MyModal = () => {
//    const modalName = 'testModal' as ModalName;
// 
//   // useModalDeclarer: modal 登録用
//    const {
//      closeModal,
//      basicRefs,
//      addScrollableElm
//    } = useModalDeclarer(modalName);
// 
//   // useModalState: modal の isOpen state を取得
//    const {
//      isOpen
//    } = useModalState(modalName);
// 
//    return (
//      <Modal
//        className='you-can-add-your-class'
//        isOpen={true}                                        // 内部で、modalに最低限のstyleを適用するために使用します
//        basicRefs={basicRefs}                                // 内部で、modal(dialog element) と mask(div element) の ref 設定に使用します
//        closeModal={closeModal}                              // 内部で、mask をクリックした時にmodalを閉じるために使用します
//      >
//
//        <button onClick={closeModal}>close</button>          // モーダルを閉じるボタン: closeModalを指定
//        <div>modal content</div>                             // モーダルの中身
//        <div ref={addScrollableElm}>scrollable element</div> // スクロールを許可する要素 1
//        <div ref={addScrollableElm}>scrollable element</div> // スクロールを許可する要素 2
//
//      </Modal>
//    )
// };
// 
// 1.2. 特徴
// - addScrollableElmは複数の子要素で使用することができます。
// - Modal コンポーネントはuseModalDeclarerで登録した数、modalを記録できるので、一つのプロジェクト内で複数のmodalを使用することができます。
// 1.3 styleに関するTips
// - scrollable要素には
//  - スクロールバーを表示させるために、overflow: auto を指定する
//  - スクロール端でさらにスクロールすると、背景がスクロールされてしまうのを防ぐために、overscroll-behavior: contain/none を指定する
//  - スクロールバーを非表示にしたい場合には、1. -ms-scrollbar: none;, 2. scrollbar-width: none;, 3. ::-webkit-scrollbar { display: none } の3つを指定する
// - styled-componentsを使用すれば、Modalコンポーネントのスタイルを上書きできます。
//  - 特にdefaultでdialogは表示状態でdisplay: block;が適用されているため、次のようにしてdisplay: flex;に変更することができます。
//    例: const StyledModal = styled(Modal)<{isOpen: boolean;}>` &[open] { display: flex }`;

// 2. 'Modal' コンポーネントを開くボタンを含む任意のコンポーネントで: Modalを開く
//    離れたコンポーネントでも、modal name で紐づけられた modal を開くことができます
// import { useModalOpener, ModalName } from '../providers/ModalProvider';
// const MyComponent = () => {
//    const modalName = 'testModal' as ModalName;
//    const { openModal } = useModalOpener(modalName);
//
//    return (
//      <button onClick={openModal}>open modal</button>
//    )
// };