import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { createContext, useContext, useRef, useReducer } from 'react';
import { FC, MutableRefObject, ReactNode } from 'react';
import { UUID, generateUUID } from '../utils/generateUUID'; // uuid を生成する関数
import { preventScroll, reviveScroll } from '../utils/scrollBlock'; // スクロールをブロックする関数

// type UUID = string & { _uuidBrand: never }; // を import している。
type NameString = string & { _nameBrand: never };

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
  [name: NameString]: UUID;
}


type ActionType =
  | { type: 'register',               id: UUID,   initialModal: Modal         }
  | { type: 'register_basics',        id: UUID,   basicRefs:           BasicRefs }
  | { type: 'register_scrollables',   id: UUID,   scrollablesRef: ScrollablesRef }
  | { type: 'open',                   id: UUID                                }
  | { type: 'close',                  id: UUID                                };


interface ContextType {
  modals:                Modals;
  currentModalId:   UUID | null;

  registerNamedIds:      (name: NameString[])                             =>    void;
  registerBasics:        (name: NameString, basicRefs: BasicRefs)            =>    void;
  registerScrollables:   (name: NameString, scrollablesRef: ScrollablesRef)  =>    void;
  dispatchOpen:          (name: NameString)                               =>    void;
  dispatchClose:         (name: NameString)                               =>    void;
  getModalState:         (name: NameString)                               => boolean;
  getIdByName:      (name: NameString)                               =>    UUID;
}


