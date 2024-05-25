import React from 'react';
import styled from 'styled-components';
import { toUpperCaseFirstLetter } from '../../../../utils/toUpperCaseFirstLetter';

// === TYPE =========================================================== //
interface AddNewLabelProps {
    className?: string;
    labelTxt: string;
    htmlFor: string;
    feature: 'required' | 'optional';
}
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
export const AddNewLabel = ({ className, htmlFor, labelTxt, feature }: AddNewLabelProps) => {
    return (
        <StyledLabel
            className={`${className} label-as-layout-item`}
            htmlFor={htmlFor}
        >
            <StyledFeatureIcon $feature={feature}>{toUpperCaseFirstLetter(feature)}</StyledFeatureIcon>
            <StyledLabelTxt>{labelTxt.toUpperCase()}</StyledLabelTxt>
        </StyledLabel>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
interface StyledLabelProps {}
const StyledLabel = styled.label<StyledLabelProps>`
    display: flex;
    height: fit-content;
    align-items: center;
    gap: 0.4rem;
    font-weight: bold;
`;

interface StyledFeatureIconProps {
    $feature: 'required' | 'optional';
}
const StyledFeatureIcon = styled.span<StyledFeatureIconProps>`
    /* COMMON */
    // Rect
    height: 100%;
    padding: 0.1em 0.5em;
    // Font
    font-size: 0.8em;
    letter-spacing: 0.1em;

    /* CONDITIONAL */
    // Border
    --req-border: var(--border-weight) solid var(--color-black-1);
    --opt-border: var(--border-weight) solid var(--color-black-1);
    border: ${({ $feature }) => ($feature === 'required' ? 'var(--req-border)' : 'var(--opt-border)')};
    //Background Color
    --req-bgc: var(--color-black-1);
    --opt-bgc: transparent;
    background: ${({ $feature }) => ($feature === 'required' ? 'var(--req-bgc)' : 'var(--opt-bgc)')};
    // Text Color
    --req-color: var(--color-white-2);
    --opt-color: inherit;
    color: ${({ $feature }) => ($feature === 'required' ? 'var(--req-color)' : 'var(--opt-color)')};
`;

const StyledLabelTxt = styled.span`
    flex: 1;
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    @media (width < 600px) {
        font-size: 11px;
    }
    letter-spacing: 0.08em;
    &::after {
        content: ':';
    }
`;
// ========================================================== STYLE === //
