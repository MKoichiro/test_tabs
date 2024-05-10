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
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TaskAlt } from '@mui/icons-material';
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
            <div className="footer-container">
                <div className='footer-toggle-icon'>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
                <h4>
                    WEB CAT Todo
                </h4>
                <div className='footer-grip-icon'>
                    <TaskAlt/>
                </div>
            </div>
        </StyledFooter>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledFooter = styled.footer`
    margin-top: 3.2rem;
    background-color: var(--color-black-1);
    font-size: 1.6rem;
    font-weight: bold;

    .footer-container {
        border: var(--border-weight) solid var(--color-white-1);
        border-radius: .25rem;
        background-color: var(--color-black-1);
        color: var(--color-white-1);
        margin: 1.6rem auto;
        width: var(--contents-width);
        display: flex;

        .footer-grip-icon {
            padding-right: .6rem;
            svg {
                font-size: inherit;
                height: 100%;
            }
        }

        h4 {
            padding: .6rem;
            letter-spacing: 0.15rem;
            text-align: right;
            flex: 1;
            text-decoration: line-through;
        }

        .footer-toggle-icon {
            display: flex;
            align-items: center;
            padding: 0 .8rem;
            svg {
                height: .75em;
            }
        }
    }
`;
// ========================================================= STYLE === //
