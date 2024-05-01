/**
 * @summary Edit Categories Modal で、 isArchived === true のカテゴリを表示する
 * @issues
 * - なし
 * @copilot
 * - なし
 * @module
 */

/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

/* --- types --------------------- */
import { CategoryType } from '../../../../../providers/types/categories';

/* --- styles -------------------- */
import { categoryCommonStyles, CategoryCommonStylesType } from './CategoryCommonStyles';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property archivedCategory - isArchived === true のカテゴリ
 * @category Type of Props
 */
interface ArchivedCategoryProps {
    archivedCategory: CategoryType;
}
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * 
 * @renderAs
 * - `<li/>`
 * @example
 * ```tsx
 * <ArchivedCategory archivedCategory={} />
 * ```
 *
 * @category Component
 */
export const ArchivedCategory = ({ archivedCategory }: ArchivedCategoryProps) => {
    return (
        <StyledLi>
            <div className="category-name-container">
                <p>{archivedCategory.name}</p>
            </div>
        </StyledLi>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledLi = styled.li<CategoryCommonStylesType>`
    ${categoryCommonStyles}

    .category-name-container {
        p {
            display: block;
            opacity: 0.5;
        }
    }
`;
// ========================================================= STYLE === //
