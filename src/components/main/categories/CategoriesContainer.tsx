/**
 * @summary {@link Categories}, {@link MdeModal}をまとめているコンポーネント
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

/* --- child components ---------- */
import { Categories } from './Categories';
import { MdeModal } from './MdeModal';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../utils/adminDebugMode';

// === TYPE =========================================================== //
// interface CategoriesContainerType {}
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * 
 * @renderAs
 * - `<div/>`
 * @example
 * ```tsx
 * <CategoriesContainer />
 * ```
 *
 * @category Component
 */
export const CategoriesContainer = () => {
    return (
        <StyledDiv>
            <Categories />
            <MdeModal />
        </StyledDiv>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledDiv = styled.div`
    overflow-x: hidden;
`;
// ========================================================= STYLE === //
