/* プレエントリポイント: components フォルダ内をいったんまとめる */

/* --- react/styled-components --- */
import React from 'react';
/* --- child components ---------- */
import { Header } from './header/Header';
import { Main } from './main/Main';
import { Footer } from './footer/Footer';
/* --- providers/contexts -------- */
import { Providers } from '../providers/Providers';
/* --- temporarily unsed --------- */
// import Modal from 'react-modal';
// Modal.setAppElement('#root');


// === 型定義部分 ===================================================== //
// - component props
// - others
// ===================================================== 型定義部分 === //


// === component 定義部分 ============================================= //
export const App = () => {
  return (
		<Providers>
			<Header />
			<Main />
			<Footer />
		</Providers>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
// ================================================= style 定義部分 === //