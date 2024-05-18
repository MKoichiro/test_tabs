/**
 * @summary エントリーポイント。
 * 1. GlobalStyle の読み込み
 * 2. Providers の読み込み
 * 3. App の読み込み
 *
 * @issues
 * - なし
 * @copilot
 * - なし
 *
 * @module
 */

/* --- react/styled-components --- */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* --- styles -------------------- */
import GlobalStyle from './globalStyle';

/* --- child components ---------- */
import { App } from './components/App';

/* --- providers ----------------- */
import { Providers } from './providers/Providers';

/* --- dev ----------------------- */
// import { isDebugMode } from './utils/adminDebugMode';

const rootDiv = document.querySelector('#root');

if (rootDiv) {
    const root = createRoot(rootDiv);

    root.render(
        <>
            <StrictMode>
                {' '}
                {/* 本番ビルド(npm run build)では自動的に無効になる */}
                <GlobalStyle />
                <Providers>
                    <App />
                </Providers>
            </StrictMode>
        </>
    );
} else {
    console.error('The element with the id "root" is not found. Please ensure that the element exists in your HTML.');
}
