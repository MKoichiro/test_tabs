/* Main Component */

/* react 関連 */
import React, { FC, useState, useRef } from 'react'; // 他の hooks も必要に応じてここでimport
/* styled-components 関連 */
import styled, { css } from 'styled-components';
/* 子Component */
import { StyledTabsContainer as TabsContainer } from './Tab';

interface MainProps {
	className?: string;
}

// === component 定義部分 ============================================= //
const Main: FC<MainProps> = (props) => {
	
	// ここにいろいろ書く

	return (
		<div className = { props.className }>
			<h1 children="Main" />
			<TabsContainer />
		</div>
	);
};
// ============================================= component 定義部分 === //

// === style 定義部分 ================================================= //
const StyledMain = styled(Main)`
	width: 70%;
	margin: 0 auto;
`;
// ================================================= style 定義部分 === //

export { StyledMain };