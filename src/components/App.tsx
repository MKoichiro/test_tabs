/* プレエントリポイント: components フォルダ内をいったんまとめる */

/* react関連 */
import React from 'react';
import '../data/entity';


/* 各 Component */
import { Header } from './header/Header';
import { Main } from './main/Main';
import { Footer } from './footer/Footer';

// import Modal from 'react-modal';
import { Providers } from '../providers/Providers';
import { UserProvider } from '../providers/UserProvider';
// Modal.setAppElement('#root');

const App = () => {
  return (
		<UserProvider>
		<Providers>
			<Header />
			<Main />
			<Footer />
		</Providers>
		</UserProvider>
  );
};

export default App;