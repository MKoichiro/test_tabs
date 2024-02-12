/* Footer Component */

/* react 関連 */
import React, { useState, useRef } from 'react'; // 他の hooks も必要に応じてここでimport
/* styled-components 関連 */
import styled, { css } from 'styled-components';
/* 子Component があれば */
// import MyComponent from './components/XXX/YYY';


// === component 定義部分 ============================================= //
const Footer = () => {
	// ここにいろいろ書く
	return (
		<h1 children="Footer" />
	);
};
// ============================================= component 定義部分 === //

// === style 定義部分 ================================================= //
const StyledFooter = styled(Footer)`
  h1 {
    background: pink;
    color: red;
  }
`;
// ================================================= style 定義部分 === //

export {StyledFooter};