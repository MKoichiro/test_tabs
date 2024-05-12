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
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RadioButtonUnchecked } from '@mui/icons-material';
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
                <div className="header-grip-icon">
                    <RadioButtonUnchecked />
                </div>
                <h1>WEB CAT Todo</h1>
                <div className="header-toggle-icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        </StyledHeader>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledHeader = styled.header`
    background-color: var(--color-black-1);
    font-size: var(--fs-header);
    font-weight: bold;

    .header-container {
        border: var(--border-weight) solid var(--color-white-1);
        border-radius: 0.25rem;
        background-color: var(--color-black-1);
        color: var(--color-white-1);
        margin: 1.6rem auto;
        width: var(--contents-width);
        display: flex;

        .header-grip-icon {
            padding-left: 0.8rem;
            svg {
                font-size: inherit;
                height: 100%;
            }
        }

        h1 {
            padding: 0.8rem;
            letter-spacing: 0.15rem;
            flex: 1;
        }

        .header-toggle-icon {
            display: flex;
            align-items: center;
            padding: 0 0.8rem;
            svg {
                height: 0.75em;
            }
        }
    }
`;
// ========================================================= STYLE === //
