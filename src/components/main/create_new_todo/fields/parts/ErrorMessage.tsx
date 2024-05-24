import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

// === TYPE =========================================================== //
interface ErrorMessageProps {
    className?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    isFieldsetBlurred: boolean;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const ErrorMessage = ({ className, error, isFieldsetBlurred }: ErrorMessageProps) => {
    return <StyledP className={className}>{error && !isFieldsetBlurred && (error.message as ReactNode)}</StyledP>;
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
interface StyledFieldSetProps {}
const StyledP = styled.p<StyledFieldSetProps>`
    margin-top: 0.2rem;
    color: tomato;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: right;
`;
// ========================================================== STYLE === //
