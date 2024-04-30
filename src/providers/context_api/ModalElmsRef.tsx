import React, { FC, useRef, useContext, createContext } from 'react';
import { useDispatch } from '../redux/store';
import { close, open } from '../redux/slices/modalSlice';
import { preventScroll, reviveScroll } from '../../utils/scrollBlock';
/* --- types --- */
import {
    ModalName,
    DialogElm,
    MaskElm,
    ScrollableElm,
    ModalElms,
    ModalsElms,
    ContextType,
    ProviderType,
} from '../types/modal';

// === CONTEXT ======================================================== //
const Context = createContext<ContextType>({
    modalElmsRef: { current: {} },
});
// ======================================================== CONTEXT === //
// === PROVIDER ======================================================= //
export const ModalElmsRef: FC<ProviderType> = (props) => {
    const { children } = props;
    const modalElmsRef = useRef<ModalsElms>({});

    const value = { modalElmsRef };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};
// === PROVIDER ======================================================= //

// === HOOKS ========================================================== //
// --- helpers ------------------------------------------------ //
// 1. useModalRegistrant: name 毎に参照メモリを変えて初期化する必要があるため、関数で用意
const initialModalElms = (): ModalElms => ({
    basics: { dialog: null, mask: null },
    scrollables: [],
});

// 2, 3. useModalOpener, useModalCloser: Modal を開閉時に背景のスクロールを制御する
const unblockScroll = (modalElms: ModalElms) => {
    const { basics, scrollables } = modalElms;

    const modalElm = basics.dialog;
    const maskElm = basics.mask;
    if (!modalElm || !maskElm) {
        console.log('modalElm or maskElm is null');
        return;
    }

    modalElm.removeEventListener('wheel', preventScroll);
    maskElm.removeEventListener('wheel', preventScroll);

    scrollables.forEach((scrollableElm) => {
        if (!scrollableElm) {
            console.log('scrollableElm is null');
            return;
        }
        scrollableElm.removeEventListener('wheel', reviveScroll);
    });

    modalElm.close();
};
const blockScroll = (modalElms: ModalElms) => {
    const { basics, scrollables } = modalElms;

    const modalElm = basics.dialog;
    const maskElm = basics.mask;
    if (!modalElm || !maskElm) {
        console.log('modalElm or maskElm is null');
        return;
    }
    modalElm.showModal();

    // 背景スクロールのブロックしつつ、scrollable要素のスクロールは許可する
    modalElm.addEventListener('wheel', preventScroll, { passive: false });
    maskElm.addEventListener('wheel', preventScroll, { passive: false });

    scrollables.forEach((scrollableElm) => {
        if (!scrollableElm) {
            console.log('scrollableElm is null');
            return;
        }
        scrollableElm.addEventListener('wheel', reviveScroll, { passive: false });
    });
};
// ------------------------------------------------ helpers --- //

// 1. Modal コンポーネントを含むコンポーネントで使用: Modal に関する DOM 要素 の ref を登録する
export const useModalRegistrant = (name: ModalName) => {
    const { modalElmsRef } = useContext(Context);

    const setDialogRef = (dialog: DialogElm) => {
        // StrictMode によるアンマウントシミュレーションではスキップ
        if (dialog === null) {
            return;
        }
        // 未登録なら初期化して登録
        if (!modalElmsRef.current[name]) {
            modalElmsRef.current[name] = initialModalElms();
        }
        modalElmsRef.current[name].basics.dialog = dialog;
    };

    const setMaskRef = (mask: MaskElm) => {
        // StrictMode によるアンマウントシミュレーションではスキップ
        if (mask === null) {
            return;
        }
        // 未登録なら初期化して登録
        if (!modalElmsRef.current[name]) {
            modalElmsRef.current[name] = initialModalElms();
        }
        modalElmsRef.current[name].basics.mask = mask;
    };

    const addScrollableRef = (scrollable: ScrollableElm) => {
        // 未登録なら初期化して登録
        if (!modalElmsRef.current[name]) {
            modalElmsRef.current[name] = initialModalElms();
        }

        // ref callback は再レンダリングの度に実行される。よって、同じ入力に対して同じ出力を返すように、早期returnする。
        // 1. 既に登録されている場合
        if (modalElmsRef.current[name].scrollables.includes(scrollable)) {
            return;
        }
        // 2. StrictMode によるアンマウントのシミュレーションを回避する場合: nullが渡される
        // ※ setDialogRef, setMaskRef は StrictMode による復元が効くため問題ない。
        // 両者の違いは同じ入力に対して異なる出力を返すかどうか。
        if (scrollable === null) {
            return;
        }

        modalElmsRef.current[name].scrollables.push(scrollable);
    };

    return { setBasicsRef: { setDialogRef, setMaskRef }, addScrollableRef };
};

// 2, 3. open/close btn を含むコンポーネントで使用: Modal を開閉する
export const useModalOpener = (name: ModalName) => {
    const { modalElmsRef } = useContext(Context);
    const dispatch = useDispatch();
    return () => {
        const modalElms = modalElmsRef.current[name];
        blockScroll(modalElms);
        dispatch(open(name));
    };
};
export const useModalCloser = (name: ModalName) => {
    const { modalElmsRef } = useContext(Context);
    const dispatch = useDispatch();
    return () => {
        const modalElms = modalElmsRef.current[name];
        unblockScroll(modalElms);
        dispatch(close(name));
    };
};
// ========================================================== HOOKS === //
