import React from 'react';
import styled from 'styled-components';

// === TYPE =========================================================== //
interface FormColSeparatorProps {
    className?: string;
}
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
export const FormColSeparator = ({ className }: FormColSeparatorProps) => {
    return <StyledSpan className={className} />;
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledSpan = styled.span`
    flex: 1; // 1 / 15
    display: flex;
    justify-content: center;
    align-items: center;
    &::before {
        content: '';
        display: block;
        height: 80%;
        border-left: var(--border-1);
    }
    @media (width < 600px) {
        display: none;
    }
`;
// ========================================================== STYLE === //
