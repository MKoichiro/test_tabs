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
import React from 'react';

/* --- child components ---------- */
import { Header } from './header/Header';
import { Main } from './main/Main';
import { Footer } from './footer/Footer';

/* --- dev ----------------------- */
// import { isDebugMode } from '../utils/adminDebugMode';

// === TYPE =========================================================== //
// =========================================================== TYPE === //

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
