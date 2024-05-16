/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

/* --- MUI ----------------------- */
import { DirectionsWalkOutlined, Inventory2Outlined } from '@mui/icons-material';

// === TYPE =========================================================== //
/**
 * @property sectionName - セクション名
 * @category Type of Props
 */
interface SectionSeparatorProps {
    sectionName: string;
}
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<h4/>`
 * @example
 * ```tsx
 * <SectionSeparator sectionName={} />
 * ```
 *
 */
export const SectionSeparator = ({ sectionName }: SectionSeparatorProps) => {
    const sectionNameFormatted = sectionName.toUpperCase();

    return (
        <StyledH4 className="section-separator">
            {sectionName === 'Active' ? <DirectionsWalkOutlined /> : <Inventory2Outlined />}
            <span className="section-name">{sectionNameFormatted}</span>
        </StyledH4>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledH4 = styled.h4`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.4rem;
    margin: 2.4rem 0 1.6rem;

    &::before,
    &::after {
        content: '';
        display: block;
        flex: 1;
        height: var(--border-weight);
        background-color: var(--color-black-1);
    }
    &::before {
        margin-right: 1.6rem;
    }
    &::after {
        margin-left: 1.6rem;
    }

    svg {
        font-size: 2rem;
        color: var(--color-black-1);
    }

    .section-name {
        font-size: 1.6rem;
        letter-spacing: 0.1rem;
        font-weight: 700;
        color: var(--color-black-1);
        margin-left: 0.8rem;
    }
`;
// ========================================================= STYLE === //
