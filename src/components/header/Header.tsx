/* Header Component */

/* react 関連 */
import React, { useState, useRef } from 'react'; // 他の hooks も必要に応じてここでimport
/* styled-components 関連 */
import styled, { css } from 'styled-components';
/* 子Component があれば */
// import MyComponent from './components/XXX/YYY';


// === component 定義部分 ============================================= //
const Header = () => {
	
	// ここにいろいろ書く

	return (
		<h1 children="Header" />
	);
};
// ============================================= component 定義部分 === //

// === style 定義部分 ================================================= //
const StyledHeader = styled(Header)`
	h1 {
		background: pink;
		color: red;
	}
`;
// ================================================= style 定義部分 === //

export {StyledHeader};