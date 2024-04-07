/* Header Component */

/* --- react/styled-components --- */
import React, { FC } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */



// === 型定義部分 ===================================================== //
// - component props
interface HeaderType {}
// - others
// ===================================================== 型定義部分 === //


// === component 定義部分 ============================================= //
export const Header: FC<HeaderType> = (props) => {
	const {} = props;

	return (
		<StyledHeader>
			<h1 children="Header" />
		</StyledHeader>
	);
};
// ============================================= component 定義部分 === //

// === style 定義部分 ================================================= //
const StyledHeader = styled.header`
	h1 {
	}
`;
// ================================================= style 定義部分 === //