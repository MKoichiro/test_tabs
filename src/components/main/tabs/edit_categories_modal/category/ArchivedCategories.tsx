/**
 * @summary hogehoge
 *
 * @issues
 * - TODO: hogehoge
 * - IF_POSSIBLE: hogehoge
 *
 * @copilot
 * > hogehoge
 *
 * @module
 */

/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { ArchivedCategory } from './ArchivedCategory';

/* --- types ---------------------- */
import { CategoryType } from '../../../../../providers/types/categories';

/* --- MUI ----------------------- */
import { Inventory2Outlined } from '@mui/icons-material';
import { SectionSeparator } from '../../../../common/modal/section_separator/SectionSeparator';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
interface ArchivedCategoriesProps {
    archivedCategories: CategoryType[];
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @category Custom Hook
 */
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<section/>`
 * @example
 * ```tsx
 * <ArchivedCategories archivedCategories={} />
 * ```
 *
 * @category Component
 */
export const ArchivedCategories = ({ archivedCategories }: ArchivedCategoriesProps) => {
    return (
        <StyledSection>
            <SectionSeparator sectionName="Archive" />
            <ul className="archived-categories-container">
                {archivedCategories.map((category) => (
                    <ArchivedCategory
                        key={category.id}
                        archivedCategory={category}
                    />
                ))}
            </ul>
        </StyledSection>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledSection = styled.section`
    margin-top: 3.2rem;
    .archived-categories-container {
        margin-top: 1.6rem;
    }
`;
// ========================================================= STYLE === //