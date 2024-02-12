/* プレエントリポイント: components フォルダ内をいったんまとめる */

/* react関連 */
import React from 'react';

/* 各 Component */
import { StyledHeader as Header } from './header/Header';
import { StyledMain as Main } from './main/Main';
import { StyledFooter as Footer } from './footer/Footer';

const App = () => {
  return (
    <>
		  <Header />
		  <Main />
		  <Footer />
	  </>
  );
};

export default App;