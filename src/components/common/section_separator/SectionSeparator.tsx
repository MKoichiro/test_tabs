/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

// === TYPE =========================================================== //
/**
 * @property sectionName - セクション名
 * @category Type of Props
 */
interface SectionSeparatorProps {
    sectionName: string;
    icon: React.ReactNode;
    marginTop?: string;
    acc?: boolean; // booleanではなく開閉するコンテナのrefを受け取るようにした方が良いかも。
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
export const SectionSeparator = ({ sectionName, icon, marginTop = '2.4rem', acc = true }: SectionSeparatorProps) => {
    const sectionNameFormatted = sectionName.toUpperCase();

    return (
        <StyledH4
            className="section-separator"
            $marginTop={marginTop}
        >
            {icon}
            <span className="section-name">{sectionNameFormatted}</span>
        </StyledH4>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
interface StyledH4Props {
    $marginTop: string;
}
const StyledH4 = styled.h4<StyledH4Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.4rem;
    margin: 2.4rem 0 1.6rem;
    margin-top: ${({ $marginTop }) => $marginTop};

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
