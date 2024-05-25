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
import { CategoryCommonStylesType } from './CategoryCommonStyles';

/* --- material icons ------------ */
import { DragBtn } from '../../../../common/btns_icons/drag_btn/DragBtn';
import { isTouchDevice } from '../../../../../data/constants/constants';
import { useWindowSizeSelector } from '../../../../../providers/redux/store';
import { BulletIcon } from '../../../../common/btns_icons/bullet_icon/BulletIcon';
import { draggingItemStyle } from '../../../../../styles/global/globalStyle';

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
    const { device } = useWindowSizeSelector();

    return (
        <StyledDiv ref={ref}>
            {!(isTouchDevice && device === 'sp') ? <BulletIcon /> : <DragBtn className="icon-gripper" />}
            <p children={draggingCategory.name} />
        </StyledDiv>
    );
});
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledDiv = styled.div<CategoryCommonStylesType>`
    ${draggingItemStyle(true, true)}
    .icon-gripper {
        cursor: grabbing;
    }
    padding: 0.4rem 0;
    border-radius: 0.2rem;
    width: 100%;
    display: flex;
    p {
        font-size: 2rem;
        line-height: 2em;
        @media (width < 600px) {
            font-size: 16px;
        }
    }
`;
// ========================================================= STYLE === //
