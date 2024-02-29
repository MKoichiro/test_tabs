/* エントリポイント */

/* react関連 */
import React from 'react';
import { createRoot } from 'react-dom/client';  // 現状createRootはreact-dom/clientから取得

/* 共通スタイル */
import GlobalStyle from './globalStyle';

/* App Component */
import App from './components/App';

// rootを取得
const rootDiv = document.querySelector('#root');

if (rootDiv) {
  const root = createRoot(rootDiv);

 root.render(
  <>
    <React.StrictMode>
      <GlobalStyle />          {/* 共通スタイルの読み込み */}
      <App />                  {/* プレエントリの読み込み */}
    </React.StrictMode>
  </>

 );

} else { console.error('The element with the id "root" is not found.') }