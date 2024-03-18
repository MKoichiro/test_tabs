/* プレエントリポイント: components フォルダ内をいったんまとめる */

/* react関連 */
import React from 'react';


/* 各 Component */
import { StyledHeader as Header } from './header/Header';
import { StyledMain as Main } from './main/Main';
import { StyledFooter as Footer } from './footer/Footer';

import Modal from 'react-modal';
import { Providers } from '../providers/Providers';

Modal.setAppElement('#root');

const App = () => {
  return (
		<Providers>
			<Header />
			<Main />
			<Footer />
		</Providers>
  );
};

export default App;