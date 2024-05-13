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
import { ActiveCategories } from './category/ActiveCategories';
import { ArchivedCategories } from './category/ArchivedCategories';

/* --- redux --------------------- */
import { useCategoriesSelector } from '../../../../providers/redux/store';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
// interface CategoriesProps {}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @category Custom Hook
 */
export const useCategories = () => {
    const { categoriesEntity: categories } = useCategoriesSelector();
    const activeCategories = categories.filter((category) => !category.isArchived);
    const archivedCategories = categories.filter((category) => category.isArchived);

    return {
        categories,
        activeCategories,
        archivedCategories,
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<div/>`
 * @example
 * ```tsx
 * <Categories />
 * ```
 *
 * @category Component
 */
export const Categories = () => {
    const { activeCategories, archivedCategories } = useCategories();

    return (
        <StyledDiv>
            <ActiveCategories activeCategories={activeCategories} />
            <ArchivedCategories archivedCategories={archivedCategories} />
        </StyledDiv>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledDiv = styled.div``;
// ========================================================= STYLE === //
