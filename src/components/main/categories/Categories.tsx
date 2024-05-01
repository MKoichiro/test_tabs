/**
 * @summary カテゴリーごとにすべてのタスクを表示するコンポーネント
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

/* --- redux --------------------- */
import { useCategoriesSelector } from '../../../providers/redux/store';

/* --- child components ---------- */
import { CategoryContainer } from './category/CategoryContainer';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../utils/adminDebugMode';

// === TYPE =========================================================== //
// interface CategoriesType {}
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * 
 * @renderAs
 * - `<ul/>`
 * @example
 * ```tsx
 * <Categories />
 * ```
 *
 * @category Component
 */
export const Categories = () => {
    const { activeIdx, categoriesEntity: categories } = useCategoriesSelector();

    return (
        <StyledUl $activeIndex={activeIdx}>
            {categories.map((category, i) => {
                return (
                    <li key={category.id}>
                        <CategoryContainer
                            category={category}
                            idx={i}
                        />
                    </li>
                );
            })}
        </StyledUl>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledUl = styled.ul<{ $activeIndex: number }>`
    display: flex;
    transition: transform 750ms;
    transform: ${(props) => `translateX(calc(-1 * var(--contents-width) * ${props.$activeIndex}))`};
    > li {
        min-width: 100%;
    }
`;
// ========================================================= STYLE === //
