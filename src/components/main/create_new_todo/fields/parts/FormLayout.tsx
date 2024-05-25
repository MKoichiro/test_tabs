import React, { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

// 1. FormLayoutContainer
// === TYPES ========================================================== //
interface FormLayoutContainerProps {
    $twoCols?: boolean;
}
// ========================================================== TYPES === //

// === STYLE ========================================================== //
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
                flex: none;
            }
        }
        .input-error-as-layout-item {
            flex: 15;
            @media (width < 600px) {
                flex: none;
            }
        }
    }
`;
// ========================================================== STYLE === //

// === STYLED COMPONENT =============================================== //
export const FormLayoutContainer = styled.div<FormLayoutContainerProps>`
    ${({ $twoCols }) => ($twoCols ? GridStyle() : FlexStyle())}
`;
// =============================================== STYLED COMPONENT === //

// 2. FormLayoutItem
// === TYPES ========================================================== //
interface FormLayoutItemProps {
    className?: string;
    idx: number;
}
// ========================================================== TYPES === //

// === FUNCTION ======================================================= //
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const FormLayoutItem = ({ className, idx, children }: PropsWithChildren<FormLayoutItemProps>) => {
    const classNameFormatted = `${className}  form-parts-${idx}`;
    return <div className={classNameFormatted}>{children}</div>;
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
// ========================================================== STYLE === //
