import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

// === TYPE =========================================================== //
interface FormPartsWithErrorProps {
    className?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
export const FormPartsWithError = ({ className, children, ...rest }: PropsWithChildren<FormPartsWithErrorProps>) => {
    const classNameFormatted = `${className} input-error-as-layout-item`;
    return (
        <StyledDiv className={classNameFormatted}>
            {children}
            <ErrorMessage {...rest} />
        </StyledDiv>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledDiv = styled.div``;
// ========================================================== STYLE === //
