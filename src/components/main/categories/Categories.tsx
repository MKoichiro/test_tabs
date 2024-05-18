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
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

/* --- redux --------------------- */
import { useCategoriesSelector, useIsGloballyDragging, useWindowSizeSelector } from '../../../providers/redux/store';

/* --- child components ---------- */
import { CategoryContainer } from './category/CategoryContainer';
import { vw2px } from '../../../utils/converters';

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
    const { contentsWidth } = useWindowSizeSelector();
    const contentsWidthPx = vw2px(contentsWidth);
    const [translateX, setTranslateX] = useState(0);

    useEffect(() => {
        setTranslateX(-1 * activeIdx * contentsWidthPx);
    }, [activeIdx]);

    return (
        <StyledUl
            $activeIndex={activeIdx}
            $translateX={translateX}
        >
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
const StyledUl = styled.ul<{ $activeIndex: number; $translateX: number }>`
    display: flex;
    transform: ${({ $translateX }) => `translateX(${$translateX}px) !important`};
    transition: transform 500ms;
    > li {
        min-width: 100%;
    }
`;
// ========================================================= STYLE === //
