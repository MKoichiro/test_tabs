import React, { MutableRefObject, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { ErrorMessage } from './parts/ErrorMessage';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

// === TYPE =========================================================== //
interface ChildLegendProps {
    className?: string;
}
export const ChildLegend = ({ className, children }: PropsWithChildren<ChildLegendProps>) => {
    return (
        <StyledLegend
            className={className}
            children={children}
        />
    );
};

const StyledLegend = styled.legend`
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 0.8rem;
`;

// =========================================================== TYPE === //

interface FormPartsWithErrorProps {
    className?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export const FormPartsWithError = ({ className, children, ...rest }: PropsWithChildren<FormPartsWithErrorProps>) => {
    const classNameFormatted = `${className} input-error-as-layout-item`;
    return (
        <StyledDiv className={classNameFormatted}>
            {children}
            <ErrorMessage {...rest} />
        </StyledDiv>
    );
};

const StyledDiv = styled.div`
    input,
    select {
        color: var(--color-black-1);
        background: var(--color-white-3);
        padding: var(--input-padding);
        font-size: var(--input-fs);
        line-height: var(--input-line-height);
        width: 100%;
        height: calc(var(--input-line-height) + var(--input-padding) * 2);
    }
`;

const GridStyle = () => css`
    display: grid;
    grid-template:
        'form-parts-0 form-parts-0 form-separator form-parts-1 form-parts-1' auto
        / 2fr 6fr 1fr 2fr 6fr;

    @media (width < 600px) {
        grid-template:
            'form-parts-0' auto
            'form-parts-1' auto
            / 1fr;
    }

    .form-parts-0 {
        grid-area: form-parts-0;
    }

    .form-col-separator {
        grid-area: form-separator;
    }

    .form-parts-1 {
        grid-area: form-parts-1;
    }

    .form-parts-0,
    .form-parts-1 {
        display: grid;
        gap: 0.4rem;
        grid-template:
            'label input-error' auto
            / 2fr 6fr;
        align-items: start;

        .label-as-layout-item {
            grid-area: label;
        }

        .input-error-as-layout-item {
            grid-area: input-error;
        }

        @media (width < 600px) {
            grid-template-columns: 5fr 12fr;
        }
    }
`;
const FlexStyle = () => css`
    .form-parts-0,
    .form-parts-1 {
        display: flex;
        gap: 0.4rem;
        @media (width < 600px) {
            flex-direction: column;
        }
        .label-as-layout-item {
            flex: 2;
            @media (width < 600px) {
                max-width: calc(100% * (5 / 17));
            }
        }
        .input-error-as-layout-item {
            flex: 15;
        }
    }
`;

export const FormLayoutContainer = styled.div<{ $twoCols?: boolean }>`
    ${({ $twoCols }) => ($twoCols ? GridStyle() : FlexStyle())}
`;

export const FormLayoutItem = ({
    className,
    idx,
    children,
}: PropsWithChildren<{ className?: string; idx: number }>) => {
    const classNameFormatted = `${className}  form-parts-${idx}`;
    return <div className={classNameFormatted}>{children}</div>;
};
