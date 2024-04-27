
/* --- react/styled-components --- */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';  // 現状createRootはreact-dom/clientから取得

/* --- styles -------------------- */
import GlobalStyle from './globalStyle';

/* --- child components ---------- */
import { App } from './components/App';

/* --- dev ----------------------- */
import { isDebugMode } from './utils/adminDebugMode';
import { Providers } from './providers/Providers';


const rootDiv = document.querySelector('#root');

if (rootDiv) {
  const root = createRoot(rootDiv);

  root.render(
    <>
      <StrictMode>
        <GlobalStyle />          {/* Load common styles */}
        <Providers>
          <App />                 {/* Load the parent entry */}
        </Providers>
      </StrictMode>
    </>
  );

} else { 
  console.error('The element with the id "root" is not found.') 
}