/**
 * @summary ヘッダーの表示を担当するコンポーネント
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
// interface HeaderType {}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * 
 * @renderAs
 * - `<header/>`
 * @example
 * ```tsx
 * <Header />
 * ```
 *
 * @category Component
 */
export const Header = () => {
    return (
        <StyledHeader>
            <div className="header-container">
                <h1>
                    T<span>o</span>D<span>o</span>
                </h1>
            </div>
        </StyledHeader>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledHeader = styled.header`
    height: 45vh;
    background-color: #454e70;
    color: #d0d0d0;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));
    letter-spacing: 0.15rem;

    @media (width < 600px) {
        height: 30vh;
    }

    span {
        color: #cfcf00;
    }

    .header-container {
        height: 100%;
        width: 60%;
        margin: 0 auto;
        @media (width < 600px) {
            width: 75%;
        }

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.8rem;

        h1 {
            margin: 0 auto;
        }
    }
`;
// ========================================================= STYLE === //