const initialContext: ContextType = {
  modals:            {},
  currentModalId:  null,

  registerNamedIds:     () =>    {},
  registerBasics:       () =>    {},
  registerScrollables:  () =>    {},
  dispatchOpen:         () =>    {},
  dispatchClose:        () =>    {},
  getModalState:        () => false,
  getIdByName:     () =>    '' as UUID,
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


    // 'register_basics': register で登録してある state をコピーして basics を更新
    case 'register_basics': {
      const { id, basicRefs } = action;

      const modal = modals[id];
      const refs  = modal.refs;

      return { ...modals, [id]: { ...modal, refs: { ...refs, basicRefs } } };
    }


    // 'register_scrollables': register で登録してある state をコピーして scrollables を更新
    case 'register_scrollables': {
      const { id, scrollablesRef } = action;

      const modal = modals[id];
      const refs  = modal.refs;

      return { ...modals, [id]: { ...modal, refs: { ...refs, scrollablesRef } } };
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
  const [modals, dispatch] = useReducer(modalReducer, {});
  const [currentModalId, setCurrentModalId] = useState<UUID | null>(null);
  const modalNamedIdsRef = useRef<ModalNamedIds>({});
  
  const initialModal: Modal = {
    isOpen: false,
    refs: {
      basicRefs: {
        modalRef: null,
        maskRef: null
      },
      scrollablesRef: null,
    },
  };


  // helpers
  // 1. getIdByName: name で指定した modal の id を取得する
  const getIdByName = (name: NameString): UUID => {
    return modalNamedIdsRef.current[name];
  };

  // functions
  // 1. registerNamedIds: コーダーがmodalに名前をつけて管理できるように、名前とidの対応を登録する
  const registerNamedIds = (names: NameString[]) => {
    names.forEach(name => {
      // name の重複でエラー
      if (modalNamedIdsRef.current[name]) {
        throw new Error(`Duplicated modal name: ${name}`);
      }
      // id を発行して登録
      const id = useMemo(() => generateUUID(), []);
      modalNamedIdsRef.current[name] = id;

      const action: ActionType = { type: 'register', id, initialModal };
      dispatch(action);
    });
  };

  // 2. registerBasics: modal の ref を登録する (初回レンダリング時に呼び出される)
  const registerBasics = (name: NameString, basicRefs: BasicRefs) => {
    const action: ActionType = { type: 'register_basics', id: getIdByName(name), basicRefs: basicRefs };
    dispatch(action);
  };

  // 3. registerScrollables: modal 内部でスクロール可能にしたい要素の ref を登録する (初回レンダリング時に呼び出される)
  const registerScrollables = (name: NameString, scrollablesRef: ScrollablesRef) => {
    const action: ActionType = { type: 'register_scrollables', id: getIdByName(name), scrollablesRef };
    dispatch(action);
  };

  // 4, 5. dispatchOpen, dispatchClose: modal の 開閉を reducer に通知する
  const dispatchOpen = (name: NameString) => {
    const id = getIdByName(name);
    const action: ActionType = { type: 'open', id };
    dispatch(action);

    setCurrentModalId(id);
  };
  const dispatchClose = (name: NameString) => {
    const action: ActionType = { type: 'close', id: getIdByName(name) };
    dispatch(action);

    setCurrentModalId(null);
  };


  // 6. getModalState: name で指定した modal の isOpen state を取得する
  const getModalState = (name: NameString) => {
    const id = getIdByName(name);
    return modals[id].isOpen;
  }


  // providing values
  const value = {
    modals,
    currentModalId,

    registerNamedIds,
    registerBasics,
    registerScrollables,
    dispatchOpen,
    dispatchClose,

    getModalState,
    getIdByName,
  };

  return <ModalContext.Provider value={value} children={ children } />;
};


// hooks
// 1. useModaldeclarer: open btn を含むコンポーネントで使用
// 厳密にはopen btnを含むモーダルの機能をを完全に内包するコンポーネント以上の先祖要素で使用
// 基本的にはエントリーポイントで使用すればよい
export const useModaldeclarer = (names: NameString[]) => {
  const { registerNamedIds } = useContext(ModalContext);
  registerNamedIds(names);
};


// 2. useModalOpener: open btn を含むコンポーネントで使用
export const useModalOpener = (name: NameString) => {
  const { dispatchOpen } = useContext(ModalContext);  
  return { openModal: () => dispatchOpen(name) };
}


// 3. useModalCloser: close btn を含むコンポーネントで使用
export const useModalCloser = (name: NameString) => {
  const { dispatchClose } = useContext(ModalContext);
  return { closeModal: () => dispatchClose(name) };
}


// 4. useModalIssuer: Modalコンポーネントで内部的に使用: マウント時に id をキーに ref と isOpen を発行する
const useModalIssuer = (name: NameString) => {
  const { registerBasics } = useContext(ModalContext);

  const { closeModal } = useModalCloser(name);

  // modal, mask の ref を発行
  const modalRef      = useRef<HTMLDialogElement | null>(null);
  const maskRef       = useRef<HTMLDivElement    | null>(null);
  const basicRefs: BasicRefs = { modalRef, maskRef };

  // 初回レンダリング時に modal(dialog) と mask(div) の ref を登録する
  useEffect(() => { registerBasics(name, basicRefs) }, []);

  return { closeModal, basicRefs };
};


// 5. useModalState: name で指定した modal の isOpen state を取得してModalコンポーネントに渡す
export const useModalState = (name: NameString) => {
  const { getModalState } = useContext(ModalContext);
  const isOpen = getModalState(name);

  return { isOpen };
};


// 6. useInnerScrollable: Modal内部でスクロール可能にしたい要素がある場合に使用
// 別々のコンポーネントから複数回実行される可能性があるので、scrollable 要素の ref を登録する関数を返す
export const useInnerScrollable = (name: NameString) => {
  const { registerScrollables } = useContext(ModalContext);

  const scrollablesRef: ScrollablesRef = useRef<ScrollableElms>([]);
  const addScrollableElm = (element: HTMLElement) => { scrollablesRef.current.push(element) };

  // 初回レンダリング時に scrollable 要素の ref を登録する
  useEffect(() => { registerScrollables(name, scrollablesRef) }, []);

  return { addScrollableElm };
};





// component
interface ModalProps {
  className?:     string;
  name:       NameString;
  isOpen:        boolean;
  children:    ReactNode;
}
interface StyledDialogType {
  $isOpen: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
  const { className, name, isOpen, children } = props;

  // modal ref, mask ref を発行してもらう
  const { closeModal, basicRefs } = useModalIssuer(name);

  // handlers
  const handleMaskClick = () => { closeModal() };


  return (
      <StyledDialog
        className = { className          }
        ref       = { basicRefs.modalRef }
        $isOpen   = { isOpen             } >

          { children }
  
          {/* mask */}
          <div
            className = { 'modal-mask'       }
            ref       = { basicRefs.maskRef  }
            onClick   = { handleMaskClick    } />

      </StyledDialog>
  );
};


const StyledDialog = styled.dialog<StyledDialogType>`
  // reset と最低限 modal たらしめる style
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




// memo: 別の役割の定数の型を区別する方法
// name と uuid で生成した id の型はともに string なので、id の引数に name を渡してもエラーにならない
// 回避策: brand を使って型を区別する
// type UUID = string & { _uuidBrand: never };
// type NameString = string & { _nameBrand: never };
// とすることで、相互に誤って代入するとエラーを吐くようにする
// 
// cf) '&': typescriptの交差型
// cf) brand型