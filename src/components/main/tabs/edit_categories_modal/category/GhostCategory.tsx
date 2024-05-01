/**
 * @summary Edit Categories Modal で、 drag 中にカーソルに追従する category を表示する
 * @issues
 * - なし
 * @copilot
 * - なし
 * @module
 */

/* --- react/styled-components --- */
import React, { forwardRef } from 'react';
import styled from 'styled-components';

/* --- types --------------------- */
import { CategoryType } from '../../../../../providers/types/categories';

/* --- styles -------------------- */
import { categoryCommonStyles, CategoryCommonStylesType } from './CategoryCommonStyles';

/* --- material icons ------------ */
import { DragIndicator } from '@mui/icons-material';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property draggingCategory - drag 中の category の情報
 * @category Type of Props
 */
interface GhostCategoryType {
    draggingCategory: CategoryType;
}
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
 * <GhostCategory category={} />
 * ```
 *
 * @category Component
 */
export const GhostCategory = forwardRef<HTMLDivElement, GhostCategoryType>(({ draggingCategory }, ref) => {
        return (
            <StyledDiv ref={ref}>
                <span className="gripper">
                    <DragIndicator />
                </span>
                <p children={draggingCategory.name} />
            </StyledDiv>
        );
    }
);
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledDiv = styled.div<CategoryCommonStylesType>`
    ${categoryCommonStyles}
    .gripper {
        cursor: grabbing;
    }
    .category-name-container {
        p {
            display: block;
        }
    }
`;
// ========================================================= STYLE === //
