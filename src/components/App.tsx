/* --- react/styled-components --- */
import React, { FC } from 'react';
/* --- child components ---------- */
import { Header } from './header/Header';
import { Main } from './main/Main';
import { Footer } from './footer/Footer';
/* --- dev ----------------------- */
// import { isDebugMode } from '../utils/adminDebugMode';

// === TYPE =========================================================== //
// - PROPS
// - STYLE
// - OTHERS
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
/**
 * application 全体をまとめたコンポーネント。render 処理は entry point の index.tsx に分離しているが、このコンポーネントが事実上の root となる。
 *
 * @returns
 */
export const App: FC = () => {
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
