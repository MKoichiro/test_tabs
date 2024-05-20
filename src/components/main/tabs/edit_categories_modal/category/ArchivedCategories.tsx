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
import { SectionSeparator } from '../../../../common/section_separator/SectionSeparator';
import { Inventory2Outlined } from '@mui/icons-material';

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
            <SectionSeparator
                sectionName="Archive"
                icon={<Inventory2Outlined />}
            />
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
const StyledSection = styled.section``;
// ========================================================= STYLE === //
