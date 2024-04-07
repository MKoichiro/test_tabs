/* Footer Component */

/* --- react/styled-components --- */
import React, { FC } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */


// === 型定義部分 ===================================================== //
// - component props
interface FooterType {}
// - others
// ===================================================== 型定義部分 === //


// === component 定義部分 ============================================= //
export const Footer: FC<FooterType> = (props) => {
	const {} = props;
	return (
    <StyledFooter>
  		<h1 children="Footer" />
    </StyledFooter>
	);
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledFooter = styled.footer`
  h1 {
    background: pink;
    color: red;
  }
`;
// ================================================= style 定義部分 === //