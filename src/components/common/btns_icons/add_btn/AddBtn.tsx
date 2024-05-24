import { Add } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

// === TYPE =========================================================== //
interface AddBtnProps {
    className?: string;
    onClick?: () => void;
}
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
export const AddBtn = ({ className, onClick }: AddBtnProps) => {
    return (
        <StyledAddBtn
            className={className}
            onClick={onClick}
        >
            <Add />
            ADD
        </StyledAddBtn>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledAddBtn = styled.button`
    & {
        letter-spacing: 0.05em;
        display: flex;
        width: fit-content;
        height: fit-content;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        padding: 0.4rem 0.8rem;
        margin-left: auto;
        border: var(--border-1);
    }
    &:active {
        scale: 0.9;
        transition: scale 50ms;
    }
`;
// ========================================================== STYLE === //
