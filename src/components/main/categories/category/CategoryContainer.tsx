/**
 * @summary カテゴリーのメインビュー部分
 *
 * @issues
 * - なし
 * @copilot
 * - なし
 *
 * @module
 */

/* --- react/styled-components --- */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { Category } from './Category';
import { CardsContainer } from './card_view/CardModal';

/* --- types --------------------- */
import { CategoryType } from '../../../../providers/types/categories';

/* --- redux --------------------- */
import { useCategoriesSelector } from '../../../../providers/redux/store';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property category - categoriesSlice から取得したカテゴリー情報
 * @property idx - カテゴリーのインデックス
 * @category Type of Props
 */
interface CategoryContainerProps {
    category: CategoryType;
    idx: number;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @param props
 * @returns
 */
export const useCategoryContainer = (props: CategoryContainerProps) => {
    const { idx, category } = props;
    const { activeIdx } = useCategoriesSelector();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (idx === activeIdx) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [idx, activeIdx]);

    return {
        /** categoryがアクティブかどうか */
        isActive,
        /** categoriesSliceから取得するカテゴリー情報 */
        category,
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
 * <CategoryContainer category={category} idx={idx} />
 * ```
 *
 * @category Component
 */
export const CategoryContainer = (props: CategoryContainerProps) => {
    const { isActive, category } = useCategoryContainer(props);

    return (
        <StyledDiv>
            <Category category={category} />
            {isActive && <CardsContainer category={category} />}
        </StyledDiv>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledDiv = styled.div``;
// ========================================================= STYLE === //
