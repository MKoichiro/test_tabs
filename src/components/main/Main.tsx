/* Main Component */

/* react 関連 */
import React, { FC, useState, useRef } from 'react'; // 他の hooks も必要に応じてここでimport
/* styled-components 関連 */
import styled, { css } from 'styled-components';
/* 子Component があれば */
// import MyComponent from './XXX/YYY';

interface MainProps {
	tentativeClassName?: string;
}

// === component 定義部分 ============================================= //
const Main: FC<MainProps> = (props) => {
	
	// ここにいろいろ書く

	return (
		<div className = { props.tentativeClassName }>
			<h1 children="Main" />
		</div>
	);
};
// ============================================= component 定義部分 === //

// === style 定義部分 ================================================= //
const StyledMain = styled(Main)`
	background: pink;
	color: red;
`;
// ================================================= style 定義部分 === //

export { StyledMain };