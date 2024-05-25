import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

// === TYPE =========================================================== //
interface ErrorMessageProps {
    className?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const ErrorMessage = ({ className, error }: ErrorMessageProps) => {
    return <StyledP className={className}>{error && (error.message as ReactNode)}</StyledP>;
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
interface StyledFieldSetProps {
    $isBlurred?: boolean;
}
const StyledP = styled.p<StyledFieldSetProps>`
    /* opacity: ${({ $isBlurred }) => ($isBlurred ? 0 : 1)};
    transition: ${({ $isBlurred }) => {
        if ($isBlurred) {
            return 'opacity 3s 5s';
        } else {
            return 'opacity 1s ease-out';
        }
    }}; */
    margin-top: 0.2rem;
    color: tomato;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: right;
`;
// ========================================================== STYLE === //
