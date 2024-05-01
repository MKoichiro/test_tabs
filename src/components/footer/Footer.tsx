/**
 * @summary フッターの表示を担当するコンポーネント
 *
 * @issues
 * - なし
 * @copilot
 * - なし
 *
 * @module
 */

/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../utils/adminDebugMode';

// === TYPE =========================================================== //
// - PROPS
// interface FooterType {}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * 
 * @renderAs
 * - `<footer/>`
 * @example
 * ```tsx
 * <Footer />
 * ```
 *
 * @category Component
 */
export const Footer = () => {
    return (
        <StyledFooter>
            <h3 children="Todo By React x TypeScript x styled-components" />
        </StyledFooter>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledFooter = styled.footer`
    display: flex;
    margin-top: auto;
    height: 15vh;
    width: 100%;
    color: #777;
    background: #fcfcfc;
    clip-path: polygon(0 5vw, 100% 0, 100% 100%, 0 100%);
    @media (width < 600px) {
        height: 10vh;
    }

    h3 {
        padding: 0 0.8rem;
        align-self: flex-end;
        margin: 0 auto 0;
        width: var(--contents-width);
        line-height: 5rem;
        text-align: right;
        @media (width < 1024px) {
            width: 90%;
        }
    }
`;
// ========================================================= STYLE === //
