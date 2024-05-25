import React, { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { formControlStyleContext } from '../../../../../../styles/common/formControl';
import { FormControl } from './FormControl';

// === TYPE =========================================================== //
interface FlexibleTextareaProps {
    className?: string;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const SFCContext = ({ className, children }: PropsWithChildren<FlexibleTextareaProps>) => {
    return <SFCContainer className={className}>{children}</SFCContainer>;
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
export const SFCVariables = () => css`
    --net-fs: var(--input-fs-num);
    --real-fs: 1.6;
    @media (width < 600px) {
        --real-fs: 16;
    }
    --expand: calc(var(--real-fs) / var(--net-fs));
    --shrink: calc(var(--net-fs) / var(--real-fs));
`;

interface SFCContainerProps {}
export const SFCContainer = styled.div<SFCContainerProps>`
    ${formControlStyleContext()}
    position: relative;
    min-height: calc(var(--input-line-height) + var(--input-padding) * 2);
    width: 100%;
`;

interface SFCProps {}
export const SFC = styled(FormControl)<SFCProps>`
    ${SFCVariables()}
    font-size: calc(var(--real-fs) * 1rem);
    @media (width < 600px) {
        font-size: calc(var(--real-fs) * 1px);
    }
    scale: var(--shrink);
    transform-origin: top left;
    width: calc(100% * var(--expand));
    height: calc(100% * var(--expand));
    line-height: calc(var(--input-line-height) * var(--expand));
    padding: calc(var(--input-padding) * var(--expand));
    min-height: calc(var(--input-line-height) + var(--input-padding) * 2 * var(--expand));
    position: absolute;
    top: 0;
    left: 0;
`;
// ========================================================= STYLE === //
