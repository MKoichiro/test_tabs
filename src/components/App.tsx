/**
 * @summary application 全体をまとめたコンポーネント。providers の読み込みや render 処理は entry point の index.tsx に分離しているが、このコンポーネントが事実上の root となる。
 *
 * @issues
 * - なし
 * @copilot
 * - なし
 *
 * @module
 */

/* --- react/styled-components --- */
import React, { useCallback, useEffect } from 'react';

/* --- child components ---------- */
import { Header } from './header/Header';
import { Main } from './main/Main';
import { Footer } from './footer/Footer';
import { useDispatch } from '../providers/redux/store';
import { setWindowSize } from '../providers/redux/slices/window_size_slice/windowSizeSlice';

/* --- dev ----------------------- */
// import { isDebugMode } from '../utils/adminDebugMode';

// === TYPE =========================================================== //
// =========================================================== TYPE === //

const resizeDelay = 300;
// === FUNCTION ======================================================= //
const useApp = () => {
    const dispatch = useDispatch();

    const dispatchWindowSize = useCallback(() => {
        const inner = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        const client = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        };
        dispatch(setWindowSize({ inner, client }));
    }, []);

    useEffect(() => {
        // window サイズ初期値のdispatch
        dispatchWindowSize();

        let timer: NodeJS.Timeout;
        const handleResize = () => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(dispatchWindowSize, resizeDelay);
        };

        addEventListener('resize', handleResize);
        return () => removeEventListener('resize', handleResize);
    }, []);
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `</>` > `<header/>`, `<main/>`, `<footer/>`
 * @example
 * ```tsx
 * <App />
 * ```
 *
 * @category Component
 */
export const App = () => {
    useApp();
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //

// ========================================================= STYLE === //
